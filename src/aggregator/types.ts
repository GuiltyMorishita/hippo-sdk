import { AtomicTypeTag, TypeTag, u64, u8, U64, ActualStringClass, U8 } from '@manahippo/move-to-ts';
import { Types, TxnBuilderTypes } from 'aptos';
import { CoinInfo } from '../generated/coin_list/coin_list';
import { Aggregator } from '../generated/hippo_aggregator';
import { App, stdlib } from '../generated';
import { CONFIGS } from '../config';
import { CoinListClient } from '../coinList';

export type UITokenAmount = number;
export type UITokenAmountRatio = number;

export type PriceType = {
  xToY: UITokenAmountRatio;
  yToX: UITokenAmountRatio;
};

export type QuoteType = {
  inputSymbol: string;
  outputSymbol: string;
  inputUiAmt: UITokenAmount;
  outputUiAmt: UITokenAmount;
  avgPrice: UITokenAmountRatio;
  initialPrice?: UITokenAmountRatio;
  finalPrice?: UITokenAmountRatio;
  priceImpact?: number;
};

export enum DexType {
  // eslint-disable-next-line no-unused-vars
  Hippo = 1,
  // eslint-disable-next-line no-unused-vars
  Econia = 2,
  // eslint-disable-next-line no-unused-vars
  Pontem = 3,
  // eslint-disable-next-line no-unused-vars
  Basiq = 4,
  // eslint-disable-next-line no-unused-vars
  Ditto = 5,
  // eslint-disable-next-line no-unused-vars
  Tortuga = 6,
  // eslint-disable-next-line no-unused-vars
  Aptoswap = 7
}
export const DEX_TYPE_NAME: Record<DexType, string> = {
  [DexType.Hippo]: 'Hippo',
  [DexType.Econia]: 'Econia',
  [DexType.Pontem]: 'Pontem',
  [DexType.Basiq]: 'Basiq',
  [DexType.Ditto]: 'Ditto',
  [DexType.Tortuga]: 'Tortuga',
  [DexType.Aptoswap]: 'Aptoswap'
};
export type PoolType = U64;

// An AMM pool or ohchain orderbook that supports trading directly between X and Y
export abstract class TradingPool {
  // poolType
  abstract get dexType(): DexType;
  abstract get poolType(): PoolType;
  abstract get isRoutable(): boolean;
  // X-Y
  abstract get xCoinInfo(): CoinInfo;
  abstract get yCoinInfo(): CoinInfo;
  get xTag() {
    return this.xCoinInfo.token_type.toTypeTag();
  }
  get yTag() {
    return this.yCoinInfo.token_type.toTypeTag();
  }
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
  constructor(public readonly pool: TradingPool, public readonly isXtoY: boolean) {}
  get xCoinInfo() {
    return this.isXtoY ? this.pool.xCoinInfo : this.pool.yCoinInfo;
  }
  get yCoinInfo() {
    return this.isXtoY ? this.pool.yCoinInfo : this.pool.xCoinInfo;
  }
  get xTag() {
    return this.xCoinInfo.token_type.toTypeTag();
  }
  get yTag() {
    return this.yCoinInfo.token_type.toTypeTag();
  }

  getPrice(): PriceType {
    const price = this.pool.getPrice();
    if (this.isXtoY) {
      return price;
    } else {
      return {
        xToY: price.yToX,
        yToX: price.xToY
      };
    }
  }
  getQuote(inputUiAmt: UITokenAmount) {
    return this.pool.getQuote(inputUiAmt, this.isXtoY);
  }
  getTagE(): TypeTag {
    return this.pool.getTagE();
  }
}

export type SwapParamType = {
  numSteps: U8;
  firstDexType: U8;
  firstPoolType: U64;
  firstIsReversed: boolean;
  secondDexType: U8;
  secondPoolType: U64;
  secondIsReversed: boolean;
  thirdDexType: U8;
  thirdPoolType: U64;
  thirdIsReversed: boolean;
  inAmt: U64,
  minOutAmt: U64,
  types: [TypeTag, TypeTag, TypeTag, TypeTag, TypeTag, TypeTag, TypeTag]
};

export class TradeRoute {
  tokens: CoinInfo[];
  constructor(public readonly steps: TradeStep[]) {
    // at least 1 step
    if (steps.length < 1) {
      throw new Error('A TradeRoute requires at least one TradeStep');
    }
    this.tokens = [];
    // steps have matching ends
    let tokFullname = steps[0].xCoinInfo.token_type.typeFullname();
    this.tokens.push(steps[0].xCoinInfo);
    for (const step of steps) {
      const xFullname = step.xCoinInfo.token_type.typeFullname();
      const yFullname = step.yCoinInfo.token_type.typeFullname();
      // make sure LHS matches tokFullname
      if (xFullname !== tokFullname) {
        throw new Error(`Mismatching tokens in route. Expected ${tokFullname} but received ${xFullname}`);
      }
      tokFullname = yFullname;
      this.tokens.push(step.yCoinInfo);
    }
  }

  get xCoinInfo() {
    return this.steps[0].xCoinInfo;
  }

  get yCoinInfo() {
    return this.steps[this.steps.length - 1].yCoinInfo;
  }
  get xTag() {
    return this.xCoinInfo.token_type.toTypeTag();
  }
  get yTag() {
    return this.yCoinInfo.token_type.toTypeTag();
  }

  getPrice(): PriceType {
    let xToY = 1;
    let yToX = 1;
    for (const step of this.steps) {
      const price = step.pool.getPrice();
      xToY *= price.xToY;
      yToX *= price.yToX;
    }
    return { xToY, yToX };
  }

  getQuote(inputUiAmt: UITokenAmount): QuoteType {
    let outputUiAmt = inputUiAmt;
    for (const step of this.steps) {
      outputUiAmt = step.getQuote(outputUiAmt).outputUiAmt;
    }
    return {
      inputSymbol: this.xCoinInfo.symbol.str(),
      outputSymbol: this.yCoinInfo.symbol.str(),
      inputUiAmt,
      outputUiAmt,
      avgPrice: outputUiAmt / inputUiAmt
    };
  }

  hasRoundTrip() {
    // whether something like A -> B -> A or A -> B -> C -> B happens
    const fullnameSet = new Set(this.tokens.map((ti) => ti.token_type.typeFullname()));
    return fullnameSet.size < this.tokens.length;
  }

  getSwapParams(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): SwapParamType {
    const inputSize = Math.floor(inputUiAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber()));
    const minOutputSize = Math.floor(minOutAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber()));
    const dummyTag = stdlib.String.String.getTag();
    if (this.steps.length === 1) {
      const step0 = this.steps[0];
      return {
        numSteps: u8(1),
        // first
        firstDexType: u8(step0.pool.dexType),
        firstPoolType: step0.pool.poolType,
        firstIsReversed: step0.isXtoY,
        // second
        secondDexType: u8(0),
        secondPoolType: u64(0),
        secondIsReversed: false,
        // third
        thirdDexType: u8(0),
        thirdPoolType: u64(0),
        thirdIsReversed: false,
        // sizes
        inAmt: u64(inputSize),
        minOutAmt: u64(minOutputSize),
        types: [
          this.xCoinInfo.token_type.toTypeTag(), // X
          dummyTag, // Y
          dummyTag, // Z
          this.yCoinInfo.token_type.toTypeTag(), // CoinOut
          step0.getTagE(), // E1
          dummyTag, // E2
          dummyTag // E3
        ]
      };
    } else if (this.steps.length === 2) {
      const step0 = this.steps[0];
      const step1 = this.steps[1];
      return {
        numSteps: u8(2),
        // first
        firstDexType: u8(step0.pool.dexType),
        firstPoolType: step0.pool.poolType,
        firstIsReversed: step0.isXtoY,
        // second
        secondDexType: u8(step1.pool.dexType),
        secondPoolType: step1.pool.poolType,
        secondIsReversed: step1.isXtoY,
        // third
        thirdDexType: u8(0),
        thirdPoolType: u64(0),
        thirdIsReversed: false,
        // sizes
        inAmt: u64(inputSize),
        minOutAmt: u64(minOutputSize),
        types: [
          this.tokens[0].token_type.toTypeTag(), // X
          this.tokens[1].token_type.toTypeTag(), // Y
          dummyTag, // Z
          this.tokens[2].token_type.toTypeTag(), // CoinOut
          step0.getTagE(), // E1
          step1.getTagE(), // E2
          dummyTag // E3
        ]
      };
    } else if (this.steps.length === 3) {
      const step0 = this.steps[0];
      const step1 = this.steps[1];
      const step2 = this.steps[2];
      return {
        numSteps: u8(3),
        // first
        firstDexType: u8(step0.pool.dexType),
        firstPoolType: step0.pool.poolType,
        firstIsReversed: step0.isXtoY,
        // second
        secondDexType: u8(step1.pool.dexType),
        secondPoolType: step1.pool.poolType,
        secondIsReversed: step1.isXtoY,
        // third
        thirdDexType: u8(step2.pool.dexType),
        thirdPoolType: step2.pool.poolType,
        thirdIsReversed: step2.isXtoY,
        // sizes
        inAmt: u64(inputSize),
        minOutAmt: u64(minOutputSize),
        types: [
          this.tokens[0].token_type.toTypeTag(), // X
          this.tokens[1].token_type.toTypeTag(), // Y
          this.tokens[2].token_type.toTypeTag(), // Z
          this.tokens[3].token_type.toTypeTag(), // CoinOut
          step0.getTagE(), // E1
          step1.getTagE(), // E2
          step2.getTagE() // E3
        ]
      };
    } else {
      throw new Error('Unreachable');
    }
  }

  makeSwapPayload(
    inputUiAmt: UITokenAmount,
    minOutAmt: UITokenAmount,
    isJSONPayload = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    const params = this.getSwapParams(inputUiAmt, minOutAmt);
    return Aggregator.buildPayload_swap(
      params.numSteps,
      // first
      params.firstDexType,
      params.firstPoolType,
      params.firstIsReversed,
      // second
      params.firstDexType,
      params.firstPoolType,
      params.firstIsReversed,
      // third
      params.firstDexType,
      params.firstPoolType,
      params.firstIsReversed,
      // sizes
      params.inAmt,
      params.minOutAmt,
      params.types,
      isJSONPayload
    );
  }

  makePayload(
    inputUiAmt: UITokenAmount,
    minOutAmt: UITokenAmount,
    isJSONPayload = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    const inputSize = Math.floor(inputUiAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber()));
    const minOutputSize = Math.floor(minOutAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber()));
    if (this.steps.length === 1) {
      const step0 = this.steps[0];
      return Aggregator.buildPayload_one_step_route(
        u8(step0.pool.dexType),
        step0.pool.poolType,
        step0.isXtoY,
        u64(inputSize),
        u64(minOutputSize),
        [this.xCoinInfo.token_type.toTypeTag(), this.yCoinInfo.token_type.toTypeTag(), step0.getTagE()], // X, Y, E
        isJSONPayload
      );
    } else if (this.steps.length === 2) {
      const step0 = this.steps[0];
      const step1 = this.steps[1];
      return Aggregator.buildPayload_two_step_route(
        u8(step0.pool.dexType),
        step0.pool.poolType,
        step0.isXtoY,
        u8(step1.pool.dexType),
        step1.pool.poolType,
        step1.isXtoY,
        u64(inputSize),
        u64(minOutputSize),
        [
          this.tokens[0].token_type.toTypeTag(),
          this.tokens[1].token_type.toTypeTag(),
          this.tokens[2].token_type.toTypeTag(),
          step0.getTagE(),
          step1.getTagE()
        ], // X, Y, Z, E1, E2
        isJSONPayload
      );
    } else if (this.steps.length === 3) {
      const step0 = this.steps[0];
      const step1 = this.steps[1];
      const step2 = this.steps[2];
      return Aggregator.buildPayload_three_step_route(
        u8(step0.pool.dexType),
        step0.pool.poolType,
        step0.isXtoY,
        u8(step1.pool.dexType),
        step1.pool.poolType,
        step1.isXtoY,
        u8(step2.pool.dexType),
        step2.pool.poolType,
        step2.isXtoY,
        u64(inputSize),
        u64(minOutputSize),
        [
          this.tokens[0].token_type.toTypeTag(),
          this.tokens[1].token_type.toTypeTag(),
          this.tokens[2].token_type.toTypeTag(),
          this.tokens[3].token_type.toTypeTag(),
          step0.getTagE(),
          step1.getTagE(),
          step2.getTagE()
        ], // X, Y, Z, M, E1, E2, E3
        isJSONPayload
      );
    } else {
      throw new Error('Unreachable');
    }
  }

  debugPrint() {
    const lastSymbol = this.steps[this.steps.length - 1].yCoinInfo.symbol.str();
    console.log(`Route: ${this.steps.map((step) => step.xCoinInfo.symbol.str()).join(' -> ')} -> ${lastSymbol}`);
    this.steps.forEach((step, i) => {
      console.log(
        `Step ${i}: ${step.xCoinInfo.symbol.str()} -> ${step.yCoinInfo.symbol.str()} (via ${
          DEX_TYPE_NAME[step.pool.dexType]
        })`
      );
    });
  }
}

export interface RouteAndQuote {
  route: TradeRoute;
  quote: QuoteType;
}

// Each DEX is a TradeStepProvider
export abstract class TradingPoolProvider {
  constructor(public app: App, public netConfig = CONFIGS.testnet, public registry: CoinListClient) {}
  abstract loadPoolList(): Promise<TradingPool[]>;

  async reloadAllPoolState() {
    const pools = await this.loadPoolList();
    const promises = pools.map((pool) => pool.reloadState(this.app));
    await Promise.all(promises);
  }
}

export type TokenTypeFullname = string;
