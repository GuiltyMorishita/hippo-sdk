import { TransactionPayload } from 'aptos/dist/api/data-contracts';
import bigInt from 'big-integer';
import { PieceSwapScript } from '../generated/X0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8';
import { PieceSwapPoolInfo } from '../generated/X0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8/PieceSwap';
import { TokenInfo } from '../generated/X0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8/TokenRegistry';
import {HippoPool, PoolType, PriceType, QuoteType, UITokenAmount} from './baseTypes';

export class HippoPieceSwapPool extends HippoPool {
  constructor(
    xTokenInfo: TokenInfo,
    yTokenInfo: TokenInfo,
    lpTokenInfo: TokenInfo,
    public poolInfo: PieceSwapPoolInfo,
  ) {
    super(xTokenInfo, yTokenInfo, lpTokenInfo);
  }

  xUiBalance() {
    return this.poolInfo.reserve_x.value.toJSNumber() / Math.pow(10, this.xTokenInfo.decimals);
  }

  yUiBalance() {
    return this.poolInfo.reserve_y.value.toJSNumber() / Math.pow(10, this.yTokenInfo.decimals);
  }

  getId(): string {
    return `HippoPieceSwapPool<${this.xyFullname()}>`;
  }

  getCurrentPriceDirectional(isXtoY: boolean, xShift = 0, yShift = 0): PriceType {
    const delta_x = 0.001;
    const delta_y = get_swap_x_to_y_out(
      this.xUiBalance() + xShift,
      this.yUiBalance() + yShift,
      delta_x,
      this.poolInfo.K.toJSNumber(),
      this.poolInfo.K2.toJSNumber(),
      this.poolInfo.Xa.toJSNumber(),
      this.poolInfo.Xb.toJSNumber(),
      this.poolInfo.m.toJSNumber(),
      this.poolInfo.n.toJSNumber(),
    )
    const feeDiscountFactor = (1 - this.poolInfo.swap_fee_per_million.toJSNumber() / 1000000);
    if (isXtoY) {
      return {xToY: delta_x / delta_y * feeDiscountFactor, yToX: delta_y / delta_x * feeDiscountFactor};
    } else {
      return {yToX: delta_x / delta_y * feeDiscountFactor, xToY: delta_y / delta_x * feeDiscountFactor};
    }
  }

  getQuoteDirectional(inputUiAmt: UITokenAmount, isXtoY: boolean) : QuoteType {
    const initialPrice = this.getCurrentPriceDirectional(isXtoY);
    const feeDiscountFactor = (1 - this.poolInfo.swap_fee_per_million.toJSNumber() / 1000000);
    const outputUiAmt = get_swap_x_to_y_out(
      this.xUiBalance(),
      this.yUiBalance(),
      inputUiAmt,
      this.poolInfo.K.toJSNumber(),
      this.poolInfo.K2.toJSNumber(),
      this.poolInfo.Xa.toJSNumber(),
      this.poolInfo.Xb.toJSNumber(),
      this.poolInfo.m.toJSNumber(),
      this.poolInfo.n.toJSNumber(),
    ) * feeDiscountFactor;
    const finalPrice = this.getCurrentPriceDirectional(
      isXtoY, 
      isXtoY ? inputUiAmt : -outputUiAmt,
      isXtoY ? -outputUiAmt : inputUiAmt,
    );
    return {
      inputSymbol: isXtoY ? this.xTokenInfo.symbol : this.yTokenInfo.symbol,
      outputSymbol: isXtoY ? this.yTokenInfo.symbol : this.xTokenInfo.symbol,
      inputUiAmt: inputUiAmt,
      outputUiAmt: outputUiAmt,
      initialPrice: initialPrice.yToX,
      avgPrice: outputUiAmt / inputUiAmt,
      finalPrice: finalPrice.yToX,
      priceImpact: (finalPrice.yToX - initialPrice.yToX) / initialPrice.yToX,
    }
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
    return PoolType.THREE_PIECE;
  }

  // transactions
  async makeSwapPayloadDirectional( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
    isXtoY: boolean
  ): Promise<TransactionPayload> {
    const fromTokenInfo = isXtoY ? this.xTokenInfo : this.yTokenInfo;
    const toTokenInfo = isXtoY ? this.yTokenInfo : this.xTokenInfo;
    const fromRawAmount = bigInt((amountIn * Math.pow(10, fromTokenInfo.decimals)).toFixed(0));
    const toRawAmount = bigInt((minAmountOut * Math.pow(10, toTokenInfo.decimals)).toFixed(0));
    if(isXtoY) {
      return PieceSwapScript.build_payload_swap_script(
        fromRawAmount, 
        bigInt(0), 
        bigInt(0), 
        toRawAmount, 
        this.lpTag().typeParams
      );
    }
    else {
      return PieceSwapScript.build_payload_swap_script(
        bigInt(0), 
        fromRawAmount, 
        toRawAmount, 
        bigInt(0), 
        this.lpTag().typeParams
      );
    }
  }

  async makeAddLiquidityPayload(xUiAmt: UITokenAmount, yUiAmt: UITokenAmount): Promise<TransactionPayload> {
    const xRawAmt = bigInt((xUiAmt * Math.pow(10, this.xTokenInfo.decimals)).toFixed(0));
    const yRawAmt = bigInt((yUiAmt * Math.pow(10, this.yTokenInfo.decimals)).toFixed(0));
    return PieceSwapScript.build_payload_add_liquidity_script(xRawAmt, yRawAmt, this.lpTag().typeParams);
  }

  async makeRemoveLiquidityPayload(
    liqiudityAmt: UITokenAmount, 
    _lhsMinAmt: UITokenAmount, 
    _rhsMinAmt: UITokenAmount,
  ): Promise<TransactionPayload> {
    const liquidityRawAmt = bigInt(liqiudityAmt * Math.pow(10, this.lpTokenInfo.decimals));
    return PieceSwapScript.build_payload_remove_liquidity_script(liquidityRawAmt, this.lpTag().typeParams);
  }


  getStage() : PieceStage {
    const current_x = this.xUiBalance();
    const current_y = this.yUiBalance();
    const xa = this.poolInfo.Xa.toJSNumber();
    const xb = this.poolInfo.Xb.toJSNumber();
    return getStage(current_x, current_y, xa, xb);
  }

  getScalingFactor() : number {
    const x = this.xUiBalance();
    const y = this.yUiBalance();
    const k = this.poolInfo.K.toJSNumber();
    const k2 = this.poolInfo.K2.toJSNumber();
    const m = this.poolInfo.m.toJSNumber();
    const n = this.poolInfo.n.toJSNumber();
    const stage = this.getStage();
    return getScalingFactor(x, y, k, k2, m, n, stage);
  }
}

enum PieceStage {
  LEFT,
  MIDDLE,
  RIGHT
}

function getStage(
  current_x: number,
  current_y: number,
  xa: number,
  xb: number,
) : PieceStage {
  if (current_x / current_y < xa / xb) {
    return PieceStage.LEFT;
  } else if (current_x / current_y < xb / xa) {
    return PieceStage.MIDDLE;
  } else {
    return PieceStage.RIGHT;
  }
}

function get_swap_x_to_y_out(
  current_x: number,
  current_y: number,
  input_x: number,
  k: number,
  k2: number,
  xa: number,
  xb: number,
  m: number,
  n: number,
  ): number {
    /*
    Steps:
    0. normalize (current_x, current_y, input_x) to appropriate range
    1. Use ratio to find out which stage we're on
    2. Use stage to compute normalization factor
    3. Use curve to compute new position
    4. return delta y
    */

    /*
    if x-to-y < xa-to-xb: upper-left stage
    if x-to-y < xb-to-xa: middle stage
    if x-to-y > xb-to-xa: bottom-right stage
    */

    const stage = getStage(current_x, current_y, xa, xb);
    const F = getScalingFactor(current_x, current_y, k, k2, m, n, stage);

    if (stage === PieceStage.LEFT) {
        // upper-left stage
        // (xF) (yF - n) = k2
        // xyF^2 - (xn)F - k2 = 0
        // F = [ (xn) + sqrt((xn)^2 + 4xy*k2)] / 2xy
        
        const current_xF = current_x * F;
        const current_yF = current_y * F;
        const input_xF = input_x * F;
        const new_xF = current_xF + input_xF;

        if (new_xF > xa) {
            // crossed into the middle stage
            const delta_yF_this_stage = current_yF - xb; // xb = ya
            const input_xF_next_stage = new_xF - xa;
            const output_yF_next_stage = get_swap_x_to_y_out(
              xa,
              xb,
              input_xF_next_stage,
              k,
              k2,
              xa,
              xb,
              m,
              n
            );
            return (delta_yF_this_stage + output_yF_next_stage) / F;
        }
        else {
            const new_yF = k2 / new_xF + n;
            const delta_yF = Math.max(current_yF - new_yF, 0);
            return delta_yF / F;
        }
    }
    else if(stage === PieceStage.MIDDLE) {
        // middle stage
        // (xF + m) (yF + m) = k
        // xyF^2 + (x + y)mF + (mm -k) = 0
        // F = [-(x+y)m + sqrt( ((x+y)m)^2 - 4xy(mm-k) ) ] / 2xy
        const current_xF = current_x * F;
        const current_yF = current_y * F;
        const input_xF = input_x * F;
        const new_xF = current_xF + input_xF;
        if (new_xF > xb) {
            // crossed into the bottom-right stage
            const delta_yF_this_stage = current_yF - xa; // xa = yb
            const input_xF_next_stage = new_xF - xb;
            const output_yF_next_stage = get_swap_x_to_y_out(
                xb,
                xa,
                input_xF_next_stage,
                k,
                k2,
                xa,
                xb,
                m,
                n
            );
            return (delta_yF_this_stage + output_yF_next_stage) / F;
        }
        else {
            /*
            let p_new_yF = p_k / (p_new_xF + p_m) - p_m;
            let p_delta_yF = p_current_yF - p_new_yF;
            let output_y = p_delta_yF * f_denominator * 10000 / (f_numerator * PRECISION_FACTOR);
            */
            const new_yF = k / (new_xF + m) - m;
            const delta_yF = current_yF - new_yF;
            return delta_yF / F;
        }
    }
    else {
        // bottom-right stage
        // (xF - n) (yF) = k2
        // xyF^2 -nyF -k2 = 0
        // [ny + sqrt( (ny)^2 +4xyk2) ] / 2xy
        const current_xF = current_x * F;
        const current_yF = current_y * F;
        const input_xF = input_x * F;
        const new_xF = current_xF + input_xF;
        const new_yF = k2 / (new_xF - n);
        const delta_yF =  Math.max(current_yF - new_yF, 0);
        return delta_yF / F;
    }
}


function getScalingFactor(
  x: number,
  y: number,
  k: number,
  k2: number,
  m: number,
  n: number,
  stage: PieceStage,
) : number {

  if (stage === PieceStage.MIDDLE) {
      // (xF + m)(yF + m) = k
      // xy*FF + (x + y)m*F + (mm - k) = 0
      // F = [-(x+y)m + sqrt( ((x+y)m)^2 - 4xy(mm-k) ) ] / 2xy

      const xy = x * y;
      const x_plus_y = x + y;
      const b = x_plus_y * m;
      const numerator = Math.sqrt(b*b + 4 * xy * (k - m*m)) - b; // k > mm is guaranteed
      return numerator / (2 * xy);

  } else {
      // (xF)(yF - n) = k2
      // xy*FF -nx*F - k2 = 0
      // F = [ (xn) + sqrt((xn)^2 + 4xy*k2)] / 2xy

      if (stage === PieceStage.RIGHT) {
        // just swap x and y
        [x, y] = [y, x];
      }
      const xn = x * n;
      const xy = x * y;
      const numerator = xn + Math.sqrt(xn * xn + 4 * xy * k2);
      return numerator / (2 * xy);
  }
}