import { DexType, PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../types';
import { HexString, Types } from 'aptos';
import { u64 } from '@manahippo/move-to-ts';
import { App } from '../../generated';
import { RawCoinInfo } from '@manahippo/coin-list';
import { Pool as CetusPool } from '../../generated/cetus_amm/amm_swap';
export class CetusTradingPool extends TradingPool {
  pool: CetusPool | null;
  constructor(public ownerAddr: HexString, public xCoinInfo: RawCoinInfo, public yCoinInfo: RawCoinInfo) {
    super();
    this.pool = null;
  }
  get dexType(): DexType {
    return DexType.Cetus;
  }

  getPrice(): PriceType {
    throw new Error('Cetus pool not loaded. cannot compute quote');
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    throw new Error('Cetus pool not loaded. cannot compute quote');
  }

  get isRoutable(): boolean {
    return true;
  }

  isStateLoaded(): boolean {
    return this.pool != null;
  }

  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }

  get poolType(): PoolType {
    return u64(0);
  }

  async reloadState(app: App): Promise<void> {
    this.pool = await app.cetus_amm.amm_swap.loadPool(this.ownerAddr, [this.xTag, this.yTag]);
  }
}
