import { TradingPool, TradingPoolProvider } from '../types';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../utils';
import { AptoswapTradingPool } from './index';

export class AptoswapPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const packageAddr = this.netConfig.aptoswapAddress;
    const resources = await this.app.client.getAccountResources(packageAddr);

    for (const resource of resources) {
      if (resource.type.indexOf('pool::Pool') >= 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }

        try {
          const pool = new AptoswapTradingPool(packageAddr, tag, xCoinInfo, yCoinInfo, resource);
          if (pool.pool.isAvaliableForSwap()) {
            poolList.push(pool);
          }
        } catch {
          // ignore
        }
      }
    }

    return poolList;
  }
}
