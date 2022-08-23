import { AtomicTypeTag, TypeTag, u64, u8, U8 } from "@manahippo/move-to-ts";
import {AptosClient, TxnBuilderTypes, Types} from "aptos";
import {CoinInfo} from "../generated/coin_list/coin_list";
import { Aggregatorv6 } from "../generated/hippo_aggregator";
import {App} from "../generated";

export type UITokenAmount = number;
export type UITokenAmountRatio = number;

export type PriceType = {
  xToY: UITokenAmountRatio;
  yToX: UITokenAmountRatio;
}

export type QuoteType = {
  inputSymbol: string;
  outputSymbol: string;
  inputUiAmt: UITokenAmount;
  outputUiAmt: UITokenAmount;
  avgPrice: UITokenAmountRatio;
  initialPrice?: UITokenAmountRatio;
  finalPrice?: UITokenAmountRatio; 
  priceImpact?: number;
}

export enum DexType {
  Hippo = 1,
  Econia = 2,
  Pontem = 3,
}
export const DEX_TYPE_NAME: Record<DexType, string> = {
  [DexType.Hippo] : "Hippo",
  [DexType.Econia] : "Econia",
  [DexType.Pontem] : "Pontem",
}
export type PoolType = U8;

// An AMM pool or ohchain orderbook that supports trading directly between X and Y
export abstract class TradingPool {
  // poolType
  abstract get dexType() : DexType;
  abstract get poolType(): PoolType;
  abstract get isRoutable(): boolean;
  // X-Y
  abstract get xCoinInfo(): CoinInfo;
  abstract get yCoinInfo(): CoinInfo;
  get xTag() { return this.xCoinInfo.token_type.toTypeTag(); }
  get yTag() { return this.yCoinInfo.token_type.toTypeTag(); }
  // functions that depend on pool's onchain state
  abstract isStateLoaded(): boolean;
  abstract reloadState(app: App): Promise<void>;
  abstract getPrice(): PriceType;
  abstract getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType;
  // build payload directly if not routable
  abstract makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload;
  getTagE(): TypeTag {
    return AtomicTypeTag.U8;
  }
}

// a single trade step involving a Pool and a direction (X-to-Y or Y-to-X)
export class TradeStep {
  constructor(
    public readonly pool: TradingPool,
    public readonly isXtoY: boolean,
  ) {

  }
  get xTokenInfo() {
    return this.isXtoY ? this.pool.xCoinInfo : this.pool.yCoinInfo;
  }
  get yTokenInfo() {
    return this.isXtoY ? this.pool.yCoinInfo : this.pool.xCoinInfo;
  }
  get xTag() { return this.xTokenInfo.token_type.toTypeTag(); }
  get yTag() { return this.yTokenInfo.token_type.toTypeTag(); }

  getPrice(): PriceType {
    const price = this.pool.getPrice();
    if (this.isXtoY) {
      return price;
    }
    else {
      return {
        xToY: price.yToX,
        yToX: price.xToY,
      }
    }
  }
  getQuote(inputUiAmt: UITokenAmount) {
    return this.pool.getQuote(inputUiAmt, this.isXtoY);
  }
  getTagE(): TypeTag {
    return this.pool.getTagE();
  }
}

export class TradeRoute {
  tokens: CoinInfo[];
  constructor(
    public readonly steps: TradeStep[],
  ) {
    // at least 1 step
    if (steps.length < 1) {
      throw new Error("A TradeRoute requires at least one TradeStep");
    }
    this.tokens = [];
    // steps have matching ends
    let tokFullname = steps[0].xTokenInfo.token_type.typeFullname();
    this.tokens.push(steps[0].xTokenInfo);
    for(const step of steps) {
      const xFullname = step.xTokenInfo.token_type.typeFullname();
      const yFullname = step.yTokenInfo.token_type.typeFullname();
      // make sure LHS matches tokFullname
      if (xFullname !== tokFullname) {
        throw new Error(`Mismatching tokens in route. Expected ${tokFullname} but received ${xFullname}`);
      }
      tokFullname = yFullname;
      this.tokens.push(step.yTokenInfo);
    }
  }

  get xTokenInfo() {
    return this.steps[0].xTokenInfo;
  }

  get yTokenInfo() {
    return this.steps[this.steps.length - 1].yTokenInfo;
  }
  get xTag() { return this.xTokenInfo.token_type.toTypeTag(); }
  get yTag() { return this.yTokenInfo.token_type.toTypeTag(); }

  getPrice(): PriceType {
    let xToY = 1;
    let yToX = 1;
    for(const step of this.steps) {
      const price = step.pool.getPrice();
      xToY *= price.xToY;
      yToX *= price.yToX;
    }
    return { xToY, yToX };
  }

  getQuote(inputUiAmt: UITokenAmount) : QuoteType {
    let outputUiAmt = inputUiAmt;
    for(const step of this.steps) {
      outputUiAmt = step.getQuote(outputUiAmt).outputUiAmt;
    }
    return {
      inputSymbol: this.xTokenInfo.symbol.str(),
      outputSymbol: this.yTokenInfo.symbol.str(),
      inputUiAmt,
      outputUiAmt,
      avgPrice: outputUiAmt / inputUiAmt,
    }
  }

  hasRoundTrip() {
    // whether something like A -> B -> A or A -> B -> C -> B happens
    const fullnameSet = new Set(this.tokens.map(ti => ti.token_type.typeFullname()));
    return fullnameSet.size < this.tokens.length;
  }

  makePaylod(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): TxnBuilderTypes.TransactionPayloadEntryFunction {
    const inputSize = Math.floor(inputUiAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber()));
    const minOutputSize = Math.floor(minOutAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber()));
    if (this.steps.length === 1) {
      const step0 = this.steps[0];
      return Aggregatorv6.buildPayload_one_step_route(
        u8(step0.pool.dexType), step0.pool.poolType, step0.isXtoY,
        u64(inputSize), u64(minOutputSize),
        [
          this.xTokenInfo.token_type.toTypeTag(), 
          this.yTokenInfo.token_type.toTypeTag(), 
          step0.getTagE()
        ] // X, Y, E
      )
    }
    else if (this.steps.length === 2) {
      const step0 = this.steps[0];
      const step1 = this.steps[1];
      return Aggregatorv6.buildPayload_two_step_route(
        u8(step0.pool.dexType), step0.pool.poolType, step0.isXtoY,
        u8(step1.pool.dexType), step1.pool.poolType, step1.isXtoY,
        u64(inputSize), u64(minOutputSize),
        [
          this.tokens[0].token_type.toTypeTag(), 
          this.tokens[1].token_type.toTypeTag(), 
          this.tokens[2].token_type.toTypeTag(), 
          step0.getTagE(),
          step1.getTagE(),
        ] // X, Y, Z, E1, E2
      )
    }
    else if (this.steps.length === 3) {
      const step0 = this.steps[0];
      const step1 = this.steps[1];
      const step2 = this.steps[2];
      return Aggregatorv6.buildPayload_three_step_route(
        u8(step0.pool.dexType), step0.pool.poolType, step0.isXtoY,
        u8(step1.pool.dexType), step1.pool.poolType, step1.isXtoY,
        u8(step2.pool.dexType), step2.pool.poolType, step2.isXtoY,
        u64(inputSize), u64(minOutputSize),
        [
          this.tokens[0].token_type.toTypeTag(), 
          this.tokens[1].token_type.toTypeTag(), 
          this.tokens[2].token_type.toTypeTag(), 
          this.tokens[3].token_type.toTypeTag(), 
          step0.getTagE(),
          step1.getTagE(),
          step2.getTagE(),
        ] // X, Y, Z, M, E1, E2, E3
      )
    }
    else {
      throw new Error("Unreachable");
    }
  }

  debugPrint() {
    const lastSymbol = this.steps[this.steps.length - 1].yTokenInfo.symbol.str();
    console.log(`Route: ${this.steps.map(step => step.xTokenInfo.symbol.str()).join(" -> ")} -> ${lastSymbol}`);
    this.steps.forEach((step, i) => {
      console.log(`Step ${i}: ${step.xTokenInfo.symbol.str()} -> ${step.yTokenInfo.symbol.str()} (via ${DEX_TYPE_NAME[step.pool.dexType]})`);
    }) ;
  }
}

export interface RouteAndQuote {
  route: TradeRoute;
  quote: QuoteType;
}

// Each DEX is a TradeStepProvider
export abstract class TradingPoolProvider {

  abstract loadPoolList(app: App): Promise<TradingPool[]>;

  async reloadAllPoolState(app: App) {
    const pools = await this.loadPoolList(app);
    const promises = pools.map(pool => pool.reloadState(app));
    await Promise.all(promises);
  }
}

export type TokenTypeFullname = string;
