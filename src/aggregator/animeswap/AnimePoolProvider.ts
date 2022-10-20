import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../utils';
import { TradingPool, TradingPoolProvider } from '../types';
import { AnimeTradingPool } from './AnimeTradingPool';

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
        const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }

        try {
          const pool = new AnimeTradingPool(ownerAddr, tag, xCoinInfo, yCoinInfo);
          poolList.push(pool);
        } catch {
          // ignore
        }
      }
    }

    return poolList;
  }
}
