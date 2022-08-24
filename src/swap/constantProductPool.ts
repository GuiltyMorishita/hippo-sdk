import { u64 } from "@manahippo/move-to-ts";
import { Cp_scripts, Cp_swap } from "../generated/hippo_swap";
import {
  HippoPool,
  PoolType,
  PriceType,
  QuoteType,
  UITokenAmount,
} from "./baseTypes";
import { CoinInfo } from "../generated/coin_list/coin_list";
import { TransactionPayloadEntryFunction } from "aptos/dist/transaction_builder/aptos_types";

export class HippoConstantProductPool extends HippoPool {
  constructor(
    xCoinInfo: CoinInfo,
    yCoinInfo: CoinInfo,
    lpCoinInfo: CoinInfo,
    public cpPoolMeta: Cp_swap.TokenPairMetadata
  ) {
    super(xCoinInfo, yCoinInfo, lpCoinInfo);
  }
  xUiBalance() {
    return (
      this.cpPoolMeta.balance_x.value.toJsNumber() /
      Math.pow(10, this.xCoinInfo.decimals.toJsNumber())
    );
  }
  yUiBalance() {
    return (
      this.cpPoolMeta.balance_y.value.toJsNumber() /
      Math.pow(10, this.yCoinInfo.decimals.toJsNumber())
    );
  }
  getId(): string {
    return `HippoConstantProductPool<${this.xyFullname()}>`;
  }
  getAfterFeeFactor(): number {
    return 0.997;
  }
  getCurrentPriceDirectional(isXtoY: boolean): PriceType {
    const xUiBalance = isXtoY ? this.xUiBalance() : this.yUiBalance();
    const yUiBalance = isXtoY ? this.yUiBalance() : this.xUiBalance();
    return {
      xToY: xUiBalance / yUiBalance / this.getAfterFeeFactor(),
      yToX: yUiBalance / xUiBalance / this.getAfterFeeFactor(),
    };
  }
  getQuoteDirectional(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    const xUiBalance = this.xUiBalance();
    const yUiBalance = this.yUiBalance();
    const k = xUiBalance * yUiBalance;
    let outputUiAmt, initialPrice, finalPrice;
    let inputSymbol, outputSymbol;
    if (isXtoY) {
      inputSymbol = this.xCoinInfo.symbol.str();
      outputSymbol = this.yCoinInfo.symbol.str();
      const inputAmt =
        inputUiAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
      const outputAmt = this.cpPoolMeta
        .quote_x_to_y_after_fees(u64(Math.floor(inputAmt)))
        .toJsNumber();
      outputUiAmt =
        outputAmt / Math.pow(10, this.yCoinInfo.decimals.toJsNumber());

      // compute output in Y
      const newXUiBalance = xUiBalance + inputUiAmt;
      const newYUiBalance = k / newXUiBalance;
      initialPrice = yUiBalance / xUiBalance;
      finalPrice = newYUiBalance / newXUiBalance;
    } else {
      inputSymbol = this.yCoinInfo.symbol.str();
      outputSymbol = this.xCoinInfo.symbol.str();
      const inputAmt =
        inputUiAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber());
      const outputAmt = this.cpPoolMeta
        .quote_y_to_x_after_fees(u64(Math.floor(inputAmt)))
        .toJsNumber();
      outputUiAmt =
        outputAmt / Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
      // compute output in X
      const newYUiBalance = yUiBalance + inputUiAmt;
      const newXUiBalance = k / newYUiBalance;
      initialPrice = xUiBalance / yUiBalance;
      finalPrice = newXUiBalance / newYUiBalance;
    }
    const avgPrice = outputUiAmt / inputUiAmt;
    const priceImpact = (finalPrice - initialPrice) / initialPrice;

    return {
      inputSymbol,
      outputSymbol,
      inputUiAmt,
      outputUiAmt,
      initialPrice,
      avgPrice,
      finalPrice,
      priceImpact,
    };
  }
  estimateWithdrawalOutput(
    lpUiAmount: UITokenAmount,
    lpSupplyUiAmt: UITokenAmount
  ): { xUiAmt: UITokenAmount; yUiAmt: UITokenAmount } {
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
  ): Promise<TransactionPayloadEntryFunction> {
    const fromTokenInfo = isXtoY ? this.xCoinInfo : this.yCoinInfo;
    const toTokenInfo = isXtoY ? this.yCoinInfo : this.xCoinInfo;
    const fromRawAmount = u64(
      (amountIn * Math.pow(10, fromTokenInfo.decimals.toJsNumber())).toFixed(0)
    );
    const toRawAmount = u64(
      (minAmountOut * Math.pow(10, toTokenInfo.decimals.toJsNumber())).toFixed(
        0
      )
    );
    if (isXtoY) {
      return Cp_scripts.buildPayload_swap_script(
        fromRawAmount,
        u64(0),
        u64(0),
        toRawAmount,
        this.lpTag().typeParams
      );
    } else {
      return Cp_scripts.buildPayload_swap_script(
        u64(0),
        fromRawAmount,
        toRawAmount,
        u64(0),
        this.lpTag().typeParams
      );
    }
  }

  async makeAddLiquidityPayload(
    xUiAmt: UITokenAmount,
    yUiAmt: UITokenAmount
  ): Promise<TransactionPayloadEntryFunction> {
    const xRawAmt = u64(
      (xUiAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber())).toFixed(0)
    );
    const yRawAmt = u64(
      (yUiAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber())).toFixed(0)
    );
    return Cp_scripts.buildPayload_add_liquidity_script(
      xRawAmt,
      yRawAmt,
      this.lpTag().typeParams
    );
  }

  async makeRemoveLiquidityPayload(
    liquidityAmt: UITokenAmount,
    lhsMinAmt: UITokenAmount,
    rhsMinAmt: UITokenAmount
  ): Promise<TransactionPayloadEntryFunction> {
    const liquidityRawAmt = u64(
      liquidityAmt * Math.pow(10, this.lpCoinInfo.decimals.toJsNumber())
    );
    const lhsMinRawAmt = u64(
      lhsMinAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber())
    );
    const rhsMinRawAmt = u64(
      rhsMinAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber())
    );
    return Cp_scripts.buildPayload_remove_liquidity_script(
      liquidityRawAmt,
      lhsMinRawAmt,
      rhsMinRawAmt,
      this.lpTag().typeParams
    );
  }
}
