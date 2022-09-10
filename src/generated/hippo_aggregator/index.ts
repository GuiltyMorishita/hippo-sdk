
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as Aggregator from './aggregator';
import * as Devnet from './devnet';

export * as Aggregator from './aggregator';
export * as Devnet from './devnet';


export function loadParsers(repo: AptosParserRepo) {
  Aggregator.loadParsers(repo);
  Devnet.loadParsers(repo);
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
  aggregator : Aggregator.App
  devnet : Devnet.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.aggregator = new Aggregator.App(client, repo, cache);
    this.devnet = new Devnet.App(client, repo, cache);
  }
}
