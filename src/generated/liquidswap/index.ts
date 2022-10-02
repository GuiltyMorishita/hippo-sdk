import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Coin_helper from './coin_helper';
import * as Curves from './curves';
import * as Dao_storage from './dao_storage';
import * as Emergency from './emergency';
import * as Liquidity_pool from './liquidity_pool';
import * as Lp_account from './lp_account';
import * as Math from './math';
import * as Router from './router';
import * as Scripts from './scripts';
import * as Stable_curve from './stable_curve';

export * as Coin_helper from './coin_helper';
export * as Curves from './curves';
export * as Dao_storage from './dao_storage';
export * as Emergency from './emergency';
export * as Liquidity_pool from './liquidity_pool';
export * as Lp_account from './lp_account';
export * as Math from './math';
export * as Router from './router';
export * as Scripts from './scripts';
export * as Stable_curve from './stable_curve';

export function loadParsers(repo: AptosParserRepo) {
  Coin_helper.loadParsers(repo);
  Curves.loadParsers(repo);
  Dao_storage.loadParsers(repo);
  Emergency.loadParsers(repo);
  Liquidity_pool.loadParsers(repo);
  Lp_account.loadParsers(repo);
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
  dao_storage: Dao_storage.App;
  emergency: Emergency.App;
  liquidity_pool: Liquidity_pool.App;
  lp_account: Lp_account.App;
  math: Math.App;
  router: Router.App;
  scripts: Scripts.App;
  stable_curve: Stable_curve.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.coin_helper = new Coin_helper.App(client, repo, cache);
    this.curves = new Curves.App(client, repo, cache);
    this.dao_storage = new Dao_storage.App(client, repo, cache);
    this.emergency = new Emergency.App(client, repo, cache);
    this.liquidity_pool = new Liquidity_pool.App(client, repo, cache);
    this.lp_account = new Lp_account.App(client, repo, cache);
    this.math = new Math.App(client, repo, cache);
    this.router = new Router.App(client, repo, cache);
    this.scripts = new Scripts.App(client, repo, cache);
    this.stable_curve = new Stable_curve.App(client, repo, cache);
  }
}
