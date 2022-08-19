import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Coin_list from "../coin_list";
import * as Std from "../std";
import * as Math from "./math";
import * as Piece_swap from "./piece_swap";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "piece_swap_script";

export const E_LP_TOKEN_ALREADY_IN_COIN_LIST : U64 = u64("8");
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
  if (!Coin_list.Coin_list.is_registry_initialized_($c)) {
    throw $.abortCode($.copy(E_TOKEN_REGISTRY_NOT_INITIALIZED));
  }
  if (!Coin_list.Coin_list.is_coin_registered_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_TOKEN_X_NOT_REGISTERED));
  }
  if (!Coin_list.Coin_list.is_coin_registered_($c, [$p[1]])) {
    throw $.abortCode($.copy(E_TOKEN_Y_NOT_REGISTERED));
  }
  if (!!Coin_list.Coin_list.is_coin_registered_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])])) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_REGISTERED));
  }
  if (!!Coin_list.Coin_list.is_coin_registered_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[1], $p[0]])])) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_REGISTERED));
  }
  if (!!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])])) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_IN_COIN_LIST));
  }
  if (!!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[1], $p[0]])])) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_IN_COIN_LIST));
  }
  decimals = Math.max_(u128(Aptos_framework.Coin.decimals_($c, [$p[0]])), u128(Aptos_framework.Coin.decimals_($c, [$p[1]])), $c);
  decimals__1 = u64($.copy(decimals));
  Piece_swap.create_new_pool_(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]]);
  Coin_list.Coin_list.add_to_registry_by_signer_(admin, Std.String.utf8_($.copy(lp_name), $c), Std.String.utf8_($.copy(lp_symbol), $c), Std.String.utf8_(Std.Vector.empty_($c, [AtomicTypeTag.U8]), $c), Std.String.utf8_($.copy(lp_logo_url), $c), Std.String.utf8_($.copy(lp_project_url), $c), false, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])]);
  if (!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [$p[0]])) {
    Coin_list.Coin_list.add_to_list_(admin, $c, [$p[0]]);
  }
  else{
  }
  if (!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [$p[1]])) {
    Coin_list.Coin_list.add_to_list_(admin, $c, [$p[1]]);
  }
  else{
  }
  Coin_list.Coin_list.add_to_list_(admin, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])]);
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
  return create_new_pool_(admin, $.copy(lp_name), $.copy(lp_symbol), [], [], $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]]);
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
  let billion, initial_amount;
  billion = u128("1000000000");
  create_new_pool_script_(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], ($.copy(billion)).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDT", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  create_new_pool_script_(admin, [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], ($.copy(billion)).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetDAI", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  initial_amount = (u64("1000000")).mul(u64("100000000"));
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDT", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  add_liquidity_script_(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDT", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetDAI", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  add_liquidity_script_(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetDAI", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
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
    throw $.abortCode($.copy(E_SWAP_ONLY_ONE_IN_ALLOWED));
  }
  if (($.copy(x_min_out)).gt(u64("0"))) {
    temp$2 = ($.copy(y_min_out)).gt(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode($.copy(E_SWAP_ONLY_ONE_OUT_ALLOWED));
  }
  if (($.copy(x_in)).gt(u64("0"))) {
    y_out = Piece_swap.swap_x_to_y_(sender, $.copy(x_in), $c, [$p[0], $p[1]]);
    if (!($.copy(y_out)).ge($.copy(y_min_out))) {
      throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MIN));
    }
  }
  else{
    if (($.copy(y_in)).gt(u64("0"))) {
      x_out = Piece_swap.swap_y_to_x_(sender, $.copy(y_in), $c, [$p[0], $p[1]]);
      if (!($.copy(x_out)).ge($.copy(x_min_out))) {
        throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MIN));
      }
    }
    else{
      if (!false) {
        throw $.abortCode($.copy(E_SWAP_NONZERO_INPUT_REQUIRED));
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
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
  payload_add_liquidity_script(
    amount_x: U64,
    amount_y: U64,
    $p: TypeTag[], /* <X, Y>*/
  ) {
    return buildPayload_add_liquidity_script(amount_x, amount_y, $p);
  }
  async add_liquidity_script(
    _account: AptosAccount,
    amount_x: U64,
    amount_y: U64,
    $p: TypeTag[], /* <X, Y>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_add_liquidity_script(amount_x, amount_y, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_create_new_pool_script(
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
    return buildPayload_create_new_pool_script(lp_name, lp_symbol, k, w1_numerator, w1_denominator, w2_numerator, w2_denominator, swap_fee_per_million, protocol_fee_share_per_thousand, $p);
  }
  async create_new_pool_script(
    _account: AptosAccount,
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
    _maxGas = 1000,
  ) {
    const payload = buildPayload_create_new_pool_script(lp_name, lp_symbol, k, w1_numerator, w1_denominator, w2_numerator, w2_denominator, swap_fee_per_million, protocol_fee_share_per_thousand, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_mock_deploy_script(
  ) {
    return buildPayload_mock_deploy_script();
  }
  async mock_deploy_script(
    _account: AptosAccount,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_mock_deploy_script();
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_liquidity_script(
    liquidity: U64,
    $p: TypeTag[], /* <X, Y>*/
  ) {
    return buildPayload_remove_liquidity_script(liquidity, $p);
  }
  async remove_liquidity_script(
    _account: AptosAccount,
    liquidity: U64,
    $p: TypeTag[], /* <X, Y>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_remove_liquidity_script(liquidity, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_swap_script(
    x_in: U64,
    y_in: U64,
    x_min_out: U64,
    y_min_out: U64,
    $p: TypeTag[], /* <X, Y>*/
  ) {
    return buildPayload_swap_script(x_in, y_in, x_min_out, y_min_out, $p);
  }
  async swap_script(
    _account: AptosAccount,
    x_in: U64,
    y_in: U64,
    x_min_out: U64,
    y_min_out: U64,
    $p: TypeTag[], /* <X, Y>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_swap_script(x_in, y_in, x_min_out, y_min_out, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

