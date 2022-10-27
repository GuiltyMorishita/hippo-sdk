import { typeTagToTypeInfo } from '../../utils';
import { TradingPool, TradingPoolProvider } from '../types';
import { AnimeTradingPool } from './AnimeTradingPool';
import { POOLS } from './pools';
import { toStructTag } from '../utils';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';

export class AnimePoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddr = this.netConfig.animeAddress;
    const resources = await this.app.client.getAccountResources(ownerAddr);
    for (const resource of resources) {
      if (resource.type.indexOf('AnimeSwapPoolV1::LiquidityPool') >= 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new AnimeTradingPool(ownerAddr, xCoinInfo, yCoinInfo);
        poolList.push(pool);
      }
    }
    return poolList;
  }

  getDefaultPoolList(): TradingPool[] {
    const poolList: TradingPool[] = [];
    const ownerAddr = this.netConfig.animeAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new AnimeTradingPool(ownerAddr, xCoinInfo, yCoinInfo);
      poolList.push(pool);
    }
    return poolList;
  }
}
