import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as aptos_framework$_ from "../aptos_framework";
import * as std$_ from "../std";
import * as token_registry$_ from "../token_registry";
import * as cp_swap$_ from "./cp_swap";
import * as math$_ from "./math";
import * as mock_coin$_ from "./mock_coin";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "cp_scripts";

export const E_LP_TOKEN_ALREADY_REGISTERED : U64 = u64("7");
export const E_OUTPUT_LESS_THAN_MIN : U64 = u64("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED : U64 = u64("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED : U64 = u64("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED : U64 = u64("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED : U64 = u64("4");
export const E_TOKEN_X_NOT_REGISTERED : U64 = u64("5");
export const E_TOKEN_Y_NOT_REGISTERED : U64 = u64("6");

export function add_liquidity_script$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  cp_swap$_.add_liquidity$(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_add_liquidity_script (
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_scripts::add_liquidity_script",
    typeParamStrings,
    [
      $.payloadArg(amount_x),
      $.payloadArg(amount_y),
    ]
  );

}
export function create_new_pool$ (
  sender: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, decimals, decimals__1;
  admin_addr = std$_.signer$_.address_of$(sender, $c);
  if (!token_registry$_.token_registry$_.is_registry_initialized$($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!token_registry$_.token_registry$_.has_token$($.copy(admin_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!token_registry$_.token_registry$_.has_token$($.copy(admin_addr), $c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!token_registry$_.token_registry$_.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!token_registry$_.token_registry$_.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[1], $p[0]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  decimals = math$_.max$(u128(aptos_framework$_.coin$_.decimals$($c, [$p[0]] as TypeTag[])), u128(aptos_framework$_.coin$_.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  cp_swap$_.create_token_pair$(sender, $.copy(fee_to), fee_on, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $c, [$p[0], $p[1]] as TypeTag[]);
  token_registry$_.token_registry$_.add_token$(sender, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8($.copy(decimals__1)), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function create_new_pool_script$ (
  sender: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  create_new_pool$(sender, $.copy(fee_to), fee_on, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_create_new_pool_script (
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_scripts::create_new_pool_script",
    typeParamStrings,
    [
      $.payloadArg(fee_to),
      $.payloadArg(fee_on),
      $.u8ArrayArg(lp_name),
      $.u8ArrayArg(lp_symbol),
      $.u8ArrayArg(lp_description),
      $.u8ArrayArg(lp_logo_url),
      $.u8ArrayArg(lp_project_url),
    ]
  );

}
export function init_coin_and_create_store$ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  mock_coin$_.initialize$(admin, u64("8"), $c, [$p[0]] as TypeTag[]);
  token_registry$_.token_registry$_.add_token$(admin, $.copy(name), $.copy(symbol), $.copy(name), $.copy(decimals), [], [], $c, [$p[0]] as TypeTag[]);
  return;
}

export function mock_create_pair_and_add_liquidity$ (
  admin: HexString,
  symbol: U8[],
  left_amt: U64,
  right_amt: U64,
  lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let some_lp, some_x, some_y, unused_x, unused_y;
  create_new_pool$(admin, std$_.signer$_.address_of$(admin, $c), false, $.copy(symbol), $.copy(symbol), $.copy(symbol), [], [], $c, [$p[0], $p[1]] as TypeTag[]);
  some_x = mock_coin$_.mint$($.copy(left_amt), $c, [$p[0]] as TypeTag[]);
  some_y = mock_coin$_.mint$($.copy(right_amt), $c, [$p[1]] as TypeTag[]);
  [unused_x, unused_y, some_lp] = cp_swap$_.add_liquidity_direct$(some_x, some_y, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!aptos_framework$_.coin$_.value$(unused_x, $c, [$p[0]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  if (!aptos_framework$_.coin$_.value$(unused_y, $c, [$p[1]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  if (!aptos_framework$_.coin$_.value$(some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]).eq($.copy(lp_amt))) {
    throw $.abortCode(u64("5"));
  }
  mock_coin$_.burn$(unused_x, $c, [$p[0]] as TypeTag[]);
  mock_coin$_.burn$(unused_y, $c, [$p[1]] as TypeTag[]);
  aptos_framework$_.coin$_.deposit$(std$_.signer$_.address_of$(admin, $c), some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function mock_deploy_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, btc_amt;
  admin_addr = std$_.signer$_.address_of$(admin, $c);
  if (!token_registry$_.token_registry$_.is_registry_initialized$($.copy(admin_addr), $c)) {
    token_registry$_.token_registry$_.initialize$(admin, $c);
  }
  else{
  }
  init_coin_and_create_store$(admin, [u8("66"), u8("105"), u8("116"), u8("99"), u8("111"), u8("105"), u8("110")], [u8("66"), u8("84"), u8("67")], u8("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WBTC", [])] as TypeTag[]);
  init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u8("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u8("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])] as TypeTag[]);
  btc_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity$(admin, [u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("76"), u8("80")], $.copy(btc_amt), $.copy(btc_amt).mul(u64("10000")), $.copy(btc_amt).mul(u64("100")).sub(u64("1000")), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WBTC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  mock_create_pair_and_add_liquidity$(admin, [u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("76"), u8("80")], $.copy(btc_amt), $.copy(btc_amt).mul(u64("10000")), $.copy(btc_amt).mul(u64("100")).sub(u64("1000")), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WBTC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])] as TypeTag[]);
  return;
}


export function buildPayload_mock_deploy_script (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_scripts::mock_deploy_script",
    typeParamStrings,
    []
  );

}
export function remove_liquidity_script$ (
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  cp_swap$_.remove_liquidity$(sender, $.copy(liquidity), $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_remove_liquidity_script (
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_scripts::remove_liquidity_script",
    typeParamStrings,
    [
      $.payloadArg(liquidity),
      $.payloadArg(amount_x_min),
      $.payloadArg(amount_y_min),
    ]
  );

}
export function swap_script$ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, x_out, y_out;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!!temp$1) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$2 = $.copy(y_min_out).gt(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  if ($.copy(x_in).gt(u64("0"))) {
    y_out = cp_swap$_.swap_x_to_exact_y$(sender, $.copy(x_in), std$_.signer$_.address_of$(sender, $c), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = cp_swap$_.swap_y_to_exact_x$(sender, $.copy(y_in), std$_.signer$_.address_of$(sender, $c), $c, [$p[0], $p[1]] as TypeTag[]);
      if (!$.copy(x_out).ge($.copy(x_min_out))) {
        throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
      }
    }
    else{
      if (!false) {
        throw $.abortCode(E_SWAP_NONZERO_INPUT_REQUIRED);
      }
    }
  }
  return;
}


export function buildPayload_swap_script (
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_scripts::swap_script",
    typeParamStrings,
    [
      $.payloadArg(x_in),
      $.payloadArg(y_in),
      $.payloadArg(x_min_out),
      $.payloadArg(y_min_out),
    ]
  );

}
export function loadParsers(repo: AptosParserRepo) {
}

