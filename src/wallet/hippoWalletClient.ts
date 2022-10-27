import { getTypeTagFullname, StructTag, u64 } from '@manahippo/move-to-ts';
import { HexString, TxnBuilderTypes, Types } from 'aptos';
import * as AptosFramework from '../generated/stdlib';
import { getCoinStoresForAddress } from '../utils';
import { App } from '../generated';
import { coinInfoToTag, CoinListClient, NetworkType } from '@manahippo/coin-list';
import { CONFIGS } from '../config';

export class HippoWalletClient {
  public symbolToCoinStore: Record<string, AptosFramework.Coin.CoinStore>;
  public fullnameToCoinStore: Record<string, AptosFramework.Coin.CoinStore>;
  public coinStores: AptosFramework.Coin.CoinStore[];
  public coinListClient: CoinListClient;

  constructor(
    public app: App,
    public walletAddress: HexString,
    netConfig = CONFIGS.mainnet,
    coinListClient?: CoinListClient
  ) {
    this.symbolToCoinStore = {};
    this.fullnameToCoinStore = {};
    this.coinStores = [];
    this.coinListClient = coinListClient ? coinListClient : new CoinListClient(netConfig.name as NetworkType);
  }

  static async create(
    app: App,
    walletAddress: HexString,
    netConfig = CONFIGS.mainnet,
    coinListClient?: CoinListClient
  ) {
    const hippoWalletClient = new HippoWalletClient(app, walletAddress, netConfig, coinListClient);
    await hippoWalletClient.refreshStores();
    return hippoWalletClient;
  }

  async refreshStores(version: undefined | number | bigint = undefined) {
    this.coinStores = await getCoinStoresForAddress(this.app.client, this.walletAddress, this.app.parserRepo, version);
    await this.buildCache();
  }

  buildCache() {
    this.symbolToCoinStore = {};
    this.fullnameToCoinStore = {};
    for (const store of this.coinStores) {
      if (!(store.typeTag instanceof StructTag)) {
        throw new Error();
      }
      const typeTag = store.typeTag.typeParams[0];
      if (!typeTag) {
        throw new Error();
      }
      const fullname = getTypeTagFullname(typeTag);
      this.fullnameToCoinStore[fullname] = store;
      const tokenInfo = this.coinListClient.fullnameToCoinInfo[fullname];
      if (!tokenInfo) {
        // token not part of our coinList
        continue;
      }
      this.symbolToCoinStore[tokenInfo.symbol] = store;
    }
  }

  makeFaucetMintToPayload(
    uiAmount: number,
    symbol: string,
    isJSONPayload = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    const tokenInfo = this.coinListClient.symbolToCoinInfo[symbol][0];
    if (!tokenInfo) {
      throw new Error(`Cannot find TokenInfo for ${symbol}`);
    }
    const rawAmount = u64(Math.floor(uiAmount * Math.pow(10, tokenInfo.decimals)));
    const tokenTypeTag = coinInfoToTag(tokenInfo);
    return this.app.coin_list.devnet_coins.payload_mint_to_wallet(rawAmount, [tokenTypeTag], isJSONPayload);
  }

  debugPrint() {
    for (const symbol in this.symbolToCoinStore) {
      const store = this.symbolToCoinStore[symbol];
      const tokenInfo = this.coinListClient.symbolToCoinInfo[symbol][0];
      console.log(`${tokenInfo.symbol}: ${store.coin.value.toJsNumber() / Math.pow(10, tokenInfo.decimals)}`);
    }
  }
}
