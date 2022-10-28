import {
  getTypeTagFullname,
  StructTag,
  u64,
  parseMoveStructTag,
  sendPayloadTx,
  simulatePayloadTx,
  getSimulationKeys
} from '@manahippo/move-to-ts';
import { Command } from 'commander';
import { stdlib } from '../generated/';
import { Devnet_coins } from '../generated/coin_list';
import { printResource, queryFetchFullList, typeInfoToTypeTag } from '../utils';
import { readConfig } from './utils';
import { HippoWalletClient } from '../wallet';
import { TradeAggregator } from '../aggregator/TradeAggregator';
import { DEX_TYPE_NAME } from '../aggregator/types';
import { TxnBuilderTypes } from 'aptos';

const actionShowTokenRegistry = async () => {
  const { app, coinListAddress } = readConfig(program);
  const fullList = await queryFetchFullList(app, coinListAddress);
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

const actionHitFaucet = async (coinSymbol: string, rawAmount: string, _options: any) => {
  const amount = u64(rawAmount);
  const { app, coinListAddress, account } = readConfig(program);
  const fullList = await queryFetchFullList(app, coinListAddress);
  for (const coinInfo of fullList.coin_info_list) {
    if (coinInfo.symbol.str() === coinSymbol) {
      const coinTypeTag = typeInfoToTypeTag(coinInfo.token_type);
      const payload = Devnet_coins.buildPayload_mint_to_wallet(amount, [coinTypeTag]);
      const result = await sendPayloadTx(
        app.client,
        account,
        payload as TxnBuilderTypes.TransactionPayloadEntryFunction
      );
      printResource(result);
      return;
    }
  }
  throw new Error(`Did not find a token with symbol=${coinSymbol}}`);
};

const actionShowWallet = async () => {
  const { app, coinListAddress, account } = readConfig(program);
  const fullList = await queryFetchFullList(app, coinListAddress);
  for (const coinInfo of fullList.coin_info_list) {
    const coinTypeTag = typeInfoToTypeTag(coinInfo.token_type);
    try {
      const coin = await stdlib.Coin.CoinStore.load(app.parserRepo, app.client, account.address(), [coinTypeTag]);
      console.log(`${coinInfo.symbol.str()}: ${coin.coin.value.toJsNumber()}`);
    } catch (e) {
      // todo
      console.log(`${coinInfo.symbol.str()}: ${'0'}`);
    }
  }
};

const program = new Command();

program
  .name('hippo-cli')
  .description('Hippo SDK cli tool.')
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")')
  .option('-p, --profile <PROFILE>', 'aptos config profile to use', 'default');

program.command('show-token-coinList').action(actionShowTokenRegistry);

program.command('hit-faucet').argument('<coin-name>').argument('<raw-amount>').action(actionHitFaucet);

program.command('show-wallet').action(actionShowWallet);

const testCommand = new Command('test');

const testWalletClient = async () => {
  const { client, account, netConf } = readConfig(program);
  const walletClient = await HippoWalletClient.create(client, account.address(), netConf);
  walletClient.debugPrint();
};

const testWalletClientFaucet = async (symbol: string, uiAmount: string) => {
  const uiAmountNum = Number.parseFloat(uiAmount);
  if (uiAmountNum <= 0) {
    throw new Error(`Input amount needs to be greater than 0`);
  }
  const { client, account, netConf } = readConfig(program);
  const walletClient = await HippoWalletClient.create(client, account.address(), netConf);
  const payload = await walletClient.makeFaucetMintToPayload(uiAmountNum, symbol);
  await sendPayloadTx(client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
  await walletClient.refreshStores();
  walletClient.debugPrint();
};

testCommand.command('wallet-client').action(testWalletClient);

testCommand
  .command('wallet-client-faucet')
  .argument('<token-symbol>')
  .argument('<token-amount>')
  .action(testWalletClientFaucet);

program.addCommand(testCommand);

const pontemListPools = async () => {
  const { client, coinListAddress } = readConfig(program);
  const resources = await client.getAccountResources(coinListAddress);
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
  try {
    const { client, netConf } = readConfig(program);
    const agg = await TradeAggregator.create(client, netConf);
    for (const pool of agg.allPools) {
      console.log('###########');
      console.log(`Pair: ${pool.xCoinInfo.symbol} - ${pool.yCoinInfo.symbol}`);
      console.log(`Dex: ${DEX_TYPE_NAME[pool.dexType]}`);
      console.log(`PoolType: ${pool.poolType.toJsNumber()}`);
      console.log();
    }
  } catch (e) {
    console.log(e);
  }
};

const aggListRoutes = async (fromSymbol: string, toSymbol: string) => {
  const { client, netConf } = readConfig(program);
  const agg = await TradeAggregator.create(client, netConf);
  const xCoinInfos = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfos = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
  const routes = agg.getAllRoutes(xCoinInfos[0], yCoinInfos[0]);
  for (const route of routes) {
    console.log('###########');
    route.debugPrint();
  }
};

const aggListQuotes = async (fromSymbol: string, toSymbol: string, inputUiAmt: string) => {
  const { client, netConf } = readConfig(program);
  const agg = await TradeAggregator.create(client, netConf);
  const xCoinInfos = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfos = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfos[0], yCoinInfos[0]);
  for (const quote of quotes) {
    console.log('###########');
    quote.route.debugPrint();
    console.log(`Quote input: ${quote.quote.inputUiAmt}`);
    console.log(`Quote output: ${quote.quote.outputUiAmt}`);
  }
};

const aggSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string) => {
  const { netConf, account, client } = readConfig(program);
  const agg = await TradeAggregator.create(client, netConf);
  const xCoinInfos = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfos = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfos[0], yCoinInfos[0]);
  if (quotes.length === 0) {
    console.log('No route available');
    return;
  }
  const payload = quotes[0].route.makePayload(inputAmt, 0);
  await sendPayloadTx(client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
  await testWalletClient();
};

const aggSwapWithRoute = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, routeIdx: string) => {
  const { netConf, account, client } = readConfig(program);
  const agg = await TradeAggregator.create(client, netConf);
  const xCoinInfos = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfos = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfos[0], yCoinInfos[0]);
  if (quotes.length === 0) {
    console.log('No route available');
    return;
  }
  const payload = quotes[parseInt(routeIdx)].route.makePayload(inputAmt, 0);
  await sendPayloadTx(client, account, payload as TxnBuilderTypes.TransactionPayloadEntryFunction);
  await testWalletClient();
};

const aggSimulateSwap = async (fromSymbol: string, toSymbol: string, inputUiAmt: string, minOutAmt: string) => {
  const { netConf, account, client } = readConfig(program);
  const agg = await TradeAggregator.create(client, netConf);
  const xCoinInfos = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfos = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const minOutUiAmt = parseFloat(minOutAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfos[0], yCoinInfos[0]);
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
  const { netConf, account, client } = readConfig(program);
  const agg = await TradeAggregator.create(client, netConf);
  const xCoinInfos = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
  const yCoinInfos = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
  const inputAmt = parseFloat(inputUiAmt);
  const minOutUiAmt = parseFloat(minOutAmt);
  const quotes = await agg.getQuotes(inputAmt, xCoinInfos[0], yCoinInfos[0]);
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
