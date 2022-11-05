import { TradingPool, TradingPoolProvider } from '../types';
import { U64 } from '@manahippo/move-to-ts';
import { EconiaTradingPoolV1 } from './EconiaTradingPoolV1';
import { Registry } from '../../generated/econia/registry';

export class EconiaPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const registry = await Registry.load(this.app.parserRepo, this.app.client, Registry.moduleAddress, []);
    const markets = registry.markets;
    const pools: TradingPool[] = [];
    const promises: Promise<void>[] = [];

    markets.forEach((mi, marketId) => {
      const xCoinInfo = this.coinList.getCoinInfoByType(mi.trading_pair_info.base_type_info);
      const yCoinInfo = this.coinList.getCoinInfoByType(mi.trading_pair_info.quote_type_info);
      if (
        xCoinInfo != undefined &&
        yCoinInfo != undefined &&
        // host is devnet contract
        mi.host.hex() === this.netConfig.hippoAggregatorAddress.hex()
      ) {
        pools.push(
          new EconiaTradingPoolV1(xCoinInfo, yCoinInfo, null, mi, mi.host, this.app.parserRepo, new U64(marketId))
        );
      }
    });
    await Promise.all(promises);
    return pools;
  }

  getDefaultPoolList(): TradingPool[] {
    return [];
  }
}
