import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as AnimeSwapPoolV1 from './AnimeSwapPoolV1';
import * as AnimeSwapPoolV1Library from './AnimeSwapPoolV1Library';

export * as AnimeSwapPoolV1 from './AnimeSwapPoolV1';
export * as AnimeSwapPoolV1Library from './AnimeSwapPoolV1Library';

export function loadParsers(repo: AptosParserRepo) {
  AnimeSwapPoolV1.loadParsers(repo);
  AnimeSwapPoolV1Library.loadParsers(repo);
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
  AnimeSwapPoolV1: AnimeSwapPoolV1.App;
  AnimeSwapPoolV1Library: AnimeSwapPoolV1Library.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.AnimeSwapPoolV1 = new AnimeSwapPoolV1.App(client, repo, cache);
    this.AnimeSwapPoolV1Library = new AnimeSwapPoolV1Library.App(client, repo, cache);
  }
}
