import {
  getTypeTagFullname,
  StructTag,
  u64,
  parseMoveStructTag,
  sendPayloadTx,
  simulatePayloadTx,
  getSimulationKeys,
  sendPayloadTxAndLog
} from '@manahippo/move-to-ts';
import { AptosAccount, HexString } from 'aptos';
import { Command } from 'commander';
import { App, getProjectRepo } from '../generated';
import { stdlib, hippo_swap } from '../generated/';
import { Devnet_coins } from '../generated/coin_list';
import { printResource, printResources, queryFetchFullList, typeInfoToTypeTag } from '../utils';
import { readConfig, strToString } from './utils';
import { HippoSwapClient } from '../swap';
import { HippoWalletClient } from '../wallet';
import { CoinInfo } from '../generated/stdlib/coin';
import { PoolType } from '../swap/baseTypes';
import { TradeAggregator } from '../aggregator/aggregator';
import { DEX_TYPE_NAME } from '../aggregator/types';
import { TxnBuilderTypes } from 'aptos';

const actionShowTokenRegistry = async () => {
  const { app, hippoDexAddress } = readConfig(program);
  const fullList = await queryFetchFullList(app, hippoDexAddress);
  for (const tokInfo of fullList.coin_info_list) {
    console.log(`########${tokInfo.symbol.str()}#######`);
    console.log(`name: ${tokInfo.name.str()}`);
    console.log(`decimals: ${tokInfo.decimals.toJsNumber()}`);
    console.log(`logo_url: ${tokInfo.logo_url.str()}`);
    console.log(`project_url: ${tokInfo.project_url.str()}`);
    const tagName = getTypeTagFullname(typeInfoToTypeTag(tokInfo.token_type));
    console.log(`type: ${tagName}`);
    console.log('');
  }
};

const actionShowPools = async () => {
  const { app, hippoDexAddress } = readConfig(program);
  const fullList = await queryFetchFullList(app, hippoDexAddress);
  for (const coinInfo of fullList.coin_info_list) {
    const structTag = typeInfoToTypeTag(coinInfo.token_type);
    if (
      structTag instanceof StructTag &&
      structTag.address.hex() === hippoDexAddress.hex() &&
      structTag.module === hippo_swap.Cp_swap.moduleName &&
      structTag.name === hippo_swap.Cp_swap.LPToken.structName
    ) {
      // found our LPToken!
      console.log(structTag.typeParams);
      const poolMeta = await app.hippo_swap.cp_swap.TokenPairMetadata.load(
        app.parserRepo,
        app.client,
        hippoDexAddress,
        structTag.typeParams
      );
      printResource(poolMeta);
      const poolReserve = await app.hippo_swap.cp_swap.TokenPairReserve.load(
        app.parserRepo,
        app.client,
        hippoDexAddress,
        structTag.typeParams
      );
      printResource(poolReserve);
    }
  }
};

const actionHitFaucet = async (coinSymbol: string, rawAmount: string, _options: any) => {
  const amount = u64(rawAmount);
  const { app, hippoDexAddress, account } = readConfig(program);
  const fullList = await queryFetchFullList(app, hippoDexAddress);
  for (const coinInfo of fullList.coin_info_list) {
    if (coinInfo.symbol.str() === coinSymbol) {
      const coinTypeTag = typeInfoToTypeTag(coinInfo.token_type);
      const payload = Devnet_coins.buildPayload_mint_to_wallet(amount, [coinTypeTag]);
      const result = sendPayloadTx(app.client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a token with symbol=${coinSymbol}}`);
};

const actionShowWallet = async () => {
  const { app, hippoDexAddress, account } = readConfig(program);
  const fullList = await queryFetchFullList(app, hippoDexAddress);
  for (const coinInfo of fullList.coin_info_list) {
    const coinTypeTag = typeInfoToTypeTag(coinInfo.token_type);
    try {
      const coin = await stdlib.Coin.CoinStore.load(app.parserRepo, app.client, account.address(), [coinTypeTag]);
      console.log(`${coinInfo.symbol}: ${coin.coin.value}`);
    } catch (e) {
      console.warn(e);
    }
  }
};

const getFromToAndLps = async (
  app: App,
  hippoDexAddress: HexString,
  fromSymbol: string,
  toSymbol: string,
  fetcher: AptosAccount
) => {
  const fullList = await queryFetchFullList(app, hippoDexAddress);
  let fromTag, toTag;
  const lpTokenTags = [];
  const symbolToCoinTagFullname: Record<string, string> = {};
  for (const coinInfo of fullList.coin_info_list) {
    const coinTypeTag = typeInfoToTypeTag(coinInfo.token_type);
    symbolToCoinTagFullname[coinInfo.symbol.str()] = getTypeTagFullname(coinTypeTag);
    if (coinInfo.symbol.str() === fromSymbol) {
      fromTag = coinTypeTag;
    } else if (coinInfo.symbol.str() === toSymbol) {
      toTag = coinTypeTag;
    }

    // look for our LP token
    if (
      coinTypeTag instanceof StructTag &&
      coinTypeTag.address.hex() === hippoDexAddress.hex() &&
      coinTypeTag.module === hippo_swap.Cp_swap.moduleName &&
      coinTypeTag.name === hippo_swap.Cp_swap.LPToken.structName
    ) {
      lpTokenTags.push(coinTypeTag);
    }
  }
  if (!fromTag) {
    throw new Error(`Unsupported coin symbol: ${fromSymbol}`);
  }
  if (!toTag) {
    throw new Error(`Unsupported coin symbol: ${toSymbol}`);
  }
  return { fromTag, toTag, lpTokenTags };
};

const actionSwap = async (fromSymbol: string, toSymbol: string, amountIn: string) => {
  const amount = u64(amountIn);
  const { app, client, account, hippoDexAddress } = readConfig(program);
  const { fromTag, toTag, lpTokenTags } = await getFromToAndLps(app, hippoDexAddress, fromSymbol, toSymbol, account);
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);

  // identify a pool where the LHS and RHS tokens are exactly fromTag and toTag
  for (const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if (lhsFullname === fromFullname && rhsFullname === toFullname) {
      const payload = hippo_swap.Cp_scripts.buildPayload_swap_script(amount, u64(0), u64(0), u64(0), lpTag.typeParams);
      const result = sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    } else if (rhsFullname === fromFullname && lhsFullname === toFullname) {
      const payload = hippo_swap.Cp_scripts.buildPayload_swap_script(u64(0), amount, u64(0), u64(0), lpTag.typeParams);
      const result = await sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool directly from ${fromSymbol} to ${toSymbol}`);
};

const actionAddLiquidity = async (lhsSymbol: string, rhsSymbol: string, lhsAmtIn: string, rhsAmtIn: string) => {
  const lhsAmt = u64(lhsAmtIn);
  const rhsAmt = u64(rhsAmtIn);
  const { app, client, account, hippoDexAddress } = readConfig(program);
  const { fromTag, toTag, lpTokenTags } = await getFromToAndLps(app, hippoDexAddress, lhsSymbol, rhsSymbol, account);
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);
  for (const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if (lhsFullname === fromFullname && rhsFullname === toFullname) {
      const payload = await hippo_swap.Cp_scripts.buildPayload_add_liquidity_script(lhsAmt, rhsAmt, lpTag.typeParams);
      const result = await sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool for ${lhsSymbol}-${rhsSymbol}`);
};

const actionRemoveLiquidity = async (lhsSymbol: string, rhsSymbol: string, removeAmtStr: string) => {
  const removeAmt = u64(removeAmtStr);
  const { app, client, account, hippoDexAddress } = readConfig(program);
  const { fromTag, toTag, lpTokenTags } = await getFromToAndLps(app, hippoDexAddress, lhsSymbol, rhsSymbol, account);
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);
  for (const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if (lhsFullname === fromFullname && rhsFullname === toFullname) {
      const payload = hippo_swap.Cp_scripts.buildPayload_remove_liquidity_script(
        removeAmt,
        u64(0),
        u64(0),
        lpTag.typeParams
      );
      const result = await sendPayloadTx(client, account, payload);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool for ${lhsSymbol}-${rhsSymbol}`);
};

const actionMockDeploy = async () => {
  const { client, account } = readConfig(program);
  const payload = await hippo_swap.Cp_scripts.buildPayload_mock_deploy_script();
  await sendPayloadTx(client, account, payload);
  console.log('CPSwap');
  const pieceSwapPayload = await hippo_swap.Piece_swap_script.buildPayload_mock_deploy_script();
  await sendPayloadTx(client, account, pieceSwapPayload);
  console.log('PieceSwap');
};

const actionListModules = async () => {
  const { client, hippoDexAddress } = readConfig(program);
  try {
    const result = await client.getAccountModules(hippoDexAddress);
    printResources(result);
  } catch (e) {
    console.log(e);
  }
};

const program = new Command();

program
  .name('hippo-cli')
  .description('Hippo SDK cli tool.')
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")')
  .option('-p, --profile <PROFILE>', 'aptos config profile to use', 'default');

program.command('mock-deploy').action(actionMockDeploy);

program.command('list-modules').action(actionListModules);

program.command('show-token-registry').action(actionShowTokenRegistry);

program.command('show-pools').action(actionShowPools);

program.command('hit-faucet').argument('<coin-name>').argument('<raw-amount>').action(actionHitFaucet);

program.command('show-wallet').action(actionShowWallet);

program.command('swap').argument('<from-coin>').argument('<to-coin>').argument('<raw-amount-in>').action(actionSwap);

program
  .command('add-liquidity')
  .argument('<lhs-coin>')
  .argument('<rhs-coin>')
  .argument('<raw-lhs-amount-in>')
  .argument('<raw-rhs-amount-in>')
  .action(actionAddLiquidity);

program
  .command('remove-liquidity')
  .argument('<lhs-coin>')
  .argument('<rhs-coin>')
  .argument('<liquidity-amount-out>')
  .action(actionRemoveLiquidity);

const testCommand = new Command('test');

const testHippoClient = async () => {
  const { app, netConf } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  swapClient.printSelf();
};

const testWalletClient = async () => {
  const { app, account, netConf } = readConfig(program);
  const walletClient = await HippoWalletClient.createInTwoCalls(netConf, app, account.address());
  walletClient.debugPrint();
};

const testWalletClientFaucet = async (symbol: string, uiAmount: string) => {
  const uiAmountNum = Number.parseFloat(uiAmount);
  if (uiAmountNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const { app, account, netConf } = readConfig(program);
  const walletClient = await HippoWalletClient.createInTwoCalls(netConf, app, account.address());
  const payload = await walletClient.makeFaucetMintToPayload(uiAmountNum, symbol);
  await sendPayloadTx(app.client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
  await walletClient.refreshStores();
  walletClient.debugPrint();
};

const testClientSwap = async (fromSymbol: string, toSymbol: string, uiAmtIn: string) => {
  const { app, netConf, account } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const uiAmtInNum = Number.parseFloat(uiAmtIn);
  if (uiAmtInNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const result = swapClient.getBestQuoteBySymbols(fromSymbol, toSymbol, uiAmtInNum, 3);
  if (!result) {
    console.log('No route');
    return;
  }
  const { bestRoute } = result;
  const payload = await bestRoute.makeSwapPayload(uiAmtInNum, 0);
  await sendPayloadTx(app.client, account, payload);
  await testWalletClient();
};

const testClientSimulateSwap = async (fromSymbol: string, toSymbol: string, uiAmtIn: string) => {
  const { app, netConf, account } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const uiAmtInNum = Number.parseFloat(uiAmtIn);
  if (uiAmtInNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const result = swapClient.getBestQuoteBySymbols(fromSymbol, toSymbol, uiAmtInNum, 3);
  if (!result) {
    console.log('No route');
    return;
  }
  const { bestRoute } = result;
  const payload = await bestRoute.makeSwapPayload(uiAmtInNum, 0);
  const simResult = await simulatePayloadTx(app.client, getSimulationKeys(account), payload);
  printResource(simResult);
  await testWalletClient();
};

const testClientQuote = async (fromSymbol: string, toSymbol: string, uiAmtIn: string) => {
  const { app, netConf } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const uiAmtInNum = Number.parseFloat(uiAmtIn);
  if (uiAmtInNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const result = await swapClient.getBestQuoteBySymbols(fromSymbol, toSymbol, uiAmtInNum, 3);
  if (!result) {
    console.log('No route');
    return;
  }
  const { bestQuote } = result;
  printResource(bestQuote);
};

const poolTypeMap = {
  cp: PoolType.CONSTANT_PRODUCT,
  stable: PoolType.STABLE_CURVE,
  piece: PoolType.THREE_PIECE
};

function cliPoolTypeToPoolType(poolType: string): PoolType {
  if (poolType in poolTypeMap) {
    return poolTypeMap[poolType as keyof typeof poolTypeMap];
  }
  throw new Error(`${poolType} does not refer to a valid poolType. Valid values are: ${Object.keys(poolTypeMap)}`);
}

const testClientAddLiquidity = async (
  poolTypeStr: string,
  lhsSymbol: string,
  rhsSymbol: string,
  lhsUiAmtStr: string,
  rhsUiAmtStr: string
) => {
  const { app, account, netConf } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const lhsUiAmt = Number.parseFloat(lhsUiAmtStr);
  const rhsUiAmt = Number.parseFloat(rhsUiAmtStr);
  if (lhsUiAmt <= 0 || rhsUiAmt <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const poolType = cliPoolTypeToPoolType(poolTypeStr);
  const pools = swapClient.getDirectPoolsBySymbolsAndPoolType(lhsSymbol, rhsSymbol, poolType);
  if (pools.length === 0) {
    return;
  }
  if (pools.length !== 1) {
    console.log('Found multiple pools of the same type???');
    return;
  }
  if (pools[0].xCoinInfo.symbol.str() !== lhsSymbol || pools[0].yCoinInfo.symbol.str() !== rhsSymbol) {
    console.log('Pool mismatch');
    return;
  }
  const payload = await pools[0].makeAddLiquidityPayload(lhsUiAmt, rhsUiAmt);
  await sendPayloadTx(app.client, account, payload);
  await testWalletClient();
};

const testClientRemoveLiquidity = async (
  poolTypeStr: string,
  lhsSymbol: string,
  rhsSymbol: string,
  liquidityUiAmtStr: string
) => {
  const { app, account, netConf } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const liquidityUiAmt = Number.parseFloat(liquidityUiAmtStr);
  if (liquidityUiAmt <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const poolType = cliPoolTypeToPoolType(poolTypeStr);
  const pools = swapClient.getDirectPoolsBySymbolsAndPoolType(lhsSymbol, rhsSymbol, poolType);
  if (pools.length === 0) {
    console.log('Corresponding pool does not exist');
    return;
  }
  if (pools.length !== 1) {
    console.log('Found multiple pools of the same type???');
    return;
  }
  if (pools[0].xCoinInfo.symbol.str() !== lhsSymbol || pools[0].yCoinInfo.symbol.str() !== rhsSymbol) {
    console.log('Pool mismatch');
    return;
  }
  const payload = await pools[0].makeRemoveLiquidityPayload(liquidityUiAmt, 0, 0);
  await sendPayloadTx(app.client, account, payload);
  await testWalletClient();
};

const testShowSupply = async (symbol: string) => {
  const { app, netConf } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const supply = await swapClient.getTokenTotalSupplyBySymbol(symbol);
  console.log(supply);
};

const testShowRoutes = async (lhsSymbol: string, rhsSymbol: string) => {
  const { app, netConf } = readConfig(program);
  const swapClient = await HippoSwapClient.createInOneCall(app, netConf);
  const routes = swapClient.getSteppedRoutesBySymbol(lhsSymbol, rhsSymbol, 3);
  printResources(routes.map((r) => r.summarize()));
};

// sub-commands
testCommand.command('hippo-client').action(testHippoClient);

testCommand.command('wallet-client').action(testWalletClient);

testCommand
  .command('wallet-client-faucet')
  .argument('<token-symbol>')
  .argument('<token-amount>')
  .action(testWalletClientFaucet);

testCommand
  .command('swap')
  .argument('<from-symbol>')
  .argument('<to-symbol>')
  .argument('<ui-amount-in>')
  .action(testClientSwap);

testCommand
  .command('simulate-swap')
  .argument('<from-symbol>')
  .argument('<to-symbol>')
  .argument('<ui-amount-in>')
  .action(testClientSimulateSwap);

testCommand
  .command('quote')
  .argument('<from-symbol>')
  .argument('<to-symbol>')
  .argument('<ui-amount-in>')
  .action(testClientQuote);

testCommand
  .command('add-liquidity')
  .argument('<pool-type>', "pool-type may be 'cp' or 'stable'")
  .argument('<lhs-symbol>')
  .argument('<rhs-symbol>')
  .argument('<lhs-ui-amount-in>')
  .argument('<rhs-ui-amount-in>')
  .action(testClientAddLiquidity);

testCommand
  .command('remove-liquidity')
  .argument('<pool-type>', "pool-type may be 'cp' or 'stable'")
  .argument('<lhs-symbol>')
  .argument('<rhs-symbol>')
  .argument('<liquidity-ui-amount>')
  .action(testClientRemoveLiquidity);

testCommand.command('show-supply').argument('<SYMBOL>').action(testShowSupply);

testCommand.command('show-routes').argument('<lhs-symbol>').argument('<rhs-symbol>').action(testShowRoutes);

program.addCommand(testCommand);

// other random things

const checkTestCoin = async () => {
  const { app, client, account, hippoDexAddress } = readConfig(program);
  const repo = getProjectRepo();
  const testCoinTag = new StructTag(
    stdlib.Aptos_coin.moduleAddress,
    stdlib.Aptos_coin.moduleName,
    stdlib.Aptos_coin.AptosCoin.structName,
    []
  );
  const testCoinInfo = await CoinInfo.load(repo, client, stdlib.Aptos_coin.moduleAddress, [testCoinTag]);
  printResource(testCoinInfo);
  const fullList = await queryFetchFullList(app, hippoDexAddress);
  for (const tokenInfo of fullList.coin_info_list) {
    const tag = typeInfoToTypeTag(tokenInfo.token_type);
    if (getTypeTagFullname(tag) === getTypeTagFullname(testCoinTag)) {
      console.log('Aptos already registered.');
      return;
    }
  }
  const payload = app.coin_list.coin_list.payload_add_to_registry_by_signer(
    strToString('Aptos', app.cache),
    strToString('APT', app.cache),
    strToString('Aptos Coin', app.cache),
    strToString('https://miro.medium.com/max/3150/1*Gf747eyRywU8Img0tK5wvw.png', app.cache),
    strToString('https://aptoslabs.com/', app.cache),
    false,
    [testCoinTag]
  );
  const result = await sendPayloadTx(client, account, payload);
  console.log(result);
};

const updateTokenRegistry = async (
  name: string,
  symbol: string,
  coin_gecko_id: string,
  logo_url: string,
  project_url: string
) => {
  const { app, client, account } = readConfig(program);
  const testCoinTag = new StructTag(
    stdlib.Aptos_coin.moduleAddress,
    stdlib.Aptos_coin.moduleName,
    stdlib.Aptos_coin.AptosCoin.structName,
    []
  );
  const testCoinInfo = await CoinInfo.load(app.parserRepo, client, stdlib.Aptos_coin.moduleAddress, [testCoinTag]);
  printResource(testCoinInfo);
  const payload = app.coin_list.coin_list.payload_add_to_registry_by_signer(
    strToString(name, app.cache),
    strToString(symbol, app.cache),
    strToString(coin_gecko_id, app.cache),
    strToString(logo_url, app.cache),
    strToString(project_url, app.cache),
    true,
    [testCoinTag]
  );
  await sendPayloadTx(client, account, payload);
};

const furnishMockTokenDetails = async () => {
  // yes we steal from solana-token-list
  await updateTokenRegistry(
    'USDT',
    'Tether',
    'tether',
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
    'https://tether.to/'
  );
  await updateTokenRegistry(
    'USDC',
    'USDC',
    'usd-coin',
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    'https://www.centre.io/'
  );
  await updateTokenRegistry(
    'DAI',
    'DAI',
    'dai',
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1/logo.png',
    'https://makerdao.com/'
  );
  await updateTokenRegistry(
    'BTC',
    'Bitcoin',
    'bitcoin',
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
    'https://bitcoin.org'
  );
};

const others = new Command('others');

others.command('check-test-coin').action(checkTestCoin);

others
  .command('update-token-registry')
  .argument('<SYMBOL>')
  .argument('<description>')
  .argument('<logo_url>')
  .argument('<project_url>')
  .action(updateTokenRegistry);

others.command('furnish-token-details').action(furnishMockTokenDetails);

program.addCommand(others);

const pontemListPools = async () => {
  const { client, hippoDexAddress } = readConfig(program);
  const resources = await client.getAccountResources(hippoDexAddress);
  for (const resource of resources) {
    if (resource.type.indexOf('liquidity_pool::LiquidityPool') >= 0) {
      console.log('##########');
      const tag = parseMoveStructTag(resource.type);
      console.log(`LHS: ${(tag.typeParams[0] as StructTag).getFullname()}`);
      console.log(`RHS: ${(tag.typeParams[1] as StructTag).getFullname()}`);
      console.log(`LP: ${(tag.typeParams[2] as StructTag).getFullname()}`);
    }
  }
};

const pontem = new Command('pontem').description('pontem DEX');

pontem.command('list-pools').action(pontemListPools);

program.addCommand(pontem);

const aggListTradingPools = async () => {
  const { client } = readConfig(program);
  try {
    const agg = await TradeAggregator.create(client);
    for (const pool of agg.allPools) {
      console.log('###########');
      console.log(`Pair: ${pool.xCoinInfo.symbol.str()} - ${pool.yCoinInfo.symbol.str()}`);
      console.log(`Dex: ${DEX_TYPE_NAME[pool.dexType]}`);
      console.log(`PoolType: ${pool.poolType.toJsNumber()}`);
      console.log();
    }
  } catch (e) {
    console.log(e);
  }
};

const aggListRoutes = async (fromSymbol: string, toSymbol: string) => {
  const { client } = readConfig(program);
  const agg = await TradeAggregator.create(client);
  const xCoinInfo = agg.registryClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfo = agg.registryClient.getCoinInfoBySymbol(toSymbol);
  const routes = agg.getAllRoutes(xCoinInfo, yCoinInfo);
  for (const route of routes) {
    console.log('###########');
    route.debugPrint();
  }
};

const aggListQuotes = async (fromSymbol: string, toSymbol: string, inputUiAmt: string) => {
  const { client } = readConfig(program);
  const agg = await TradeAggregator.create(client);
  const xCoinInfo = agg.registryClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfo = agg.registryClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfo, yCoinInfo);
  for (const quote of quotes) {
    console.log('###########');
    quote.route.debugPrint();
    console.log(`Quote input: ${quote.quote.inputUiAmt}`);
    console.log(`Quote output: ${quote.quote.outputUiAmt}`);
  }
};

const aggSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string) => {
  const { client, account } = readConfig(program);
  const agg = await TradeAggregator.create(client);
  const xCoinInfo = agg.registryClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfo = agg.registryClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfo, yCoinInfo);
  if (quotes.length === 0) {
    console.log('No route available');
    return;
  }
  const payload = quotes[0].route.makeSwapPayload(inputAmt, 0);
  await sendPayloadTxAndLog(client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
  await testWalletClient();
};

const aggSwapWithRoute = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, routeIdx: string) => {
  const { client, account } = readConfig(program);
  const agg = await TradeAggregator.create(client);
  const xCoinInfo = agg.registryClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfo = agg.registryClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfo, yCoinInfo);
  if (quotes.length === 0) {
    console.log('No route available');
    return;
  }
  const payload = quotes[parseInt(routeIdx)].route.makeSwapPayload(inputAmt, 0);
  await sendPayloadTxAndLog(client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
  await testWalletClient();
};

const aggSimulateSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, minOutAmt: string) => {
  const { client, account } = readConfig(program);
  const agg = await TradeAggregator.create(client);
  const xCoinInfo = agg.registryClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfo = agg.registryClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const minOutUiAmt = parseFloat(minOutAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfo, yCoinInfo);
  if (quotes.length === 0) {
    console.log('No route available');
    return;
  }
  const payload = quotes[0].route.makePayload(inputAmt, minOutUiAmt);
  const simResult = await simulatePayloadTx(
    client,
    getSimulationKeys(account),
    payload as TxnBuilderTypes.TransactionPayloadEntryFunction
  );
  printResource(simResult);
  await testWalletClient();
};

const aggSimulateSwapWithRoute = async (
  fromSymbol: string,
  toSymbol: string,
  inputUiAmt: string,
  minOutAmt: string,
  routeIdx: string
) => {
  const { client, account } = readConfig(program);
  const agg = await TradeAggregator.create(client);
  const xCoinInfo = agg.registryClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfo = agg.registryClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const minOutUiAmt = parseFloat(minOutAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfo, yCoinInfo);
  if (quotes.length === 0) {
    console.log('No route available');
    return;
  }
  const payload = quotes[parseInt(routeIdx)].route.makePayload(inputAmt, minOutUiAmt);
  const simResult = await simulatePayloadTx(
    client,
    getSimulationKeys(account),
    payload as TxnBuilderTypes.TransactionPayloadEntryFunction
  );
  printResource(simResult);
  await testWalletClient();
};

const agg = new Command('agg').description('aggregator');

agg.command('list-trading-pools').action(aggListTradingPools);

agg.command('list-routes').argument('<fromSymbol>').argument('<toSymbol>').action(aggListRoutes);

agg
  .command('list-quotes')
  .argument('<fromSymbol>')
  .argument('<toSymbol>')
  .argument('<inputUiAmt>')
  .action(aggListQuotes);

agg.command('swap').argument('<fromSymbol>').argument('<toSymbol>').argument('<inputUiAmt>').action(aggSwap);

agg
  .command('swap-with-route')
  .argument('<fromSymbol>')
  .argument('<toSymbol>')
  .argument('<inputUiAmt>')
  .argument('<routeIdx>')
  .action(aggSwapWithRoute);

agg
  .command('simulate-swap')
  .argument('<fromSymbol>')
  .argument('<toSymbol>')
  .argument('<inputUiAmt>')
  .argument('<minOutUiAmt>')
  .action(aggSimulateSwap);

agg
  .command('simulate-swap-with-route')
  .argument('<fromSymbol>')
  .argument('<toSymbol>')
  .argument('<inputUiAmt>')
  .argument('<minOutUiAmt>')
  .argument('<routeIdx>')
  .action(aggSimulateSwapWithRoute);

program.addCommand(agg);

program.parse();
