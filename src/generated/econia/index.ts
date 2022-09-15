import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache } from '@manahippo/move-to-ts';
import * as Assets from './assets';
import * as Critbit from './critbit';
import * as Market from './market';
import * as Open_table from './open_table';
import * as Order_id from './order_id';
import * as Registry from './registry';
import * as User from './user';

export * as Assets from './assets';
export * as Critbit from './critbit';
export * as Market from './market';
export * as Open_table from './open_table';
export * as Order_id from './order_id';
export * as Registry from './registry';
export * as User from './user';

export function loadParsers(repo: AptosParserRepo) {
  Assets.loadParsers(repo);
  Critbit.loadParsers(repo);
  Market.loadParsers(repo);
  Open_table.loadParsers(repo);
  Order_id.loadParsers(repo);
  Registry.loadParsers(repo);
  User.loadParsers(repo);
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
  assets: Assets.App;
  critbit: Critbit.App;
  market: Market.App;
  open_table: Open_table.App;
  order_id: Order_id.App;
  registry: Registry.App;
  user: User.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.assets = new Assets.App(client, repo, cache);
    this.critbit = new Critbit.App(client, repo, cache);
    this.market = new Market.App(client, repo, cache);
    this.open_table = new Open_table.App(client, repo, cache);
    this.order_id = new Order_id.App(client, repo, cache);
    this.registry = new Registry.App(client, repo, cache);
    this.user = new User.App(client, repo, cache);
  }
}
