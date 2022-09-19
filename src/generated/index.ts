import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache } from '@manahippo/move-to-ts';
import * as basiq from './basiq';
import * as coin_list from './coin_list';
import * as econia from './econia';
import * as hippo_aggregator from './hippo_aggregator';
import * as hippo_swap from './hippo_swap';
import * as pontem from './pontem';
import * as stdlib from './stdlib';

export * as basiq from './basiq';
export * as coin_list from './coin_list';
export * as econia from './econia';
export * as hippo_aggregator from './hippo_aggregator';
export * as hippo_swap from './hippo_swap';
export * as pontem from './pontem';
export * as stdlib from './stdlib';

export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  basiq.loadParsers(repo);
  coin_list.loadParsers(repo);
  econia.loadParsers(repo);
  hippo_aggregator.loadParsers(repo);
  hippo_swap.loadParsers(repo);
  pontem.loadParsers(repo);
  stdlib.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  parserRepo: AptosParserRepo;
  cache: AptosLocalCache;
  basiq: basiq.App;
  coin_list: coin_list.App;
  econia: econia.App;
  hippo_aggregator: hippo_aggregator.App;
  hippo_swap: hippo_swap.App;
  pontem: pontem.App;
  stdlib: stdlib.App;
  constructor(public client: AptosClient) {
    this.parserRepo = getProjectRepo();
    this.cache = new AptosLocalCache();
    this.basiq = new basiq.App(client, this.parserRepo, this.cache);
    this.coin_list = new coin_list.App(client, this.parserRepo, this.cache);
    this.econia = new econia.App(client, this.parserRepo, this.cache);
    this.hippo_aggregator = new hippo_aggregator.App(client, this.parserRepo, this.cache);
    this.hippo_swap = new hippo_swap.App(client, this.parserRepo, this.cache);
    this.pontem = new pontem.App(client, this.parserRepo, this.cache);
    this.stdlib = new stdlib.App(client, this.parserRepo, this.cache);
  }
}
