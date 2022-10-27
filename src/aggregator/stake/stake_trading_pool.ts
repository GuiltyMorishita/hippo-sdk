import { PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../types';
import { HexString, Types } from 'aptos';
import { CoinInfo as StdCoinInfo } from '../../generated/stdlib/coin';
import { u64 } from '@manahippo/move-to-ts';
import { RawCoinInfo } from '@manahippo/coin-list';

export abstract class StakeTradingPool extends TradingPool {
  protected yAmountInfo: StdCoinInfo | undefined;
  constructor(public ownerAddress: HexString, public xCoinInfo: RawCoinInfo, public yCoinInfo: RawCoinInfo) {
    super();
  }

  getPrice(): PriceType {
    if (this.isStateLoaded()) {
      let xAmount = this.getXAmount();
      let yAmount = this.getYAmount();
      return {
        xToY: xAmount / yAmount,
        yToX: yAmount / xAmount
      };
    }
    throw new Error('state is not loaded');
  }
  abstract getXAmount(): number;
  getYAmount(): number {
    return this.yAmountInfo!.supply.vec[0].integer.vec[0].value.toJsNumber() / Math.pow(10, this.yCoinInfo.decimals);
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    let inputSymbol, outputSymbol;
    let outputUiAmt;
    let avgPrice;
    let { xToY, yToX } = this.getPrice();
    if (isXtoY) {
      inputSymbol = this.xCoinInfo.symbol;
      outputSymbol = this.yCoinInfo.symbol;
      const inputAmt = inputUiAmt * Math.pow(10, this.xCoinInfo.decimals);
      const outputAmt = inputAmt * xToY;
      outputUiAmt = outputAmt / Math.pow(10, this.yCoinInfo.decimals);
      avgPrice = xToY;
    } else {
      inputSymbol = this.yCoinInfo.symbol;
      outputSymbol = this.xCoinInfo.symbol;
      const inputAmt = inputUiAmt * Math.pow(10, this.yCoinInfo.decimals);
      const outputAmt = inputAmt * yToX;
      outputUiAmt = outputAmt / Math.pow(10, this.xCoinInfo.decimals);
      avgPrice = yToX;
    }
    return {
      inputSymbol,
      outputSymbol,
      inputUiAmt,
      outputUiAmt,
      avgPrice,
      initialPrice: avgPrice,
      finalPrice: avgPrice,
      priceImpact: 0
    };
  }

  get isRoutable(): boolean {
    return true;
  }

  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }

  get poolType(): PoolType {
    return u64(0);
  }
}
