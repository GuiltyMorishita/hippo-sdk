import { TradingPoolProvider } from '../../types';
import { AuxTradingMarket } from './AuxTradingMarket';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../../utils';

export class AuxMarketProvider extends TradingPoolProvider {
  getDefaultPoolList(): AuxTradingMarket[] {
    return [];
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
