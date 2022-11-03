import { TradingPoolProvider } from '../types';
import { PancakeTradingPool } from './PancakeTradingPool';
import { POOLS } from './pools';
import { toStructTag } from '../utils';
import { typeTagToTypeInfo } from '../../utils';
import { AuxTradingPool } from '../aux';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';

export class PancakePoolProvider extends TradingPoolProvider {
  getDefaultPoolList(): PancakeTradingPool[] {
    const poolList: PancakeTradingPool[] = [];
    const ownerAddr = this.netConfig.pancakeAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new PancakeTradingPool(ownerAddr, xCoinInfo, yCoinInfo);
      poolList.push(pool);
    }
    return poolList;
  }

  async loadPoolList(): Promise<PancakeTradingPool[]> {
    const poolList: PancakeTradingPool[] = [];
    const ownerAddress = this.netConfig.pancakeAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('swap::TokenPairReserve') > 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new PancakeTradingPool(ownerAddress, xCoinInfo, yCoinInfo);
        poolList.push(pool);
      }
    }

    return poolList;
  }
}
