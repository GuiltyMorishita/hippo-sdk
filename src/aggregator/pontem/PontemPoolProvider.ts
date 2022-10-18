import { TradingPool, TradingPoolProvider } from '../types';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../utils';
import { PontemTradingPool } from './PontemTradingPool';

export class PontemPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddress = this.netConfig.pontemAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('liquidity_pool::LiquidityPool') >= 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const curvesTag = tag.typeParams[2] as StructTag;
        const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        // temporarily disable pontem stable routes due to out-of-gas
        if (curvesTag.getFullname().indexOf('Stable') > 0) {
          continue;
        }
        const pool = new PontemTradingPool(ownerAddress, xCoinInfo, yCoinInfo, curvesTag, tag);
        poolList.push(pool);
      }
    }
    return poolList;
  }
}
