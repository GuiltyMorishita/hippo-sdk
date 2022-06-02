import { getTypeTagFullname, parseTypeTagOrThrow, StructTag, TypeTag } from "@manahippo/aptos-tsgen";
import { AptosAccount, AptosClient, HexString, Types } from "aptos";
import bigInt from "big-integer";
import { Command } from "commander";
import * as fs from "fs";
import * as yaml from "yaml";
import { getParserRepo } from "../generated/repo";
import * as SwapTs from "../generated/X0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68";
import * as X0x1 from "../generated/X0x1";

const readConfig = (path: string) => {
  const ymlContent = fs.readFileSync(path, {encoding: "utf-8"});
  const result = yaml.parse(ymlContent);
  console.log(result);
  if (!result.profiles) {
    throw new Error("Expect a profiles to be present in yaml config");
  }
  if (!result.profiles.default) {
    throw new Error("Expect a default profile to be present in yaml config");
  }
  if (!result.profiles.default.rest_url) {
    throw new Error("Expect rest_url to be present in default profile");
  }
  if (!result.profiles.default.private_key) {
    throw new Error("Expect private_key to be present in default profile");
  }
  const privateKey = new HexString(result.profiles.default.private_key);
  const client = new AptosClient(result.profiles.default.rest_url);
  const account = new AptosAccount(privateKey.toUint8Array());
  return {client, account};
}

function printResource(resource: any) {
  console.log(JSON.stringify(resource, null, 2));
}

function printResources(resources: any[]) {
  let i = 0;
  console.log(`Total resource count: ${resources.length}`);
  for (const resource of resources) {
    console.log(`##################${i}`);
    printResource(resource);
    i++;
  }
}

function typeInfoToTypeTag(typeInfo: X0x1.TypeInfo.TypeInfo) {
  const fullname =  `${typeInfo.account_address.hex()}::${typeInfo.module_name.toString()}::${typeInfo.struct_name.toString()}`;
  return parseTypeTagOrThrow(fullname);
}

const actionShowTokenRegistry = async () => {
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  const repo = getParserRepo();
  const tokens = await SwapTs.TokenRegistry4.TokenRegistry.load(repo, client, account.address(), []);
  printResource(tokens);
}

const actionShowPools = async () => {
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  const repo = getParserRepo();
  const tokens = await SwapTs.TokenRegistry4.TokenRegistry.load(repo, client, account.address(), []);
  const tokenList = tokens.token_info_list;
  for(const pi of tokenList) {
    const structTag = typeInfoToTypeTag(pi.token_type);
    if (
      structTag instanceof StructTag &&
      structTag.address.hex() === account.address().hex() && 
      structTag.module === SwapTs.CPSwap.moduleName &&
      structTag.name === SwapTs.CPSwap.LPToken.structName
    ) {
      // found our LPToken!
      console.log(structTag.typeParams);
      const poolMeta = await SwapTs.CPSwap.TokenPairMetadata.load(repo, client, account.address(), structTag.typeParams);
      printResource(poolMeta);
    }
  }
}

const actionHitFaucet = async (coinSymbol:string, rawAmount: string, options: any) => {
  const amount = bigInt(rawAmount);
  if (amount.leq(0)) {
    throw new Error("Amount should be number greater than 0, but got: "+rawAmount);
  }
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  const repo = getParserRepo();
  const registry = await SwapTs.TokenRegistry4.TokenRegistry.load(repo, client, account.address(), []);
  for(const ti of registry.token_info_list) {
    if (ti.delisted) {
      continue;
    }
    if (ti.symbol === coinSymbol) {
      const coinTypeTag = typeInfoToTypeTag(ti.token_type);
      const result = await SwapTs.MockCoin.faucet_mint_to_script(client, account, amount, [coinTypeTag]);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a token with symbol=${coinSymbol}}`);
}

const actionShowWallet = async() => {
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  const repo = getParserRepo();
  const registry = await SwapTs.TokenRegistry4.TokenRegistry.load(repo, client, account.address(), []);
  for(const ti of registry.token_info_list) {
    if(ti.delisted) {
      continue;
    }
    const coinTypeTag = typeInfoToTypeTag(ti.token_type);
    const coin = await X0x1.Coin.CoinStore.load(repo, client, account.address(), [coinTypeTag])
    console.log(`${ti.symbol}: ${coin.coin.value}`);
  }
}

const actionSwap = async(fromSymbol: string, toSymbol: string, amountIn: string) => {
  const amount = bigInt(amountIn);
  if (amount.leq(0)) {
    throw new Error("Amount should be number greater than 0, but got: "+amountIn);
  }
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  const repo = getParserRepo();
  const registry = await SwapTs.TokenRegistry4.TokenRegistry.load(repo, client, account.address(), []);
  let fromTag, toTag;
  const lpTokenTags = [];
  const symbolToCoinTagFullname: Record<string, string> = {};
  for(const ti of registry.token_info_list) {
    if(ti.delisted) {
      continue;
    }
    const coinTypeTag = typeInfoToTypeTag(ti.token_type);
    symbolToCoinTagFullname[ti.symbol] = getTypeTagFullname(coinTypeTag);
    if(ti.symbol === fromSymbol) {
      fromTag = coinTypeTag;
    }
    else if(ti.symbol === toSymbol) {
      toTag = coinTypeTag;
    }

    // look for our LP token
    if (
      coinTypeTag instanceof StructTag &&
      coinTypeTag.address.hex() === account.address().hex() && 
      coinTypeTag.module === SwapTs.CPSwap.moduleName &&
      coinTypeTag.name === SwapTs.CPSwap.LPToken.structName
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
  const fromFullname = getTypeTagFullname(fromTag);
  const toFullname = getTypeTagFullname(toTag);

  // identify a pool where the LHS and RHS tokens are exactly fromTag and toTag
  for(const lpTag of lpTokenTags) {
    const lhsFullname = getTypeTagFullname(lpTag.typeParams[0]);
    const rhsFullname = getTypeTagFullname(lpTag.typeParams[1]);
    if(lhsFullname === fromFullname && rhsFullname === toFullname) {
      const result = await SwapTs.CPScripts.swap_script(client, account, amount, bigInt(0), bigInt(0), bigInt(0), lpTag.typeParams);
      console.log(result);
      return;
    }
    else if(rhsFullname === fromFullname && lhsFullname === toFullname) {
      const result = await SwapTs.CPScripts.swap_script(client, account, bigInt(0), amount, bigInt(0), bigInt(0), lpTag.typeParams);
      console.log(result);
      return;
    }
  }
  throw new Error(`Did not find a pool directly from ${fromSymbol} to ${toSymbol}`);
}

const actionMockDeploy = async () => {
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  const repo = getParserRepo();
  const payload = await SwapTs.CPScripts.build_payload_mock_deploy_script([]);
  const txnRequest = await client.generateTransaction(account.address(), payload, {max_gas_amount: "10000"});
  const signedTxn = await client.signTransaction(account, txnRequest);
  const txnResult = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(txnResult.hash);
  const txDetails = (await client.getTransaction(txnResult.hash)) as Types.UserTransaction;
  console.log(txDetails);
}

const actionListModules = async () => {
  const {config} = program.opts();
  const {client, account} = readConfig(config);
  try{
    console.log(client.nodeUrl);
    const result = await client.getAccountModules(account.address());
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
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")');

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

program.parse();