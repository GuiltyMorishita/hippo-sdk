import { DexType } from '../../types';
import { StakeTradingPool } from '../stake_trading_pool';

export class TortugaTradingPool extends StakeTradingPool {
  get dexType(): DexType {
    return DexType.Tortuga;
  }
}
