import { AptosParserRepo, StructTag, u64 } from '@manahippo/move-to-ts';
import { Types } from 'aptos';
import { App } from '../../generated';
import { TokenPairMetadata } from '../../generated/hippo_swap/cp_swap';
import { PieceSwapPoolInfo } from '../../generated/hippo_swap/piece_swap';
import { StableCurvePoolInfo } from '../../generated/hippo_swap/stable_curve_swap';
import {
  HippoConstantProductPool,
  HippoPieceSwapPool,
  HippoPool,
  HippoStableCurvePool,
  HippoSwapClient
} from '../../swap';
import { DexType, QuoteType, TradingPool, TradingPoolProvider, UITokenAmount } from '../types';

export enum HippoPoolTypes {
  // eslint-disable-next-line no-unused-vars
  ConstantProduct = 1,
  // eslint-disable-next-line no-unused-vars
  StableCurve = 2,
  // eslint-disable-next-line no-unused-vars
  ThreePiece = 3
}

export class HippoTradingPool extends TradingPool {
  constructor(public pool: HippoPool, public repo: AptosParserRepo) {
    super();
  }
  get dexType() {
    return DexType.Hippo;
  }
  get poolType() {
    if (this.pool instanceof HippoConstantProductPool) {
      return u64(HippoPoolTypes.ConstantProduct);
    } else if (this.pool instanceof HippoStableCurvePool) {
      return u64(HippoPoolTypes.StableCurve);
    } else if (this.pool instanceof HippoPieceSwapPool) {
      return u64(HippoPoolTypes.ThreePiece);
    } else {
      throw new Error('Unreachable');
    }
  }
  get isRoutable() {
    return true;
  }
  // X-Y
  get xCoinInfo() {
    return this.pool.xCoinInfo;
  }
  get yCoinInfo() {
    return this.pool.yCoinInfo;
  }
  // state-dependent
  isStateLoaded(): boolean {
    return true;
  }
  async reloadState(app: App): Promise<void> {
    if (this.pool instanceof HippoConstantProductPool) {
      this.pool.cpPoolMeta = await TokenPairMetadata.load(
        this.repo,
        app.client,
        TokenPairMetadata.moduleAddress,
        (this.pool.cpPoolMeta.typeTag as StructTag).typeParams
      );
    } else if (this.pool instanceof HippoStableCurvePool) {
      this.pool.stablePoolInfo = await StableCurvePoolInfo.load(
        this.repo,
        app.client,
        TokenPairMetadata.moduleAddress,
        (this.pool.stablePoolInfo.typeTag as StructTag).typeParams
      );
    } else if (this.pool instanceof HippoPieceSwapPool) {
      this.pool.poolInfo = await PieceSwapPoolInfo.load(
        this.repo,
        app.client,
        TokenPairMetadata.moduleAddress,
        (this.pool.poolInfo.typeTag as StructTag).typeParams
      );
    } else {
      throw new Error('Unreachable');
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
    throw new Error('Not Implemented');
  }
}

export class HippoPoolProvider extends TradingPoolProvider {
  async loadPoolList(): Promise<TradingPool[]> {
    const swapClient = await HippoSwapClient.createInOneCall(this.app, this.netConfig, this.fetcher);
    const poolList: TradingPool[] = [];
    for (const fullname in swapClient.xyFullnameToPoolSet) {
      const poolSet = swapClient.xyFullnameToPoolSet[fullname];
      const pools = poolSet.pools();
      for (const pool of pools) {
        poolList.push(new HippoTradingPool(pool, this.app.parserRepo));
      }
    }
    return poolList;
  }
}
