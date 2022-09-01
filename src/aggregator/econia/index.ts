import { AptosAccount, HexString, Types } from "aptos";
import { App } from "../../generated";
import { AptosLocalCache, AptosParserRepo, SimulationKeys, TypeTag, u64, U64, u8 } from "@manahippo/move-to-ts";

import { EconiaClient } from "./EconiaClient";
import { get_orders_sdk_, OrderBook } from "../../generated/econia/market";
import { MarketInfo } from "../../generated/econia/registry";
import { CoinListClient } from "../../coinList";
import {
  DexType,
  PriceType,
  QuoteType,
  TradingPool,
  TradingPoolProvider,
  UITokenAmount,
} from "../types";
import { Registry } from "../../generated/econia";
import { CoinInfo } from "../../generated/coin_list/coin_list";
import { CONFIGS } from "../../config";

export * from "./EconiaClient";

export enum EconiaPoolType {
  // eslint-disable-next-line no-unused-vars
  V1 = 1,
}

export class EconiaTradingPoolV1 extends TradingPool {
  constructor(
    public xInfo: CoinInfo,
    public yInfo: CoinInfo,
    public orderBook: OrderBook | null,
    public mi: MarketInfo,
    public owner: HexString,
    public repo: AptosParserRepo
  ) {
    super();
  }
  get dexType() {
    return DexType.Econia;
  }
  get poolType() {
    return u8(EconiaPoolType.V1);
  }
  get isRoutable() {
    return true;
  }
  // X-Y
  get xCoinInfo() {
    return this.xInfo;
  }
  get yCoinInfo() {
    return this.yInfo;
  }
  get xTag() {
    return this.xCoinInfo.token_type.toTypeTag();
  }
  get yTag() {
    return this.yCoinInfo.token_type.toTypeTag();
  }
  // functions that depend on pool's onchain state
  isStateLoaded() {
    return !!this.orderBook;
  }
  async reloadState(app: App): Promise<void> {
    this.orderBook = await OrderBook.load(
      this.repo,
      app.client,
      this.owner,
      this.getMiTags()
    );
  }
  getMiTags(): TypeTag[] {
    return [
      this.mi.base_coin_type.toTypeTag(),
      this.mi.quote_coin_type.toTypeTag(),
      this.mi.scale_exponent_type.toTypeTag(),
    ];
  }
  getUiPrice(rawPrice: U64) {
    if (!this.orderBook) {
      throw new Error("Econia Orderbook not loaded. cannot compute price");
    }
    const xFactor = Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
    const yFactor = Math.pow(10, this.yCoinInfo.decimals.toJsNumber());
    const scaleFactor = this.orderBook.scale_factor.toJsNumber();
    // yToX price
    return rawPrice.toJsNumber() / yFactor / (scaleFactor / xFactor);
  }
  getPrice(): PriceType {
    if (!this.orderBook) {
      throw new Error("Econia Orderbook not loaded. cannot compute price");
    }
    // use top-of-book price
    const cache = new AptosLocalCache();
    let xToY = 0;
    let yToX = 0;
    const asks = get_orders_sdk_(this.orderBook, true, cache, this.getMiTags());
    const bids = get_orders_sdk_(
      this.orderBook,
      false,
      cache,
      this.getMiTags()
    );
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
    };
  }
  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.orderBook) {
      throw new Error("Econia Orderbook not loaded. cannot compute quote");
    }
    const cache = new AptosLocalCache();
    const asks = get_orders_sdk_(this.orderBook, true, cache, this.getMiTags());
    const bids = get_orders_sdk_(
      this.orderBook,
      false,
      cache,
      this.getMiTags()
    );
    if (isXtoY) {
      // selling
      let soldBaseSize = u64(0);
      let remainingBaseSize = u64(
        Math.floor(
          inputUiAmt * Math.pow(10, this.xCoinInfo.decimals.toJsNumber())
        )
      );
      let gotQuoteSize = u64(0);
      for (const bid of bids) {
        if (remainingBaseSize.eq(u64(0))) {
          break;
        }
        const bidBaseSize = bid.base_parcels.mul(this.orderBook.scale_factor);
        const fillBaseSize = remainingBaseSize.gt(bidBaseSize)
          ? bidBaseSize
          : remainingBaseSize;
        if (fillBaseSize.gt(u64(0))) {
          soldBaseSize = soldBaseSize.add(fillBaseSize);
          remainingBaseSize = remainingBaseSize.sub(fillBaseSize);
          gotQuoteSize = gotQuoteSize.add(
            fillBaseSize.div(this.orderBook.scale_factor).mul(bid.price)
          );
        }
      }
      // has partial unfilled
      const actualInputUiAmt =
        soldBaseSize.toJsNumber() /
        Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
      const outputUiAmt =
        gotQuoteSize.toJsNumber() /
        Math.pow(10, this.yCoinInfo.decimals.toJsNumber());
      return {
        inputSymbol: this.xCoinInfo.symbol.str(),
        outputSymbol: this.yCoinInfo.symbol.str(),
        inputUiAmt: actualInputUiAmt,
        outputUiAmt,
        avgPrice: outputUiAmt / actualInputUiAmt,
      };
    } else {
      // buying
      let gotBaseSize = u64(0);
      let soldQuoteSize = u64(0);
      let remainingQuoteSize = u64(
        Math.floor(
          inputUiAmt * Math.pow(10, this.yCoinInfo.decimals.toJsNumber())
        )
      );
      for (const ask of asks) {
        if (remainingQuoteSize.eq(u64(0))) {
          break;
        }
        const askQuoteSize = ask.base_parcels.mul(ask.price);
        const fillQuoteSize = remainingQuoteSize.gt(askQuoteSize)
          ? askQuoteSize
          : remainingQuoteSize;
        if (fillQuoteSize.gt(u64(0))) {
          soldQuoteSize = soldQuoteSize.add(fillQuoteSize);
          remainingQuoteSize = remainingQuoteSize.sub(fillQuoteSize);
          gotBaseSize = gotBaseSize.add(
            fillQuoteSize.div(ask.price).mul(this.orderBook.scale_factor)
          );
        }
      }
      const actualInputUiAmt =
        soldQuoteSize.toJsNumber() /
        Math.pow(10, this.yCoinInfo.decimals.toJsNumber());
      const outputUiAmt =
        gotBaseSize.toJsNumber() /
        Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
      return {
        inputSymbol: this.xCoinInfo.symbol.str(),
        outputSymbol: this.yCoinInfo.symbol.str(),
        inputUiAmt: actualInputUiAmt,
        outputUiAmt,
        avgPrice: outputUiAmt / actualInputUiAmt,
      };
    }
  }

  getTagE(): TypeTag {
    return this.mi.scale_exponent_type.toTypeTag();
  }

  // build payload directly if not routable
  makePayload(
    inputUiAmt: UITokenAmount,
    minOutAmt: UITokenAmount
  ): Types.EntryFunctionPayload {
    // routable, so no need to implement
    throw new Error("Not Implemented");
  }
}

export class EconiaPoolProvider extends TradingPoolProvider {
  constructor(
    app: App,
    fetcher: SimulationKeys,
    netConfig= CONFIGS.devnet,
    public registry: CoinListClient,
  ) {
    super(app, fetcher, netConfig);
  }
  async loadPoolList(): Promise<TradingPool[]> {
    const econiaClient = new EconiaClient(
      this.app.client,
      this.app.parserRepo,
      Registry.moduleAddress
    );
    const markets = await econiaClient.getMarkets();
    const pools: TradingPool[] = [];
    const promises: Promise<void>[] = [];
    markets.forEach(([mi, owner]) => {
      if (
        this.registry.hasTokenType(mi.base_coin_type) &&
        this.registry.hasTokenType(mi.quote_coin_type)
      ) {
        pools.push(
          new EconiaTradingPoolV1(
            this.registry.getCoinInfoByType(mi.base_coin_type),
            this.registry.getCoinInfoByType(mi.quote_coin_type),
            null,
            mi,
            owner,
            this.app.parserRepo
          )
        );
      }
    });
    await Promise.all(promises);
    return pools;
  }
}
