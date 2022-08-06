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
import * as Math from "./math";
import * as Mock_coin from "./mock_coin";
import * as Mock_deploy from "./mock_deploy";
import * as Piece_swap from "./piece_swap";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "piece_swap_script";

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
  Piece_swap.add_liquidity_(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]]);
  return;
}


export function buildPayload_add_liquidity_script (
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::add_liquidity_script",
    typeParamStrings,
    [
      $.payloadArg(amount_x),
      $.payloadArg(amount_y),
    ]
  );

}

export function create_new_pool_ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, decimals, decimals__1;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!Coin_registry.Coin_registry.is_registry_initialized_($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [$p[0]])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [$p[1]])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[1], $p[0]])])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  decimals = Math.max_(u128(Aptos_framework.Coin.decimals_($c, [$p[0]])), u128(Aptos_framework.Coin.decimals_($c, [$p[1]])), $c);
  decimals__1 = u64($.copy(decimals));
  Piece_swap.create_new_pool_(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]]);
  Coin_registry.Coin_registry.add_token_(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8($.copy(decimals__1)), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])]);
  return;
}

export function create_new_pool_script_ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  return create_new_pool_(admin, $.copy(lp_name), $.copy(lp_symbol), [], [], [], $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]]);
}


export function buildPayload_create_new_pool_script (
  lp_name: U8[],
  lp_symbol: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::create_new_pool_script",
    typeParamStrings,
    [
      $.u8ArrayArg(lp_name),
      $.u8ArrayArg(lp_symbol),
      $.payloadArg(k),
      $.payloadArg(w1_numerator),
      $.payloadArg(w1_denominator),
      $.payloadArg(w2_numerator),
      $.payloadArg(w2_denominator),
      $.payloadArg(swap_fee_per_million),
      $.payloadArg(protocol_fee_share_per_thousand),
    ]
  );

}

export function mock_deploy_script_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, billion, initial_amount;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!Coin_registry.Coin_registry.is_registry_initialized_($.copy(admin_addr), $c)) {
    Coin_registry.Coin_registry.initialize_(admin, $c);
  }
  else{
  }
  Mock_deploy.init_coin_and_create_store_(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  Mock_deploy.init_coin_and_create_store_(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])]);
  Mock_deploy.init_coin_and_create_store_(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])]);
  billion = u128("1000000000");
  create_new_pool_script_(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], ($.copy(billion)).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  create_new_pool_script_(admin, [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], ($.copy(billion)).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  initial_amount = (u64("1000000")).mul(u64("100000000"));
  Mock_coin.faucet_mint_to_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])]);
  Mock_coin.faucet_mint_to_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  add_liquidity_script_(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  Mock_coin.faucet_mint_to_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])]);
  Mock_coin.faucet_mint_to_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  add_liquidity_script_(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  return;
}


export function buildPayload_mock_deploy_script (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::mock_deploy_script",
    typeParamStrings,
    []
  );

}

export function remove_liquidity_script_ (
  sender: HexString,
  liquidity: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  Piece_swap.remove_liquidity_(sender, $.copy(liquidity), $c, [$p[0], $p[1]]);
  return;
}


export function buildPayload_remove_liquidity_script (
  liquidity: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::remove_liquidity_script",
    typeParamStrings,
    [
      $.payloadArg(liquidity),
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
    y_out = Piece_swap.swap_x_to_y_(sender, $.copy(x_in), $c, [$p[0], $p[1]]);
    if (!($.copy(y_out)).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if (($.copy(y_in)).gt(u64("0"))) {
      x_out = Piece_swap.swap_y_to_x_(sender, $.copy(y_in), $c, [$p[0], $p[1]]);
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
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap_script::swap_script",
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

