import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Ditto_staking from './ditto_staking';
import * as Staked_coin from './staked_coin';

export * as Ditto_staking from './ditto_staking';
export * as Staked_coin from './staked_coin';

export function loadParsers(repo: AptosParserRepo) {
  Ditto_staking.loadParsers(repo);
  Staked_coin.loadParsers(repo);
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
  ditto_staking: Ditto_staking.App;
  staked_coin: Staked_coin.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.ditto_staking = new Ditto_staking.App(client, repo, cache);
    this.staked_coin = new Staked_coin.App(client, repo, cache);
  }
}
