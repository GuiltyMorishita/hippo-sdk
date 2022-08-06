
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Coin_registry from './coin_registry';

export * as Coin_registry from './coin_registry';


export function loadParsers(repo: AptosParserRepo) {
  Coin_registry.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
