import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Coin_helper from './coin_helper';
import * as Curves from './curves';
import * as Liquidity_pool from './liquidity_pool';
import * as Math from './math';
import * as Router from './router';
import * as Scripts from './scripts';
import * as Stable_curve from './stable_curve';

export * as Coin_helper from './coin_helper';
export * as Curves from './curves';
export * as Liquidity_pool from './liquidity_pool';
export * as Math from './math';
export * as Router from './router';
export * as Scripts from './scripts';
export * as Stable_curve from './stable_curve';

export function loadParsers(repo: AptosParserRepo) {
  Coin_helper.loadParsers(repo);
  Curves.loadParsers(repo);
  Liquidity_pool.loadParsers(repo);
  Math.loadParsers(repo);
  Router.loadParsers(repo);
  Scripts.loadParsers(repo);
  Stable_curve.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export type AppType = {
  client: AptosClient;
  repo: AptosParserRepo;
  cache: AptosLocalCache;
};

export class App {
  coin_helper: Coin_helper.App;
  curves: Curves.App;
  liquidity_pool: Liquidity_pool.App;
  math: Math.App;
  router: Router.App;
  scripts: Scripts.App;
  stable_curve: Stable_curve.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.coin_helper = new Coin_helper.App(client, repo, cache);
    this.curves = new Curves.App(client, repo, cache);
    this.liquidity_pool = new Liquidity_pool.App(client, repo, cache);
    this.math = new Math.App(client, repo, cache);
    this.router = new Router.App(client, repo, cache);
    this.scripts = new Scripts.App(client, repo, cache);
    this.stable_curve = new Stable_curve.App(client, repo, cache);
  }
}
