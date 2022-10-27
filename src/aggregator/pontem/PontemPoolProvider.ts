import { TradingPool, TradingPoolProvider } from '../types';

import { typeTagToTypeInfo } from '../../utils';
import { PontemTradingPool } from './PontemTradingPool';
import { POOLS } from './pools';
import { toStructTag } from '../utils';

export class PontemPoolProvider extends TradingPoolProvider {
  private poolList: TradingPool[] = [];
  async loadPoolList(): Promise<TradingPool[]> {
    this.buildDefaultPoolList();
    return this.poolList;
  }

  getDefaultPoolList(): TradingPool[] {
    this.buildDefaultPoolList();
    return this.poolList;
  }

  private buildDefaultPoolList() {
    if (this.poolList.length > 0) {
      return;
    }
    const ownerAddress = this.netConfig.pontemAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const curvesTag = this.app.liquidswap.curves.Uncorrelated.getTag();
      const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new PontemTradingPool(ownerAddress, xCoinInfo, yCoinInfo, curvesTag);
      this.poolList.push(pool);
    }
  }
}
