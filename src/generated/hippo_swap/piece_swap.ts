import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as aptos_framework$_ from "../aptos_framework";
import * as std$_ from "../std";
import * as math$_ from "./math";
import * as piece_swap_math$_ from "./piece_swap_math";
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

export class PieceSwapPoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
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

  reserve_x: aptos_framework$_.coin$_.Coin;
  reserve_y: aptos_framework$_.coin$_.Coin;
  lp_amt: U64;
  lp_mint_cap: aptos_framework$_.coin$_.MintCapability;
  lp_burn_cap: aptos_framework$_.coin$_.BurnCapability;
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
  protocol_fee_x: aptos_framework$_.coin$_.Coin;
  protocol_fee_y: aptos_framework$_.coin$_.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as aptos_framework$_.coin$_.Coin;
    this.reserve_y = proto['reserve_y'] as aptos_framework$_.coin$_.Coin;
    this.lp_amt = proto['lp_amt'] as U64;
    this.lp_mint_cap = proto['lp_mint_cap'] as aptos_framework$_.coin$_.MintCapability;
    this.lp_burn_cap = proto['lp_burn_cap'] as aptos_framework$_.coin$_.BurnCapability;
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
    this.protocol_fee_x = proto['protocol_fee_x'] as aptos_framework$_.coin$_.Coin;
    this.protocol_fee_y = proto['protocol_fee_y'] as aptos_framework$_.coin$_.Coin;
  }

  static PieceSwapPoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PieceSwapPoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, PieceSwapPoolInfo);
    return new PieceSwapPoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PieceSwapPoolInfo, typeParams);
    return result as unknown as PieceSwapPoolInfo;
  }
}
export function add_liquidity$ (
  sender: HexString,
  add_amt_x: U64,
  add_amt_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let actual_add_x, actual_add_y, current_x, current_y, opt_amt_x, opt_amt_y, opt_lp, pool, x_coin, y_coin;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(aptos_framework$_.coin$_.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(aptos_framework$_.coin$_.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y, opt_lp] = piece_swap_math$_.get_add_liquidity_actual_amount$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(add_amt_x)).mul(u128($.copy(pool.x_deci_mult))), u128($.copy(add_amt_y)).mul(u128($.copy(pool.y_deci_mult))), $c);
  if ($.copy(opt_lp).eq(u128("0"))) {
    return [u64("0"), u64("0"), u64("0")];
  }
  else{
  }
  actual_add_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_add_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  x_coin = aptos_framework$_.coin$_.withdraw$(sender, $.copy(actual_add_x), $c, [$p[0]] as TypeTag[]);
  y_coin = aptos_framework$_.coin$_.withdraw$(sender, $.copy(actual_add_y), $c, [$p[1]] as TypeTag[]);
  aptos_framework$_.coin$_.merge$(pool.reserve_x, x_coin, $c, [$p[0]] as TypeTag[]);
  aptos_framework$_.coin$_.merge$(pool.reserve_y, y_coin, $c, [$p[1]] as TypeTag[]);
  mint_to$(sender, u64($.copy(opt_lp)), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  return [$.copy(actual_add_x), $.copy(actual_add_y), u64($.copy(opt_lp))];
}

export function add_liquidity_direct$ (
  coin_x: aptos_framework$_.coin$_.Coin,
  coin_y: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [aptos_framework$_.coin$_.Coin, aptos_framework$_.coin$_.Coin, aptos_framework$_.coin$_.Coin] {
  let actual_add_x, actual_add_x_coin, actual_add_y, actual_add_y_coin, add_amt_x, add_amt_y, current_x, current_y, lp_coin, opt_amt_x, opt_amt_y, opt_lp, pool;
  add_amt_x = aptos_framework$_.coin$_.value$(coin_x, $c, [$p[0]] as TypeTag[]);
  add_amt_y = aptos_framework$_.coin$_.value$(coin_y, $c, [$p[1]] as TypeTag[]);
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(aptos_framework$_.coin$_.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(aptos_framework$_.coin$_.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y, opt_lp] = piece_swap_math$_.get_add_liquidity_actual_amount$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(add_amt_x)).mul(u128($.copy(pool.x_deci_mult))), u128($.copy(add_amt_y)).mul(u128($.copy(pool.y_deci_mult))), $c);
  if ($.copy(opt_lp).eq(u128("0"))) {
    return [coin_x, coin_y, aptos_framework$_.coin$_.zero$($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[])];
  }
  else{
  }
  actual_add_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_add_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  actual_add_x_coin = aptos_framework$_.coin$_.extract$(coin_x, $.copy(actual_add_x), $c, [$p[0]] as TypeTag[]);
  actual_add_y_coin = aptos_framework$_.coin$_.extract$(coin_y, $.copy(actual_add_y), $c, [$p[1]] as TypeTag[]);
  aptos_framework$_.coin$_.merge$(pool.reserve_x, actual_add_x_coin, $c, [$p[0]] as TypeTag[]);
  aptos_framework$_.coin$_.merge$(pool.reserve_y, actual_add_y_coin, $c, [$p[1]] as TypeTag[]);
  lp_coin = mint_direct$(u64($.copy(opt_lp)), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  return [coin_x, coin_y, lp_coin];
}

export function burn_direct$ (
  lp: aptos_framework$_.coin$_.Coin,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let amount;
  amount = aptos_framework$_.coin$_.value$(lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  aptos_framework$_.coin$_.burn$(lp, pool.lp_burn_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  pool.lp_amt = $.copy(pool.lp_amt).sub($.copy(amount));
  return;
}

export function burn_from$ (
  from: HexString,
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coin_to_burn;
  coin_to_burn = aptos_framework$_.coin$_.withdraw$(from, $.copy(amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  burn_direct$(coin_to_burn, pool, $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

export function check_and_deposit$ (
  to: HexString,
  coin: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  if (!aptos_framework$_.coin$_.is_account_registered$(std$_.signer$_.address_of$(to, $c), $c, [$p[0]] as TypeTag[])) {
    aptos_framework$_.coin$_.register_internal$(to, $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  aptos_framework$_.coin$_.deposit$(std$_.signer$_.address_of$(to, $c), coin, $c, [$p[0]] as TypeTag[]);
  return;
}

export function create_new_pool$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_decimals: U64,
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
  let temp$1, temp$2, temp$3, temp$4, admin_addr, k2, lp_burn_cap, lp_mint_cap, m, n, x_deci_mult, x_decimals, xa, xb, y_deci_mult, y_decimals;
  admin_addr = std$_.signer$_.address_of$(admin, $c);
  if (!($.copy(admin_addr).hex() === MODULE_ADMIN.hex())) {
    throw $.abortCode(ERROR_NOT_CREATOR);
  }
  if (!!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), $.copy(admin_addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[1], $p[0]]), $.copy(admin_addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!aptos_framework$_.coin$_.is_coin_initialized$($c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(ERROR_COIN_NOT_INITIALIZED);
  }
  if (!aptos_framework$_.coin$_.is_coin_initialized$($c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(ERROR_COIN_NOT_INITIALIZED);
  }
  [lp_mint_cap, lp_burn_cap] = aptos_framework$_.coin$_.initialize$(admin, std$_.string$_.utf8$($.copy(lp_name), $c), std$_.string$_.utf8$($.copy(lp_symbol), $c), $.copy(lp_decimals), true, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  [xa, xb, m, n, k2] = piece_swap_math$_.compute_initialization_constants$($.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $c);
  x_decimals = aptos_framework$_.coin$_.decimals$($c, [$p[0]] as TypeTag[]);
  y_decimals = aptos_framework$_.coin$_.decimals$($c, [$p[1]] as TypeTag[]);
  if ($.copy(x_decimals).gt($.copy(y_decimals))) {
    [temp$3, temp$4] = [u128("1"), math$_.pow$(u128("10"), u8($.copy(x_decimals).sub($.copy(y_decimals))), $c)];
  }
  else{
    if ($.copy(y_decimals).gt($.copy(x_decimals))) {
      [temp$1, temp$2] = [math$_.pow$(u128("10"), u8($.copy(y_decimals).sub($.copy(x_decimals))), $c), u128("1")];
    }
    else{
      [temp$1, temp$2] = [u128("1"), u128("1")];
    }
    [temp$3, temp$4] = [temp$1, temp$2];
  }
  [x_deci_mult, y_deci_mult] = [temp$3, temp$4];
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), admin, new PieceSwapPoolInfo({ reserve_x: aptos_framework$_.coin$_.zero$($c, [$p[0]] as TypeTag[]), reserve_y: aptos_framework$_.coin$_.zero$($c, [$p[1]] as TypeTag[]), lp_amt: u64("0"), lp_mint_cap: $.copy(lp_mint_cap), lp_burn_cap: $.copy(lp_burn_cap), K: $.copy(k), K2: $.copy(k2), Xa: $.copy(xa), Xb: $.copy(xb), m: $.copy(m), n: $.copy(n), x_deci_mult: u64($.copy(x_deci_mult)), y_deci_mult: u64($.copy(y_deci_mult)), swap_fee_per_million: $.copy(swap_fee_per_million), protocol_fee_share_per_thousand: $.copy(protocol_fee_share_per_thousand), protocol_fee_x: aptos_framework$_.coin$_.zero$($c, [$p[0]] as TypeTag[]), protocol_fee_y: aptos_framework$_.coin$_.zero$($c, [$p[1]] as TypeTag[]) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]])));
  aptos_framework$_.coin$_.register_internal$(admin, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function mint_direct$ (
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): aptos_framework$_.coin$_.Coin {
  let lp_coin;
  lp_coin = aptos_framework$_.coin$_.mint$($.copy(amount), pool.lp_mint_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  pool.lp_amt = $.copy(pool.lp_amt).add($.copy(amount));
  return lp_coin;
}

export function mint_to$ (
  to: HexString,
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let lp_coin;
  lp_coin = mint_direct$($.copy(amount), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  check_and_deposit$(to, lp_coin, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function remove_liquidity$ (
  sender: HexString,
  remove_lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let actual_remove_x, actual_remove_y, current_x, current_y, opt_amt_x, opt_amt_y, pool, removed_x, removed_y;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(aptos_framework$_.coin$_.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(aptos_framework$_.coin$_.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y] = piece_swap_math$_.get_remove_liquidity_amounts$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(remove_lp_amt)), $c);
  actual_remove_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_remove_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  burn_from$(sender, $.copy(remove_lp_amt), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  removed_x = aptos_framework$_.coin$_.extract$(pool.reserve_x, $.copy(actual_remove_x), $c, [$p[0]] as TypeTag[]);
  removed_y = aptos_framework$_.coin$_.extract$(pool.reserve_y, $.copy(actual_remove_y), $c, [$p[1]] as TypeTag[]);
  check_and_deposit$(sender, removed_x, $c, [$p[0]] as TypeTag[]);
  check_and_deposit$(sender, removed_y, $c, [$p[1]] as TypeTag[]);
  return [$.copy(actual_remove_x), $.copy(actual_remove_y)];
}

export function remove_liquidity_direct$ (
  remove_lp: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [aptos_framework$_.coin$_.Coin, aptos_framework$_.coin$_.Coin] {
  let actual_remove_x, actual_remove_y, current_x, current_y, opt_amt_x, opt_amt_y, pool, remove_lp_amt, removed_x, removed_y;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(aptos_framework$_.coin$_.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(aptos_framework$_.coin$_.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  remove_lp_amt = aptos_framework$_.coin$_.value$(remove_lp, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  [opt_amt_x, opt_amt_y] = piece_swap_math$_.get_remove_liquidity_amounts$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(remove_lp_amt)), $c);
  actual_remove_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_remove_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  burn_direct$(remove_lp, pool, $c, [$p[0], $p[1]] as TypeTag[]);
  removed_x = aptos_framework$_.coin$_.extract$(pool.reserve_x, $.copy(actual_remove_x), $c, [$p[0]] as TypeTag[]);
  removed_y = aptos_framework$_.coin$_.extract$(pool.reserve_y, $.copy(actual_remove_y), $c, [$p[1]] as TypeTag[]);
  return [removed_x, removed_y];
}

export function swap_x_to_y$ (
  sender: HexString,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let coin_x, coin_y, value_y;
  coin_x = aptos_framework$_.coin$_.withdraw$(sender, $.copy(amount_x_in), $c, [$p[0]] as TypeTag[]);
  coin_y = swap_x_to_y_direct$(coin_x, $c, [$p[0], $p[1]] as TypeTag[]);
  value_y = aptos_framework$_.coin$_.value$(coin_y, $c, [$p[1]] as TypeTag[]);
  check_and_deposit$(sender, coin_y, $c, [$p[1]] as TypeTag[]);
  return $.copy(value_y);
}

export function swap_x_to_y_direct$ (
  coin_x: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): aptos_framework$_.coin$_.Coin {
  let actual_out_y, coin_y, current_x, current_y, input_x, opt_output_y, out_y_after_fees, pool, protocol_fee_y, protocol_fees, total_fees, x_value;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(aptos_framework$_.coin$_.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(aptos_framework$_.coin$_.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  x_value = u128(aptos_framework$_.coin$_.value$(coin_x, $c, [$p[0]] as TypeTag[]));
  aptos_framework$_.coin$_.merge$(pool.reserve_x, coin_x, $c, [$p[0]] as TypeTag[]);
  input_x = $.copy(x_value).mul(u128($.copy(pool.x_deci_mult)));
  opt_output_y = piece_swap_math$_.get_swap_x_to_y_out$($.copy(current_x), $.copy(current_y), $.copy(input_x), $.copy(pool.K), $.copy(pool.K2), $.copy(pool.Xa), $.copy(pool.Xb), $.copy(pool.m), $.copy(pool.n), $c);
  actual_out_y = u64($.copy(opt_output_y).div(u128($.copy(pool.y_deci_mult))));
  total_fees = $.copy(actual_out_y).mul($.copy(pool.swap_fee_per_million)).div(u64("1000000"));
  protocol_fees = $.copy(total_fees).mul($.copy(pool.protocol_fee_share_per_thousand)).div(u64("1000"));
  out_y_after_fees = $.copy(actual_out_y).sub($.copy(total_fees));
  coin_y = aptos_framework$_.coin$_.extract$(pool.reserve_y, $.copy(out_y_after_fees), $c, [$p[1]] as TypeTag[]);
  protocol_fee_y = aptos_framework$_.coin$_.extract$(pool.reserve_y, $.copy(protocol_fees), $c, [$p[1]] as TypeTag[]);
  aptos_framework$_.coin$_.merge$(pool.protocol_fee_y, protocol_fee_y, $c, [$p[1]] as TypeTag[]);
  return coin_y;
}

export function swap_y_to_x$ (
  sender: HexString,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let coin_x, coin_y, value_x;
  coin_y = aptos_framework$_.coin$_.withdraw$(sender, $.copy(amount_y_in), $c, [$p[1]] as TypeTag[]);
  coin_x = swap_y_to_x_direct$(coin_y, $c, [$p[0], $p[1]] as TypeTag[]);
  value_x = aptos_framework$_.coin$_.value$(coin_x, $c, [$p[0]] as TypeTag[]);
  check_and_deposit$(sender, coin_x, $c, [$p[0]] as TypeTag[]);
  return $.copy(value_x);
}

export function swap_y_to_x_direct$ (
  coin_y: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): aptos_framework$_.coin$_.Coin {
  let actual_out_x, coin_x, current_x, current_y, input_y, opt_output_x, out_x_after_fees, pool, protocol_fee_x, protocol_fees, total_fees, y_value;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "piece_swap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(aptos_framework$_.coin$_.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(aptos_framework$_.coin$_.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  y_value = u128(aptos_framework$_.coin$_.value$(coin_y, $c, [$p[1]] as TypeTag[]));
  aptos_framework$_.coin$_.merge$(pool.reserve_y, coin_y, $c, [$p[1]] as TypeTag[]);
  input_y = $.copy(y_value).mul(u128($.copy(pool.y_deci_mult)));
  opt_output_x = piece_swap_math$_.get_swap_y_to_x_out$($.copy(current_x), $.copy(current_y), $.copy(input_y), $.copy(pool.K), $.copy(pool.K2), $.copy(pool.Xa), $.copy(pool.Xb), $.copy(pool.m), $.copy(pool.n), $c);
  actual_out_x = u64($.copy(opt_output_x).div(u128($.copy(pool.x_deci_mult))));
  total_fees = $.copy(actual_out_x).mul($.copy(pool.swap_fee_per_million)).div(u64("1000000"));
  protocol_fees = $.copy(total_fees).mul($.copy(pool.protocol_fee_share_per_thousand)).div(u64("1000"));
  out_x_after_fees = $.copy(actual_out_x).sub($.copy(total_fees));
  protocol_fee_x = aptos_framework$_.coin$_.extract$(pool.reserve_x, $.copy(protocol_fees), $c, [$p[0]] as TypeTag[]);
  aptos_framework$_.coin$_.merge$(pool.protocol_fee_x, protocol_fee_x, $c, [$p[0]] as TypeTag[]);
  coin_x = aptos_framework$_.coin$_.extract$(pool.reserve_x, $.copy(out_x_after_fees), $c, [$p[0]] as TypeTag[]);
  return coin_x;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::piece_swap::PieceSwapPoolInfo", PieceSwapPoolInfo.PieceSwapPoolInfoParser);
}

