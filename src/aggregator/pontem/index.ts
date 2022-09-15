import { parseMoveStructTag, SimulationKeys, StructTag, TypeTag, u64 } from '@manahippo/move-to-ts';
import { HexString, Types } from 'aptos';
import { DexType, PriceType, QuoteType, TradingPool, TradingPoolProvider, UITokenAmount } from '../types';
import { CoinListClient } from '../../coinList';
import { typeTagToTypeInfo } from '../../utils';
import { App, hippo_swap } from '../../generated';
import bigInt from 'big-integer';
import { CoinInfo } from '../../generated/coin_list/coin_list';
import { CONFIGS } from '../../config';

export class PontemTradingPool extends TradingPool {
  pontemPool: object | null;
  constructor(
    public ownerAddress: HexString,
    public _xCoinInfo: CoinInfo,
    public _yCoinInfo: CoinInfo,
    public lpTag: StructTag,
    public poolResourceTag: StructTag
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
    return true;
  }
  async reloadState(app: App): Promise<void> {
    this.pontemPool = await app.client.getAccountResource(
      this.ownerAddress,
      this.poolResourceTag.getAptosMoveTypeTag()
    );
  }
  getPrice(): PriceType {
    if (!this.pontemPool) {
      throw new Error('Pontem pool not loaded. cannot compute price');
    }
    throw new Error('Not Implemented');
  }
  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.pontemPool) {
      throw new Error('Pontem pool not loaded. cannot compute quote');
    }
    const inputTokenInfo = isXtoY ? this.xCoinInfo : this.yCoinInfo;
    const outputTokenInfo = isXtoY ? this.yCoinInfo : this.xCoinInfo;
    const coinXReserve = (this.pontemPool as any).data.coin_x_reserve.value as string;
    const coinYReserve = (this.pontemPool as any).data.coin_y_reserve.value as string;
    const coinInAmt = bigInt(Math.floor(inputUiAmt * Math.pow(10, inputTokenInfo.decimals.toJsNumber())));
    const reserveInAmt = bigInt(isXtoY ? coinXReserve : coinYReserve);
    const reserveOutAmt = bigInt(isXtoY ? coinYReserve : coinXReserve);
    const coinOutAmt = getCoinOutWithFees(coinInAmt, reserveInAmt, reserveOutAmt);
    const outputUiAmt = coinOutAmt.toJSNumber() / Math.pow(10, outputTokenInfo.decimals.toJsNumber());

    return {
      inputSymbol: inputTokenInfo.symbol.str(),
      outputSymbol: outputTokenInfo.symbol.str(),
      inputUiAmt,
      outputUiAmt,
      avgPrice: outputUiAmt / inputUiAmt
    };
  }

  getTagE(): TypeTag {
    return this.lpTag;
  }

  // build payload directly if not routable
  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }
}

export class PontemPoolProvider extends TradingPoolProvider {
  constructor(app: App, fetcher: SimulationKeys, netConfig = CONFIGS.devnet, public registry: CoinListClient) {
    super(app, fetcher, netConfig);
  }
  async loadPoolList(): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddress = hippo_swap.Cp_swap.moduleAddress;
    const resources = await this.app.client.getAccountResources(ownerAddress);
    for (const resource of resources) {
      if (resource.type.indexOf('liquidity_pool::LiquidityPool') >= 0) {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const lpTag = tag.typeParams[2] as StructTag;
        const xCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(xTag));
        const yCoinInfo = this.registry.getCoinInfoByType(typeTagToTypeInfo(yTag));
        if (!xCoinInfo || !yCoinInfo) {
          continue;
        }
        const pool = new PontemTradingPool(ownerAddress, xCoinInfo, yCoinInfo, lpTag, tag);
        poolList.push(pool);
      }
    }
    return poolList;
  }
}

export function getCoinOutWithFees(
  coinInVal: bigInt.BigInteger,
  reserveInSize: bigInt.BigInteger,
  reserveOutSize: bigInt.BigInteger
) {
  const feePct = bigInt(3);
  const feeScale = bigInt(1000);
  const feeMultiplier = feeScale.subtract(feePct);
  const coinInAfterFees = coinInVal.multiply(feeMultiplier);
  const newReservesInSize = reserveInSize.multiply(feeScale).add(coinInAfterFees);

  return coinInAfterFees.multiply(reserveOutSize).divide(newReservesInSize);
}
