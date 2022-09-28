import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Stake_router from './stake_router';
import * as Staked_aptos_coin from './staked_aptos_coin';

export * as Stake_router from './stake_router';
export * as Staked_aptos_coin from './staked_aptos_coin';

export function loadParsers(repo: AptosParserRepo) {
  Stake_router.loadParsers(repo);
  Staked_aptos_coin.loadParsers(repo);
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
  stake_router: Stake_router.App;
  staked_aptos_coin: Staked_aptos_coin.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.stake_router = new Stake_router.App(client, repo, cache);
    this.staked_aptos_coin = new Staked_aptos_coin.App(client, repo, cache);
  }
}
