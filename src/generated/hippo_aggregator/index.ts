
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Aggregatorv0 from './aggregatorv0';

export * as Aggregatorv0 from './aggregatorv0';


export function loadParsers(repo: AptosParserRepo) {
  Aggregatorv0.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
