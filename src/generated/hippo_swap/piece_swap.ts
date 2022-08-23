import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Std from "../std";
import * as Math from "./math";
import * as Piece_swap_math from "./piece_swap_math";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "piece_swap";

export const ERROR_ALREADY_INITIALIZED : U64 = u64("1");
export const ERROR_COIN_NOT_INITIALIZED : U64 = u64("2");
export const ERROR_NOT_CREATOR : U64 = u64("3");
export const ERROR_ONLY_ADMIN : U64 = u64("0");
export const MINIMUM_LIQUIDITY : U128 = u128("1000");
export const MODULE_ADMIN : HexString = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");


export class LPToken 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
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

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "LPToken", $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class PieceSwapPoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PieceSwapPoolInfo";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "reserve_x", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "reserve_y", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "lp_amt", typeTag: AtomicTypeTag.U64 },
  { name: "lp_mint_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "lp_burn_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "lp_freeze_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "FreezeCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "K", typeTag: AtomicTypeTag.U128 },
  { name: "K2", typeTag: AtomicTypeTag.U128 },
  { name: "Xa", typeTag: AtomicTypeTag.U128 },
  { name: "Xb", typeTag: AtomicTypeTag.U128 },
  { name: "m", typeTag: AtomicTypeTag.U128 },
  { name: "n", typeTag: AtomicTypeTag.U128 },
  { name: "x_deci_mult", typeTag: AtomicTypeTag.U64 },
  { name: "y_deci_mult", typeTag: AtomicTypeTag.U64 },
  { name: "swap_fee_per_million", typeTag: AtomicTypeTag.U64 },
  { name: "protocol_fee_share_per_thousand", typeTag: AtomicTypeTag.U64 },
  { name: "protocol_fee_x", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "protocol_fee_y", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(1)]) }];

  reserve_x: Aptos_framework.Coin.Coin;
  reserve_y: Aptos_framework.Coin.Coin;
  lp_amt: U64;
  lp_mint_cap: Aptos_framework.Coin.MintCapability;
  lp_burn_cap: Aptos_framework.Coin.BurnCapability;
  lp_freeze_cap: Aptos_framework.Coin.FreezeCapability;
  K: U128;
  K2: U128;
  Xa: U128;
  Xb: U128;
  m: U128;
  n: U128;
  x_deci_mult: U64;
  y_deci_mult: U64;
  swap_fee_per_million: U64;
  protocol_fee_share_per_thousand: U64;
  protocol_fee_x: Aptos_framework.Coin.Coin;
  protocol_fee_y: Aptos_framework.Coin.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as Aptos_framework.Coin.Coin;
    this.reserve_y = proto['reserve_y'] as Aptos_framework.Coin.Coin;
    this.lp_amt = proto['lp_amt'] as U64;
    this.lp_mint_cap = proto['lp_mint_cap'] as Aptos_framework.Coin.MintCapability;
    this.lp_burn_cap = proto['lp_burn_cap'] as Aptos_framework.Coin.BurnCapability;
    this.lp_freeze_cap = proto['lp_freeze_cap'] as Aptos_framework.Coin.FreezeCapability;
    this.K = proto['K'] as U128;
    this.K2 = proto['K2'] as U128;
    this.Xa = proto['Xa'] as U128;
    this.Xb = proto['Xb'] as U128;
    this.m = proto['m'] as U128;
    this.n = proto['n'] as U128;
    this.x_deci_mult = proto['x_deci_mult'] as U64;
    this.y_deci_mult = proto['y_deci_mult'] as U64;
    this.swap_fee_per_million = proto['swap_fee_per_million'] as U64;
    this.protocol_fee_share_per_thousand = proto['protocol_fee_share_per_thousand'] as U64;
    this.protocol_fee_x = proto['protocol_fee_x'] as Aptos_framework.Coin.Coin;
    this.protocol_fee_y = proto['protocol_fee_y'] as Aptos_framework.Coin.Coin;
  }

  static PieceSwapPoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PieceSwapPoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, PieceSwapPoolInfo);
    return new PieceSwapPoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PieceSwapPoolInfo, typeParams);
    return result as unknown as PieceSwapPoolInfo;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, PieceSwapPoolInfo, typeParams);
    await result.loadFullState(app)
    return result as unknown as PieceSwapPoolInfo;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "PieceSwapPoolInfo", $p);
  }
  async loadFullState(app: $.AppType) {
    await this.reserve_x.loadFullState(app);
    await this.reserve_y.loadFullState(app);
    await this.lp_mint_cap.loadFullState(app);
    await this.lp_burn_cap.loadFullState(app);
    await this.lp_freeze_cap.loadFullState(app);
    await this.protocol_fee_x.loadFullState(app);
    await this.protocol_fee_y.loadFullState(app);
    this.__app = app;
  }


  quote_x_to_y(
    amount_x_in: U64,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_x_to_y_(this, amount_x_in, cache, tags);
  }

  quote_x_to_y_after_fees(
    amount_x_in: U64,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_x_to_y_after_fees_(this, amount_x_in, cache, tags);
  }

  quote_y_to_x(
    amount_y_in: U64,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_y_to_x_(this, amount_y_in, cache, tags);
  }

  quote_y_to_x_after_fees(
    amount_y_in: U64,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_y_to_x_after_fees_(this, amount_y_in, cache, tags);
  }

}
export function add_liquidity_ (
  sender: HexString,
  add_amt_x: U64,
  add_amt_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let actual_add_x, actual_add_y, current_x, current_y, opt_amt_x, opt_amt_y, opt_lp, pool, x_coin, y_coin;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  current_x = (u128(Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]))).mul(u128($.copy(pool.x_deci_mult)));
  current_y = (u128(Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]]))).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y, opt_lp] = Piece_swap_math.get_add_liquidity_actual_amount_($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), (u128($.copy(add_amt_x))).mul(u128($.copy(pool.x_deci_mult))), (u128($.copy(add_amt_y))).mul(u128($.copy(pool.y_deci_mult))), $c);
  if (($.copy(opt_lp)).eq((u128("0")))) {
    return [u64("0"), u64("0"), u64("0")];
  }
  else{
  }
  actual_add_x = u64(($.copy(opt_amt_x)).div(u128($.copy(pool.x_deci_mult))));
  actual_add_y = u64(($.copy(opt_amt_y)).div(u128($.copy(pool.y_deci_mult))));
  x_coin = Aptos_framework.Coin.withdraw_(sender, $.copy(actual_add_x), $c, [$p[0]]);
  y_coin = Aptos_framework.Coin.withdraw_(sender, $.copy(actual_add_y), $c, [$p[1]]);
  Aptos_framework.Coin.merge_(pool.reserve_x, x_coin, $c, [$p[0]]);
  Aptos_framework.Coin.merge_(pool.reserve_y, y_coin, $c, [$p[1]]);
  mint_to_(sender, u64($.copy(opt_lp)), pool, $c, [$p[0], $p[1]]);
  return [$.copy(actual_add_x), $.copy(actual_add_y), u64($.copy(opt_lp))];
}

export function add_liquidity_direct_ (
  coin_x: Aptos_framework.Coin.Coin,
  coin_y: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let actual_add_x, actual_add_x_coin, actual_add_y, actual_add_y_coin, add_amt_x, add_amt_y, current_x, current_y, lp_coin, opt_amt_x, opt_amt_y, opt_lp, pool;
  add_amt_x = Aptos_framework.Coin.value_(coin_x, $c, [$p[0]]);
  add_amt_y = Aptos_framework.Coin.value_(coin_y, $c, [$p[1]]);
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  current_x = (u128(Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]))).mul(u128($.copy(pool.x_deci_mult)));
  current_y = (u128(Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]]))).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y, opt_lp] = Piece_swap_math.get_add_liquidity_actual_amount_($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), (u128($.copy(add_amt_x))).mul(u128($.copy(pool.x_deci_mult))), (u128($.copy(add_amt_y))).mul(u128($.copy(pool.y_deci_mult))), $c);
  if (($.copy(opt_lp)).eq((u128("0")))) {
    return [coin_x, coin_y, Aptos_framework.Coin.zero_($c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])])];
  }
  else{
  }
  actual_add_x = u64(($.copy(opt_amt_x)).div(u128($.copy(pool.x_deci_mult))));
  actual_add_y = u64(($.copy(opt_amt_y)).div(u128($.copy(pool.y_deci_mult))));
  actual_add_x_coin = Aptos_framework.Coin.extract_(coin_x, $.copy(actual_add_x), $c, [$p[0]]);
  actual_add_y_coin = Aptos_framework.Coin.extract_(coin_y, $.copy(actual_add_y), $c, [$p[1]]);
  Aptos_framework.Coin.merge_(pool.reserve_x, actual_add_x_coin, $c, [$p[0]]);
  Aptos_framework.Coin.merge_(pool.reserve_y, actual_add_y_coin, $c, [$p[1]]);
  lp_coin = mint_direct_(u64($.copy(opt_lp)), pool, $c, [$p[0], $p[1]]);
  return [coin_x, coin_y, lp_coin];
}

export function burn_direct_ (
  lp: Aptos_framework.Coin.Coin,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let amount;
  amount = Aptos_framework.Coin.value_(lp, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  Aptos_framework.Coin.burn_(lp, pool.lp_burn_cap, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  pool.lp_amt = ($.copy(pool.lp_amt)).sub($.copy(amount));
  return;
}

export function burn_from_ (
  from: HexString,
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coin_to_burn;
  coin_to_burn = Aptos_framework.Coin.withdraw_(from, $.copy(amount), $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  burn_direct_(coin_to_burn, pool, $c, [$p[0], $p[1]]);
  return;
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

export function create_new_pool_ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_decimals: U8,
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
  let temp$1, temp$2, temp$3, temp$4, admin_addr, k2, lp_burn_cap, lp_freeze_cap, lp_mint_cap, m, n, x_deci_mult, x_decimals, xa, xb, y_deci_mult, y_decimals;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!(($.copy(admin_addr)).hex() === ($.copy(MODULE_ADMIN)).hex())) {
    throw $.abortCode($.copy(ERROR_NOT_CREATOR));
  }
  if (!!$c.exists(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(admin_addr))) {
    throw $.abortCode($.copy(ERROR_ALREADY_INITIALIZED));
  }
  if (!!$c.exists(new SimpleStructTag(PieceSwapPoolInfo, [$p[1], $p[0]]), $.copy(admin_addr))) {
    throw $.abortCode($.copy(ERROR_ALREADY_INITIALIZED));
  }
  if (!Aptos_framework.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode($.copy(ERROR_COIN_NOT_INITIALIZED));
  }
  if (!Aptos_framework.Coin.is_coin_initialized_($c, [$p[1]])) {
    throw $.abortCode($.copy(ERROR_COIN_NOT_INITIALIZED));
  }
  [lp_burn_cap, lp_freeze_cap, lp_mint_cap] = Aptos_framework.Coin.initialize_(admin, Std.String.utf8_($.copy(lp_name), $c), Std.String.utf8_($.copy(lp_symbol), $c), $.copy(lp_decimals), true, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  [xa, xb, m, n, k2] = Piece_swap_math.compute_initialization_constants_($.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $c);
  x_decimals = Aptos_framework.Coin.decimals_($c, [$p[0]]);
  y_decimals = Aptos_framework.Coin.decimals_($c, [$p[1]]);
  if (($.copy(x_decimals)).gt($.copy(y_decimals))) {
    [temp$3, temp$4] = [u128("1"), Math.pow_(u128("10"), u8(($.copy(x_decimals)).sub($.copy(y_decimals))), $c)];
  }
  else{
    if (($.copy(y_decimals)).gt($.copy(x_decimals))) {
      [temp$1, temp$2] = [Math.pow_(u128("10"), u8(($.copy(y_decimals)).sub($.copy(x_decimals))), $c), u128("1")];
    }
    else{
      [temp$1, temp$2] = [u128("1"), u128("1")];
    }
    [temp$3, temp$4] = [temp$1, temp$2];
  }
  [x_deci_mult, y_deci_mult] = [temp$3, temp$4];
  $c.move_to(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), admin, new PieceSwapPoolInfo({ reserve_x: Aptos_framework.Coin.zero_($c, [$p[0]]), reserve_y: Aptos_framework.Coin.zero_($c, [$p[1]]), lp_amt: u64("0"), lp_mint_cap: $.copy(lp_mint_cap), lp_burn_cap: $.copy(lp_burn_cap), lp_freeze_cap: $.copy(lp_freeze_cap), K: $.copy(k), K2: $.copy(k2), Xa: $.copy(xa), Xb: $.copy(xb), m: $.copy(m), n: $.copy(n), x_deci_mult: u64($.copy(x_deci_mult)), y_deci_mult: u64($.copy(y_deci_mult)), swap_fee_per_million: $.copy(swap_fee_per_million), protocol_fee_share_per_thousand: $.copy(protocol_fee_share_per_thousand), protocol_fee_x: Aptos_framework.Coin.zero_($c, [$p[0]]), protocol_fee_y: Aptos_framework.Coin.zero_($c, [$p[1]]) }, new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]])));
  Aptos_framework.Coins.register_internal_(admin, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function mint_direct_ (
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  let lp_coin;
  lp_coin = Aptos_framework.Coin.mint_($.copy(amount), pool.lp_mint_cap, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  pool.lp_amt = ($.copy(pool.lp_amt)).add($.copy(amount));
  return lp_coin;
}

export function mint_to_ (
  to: HexString,
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let lp_coin;
  lp_coin = mint_direct_($.copy(amount), pool, $c, [$p[0], $p[1]]);
  check_and_deposit_(to, lp_coin, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function quote_x_to_y_ (
  pool: PieceSwapPoolInfo,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let actual_out_y, current_x, current_y, input_x, opt_output_y, x_value;
  current_x = (u128(Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]))).mul(u128($.copy(pool.x_deci_mult)));
  current_y = (u128(Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]]))).mul(u128($.copy(pool.y_deci_mult)));
  x_value = u128($.copy(amount_x_in));
  input_x = ($.copy(x_value)).mul(u128($.copy(pool.x_deci_mult)));
  opt_output_y = Piece_swap_math.get_swap_x_to_y_out_($.copy(current_x), $.copy(current_y), $.copy(input_x), $.copy(pool.K), $.copy(pool.K2), $.copy(pool.Xa), $.copy(pool.Xb), $.copy(pool.m), $.copy(pool.n), $c);
  actual_out_y = u64(($.copy(opt_output_y)).div(u128($.copy(pool.y_deci_mult))));
  return $.copy(actual_out_y);
}

export function quote_x_to_y_after_fees_ (
  pool: PieceSwapPoolInfo,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let actual_out_y, out_y_after_fees, total_fees;
  actual_out_y = quote_x_to_y_(pool, $.copy(amount_x_in), $c, [$p[0], $p[1]]);
  total_fees = (($.copy(actual_out_y)).mul($.copy(pool.swap_fee_per_million))).div(u64("1000000"));
  out_y_after_fees = ($.copy(actual_out_y)).sub($.copy(total_fees));
  return $.copy(out_y_after_fees);
}

export function quote_y_to_x_ (
  pool: PieceSwapPoolInfo,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let actual_out_x, current_x, current_y, input_y, opt_output_x, y_value;
  current_x = (u128(Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]))).mul(u128($.copy(pool.x_deci_mult)));
  current_y = (u128(Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]]))).mul(u128($.copy(pool.y_deci_mult)));
  y_value = u128($.copy(amount_y_in));
  input_y = ($.copy(y_value)).mul(u128($.copy(pool.y_deci_mult)));
  opt_output_x = Piece_swap_math.get_swap_y_to_x_out_($.copy(current_x), $.copy(current_y), $.copy(input_y), $.copy(pool.K), $.copy(pool.K2), $.copy(pool.Xa), $.copy(pool.Xb), $.copy(pool.m), $.copy(pool.n), $c);
  actual_out_x = u64(($.copy(opt_output_x)).div(u128($.copy(pool.x_deci_mult))));
  return $.copy(actual_out_x);
}

export function quote_y_to_x_after_fees_ (
  pool: PieceSwapPoolInfo,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let actual_out_x, out_x_after_fees, total_fees;
  actual_out_x = quote_y_to_x_(pool, $.copy(amount_y_in), $c, [$p[0], $p[1]]);
  total_fees = (($.copy(actual_out_x)).mul($.copy(pool.swap_fee_per_million))).div(u64("1000000"));
  out_x_after_fees = ($.copy(actual_out_x)).sub($.copy(total_fees));
  return $.copy(out_x_after_fees);
}

export function remove_liquidity_ (
  sender: HexString,
  remove_lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let actual_remove_x, actual_remove_y, current_x, current_y, opt_amt_x, opt_amt_y, pool, removed_x, removed_y;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  current_x = (u128(Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]))).mul(u128($.copy(pool.x_deci_mult)));
  current_y = (u128(Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]]))).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y] = Piece_swap_math.get_remove_liquidity_amounts_($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(remove_lp_amt)), $c);
  actual_remove_x = u64(($.copy(opt_amt_x)).div(u128($.copy(pool.x_deci_mult))));
  actual_remove_y = u64(($.copy(opt_amt_y)).div(u128($.copy(pool.y_deci_mult))));
  burn_from_(sender, $.copy(remove_lp_amt), pool, $c, [$p[0], $p[1]]);
  removed_x = Aptos_framework.Coin.extract_(pool.reserve_x, $.copy(actual_remove_x), $c, [$p[0]]);
  removed_y = Aptos_framework.Coin.extract_(pool.reserve_y, $.copy(actual_remove_y), $c, [$p[1]]);
  check_and_deposit_(sender, removed_x, $c, [$p[0]]);
  check_and_deposit_(sender, removed_y, $c, [$p[1]]);
  return [$.copy(actual_remove_x), $.copy(actual_remove_y)];
}

export function remove_liquidity_direct_ (
  remove_lp: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let actual_remove_x, actual_remove_y, current_x, current_y, opt_amt_x, opt_amt_y, pool, remove_lp_amt, removed_x, removed_y;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  current_x = (u128(Aptos_framework.Coin.value_(pool.reserve_x, $c, [$p[0]]))).mul(u128($.copy(pool.x_deci_mult)));
  current_y = (u128(Aptos_framework.Coin.value_(pool.reserve_y, $c, [$p[1]]))).mul(u128($.copy(pool.y_deci_mult)));
  remove_lp_amt = Aptos_framework.Coin.value_(remove_lp, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  [opt_amt_x, opt_amt_y] = Piece_swap_math.get_remove_liquidity_amounts_($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(remove_lp_amt)), $c);
  actual_remove_x = u64(($.copy(opt_amt_x)).div(u128($.copy(pool.x_deci_mult))));
  actual_remove_y = u64(($.copy(opt_amt_y)).div(u128($.copy(pool.y_deci_mult))));
  burn_direct_(remove_lp, pool, $c, [$p[0], $p[1]]);
  removed_x = Aptos_framework.Coin.extract_(pool.reserve_x, $.copy(actual_remove_x), $c, [$p[0]]);
  removed_y = Aptos_framework.Coin.extract_(pool.reserve_y, $.copy(actual_remove_y), $c, [$p[1]]);
  return [removed_x, removed_y];
}

export function swap_x_to_y_ (
  sender: HexString,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let coin_x, coin_y, value_y;
  coin_x = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_x_in), $c, [$p[0]]);
  coin_y = swap_x_to_y_direct_(coin_x, $c, [$p[0], $p[1]]);
  value_y = Aptos_framework.Coin.value_(coin_y, $c, [$p[1]]);
  check_and_deposit_(sender, coin_y, $c, [$p[1]]);
  return $.copy(value_y);
}

export function swap_x_to_y_direct_ (
  coin_x: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  let temp$1, temp$2, actual_out_y, coin_y, out_y_after_fees, pool, protocol_fee_y, protocol_fees, total_fees;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  [temp$1, temp$2] = [pool, Aptos_framework.Coin.value_(coin_x, $c, [$p[0]])];
  actual_out_y = quote_x_to_y_(temp$1, temp$2, $c, [$p[0], $p[1]]);
  Aptos_framework.Coin.merge_(pool.reserve_x, coin_x, $c, [$p[0]]);
  total_fees = (($.copy(actual_out_y)).mul($.copy(pool.swap_fee_per_million))).div(u64("1000000"));
  protocol_fees = (($.copy(total_fees)).mul($.copy(pool.protocol_fee_share_per_thousand))).div(u64("1000"));
  out_y_after_fees = ($.copy(actual_out_y)).sub($.copy(total_fees));
  coin_y = Aptos_framework.Coin.extract_(pool.reserve_y, $.copy(out_y_after_fees), $c, [$p[1]]);
  protocol_fee_y = Aptos_framework.Coin.extract_(pool.reserve_y, $.copy(protocol_fees), $c, [$p[1]]);
  Aptos_framework.Coin.merge_(pool.protocol_fee_y, protocol_fee_y, $c, [$p[1]]);
  return coin_y;
}

export function swap_y_to_x_ (
  sender: HexString,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let coin_x, coin_y, value_x;
  coin_y = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_y_in), $c, [$p[1]]);
  coin_x = swap_y_to_x_direct_(coin_y, $c, [$p[0], $p[1]]);
  value_x = Aptos_framework.Coin.value_(coin_x, $c, [$p[0]]);
  check_and_deposit_(sender, coin_x, $c, [$p[0]]);
  return $.copy(value_x);
}

export function swap_y_to_x_direct_ (
  coin_y: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  let temp$1, temp$2, actual_out_x, coin_x, out_x_after_fees, pool, protocol_fee_x, protocol_fees, total_fees;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new SimpleStructTag(PieceSwapPoolInfo, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  [temp$1, temp$2] = [pool, Aptos_framework.Coin.value_(coin_y, $c, [$p[1]])];
  actual_out_x = quote_y_to_x_(temp$1, temp$2, $c, [$p[0], $p[1]]);
  Aptos_framework.Coin.merge_(pool.reserve_y, coin_y, $c, [$p[1]]);
  total_fees = (($.copy(actual_out_x)).mul($.copy(pool.swap_fee_per_million))).div(u64("1000000"));
  protocol_fees = (($.copy(total_fees)).mul($.copy(pool.protocol_fee_share_per_thousand))).div(u64("1000"));
  out_x_after_fees = ($.copy(actual_out_x)).sub($.copy(total_fees));
  protocol_fee_x = Aptos_framework.Coin.extract_(pool.reserve_x, $.copy(protocol_fees), $c, [$p[0]]);
  Aptos_framework.Coin.merge_(pool.protocol_fee_x, protocol_fee_x, $c, [$p[0]]);
  coin_x = Aptos_framework.Coin.extract_(pool.reserve_x, $.copy(out_x_after_fees), $c, [$p[0]]);
  return coin_x;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap::PieceSwapPoolInfo", PieceSwapPoolInfo.PieceSwapPoolInfoParser);
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
  get LPToken() { return LPToken; }
  get PieceSwapPoolInfo() { return PieceSwapPoolInfo; }
  async loadPieceSwapPoolInfo(
    owner: HexString,
    $p: TypeTag[], /* <X, Y> */
    loadFull=true,
  ) {
    const val = await PieceSwapPoolInfo.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
}

