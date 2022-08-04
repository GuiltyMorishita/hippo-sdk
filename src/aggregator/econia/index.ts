import { AptosLocalCache, AptosParserRepo, copy, TypeTag, u64, U64, u8 } from "@manahippo/move-to-ts";
import { AptosClient, HexString, Types } from "aptos";
import { getProjectRepo } from "../../generated";
import { EconiaClient } from "./EconiaClient";
import { Registry$_ } from "../../generated/Econia";
import { TokenInfo } from "../../generated/coin_registry/coin_registry";
import { get_orders$, OB } from "../../generated/Econia/Book";
import { MI } from "../../generated/Econia/Registry";
import { TokenRegistryClient } from "../../tokenRegistry";
import { DexType, PriceType, QuoteType, TradingPool, TradingPoolProvider, UITokenAmount } from "../types";

export * from "./EconiaClient";

export enum EconiaPoolType {
  V1 = 1,
}

export class EconiaTradingPoolV1 extends TradingPool {
  constructor(
    public xInfo: TokenInfo,
    public yInfo: TokenInfo,
    public orderBook: OB | null,
    public mi: MI,
    public owner: HexString,
    public repo: AptosParserRepo,
  ) {
    super();
  }
  get dexType() { return DexType.Econia; }
  get poolType() { return u8(EconiaPoolType.V1); }
  get isRoutable() { return true; }
  // X-Y
  get xTokenInfo() {return this.xInfo; }
  get yTokenInfo() {return this.yInfo; }
  get xTag() { return this.xTokenInfo.token_type.toTypeTag(); }
  get yTag() { return this.yTokenInfo.token_type.toTypeTag(); }
  // functions that depend on pool's onchain state
  isStateLoaded() { return !!this.orderBook; }
  async reloadState(client: AptosClient): Promise<void> {
    this.orderBook = await OB.load(this.repo, client, this.owner, this.getMiTags())
  }
  getMiTags(): TypeTag[] {
    return [
      this.mi.b.toTypeTag(),
      this.mi.q.toTypeTag(),
      this.mi.e.toTypeTag(),
    ];
  }
  getUiPrice(rawPrice: U64) {
    if (!this.orderBook) {
      throw new Error("Econia Orderbook not loaded. cannot compute price");
    }
    const xFactor = Math.pow(10, this.xTokenInfo.decimals.toJsNumber());
    const yFactor = Math.pow(10, this.yTokenInfo.decimals.toJsNumber());
    const scaleFactor = this.orderBook.f.toJsNumber(); 
    // yToX price
    return rawPrice.toJsNumber() / yFactor / (scaleFactor / xFactor);
  }
  getPrice(): PriceType {
    if (!this.orderBook) {
      throw new Error("Econia Orderbook not loaded. cannot compute price");
    }
    // use top-of-book price
    let xToY = 0;
    let yToX = 0;
    const cache = new AptosLocalCache();
    cache.move_to(this.orderBook.typeTag, this.owner, copy(this.orderBook));
    const asks = get_orders$(this.owner, true, cache, this.getMiTags());
    const bids = get_orders$(this.owner, false, cache, this.getMiTags());
    if (asks.length > 0) {
      // y to x is buying, hits asks
      yToX = this.getUiPrice(asks[0].price);
    }
    if (bids.length > 0) {
      // x to y is selling, hits bids
      xToY = 1 / this.getUiPrice(bids[0].price);
    }
    return {
      xToY,
      yToX,
    }
  }
  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.orderBook) {
      throw new Error("Econia Orderbook not loaded. cannot compute quote");
    }
    const cache = new AptosLocalCache();
    cache.move_to(this.orderBook.typeTag, this.owner, copy(this.orderBook));
    const asks = get_orders$(this.owner, true, cache, this.getMiTags());
    const bids = get_orders$(this.owner, false, cache, this.getMiTags());
    if (isXtoY) {
      // selling
      let soldBaseSize = u64(0);
      let remainingBaseSize = u64(inputUiAmt * Math.pow(10, this.xTokenInfo.decimals.toJsNumber()));
      let gotQuoteSize = u64(0);
      for(const bid of bids) {
        if (remainingBaseSize.eq(u64(0))) {
          break;
        }
        const bidBaseSize = bid.size.mul(this.orderBook.f);
        const fillBaseSize = remainingBaseSize.gt(bidBaseSize) ? bidBaseSize : remainingBaseSize;
        if (fillBaseSize.gt(u64(0))) {
          soldBaseSize = soldBaseSize.add(fillBaseSize);
          remainingBaseSize = remainingBaseSize.sub(fillBaseSize);
          gotQuoteSize = gotQuoteSize.add(fillBaseSize.div(this.orderBook.f).mul(bid.price));
        }
      }
      // has partial unfilled
      return {
        inputSymbol: this.xTokenInfo.symbol.str(),
        outputSymbol: this.yTokenInfo.symbol.str(),
        inputUiAmt: soldBaseSize.toJsNumber() / Math.pow(10, this.xTokenInfo.decimals.toJsNumber()),
        outputUiAmt: gotQuoteSize.toJsNumber() / Math.pow(10, this.yTokenInfo.decimals.toJsNumber()),
      }
    }
    else {
        // buying
        let gotBaseSize = u64(0);
        let soldQuoteSize = u64(0);
        let remainingQuoteSize = u64(inputUiAmt * Math.pow(10, this.yTokenInfo.decimals.toJsNumber()));
        for (const ask of asks) {
          if (remainingQuoteSize.eq(u64(0))) {
            break;
          }
          const askQuoteSize = ask.size.mul(ask.price);
          const fillQuoteSize = remainingQuoteSize.gt(askQuoteSize)? askQuoteSize : remainingQuoteSize;
          if (fillQuoteSize.gt(u64(0))) {
            soldQuoteSize = soldQuoteSize.add(fillQuoteSize);
            remainingQuoteSize = remainingQuoteSize.sub(fillQuoteSize);
            gotBaseSize = gotBaseSize.add(fillQuoteSize.div(ask.price).mul(this.orderBook.f));
          }
        }
        return {
          inputSymbol: this.xTokenInfo.symbol.str(),
          outputSymbol: this.yTokenInfo.symbol.str(),
          inputUiAmt: soldQuoteSize.toJsNumber() / Math.pow(10, this.yTokenInfo.decimals.toJsNumber()),
          outputUiAmt: gotBaseSize.toJsNumber() / Math.pow(10, this.xTokenInfo.decimals.toJsNumber()),
        }
    }
  }

  getTagE(): TypeTag {
    return this.mi.e.toTypeTag();
  }

  // build payload directly if not routable
  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.ScriptFunctionPayload {
    // routable, so no need to implement
    throw new Error("Not Implemented");
  }
}

export class EconiaPoolProvider extends TradingPoolProvider {
  constructor(
    public registry: TokenRegistryClient,
  ) {
    super();
  }
  async loadPoolList(client: AptosClient): Promise<TradingPool[]> {
    const econiaClient = new EconiaClient(client, Registry$_.moduleAddress);
    const repo = getProjectRepo();
    const markets = await econiaClient.getMarkets();
    const pools : TradingPool[] = [];
    const promises: Promise<void>[] = [];
    markets.forEach(([mi, owner]) => {
      if(this.registry.hasTokenType(mi.b) && this.registry.hasTokenType(mi.q)) {
        pools.push(new EconiaTradingPoolV1(
          this.registry.getTokenInfoByType(mi.b),
          this.registry.getTokenInfoByType(mi.q),
          null,
          mi,
          owner,
          repo,
        ));
      }
    });
    await Promise.all(promises);
    return pools;
  }
}
