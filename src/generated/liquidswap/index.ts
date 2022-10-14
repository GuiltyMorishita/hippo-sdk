
import { AptosClient } from "aptos";
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from "@manahippo/move-to-ts";
import * as Curves from './curves';
import * as Router from './router';
import * as Scripts from './scripts';

export * as Curves from './curves';
export * as Router from './router';
export * as Scripts from './scripts';


export function loadParsers(repo: AptosParserRepo) {
  Curves.loadParsers(repo);
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
  client: AptosClient,
  repo: AptosParserRepo,
  cache: AptosLocalCache,
};

export class App {
  curves : Curves.App
  router : Router.App
  scripts : Scripts.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
    this.curves = new Curves.App(client, repo, cache);
    this.router = new Router.App(client, repo, cache);
    this.scripts = new Scripts.App(client, repo, cache);
  }
}
