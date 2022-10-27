import { TradingPool, TradingPoolProvider } from '../../types';
// import { typeTagToTypeInfo } from '../../../utils';
// import { AptosCoin } from '../../../generated/stdlib/aptos_coin';
// import { TortugaTradingPool } from './tortuga_trading_pool';
// import { StakedAptosCoin } from '../../../generated/tortuga/staked_aptos_coin';

export class TortugaPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    // const xCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(AptosCoin.getTag()));
    // const yCoinInfo = this.coinList.getCoinInfoByType(typeTagToTypeInfo(StakedAptosCoin.getTag()));
    // return [new TortugaTradingPool(this.netConfig.tortugaAddress, xCoinInfo, yCoinInfo)];
    return [];
  }

  getDefaultPoolList(): TradingPool[] {
    return [];
  }
}
