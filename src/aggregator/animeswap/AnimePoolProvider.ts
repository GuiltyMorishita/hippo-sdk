import { typeTagToTypeInfo } from '../../utils';
import { TradingPool, TradingPoolProvider } from '../types';
import { AnimeTradingPool } from './AnimeTradingPool';
import { POOLS } from './pools';
import { toStructTag } from '../utils';

export class AnimePoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddr = this.netConfig.animeAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new AnimeTradingPool(ownerAddr, xCoinInfo, yCoinInfo);
      poolList.push(pool);
    }
    return poolList;
  }
}
