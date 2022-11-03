import { App } from '../generated';
import {
  RouteAndQuote,
  ApiTradeRoute,
  TokenTypeFullname,
  TradeRoute,
  TradeStep,
  TradingPool,
  TradingPoolProvider,
  IUiQuotesResult,
  IUiQuotesResultJSON
} from './types';
import { PontemPoolProvider } from './pontem';
import { CONFIGS } from '../config';
import { AptoswapPoolProvider } from './aptoswap';
import { AuxMarketProvider, AuxPoolProvider } from './aux';
import { AnimePoolProvider } from './animeswap';
import { CoinListClient, NetworkType, RawCoinInfo } from '@manahippo/coin-list';
import { AptosClient } from 'aptos';
import { CetusPoolProvider } from './cetus';
import { whip } from '../utils';
import PromiseThrottle, { PromiseCreator } from 'promise-throttle';
import { PancakePoolProvider } from './pancake';

export class TradeAggregator {
  public allPools: TradingPool[];
  public xToAnyPools: Map<TokenTypeFullname, TradingPool[]>;
  public coinListClient: CoinListClient;
  public poolProviders: TradingPoolProvider[];
  public app: App;
  public cachedRoutes: [string, TradeRoute[]][];
  public promiseThrottle: PromiseThrottle;

  constructor(
    public client: AptosClient,
    netConfig = CONFIGS.mainnet,
    coinListClient?: CoinListClient,
    poolReloadRequestsRateOfSecond = Infinity,
    poolProviders?: TradingPoolProvider[],
    public printError = false,
    buildDefaultPoolList = true
  ) {
    this.app = new App(client);
    this.allPools = [];
    this.xToAnyPools = new Map();
    this.coinListClient = coinListClient ? coinListClient : new CoinListClient(netConfig.name as NetworkType);
    this.poolProviders = poolProviders
      ? poolProviders
      : [
          new PontemPoolProvider(this.app, netConfig, this.coinListClient),
          new AptoswapPoolProvider(this.app, netConfig, this.coinListClient),
          new AuxPoolProvider(this.app, netConfig, this.coinListClient),
          new AuxMarketProvider(this.app, netConfig, this.coinListClient),
          new AnimePoolProvider(this.app, netConfig, this.coinListClient),
          new CetusPoolProvider(this.app, netConfig, this.coinListClient),
          new PancakePoolProvider(this.app, netConfig, this.coinListClient)
        ];
    this.cachedRoutes = [];
    if (buildDefaultPoolList) {
      this.buildDefaultPoolList();
    }
    this.promiseThrottle = new PromiseThrottle({
      requestsPerSecond: poolReloadRequestsRateOfSecond
    });
  }

  static async create(
    client: AptosClient,
    netConfig = CONFIGS.mainnet,
    coinListClient?: CoinListClient,
    poolReloadRequestsRateOfSecond: number = Infinity,
    poolProviders?: TradingPoolProvider[],
    printError = false
  ) {
    const agg = new TradeAggregator(
      client,
      netConfig,
      coinListClient,
      poolReloadRequestsRateOfSecond,
      poolProviders,
      printError,
      false
    );
    await agg.updatePoolLists();
    return agg;
  }

  buildDefaultPoolList() {
    this.allPools = [];
    for (const provider of this.poolProviders) {
      this.allPools = this.allPools.concat(provider.getDefaultPoolList());
    }
    this.buildCache();
  }

  private buildCache() {
    this.xToAnyPools = new Map();
    for (const pool of this.allPools) {
      const xType = pool.xCoinInfo.token_type.type;
      if (!this.xToAnyPools.has(xType)) {
        this.xToAnyPools.set(xType, [pool]);
      } else {
        const xToAny = this.xToAnyPools.get(xType);
        if (!xToAny) {
          throw new Error('Unreachable');
        }
        xToAny.push(pool);
      }
    }
  }

  async updatePoolLists() {
    await this.coinListClient.update(this.app.client);
    const promises = [];
    for (const provider of this.poolProviders) {
      promises.push(provider.loadPoolList());
    }
    const allResult = await Promise.all(promises);
    this.allPools = allResult.flat();
    this.buildCache();
  }

  getTradableCoinInfo(): RawCoinInfo[] {
    const set = new Set<RawCoinInfo>();
    for (const pool of this.allPools) {
      set.add(pool.xCoinInfo);
      set.add(pool.yCoinInfo);
    }
    return Array.from(set.values());
  }

  getXtoYDirectSteps(x: RawCoinInfo, y: RawCoinInfo, requireRoutable = true): TradeStep[] {
    const xFullname = x.token_type.type;
    const yFullname = y.token_type.type;
    if (xFullname === yFullname) {
      throw new Error(`Cannot swap ${x.symbol} to ${y.symbol}. They are the same coin.`);
    }
    const steps: TradeStep[] = [];
    const xToYCandidates = this.xToAnyPools.get(xFullname);
    const yToXCandidates = this.xToAnyPools.get(yFullname);
    if (xToYCandidates) {
      for (const pool of xToYCandidates) {
        if (requireRoutable && !pool.isRoutable) {
          continue;
        }
        if (pool.yCoinInfo.token_type.type === yFullname) {
          steps.push(new TradeStep(pool, true));
        }
      }
    }
    if (yToXCandidates) {
      for (const pool of yToXCandidates) {
        if (pool.yCoinInfo.token_type.type === xFullname) {
          if (requireRoutable && !pool.isRoutable) {
            continue;
          }
          steps.push(new TradeStep(pool, false));
        }
      }
    }
    return steps;
  }

  getOneStepRoutes(x: RawCoinInfo, y: RawCoinInfo): TradeRoute[] {
    const xFullname = x.token_type.type;
    if (xFullname === y.token_type.type) {
      throw new Error(`Cannot swap ${x.symbol} to ${y.symbol}. They are the same coin.`);
    }
    const steps = this.getXtoYDirectSteps(x, y, false);
    return steps.map((step) => new TradeRoute([step]));
  }

  getTwoStepRoutes(x: RawCoinInfo, y: RawCoinInfo): TradeRoute[] {
    const xFullname = x.token_type.type;
    const yFullname = y.token_type.type;
    const results: TradeRoute[] = [];
    for (const k of this.coinListClient.getCoinInfoList()) {
      const kFullname = k.token_type.type;
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

  getThreeStepRoutes(x: RawCoinInfo, y: RawCoinInfo): TradeRoute[] {
    const xFullname = x.token_type.type;
    const yFullname = y.token_type.type;
    const results: TradeRoute[] = [];

    for (const k of this.coinListClient.getCoinInfoList()) {
      const kFullname = k.token_type.type;
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

  getAllRoutes(x: RawCoinInfo, y: RawCoinInfo, maxSteps: 1 | 2 | 3 = 3, allowRoundTrip = false): TradeRoute[] {
    // max 3 steps
    const key = `${x.symbol}<->${y.symbol}(${maxSteps})`;
    for (const keyAndRoutes of this.cachedRoutes) {
      const [cachedKey, cachedRoutes] = keyAndRoutes;
      if (key === cachedKey) {
        return cachedRoutes;
      }
    }
    const step1Routes = maxSteps >= 1 ? this.getOneStepRoutes(x, y) : [];
    const step2Routes = maxSteps >= 2 ? this.getTwoStepRoutes(x, y) : [];
    const step3Routes = maxSteps >= 3 ? this.getThreeStepRoutes(x, y) : [];
    const allRoutes = step1Routes.concat(step2Routes).concat(step3Routes);

    const filteredRoutes = allowRoundTrip ? allRoutes : allRoutes.filter((r) => !r.hasRoundTrip());

    this.cachedRoutes.push([key, filteredRoutes]);
    // if cache list longer than 10, pop from first
    while (this.cachedRoutes.length > 10) {
      this.cachedRoutes.shift();
    }

    return filteredRoutes;
  }

  async reloadPools(
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false,
    customReloadMinInterval: number | undefined = undefined
  ) {
    const routes = this.getAllRoutes(x, y, maxSteps, allowRoundTrip);
    const poolSet = new Set(routes.flatMap((r) => r.steps).map((s) => s.pool));
    const promises: PromiseCreator<void>[] = [];
    for (const pool of poolSet) {
      if (!pool.isStateLoaded() || reloadState) {
        try {
          promises.push(() => pool.reloadState(this.app, customReloadMinInterval));
        } catch (e) {
          if (this.printError) {
            console.log('Load state err: ', e);
          }
        }
      }
    }
    console.log(`Reloading ${promises.length} pools`);
    await this.promiseThrottle.addAll<void>(promises);
    return routes;
  }

  async getQuotes(
    inputUiAmt: number,
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false,
    customReloadMinInterval: number | undefined = undefined
  ): Promise<RouteAndQuote[]> {
    const routes = await this.reloadPools(x, y, maxSteps, reloadState, allowRoundTrip, customReloadMinInterval);
    const result: RouteAndQuote[] = [];
    for (const route of routes) {
      try {
        const quote = route.getQuote(inputUiAmt);
        if (quote.outputUiAmt > 0) result.push({ route, quote });
      } catch (e) {
        if (this.printError) {
          console.log('Get quote err: ', e);
        }
      }
    }
    result.sort((a, b) => b.quote.outputUiAmt - a.quote.outputUiAmt);
    return result;
  }

  async getQuotesUni(
    inputUiAmt: number,
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false,
    customReloadMinInterval: number | undefined = undefined,
    isViaAPI = false
  ): Promise<IUiQuotesResult> {
    if (!isViaAPI) {
      const routeAndQuotes = await this.getQuotes(
        inputUiAmt,
        x,
        y,
        maxSteps,
        reloadState,
        allowRoundTrip,
        customReloadMinInterval
      );
      const routeSnippetAndQuotes = routeAndQuotes.map((r) => ({
        ...r,
        route: r.route.toApiTradeRoute()
      }));
      return {
        allRoutesCount: routeSnippetAndQuotes.length,
        routes: routeSnippetAndQuotes
      };
    } else {
      const result = await this.requestQuotesViaAPI(inputUiAmt, x, y, maxSteps, reloadState, allowRoundTrip);
      return result;
    }
  }

  async requestQuotesViaAPI(
    inputUiAmt: number,
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false
  ): Promise<IUiQuotesResult> {
    return whip
      .url(`/v1/quotes`)
      .query({
        fromToken: x.token_type.type,
        toToken: y.token_type.type,
        fromUiAmt: inputUiAmt,
        maxSteps,
        reloadState,
        allowRoundTrip
      })
      .get()
      .json((json: IUiQuotesResultJSON) => {
        return {
          allRoutesCount: json.allRoutesCount,
          routes: json.routes.map((r) => ({
            quote: r.quote,
            route: ApiTradeRoute.fromJSON(r.route, this.coinListClient)
          }))
        };
      })
      .catch((error) => {
        console.log(`Request quotes from ${x.symbol} to ${y.symbol} failed`, error);
        throw error;
      });
  }

  async getBestQuote(
    inputUiAmt: number,
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false
  ) {
    const quotes = await this.getQuotes(inputUiAmt, x, y, maxSteps, reloadState, allowRoundTrip);
    if (quotes.length === 0) {
      return null;
    }
    return quotes[0];
  }
}
