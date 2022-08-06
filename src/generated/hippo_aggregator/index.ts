
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Aggregatorv3 from './aggregatorv3';

export * as Aggregatorv3 from './aggregatorv3';


export function loadParsers(repo: AptosParserRepo) {
  Aggregatorv3.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
