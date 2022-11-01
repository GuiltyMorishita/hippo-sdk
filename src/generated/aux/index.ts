import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Amm from './amm';
import * as Clob_market from './clob_market';
import * as Uint256 from './uint256';

export * as Amm from './amm';
export * as Clob_market from './clob_market';
export * as Uint256 from './uint256';

export function loadParsers(repo: AptosParserRepo) {
  Amm.loadParsers(repo);
  Clob_market.loadParsers(repo);
  Uint256.loadParsers(repo);
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
  amm: Amm.App;
  clob_market: Clob_market.App;
  uint256: Uint256.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.amm = new Amm.App(client, repo, cache);
    this.clob_market = new Clob_market.App(client, repo, cache);
    this.uint256 = new Uint256.App(client, repo, cache);
  }
}
