import { Type_info } from '../generated/stdlib';
import { CoinInfo } from '../generated/coin_list/coin_list';
import { App } from '../generated';
import { queryFetchFullList } from '../utils';

export class CoinListClient {
  fullnameToCoinInfo: Record<string, CoinInfo>;
  symbolToCoinInfo: Record<string, CoinInfo>;
  coinList: CoinInfo[];
  constructor(public app: App) {
    this.fullnameToCoinInfo = {};
    this.symbolToCoinInfo = {};
    this.coinList = [];
  }

  hasTokenType(tokenType: Type_info.TypeInfo) {
    return tokenType.typeFullname() in this.fullnameToCoinInfo;
  }

  getCoinInfoList() {
    return this.coinList;
  }

  getCoinInfoBySymbol(symbol: string) {
    return this.symbolToCoinInfo[symbol];
  }

  getCoinInfoByType(tokenType: Type_info.TypeInfo) {
    return this.fullnameToCoinInfo[tokenType.typeFullname()];
  }

  static async load(app: App) {
    const coinRegistry = new CoinListClient(app);
    await coinRegistry.buildCache();
    return coinRegistry;
  }

  private async buildCache() {
    const fullList = await queryFetchFullList(this.app, CoinInfo.moduleAddress);
    this.coinList = fullList.coin_info_list;
    for (const tokenInfo of fullList.coin_info_list) {
      const fullname = tokenInfo.token_type.typeFullname();
      this.fullnameToCoinInfo[fullname] = tokenInfo;
      this.symbolToCoinInfo[tokenInfo.symbol.str()] = tokenInfo;
    }
  }
}
