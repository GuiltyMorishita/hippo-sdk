import { DexType, PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../../types';
import { HexString, Types } from 'aptos';
import { u64 } from '@manahippo/move-to-ts';
import { App } from '../../../generated';
import { RawCoinInfo } from '@manahippo/coin-list';

import { SIM_KEYS, simulatePayloadTx } from '@manahippo/move-to-ts/src/txSender';
export interface L2Quote {
  price: number;
  quantity: number;
}
export class AuxTradingMarket extends TradingPool {
  market: Object | null;
  constructor(public ownerAddr: HexString, public xCoinInfo: RawCoinInfo, public yCoinInfo: RawCoinInfo) {
    super();
    this.market = null;
  }
  get dexType(): DexType {
    return DexType.Aux;
  }
  get poolType(): PoolType {
    return u64(1);
  }
  getPrice(): PriceType {
    return {} as PriceType;
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    return {} as QuoteType;
  }
  get isRoutable(): boolean {
    return false;
  }

  isStateLoaded(): boolean {
    return this.market != null;
  }

  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }

  async reloadState(app: App): Promise<void> {
    const payload = app.aux.clob_market.payload_load_market_into_event([this.xTag, this.yTag]);
    const result = await simulatePayloadTx(app.client, SIM_KEYS, payload);
    console.log(result);
  }
}
