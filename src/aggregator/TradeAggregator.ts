import { App } from '../generated';
import {
  QuoteType,
  RouteAndQuote,
  TokenTypeFullname,
  TradeRoute,
  TradeStep,
  TradingPool,
  TradingPoolProvider
} from './types';
import { PontemPoolProvider } from './pontem';
import { CONFIGS } from '../config';
import { AptoswapPoolProvider } from './aptoswap';
import { AuxPoolProvider } from './aux';
import { AnimePoolProvider } from './animeswap';
import { CoinListClient, NetworkType, RawCoinInfo } from '@manahippo/coin-list';
import { AptosClient } from 'aptos';

export class TradeAggregator {
  public allPools: TradingPool[];
  public xToAnyPools: Map<TokenTypeFullname, TradingPool[]>;
  public coinListClient: CoinListClient;
  public poolProviders: TradingPoolProvider[];
  public app: App;

  constructor(
    public client: AptosClient,
    netConfig = CONFIGS.mainnet,
    coinListClient?: CoinListClient,
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
          new AnimePoolProvider(this.app, netConfig, this.coinListClient)
        ];
    if (buildDefaultPoolList) {
      this.buildDefaultPoolList();
    }
  }

  static async create(
    client: AptosClient,
    netConfig = CONFIGS.mainnet,
    coinListClient?: CoinListClient,
    poolProviders?: TradingPoolProvider[],
    printError = false
  ) {
    const agg = new TradeAggregator(client, netConfig, coinListClient, poolProviders, printError, false);
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
    const step1Routes = maxSteps >= 1 ? this.getOneStepRoutes(x, y) : [];
    const step2Routes = maxSteps >= 2 ? this.getTwoStepRoutes(x, y) : [];
    const step3Routes = maxSteps >= 3 ? this.getThreeStepRoutes(x, y) : [];
    const allRoutes = step1Routes.concat(step2Routes).concat(step3Routes);
    if (allowRoundTrip) {
      return allRoutes;
    } else {
      return allRoutes.filter((r) => !r.hasRoundTrip());
    }
  }

  async reloadPools(
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false
  ) {
    const routes = this.getAllRoutes(x, y, maxSteps, allowRoundTrip);
    const poolSet = new Set(routes.flatMap((r) => r.steps).map((s) => s.pool));
    const promises: Promise<void>[] = [];
    for (const pool of poolSet) {
      if (!pool.isStateLoaded || reloadState) {
        try {
          promises.push(pool.reloadState(this.app));
        } catch (e) {
          if (this.printError) {
            console.log('Load state err: ', e);
          }
        }
      }
    }
    await Promise.all(promises);
    return routes;
  }

  async getQuotes(
    inputUiAmt: number,
    x: RawCoinInfo,
    y: RawCoinInfo,
    maxSteps: 1 | 2 | 3 = 3,
    reloadState = true,
    allowRoundTrip = false
  ): Promise<RouteAndQuote[]> {
    const routes = await this.reloadPools(x, y, maxSteps, reloadState, allowRoundTrip);
    const result: { route: TradeRoute; quote: QuoteType }[] = [];
    for (const route of routes) {
      try {
        const quote = route.getQuote(inputUiAmt);
        result.push({ route, quote });
      } catch (e) {
        if (this.printError) {
          console.log('Get quote err: ', e);
        }
      }
    }
    result.sort((a, b) => b.quote.outputUiAmt - a.quote.outputUiAmt);
    return result;
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
