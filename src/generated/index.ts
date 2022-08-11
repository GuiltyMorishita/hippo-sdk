
import { AptosClient } from "aptos";
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as aptos_framework from './aptos_framework';
import * as aptos_std from './aptos_std';
import * as coin_registry from './coin_registry';
import * as econia from './econia';
import * as hippo_aggregator from './hippo_aggregator';
import * as hippo_swap from './hippo_swap';
import * as pontem from './pontem';
import * as std from './std';

export * as aptos_framework from './aptos_framework';
export * as aptos_std from './aptos_std';
export * as coin_registry from './coin_registry';
export * as econia from './econia';
export * as hippo_aggregator from './hippo_aggregator';
export * as hippo_swap from './hippo_swap';
export * as pontem from './pontem';
export * as std from './std';


export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  aptos_framework.loadParsers(repo);
  aptos_std.loadParsers(repo);
  coin_registry.loadParsers(repo);
  econia.loadParsers(repo);
  hippo_aggregator.loadParsers(repo);
  hippo_swap.loadParsers(repo);
  pontem.loadParsers(repo);
  std.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  parserRepo: AptosParserRepo;
  aptos_framework : aptos_framework.App
  aptos_std : aptos_std.App
  coin_registry : coin_registry.App
  econia : econia.App
  hippo_aggregator : hippo_aggregator.App
  hippo_swap : hippo_swap.App
  pontem : pontem.App
  std : std.App
  constructor(
    public client: AptosClient,
  ) {
    this.parserRepo = getProjectRepo();
    this.aptos_framework = new aptos_framework.App(client, this.parserRepo);
    this.aptos_std = new aptos_std.App(client, this.parserRepo);
    this.coin_registry = new coin_registry.App(client, this.parserRepo);
    this.econia = new econia.App(client, this.parserRepo);
    this.hippo_aggregator = new hippo_aggregator.App(client, this.parserRepo);
    this.hippo_swap = new hippo_swap.App(client, this.parserRepo);
    this.pontem = new pontem.App(client, this.parserRepo);
    this.std = new std.App(client, this.parserRepo);
  }
}
