import { parseMoveStructTag, StructTag, TypeTag, u8 } from "@manahippo/move-to-ts";
import { AptosClient, HexString, Types } from "aptos";
import { DexType, PriceType, QuoteType, TradingPool, TradingPoolProvider, UITokenAmount } from "../types";
import { TokenInfo } from "../../generated/coin_registry/coin_registry";
import { TokenRegistryClient } from "../../tokenRegistry";
import { typeTagToTypeInfo } from "../../utils";
import { hippo_swap } from "../../generated";
import bigInt from "big-integer";

export enum PontemPoolTypes {
  Stable = 1,
  Uncorrelated = 1,
}

export class PontemTradingPool extends TradingPool {
  pontemPool: object | null;
  constructor(
    public ownerAddress: HexString,
    public _xTokenInfo: TokenInfo,
    public _yTokenInfo: TokenInfo,
    public lpTag: StructTag,
    public poolResourceTag: StructTag,
  ) {
    super();
    this.pontemPool = null;
  }
  get dexType() { return DexType.Pontem; }
  get poolType() { return u8(0); } // ignored
  get isRoutable() { return true; }
  // X-Y
  get xTokenInfo() { return this._xTokenInfo;}
  get yTokenInfo() { return this._yTokenInfo;}
  // state-dependent
  isStateLoaded(): boolean { return true; }
  async reloadState(client: AptosClient): Promise<void> {
    this.pontemPool = await client.getAccountResource(
      this.ownerAddress,
      this.poolResourceTag.getAptosMoveTypeTag(),
    );
  }
  getPrice(): PriceType {
    if (!this.pontemPool) {
      throw new Error("Pontem pool not loaded. cannot compute price");
    }
    throw new Error("Not Implemented");
  }
  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.pontemPool) {
      throw new Error("Pontem pool not loaded. cannot compute quote");
    }
    const inputTokenInfo = isXtoY ? this.xTokenInfo : this.yTokenInfo;
    const outputTokenInfo = isXtoY ? this.yTokenInfo : this.xTokenInfo;
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
      avgPrice: outputUiAmt / inputUiAmt,
    };
  }

  getTagE(): TypeTag {
    return this.lpTag;
  }

  // build payload directly if not routable
  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.ScriptFunctionPayload {
    throw new Error("Not Implemented");
  }
}



export class PontemPoolProvider extends TradingPoolProvider {
  constructor(
    public registry: TokenRegistryClient,
  ) {
    super();
  }
  async loadPoolList(client: AptosClient): Promise<TradingPool[]> {
    const poolList: TradingPool[] = [];
    const ownerAddress = hippo_swap.Cp_swap.moduleAddress;
    const resources = await client.getAccountResources(ownerAddress);
    for(const resource of resources) {
      if (resource.type.module === 'liquidity_pool' && resource.type.name === 'LiquidityPool') {
        const tag = parseMoveStructTag(resource.type);
        const xTag = tag.typeParams[0] as StructTag;
        const yTag = tag.typeParams[1] as StructTag;
        const lpTag = tag.typeParams[2] as StructTag;
        const xTokInfo = this.registry.getTokenInfoByType(typeTagToTypeInfo(xTag));
        const yTokInfo = this.registry.getTokenInfoByType(typeTagToTypeInfo(yTag));
        if (!xTokInfo || !yTokInfo) {
          continue;
        }
        const pool = new PontemTradingPool(ownerAddress, xTokInfo, yTokInfo, lpTag, tag);
        poolList.push(pool);
      }
    }
    return poolList;
  }
}

export function getCoinOutWithFees(
  coinInVal: bigInt.BigInteger,
  reserveInSize: bigInt.BigInteger,
  reserveOutSize: bigInt.BigInteger,
) {
  const feePct = bigInt(3);
  const feeScale = bigInt(1000);
  const feeMultiplier = feeScale.subtract(feePct);
  const coinInAfterFees = coinInVal.multiply(feeMultiplier);
  const newReservesInSize = reserveInSize.multiply(feeScale).add(coinInAfterFees);

  return coinInAfterFees.multiply(reserveOutSize).divide(newReservesInSize);
}