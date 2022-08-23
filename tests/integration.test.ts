import { AptosAccount, AptosClient, FaucetClient } from 'aptos';
import { CONFIGS, HippoSwapClient, HippoWalletClient } from '../src';
import { printResource } from '../src/utils';
import { App } from "../src/generated"
import {sendPayloadTx} from "@manahippo/move-to-ts";
const { localhost: HIPPO_CONF } = CONFIGS;


describe('Integration Tests', () => {
  let client: AptosClient, account: AptosAccount, swapClient: HippoSwapClient, walletClient: HippoWalletClient;
  let app: App
  it('create app', async () => {

    client = new AptosClient(HIPPO_CONF.fullNodeUrl);
    app = new App(client)
    account = new AptosAccount();
    const faucetClient = new FaucetClient(HIPPO_CONF.fullNodeUrl, HIPPO_CONF.faucetUrl);
    await faucetClient.fundAccount(account.address(), 100000);
    swapClient = await HippoSwapClient.createInOneCall(app, HIPPO_CONF);
    walletClient = await HippoWalletClient.createInTwoCalls(HIPPO_CONF, app, account.address(), account);

  });

  it('get quotes of USDC -> DAI', async () => {
    // const result =app.hippo_swap.client.getBestQuoteBySymbols('USDC', 'DAI', 10, 3);
    // const { bestQuote } = result!;
    // printResource(bestQuote);
  });

  it('get quotes of BTC -> USDT', async () => {
    // CP Swap Pool
    const result = await swapClient.getBestQuoteBySymbols('USDT', 'BTC',10, 3);
    const { bestQuote } = result!;
    printResource(bestQuote);
  });

  it('faucet mint coins for account', async () => {
    await sendPayloadTx(client, account, await walletClient.makeFaucetMintToPayload(100, 'BTC'));
    await sendPayloadTx(client, account, await walletClient.makeFaucetMintToPayload(1000, 'USDT'));
    await sendPayloadTx(client, account, await walletClient.makeFaucetMintToPayload(1000, 'USDC'));
    await sendPayloadTx(client, account, await walletClient.makeFaucetMintToPayload(1000, 'DAI'));
    await walletClient.refreshStores();
    walletClient.debugPrint();
  });

  it('get direct pool', async () => {
    let pools = await swapClient.getDirectPoolsBySymbols('USDT', 'BTC');
    printResource(pools.map(pool => pool.lpTokenInfo.name));
    pools = await swapClient.getDirectPoolsBySymbols('USDC', 'DAI');
    printResource(pools.map(pool => pool.lpTokenInfo.name));
  });


});
