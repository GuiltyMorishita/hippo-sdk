import {App, getProjectRepo} from "../generated";

import { NetworkConfiguration } from "../config";
import { CoinListClient } from "../coinList";
import { EconiaPoolProvider } from "./econia";
import { HippoPoolProvider } from "./hippo";
import { RouteAndQuote, TokenTypeFullname, TradeRoute, TradeStep, TradingPool, TradingPoolProvider } from "./types";
import {AptosAccount, AptosClient} from "aptos";
import { PontemPoolProvider } from "./pontem";
import {CoinInfo} from "../generated/coin_list/coin_list";

export class TradeAggregator {
  public allPools: TradingPool[];
  public xToAnyPools: Map<TokenTypeFullname, TradingPool[]>;
  constructor(
    public registryClient: CoinListClient,
    public app: App,
    public readonly poolProviders: TradingPoolProvider[],
  ) {
    this.allPools = [];
    this.xToAnyPools = new Map();
  }

  static async create(app: App, fetcher: AptosAccount) {
    const registryClient =  await CoinListClient.load(app, fetcher);
    const hippoProvider = new HippoPoolProvider();
    const econiaProvider = new EconiaPoolProvider(registryClient);
    const pontemProvider = new PontemPoolProvider(registryClient);
    const aggregator = new TradeAggregator(
      registryClient,
      app,
      [
        hippoProvider, 
        econiaProvider,
        pontemProvider
      ]);
    await aggregator.loadAllPoolLists();
    return aggregator;
  }

  async loadAllPoolLists() {
    const promises = [];
    for (const provider of this.poolProviders) {
      promises.push(provider.loadPoolList(this.app));
    }
    const allResult = await Promise.all(promises);
    this.allPools = allResult.flat();
    this.xToAnyPools = new Map();
    for (const pool of this.allPools) {
      const xFullname = pool.xCoinInfo.token_type.typeFullname();
      if (!this.xToAnyPools.has(xFullname)) {
        this.xToAnyPools.set(xFullname, [pool]);
      }
      else {
        const xToAny = this.xToAnyPools.get(xFullname);
        if (!xToAny) {
          throw new Error("Unreachable");
        }
        xToAny.push(pool);
      }
    }
  }

  getXtoYDirectSteps(x: CoinInfo, y: CoinInfo, requireRoutable=true): TradeStep[] {
    const xFullname = x.token_type.typeFullname();
    const yFullname = y.token_type.typeFullname();
    if (xFullname === yFullname) {
      throw new Error(`Cannot swap ${x.symbol.str()} to ${y.symbol.str()}. They are the same coin.`);
    }
    const steps: TradeStep[] = [];
    const xToYCandidates = this.xToAnyPools.get(xFullname);
    const yToXCandidates = this.xToAnyPools.get(yFullname);
    if (xToYCandidates) {
      for (const pool of xToYCandidates) {
        if (requireRoutable && !pool.isRoutable) {
          continue;
        }
        if (pool.yCoinInfo.token_type.typeFullname() === yFullname) {
          steps.push(new TradeStep(pool, true));
        }
      }
    }
    if (yToXCandidates) {
      for (const pool of yToXCandidates) {
        if (pool.yCoinInfo.token_type.typeFullname() === xFullname) {
          if (requireRoutable && !pool.isRoutable) {
            continue;
          }
          steps.push(new TradeStep(pool, false));
        }
      }
    }
    return steps;
  }

  getOneStepRoutes(x: CoinInfo, y: CoinInfo): TradeRoute[] {
    const xFullname = x.token_type.typeFullname();
    if (xFullname === y.token_type.typeFullname()) {
      throw new Error(`Cannot swap ${x.symbol.str()} to ${y.symbol.str()}. They are the same coin.`);
    }
    const steps = this.getXtoYDirectSteps(x, y, false);
    return steps.map(step => new TradeRoute([step]));
  }

  getTwoStepRoutes(x: CoinInfo, y: CoinInfo): TradeRoute[] {
    const xFullname = x.token_type.typeFullname();
    const yFullname = y.token_type.typeFullname();
    const results: TradeRoute[] = [];
    for (const k of this.registryClient.getCoinInfoList()) {
      const kFullname = k.token_type.typeFullname();
      if (kFullname === xFullname || kFullname === yFullname) {
        continue;
      }
      // X-to-K
      const xToKSteps = this.getXtoYDirectSteps(x, k);
      if (xToKSteps.length === 0) {
        continue;
      }
      // K-to-Y
      const kToYSteps = this.getXtoYDirectSteps(k, y);
      if (kToYSteps.length === 0) {
        continue;
      }
      // cartesian product
      for (const xToK of xToKSteps) {
        for (const kToY of kToYSteps) {
          results.push(new TradeRoute([xToK, kToY]));
        }
      }
    }
    return results;
  }

  getThreeStepRoutes(x: CoinInfo, y: CoinInfo): TradeRoute[] {
    const xFullname = x.token_type.typeFullname();
    const yFullname = y.token_type.typeFullname();
    const results: TradeRoute[] = [];

    for (const k of this.registryClient.getCoinInfoList()) {
      const kFullname = k.token_type.typeFullname();
      if (kFullname === xFullname || kFullname === yFullname) {
        continue;
      }
      // X-to-K
      const xtoKRoutes = this.getTwoStepRoutes(x, k);
      if (xtoKRoutes.length === 0) {
        continue;
      }
      // K-to-Y
      const kToYSteps = this.getXtoYDirectSteps(k, y);
      if (kToYSteps.length === 0) {
        continue;
      }
      // cartesian product
      for (const xToKRoute of xtoKRoutes) {
        for (const kToY of kToYSteps) {
          results.push(new TradeRoute([xToKRoute.steps[0], xToKRoute.steps[1], kToY]));
        }
      }
    }

    return results;
  }

  getAllRoutes(x: CoinInfo, y: CoinInfo, maxSteps: 1 | 2 | 3 = 3, allowRoundTrip=false): TradeRoute[] {
    // max 3 steps
    const step1Routes = maxSteps >= 1 ? this.getOneStepRoutes(x, y) : [];
    const step2Routes = maxSteps >= 2 ? this.getTwoStepRoutes(x, y) : [];
    const step3Routes = maxSteps >= 3 ? this.getThreeStepRoutes(x, y) : [];
    const allRoutes = step1Routes.concat(step2Routes).concat(step3Routes);
    if (allowRoundTrip) {
      return allRoutes;
    }
    else {
      return allRoutes.filter(r => !r.hasRoundTrip());
    }
  }

  async getQuotes(inputUiAmt: number, x: CoinInfo, y: CoinInfo, maxSteps: 1 | 2 | 3 = 3, reloadState=true, allowRoundTrip=false): Promise<RouteAndQuote[]> {
    const routes = this.getAllRoutes(x, y, maxSteps, allowRoundTrip);
    const poolSet = new Set(routes.flatMap(r => r.steps).map(s => s.pool));
    const promises: Promise<void>[] = [];
    for (const pool of poolSet) {
      if(!pool.isStateLoaded || reloadState) {
        promises.push(pool.reloadState(this.app));
      }
    }
    await Promise.all(promises);
    const result =  routes.map(route => {
      return {
        route: route,
        quote: route.getQuote(inputUiAmt)
      }
    });
    result.sort((a, b) => b.quote.outputUiAmt - a.quote.outputUiAmt);
    return result;
  }

  async getBestQuote(inputUiAmt: number, x: CoinInfo, y: CoinInfo, maxSteps: 1 | 2 | 3 = 3, reloadState=true, allowRoundTrip=false) {
    const quotes = await this.getQuotes(inputUiAmt, x, y, maxSteps, reloadState, allowRoundTrip);
    if (quotes.length === 0) {
      return null;
    }
    return quotes[0];
  }
}