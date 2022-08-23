import { u64 } from '@manahippo/move-to-ts';
import { Cp_scripts, Cp_swap } from '../generated/hippo_swap';
import { App } from "../generated";
import {HippoPool, PoolType, PriceType, QuoteType, UITokenAmount} from './baseTypes';
import { TransactionPayload } from 'aptos/dist/generated';
import {CoinInfo} from "../generated/coin_list/coin_list";

export class HippoConstantProductPool extends HippoPool {
  constructor(
    xTokenInfo: CoinInfo,
    yTokenInfo: CoinInfo,
    lpTokenInfo: CoinInfo,
    public cpPoolMeta: Cp_swap.TokenPairMetadata,
  ) {
    super(xTokenInfo, yTokenInfo, lpTokenInfo);
  }
  xUiBalance() {
    return this.cpPoolMeta.balance_x.value.toJsNumber() / Math.pow(10, this.xTokenInfo.decimals.toJsNumber());
  }
  yUiBalance() {
    return this.cpPoolMeta.balance_y .value.toJsNumber() / Math.pow(10, this.yTokenInfo.decimals.toJsNumber());
  }
  getId(): string {
    return `HippoConstantProductPool<${this.xyFullname()}>`;
  }
  getAfterFeeFactor() : number {
    return 0.997;
  }
  getCurrentPriceDirectional(isXtoY: boolean): PriceType {
    const xUiBalance = isXtoY ? this.xUiBalance() : this.yUiBalance();
    const yUiBalance = isXtoY ? this.yUiBalance() : this.xUiBalance();
    return {
      xToY: xUiBalance / yUiBalance / this.getAfterFeeFactor(), 
      yToX: yUiBalance / xUiBalance / this.getAfterFeeFactor()
    };
  }
  getQuoteDirectional(inputUiAmt: UITokenAmount, isXtoY: boolean) : QuoteType {
    const xUiBalance = this.xUiBalance();
    const yUiBalance = this.yUiBalance();
    const k = xUiBalance * yUiBalance;
    let outputUiAmt, initialPrice, finalPrice;
    let inputSymbol, outputSymbol;
    if (isXtoY) {
      inputSymbol = this.xTokenInfo.symbol.str();
      outputSymbol = this.yTokenInfo.symbol.str();
      const inputAmt = inputUiAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber());
      const outputAmt = this.cpPoolMeta.quote_x_to_y_after_fees(u64(Math.floor(inputAmt))).toJsNumber();
      outputUiAmt = outputAmt / Math.pow(10, this.yTokenInfo.decimals.toJsNumber());

      // compute output in Y
      const newXUiBalance = xUiBalance + inputUiAmt;
      const newYUiBalance = k / newXUiBalance;
      initialPrice = yUiBalance / xUiBalance;
      finalPrice = newYUiBalance / newXUiBalance;
    } else {
      inputSymbol = this.yTokenInfo.symbol.str();
      outputSymbol = this.xTokenInfo.symbol.str();
      const inputAmt = inputUiAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber());
      const outputAmt = this.cpPoolMeta.quote_y_to_x_after_fees(u64(Math.floor(inputAmt))).toJsNumber();
      outputUiAmt = outputAmt / Math.pow(10, this.xTokenInfo.decimals.toJsNumber());
      // compute output in X
      const newYUiBalance = yUiBalance + inputUiAmt;
      const newXUiBalance = k / newYUiBalance;
      initialPrice = xUiBalance / yUiBalance;
      finalPrice = newXUiBalance / newYUiBalance;
    }
    const avgPrice = outputUiAmt / inputUiAmt;
    const priceImpact = (finalPrice - initialPrice) / initialPrice;

    return {inputSymbol, outputSymbol, inputUiAmt, outputUiAmt, initialPrice, avgPrice, finalPrice, priceImpact};
  }
  estimateWithdrawalOutput(lpUiAmount: UITokenAmount, lpSupplyUiAmt: UITokenAmount): {xUiAmt: UITokenAmount; yUiAmt: UITokenAmount} {
    const fraction = lpUiAmount / lpSupplyUiAmt;
    return {
      xUiAmt: this.xUiBalance() * fraction,
      yUiAmt: this.yUiBalance() * fraction,
    };

  }
  estimateNeededYFromXDeposit(xUiAmt: UITokenAmount): UITokenAmount {
    const fraction = xUiAmt / this.xUiBalance();
    return this.yUiBalance() * fraction;
  }
  estimateNeededXFromYDeposit(yUiAmt: UITokenAmount): UITokenAmount {
    const fraction = yUiAmt / this.yUiBalance();
    return this.xUiBalance() * fraction;
  }
  getPoolType(): PoolType {
    return PoolType.CONSTANT_PRODUCT;
  }

  // transactions
  async makeSwapPayloadDirectional( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
    isXtoY: boolean
  ): Promise<TransactionPayload> {
    const fromTokenInfo = isXtoY ? this.xTokenInfo : this.yTokenInfo;
    const toTokenInfo = isXtoY ? this.yTokenInfo : this.xTokenInfo;
    const fromRawAmount = u64((amountIn * Math.pow(10, fromTokenInfo.decimals.toJsNumber())).toFixed(0));
    const toRawAmount = u64((minAmountOut * Math.pow(10, toTokenInfo.decimals.toJsNumber())).toFixed(0));
    if(isXtoY) {
      return Cp_scripts.buildPayload_swap_script(
        fromRawAmount, 
        u64(0), 
        u64(0), 
        toRawAmount, 
        this.lpTag().typeParams
      );
    }
    else {
      return Cp_scripts.buildPayload_swap_script(
        u64(0), 
        fromRawAmount, 
        toRawAmount, 
        u64(0), 
        this.lpTag().typeParams
      );
    }
  }

  async makeAddLiquidityPayload(xUiAmt: UITokenAmount, yUiAmt: UITokenAmount): Promise<TransactionPayload> {
    const xRawAmt = u64((xUiAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber())).toFixed(0));
    const yRawAmt = u64((yUiAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber())).toFixed(0));
    return Cp_scripts.buildPayload_add_liquidity_script(xRawAmt, yRawAmt, this.lpTag().typeParams);
  }

  async makeRemoveLiquidityPayload(
    liquidityAmt: UITokenAmount,
    lhsMinAmt: UITokenAmount, 
    rhsMinAmt: UITokenAmount,
  ): Promise<TransactionPayload> {
    const liquidityRawAmt = u64(liquidityAmt * Math.pow(10, this.lpTokenInfo.decimals.toJsNumber()));
    const lhsMinRawAmt = u64(lhsMinAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber()));
    const rhsMinRawAmt = u64(rhsMinAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber()));
    return Cp_scripts.buildPayload_remove_liquidity_script(liquidityRawAmt, lhsMinRawAmt, rhsMinRawAmt, this.lpTag().typeParams);
  }
}