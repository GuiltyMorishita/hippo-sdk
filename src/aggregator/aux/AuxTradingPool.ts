import { DexType, PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../types';
import { HexString, Types } from 'aptos';
import { App } from '../../generated';
import { CoinInfo } from '../../generated/coin_list/coin_list';
import { au_out_, Pool as AuxPool } from '../../generated/aux/amm';
import { u64 } from '@manahippo/move-to-ts';

export class AuxTradingPool extends TradingPool {
  private pool: AuxPool | null;
  constructor(public ownerAddress: HexString, public xInfo: CoinInfo, public yInfo: CoinInfo) {
    super();
    this.pool = null;
  }
  get dexType(): DexType {
    return DexType.Aux;
  }

  getPrice(): PriceType {
    if (this.isStateLoaded()) {
      const xPrice = au_out_(u64(10 ** this.xInfo.decimals.toJsNumber()), this.pool?.__app?.cache!, [
        this.xCoinInfo.token_type.toTypeTag(),
        this.yCoinInfo.token_type.toTypeTag()
      ]);
      const yPrice = au_out_(u64(10 ** this.xInfo.decimals.toJsNumber()), this.pool?.__app?.cache!, [
        this.yCoinInfo.token_type.toTypeTag(),
        this.xCoinInfo.token_type.toTypeTag()
      ]);
      return {
        xToY: xPrice.toJsNumber(),
        yToX: yPrice.toJsNumber()
      };
    }
    throw new Error('Aux pool not loaded. cannot compute quote');
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.isStateLoaded()) {
      throw new Error('Aux pool not loaded. cannot compute quote');
    }
    const inputCoinInfo = isXtoY ? this.xCoinInfo : this.yCoinInfo;
    const outputCoinInfo = isXtoY ? this.yCoinInfo : this.xCoinInfo;
    if (inputUiAmt == 0) {
      return {
        inputSymbol: inputCoinInfo.symbol.str(),
        outputSymbol: outputCoinInfo.symbol.str(),
        inputUiAmt,
        outputUiAmt: 0,
        avgPrice: 0
      };
    }
    let outAmount = au_out_(
      u64(Math.floor(inputUiAmt * Math.pow(10, inputCoinInfo.decimals.toJsNumber()))),
      this.pool?.__app?.cache!,
      [inputCoinInfo.token_type.toTypeTag(), outputCoinInfo.token_type.toTypeTag()]
    );
    const outputUiAmt = outAmount.toJsNumber() / Math.pow(10, outputCoinInfo.decimals.toJsNumber());
    return {
      inputSymbol: inputCoinInfo.symbol.str(),
      outputSymbol: outputCoinInfo.symbol.str(),
      inputUiAmt,
      outputUiAmt,
      avgPrice: outputUiAmt / inputUiAmt
    };
  }

  get isRoutable(): boolean {
    return true;
  }

  isStateLoaded(): boolean {
    return this.pool != null;
  }

  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }

  get poolType(): PoolType {
    return u64(0);
  }

  async reloadState(app: App): Promise<void> {
    this.pool = await app.aux.amm.loadPool(this.ownerAddress, [
      this.xCoinInfo.token_type.toTypeTag(),
      this.yCoinInfo.token_type.toTypeTag()
    ]);
  }

  get xCoinInfo(): CoinInfo {
    return this.xInfo;
  }

  get yCoinInfo(): CoinInfo {
    return this.yInfo;
  }
}
