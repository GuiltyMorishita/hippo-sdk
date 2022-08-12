import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Coin_registry from "../coin_registry";
import * as Std from "../std";
import * as Math from "./math";
import * as Mock_coin from "./mock_coin";
import * as Mock_deploy from "./mock_deploy";
import * as Stable_curve_swap from "./stable_curve_swap";
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

export function add_liquidity_ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  Stable_curve_swap.add_liquidity_(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]]);
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

export function create_new_pool_ (
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
  admin_addr = Std.Signer.address_of_(sender, $c);
  if (!Coin_registry.Coin_registry.is_registry_initialized_($.copy(admin_addr), $c)) {
    throw $.abortCode($.copy(E_TOKEN_REGISTRY_NOT_INITIALIZED));
  }
  if (!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [$p[0]])) {
    throw $.abortCode($.copy(E_TOKEN_X_NOT_REGISTERED));
  }
  if (!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [$p[1]])) {
    throw $.abortCode($.copy(E_TOKEN_Y_NOT_REGISTERED));
  }
  if (!!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])])) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_REGISTERED));
  }
  if (!!Coin_registry.Coin_registry.has_token_($.copy(admin_addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[1], $p[0]])])) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_REGISTERED));
  }
  block_timestamp = Aptos_framework.Timestamp.now_microseconds_($c);
  future_time = ($.copy(block_timestamp)).add(((u64("24")).mul(u64("3600"))).mul($.copy(MICRO_CONVERSION_FACTOR)));
  decimals = Math.max_(u128(Aptos_framework.Coin.decimals_($c, [$p[0]])), u128(Aptos_framework.Coin.decimals_($c, [$p[1]])), $c);
  decimals__1 = u64($.copy(decimals));
  Stable_curve_swap.initialize_(sender, Std.String.utf8_($.copy(lp_name), $c), Std.String.utf8_($.copy(lp_symbol), $c), $.copy(decimals__1), u64("60"), u64("80"), $.copy(block_timestamp), $.copy(future_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]]);
  Coin_registry.Coin_registry.add_token_(sender, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8("8"), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  return;
}

export function mock_create_pair_and_add_liquidity_ (
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
  name = Std.String.utf8_($.copy(symbol), $c);
  [initial_A, future_A] = [u64("60"), u64("100")];
  initial_A_time = Aptos_framework.Timestamp.now_microseconds_($c);
  future_A_time = ($.copy(initial_A_time)).add(((u64("24")).mul(u64("3600"))).mul($.copy(MICRO_CONVERSION_FACTOR)));
  decimals = Math.max_(u128(Aptos_framework.Coin.decimals_($c, [$p[0]])), u128(Aptos_framework.Coin.decimals_($c, [$p[1]])), $c);
  decimals__1 = u64($.copy(decimals));
  Stable_curve_swap.initialize_(admin, $.copy(name), $.copy(name), $.copy(decimals__1), $.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]]);
  Coin_registry.Coin_registry.add_token_(admin, $.copy(symbol), $.copy(symbol), $.copy(symbol), u8($.copy(decimals__1)), [], [], $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  some_x = Mock_coin.mint_($.copy(left_amt), $c, [$p[0]]);
  some_y = Mock_coin.mint_($.copy(right_amt), $c, [$p[1]]);
  [unused_x, unused_y, some_lp] = Stable_curve_swap.add_liquidity_direct_(some_x, some_y, $c, [$p[0], $p[1]]);
  if (!(Aptos_framework.Coin.value_(some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])])).eq(($.copy(lp_amt)))) {
    throw $.abortCode(u64("5"));
  }
  Mock_coin.burn_(unused_x, $c, [$p[0]]);
  Mock_coin.burn_(unused_y, $c, [$p[1]]);
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(admin, $c), some_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  return;
}

export function mock_deploy_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, admin_fee, coin_amt, fee;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!Coin_registry.Coin_registry.is_registry_initialized_($.copy(admin_addr), $c)) {
    Coin_registry.Coin_registry.initialize_(admin, $c);
  }
  else{
  }
  Mock_deploy.init_coin_and_create_store_(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", [])]);
  Mock_deploy.init_coin_and_create_store_(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])]);
  Mock_deploy.init_coin_and_create_store_(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])]);
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  coin_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity_(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("67"), u8("85"), u8("82"), u8("86"), u8("69"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), ($.copy(coin_amt)).mul(u64("100")), ($.copy(coin_amt)).mul(u64("100")), u64("200000000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDT", [])]);
  mock_create_pair_and_add_liquidity_(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("68"), u8("65"), u8("73"), u8("45"), u8("67"), u8("85"), u8("82"), u8("86"), u8("69"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), ($.copy(coin_amt)).mul(u64("100")), ($.copy(coin_amt)).mul(u64("100")), u64("200000000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WUSDC", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "WDAI", [])]);
  return;
}

export function mock_deploy_script_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  mock_deploy_(admin, $c);
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

export function remove_liquidity_ (
  sender: HexString,
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  Stable_curve_swap.remove_liquidity_(sender, $.copy(liquidity), $.copy(min_amount_x), $.copy(min_amount_y), $c, [$p[0], $p[1]]);
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

export function swap_ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, temp$3, addr, cond_a, cond_b, cond_c, out_amount, out_amount__4;
  if (($.copy(x_in)).gt(u64("0"))) {
    temp$1 = ($.copy(y_in)).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  cond_a = temp$1;
  if (($.copy(x_in)).eq((u64("0")))) {
    temp$2 = ($.copy(y_in)).eq((u64("0")));
  }
  else{
    temp$2 = false;
  }
  cond_b = temp$2;
  if (($.copy(x_min_out)).gt(u64("0"))) {
    temp$3 = ($.copy(y_min_out)).gt(u64("0"));
  }
  else{
    temp$3 = false;
  }
  cond_c = temp$3;
  if (!!(cond_a || cond_b)) {
    throw $.abortCode($.copy(E_SWAP_ONLY_ONE_IN_ALLOWED));
  }
  if (!!cond_c) {
    throw $.abortCode($.copy(E_SWAP_ONLY_ONE_OUT_ALLOWED));
  }
  addr = Std.Signer.address_of_(sender, $c);
  if (($.copy(x_in)).gt(u64("0"))) {
    [, , out_amount] = Stable_curve_swap.swap_x_to_exact_y_(sender, $.copy(x_in), $.copy(addr), $c, [$p[0], $p[1]]);
    if (!($.copy(out_amount)).gt($.copy(y_min_out))) {
      throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MIN));
    }
  }
  else{
    [, out_amount__4, ] = Stable_curve_swap.swap_y_to_exact_x_(sender, $.copy(y_in), $.copy(addr), $c, [$p[0], $p[1]]);
    if (!($.copy(out_amount__4)).gt($.copy(x_min_out))) {
      throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MIN));
    }
  }
  return;
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
  return swap_(sender, $.copy(x_in), $.copy(y_in), $.copy(x_min_out), $.copy(y_min_out), $c, [$p[0], $p[1]]);
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
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
  add_liquidity(
    amount_x: U64,
    amount_y: U64,
    $p: TypeTag[], /* <X, Y>*/
  ) {
    return buildPayload_add_liquidity(amount_x, amount_y, $p);
  }
  mock_deploy_script(
  ) {
    return buildPayload_mock_deploy_script();
  }
  remove_liquidity(
    liquidity: U64,
    min_amount_x: U64,
    min_amount_y: U64,
    $p: TypeTag[], /* <X, Y>*/
  ) {
    return buildPayload_remove_liquidity(liquidity, min_amount_x, min_amount_y, $p);
  }
  swap_script(
    x_in: U64,
    y_in: U64,
    x_min_out: U64,
    y_min_out: U64,
    $p: TypeTag[], /* <X, Y>*/
  ) {
    return buildPayload_swap_script(x_in, y_in, x_min_out, y_min_out, $p);
  }
}

