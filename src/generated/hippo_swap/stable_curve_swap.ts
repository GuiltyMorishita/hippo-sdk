import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Std from "../std";
import * as Hippo_config from "./hippo_config";
import * as Math from "./math";
import * as Stable_curve_numeral from "./stable_curve_numeral";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "stable_curve_swap";

export const ERROR_ALREADY_INITIALIZED : U64 = u64("1");
export const ERROR_EXCEEDED : U64 = u64("1001");
export const ERROR_ITERATE_END : U64 = u64("1000");
export const ERROR_SWAP_ADDLIQUIDITY_INVALID : U64 = u64("2007");
export const ERROR_SWAP_A_VALUE : U64 = u64("2010");
export const ERROR_SWAP_BURN_CALC_INVALID : U64 = u64("2004");
export const ERROR_SWAP_INVALID_DERIVIATION : U64 = u64("2020");
export const ERROR_SWAP_INVALID_TOKEN_PAIR : U64 = u64("2000");
export const ERROR_SWAP_PRECONDITION : U64 = u64("2001");
export const ERROR_SWAP_PRIVILEGE_INSUFFICIENT : U64 = u64("2003");
export const ERROR_SWAP_RAMP_TIME : U64 = u64("2009");
export const ERROR_SWAP_TOKEN_NOT_EXISTS : U64 = u64("2008");
export const FEE_DENOMINATOR : U128 = u128("1000000");
export const MAX_A : U64 = u64("1000000");
export const MAX_ADMIN_FEE : U64 = u64("1000000");
export const MAX_A_CHANGE : U64 = u64("10");
export const MAX_FEE : U64 = u64("500000");
export const MIN_RAMP_TIME : U64 = u64("86400");


export class LPCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LPCapability";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "burn_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) }];

  mint_cap: Aptos_framework.Coin.MintCapability;
  burn_cap: Aptos_framework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as Aptos_framework.Coin.MintCapability;
    this.burn_cap = proto['burn_cap'] as Aptos_framework.Coin.BurnCapability;
  }

  static LPCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LPCapability {
    const proto = $.parseStructProto(data, typeTag, repo, LPCapability);
    return new LPCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LPCapability, typeParams);
    return result as unknown as LPCapability;
  }
}

export class LPToken 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LPToken";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static LPTokenParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LPToken {
    const proto = $.parseStructProto(data, typeTag, repo, LPToken);
    return new LPToken(proto, typeTag);
  }

}

export class StableCurvePoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StableCurvePoolInfo";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "disabled", typeTag: AtomicTypeTag.Bool },
  { name: "reserve_x", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "reserve_y", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "fee_x", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "fee_y", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "lp_precision", typeTag: AtomicTypeTag.U64 },
  { name: "multiplier_x", typeTag: AtomicTypeTag.U64 },
  { name: "multiplier_y", typeTag: AtomicTypeTag.U64 },
  { name: "fee", typeTag: AtomicTypeTag.U64 },
  { name: "admin_fee", typeTag: AtomicTypeTag.U64 },
  { name: "initial_A", typeTag: AtomicTypeTag.U64 },
  { name: "future_A", typeTag: AtomicTypeTag.U64 },
  { name: "initial_A_time", typeTag: AtomicTypeTag.U64 },
  { name: "future_A_time", typeTag: AtomicTypeTag.U64 }];

  disabled: boolean;
  reserve_x: Aptos_framework.Coin.Coin;
  reserve_y: Aptos_framework.Coin.Coin;
  fee_x: Aptos_framework.Coin.Coin;
  fee_y: Aptos_framework.Coin.Coin;
  lp_precision: U64;
  multiplier_x: U64;
  multiplier_y: U64;
  fee: U64;
  admin_fee: U64;
  initial_A: U64;
  future_A: U64;
  initial_A_time: U64;
  future_A_time: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.disabled = proto['disabled'] as boolean;
    this.reserve_x = proto['reserve_x'] as Aptos_framework.Coin.Coin;
    this.reserve_y = proto['reserve_y'] as Aptos_framework.Coin.Coin;
    this.fee_x = proto['fee_x'] as Aptos_framework.Coin.Coin;
    this.fee_y = proto['fee_y'] as Aptos_framework.Coin.Coin;
    this.lp_precision = proto['lp_precision'] as U64;
    this.multiplier_x = proto['multiplier_x'] as U64;
    this.multiplier_y = proto['multiplier_y'] as U64;
    this.fee = proto['fee'] as U64;
    this.admin_fee = proto['admin_fee'] as U64;
    this.initial_A = proto['initial_A'] as U64;
    this.future_A = proto['future_A'] as U64;
    this.initial_A_time = proto['initial_A_time'] as U64;
    this.future_A_time = proto['future_A_time'] as U64;
  }

  static StableCurvePoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StableCurvePoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, StableCurvePoolInfo);
    return new StableCurvePoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StableCurvePoolInfo, typeParams);
    return result as unknown as StableCurvePoolInfo;
  }

  quote_x_to_y_after_fees(
    amount_x_in: U64,
  ) {
    const cache = new DummyCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_x_to_y_after_fees_(this, amount_x_in, cache, tags);
  }

  quote_y_to_x_after_fees(
    amount_y_in: U64,
  ) {
    const cache = new DummyCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_y_to_x_after_fees_(this, amount_y_in, cache, tags);
  }

}
export function add_liquidity_ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let addr, lp_amt, minted_lp_token, x, x_coin, y, y_coin;
  x_coin = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_x), $c, [$p[0]]);
  y_coin = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_y), $c, [$p[1]]);
  [x, y, minted_lp_token] = add_liquidity_direct_(x_coin, y_coin, $c, [$p[0], $p[1]]);
  addr = Std.Signer.address_of_(sender, $c);
  lp_amt = Aptos_framework.Coin.value_(minted_lp_token, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  Aptos_framework.Coin.deposit_($.copy(addr), x, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(addr), y, $c, [$p[1]]);
  check_and_deposit_(sender, minted_lp_token, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  return [$.copy(amount_x), $.copy(amount_y), $.copy(lp_amt)];
}

export function add_liquidity_direct_ (
  x: Aptos_framework.Coin.Coin,
  y: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let temp$1, _r_b_x, _r_b_y, amp, d0, d1, d2, fee, fee_coin_x, fee_coin_y, fee_x, fee_y, mint_amount, mint_token, n_b_x, n_b_y, new_reserve_x, new_reserve_y, p, reserve_amt_x, reserve_amt_y, token_pair, token_pair__2, token_supply, x_value_prev, y_value_prev;
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  [reserve_amt_x, reserve_amt_y] = [Aptos_framework.Coin.value_(p.reserve_x, $c, [$p[0]]), Aptos_framework.Coin.value_(p.reserve_y, $c, [$p[1]])];
  x_value_prev = Aptos_framework.Coin.value_(x, $c, [$p[0]]);
  y_value_prev = Aptos_framework.Coin.value_(y, $c, [$p[1]]);
  amp = get_current_A_($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  d0 = get_D_flat_($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(amp), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  temp$1 = Aptos_framework.Coin.supply_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  token_supply = u128($.copy(Std.Option.borrow_(temp$1, $c, [AtomicTypeTag.U128])));
  if (($.copy(token_supply)).eq((u128("0")))) {
    if (!($.copy(x_value_prev)).gt(u64("0"))) {
      throw $.abortCode(ERROR_SWAP_ADDLIQUIDITY_INVALID);
    }
    if (!($.copy(y_value_prev)).gt(u64("0"))) {
      throw $.abortCode(ERROR_SWAP_ADDLIQUIDITY_INVALID);
    }
  }
  else{
  }
  [new_reserve_x, new_reserve_y] = [($.copy(reserve_amt_x)).add($.copy(x_value_prev)), ($.copy(reserve_amt_y)).add($.copy(y_value_prev))];
  d1 = get_D_flat_($.copy(new_reserve_x), $.copy(new_reserve_y), $.copy(amp), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  if (!($.copy(d1)).gt($.copy(d0))) {
    throw $.abortCode(ERROR_SWAP_INVALID_DERIVIATION);
  }
  if (($.copy(token_supply)).gt(u128("0"))) {
    fee = (($.copy(p.fee)).mul(u64("2"))).div(u64("4"));
    [n_b_x, _r_b_x, fee_x] = calc_reserve_and_fees_(u128($.copy(new_reserve_x)), u128($.copy(reserve_amt_x)), $.copy(d0), $.copy(d1), u128($.copy(fee)), u128($.copy(p.admin_fee)), $c);
    [n_b_y, _r_b_y, fee_y] = calc_reserve_and_fees_(u128($.copy(new_reserve_y)), u128($.copy(reserve_amt_y)), $.copy(d0), $.copy(d1), u128($.copy(fee)), u128($.copy(p.admin_fee)), $c);
    d2 = get_D_flat_(u64($.copy(n_b_x)), u64($.copy(n_b_y)), $.copy(amp), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
    fee_coin_x = Aptos_framework.Coin.extract_(x, u64($.copy(fee_x)), $c, [$p[0]]);
    fee_coin_y = Aptos_framework.Coin.extract_(y, u64($.copy(fee_y)), $c, [$p[1]]);
    token_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
    Aptos_framework.Coin.merge_(token_pair.reserve_x, x, $c, [$p[0]]);
    Aptos_framework.Coin.merge_(token_pair.reserve_y, y, $c, [$p[1]]);
    Aptos_framework.Coin.merge_(token_pair.fee_x, fee_coin_x, $c, [$p[0]]);
    Aptos_framework.Coin.merge_(token_pair.fee_y, fee_coin_y, $c, [$p[1]]);
    mint_amount = (($.copy(token_supply)).mul(($.copy(d2)).sub($.copy(d0)))).div($.copy(d0));
  }
  else{
    mint_amount = $.copy(d1);
    token_pair__2 = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
    Aptos_framework.Coin.merge_(token_pair__2.reserve_x, x, $c, [$p[0]]);
    Aptos_framework.Coin.merge_(token_pair__2.reserve_y, y, $c, [$p[1]]);
  }
  mint_token = mint_(u64($.copy(mint_amount)), $c, [$p[0], $p[1]]);
  return [Aptos_framework.Coin.zero_($c, [$p[0]]), Aptos_framework.Coin.zero_($c, [$p[1]]), mint_token];
}

export function assert_admin_ (
  signer: HexString,
  $c: AptosDataCache,
): void {
  if (!((Std.Signer.address_of_(signer, $c)).hex() === (Hippo_config.admin_address_($c)).hex())) {
    throw $.abortCode(ERROR_SWAP_PRIVILEGE_INSUFFICIENT);
  }
  return;
}

export function balance_ (
  addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  return Aptos_framework.Coin.balance_($.copy(addr), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
}

export function burn_ (
  to_burn: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let liquidity_cap;
  liquidity_cap = $c.borrow_global<LPCapability>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPCapability", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  Aptos_framework.Coin.burn_(to_burn, liquidity_cap.burn_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  return;
}

export function calc_reserve_and_fees_ (
  new_reserve: U128,
  old_reserve: U128,
  d0: U128,
  d1: U128,
  average_fee: U128,
  admin_fee: U128,
  $c: AptosDataCache,
): [U128, U128, U128] {
  let admin_fee_amount, difference, fee_amount, ideal_reserve, name_balance, real_balance;
  ideal_reserve = (($.copy(d1)).mul($.copy(old_reserve))).div($.copy(d0));
  if (($.copy(ideal_reserve)).gt($.copy(new_reserve))) {
    difference = ($.copy(ideal_reserve)).sub($.copy(new_reserve));
  }
  else{
    difference = ($.copy(new_reserve)).sub($.copy(ideal_reserve));
  }
  fee_amount = (($.copy(average_fee)).mul($.copy(difference))).div(FEE_DENOMINATOR);
  admin_fee_amount = (($.copy(fee_amount)).mul($.copy(admin_fee))).div(FEE_DENOMINATOR);
  real_balance = ($.copy(new_reserve)).sub($.copy(admin_fee_amount));
  name_balance = ($.copy(new_reserve)).sub($.copy(fee_amount));
  return [$.copy(name_balance), $.copy(real_balance), $.copy(admin_fee_amount)];
}

export function check_and_deposit_ (
  to: HexString,
  coin: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  if (!Aptos_framework.Coin.is_account_registered_(Std.Signer.address_of_(to, $c), $c, [$p[0]])) {
    Aptos_framework.Coins.register_internal_(to, $c, [$p[0]]);
  }
  else{
  }
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(to, $c), coin, $c, [$p[0]]);
  return;
}

export function create_pool_info_ (
  lp_precision: U64,
  multiplier_x: U64,
  multiplier_y: U64,
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  fee: U64,
  admin_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): StableCurvePoolInfo {
  return new StableCurvePoolInfo({ disabled: false, reserve_x: Aptos_framework.Coin.zero_($c, [$p[0]]), reserve_y: Aptos_framework.Coin.zero_($c, [$p[1]]), fee_x: Aptos_framework.Coin.zero_($c, [$p[0]]), fee_y: Aptos_framework.Coin.zero_($c, [$p[1]]), lp_precision: $.copy(lp_precision), multiplier_x: $.copy(multiplier_x), multiplier_y: $.copy(multiplier_y), fee: $.copy(fee), admin_fee: $.copy(admin_fee), initial_A: $.copy(initial_A), future_A: $.copy(future_A), initial_A_time: $.copy(initial_A_time), future_A_time: $.copy(future_A_time) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]));
}

export function get_D_flat_ (
  amount_x: U64,
  amount_y: U64,
  amp: U64,
  multiplier_x: U64,
  multiplier_y: U64,
  $c: AptosDataCache,
): U128 {
  return Stable_curve_numeral.get_D_(u128(($.copy(multiplier_x)).mul($.copy(amount_x))), u128(($.copy(multiplier_y)).mul($.copy(amount_y))), $.copy(amp), $c);
}

export function get_current_A_ (
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  $c: AptosDataCache,
): U64 {
  let block_timestamp;
  block_timestamp = Aptos_framework.Timestamp.now_microseconds_($c);
  return Stable_curve_numeral.get_A_($.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(block_timestamp), $c);
}

export function get_xp_mem_ (
  reserve_x: U64,
  reserve_y: U64,
  multiplier_x: U64,
  multiplier_y: U64,
  $c: AptosDataCache,
): [U64, U64] {
  return [($.copy(multiplier_x)).mul($.copy(reserve_x)), ($.copy(multiplier_y)).mul($.copy(reserve_y))];
}

export function get_y_ (
  i: U64,
  dx: U64,
  xp: U64,
  yp: U64,
  initial_A: U64,
  initial_A_time: U64,
  future_A: U64,
  future_A_time: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1, amp, d, x;
  amp = get_current_A_($.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $c);
  d = Stable_curve_numeral.get_D_(u128($.copy(xp)), u128($.copy(yp)), $.copy(amp), $c);
  if (($.copy(i)).eq((u64("0")))) {
    temp$1 = ($.copy(dx)).add($.copy(xp));
  }
  else{
    temp$1 = ($.copy(dx)).add($.copy(yp));
  }
  x = temp$1;
  return u64(Stable_curve_numeral.get_y_($.copy(x), $.copy(amp), $.copy(d), $c));
}

export function initialize_ (
  signer: HexString,
  lp_name: Std.String.String,
  lp_symbol: Std.String.String,
  lp_decimal: U64,
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  fee: U64,
  admin_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let lp_precision, token_pair, x_decimal, x_rate, y_decimal, y_rate;
  assert_admin_(signer, $c);
  [x_decimal, y_decimal] = [Aptos_framework.Coin.decimals_($c, [$p[0]]), Aptos_framework.Coin.decimals_($c, [$p[1]])];
  lp_precision = u64(Math.pow_(u128("10"), u8($.copy(lp_decimal)), $c));
  x_rate = u64(Math.pow_(u128("10"), u8(($.copy(lp_decimal)).sub($.copy(x_decimal))), $c));
  y_rate = u64(Math.pow_(u128("10"), u8(($.copy(lp_decimal)).sub($.copy(y_decimal))), $c));
  initialize_coin_(signer, $.copy(lp_name), $.copy(lp_symbol), u64($.copy(lp_precision)), $c, [$p[0], $p[1]]);
  token_pair = create_pool_info_($.copy(lp_precision), $.copy(x_rate), $.copy(y_rate), $.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]]);
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), signer, token_pair);
  return;
}

export function initialize_coin_ (
  signer: HexString,
  name: Std.String.String,
  symbol: Std.String.String,
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let addr, burn_capability, mint_capability;
  addr = Std.Signer.address_of_(signer, $c);
  if (!!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), $.copy(addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[1], $p[0]]), $.copy(addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!Aptos_framework.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode(ERROR_SWAP_INVALID_TOKEN_PAIR);
  }
  if (!Aptos_framework.Coin.is_coin_initialized_($c, [$p[1]])) {
    throw $.abortCode(ERROR_SWAP_INVALID_TOKEN_PAIR);
  }
  [mint_capability, burn_capability] = Aptos_framework.Coin.initialize_(signer, $.copy(name), $.copy(symbol), $.copy(decimals), true, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  Aptos_framework.Coins.register_internal_(signer, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPCapability", [$p[0], $p[1]]), signer, new LPCapability({ mint_cap: $.copy(mint_capability), burn_cap: $.copy(burn_capability) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPCapability", [$p[0], $p[1]])));
  return;
}

export function mint_ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  let liquidity_cap, mint_token;
  liquidity_cap = $c.borrow_global<LPCapability>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPCapability", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  mint_token = Aptos_framework.Coin.mint_($.copy(amount), liquidity_cap.mint_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  return mint_token;
}

export function quote_x_to_y_after_fees_ (
  pool: StableCurvePoolInfo,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let amount_dy, amount_dy_fee, charged_amt_dy, dx_rated, reserve_amt_x, reserve_amt_y, xp, y, yp;
  [reserve_amt_x, reserve_amt_y] = [Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]), Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]])];
  [xp, yp] = get_xp_mem_($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(pool.multiplier_x), $.copy(pool.multiplier_y), $c);
  dx_rated = ($.copy(amount_x_in)).mul($.copy(pool.multiplier_x));
  y = get_y_(u64("0"), $.copy(dx_rated), $.copy(xp), $.copy(yp), $.copy(pool.initial_A), $.copy(pool.initial_A_time), $.copy(pool.future_A), $.copy(pool.future_A_time), $c);
  amount_dy = ((($.copy(yp)).sub($.copy(y))).sub(u64("1"))).div($.copy(pool.multiplier_y));
  amount_dy_fee = (($.copy(amount_dy)).mul($.copy(pool.fee))).div(u64(FEE_DENOMINATOR));
  charged_amt_dy = ($.copy(amount_dy)).sub($.copy(amount_dy_fee));
  return $.copy(charged_amt_dy);
}

export function quote_y_to_x_after_fees_ (
  pool: StableCurvePoolInfo,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let amount_dx, amount_dx_fee, charged_amt_dx, dy_rated, reserve_amt_x, reserve_amt_y, x, xp, yp;
  [reserve_amt_x, reserve_amt_y] = [Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]), Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]])];
  [xp, yp] = get_xp_mem_($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(pool.multiplier_x), $.copy(pool.multiplier_y), $c);
  dy_rated = ($.copy(amount_y_in)).mul($.copy(pool.multiplier_y));
  x = get_y_(u64("0"), $.copy(dy_rated), $.copy(xp), $.copy(yp), $.copy(pool.initial_A), $.copy(pool.initial_A_time), $.copy(pool.future_A), $.copy(pool.future_A_time), $c);
  amount_dx = ((($.copy(xp)).sub($.copy(x))).sub(u64("1"))).div($.copy(pool.multiplier_x));
  amount_dx_fee = (($.copy(amount_dx)).mul($.copy(pool.fee))).div(u64(FEE_DENOMINATOR));
  charged_amt_dx = ($.copy(amount_dx)).sub($.copy(amount_dx_fee));
  return $.copy(charged_amt_dx);
}

export function ramp_A_ (
  account: HexString,
  new_future_A: U64,
  future_time: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let block_timestamp, cond_a, cond_b, future_A_p, initial_A, p, pair;
  assert_admin_(account, $c);
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  block_timestamp = Aptos_framework.Timestamp.now_microseconds_($c);
  if (!($.copy(block_timestamp)).ge(($.copy(p.initial_A_time)).add(MIN_RAMP_TIME))) {
    throw $.abortCode(ERROR_SWAP_RAMP_TIME);
  }
  if (!($.copy(future_time)).ge(($.copy(block_timestamp)).add(MIN_RAMP_TIME))) {
    throw $.abortCode(ERROR_SWAP_RAMP_TIME);
  }
  initial_A = get_current_A_($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  future_A_p = $.copy(new_future_A);
  cond_a = ($.copy(new_future_A)).gt(u64("0"));
  cond_b = ($.copy(new_future_A)).lt(MAX_A);
  if (!(cond_a && cond_b)) {
    throw $.abortCode(ERROR_SWAP_A_VALUE);
  }
  if (($.copy(future_A_p)).lt($.copy(initial_A))) {
    if (!(($.copy(future_A_p)).mul(MAX_A_CHANGE)).ge($.copy(initial_A))) {
      throw $.abortCode(ERROR_SWAP_A_VALUE);
    }
  }
  else{
    if (!($.copy(future_A_p)).le(($.copy(initial_A)).mul(MAX_A_CHANGE))) {
      throw $.abortCode(ERROR_SWAP_A_VALUE);
    }
  }
  pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  pair.initial_A = $.copy(initial_A);
  pair.future_A = $.copy(future_A_p);
  pair.initial_A_time = $.copy(block_timestamp);
  pair.future_A_time = $.copy(future_time);
  return;
}

export function remove_liquidity_ (
  sender: HexString,
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let amount_x, amount_y, coin, coin_x, coin_y;
  coin = Aptos_framework.Coin.withdraw_(sender, $.copy(liquidity), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  [coin_x, coin_y] = withdraw_liquidity_(coin, $c, [$p[0], $p[1]]);
  [amount_x, amount_y] = [Aptos_framework.Coin.value_(coin_x, $c, [$p[0]]), Aptos_framework.Coin.value_(coin_y, $c, [$p[1]])];
  if (!($.copy(amount_x)).gt($.copy(min_amount_x))) {
    throw $.abortCode(ERROR_SWAP_PRECONDITION);
  }
  if (!($.copy(amount_y)).gt($.copy(min_amount_y))) {
    throw $.abortCode(ERROR_SWAP_PRECONDITION);
  }
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(sender, $c), coin_x, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(sender, $c), coin_y, $c, [$p[1]]);
  return [$.copy(amount_x), $.copy(amount_y)];
}

export function stop_ramp_A_ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let block_timestamp, current_A, p, pair;
  assert_admin_(account, $c);
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  current_A = get_current_A_($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  block_timestamp = Aptos_framework.Timestamp.now_microseconds_($c);
  pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  pair.initial_A = $.copy(current_A);
  pair.future_A = $.copy(current_A);
  pair.initial_A_time = $.copy(block_timestamp);
  pair.future_A_time = $.copy(block_timestamp);
  return;
}

export function swap_x_to_exact_y_ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let coin_x, coin_y, out_amount, x_out, x_remain;
  coin_x = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_in), $c, [$p[0]]);
  [x_remain, x_out, coin_y] = swap_x_to_exact_y_direct_(coin_x, $c, [$p[0], $p[1]]);
  out_amount = Aptos_framework.Coin.value_(coin_y, $c, [$p[1]]);
  Aptos_framework.Coin.merge_(x_out, x_remain, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to), x_out, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to), coin_y, $c, [$p[1]]);
  return [$.copy(amount_in), u64("0"), $.copy(out_amount)];
}

export function swap_x_to_exact_y_direct_ (
  coins_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let amount_dy, amount_dy_fee, charged_amt_dy, coin_dy, coin_fee, dx, dx_rated, dy_admin_fee, i, p, reserve_amt_x, reserve_amt_y, swap_pair, xp, y, yp;
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  [reserve_amt_x, reserve_amt_y] = [Aptos_framework.Coin.value_(p.reserve_x, $c, [$p[0]]), Aptos_framework.Coin.value_(p.reserve_y, $c, [$p[1]])];
  [xp, yp] = get_xp_mem_($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  i = u64("0");
  dx = Aptos_framework.Coin.value_(coins_in, $c, [$p[0]]);
  dx_rated = ($.copy(dx)).mul($.copy(p.multiplier_x));
  y = get_y_($.copy(i), $.copy(dx_rated), $.copy(xp), $.copy(yp), $.copy(p.initial_A), $.copy(p.initial_A_time), $.copy(p.future_A), $.copy(p.future_A_time), $c);
  amount_dy = ((($.copy(yp)).sub($.copy(y))).sub(u64("1"))).div($.copy(p.multiplier_y));
  amount_dy_fee = (($.copy(amount_dy)).mul($.copy(p.fee))).div(u64(FEE_DENOMINATOR));
  charged_amt_dy = ($.copy(amount_dy)).sub($.copy(amount_dy_fee));
  dy_admin_fee = (($.copy(amount_dy_fee)).mul($.copy(p.admin_fee))).div(u64(FEE_DENOMINATOR));
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  Aptos_framework.Coin.merge_(swap_pair.reserve_x, coins_in, $c, [$p[0]]);
  coin_dy = Aptos_framework.Coin.extract_(swap_pair.reserve_y, $.copy(charged_amt_dy), $c, [$p[1]]);
  coin_fee = Aptos_framework.Coin.extract_(swap_pair.reserve_y, $.copy(dy_admin_fee), $c, [$p[1]]);
  Aptos_framework.Coin.merge_(swap_pair.fee_y, coin_fee, $c, [$p[1]]);
  return [Aptos_framework.Coin.zero_($c, [$p[0]]), Aptos_framework.Coin.zero_($c, [$p[0]]), coin_dy];
}

export function swap_y_to_exact_x_ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let coin_y, out_amount, x_out, y_out, y_remain;
  coin_y = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_in), $c, [$p[1]]);
  [y_remain, x_out, y_out] = swap_y_to_exact_x_direct_(coin_y, $c, [$p[0], $p[1]]);
  out_amount = Aptos_framework.Coin.value_(x_out, $c, [$p[0]]);
  Aptos_framework.Coin.merge_(y_out, y_remain, $c, [$p[1]]);
  Aptos_framework.Coin.deposit_($.copy(to), x_out, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to), y_out, $c, [$p[1]]);
  return [$.copy(amount_in), $.copy(out_amount), u64("0")];
}

export function swap_y_to_exact_x_direct_ (
  coins_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let amount_dx, amount_dx_fee, charged_amt_dx, coin_dx, coin_fee, dx_admin_fee, dy, dy_rated, i, p, reserve_amt_x, reserve_amt_y, swap_pair, x, xp, yp;
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  [reserve_amt_x, reserve_amt_y] = [Aptos_framework.Coin.value_(p.reserve_x, $c, [$p[0]]), Aptos_framework.Coin.value_(p.reserve_y, $c, [$p[1]])];
  [xp, yp] = get_xp_mem_($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  i = u64("1");
  dy = Aptos_framework.Coin.value_(coins_in, $c, [$p[1]]);
  dy_rated = ($.copy(dy)).mul($.copy(p.multiplier_y));
  x = get_y_($.copy(i), $.copy(dy_rated), $.copy(xp), $.copy(yp), $.copy(p.initial_A), $.copy(p.initial_A_time), $.copy(p.future_A), $.copy(p.future_A_time), $c);
  amount_dx = ((($.copy(xp)).sub($.copy(x))).sub(u64("1"))).div($.copy(p.multiplier_x));
  amount_dx_fee = (($.copy(amount_dx)).mul($.copy(p.fee))).div(u64(FEE_DENOMINATOR));
  charged_amt_dx = ($.copy(amount_dx)).sub($.copy(amount_dx_fee));
  dx_admin_fee = (($.copy(amount_dx_fee)).mul($.copy(p.admin_fee))).div(u64(FEE_DENOMINATOR));
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  Aptos_framework.Coin.merge_(swap_pair.reserve_y, coins_in, $c, [$p[1]]);
  coin_dx = Aptos_framework.Coin.extract_(swap_pair.reserve_x, $.copy(charged_amt_dx), $c, [$p[0]]);
  coin_fee = Aptos_framework.Coin.extract_(swap_pair.reserve_x, $.copy(dx_admin_fee), $c, [$p[0]]);
  Aptos_framework.Coin.merge_(swap_pair.fee_x, coin_fee, $c, [$p[0]]);
  return [Aptos_framework.Coin.zero_($c, [$p[1]]), coin_dx, Aptos_framework.Coin.zero_($c, [$p[1]])];
}

export function withdraw_liquidity_ (
  to_burn: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let temp$1, coin_x, coin_y, reserve_x, reserve_y, swap_pair, to_burn_value, total_supply, x, y;
  to_burn_value = u128(Aptos_framework.Coin.value_(to_burn, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]));
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "StableCurvePoolInfo", [$p[0], $p[1]]), Hippo_config.admin_address_($c));
  reserve_x = u128(Aptos_framework.Coin.value_(swap_pair.reserve_x, $c, [$p[0]]));
  reserve_y = u128(Aptos_framework.Coin.value_(swap_pair.reserve_y, $c, [$p[1]]));
  temp$1 = Aptos_framework.Coin.supply_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "stable_curve_swap", "LPToken", [$p[0], $p[1]])]);
  total_supply = u128($.copy(Std.Option.borrow_(temp$1, $c, [AtomicTypeTag.U128])));
  x = u64((($.copy(to_burn_value)).mul($.copy(reserve_x))).div($.copy(total_supply)));
  y = u64((($.copy(to_burn_value)).mul($.copy(reserve_y))).div($.copy(total_supply)));
  burn_(to_burn, $c, [$p[0], $p[1]]);
  coin_x = Aptos_framework.Coin.extract_(swap_pair.reserve_x, $.copy(x), $c, [$p[0]]);
  coin_y = Aptos_framework.Coin.extract_(swap_pair.reserve_y, $.copy(y), $c, [$p[1]]);
  return [coin_x, coin_y];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_swap::LPCapability", LPCapability.LPCapabilityParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_swap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::stable_curve_swap::StableCurvePoolInfo", StableCurvePoolInfo.StableCurvePoolInfoParser);
}

