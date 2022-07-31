
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Econia from './Econia';
import * as aptos_framework from './aptos_framework';
import * as aptos_std from './aptos_std';
import * as coin_registry from './coin_registry';
import * as hippo_aggregator from './hippo_aggregator';
import * as hippo_swap from './hippo_swap';
import * as std from './std';

export * as Econia from './Econia';
export * as aptos_framework from './aptos_framework';
export * as aptos_std from './aptos_std';
export * as coin_registry from './coin_registry';
export * as hippo_aggregator from './hippo_aggregator';
export * as hippo_swap from './hippo_swap';
export * as std from './std';


export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  Econia.loadParsers(repo);
  aptos_framework.loadParsers(repo);
  aptos_std.loadParsers(repo);
  coin_registry.loadParsers(repo);
  hippo_aggregator.loadParsers(repo);
  hippo_swap.loadParsers(repo);
  std.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
