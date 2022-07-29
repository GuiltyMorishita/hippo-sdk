import { AptosParserRepo, getTypeTagFullname, StructTag, u8, u64, strToU8, u8str, DummyCache } from "@manahippo/move-to-ts";
import { AptosClient, HexString } from "aptos";
import { Command } from "commander";
import { getProjectRepo } from "../generated";
import { aptos_framework, hippo_swap } from "../generated/";
import { coin_registry$_ } from "../generated/coin_registry";
import { isTypeInfoSame, printResource, printResources, typeInfoToTypeTag, typeTagToTypeInfo } from "../utils";
import { readConfig, sendPayloadTx, simulatePayloadTx } from "./utils";
import { HippoSwapClient } from "../swap/hippoSwapClient";
import { HippoWalletClient } from "../wallet";
import { CoinInfo } from "../generated/aptos_framework/coin";
import { PoolType } from "../swap/baseTypes";
import { EconiaClient } from "../aggregator/econia";
import { MI, MR } from "../generated/Econia/Registry";
import { get_price_levels$ } from "../generated/Econia/Book";


const actionShowTokenRegistry = async () => {
  const {client, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokens = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  for(const tokInfo of tokens.token_info_list) {
    console.log(`########${tokInfo.symbol.str()}#######`);
    console.log(`name: ${tokInfo.name.str()}`);
    console.log(`description: ${tokInfo.description.str()}`);
    console.log(`decimals: ${tokInfo.decimals.toJsNumber()}`);
    console.log(`logo_url: ${tokInfo.logo_url.str()}`);
    console.log(`project_url: ${tokInfo.project_url.str()}`);
    const tagName = getTypeTagFullname(typeInfoToTypeTag(tokInfo.token_type));
    console.log(`type: ${tagName}`);
    console.log(`delisted: ${tokInfo.delisted}`);
    console.log("");
  }
}

const actionShowPools = async () => {
  const {client, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokens = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const tokenList = tokens.token_info_list;
  for(const pi of tokenList) {
    const structTag = typeInfoToTypeTag(pi.token_type);
    if (
      structTag instanceof StructTag &&
      structTag.address.hex() === contractAddress.hex() &&
      structTag.module === hippo_swap.cp_swap$_.moduleName &&
      structTag.name === hippo_swap.cp_swap$_.LPToken.structName
    ) {
      // found our LPToken!
      console.log(structTag.typeParams);
      const poolMeta = await hippo_swap.cp_swap$_.TokenPairMetadata.load(repo, client, contractAddress, structTag.typeParams);
      printResource(poolMeta);
      const poolReserve = await hippo_swap.cp_swap$_.TokenPairReserve.load(repo, client, contractAddress, structTag.typeParams);
      printResource(poolReserve);
    }
    else if (
      structTag instanceof StructTag &&
      structTag.address.hex() == contractAddress.hex() &&
      structTag.module === hippo_swap.stable_curve_swap$_.moduleName &&
      structTag.name === hippo_swap.stable_curve_swap$_.LPToken.structName
    ){
      console.log(structTag.typeParams)
      const poolMeta = await hippo_swap.stable_curve_swap$_.StableCurvePoolInfo.load(repo, client, contractAddress, structTag.typeParams);
      printResource(poolMeta);
    }
  }
}

const actionHitFaucet = async (coinSymbol:string, rawAmount: string, _options: any) => {
  const amount = u64(rawAmount);
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const registry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  for(const ti of registry.token_info_list) {
    if (ti.delisted) {
      continue;
    }
    if (ti.symbol.str() === coinSymbol) {
      const coinTypeTag = typeInfoToTypeTag(ti.token_type);
      const payload = hippo_swap.mock_coin$_.buildPayload_faucet_mint_to_script(amount, [coinTypeTag]);
      const result = sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a token with symbol=${coinSymbol}}`);
}

const actionShowWallet = async() => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const registry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  for(const ti of registry.token_info_list) {
    if(ti.delisted) {
      continue;
    }
    const coinTypeTag = typeInfoToTypeTag(ti.token_type);
    try{
      const coin = await aptos_framework.coin$_.CoinStore.load(repo, client, account.address(), [coinTypeTag])
      console.log(`${ti.symbol}: ${coin.coin.value}`);
    }
    catch(e) {
      continue;
    }
  }
}

const getFromToAndLps = async(
  repo: AptosParserRepo,
  client: AptosClient,
  contractAddress: HexString,
  fromSymbol: string,
  toSymbol: string
) => {
  const registry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  let fromTag, toTag;
  const lpTokenTags = [];
  const symbolToCoinTagFullname: Record<string, string> = {};
  for(const ti of registry.token_info_list) {
    if(ti.delisted) {
      continue;
    }
    const coinTypeTag = typeInfoToTypeTag(ti.token_type);
    symbolToCoinTagFullname[ti.symbol.str()] = getTypeTagFullname(coinTypeTag);
    if(ti.symbol.str() === fromSymbol) {
      fromTag = coinTypeTag;
    }
    else if(ti.symbol.str() === toSymbol) {
      toTag = coinTypeTag;
    }

    // look for our LP token
    if (
      coinTypeTag instanceof StructTag &&
      coinTypeTag.address.hex() === contractAddress.hex() &&
      coinTypeTag.module === hippo_swap.cp_swap$_.moduleName &&
      coinTypeTag.name === hippo_swap.cp_swap$_.LPToken.structName
    ) {
      lpTokenTags.push(coinTypeTag);
    }
  }
  if(!fromTag) {
    throw new Error(`Unsupported coin symbol: ${fromSymbol}`);
  }
  if(!toTag) {
    throw new Error(`Unsupported coin symbol: ${toSymbol}`);
  }
  return {fromTag, toTag, lpTokenTags};
}

const actionSwap = async(fromSymbol: string, toSymbol: string, amountIn: string) => {
  const amount = u64(amountIn);
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const {fromTag, toTag, lpTokenTags} = await getFromToAndLps(repo, client, contractAddress, fromSymbol, toSymbol);
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);

  // identify a pool where the LHS and RHS tokens are exactly fromTag and toTag
  for(const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if(lhsFullname === fromFullname && rhsFullname === toFullname) {
      const payload = hippo_swap.cp_scripts$_.buildPayload_swap_script(amount, u64(0), u64(0), u64(0), lpTag.typeParams);
      const result = sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
    else if(rhsFullname === fromFullname && lhsFullname === toFullname) {
      const payload = hippo_swap.cp_scripts$_.buildPayload_swap_script(u64(0), amount, u64(0), u64(0), lpTag.typeParams);
      const result = await sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool directly from ${fromSymbol} to ${toSymbol}`);
}

const actionAddLiquidity = async(lhsSymbol: string, rhsSymbol: string, lhsAmtIn: string, rhsAmtIn: string) => {
  const lhsAmt = u64(lhsAmtIn);
  const rhsAmt = u64(rhsAmtIn);
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const {fromTag, toTag, lpTokenTags} = await getFromToAndLps(repo, client, contractAddress, lhsSymbol, rhsSymbol);
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);
  for(const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if(lhsFullname === fromFullname && rhsFullname === toFullname) {
      const payload = await hippo_swap.cp_scripts$_.buildPayload_add_liquidity_script(lhsAmt, rhsAmt, lpTag.typeParams);
      const result = await sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool for ${lhsSymbol}-${rhsSymbol}`);
}

const actionRemoveLiquidity = async(lhsSymbol: string, rhsSymbol: string, removeAmtStr: string) => {
  const removeAmt = u64(removeAmtStr);
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const {fromTag, toTag, lpTokenTags} = await getFromToAndLps(repo, client, contractAddress, lhsSymbol, rhsSymbol);
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);
  for(const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if(lhsFullname === fromFullname && rhsFullname === toFullname) {
      const payload = hippo_swap.cp_scripts$_.buildPayload_remove_liquidity_script(removeAmt, u64(0), u64(0), lpTag.typeParams);
      const result = await sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool for ${lhsSymbol}-${rhsSymbol}`);
}

const actionMockDeploy = async () => {
  const {client, account} = readConfig(program);
  const payload = await hippo_swap.cp_scripts$_.buildPayload_mock_deploy_script();
  await sendPayloadTx(client, account, payload, 10000);
  console.log('CPSwap')
  const pieceSwapPayload = await hippo_swap.piece_swap_script$_.buildPayload_mock_deploy_script()
  await sendPayloadTx(client, account, pieceSwapPayload, 10000);
  console.log('PieceSwap')
  // skip stable-curve for now
}


const actionListModules = async () => {
  const {client, contractAddress} = readConfig(program);
  try{
    console.log(client.nodeUrl);
    const result = await client.getAccountModules(contractAddress);
    printResources(result);
  }
  catch(e) {
    console.log(e);
  }
}

const program = new Command();

program
  .name('hippo-cli')
  .description('Hippo SDK cli tool.')
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")')
  .option('-p, --profile <PROFILE>', 'aptos config profile to use', 'default')

program
  .command("mock-deploy")
  .action(actionMockDeploy);

program
  .command("list-modules")
  .action(actionListModules);

program
  .command("show-token-registry")
  .action(actionShowTokenRegistry);

program
  .command("show-pools")
  .action(actionShowPools);

program
  .command("hit-faucet")
  .argument('<coin-name>')
  .argument('<raw-amount>')
  .action(actionHitFaucet);

program
  .command("show-wallet")
  .action(actionShowWallet);

program
  .command("swap")
  .argument('<from-coin>')
  .argument('<to-coin>')
  .argument('<raw-amount-in>')
  .action(actionSwap);

program
  .command("add-liquidity")
  .argument('<lhs-coin>')
  .argument('<rhs-coin>')
  .argument('<raw-lhs-amount-in>')
  .argument('<raw-rhs-amount-in>')
  .action(actionAddLiquidity);

program
  .command("remove-liquidity")
  .argument('<lhs-coin>')
  .argument('<rhs-coin>')
  .argument('<liquidity-amount-out>')
  .action(actionRemoveLiquidity);


const testCommand = new Command("test");

const testHippoClient = async () => {
  const {client, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  swapClient.printSelf();
}

const testWalletClient = async () => {
  const {client, account, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const walletClient = await HippoWalletClient.createInTwoCalls(netConf, client, repo, account.address());
  walletClient.debugPrint();
}

const testWalletClientFaucet = async (symbol: string, uiAmount: string) => {
  const uiAmountNum = Number.parseFloat(uiAmount);
  if(uiAmountNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const {client, account, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const walletClient = await HippoWalletClient.createInTwoCalls(netConf, client, repo, account.address());
  const payload = await walletClient.makeFaucetMintToPayload(uiAmountNum, symbol);
  await sendPayloadTx(client, account, payload);
  await walletClient.refreshStores();
  walletClient.debugPrint();
}

const testClientSwap = async(fromSymbol: string, toSymbol: string, uiAmtIn: string) => {
  const {client, account, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const uiAmtInNum = Number.parseFloat(uiAmtIn);
  if(uiAmtInNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const result = swapClient.getBestQuoteBySymbols(fromSymbol, toSymbol, uiAmtInNum, 3);
  if (!result) {
    console.log("No route");
    return;
  }
  const {bestRoute} = result;
  const payload = await bestRoute.makeSwapPayload(uiAmtInNum, 0);
  await sendPayloadTx(client, account, payload);
  await testWalletClient();
}

const testClientSimulateSwap = async(fromSymbol: string, toSymbol: string, uiAmtIn: string) => {
  const {client, account, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const uiAmtInNum = Number.parseFloat(uiAmtIn);
  if(uiAmtInNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const result = swapClient.getBestQuoteBySymbols(fromSymbol, toSymbol, uiAmtInNum, 3);
  if (!result) {
    console.log("No route");
    return;
  }
  const {bestRoute} = result;
  const payload = await bestRoute.makeSwapPayload(uiAmtInNum, 0);
  const simResult = await simulatePayloadTx(client, account, payload);
  printResource(simResult);
  await testWalletClient();
}

const testClientQuote = async(fromSymbol: string, toSymbol: string, uiAmtIn: string) => {
  const {client, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const uiAmtInNum = Number.parseFloat(uiAmtIn);
  if(uiAmtInNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const result = await swapClient.getBestQuoteBySymbols(fromSymbol, toSymbol, uiAmtInNum, 3);
  if (!result) {
    console.log("No route");
    return;
  }
  const {bestQuote} = result;
  printResource(bestQuote);
}

const poolTypeMap = {
  cp: PoolType.CONSTANT_PRODUCT,
  stable: PoolType.STABLE_CURVE,
  piece: PoolType.THREE_PIECE,
}

function cliPoolTypeToPoolType(poolType: string): PoolType {
  if (poolType in poolTypeMap) {
    return poolTypeMap[poolType as keyof typeof poolTypeMap];
  }
  throw new Error(`${poolType} does not refer to a valid poolType. Valid values are: ${Object.keys(poolTypeMap)}`);
}

const testClientAddLiquidity = async(poolTypeStr: string, lhsSymbol: string, rhsSymbol: string, lhsUiAmtStr: string, rhsUiAmtStr: string) => {
  const {client, account, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const lhsUiAmt = Number.parseFloat(lhsUiAmtStr);
  const rhsUiAmt = Number.parseFloat(rhsUiAmtStr);
  if(lhsUiAmt <= 0 || rhsUiAmt <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const poolType = cliPoolTypeToPoolType(poolTypeStr);
  const pools = await swapClient.getDirectPoolsBySymbolsAndPoolType(lhsSymbol, rhsSymbol, poolType);
  if (pools.length === 0) {
    return;
  }
  if (pools.length !== 1) {
    console.log("Found multiple pools of the same type???");
    return;
  }
  if (pools[0].xTokenInfo.symbol.str() !== lhsSymbol || pools[0].yTokenInfo.symbol.str() !== rhsSymbol) {
    console.log("Pool mismatch");
    return;
  }
  const payload = await pools[0].makeAddLiquidityPayload(lhsUiAmt, rhsUiAmt);
  await sendPayloadTx(client, account, payload);
  await testWalletClient();
}

const testClientRemoveLiquidity = async(poolTypeStr: string, lhsSymbol: string, rhsSymbol: string, liquidityUiAmtStr: string) => {
  const {client, account, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const liquidityUiAmt = Number.parseFloat(liquidityUiAmtStr);
  if(liquidityUiAmt <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const poolType = cliPoolTypeToPoolType(poolTypeStr);
  const pools = await swapClient.getDirectPoolsBySymbolsAndPoolType(lhsSymbol, rhsSymbol, poolType);
  if (pools.length === 0) {
    console.log("Corresponding pool does not exist");
    return;
  }
  if (pools.length !== 1) {
    console.log("Found multiple pools of the same type???");
    return;
  }
  if (pools[0].xTokenInfo.symbol.str() !== lhsSymbol || pools[0].yTokenInfo.symbol.str() !== rhsSymbol) {
    console.log("Pool mismatch");
    return;
  }
  const payload = await pools[0].makeRemoveLiquidityPayload(liquidityUiAmt, 0, 0);
  await sendPayloadTx(client, account, payload);
  await testWalletClient();
}

const testShowSupply = async(symbol: string) => {
  const {client, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const supply = await swapClient.getTokenTotalSupplyBySymbol(symbol);
  console.log(supply);
}

const testShowRoutes = async(lhsSymbol: string, rhsSymbol: string) => {
  const {client, netConf} = readConfig(program);
  const repo = getProjectRepo();
  const swapClient = await HippoSwapClient.createInOneCall(netConf, client, repo);
  const routes = swapClient.getSteppedRoutesBySymbol(lhsSymbol, rhsSymbol, 3);
  printResources(routes.map(r=>r.summarize()));
}

// sub-commands
testCommand
  .command("hippo-client")
  .action(testHippoClient);

testCommand
  .command("wallet-client")
  .action(testWalletClient);

testCommand
  .command("wallet-client-faucet")
  .argument("<token-symbol>")
  .argument("<token-amount>")
  .action(testWalletClientFaucet);

testCommand
  .command("swap")
  .argument("<from-symbol>")
  .argument("<to-symbol>")
  .argument("<ui-amount-in>")
  .action(testClientSwap);

testCommand
  .command("simulate-swap")
  .argument("<from-symbol>")
  .argument("<to-symbol>")
  .argument("<ui-amount-in>")
  .action(testClientSimulateSwap);

testCommand
  .command("quote")
  .argument("<from-symbol>")
  .argument("<to-symbol>")
  .argument("<ui-amount-in>")
  .action(testClientQuote);

testCommand
  .command("add-liquidity")
  .argument("<pool-type>", "pool-type may be 'cp' or 'stable'")
  .argument("<lhs-symbol>")
  .argument("<rhs-symbol>")
  .argument("<lhs-ui-amount-in>")
  .argument("<rhs-ui-amount-in>")
  .action(testClientAddLiquidity);

testCommand
  .command("remove-liquidity")
  .argument("<pool-type>", "pool-type may be 'cp' or 'stable'")
  .argument("<lhs-symbol>")
  .argument("<rhs-symbol>")
  .argument("<liquidity-ui-amount>")
  .action(testClientRemoveLiquidity);

testCommand
  .command("show-supply")
  .argument("<SYMBOL>")
  .action(testShowSupply);

testCommand
  .command("show-routes")
  .argument("<lhs-symbol>")
  .argument("<rhs-symbol>")
  .action(testShowRoutes);

program.addCommand(testCommand);

// other random things

const checkTestCoin = async () => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const testCoinTag = new StructTag(
    aptos_framework.aptos_coin$_.moduleAddress,
    aptos_framework.aptos_coin$_.moduleName,
    aptos_framework.aptos_coin$_.AptosCoin.structName,
    []
  );
  const testCoinInfo = await CoinInfo.load(repo, client, aptos_framework.aptos_coin$_.moduleAddress, [testCoinTag])
  printResource(testCoinInfo);
  const registry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  for(const tokenInfo of registry.token_info_list) {
    if(tokenInfo.delisted) {
      continue;
    }
    const tag = typeInfoToTypeTag(tokenInfo.token_type);
    if(getTypeTagFullname(tag) === getTypeTagFullname(testCoinTag)) {
      console.log("Aptos already registered.");
      return;
    }
  }
  const payload = coin_registry$_.buildPayload_add_token_script(
    strToU8("Aptos"),
    strToU8("APTOS"),
    strToU8("Aptos Coin"),
    u8(testCoinInfo.decimals.value),
    strToU8("https://miro.medium.com/max/3150/1*Gf747eyRywU8Img0tK5wvw.png"),
    strToU8("https://aptoslabs.com/"),
    [testCoinTag]
  );
  const result = await sendPayloadTx(client, account, payload);
  console.log(result);
}

const updateTokenRegistry = async (symbol: string, description: string, logo_url: string, project_url: string) => {
  const {client, account} = readConfig(program);
  const payload = coin_registry$_.buildPayload_update_token_info_script(
    strToU8(symbol),
    strToU8(description),
    strToU8(logo_url),
    strToU8(project_url),
  );
  await sendPayloadTx(client, account, payload, 3000);
}

const furnishMockTokenDetails = async () => {
  // yes we steal from solana-token-list
  await updateTokenRegistry('USDT', 'Tether', 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg', 'https://tether.to/');
  await updateTokenRegistry('USDC', 'USDC', 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', 'https://www.centre.io/');
  await updateTokenRegistry('DAI', 'DAI', 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1/logo.png', 'https://makerdao.com/');
  await updateTokenRegistry('BTC', 'Bitcoin', 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png', 'https://bitcoin.org');
}

const others = new Command('others');

others
  .command("check-test-coin")
  .action(checkTestCoin);

others
  .command("update-token-registry")
  .argument("<SYMBOL>")
  .argument("<description>")
  .argument("<logo_url>")
  .argument("<project_url>")
  .action(updateTokenRegistry);

others
  .command("furnish-token-details")
  .action(furnishMockTokenDetails);

program.addCommand(others);

// for econia

const ECONIA_ADDR_DEV = new HexString("0xf538533414430323ccd2d8f8d7ce33819653cac5a7634a80cd2429ab904b6659");

const econiaListMarkets = async () => {
  const {client} = readConfig(program);
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const markets = await econia.getMarkets();
  console.log(`Number of markets: ${markets.length}`);
  for (const entry of markets) {
    const [key, value] = entry;
    console.log(`MARKET###############`);
    console.log(`LHS: ${u8str(key.b.struct_name)}`);
    console.log(`RHS: ${u8str(key.q.struct_name)}`);
    console.log(`owner: ${value}`);
  }
}

const econiaListOrders = async (owner: string, base: string, quote: string) => {
  const {client, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mii = econiaGetMi(tokRegistry, base, quote, "E0");
  if (!mii) {
    return;
  }
  const markets = await econia.getMarkets();
  for(const entry of markets) {
    const [mi, ownerHex] = entry;
    if (ownerHex.hex() === owner && isTypeInfoSame(mii.b, mi.b) && isTypeInfoSame(mii.q, mi.q) ) {
      const asks = await econia.getOrders(ownerHex, true, mi);
      const bids = await econia.getOrders(ownerHex, false, mi);
      console.log(`Num asks: ${asks.length}`);
      for(const ask of asks.slice(0, 10).reverse()) {
        console.log(ask);
      }
      console.log(`Num bids: ${bids.length}`);
      for(const bid of bids.slice(0, 10)) {
        console.log(bid);
      }
      return;
    }
  }
  console.log(`Did not find the market for ${base}-${quote} owned by ${owner}`);
}

const econiaListLevels = async (owner: string, base: string, quote: string) => {
  const {client, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mii = econiaGetMi(tokRegistry, base, quote, "E0");
  if (!mii) {
    return;
  }
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const markets = await econia.getMarkets();
  const cache = new DummyCache();
  for(const entry of markets) {
    const [mi, ownerHex] = entry;
    if (ownerHex.hex() === owner && isTypeInfoSame(mii.b, mi.b) && isTypeInfoSame(mii.q, mi.q) ) {
      const asks = await econia.getOrders(ownerHex, true, mi);
      const bids = await econia.getOrders(ownerHex, false, mi);
      const askLevels = get_price_levels$(asks, cache);
      const bidLevels = get_price_levels$(bids, cache);
      for(const askLevel of askLevels.reverse()) {
        console.log(`ASK: ${askLevel.price.toJsNumber()}  | ${askLevel.size.toJsNumber()}`);
      }
      for(const bidLevel of bidLevels) {
        console.log(`BID: ${bidLevel.price.toJsNumber()}  | ${bidLevel.size.toJsNumber()}`);
      }
      return;
    }
  }
  console.log(`Did not find the market for ${base}-${quote} owned by ${owner}`);
}

function econiaGetTags(tokRegistry: coin_registry$_.TokenRegistry, base: string, quote: string, exp: string) {
  const tokenInfos = tokRegistry.token_info_list;
  const baseTokInfo = tokenInfos.filter(ti => ti.symbol.str() === base)[0] || null;
  const quoteTokInfo = tokenInfos.filter(ti => ti.symbol.str() === quote)[0] || null;
  if (!baseTokInfo) {
    console.log(`${base} not found from our TokenRegistry`);
    return null;
  }
  if (!quoteTokInfo) {
    console.log(`${quote} not found from our TokenRegistry`);
    return null;
  }
  if (!(exp.length >= 2 && exp.length <= 3 && exp.charAt(0) === "E" && parseInt(exp.substr(1)) <= 19)) {
    console.log(`Invalid exp: ${exp}, only allow E0 to E19`);
    return null;
  }
  const baseTag = typeInfoToTypeTag(baseTokInfo.token_type);
  const quoteTag = typeInfoToTypeTag(quoteTokInfo.token_type);
  const expTag = new StructTag(MR.moduleAddress, MR.moduleName, exp, []);
  return [baseTag, quoteTag, expTag];
}

function econiaGetMi(tokRegistry: coin_registry$_.TokenRegistry, base: string, quote: string, exp: string) {
  const tags = econiaGetTags(tokRegistry, base, quote, exp);
  if (!tags) {
    return null;
  }
  const [baseTag, quoteTag, expTag] = tags;
  const mi = new MI({
    b: typeTagToTypeInfo(baseTag),
    q: typeTagToTypeInfo(quoteTag),
    e: typeTagToTypeInfo(expTag),
  }, new StructTag(MI.moduleAddress, MI.moduleName, MI.structName, []))
  return mi;
}

const econiaRegisterMarket = async (base: string, quote: string, exp: string) => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const tags = econiaGetTags(tokRegistry, base, quote, exp);
  if(!tags){
    return;
  }
  const [baseTag, quoteTag, expTag] = tags;
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const payload = econia.buildPayloadRegisterMarket(baseTag, quoteTag, expTag);
  await sendPayloadTx(client, account, payload);
}

const econiaSubmitBid = async (owner: string, base: string, quote: string, exp: string, price: string, size: string) => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mi = econiaGetMi(tokRegistry, base, quote, exp);
  if(!mi){
    return;
  }
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const ownerHex = new HexString(owner);
  const p = u64(price);
  const s = u64(size);
  const payload = econia.buildPayloadSubmitBid(ownerHex, p, s, mi);
  console.log(JSON.stringify(payload, null, 2));
  await sendPayloadTx(client, account, payload);
}

const econiaSubmitAsk = async (owner: string, base: string, quote: string, exp: string, price: string, size: string) => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mi = econiaGetMi(tokRegistry, base, quote, exp);
  if(!mi){
    return;
  }
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const ownerHex = new HexString(owner);
  const p = u64(price);
  const s = u64(size);
  const payload = econia.buildPayloadSubmitAsk(ownerHex, p, s, mi);
  await sendPayloadTx(client, account, payload);
}

const econiaInitUser = async () => {
  const {client, account} = readConfig(program);
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const payload = econia.buildPayloadInitUser();
  await sendPayloadTx(client, account, payload);
}

const econiaDeposit = async (base: string, quote: string, exp: string, baseAmt: string, quoteAmt: string) => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mi = econiaGetMi(tokRegistry, base, quote, exp);
  if(!mi){
    return;
  }
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const payload = econia.buildPayloadDeposit(u64(baseAmt), u64(quoteAmt), mi);
  await sendPayloadTx(client, account, payload);
}

const econiaWithdraw = async (base: string, quote: string, exp: string, baseAmt: string, quoteAmt: string) => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mi = econiaGetMi(tokRegistry, base, quote, exp);
  if(!mi){
    return;
  }
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const payload = econia.buildPayloadWithdraw(u64(baseAmt), u64(quoteAmt), mi);
  await sendPayloadTx(client, account, payload);
}

const econiaInitContainers = async (base: string, quote: string, exp: string) => {
  const {client, account, contractAddress} = readConfig(program);
  const repo = getProjectRepo();
  const tokRegistry = await coin_registry$_.TokenRegistry.load(repo, client, contractAddress, []);
  const mi = econiaGetMi(tokRegistry, base, quote, exp);
  if(!mi){
    return;
  }
  const econia = new EconiaClient(client, ECONIA_ADDR_DEV);
  const payload = econia.buildPayloadInitContainers(mi);
  await sendPayloadTx(client, account, payload);
}


const econia = new Command('econia');

econia
  .command("list-markets")
  .action(econiaListMarkets)

econia
  .command("list-orders")
  .argument("<OWNER_ADDRESS>")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .action(econiaListOrders)

econia
  .command("list-levels")
  .argument("<OWNER_ADDRESS>")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .action(econiaListLevels)

econia
  .command("register-market")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .argument("<EXP>")
  .action(econiaRegisterMarket)

econia
  .command("submit-bid")
  .argument("<OWNER_ADDRESS>")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .argument("<EXP>")
  .argument("<price>")
  .argument("<size>")
  .action(econiaSubmitBid)

econia
  .command("submit-ask")
  .argument("<OWNER_ADDRESS>")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .argument("<EXP>")
  .argument("<price>")
  .argument("<size>")
  .action(econiaSubmitAsk)

econia
  .command("deposit")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .argument("<EXP>")
  .argument("<base-amt>")
  .argument("<quote-qmt>")
  .action(econiaDeposit)

econia
  .command("withdraw")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .argument("<EXP>")
  .argument("<base-amt>")
  .argument("<quote-qmt>")
  .action(econiaWithdraw)

econia
  .command("init-containers")
  .argument("<BASE_SYMBOL>")
  .argument("<QUOTE_SYMBOL>")
  .argument("<EXP>")
  .action(econiaInitContainers)

econia
  .command("init-user")
  .action(econiaInitUser)

program.addCommand(econia);

program.parse();
