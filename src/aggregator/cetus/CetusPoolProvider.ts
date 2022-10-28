import { TradingPoolProvider } from '../types';
import { CetusTradingPool } from './CetusTradingPool';

export class CetusPoolProvider extends TradingPoolProvider {
  getDefaultPoolList(): CetusTradingPool[] {
    return [];
  }

  loadPoolList(): Promise<CetusTradingPool[]> {
    return Promise.resolve([]);
  }
}
