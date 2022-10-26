import { TradingPool, TradingPoolProvider } from '../types';
import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { typeTagToTypeInfo } from '../../utils';
import { PontemTradingPool } from './PontemTradingPool';
import { POOLS } from './pools';
import { StructType } from './type';
import { HexString } from 'aptos';

export class PontemPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddress = this.netConfig.pontemAddress;
    for (const poolType of POOLS) {
      const xTag = this.toStruct(poolType[0]);
      const yTag = this.toStruct(poolType[1]);
      const curvesTag = this.app.liquidswap.curves.Uncorrelated.getTag();
      const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
      const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
      const pool = new PontemTradingPool(ownerAddress, xCoinInfo, yCoinInfo, curvesTag);
      poolList.push(pool);
    }
    return poolList;
  }
  toStruct(st: StructType): StructTag {
    return new StructTag(new HexString(st.address), st.module, st.name, []);
  }
}
