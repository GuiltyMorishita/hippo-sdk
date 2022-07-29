import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as aptos_framework$_ from "../aptos_framework";
import * as coin_registry$_ from "../coin_registry";
import * as std$_ from "../std";
import * as math$_ from "./math";
import * as mock_coin$_ from "./mock_coin";
import * as mock_deploy$_ from "./mock_deploy";
import * as stable_curve_swap$_ from "./stable_curve_swap";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "stable_curve_scripts";

export const E_LP_TOKEN_ALREADY_REGISTERED : U64 = u64("7");
export const E_OUTPUT_LESS_THAN_MIN : U64 = u64("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED : U64 = u64("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED : U64 = u64("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED : U64 = u64("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED : U64 = u64("4");
export const E_TOKEN_X_NOT_REGISTERED : U64 = u64("5");
export const E_TOKEN_Y_NOT_REGISTERED : U64 = u64("6");
export const MICRO_CONVERSION_FACTOR : U64 = u64("1000000");

export function add_liquidity$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  stable_curve_swap$_.add_liquidity$(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_add_liquidity (
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_scripts::add_liquidity",
    typeParamStrings,
    [
      $.payloadArg(amount_x),
      $.payloadArg(amount_y),
    ]
  );

}

export function create_new_pool$ (
  sender: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  fee: U64,
  admin_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, block_timestamp, decimals, decimals__1, future_time;
  admin_addr = std$_.signer$_.address_of$(sender, $c);
  if (!coin_registry$_.coin_registry$_.is_registry_initialized$($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!coin_registry$_.coin_registry$_.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[1], $p[0]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  block_timestamp = aptos_framework$_.timestamp$_.now_microseconds$($c);
  future_time = $.copy(block_timestamp).add(u64("24").mul(u64("3600")).mul(MICRO_CONVERSION_FACTOR));
  decimals = math$_.max$(u128(aptos_framework$_.coin$_.decimals$($c, [$p[0]] as TypeTag[])), u128(aptos_framework$_.coin$_.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  stable_curve_swap$_.initialize$(sender, std$_.string$_.utf8$($.copy(lp_name), $c), std$_.string$_.utf8$($.copy(lp_symbol), $c), $.copy(decimals__1), u64("60"), u64("80"), $.copy(block_timestamp), $.copy(future_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  coin_registry$_.coin_registry$_.add_token$(sender, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8("8"), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function mock_create_pair_and_add_liquidity$ (
  admin: HexString,
  symbol: U8[],
  fee: U64,
  admin_fee: U64,
  left_amt: U64,
  right_amt: U64,
  lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let decimals, decimals__1, future_A, future_A_time, initial_A, initial_A_time, name, some_lp, some_x, some_y, unused_x, unused_y;
  name = std$_.string$_.utf8$($.copy(symbol), $c);
  [initial_A, future_A] = [u64("60"), u64("100")];
  initial_A_time = aptos_framework$_.timestamp$_.now_microseconds$($c);
  future_A_time = $.copy(initial_A_time).add(u64("24").mul(u64("3600")).mul(MICRO_CONVERSION_FACTOR));
  decimals = math$_.max$(u128(aptos_framework$_.coin$_.decimals$($c, [$p[0]] as TypeTag[])), u128(aptos_framework$_.coin$_.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  stable_curve_swap$_.initialize$(admin, $.copy(name), $.copy(name), $.copy(decimals__1), $.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  coin_registry$_.coin_registry$_.add_token$(admin, $.copy(symbol), $.copy(symbol), $.copy(symbol), u8($.copy(decimals__1)), [], [], $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  some_x = mock_coin$_.mint$($.copy(left_amt), $c, [$p[0]] as TypeTag[]);
  some_y = mock_coin$_.mint$($.copy(right_amt), $c, [$p[1]] as TypeTag[]);
  [unused_x, unused_y, some_lp] = stable_curve_swap$_.add_liquidity_direct$(some_x, some_y, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!aptos_framework$_.coin$_.value$(some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]).eq($.copy(lp_amt))) {
    throw $.abortCode(u64("5"));
  }
  mock_coin$_.burn$(unused_x, $c, [$p[0]] as TypeTag[]);
  mock_coin$_.burn$(unused_y, $c, [$p[1]] as TypeTag[]);
  aptos_framework$_.coin$_.deposit$(std$_.signer$_.address_of$(admin, $c), some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function mock_deploy$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, admin_fee, coin_amt, fee;
  admin_addr = std$_.signer$_.address_of$(admin, $c);
  if (!coin_registry$_.coin_registry$_.is_registry_initialized$($.copy(admin_addr), $c)) {
    coin_registry$_.coin_registry$_.initialize$(admin, $c);
  }
  else{
  }
  mock_deploy$_.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])] as TypeTag[]);
  mock_deploy$_.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])] as TypeTag[]);
  mock_deploy$_.init_coin_and_create_store$(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])] as TypeTag[]);
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  coin_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("67"), u8("85"), u8("82"), u8("86"), u8("69"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(coin_amt).mul(u64("100")), $.copy(coin_amt).mul(u64("100")), u64("200000000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])] as TypeTag[]);
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("68"), u8("65"), u8("73"), u8("45"), u8("67"), u8("85"), u8("82"), u8("86"), u8("69"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(coin_amt).mul(u64("100")), $.copy(coin_amt).mul(u64("100")), u64("200000000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])] as TypeTag[]);
  return;
}

export function mock_deploy_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  mock_deploy$(admin, $c);
  return;
}


export function buildPayload_mock_deploy_script (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_scripts::mock_deploy_script",
    typeParamStrings,
    []
  );

}

export function remove_liquidity$ (
  sender: HexString,
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  stable_curve_swap$_.remove_liquidity$(sender, $.copy(liquidity), $.copy(min_amount_x), $.copy(min_amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_remove_liquidity (
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_scripts::remove_liquidity",
    typeParamStrings,
    [
      $.payloadArg(liquidity),
      $.payloadArg(min_amount_x),
      $.payloadArg(min_amount_y),
    ]
  );

}

export function swap$ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, temp$3, addr, cond_a, cond_b, cond_c, out_amount, out_amount__4;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  cond_a = temp$1;
  if ($.copy(x_in).eq(u64("0"))) {
    temp$2 = $.copy(y_in).eq(u64("0"));
  }
  else{
    temp$2 = false;
  }
  cond_b = temp$2;
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$3 = $.copy(y_min_out).gt(u64("0"));
  }
  else{
    temp$3 = false;
  }
  cond_c = temp$3;
  if (!!(cond_a || cond_b)) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if (!!cond_c) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  addr = std$_.signer$_.address_of$(sender, $c);
  if ($.copy(x_in).gt(u64("0"))) {
    [, , out_amount] = stable_curve_swap$_.swap_x_to_exact_y$(sender, $.copy(x_in), $.copy(addr), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(out_amount).gt($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    [, out_amount__4, ] = stable_curve_swap$_.swap_y_to_exact_x$(sender, $.copy(y_in), $.copy(addr), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(out_amount__4).gt($.copy(x_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  return;
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
  return swap$(sender, $.copy(x_in), $.copy(y_in), $.copy(x_min_out), $.copy(y_min_out), $c, [$p[0], $p[1]] as TypeTag[]);
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
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_scripts::swap_script",
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

