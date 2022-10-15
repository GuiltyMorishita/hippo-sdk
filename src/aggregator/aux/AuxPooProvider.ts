import { TradingPool, TradingPoolProvider } from '../types';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../utils';
import { AuxTradingPool } from './AuxTradingPool';

export class AuxPooProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddress = this.netConfig.auxAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('amm::Pool') > 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new AuxTradingPool(ownerAddress, xCoinInfo, yCoinInfo);
        poolList.push(pool);
      }
    }

    return poolList;
  }
}
