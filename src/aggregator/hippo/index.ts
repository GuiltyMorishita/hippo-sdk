import { AptosParserRepo, StructTag, u8 } from "@manahippo/move-to-ts";
import { AptosAccount, Types } from "aptos";
import { CONFIGS } from "../../config";
import { App } from "../../generated";
import { TokenPairMetadata } from "../../generated/hippo_swap/cp_swap";
import { PieceSwapPoolInfo } from "../../generated/hippo_swap/piece_swap";
import { StableCurvePoolInfo } from "../../generated/hippo_swap/stable_curve_swap";
import { HippoConstantProductPool, HippoPieceSwapPool, HippoPool, HippoStableCurvePool, HippoSwapClient } from "../../swap";
import { DexType, QuoteType, TradingPool, TradingPoolProvider, UITokenAmount } from "../types";

export enum HippoPoolTypes {
  ConstantProduct = 1,
  StableCurve = 2,
  ThreePiece = 3,
}

export class HippoTradingPool extends TradingPool {
  constructor(
    public pool: HippoPool,
    public repo: AptosParserRepo,
  ) {
    super();
  }
  get dexType() { return DexType.Hippo; }
  get poolType() {
    if (this.pool instanceof HippoConstantProductPool) {
      return u8(HippoPoolTypes.ConstantProduct);
    }
    else if (this.pool instanceof HippoStableCurvePool) {
      return u8(HippoPoolTypes.StableCurve);
    }
    else if (this.pool instanceof HippoPieceSwapPool) {
      return u8(HippoPoolTypes.ThreePiece);
    }
    else {
      throw new Error("Unreachable");
    }
  }
  get isRoutable() { return true; }
  // X-Y
  get xCoinInfo() { return this.pool.xCoinInfo;}
  get yCoinInfo() { return this.pool.yCoinInfo;}
  // state-dependent
  isStateLoaded(): boolean { return true; }
  async reloadState(app: App): Promise<void> {
    if (this.pool instanceof HippoConstantProductPool) {
      const resource = await TokenPairMetadata.load(this.repo, app.client, TokenPairMetadata.moduleAddress, (this.pool.cpPoolMeta.typeTag as StructTag).typeParams);
      this.pool.cpPoolMeta = resource;
    }
    else if (this.pool instanceof HippoStableCurvePool) {
      const resource = await StableCurvePoolInfo.load(this.repo, app.client, TokenPairMetadata.moduleAddress, (this.pool.stablePoolInfo.typeTag as StructTag).typeParams);
      this.pool.stablePoolInfo = resource;
    }
    else if (this.pool instanceof HippoPieceSwapPool) {
      const resource = await PieceSwapPoolInfo.load(this.repo, app.client, TokenPairMetadata.moduleAddress, (this.pool.poolInfo.typeTag as StructTag).typeParams);
      this.pool.poolInfo = resource;
    }
    else {
      throw new Error("Unreachable");
    }
  }
  getPrice() {
    return this.pool.getCurrentPrice();
  }
  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    return this.pool.getQuoteDirectional(inputUiAmt, isXtoY);
  }
  // build payload directly if not routable
  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error("Not Implemented");
  }
}

export class HippoPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const swapClient = await HippoSwapClient.createInOneCall(this.app, this.netConfig, this.fetcher);
    const poolList: TradingPool[] = [];
    for(const fullname in swapClient.xyFullnameToPoolSet) {
      const poolSet = swapClient.xyFullnameToPoolSet[fullname];
      const pools = poolSet.pools();
      for (const pool of pools) {
        poolList.push(new HippoTradingPool(pool, this.app.parserRepo));
      }
    }
    return poolList;
  }
}