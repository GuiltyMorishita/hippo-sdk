import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Coin_registry from "../coin_registry";
import * as Std from "../std";
import * as Cp_swap from "./cp_swap";
import * as Math from "./math";
import * as Mock_coin from "./mock_coin";
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

export function add_liquidity_script_ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  Cp_swap.add_liquidity_(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]]);
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

export function create_new_pool_ (
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
  admin_addr = Std.Signer.address_of_(sender, $c);
  if (!Coin_registry.Coin_registry.is_registry_initialized_($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [$p[0]])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [$p[1]])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[1], $p[0]])])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  decimals = Math.max_(u128(Aptos_framework.Coin.decimals_($c, [$p[0]])), u128(Aptos_framework.Coin.decimals_($c, [$p[1]])), $c);
  decimals__1 = u64($.copy(decimals));
  Cp_swap.create_token_pair_(sender, $.copy(fee_to), fee_on, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $c, [$p[0], $p[1]]);
  Coin_registry.Coin_registry.add_token_(sender, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8($.copy(decimals__1)), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])]);
  return;
}

export function create_new_pool_script_ (
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
  create_new_pool_(sender, $.copy(fee_to), fee_on, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [$p[0], $p[1]]);
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

export function init_coin_and_create_store_ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  Mock_coin.initialize_(admin, u64("8"), $c, [$p[0]]);
  Coin_registry.Coin_registry.add_token_(admin, $.copy(name), $.copy(symbol), $.copy(name), $.copy(decimals), [], [], $c, [$p[0]]);
  return;
}

export function mock_create_pair_and_add_liquidity_ (
  admin: HexString,
  symbol: U8[],
  left_amt: U64,
  right_amt: U64,
  lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let some_lp, some_x, some_y, unused_x, unused_y;
  create_new_pool_(admin, Std.Signer.address_of_(admin, $c), false, $.copy(symbol), $.copy(symbol), $.copy(symbol), [], [], $c, [$p[0], $p[1]]);
  some_x = Mock_coin.mint_($.copy(left_amt), $c, [$p[0]]);
  some_y = Mock_coin.mint_($.copy(right_amt), $c, [$p[1]]);
  [unused_x, unused_y, some_lp] = Cp_swap.add_liquidity_direct_(some_x, some_y, $c, [$p[0], $p[1]]);
  if (!(Aptos_framework.Coin.value_(unused_x, $c, [$p[0]])).eq((u64("0")))) {
    throw $.abortCode(u64("5"));
  }
  if (!(Aptos_framework.Coin.value_(unused_y, $c, [$p[1]])).eq((u64("0")))) {
    throw $.abortCode(u64("5"));
  }
  if (!(Aptos_framework.Coin.value_(some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])])).eq(($.copy(lp_amt)))) {
    throw $.abortCode(u64("5"));
  }
  Mock_coin.burn_(unused_x, $c, [$p[0]]);
  Mock_coin.burn_(unused_y, $c, [$p[1]]);
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(admin, $c), some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [$p[0], $p[1]])]);
  return;
}

export function mock_deploy_script_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, btc_amt;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!Coin_registry.Coin_registry.is_registry_initialized_($.copy(admin_addr), $c)) {
    Coin_registry.Coin_registry.initialize_(admin, $c);
  }
  else{
  }
  init_coin_and_create_store_(admin, [u8("66"), u8("105"), u8("116"), u8("99"), u8("111"), u8("105"), u8("110")], [u8("66"), u8("84"), u8("67")], u8("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WBTC", [])]);
  init_coin_and_create_store_(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u8("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  init_coin_and_create_store_(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u8("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])]);
  btc_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity_(admin, [u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("76"), u8("80")], $.copy(btc_amt), ($.copy(btc_amt)).mul(u64("10000")), (($.copy(btc_amt)).mul(u64("100"))).sub(u64("1000")), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WBTC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  mock_create_pair_and_add_liquidity_(admin, [u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("76"), u8("80")], $.copy(btc_amt), ($.copy(btc_amt)).mul(u64("10000")), (($.copy(btc_amt)).mul(u64("100"))).sub(u64("1000")), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WBTC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])]);
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
export function remove_liquidity_script_ (
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  Cp_swap.remove_liquidity_(sender, $.copy(liquidity), $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]]);
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

export function swap_script_ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, x_out, y_out;
  if (($.copy(x_in)).gt(u64("0"))) {
    temp$1 = ($.copy(y_in)).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!!temp$1) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if (($.copy(x_min_out)).gt(u64("0"))) {
    temp$2 = ($.copy(y_min_out)).gt(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  if (($.copy(x_in)).gt(u64("0"))) {
    y_out = Cp_swap.swap_x_to_exact_y_(sender, $.copy(x_in), Std.Signer.address_of_(sender, $c), $c, [$p[0], $p[1]]);
    if (!($.copy(y_out)).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if (($.copy(y_in)).gt(u64("0"))) {
      x_out = Cp_swap.swap_y_to_exact_x_(sender, $.copy(y_in), Std.Signer.address_of_(sender, $c), $c, [$p[0], $p[1]]);
      if (!($.copy(x_out)).ge($.copy(x_min_out))) {
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

