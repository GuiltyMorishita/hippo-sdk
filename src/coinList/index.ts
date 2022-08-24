import { AptosAccount } from "aptos";
import { TypeInfo } from "../generated/aptos_std/type_info";
import { Router } from "../generated/hippo_swap"
import { CoinInfo } from "../generated/coin_list/coin_list";
import { App } from "../generated";

export class CoinListClient {
  fullnameToCoinInfo: Record<string, CoinInfo>;
  symbolToCoinInfo: Record<string, CoinInfo>;
  coinList: CoinInfo[]
  constructor(
    public app: App,
    public fetcher: AptosAccount
  ) {
    this.fullnameToCoinInfo = {};
    this.symbolToCoinInfo = {}
    this.coinList = []
  }

  hasTokenType(tokenType: TypeInfo) {
    return tokenType.typeFullname() in this.fullnameToCoinInfo;
  }

  getCoinInfoList() {
    return this.coinList
  }

  getCoinInfoBySymbol(symbol: string) {
    return this.symbolToCoinInfo[symbol];
  }

  getCoinInfoByType(tokenType: TypeInfo) {
    return this.fullnameToCoinInfo[tokenType.typeFullname()];
  }

  static async load(app: App, fetcher: AptosAccount) {
    let coinRegistry = new CoinListClient(app, fetcher)
    await coinRegistry.buildCache()
    return coinRegistry;
  }

  private async buildCache() {
    const fullList = await this.app.coin_list.coin_list.query_fetch_full_list(
        this.fetcher,
        Router.moduleAddress,
        []
    )
    this.coinList = fullList.coin_info_list
    for(const tokenInfo of fullList.coin_info_list) {
      const fullname = tokenInfo.token_type.typeFullname();
      this.fullnameToCoinInfo[fullname] = tokenInfo;
      this.symbolToCoinInfo[tokenInfo.symbol.str()] = tokenInfo;
    }
  }
}