import { TradingPoolProvider } from '../types';
import { CetusTradingPool } from './CetusTradingPool';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../utils';
import { POOLS } from './pools';
import { toStructTag } from '../utils';

export class CetusPoolProvider extends TradingPoolProvider {
  getDefaultPoolList(): CetusTradingPool[] {
    const poolList: CetusTradingPool[] = [];
    const ownerAddr = this.netConfig.cetusAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new CetusTradingPool(ownerAddr, xCoinInfo, yCoinInfo);
      poolList.push(pool);
    }
    return poolList;
  }

  async loadPoolList(): Promise<CetusTradingPool[]> {
    const poolList: CetusTradingPool[] = [];
    const ownerAddress = this.netConfig.cetusAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('amm_swap::Pool<') > 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new CetusTradingPool(ownerAddress, xCoinInfo, yCoinInfo);
        poolList.push(pool);
      }
    }

    return poolList;
  }
}
