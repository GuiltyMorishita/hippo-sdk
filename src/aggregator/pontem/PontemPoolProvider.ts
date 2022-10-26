import { TradingPool, TradingPoolProvider } from '../types';

import { typeTagToTypeInfo } from '../../utils';
import { PontemTradingPool } from './PontemTradingPool';
import { POOLS } from './pools';
import { toStructTag } from '../utils';

export class PontemPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddress = this.netConfig.pontemAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const curvesTag = this.app.liquidswap.curves.Uncorrelated.getTag();
      const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new PontemTradingPool(ownerAddress, xCoinInfo, yCoinInfo, curvesTag);
      poolList.push(pool);
    }
    return poolList;
  }
}
