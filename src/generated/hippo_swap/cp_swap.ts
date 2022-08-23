import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Std from "../std";
import * as Cp_swap_utils from "./cp_swap_utils";
import * as Math from "./math";
import * as Safe_math from "./safe_math";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "cp_swap";

export const BALANCE_MAX : U128 = u128("5192296858534827628530496329220095");
export const ERROR_ALREADY_INITIALIZED : U64 = u64("1");
export const ERROR_ALREADY_LOCKED : U64 = u64("3");
export const ERROR_INSUFFICIENT_AMOUNT : U64 = u64("6");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT : U64 = u64("14");
export const ERROR_INSUFFICIENT_LIQUIDITY : U64 = u64("7");
export const ERROR_INSUFFICIENT_LIQUIDITY_BURNED : U64 = u64("10");
export const ERROR_INSUFFICIENT_LIQUIDITY_MINTED : U64 = u64("4");
export const ERROR_INSUFFICIENT_OUTPUT_AMOUNT : U64 = u64("13");
export const ERROR_INSUFFICIENT_TOKEN0_AMOUNT : U64 = u64("11");
export const ERROR_INSUFFICIENT_TOKEN1_AMOUNT : U64 = u64("12");
export const ERROR_INVALID_AMOUNT : U64 = u64("8");
export const ERROR_K : U64 = u64("15");
export const ERROR_NOT_CREATOR : U64 = u64("2");
export const ERROR_ONLY_ADMIN : U64 = u64("0");
export const ERROR_OVERFLOW : U64 = u64("5");
export const ERROR_TOKENS_NOT_SORTED : U64 = u64("9");
export const ERROR_X_NOT_REGISTERED : U64 = u64("16");
export const ERROR_Y_NOT_REGISTERED : U64 = u64("16");
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

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LPToken, typeParams);
    return result as unknown as LPToken;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, LPToken, typeParams);
    await result.loadFullState(app)
    return result as unknown as LPToken;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "LPToken", $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class TokenPairMetadata 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "TokenPairMetadata";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "locked", typeTag: AtomicTypeTag.Bool },
  { name: "creator", typeTag: AtomicTypeTag.Address },
  { name: "fee_to", typeTag: AtomicTypeTag.Address },
  { name: "fee_on", typeTag: AtomicTypeTag.Bool },
  { name: "k_last", typeTag: AtomicTypeTag.U128 },
  { name: "lp", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "balance_x", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "balance_y", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "burn_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "freeze_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "FreezeCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "cp_swap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) }];

  locked: boolean;
  creator: HexString;
  fee_to: HexString;
  fee_on: boolean;
  k_last: U128;
  lp: Aptos_framework.Coin.Coin;
  balance_x: Aptos_framework.Coin.Coin;
  balance_y: Aptos_framework.Coin.Coin;
  mint_cap: Aptos_framework.Coin.MintCapability;
  burn_cap: Aptos_framework.Coin.BurnCapability;
  freeze_cap: Aptos_framework.Coin.FreezeCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.locked = proto['locked'] as boolean;
    this.creator = proto['creator'] as HexString;
    this.fee_to = proto['fee_to'] as HexString;
    this.fee_on = proto['fee_on'] as boolean;
    this.k_last = proto['k_last'] as U128;
    this.lp = proto['lp'] as Aptos_framework.Coin.Coin;
    this.balance_x = proto['balance_x'] as Aptos_framework.Coin.Coin;
    this.balance_y = proto['balance_y'] as Aptos_framework.Coin.Coin;
    this.mint_cap = proto['mint_cap'] as Aptos_framework.Coin.MintCapability;
    this.burn_cap = proto['burn_cap'] as Aptos_framework.Coin.BurnCapability;
    this.freeze_cap = proto['freeze_cap'] as Aptos_framework.Coin.FreezeCapability;
  }

  static TokenPairMetadataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenPairMetadata {
    const proto = $.parseStructProto(data, typeTag, repo, TokenPairMetadata);
    return new TokenPairMetadata(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairMetadata, typeParams);
    return result as unknown as TokenPairMetadata;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, TokenPairMetadata, typeParams);
    await result.loadFullState(app)
    return result as unknown as TokenPairMetadata;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "TokenPairMetadata", $p);
  }
  async loadFullState(app: $.AppType) {
    await this.lp.loadFullState(app);
    await this.balance_x.loadFullState(app);
    await this.balance_y.loadFullState(app);
    await this.mint_cap.loadFullState(app);
    await this.burn_cap.loadFullState(app);
    await this.freeze_cap.loadFullState(app);
    this.__app = app;
  }


  quote_x_to_y_after_fees(
    amount_x_in: U64,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_x_to_y_after_fees_(this, amount_x_in, cache, tags);
  }

  quote_y_to_x_after_fees(
    amount_y_in: U64,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return quote_y_to_x_after_fees_(this, amount_y_in, cache, tags);
  }

}

export class TokenPairReserve 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "TokenPairReserve";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "reserve_x", typeTag: AtomicTypeTag.U64 },
  { name: "reserve_y", typeTag: AtomicTypeTag.U64 },
  { name: "block_timestamp_last", typeTag: AtomicTypeTag.U64 }];

  reserve_x: U64;
  reserve_y: U64;
  block_timestamp_last: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as U64;
    this.reserve_y = proto['reserve_y'] as U64;
    this.block_timestamp_last = proto['block_timestamp_last'] as U64;
  }

  static TokenPairReserveParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenPairReserve {
    const proto = $.parseStructProto(data, typeTag, repo, TokenPairReserve);
    return new TokenPairReserve(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairReserve, typeParams);
    return result as unknown as TokenPairReserve;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, TokenPairReserve, typeParams);
    await result.loadFullState(app)
    return result as unknown as TokenPairReserve;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "TokenPairReserve", $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function add_liquidity_ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, a_x, a_y, amount_x_optimal, amount_y_optimal, lp, lp_amount, reserve_x, reserve_y, sender_addr;
  [reserve_x, reserve_y, ] = get_reserves_($c, [$p[0], $p[1]]);
  if (($.copy(reserve_x)).eq((u64("0")))) {
    temp$1 = ($.copy(reserve_y)).eq((u64("0")));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    [temp$4, temp$5] = [$.copy(amount_x), $.copy(amount_y)];
  }
  else{
    amount_y_optimal = Cp_swap_utils.quote_($.copy(amount_x), $.copy(reserve_x), $.copy(reserve_y), $c);
    if (($.copy(amount_y_optimal)).le($.copy(amount_y))) {
      [temp$2, temp$3] = [$.copy(amount_x), $.copy(amount_y_optimal)];
    }
    else{
      amount_x_optimal = Cp_swap_utils.quote_($.copy(amount_y), $.copy(reserve_y), $.copy(reserve_x), $c);
      if (!($.copy(amount_x_optimal)).le($.copy(amount_x))) {
        throw $.abortCode($.copy(ERROR_INVALID_AMOUNT));
      }
      [temp$2, temp$3] = [$.copy(amount_x_optimal), $.copy(amount_y)];
    }
    [temp$4, temp$5] = [temp$2, temp$3];
  }
  [a_x, a_y] = [temp$4, temp$5];
  deposit_x_(Aptos_framework.Coin.withdraw_(sender, $.copy(a_x), $c, [$p[0]]), $c, [$p[0], $p[1]]);
  deposit_y_(Aptos_framework.Coin.withdraw_(sender, $.copy(a_y), $c, [$p[1]]), $c, [$p[0], $p[1]]);
  sender_addr = Std.Signer.address_of_(sender, $c);
  lp = mint_($c, [$p[0], $p[1]]);
  lp_amount = Aptos_framework.Coin.value_(lp, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  check_coin_store_(sender, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  Aptos_framework.Coin.deposit_($.copy(sender_addr), lp, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return [$.copy(a_x), $.copy(a_y), $.copy(lp_amount)];
}

export function add_liquidity_direct_ (
  x: Aptos_framework.Coin.Coin,
  y: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, a_x, a_y, amount_x, amount_x_optimal, amount_y, amount_y_optimal, left_x, left_y, reserve_x, reserve_y;
  amount_x = Aptos_framework.Coin.value_(x, $c, [$p[0]]);
  amount_y = Aptos_framework.Coin.value_(y, $c, [$p[1]]);
  [reserve_x, reserve_y, ] = get_reserves_($c, [$p[0], $p[1]]);
  if (($.copy(reserve_x)).eq((u64("0")))) {
    temp$1 = ($.copy(reserve_y)).eq((u64("0")));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    [temp$4, temp$5] = [$.copy(amount_x), $.copy(amount_y)];
  }
  else{
    amount_y_optimal = Cp_swap_utils.quote_($.copy(amount_x), $.copy(reserve_x), $.copy(reserve_y), $c);
    if (($.copy(amount_y_optimal)).le($.copy(amount_y))) {
      [temp$2, temp$3] = [$.copy(amount_x), $.copy(amount_y_optimal)];
    }
    else{
      amount_x_optimal = Cp_swap_utils.quote_($.copy(amount_y), $.copy(reserve_y), $.copy(reserve_x), $c);
      if (!($.copy(amount_x_optimal)).le($.copy(amount_x))) {
        throw $.abortCode($.copy(ERROR_INVALID_AMOUNT));
      }
      [temp$2, temp$3] = [$.copy(amount_x_optimal), $.copy(amount_y)];
    }
    [temp$4, temp$5] = [temp$2, temp$3];
  }
  [a_x, a_y] = [temp$4, temp$5];
  if (!($.copy(a_x)).le($.copy(amount_x))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_AMOUNT));
  }
  if (!($.copy(a_y)).le($.copy(amount_y))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_AMOUNT));
  }
  left_x = Aptos_framework.Coin.extract_(x, ($.copy(amount_x)).sub($.copy(a_x)), $c, [$p[0]]);
  left_y = Aptos_framework.Coin.extract_(y, ($.copy(amount_y)).sub($.copy(a_y)), $c, [$p[1]]);
  deposit_x_(x, $c, [$p[0], $p[1]]);
  deposit_y_(y, $c, [$p[0], $p[1]]);
  return [left_x, left_y, mint_($c, [$p[0], $p[1]])];
}

export function burn_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let temp$1, amount_x, amount_y, balance_x, balance_x__2, balance_y, balance_y__3, liquidity, metadata, reserves, total_lp_supply, w_x, w_y;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  if (!!$.copy(metadata.locked)) {
    throw $.abortCode($.copy(ERROR_ALREADY_LOCKED));
  }
  metadata.locked = true;
  reserves = $c.borrow_global_mut<TokenPairReserve>(new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  [balance_x, balance_y] = token_balances_metadata_(metadata, $c, [$p[0], $p[1]]);
  liquidity = Aptos_framework.Coin.value_(metadata.lp, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  mint_fee_($.copy(reserves.reserve_x), $.copy(reserves.reserve_y), metadata, $c, [$p[0], $p[1]]);
  total_lp_supply = total_lp_supply_($c, [$p[0], $p[1]]);
  amount_x = u64(Safe_math.div_(Safe_math.mul_(u128($.copy(balance_x)), u128($.copy(liquidity)), $c), u128($.copy(total_lp_supply)), $c));
  amount_y = u64(Safe_math.div_(Safe_math.mul_(u128($.copy(balance_y)), u128($.copy(liquidity)), $c), u128($.copy(total_lp_supply)), $c));
  if (($.copy(amount_x)).gt(u64("0"))) {
    temp$1 = ($.copy(amount_y)).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_LIQUIDITY_BURNED));
  }
  burn_lp_($.copy(liquidity), metadata, $c, [$p[0], $p[1]]);
  w_x = extract_x_($.copy(amount_x), metadata, $c, [$p[0], $p[1]]);
  w_y = extract_y_($.copy(amount_y), metadata, $c, [$p[0], $p[1]]);
  [balance_x__2, balance_y__3] = token_balances_metadata_(metadata, $c, [$p[0], $p[1]]);
  update_($.copy(balance_x__2), $.copy(balance_y__3), reserves, $c, [$p[0], $p[1]]);
  if ($.copy(metadata.fee_on)) {
    metadata.k_last = Safe_math.mul_(u128($.copy(reserves.reserve_x)), u128($.copy(reserves.reserve_y)), $c);
  }
  else{
  }
  metadata.locked = false;
  return [w_x, w_y];
}

export function burn_lp_ (
  amount: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  if (!(Aptos_framework.Coin.value_(metadata.lp, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])])).ge($.copy(amount))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_LIQUIDITY));
  }
  coins = Aptos_framework.Coin.extract_(metadata.lp, $.copy(amount), $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  Aptos_framework.Coin.burn_(coins, metadata.burn_cap, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function check_coin_store_ (
  sender: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X>*/
): void {
  if (!Aptos_framework.Coin.is_account_registered_(Std.Signer.address_of_(sender, $c), $c, [$p[0]])) {
    Aptos_framework.Coins.register_internal_(sender, $c, [$p[0]]);
  }
  else{
  }
  return;
}

export function create_token_pair_ (
  admin: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let burn_cap, freeze_cap, mint_cap, sender_addr;
  sender_addr = Std.Signer.address_of_(admin, $c);
  if (!(($.copy(sender_addr)).hex() === ($.copy(MODULE_ADMIN)).hex())) {
    throw $.abortCode($.copy(ERROR_NOT_CREATOR));
  }
  if (!!$c.exists(new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]), $.copy(sender_addr))) {
    throw $.abortCode($.copy(ERROR_ALREADY_INITIALIZED));
  }
  if (!!$c.exists(new SimpleStructTag(TokenPairReserve, [$p[1], $p[0]]), $.copy(sender_addr))) {
    throw $.abortCode($.copy(ERROR_ALREADY_INITIALIZED));
  }
  [burn_cap, freeze_cap, mint_cap] = Aptos_framework.Coin.initialize_(admin, Std.String.utf8_($.copy(lp_name), $c), Std.String.utf8_($.copy(lp_symbol), $c), $.copy(decimals), true, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  $c.move_to(new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]), admin, new TokenPairReserve({ reserve_x: u64("0"), reserve_y: u64("0"), block_timestamp_last: u64("0") }, new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]])));
  $c.move_to(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), admin, new TokenPairMetadata({ locked: false, creator: $.copy(sender_addr), fee_to: $.copy(fee_to), fee_on: fee_on, k_last: u128("0"), lp: Aptos_framework.Coin.zero_($c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]), balance_x: Aptos_framework.Coin.zero_($c, [$p[0]]), balance_y: Aptos_framework.Coin.zero_($c, [$p[1]]), mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap), freeze_cap: $.copy(freeze_cap) }, new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]])));
  Aptos_framework.Coins.register_internal_(admin, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function deposit_x_ (
  amount: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  Aptos_framework.Coin.merge_(metadata.balance_x, amount, $c, [$p[0]]);
  return;
}

export function deposit_y_ (
  amount: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  Aptos_framework.Coin.merge_(metadata.balance_y, amount, $c, [$p[1]]);
  return;
}

export function extract_x_ (
  amount: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  if (!(Aptos_framework.Coin.value_(metadata.balance_x, $c, [$p[0]])).gt($.copy(amount))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_AMOUNT));
  }
  return Aptos_framework.Coin.extract_(metadata.balance_x, $.copy(amount), $c, [$p[0]]);
}

export function extract_y_ (
  amount: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  if (!(Aptos_framework.Coin.value_(metadata.balance_y, $c, [$p[1]])).gt($.copy(amount))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_AMOUNT));
  }
  return Aptos_framework.Coin.extract_(metadata.balance_y, $.copy(amount), $c, [$p[1]]);
}

export function get_reserves_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let reserve;
  reserve = $c.borrow_global<TokenPairReserve>(new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  return [$.copy(reserve.reserve_x), $.copy(reserve.reserve_y), $.copy(reserve.block_timestamp_last)];
}

export function lp_balance_ (
  addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  return Aptos_framework.Coin.balance_($.copy(addr), $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
}

export function mint_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  let temp$1, amount_x, amount_y, balance_x, balance_y, l, liquidity, lp, metadata, reserves, total_supply;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  if (!!$.copy(metadata.locked)) {
    throw $.abortCode($.copy(ERROR_ALREADY_LOCKED));
  }
  metadata.locked = true;
  reserves = $c.borrow_global_mut<TokenPairReserve>(new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  [balance_x, balance_y] = token_balances_metadata_(metadata, $c, [$p[0], $p[1]]);
  amount_x = Safe_math.sub_(u128($.copy(balance_x)), u128($.copy(reserves.reserve_x)), $c);
  amount_y = Safe_math.sub_(u128($.copy(balance_y)), u128($.copy(reserves.reserve_y)), $c);
  mint_fee_($.copy(reserves.reserve_x), $.copy(reserves.reserve_y), metadata, $c, [$p[0], $p[1]]);
  total_supply = total_lp_supply_($c, [$p[0], $p[1]]);
  if (($.copy(total_supply)).eq((u128("0")))) {
    l = Safe_math.sub_(Math.sqrt_(Safe_math.mul_($.copy(amount_x), $.copy(amount_y), $c), $c), $.copy(MINIMUM_LIQUIDITY), $c);
    mint_lp_to_($.copy(MODULE_ADMIN), u64($.copy(MINIMUM_LIQUIDITY)), metadata.mint_cap, $c, [$p[0], $p[1]]);
    temp$1 = $.copy(l);
  }
  else{
    temp$1 = Math.min_(Safe_math.div_(Safe_math.mul_($.copy(amount_x), $.copy(total_supply), $c), u128($.copy(reserves.reserve_x)), $c), Safe_math.div_(Safe_math.mul_($.copy(amount_y), $.copy(total_supply), $c), u128($.copy(reserves.reserve_y)), $c), $c);
  }
  liquidity = temp$1;
  if (!($.copy(liquidity)).gt(u128("0"))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_LIQUIDITY_MINTED));
  }
  lp = mint_lp_(u64($.copy(liquidity)), metadata.mint_cap, $c, [$p[0], $p[1]]);
  update_($.copy(balance_x), $.copy(balance_y), reserves, $c, [$p[0], $p[1]]);
  if ($.copy(metadata.fee_on)) {
    metadata.k_last = Safe_math.mul_(u128($.copy(reserves.reserve_x)), u128($.copy(reserves.reserve_y)), $c);
  }
  else{
  }
  metadata.locked = false;
  return lp;
}

export function mint_fee_ (
  reservex: U64,
  reservey: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let denominator, liquidity, numerator, root_k, root_k_last, total_supply;
  if ($.copy(metadata.fee_on)) {
    if (($.copy(metadata.k_last)).neq(u128("0"))) {
      root_k = Math.sqrt_(Safe_math.mul_(u128($.copy(reservex)), u128($.copy(reservey)), $c), $c);
      root_k_last = Math.sqrt_($.copy(metadata.k_last), $c);
      if (($.copy(root_k)).gt($.copy(root_k_last))) {
        total_supply = u128(total_lp_supply_($c, [$p[0], $p[1]]));
        numerator = Safe_math.mul_($.copy(total_supply), Safe_math.sub_($.copy(root_k), $.copy(root_k_last), $c), $c);
        denominator = Safe_math.add_($.copy(root_k_last), Safe_math.mul_($.copy(root_k), u128("5"), $c), $c);
        liquidity = u64(Safe_math.div_($.copy(numerator), $.copy(denominator), $c));
        mint_lp_to_($.copy(metadata.fee_to), $.copy(liquidity), metadata.mint_cap, $c, [$p[0], $p[1]]);
      }
      else{
      }
    }
    else{
    }
  }
  else{
    if (($.copy(metadata.k_last)).neq(u128("0"))) {
      metadata.k_last = u128("0");
    }
    else{
    }
  }
  return;
}

export function mint_lp_ (
  amount: U64,
  mint_cap: Aptos_framework.Coin.MintCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): Aptos_framework.Coin.Coin {
  return Aptos_framework.Coin.mint_($.copy(amount), mint_cap, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
}

export function mint_lp_to_ (
  to: HexString,
  amount: U64,
  mint_cap: Aptos_framework.Coin.MintCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  coins = Aptos_framework.Coin.mint_($.copy(amount), mint_cap, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  Aptos_framework.Coin.deposit_($.copy(to), coins, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function quote_x_to_y_after_fees_ (
  pool: TokenPairMetadata,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let x_balance, y_balance;
  [x_balance, y_balance] = token_balances_metadata_(pool, $c, [$p[0], $p[1]]);
  return Cp_swap_utils.get_amount_out_($.copy(amount_x_in), $.copy(x_balance), $.copy(y_balance), $c);
}

export function quote_y_to_x_after_fees_ (
  pool: TokenPairMetadata,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let x_balance, y_balance;
  [x_balance, y_balance] = token_balances_metadata_(pool, $c, [$p[0], $p[1]]);
  return Cp_swap_utils.get_amount_out_($.copy(amount_y_in), $.copy(y_balance), $.copy(x_balance), $c);
}

export function register_account_ (
  sender: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  Aptos_framework.Coins.register_internal_(sender, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function remove_liquidity_ (
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let amount_x, amount_y, coins, coins_x, coins_y;
  coins = Aptos_framework.Coin.withdraw_(sender, $.copy(liquidity), $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  [coins_x, coins_y] = remove_liquidity_direct_(coins, $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]]);
  amount_x = Aptos_framework.Coin.value_(coins_x, $c, [$p[0]]);
  amount_y = Aptos_framework.Coin.value_(coins_y, $c, [$p[1]]);
  check_coin_store_(sender, $c, [$p[0]]);
  check_coin_store_(sender, $c, [$p[1]]);
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(sender, $c), coins_x, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(sender, $c), coins_y, $c, [$p[1]]);
  return [$.copy(amount_x), $.copy(amount_y)];
}

export function remove_liquidity_direct_ (
  liquidity: Aptos_framework.Coin.Coin,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let coins_x, coins_y;
  tranfer_lp_coin_in_(liquidity, $c, [$p[0], $p[1]]);
  [coins_x, coins_y] = burn_($c, [$p[0], $p[1]]);
  if (!(Aptos_framework.Coin.value_(coins_x, $c, [$p[0]])).ge($.copy(amount_x_min))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_TOKEN0_AMOUNT));
  }
  if (!(Aptos_framework.Coin.value_(coins_y, $c, [$p[1]])).ge($.copy(amount_y_min))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_TOKEN1_AMOUNT));
  }
  return [coins_x, coins_y];
}

export function swap_ (
  amount_x_out: U64,
  amount_y_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, amount_x_in, amount_y_in, balance_x, balance_x_adjusted, balance_y, balance_y_adjusted, coins_x_out, coins_y_out, k, metadata, reserves;
  if (($.copy(amount_x_out)).gt(u64("0"))) {
    temp$1 = true;
  }
  else{
    temp$1 = ($.copy(amount_y_out)).gt(u64("0"));
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_OUTPUT_AMOUNT));
  }
  reserves = $c.borrow_global_mut<TokenPairReserve>(new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  if (($.copy(amount_x_out)).lt($.copy(reserves.reserve_x))) {
    temp$2 = ($.copy(amount_y_out)).lt($.copy(reserves.reserve_y));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_LIQUIDITY));
  }
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  if (!!$.copy(metadata.locked)) {
    throw $.abortCode($.copy(ERROR_ALREADY_LOCKED));
  }
  metadata.locked = true;
  coins_x_out = Aptos_framework.Coin.zero_($c, [$p[0]]);
  coins_y_out = Aptos_framework.Coin.zero_($c, [$p[1]]);
  if (($.copy(amount_x_out)).gt(u64("0"))) {
    Aptos_framework.Coin.merge_(coins_x_out, extract_x_($.copy(amount_x_out), metadata, $c, [$p[0], $p[1]]), $c, [$p[0]]);
  }
  else{
  }
  if (($.copy(amount_y_out)).gt(u64("0"))) {
    Aptos_framework.Coin.merge_(coins_y_out, extract_y_($.copy(amount_y_out), metadata, $c, [$p[0], $p[1]]), $c, [$p[1]]);
  }
  else{
  }
  [balance_x, balance_y] = token_balances_metadata_(metadata, $c, [$p[0], $p[1]]);
  if (($.copy(balance_x)).gt(($.copy(reserves.reserve_x)).sub($.copy(amount_x_out)))) {
    temp$3 = ($.copy(balance_x)).sub(($.copy(reserves.reserve_x)).sub($.copy(amount_x_out)));
  }
  else{
    temp$3 = u64("0");
  }
  amount_x_in = temp$3;
  if (($.copy(balance_y)).gt(($.copy(reserves.reserve_y)).sub($.copy(amount_y_out)))) {
    temp$4 = ($.copy(balance_y)).sub(($.copy(reserves.reserve_y)).sub($.copy(amount_y_out)));
  }
  else{
    temp$4 = u64("0");
  }
  amount_y_in = temp$4;
  if (($.copy(amount_x_in)).gt(u64("0"))) {
    temp$5 = true;
  }
  else{
    temp$5 = ($.copy(amount_y_in)).gt(u64("0"));
  }
  if (!temp$5) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_INPUT_AMOUNT));
  }
  balance_x_adjusted = Safe_math.sub_(Safe_math.mul_(u128($.copy(balance_x)), u128("1000"), $c), Safe_math.mul_(u128($.copy(amount_x_in)), u128("3"), $c), $c);
  balance_y_adjusted = Safe_math.sub_(Safe_math.mul_(u128($.copy(balance_y)), u128("1000"), $c), Safe_math.mul_(u128($.copy(amount_y_in)), u128("3"), $c), $c);
  k = Safe_math.mul_(u128("1000000"), Safe_math.mul_(u128($.copy(reserves.reserve_x)), u128($.copy(reserves.reserve_y)), $c), $c);
  if (!(Safe_math.mul_($.copy(balance_x_adjusted), $.copy(balance_y_adjusted), $c)).ge($.copy(k))) {
    throw $.abortCode($.copy(ERROR_K));
  }
  update_($.copy(balance_x), $.copy(balance_y), reserves, $c, [$p[0], $p[1]]);
  metadata.locked = false;
  return [coins_x_out, coins_y_out];
}

export function swap_x_to_exact_y_ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let amount_out, coins, coins_x_out, coins_y_out;
  coins = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_in), $c, [$p[0]]);
  [coins_x_out, coins_y_out] = swap_x_to_exact_y_direct_(coins, $c, [$p[0], $p[1]]);
  amount_out = Aptos_framework.Coin.value_(coins_y_out, $c, [$p[1]]);
  check_coin_store_(sender, $c, [$p[1]]);
  Aptos_framework.Coin.deposit_($.copy(to), coins_x_out, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to), coins_y_out, $c, [$p[1]]);
  return $.copy(amount_out);
}

export function swap_x_to_exact_y_direct_ (
  coins_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let amount_in, amount_out, coins_x_out, coins_y_out, rin, rout;
  amount_in = Aptos_framework.Coin.value_(coins_in, $c, [$p[0]]);
  deposit_x_(coins_in, $c, [$p[0], $p[1]]);
  [rin, rout, ] = get_reserves_($c, [$p[0], $p[1]]);
  amount_out = Cp_swap_utils.get_amount_out_($.copy(amount_in), $.copy(rin), $.copy(rout), $c);
  [coins_x_out, coins_y_out] = swap_(u64("0"), $.copy(amount_out), $c, [$p[0], $p[1]]);
  if (!(Aptos_framework.Coin.value_(coins_x_out, $c, [$p[0]])).eq((u64("0")))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_OUTPUT_AMOUNT));
  }
  return [coins_x_out, coins_y_out];
}

export function swap_y_to_exact_x_ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let amount_out, coins, coins_x_out, coins_y_out;
  coins = Aptos_framework.Coin.withdraw_(sender, $.copy(amount_in), $c, [$p[1]]);
  [coins_x_out, coins_y_out] = swap_y_to_exact_x_direct_(coins, $c, [$p[0], $p[1]]);
  amount_out = Aptos_framework.Coin.value_(coins_x_out, $c, [$p[0]]);
  check_coin_store_(sender, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to), coins_x_out, $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to), coins_y_out, $c, [$p[1]]);
  return $.copy(amount_out);
}

export function swap_y_to_exact_x_direct_ (
  coins_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [Aptos_framework.Coin.Coin, Aptos_framework.Coin.Coin] {
  let amount_in, amount_out, coins_x_out, coins_y_out, rin, rout;
  amount_in = Aptos_framework.Coin.value_(coins_in, $c, [$p[1]]);
  deposit_y_(coins_in, $c, [$p[0], $p[1]]);
  [rout, rin, ] = get_reserves_($c, [$p[0], $p[1]]);
  amount_out = Cp_swap_utils.get_amount_out_($.copy(amount_in), $.copy(rin), $.copy(rout), $c);
  [coins_x_out, coins_y_out] = swap_($.copy(amount_out), u64("0"), $c, [$p[0], $p[1]]);
  if (!(Aptos_framework.Coin.value_(coins_y_out, $c, [$p[1]])).eq((u64("0")))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_OUTPUT_AMOUNT));
  }
  return [coins_x_out, coins_y_out];
}

export function token_balances_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let meta;
  meta = $c.borrow_global<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), $.copy(MODULE_ADMIN));
  return token_balances_metadata_(meta, $c, [$p[0], $p[1]]);
}

export function token_balances_metadata_ (
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  return [Aptos_framework.Coin.value_(metadata.balance_x, $c, [$p[0]]), Aptos_framework.Coin.value_(metadata.balance_y, $c, [$p[1]])];
}

export function total_lp_supply_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U128 {
  let temp$1;
  temp$1 = Aptos_framework.Coin.supply_($c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return Std.Option.get_with_default_(temp$1, u128("0"), $c, [AtomicTypeTag.U128]);
}

export function tranfer_lp_coin_in_ (
  coins: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new SimpleStructTag(TokenPairMetadata, [$p[0], $p[1]]), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  Aptos_framework.Coin.merge_(metadata.lp, coins, $c, [new SimpleStructTag(LPToken, [$p[0], $p[1]])]);
  return;
}

export function transfer_x_ (
  amount: U64,
  recipient: HexString,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  coins = extract_x_($.copy(amount), metadata, $c, [$p[0], $p[1]]);
  Aptos_framework.Coin.deposit_($.copy(recipient), coins, $c, [$p[0]]);
  return;
}

export function transfer_y_ (
  amount: U64,
  recipient: HexString,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  coins = extract_y_($.copy(amount), metadata, $c, [$p[0], $p[1]]);
  Aptos_framework.Coin.deposit_($.copy(recipient), coins, $c, [$p[1]]);
  return;
}

export function update_ (
  balance_x: U64,
  balance_y: U64,
  reserve: TokenPairReserve,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, block_timestamp;
  if ((u128($.copy(balance_x))).le($.copy(BALANCE_MAX))) {
    temp$1 = (u128($.copy(balance_y))).le($.copy(BALANCE_MAX));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERROR_OVERFLOW));
  }
  block_timestamp = (Aptos_framework.Timestamp.now_seconds_($c)).mod(u64("4294967295"));
  reserve.reserve_x = $.copy(balance_x);
  reserve.reserve_y = $.copy(balance_y);
  reserve.block_timestamp_last = $.copy(block_timestamp);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_swap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_swap::TokenPairMetadata", TokenPairMetadata.TokenPairMetadataParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::cp_swap::TokenPairReserve", TokenPairReserve.TokenPairReserveParser);
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
  async loadLPToken(
    owner: HexString,
    $p: TypeTag[], /* <X, Y> */
    loadFull=true,
  ) {
    const val = await LPToken.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get TokenPairMetadata() { return TokenPairMetadata; }
  async loadTokenPairMetadata(
    owner: HexString,
    $p: TypeTag[], /* <X, Y> */
    loadFull=true,
  ) {
    const val = await TokenPairMetadata.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get TokenPairReserve() { return TokenPairReserve; }
  async loadTokenPairReserve(
    owner: HexString,
    $p: TypeTag[], /* <X, Y> */
    loadFull=true,
  ) {
    const val = await TokenPairReserve.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
}

