
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Econia from './Econia';
import * as aptos_framework from './aptos_framework';
import * as hippo_swap from './hippo_swap';
import * as std from './std';
import * as token_registry from './token_registry';

export * as Econia from './Econia';
export * as aptos_framework from './aptos_framework';
export * as hippo_swap from './hippo_swap';
export * as std from './std';
export * as token_registry from './token_registry';


export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  Econia.loadParsers(repo);
  aptos_framework.loadParsers(repo);
  hippo_swap.loadParsers(repo);
  std.loadParsers(repo);
  token_registry.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
