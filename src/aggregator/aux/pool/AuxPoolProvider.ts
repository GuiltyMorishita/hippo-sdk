import { TradingPool, TradingPoolProvider } from '../../types';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../../utils';
import { AuxTradingPool } from './AuxTradingPool';
import { POOLS } from './pools';
import { toStructTag } from '../../utils';

export class AuxPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<AuxTradingPool[]> {
    const poolList: AuxTradingPool[] = [];
    const ownerAddress = this.netConfig.auxAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('amm::Pool') > 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new AuxTradingPool(ownerAddress, xCoinInfo, yCoinInfo);
        poolList.push(pool);
      }
    }

    return poolList;
  }

  getDefaultPoolList(): TradingPool[] {
    const poolList: TradingPool[] = [];
    const ownerAddr = this.netConfig.auxAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new AuxTradingPool(ownerAddr, xCoinInfo, yCoinInfo);
      poolList.push(pool);
    }
    return poolList;
  }
}
