import { getTypeTagFullname, StructTag, u64, u8 } from "@manahippo/move-to-ts";
import { Types } from "aptos";
import bigInt from "big-integer";
import { Router } from "../generated/HippoSwap";
import { TokenInfo } from "../generated/TokenRegistry/TokenRegistry";
import { typeInfoToTypeTag } from "../utils";

export type UITokenAmount = number;

export type PriceType = {
  xToY: number;
  yToX: number;
}

export type QuoteType = {
  inputSymbol: string;
  outputSymbol: string;
  inputUiAmt: UITokenAmount;
  outputUiAmt: UITokenAmount;
  initialPrice: number;
  avgPrice: number;
  finalPrice: number; 
  priceImpact: number;
}

export enum PoolType {
  CONSTANT_PRODUCT = 1,
  STABLE_CURVE = 2,
  THREE_PIECE = 3,
}

export function poolTypeToName(poolType: PoolType) {
  if (poolType === PoolType.CONSTANT_PRODUCT) {
    return "ConstantProduct"
  } else if (poolType === PoolType.STABLE_CURVE) {
    return "StableCurve"
  } else if (poolType === PoolType.THREE_PIECE) {
    return "ThreePiece"
  } else {
    throw new Error();
  }
}

export abstract class TradeRoute {
  constructor(
    public xTokenInfo: TokenInfo,
    public yTokenInfo: TokenInfo,
  ) {

  }

  xTag(): StructTag {
    return typeInfoToTypeTag(this.xTokenInfo.token_type) as StructTag;
  }

  yTag(): StructTag {
    return typeInfoToTypeTag(this.yTokenInfo.token_type) as StructTag;
  }

  abstract getCurrentPrice(): PriceType;

  abstract getQuote(uiAmount: UITokenAmount) : QuoteType;

  // transactions
  abstract makeSwapPayload( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
  ): Promise<Types.TransactionPayload>;


}

export abstract class HippoPool extends TradeRoute {
  constructor(
    xTokenInfo: TokenInfo,
    yTokenInfo: TokenInfo,
    public lpTokenInfo: TokenInfo,
  ) {
    super(xTokenInfo, yTokenInfo);
  }

  abstract estimateWithdrawalOutput(lpUiAmount: UITokenAmount, lpSupplyUiAmt: UITokenAmount): {xUiAmt: UITokenAmount; yUiAmt: UITokenAmount};

  abstract estimateNeededYFromXDeposit(xUiAmt: UITokenAmount): UITokenAmount;
  abstract estimateNeededXFromYDeposit(yUiAmt: UITokenAmount): UITokenAmount;

  abstract getPoolType(): PoolType;

  lpTag(): StructTag {
    return typeInfoToTypeTag(this.lpTokenInfo.token_type) as StructTag;
  }

  xyFullname(): string {
    const [xFullname, yFullname] = [this.xTag(), this.yTag()].map(getTypeTagFullname);
    return `${xFullname}<->${yFullname}`;
  }

  abstract xUiBalance(): number;
  abstract yUiBalance(): number;

  abstract getId(): string;

  abstract getCurrentPriceDirectional(isXtoY: boolean): PriceType;

  getCurrentPrice(): PriceType {
    return this.getCurrentPriceDirectional(true);
  }

  abstract getQuoteDirectional(uiAmount: UITokenAmount, isXtoY: boolean) : QuoteType;

  getQuote(uiAmount: UITokenAmount): QuoteType {
    return this.getQuoteDirectional(uiAmount, true);
  }

  // transactions
  abstract makeSwapPayloadDirectional( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
    isXtoY: boolean,
  ): Promise<Types.TransactionPayload>;

  makeSwapPayload( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
  ): Promise<Types.TransactionPayload> {
    return this.makeSwapPayloadDirectional(amountIn, minAmountOut, true);
  }

  abstract makeAddLiquidityPayload(lhsAmt: UITokenAmount, rhsAmt: UITokenAmount): Promise<Types.TransactionPayload>;

  abstract makeRemoveLiquidityPayload(
    liqiudityAmt: UITokenAmount, 
    lhsMinAmt: UITokenAmount, 
    rhsMinAmt: UITokenAmount,
  ): Promise<Types.TransactionPayload>;
}

export class RouteStep {
  constructor(
    public pool: HippoPool,
    public isXtoY: boolean,
  ) {

  }

  lhsTokenInfo() {
    return this.isXtoY ? this.pool.xTokenInfo : this.pool.yTokenInfo;
  }

  rhsTokenInfo() {
    return this.isXtoY ? this.pool.yTokenInfo : this.pool.xTokenInfo;
  }
}

export class SteppedRoute extends TradeRoute {
  public steps: RouteStep[];
  constructor(
    steps: RouteStep[],
  ) {
    if(steps.length < 1) {
      throw new Error();
    }
    const firstStep = steps[0];
    const lastStep = steps[steps.length - 1];
    super(firstStep.lhsTokenInfo(), lastStep.rhsTokenInfo());
    this.steps = steps;
  }

  getCurrentPrice(): PriceType {
    let xToY = 1;
    let yToX = 1;
    for(const step of this.steps) {
      const price = step.pool.getCurrentPriceDirectional(step.isXtoY);
      xToY *= price.xToY;
      yToX *= price.yToX;
    }
    return {xToY, yToX};
  }

  getQuote(uiAmount: UITokenAmount) : QuoteType {
    if (this.steps.length === 1) {
      return this.steps[0].pool.getQuoteDirectional(uiAmount, this.steps[0].isXtoY);
    } else {
      let prevOutputUiAmt = uiAmount;
      let avgPrice = 1;
      let initialPrice = 1;
      let finalPrice = 1;
      const quotes = [];
      for(const step of this.steps) {
        const quote = step.pool.getQuoteDirectional(prevOutputUiAmt, step.isXtoY);
        quotes.push(quote);
        prevOutputUiAmt = quote.outputUiAmt;
        avgPrice *= quote.avgPrice;
        initialPrice *= quote.initialPrice;
        finalPrice *= quote.finalPrice;
      }
      return {
        inputSymbol: this.xTokenInfo.symbol.str(),
        outputSymbol: this.yTokenInfo.symbol.str(),
        avgPrice,
        initialPrice,
        finalPrice,
        inputUiAmt: uiAmount,
        outputUiAmt: prevOutputUiAmt,
        priceImpact: (finalPrice - initialPrice) / initialPrice,
      }
    }
  }

  makeSwapPayload( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
  ): Promise<Types.TransactionPayload> {
    if (this.steps.length === 1) {
      return this.steps[0].pool.makeSwapPayloadDirectional(amountIn, minAmountOut, this.steps[0].isXtoY);
    } else if (this.steps.length === 2) {
      const fromTokenInfo = this.steps[0].lhsTokenInfo();
      const middleTokenInfo = this.steps[0].rhsTokenInfo();
      const toTokenInfo = this.steps[1].rhsTokenInfo();
      const fromRawAmount = bigInt((amountIn * Math.pow(10, fromTokenInfo.decimals.toJsNumber())).toFixed(0));
      const toRawAmount = bigInt((minAmountOut * Math.pow(10, toTokenInfo.decimals.toJsNumber())).toFixed(0));
      return Promise.resolve(Router.buildPayload_two_step_route_script(
        u8(this.steps[0].pool.getPoolType()),
        this.steps[0].isXtoY,
        u8(this.steps[1].pool.getPoolType()),
        this.steps[1].isXtoY,
        u64(fromRawAmount),
        u64(toRawAmount),
        [
          typeInfoToTypeTag(fromTokenInfo.token_type),
          typeInfoToTypeTag(middleTokenInfo.token_type),
          typeInfoToTypeTag(toTokenInfo.token_type),
        ]
      ));
    } else if (this.steps.length === 3) {
      const fromTokenInfo = this.steps[0].lhsTokenInfo();
      const middle1TokenInfo = this.steps[0].rhsTokenInfo();
      const middle2TokenInfo = this.steps[1].rhsTokenInfo();
      const toTokenInfo = this.steps[2].rhsTokenInfo();
      const fromRawAmount = bigInt((amountIn * Math.pow(10, fromTokenInfo.decimals.toJsNumber())).toFixed(0));
      const toRawAmount = bigInt((minAmountOut * Math.pow(10, toTokenInfo.decimals.toJsNumber())).toFixed(0));
      return Promise.resolve(Router.buildPayload_three_step_route_script(
        u8(this.steps[0].pool.getPoolType()),
        this.steps[0].isXtoY,
        u8(this.steps[1].pool.getPoolType()),
        this.steps[1].isXtoY,
        u8(this.steps[2].pool.getPoolType()),
        this.steps[2].isXtoY,
        u64(fromRawAmount),
        u64(toRawAmount),
        [
          typeInfoToTypeTag(fromTokenInfo.token_type),
          typeInfoToTypeTag(middle1TokenInfo.token_type),
          typeInfoToTypeTag(middle2TokenInfo.token_type),
          typeInfoToTypeTag(toTokenInfo.token_type),
        ]
      ));
    }
    else {
      throw new Error();
    }
  }

  concat(next: SteppedRoute) {
    if(this.yTokenInfo.symbol !== next.xTokenInfo.symbol) {
      throw new Error(`Unable to join incompatible eroutes`);
    }
    return new SteppedRoute(this.steps.concat(next.steps));
  }

  getAllPools(): HippoPool[] {
    return this.steps.map(step => step.pool);
  }

  getSymbolPath(): string[] {
    const symbols = [this.steps[0].lhsTokenInfo().symbol];
    for(const step of this.steps) {
      if (step.lhsTokenInfo().symbol !== symbols[symbols.length - 1]) {
        throw new Error(`Bad path`);
      }
      symbols.push(step.rhsTokenInfo().symbol);
    }
    return symbols.map( s => s.str() );
  }

  summarize(): string {
    return this.getSymbolPath().join(' -> ');
  }
}