
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as cp_scripts$_ from './cp_scripts';
import * as cp_swap$_ from './cp_swap';
import * as cp_swap_utils$_ from './cp_swap_utils';
import * as hippo_config$_ from './hippo_config';
import * as math$_ from './math';
import * as mock_coin$_ from './mock_coin';
import * as mock_deploy$_ from './mock_deploy';
import * as piece_swap$_ from './piece_swap';
import * as piece_swap_math$_ from './piece_swap_math';
import * as piece_swap_script$_ from './piece_swap_script';
import * as router$_ from './router';
import * as safe_math$_ from './safe_math';
import * as stable_curve_numeral$_ from './stable_curve_numeral';
import * as stable_curve_scripts$_ from './stable_curve_scripts';
import * as stable_curve_swap$_ from './stable_curve_swap';
import * as utils$_ from './utils';

export * as cp_scripts$_ from './cp_scripts';
export * as cp_swap$_ from './cp_swap';
export * as cp_swap_utils$_ from './cp_swap_utils';
export * as hippo_config$_ from './hippo_config';
export * as math$_ from './math';
export * as mock_coin$_ from './mock_coin';
export * as mock_deploy$_ from './mock_deploy';
export * as piece_swap$_ from './piece_swap';
export * as piece_swap_math$_ from './piece_swap_math';
export * as piece_swap_script$_ from './piece_swap_script';
export * as router$_ from './router';
export * as safe_math$_ from './safe_math';
export * as stable_curve_numeral$_ from './stable_curve_numeral';
export * as stable_curve_scripts$_ from './stable_curve_scripts';
export * as stable_curve_swap$_ from './stable_curve_swap';
export * as utils$_ from './utils';


export function loadParsers(repo: AptosParserRepo) {
  cp_scripts$_.loadParsers(repo);
  cp_swap$_.loadParsers(repo);
  cp_swap_utils$_.loadParsers(repo);
  hippo_config$_.loadParsers(repo);
  math$_.loadParsers(repo);
  mock_coin$_.loadParsers(repo);
  mock_deploy$_.loadParsers(repo);
  piece_swap$_.loadParsers(repo);
  piece_swap_math$_.loadParsers(repo);
  piece_swap_script$_.loadParsers(repo);
  router$_.loadParsers(repo);
  safe_math$_.loadParsers(repo);
  stable_curve_numeral$_.loadParsers(repo);
  stable_curve_scripts$_.loadParsers(repo);
  stable_curve_swap$_.loadParsers(repo);
  utils$_.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
