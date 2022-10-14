import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache, u8, u64, u128 } from '@manahippo/move-to-ts';
import * as Aptoswap from './Aptoswap';
import * as basiq from './basiq';
import * as coin_list from './coin_list';
import * as econia from './econia';
import * as hippo_aggregator from './hippo_aggregator';
import * as hippo_swap from './hippo_swap';
import * as liquidswap from './liquidswap';
import * as pontemlp from './pontemlp';
import * as stdlib from './stdlib';

export * as Aptoswap from './Aptoswap';
export * as basiq from './basiq';
export * as coin_list from './coin_list';
export * as econia from './econia';
export * as hippo_aggregator from './hippo_aggregator';
export * as hippo_swap from './hippo_swap';
export * as liquidswap from './liquidswap';
export * as pontemlp from './pontemlp';
export * as stdlib from './stdlib';

export { u8, u64, u128 };

export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  Aptoswap.loadParsers(repo);
  basiq.loadParsers(repo);
  coin_list.loadParsers(repo);
  econia.loadParsers(repo);
  hippo_aggregator.loadParsers(repo);
  hippo_swap.loadParsers(repo);
  liquidswap.loadParsers(repo);
  pontemlp.loadParsers(repo);
  stdlib.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  parserRepo: AptosParserRepo;
  cache: AptosLocalCache;
  Aptoswap: Aptoswap.App;
  basiq: basiq.App;
  coin_list: coin_list.App;
  econia: econia.App;
  hippo_aggregator: hippo_aggregator.App;
  hippo_swap: hippo_swap.App;
  liquidswap: liquidswap.App;
  pontemlp: pontemlp.App;
  stdlib: stdlib.App;
  constructor(public client: AptosClient) {
    this.parserRepo = getProjectRepo();
    this.cache = new AptosLocalCache();
    this.Aptoswap = new Aptoswap.App(client, this.parserRepo, this.cache);
    this.basiq = new basiq.App(client, this.parserRepo, this.cache);
    this.coin_list = new coin_list.App(client, this.parserRepo, this.cache);
    this.econia = new econia.App(client, this.parserRepo, this.cache);
    this.hippo_aggregator = new hippo_aggregator.App(client, this.parserRepo, this.cache);
    this.hippo_swap = new hippo_swap.App(client, this.parserRepo, this.cache);
    this.liquidswap = new liquidswap.App(client, this.parserRepo, this.cache);
    this.pontemlp = new pontemlp.App(client, this.parserRepo, this.cache);
    this.stdlib = new stdlib.App(client, this.parserRepo, this.cache);
  }
}
