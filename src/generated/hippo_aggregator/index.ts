
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache } from "@manahippo/move-to-ts";
import * as Aggregatorv6 from './aggregatorv6';
import * as Devnetv6 from './devnetv6';

export * as Aggregatorv6 from './aggregatorv6';
export * as Devnetv6 from './devnetv6';


export function loadParsers(repo: AptosParserRepo) {
  Aggregatorv6.loadParsers(repo);
  Devnetv6.loadParsers(repo);
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
  aggregatorv6 : Aggregatorv6.App
  devnetv6 : Devnetv6.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.aggregatorv6 = new Aggregatorv6.App(client, repo, cache);
    this.devnetv6 = new Devnetv6.App(client, repo, cache);
  }
}
