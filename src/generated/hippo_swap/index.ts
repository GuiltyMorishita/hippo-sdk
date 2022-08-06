
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Cp_scripts from './cp_scripts';
import * as Cp_swap from './cp_swap';
import * as Cp_swap_utils from './cp_swap_utils';
import * as Hippo_config from './hippo_config';
import * as Math from './math';
import * as Mock_coin from './mock_coin';
import * as Mock_deploy from './mock_deploy';
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
export * as Hippo_config from './hippo_config';
export * as Math from './math';
export * as Mock_coin from './mock_coin';
export * as Mock_deploy from './mock_deploy';
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
  Hippo_config.loadParsers(repo);
  Math.loadParsers(repo);
  Mock_coin.loadParsers(repo);
  Mock_deploy.loadParsers(repo);
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
