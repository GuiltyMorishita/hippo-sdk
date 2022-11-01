import { TradingPoolProvider } from '../../types';
import { AuxTradingMarket } from './AuxTradingMarket';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../../utils';
import { POOLS } from './pools';
import { toStructTag } from '../../utils';

export class AuxMarketProvider extends TradingPoolProvider {
  getDefaultPoolList(): AuxTradingMarket[] {
    const poolList: AuxTradingMarket[] = [];
    const ownerAddr = this.netConfig.auxAddress;
    for (const poolType of POOLS) {
      const xTag = toStructTag(poolType[0]);
      const yTag = toStructTag(poolType[1]);
      const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
      if (xCoinInfo == undefined || yCoinInfo == undefined) {
        continue;
      }
      const pool = new AuxTradingMarket(ownerAddr, xCoinInfo, yCoinInfo);
      poolList.push(pool);
    }
    return poolList;
  }

  async loadPoolList(): Promise<AuxTradingMarket[]> {
    const poolList: AuxTradingMarket[] = [];
    const ownerAddress = this.netConfig.auxAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('clob_market::Market') > 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new AuxTradingMarket(ownerAddress, xCoinInfo, yCoinInfo);
        poolList.push(pool);
      }
    }
    return poolList;
  }
}
