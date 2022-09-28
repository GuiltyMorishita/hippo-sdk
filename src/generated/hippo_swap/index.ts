import { AptosClient } from 'aptos';
import { AptosParserRepo, AptosLocalCache, AptosSyncedCache } from '@manahippo/move-to-ts';
import * as Cp_scripts from './cp_scripts';
import * as Cp_swap from './cp_swap';
import * as Cp_swap_utils from './cp_swap_utils';
import * as Devcoin_util from './devcoin_util';
import * as Hippo_config from './hippo_config';
import * as Math from './math';
import * as Piece_swap from './piece_swap';
import * as Piece_swap_math from './piece_swap_math';
import * as Piece_swap_script from './piece_swap_script';
import * as Router from './router';
import * as Safe_math from './safe_math';
import * as Stable_curve_numeral from './stable_curve_numeral';
import * as Stable_curve_scripts from './stable_curve_scripts';
import * as Stable_curve_swap from './stable_curve_swap';
import * as Utils from './utils';

export * as Cp_scripts from './cp_scripts';
export * as Cp_swap from './cp_swap';
export * as Cp_swap_utils from './cp_swap_utils';
export * as Devcoin_util from './devcoin_util';
export * as Hippo_config from './hippo_config';
export * as Math from './math';
export * as Piece_swap from './piece_swap';
export * as Piece_swap_math from './piece_swap_math';
export * as Piece_swap_script from './piece_swap_script';
export * as Router from './router';
export * as Safe_math from './safe_math';
export * as Stable_curve_numeral from './stable_curve_numeral';
export * as Stable_curve_scripts from './stable_curve_scripts';
export * as Stable_curve_swap from './stable_curve_swap';
export * as Utils from './utils';

export function loadParsers(repo: AptosParserRepo) {
  Cp_scripts.loadParsers(repo);
  Cp_swap.loadParsers(repo);
  Cp_swap_utils.loadParsers(repo);
  Devcoin_util.loadParsers(repo);
  Hippo_config.loadParsers(repo);
  Math.loadParsers(repo);
  Piece_swap.loadParsers(repo);
  Piece_swap_math.loadParsers(repo);
  Piece_swap_script.loadParsers(repo);
  Router.loadParsers(repo);
  Safe_math.loadParsers(repo);
  Stable_curve_numeral.loadParsers(repo);
  Stable_curve_scripts.loadParsers(repo);
  Stable_curve_swap.loadParsers(repo);
  Utils.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export type AppType = {
  client: AptosClient;
  repo: AptosParserRepo;
  cache: AptosLocalCache;
};

export class App {
  cp_scripts: Cp_scripts.App;
  cp_swap: Cp_swap.App;
  cp_swap_utils: Cp_swap_utils.App;
  devcoin_util: Devcoin_util.App;
  hippo_config: Hippo_config.App;
  math: Math.App;
  piece_swap: Piece_swap.App;
  piece_swap_math: Piece_swap_math.App;
  piece_swap_script: Piece_swap_script.App;
  router: Router.App;
  safe_math: Safe_math.App;
  stable_curve_numeral: Stable_curve_numeral.App;
  stable_curve_scripts: Stable_curve_scripts.App;
  stable_curve_swap: Stable_curve_swap.App;
  utils: Utils.App;
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {
    this.cp_scripts = new Cp_scripts.App(client, repo, cache);
    this.cp_swap = new Cp_swap.App(client, repo, cache);
    this.cp_swap_utils = new Cp_swap_utils.App(client, repo, cache);
    this.devcoin_util = new Devcoin_util.App(client, repo, cache);
    this.hippo_config = new Hippo_config.App(client, repo, cache);
    this.math = new Math.App(client, repo, cache);
    this.piece_swap = new Piece_swap.App(client, repo, cache);
    this.piece_swap_math = new Piece_swap_math.App(client, repo, cache);
    this.piece_swap_script = new Piece_swap_script.App(client, repo, cache);
    this.router = new Router.App(client, repo, cache);
    this.safe_math = new Safe_math.App(client, repo, cache);
    this.stable_curve_numeral = new Stable_curve_numeral.App(client, repo, cache);
    this.stable_curve_scripts = new Stable_curve_scripts.App(client, repo, cache);
    this.stable_curve_swap = new Stable_curve_swap.App(client, repo, cache);
    this.utils = new Utils.App(client, repo, cache);
  }
}
