import { TradingPool, TradingPoolProvider } from '../../types';
import { DittoTradingPool } from './ditto_trading_pool';
import { typeTagToTypeInfo } from '../../../utils';
import { AptosCoin } from '../../../generated/stdlib/aptos_coin';
import { StakedAptos } from '../../../generated/ditto/staked_coin';

export class DittoPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(AptosCoin.getTag()));
    const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(StakedAptos.getTag()));
    return [new DittoTradingPool(this.netConfig.dittoAddress, xCoinInfo, yCoinInfo)];
  }
}
