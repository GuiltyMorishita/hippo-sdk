import { DexType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../types';
import { HexString, Types } from 'aptos';
import { CoinInfo } from '../../generated/coin_list/coin_list';
import { StructTag, TypeTag, u64 } from '@manahippo/move-to-ts';
import { App } from '../../generated';
import { LiquidityPool as PontemPool } from '../../generated/liquidswap/liquidity_pool';
import { get_amount_out_ } from '../../generated/liquidswap/router';

export class PontemTradingPool extends TradingPool {
  pontemPool: PontemPool | null;
  constructor(
    public ownerAddress: HexString,
    public _xCoinInfo: CoinInfo,
    public _yCoinInfo: CoinInfo,
    public curvesTag: StructTag
  ) {
    super();
    this.pontemPool = null;
  }
  get dexType() {
    return DexType.Pontem;
  }
  get poolType() {
    return u64(0);
  } // ignored
  get isRoutable() {
    return true;
  }
  // X-Y
  get xCoinInfo() {
    return this._xCoinInfo;
  }
  get yCoinInfo() {
    return this._yCoinInfo;
  }
  // state-dependent
  isStateLoaded(): boolean {
    return this.pontemPool != undefined;
  }
  async reloadState(app: App): Promise<void> {
    this.pontemPool = await app.liquidswap.liquidity_pool.loadLiquidityPool(this.ownerAddress, [
      this.xCoinInfo.token_type.toTypeTag(),
      this.yCoinInfo.token_type.toTypeTag(),
      // todo may err
      this.getCurves()
    ]);
  }
  getPrice(): PriceType {
    if (!this.isStateLoaded()) {
      throw new Error('Pontem pool not loaded. cannot compute price');
    }
    throw new Error('Not Implemented');
  }
  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.isStateLoaded()) {
      throw new Error('Pontem pool not loaded. cannot compute quote');
    }
    const inputTokenInfo = isXtoY ? this.xCoinInfo : this.yCoinInfo;
    const outputTokenInfo = isXtoY ? this.yCoinInfo : this.xCoinInfo;
    const pool = this.pontemPool!;
    const cache = pool.__app?.cache!;
    cache.move_to(pool.typeTag, this.ownerAddress, pool, true);
    const outAmount = get_amount_out_(
      u64(Math.floor(inputUiAmt * Math.pow(10, inputTokenInfo.decimals.toJsNumber()))),
      this.pontemPool?.__app?.cache!,
      [
        inputTokenInfo.token_type.toTypeTag(),
        outputTokenInfo.token_type.toTypeTag(),
        // todo may err
        this.getCurves()
      ]
    );
    const outputUiAmt = outAmount.toJsNumber() / Math.pow(10, outputTokenInfo.decimals.toJsNumber());

    return {
      inputSymbol: inputTokenInfo.symbol.str(),
      outputSymbol: outputTokenInfo.symbol.str(),
      inputUiAmt,
      outputUiAmt,
      avgPrice: outputUiAmt / inputUiAmt
    };
  }

  getTagE(): TypeTag {
    return this.curvesTag;
  }

  // build payload directly if not routable
  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }
  getCurves() {
    return this.curvesTag;
  }
}
