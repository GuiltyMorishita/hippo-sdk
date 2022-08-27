import {
  getTypeTagFullname,
  SimulationKeys,
  StructTag,
  u64
} from "@manahippo/move-to-ts";
import { HexString } from "aptos";
import { NetworkConfiguration } from "../config";

import { Router } from "../generated/hippo_swap"
import * as AptosFramework from "../generated/stdlib";
import * as CoinList from "../generated/coin_list";
import { getCoinStoresForAddress, typeInfoToTypeTag } from "../utils";
import { App } from "../generated";

export class HippoWalletClient {
  public symbolToCoinStore: Record<string, AptosFramework.Coin.CoinStore>;
  public fullnameToCoinStore: Record<string, AptosFramework.Coin.CoinStore>;
  public symbolToTokenInfo: Record<string, CoinList.Coin_list.CoinInfo>;
  public fullnameToTokenInfo: Record<string, CoinList.Coin_list.CoinInfo>;
  public devnetCoinSymbols: string[];

  private constructor(
    public netConf: NetworkConfiguration,
    public app: App,
    public walletAddress: HexString,
    public coinStores: AptosFramework.Coin.CoinStore[],
    public fetcher: SimulationKeys,
  ) {
    this.symbolToCoinStore = {};
    this.fullnameToCoinStore = {};
    this.fullnameToTokenInfo = {};
    this.symbolToTokenInfo = {};
    this.devnetCoinSymbols = [];
  }

  async buildCache() {
    this.symbolToCoinStore = {};
    this.fullnameToCoinStore = {};
    this.fullnameToTokenInfo = {};
    this.symbolToTokenInfo = {};
    this.devnetCoinSymbols = [];
    const fullList = await this.app.coin_list.coin_list.query_fetch_full_list(
        this.fetcher,
        Router.moduleAddress,
        []
    )
    for(const tokenInfo of fullList.coin_info_list) {
      const typeTag = typeInfoToTypeTag(tokenInfo.token_type);
      const fullname = getTypeTagFullname(typeTag);
      this.fullnameToTokenInfo[fullname] = tokenInfo;
      this.symbolToTokenInfo[tokenInfo.symbol.str()] = tokenInfo;
      if(!(typeTag instanceof StructTag)) {
        throw new Error();
      }
      if(
        typeTag.address.hex() === this.app.coin_list.devnet_coins.moduleAddress.hex() &&
        typeTag.module === this.app.coin_list.devnet_coins.moduleName
      ) {
        this.devnetCoinSymbols.push(tokenInfo.symbol.str());
      }
    }
    for(const store of this.coinStores) {
      if(!(store.typeTag instanceof StructTag)) {
        throw new Error();
      }
      const typeTag = store.typeTag.typeParams[0];
      if(!typeTag) {
        throw new Error();
      }
      const fullname = getTypeTagFullname(typeTag);
      this.fullnameToCoinStore[fullname] = store;
      const tokenInfo = this.fullnameToTokenInfo[fullname];
      if(!tokenInfo) {
        // token not part of our registry
        continue;
      }
      this.symbolToCoinStore[tokenInfo.symbol.str()] = store;
    }
  }

  async refreshStores() {
    this.coinStores = await getCoinStoresForAddress(this.app.client, this.walletAddress, this.app.parserRepo);
    await this.buildCache();
  }

  static async createInTwoCalls(
    netConf: NetworkConfiguration,
    app: App,
    walletAddress: HexString,
    fetcher: SimulationKeys,
  ) {
    const stores = await getCoinStoresForAddress(app.client, walletAddress, app.parserRepo);
    const client = new HippoWalletClient(netConf, app, walletAddress, stores, fetcher)
    await client.buildCache()
    return client;
  }

  makeFaucetMintToPayload(uiAmount: number, symbol: string, isJSONPayload = false) {
    if(!this.devnetCoinSymbols.includes(symbol)) {
      throw new Error(`${symbol} is not a MockCoin and we are unable to mint it.`);
    }
    const tokenInfo = this.symbolToTokenInfo[symbol];
    if(!tokenInfo) {
      throw new Error(`Cannot find TokenInfo for ${symbol}`);
    }
    const rawAmount = u64(Math.floor(uiAmount * Math.pow(10, tokenInfo.decimals.toJsNumber())))
    const tokenTypeTag = typeInfoToTypeTag(tokenInfo.token_type);
    return this.app.coin_list.devnet_coins.payload_mint_to_wallet(rawAmount, [tokenTypeTag], isJSONPayload)
  }

  debugPrint() {
    for(const symbol in this.symbolToCoinStore) {
      const store = this.symbolToCoinStore[symbol];
      const tokenInfo = this.symbolToTokenInfo[symbol];
      console.log(`${tokenInfo.symbol.str()}: ${store.coin.value.toJsNumber() / Math.pow(10, tokenInfo.decimals.toJsNumber())}`);
    }
  }
}
