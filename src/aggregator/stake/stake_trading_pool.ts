import { PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../types';
import { HexString, Types } from 'aptos';
import { App } from '../../generated';
import { CoinInfo } from '../../generated/coin_list/coin_list';
import { CoinInfo as StdCoinInfo } from '../../generated/stdlib/coin';
import { u64 } from '@manahippo/move-to-ts';
import { CoinStore } from '../../generated/stdlib/coin';

export abstract class StakeTradingPool extends TradingPool {
  private xCoin: CoinStore | null;
  private yCoin: StdCoinInfo | null;
  constructor(public ownerAddress: HexString, public xInfo: CoinInfo, public yInfo: CoinInfo) {
    super();
    this.xCoin = null;
    this.yCoin = null;
  }

  getPrice(): PriceType {
    if (this.isStateLoaded()) {
      let xAmount = this.getDepositX();
      // get total supply
      let yAmount = this.getSupplyY();
      return {
        xToY: xAmount / yAmount,
        yToX: yAmount / yAmount
      };
    }
    throw new Error('state is not loaded');
  }

  getDepositX(): number {
    return this.xCoin!.coin.value.toJsNumber() / Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
  }

  getSupplyY(): number {
    return (
      this.yCoin!.supply.vec[0].integer.vec[0].value.toJsNumber() / Math.pow(10, this.yCoinInfo.decimals.toJsNumber())
    );
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    let inputSymbol, outputSymbol;
    let outputUiAmt;
    let avgPrice;
    let { xToY, yToX } = this.getPrice();
    if (isXtoY) {
      inputSymbol = this.xInfo.symbol.str();
      outputSymbol = this.yInfo.symbol.str();
      const inputAmt = inputUiAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
      const outputAmt = inputAmt * xToY;
      outputUiAmt = outputAmt / Math.pow(10, this.yCoinInfo.decimals.toJsNumber());
      avgPrice = xToY;
    } else {
      inputSymbol = this.yInfo.symbol.str();
      outputSymbol = this.xInfo.symbol.str();
      const inputAmt = inputUiAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber());
      const outputAmt = inputAmt * yToX;
      outputUiAmt = outputAmt / Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
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

  isStateLoaded(): boolean {
    return this.xCoin != null && this.yCoin != null;
  }

  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }

  get poolType(): PoolType {
    return u64(0);
  }

  async reloadState(app: App): Promise<void> {
    let res = await Promise.all([
      CoinStore.load(app.parserRepo, app.client, this.ownerAddress, [this.xInfo.token_type.toTypeTag()]),
      StdCoinInfo.load(app.parserRepo, app.client, this.ownerAddress, [this.yInfo.token_type.toTypeTag()])
    ]);
    this.xCoin = res[0];
    this.yCoin = res[1];
  }

  get xCoinInfo() {
    return this.xInfo;
  }

  get yCoinInfo() {
    return this.yInfo;
  }
}
