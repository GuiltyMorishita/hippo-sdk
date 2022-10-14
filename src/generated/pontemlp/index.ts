
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from "@manahippo/move-to-ts";
import * as Lp_coin from './lp_coin';

export * as Lp_coin from './lp_coin';


export function loadParsers(repo: AptosParserRepo) {
  Lp_coin.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export type AppType = {
  client: AptosClient,
  repo: AptosParserRepo,
  cache: AptosLocalCache,
};

export class App {
  lp_coin : Lp_coin.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.lp_coin = new Lp_coin.App(client, repo, cache);
  }
}
