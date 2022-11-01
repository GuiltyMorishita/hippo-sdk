import { DexType, PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../types';
import { HexString } from 'aptos';
import { RawCoinInfo } from '@manahippo/coin-list';
import { App } from '../../generated';
import { u64 } from '@manahippo/move-to-ts';
import { TokenPairReserve as PancakePool } from '../../generated/pancake/swap';
import { get_amount_out_ } from '../../generated/pancake/router';

export class PancakeTradingPool extends TradingPool {
  pool: PancakePool | null;
  constructor(public owner: HexString, public xCoinInfo: RawCoinInfo, public yCoinInfo: RawCoinInfo) {
    super();
    this.pool = null;
  }
  get dexType(): DexType {
    return DexType.Pancake;
  }

  getPrice(): PriceType {
    if (this.isStateLoaded()) {
      const xPrice = get_amount_out_(u64(Math.pow(10, this.xCoinInfo.decimals)), true, this.pool?.__app?.cache!, [
        this.xTag,
        this.yTag
      ]);
      const yPrice = get_amount_out_(u64(Math.pow(10, this.yCoinInfo.decimals)), false, this.pool?.__app?.cache!, [
        this.xTag,
        this.yTag
      ]);
      return {
        xToY: xPrice.toJsNumber(),
        yToX: yPrice.toJsNumber()
      };
    }
    throw new Error('Pancake pool not loaded. cannot compute quote');
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (this.isStateLoaded()) {
      const inputCoinInfo = isXtoY ? this.xCoinInfo : this.yCoinInfo;
      const outputCoinInfo = isXtoY ? this.yCoinInfo : this.xCoinInfo;
      const outAmount = get_amount_out_(
        u64(Math.floor(inputUiAmt * Math.pow(10, inputCoinInfo.decimals))),
        isXtoY,
        this.pool?.__app?.cache!,
        [this.xTag, this.yTag]
      );
      const outputUiAmt = outAmount.toJsNumber() / Math.pow(10, outputCoinInfo.decimals);
      return {
        inputSymbol: inputCoinInfo.symbol,
        outputSymbol: outputCoinInfo.symbol,
        inputUiAmt,
        outputUiAmt,
        avgPrice: outputUiAmt / inputUiAmt
      };
    }
    throw new Error('Pancake pool not loaded. cannot compute quote');
  }

  get isRoutable(): boolean {
    return true;
  }

  isStateLoaded(): boolean {
    return this.pool != null;
  }

  get poolType(): PoolType {
    return u64(0);
  }

  async reloadStateInternal(app: App): Promise<void> {
    this.pool = await app.pancake.swap.loadTokenPairReserve(this.owner, [this.xTag, this.yTag]);
  }
}
