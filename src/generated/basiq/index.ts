import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Dex from './dex';

export * as Dex from './dex';

export function loadParsers(repo: AptosParserRepo) {
  Dex.loadParsers(repo);
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
  dex: Dex.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.dex = new Dex.App(client, repo, cache);
  }
}
