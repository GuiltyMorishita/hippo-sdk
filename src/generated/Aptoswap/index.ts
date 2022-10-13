import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Pool from './pool';

export * as Pool from './pool';

export function loadParsers(repo: AptosParserRepo) {
  Pool.loadParsers(repo);
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
  pool: Pool.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.pool = new Pool.App(client, repo, cache);
  }
}
