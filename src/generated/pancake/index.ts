import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Router from './router';
import * as Swap from './swap';
import * as Swap_utils from './swap_utils';

export * as Router from './router';
export * as Swap from './swap';
export * as Swap_utils from './swap_utils';

export function loadParsers(repo: AptosParserRepo) {
  Router.loadParsers(repo);
  Swap.loadParsers(repo);
  Swap_utils.loadParsers(repo);
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
  router: Router.App;
  swap: Swap.App;
  swap_utils: Swap_utils.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.router = new Router.App(client, repo, cache);
    this.swap = new Swap.App(client, repo, cache);
    this.swap_utils = new Swap_utils.App(client, repo, cache);
  }
}
