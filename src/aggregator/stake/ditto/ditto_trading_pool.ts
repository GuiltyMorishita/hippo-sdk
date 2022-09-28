import { DexType } from '../../types';
import { StakeTradingPool } from '../stake_trading_pool';

export class DittoTradingPool extends StakeTradingPool {
  get dexType(): DexType {
    return DexType.Ditto;
  }
}
