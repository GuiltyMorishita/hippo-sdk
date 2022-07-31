
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as aggregatorv3$_ from './aggregatorv3';

export * as aggregatorv3$_ from './aggregatorv3';


export function loadParsers(repo: AptosParserRepo) {
  aggregatorv3$_.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
