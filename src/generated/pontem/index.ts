import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache } from '@manahippo/move-to-ts';
import * as Lp from './lp';
import * as Router from './router';
import * as Scripts from './scripts';

export * as Lp from './lp';
export * as Router from './router';
export * as Scripts from './scripts';

export function loadParsers(repo: AptosParserRepo) {
  Lp.loadParsers(repo);
  Router.loadParsers(repo);
  Scripts.loadParsers(repo);
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
  lp: Lp.App;
  router: Router.App;
  scripts: Scripts.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.lp = new Lp.App(client, repo, cache);
    this.router = new Router.App(client, repo, cache);
    this.scripts = new Scripts.App(client, repo, cache);
  }
}
