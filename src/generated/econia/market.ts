import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {OptionTransaction} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Stdlib from "../stdlib";
import * as Critbit from "./critbit";
import * as Open_table from "./open_table";
import * as Order_id from "./order_id";
import * as Registry from "./registry";
import * as User from "./user";
export const packageName = "Econia";
export const moduleAddress = new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778");
export const moduleName = "market";

export const ASK : boolean = true;
export const BID : boolean = false;
export const BUY : boolean = true;
export const E_BOTH_COINS : U64 = u64("18");
export const E_INBOUND_ASSET_OVERFLOW : U64 = u64("9");
export const E_INVALID_BASE : U64 = u64("14");
export const E_INVALID_CUSTODIAN : U64 = u64("7");
export const E_INVALID_OPTION_BASE : U64 = u64("16");
export const E_INVALID_OPTION_QUOTE : U64 = u64("17");
export const E_INVALID_QUOTE : U64 = u64("15");
export const E_INVALID_USER : U64 = u64("6");
export const E_LIMIT_PRICE_0 : U64 = u64("13");
export const E_MIN_BASE_EXCEEDS_MAX : U64 = u64("11");
export const E_MIN_LOTS_NOT_FILLED : U64 = u64("3");
export const E_MIN_QUOTE_EXCEEDS_MAX : U64 = u64("12");
export const E_MIN_TICKS_NOT_FILLED : U64 = u64("4");
export const E_NOT_ENOUGH_OUTBOUND_ASSET : U64 = u64("10");
export const E_NO_ORDER : U64 = u64("5");
export const E_NO_ORDER_BOOK : U64 = u64("2");
export const E_NO_ORDER_BOOKS : U64 = u64("1");
export const E_ORDER_BOOK_EXISTS : U64 = u64("0");
export const E_POST_OR_ABORT_CROSSED_SPREAD : U64 = u64("8");
export const E_SIZE_BASE_OVERFLOW : U64 = u64("20");
export const E_SIZE_QUOTE_OVERFLOW : U64 = u64("22");
export const E_SIZE_TICKS_OVERFLOW : U64 = u64("21");
export const E_TOO_MANY_ORDER_FLAGS : U64 = u64("19");
export const HI_64 : U64 = u64("18446744073709551615");
export const LEFT : boolean = true;
export const MAX_BID_DEFAULT : U128 = u128("0");
export const MIN_ASK_DEFAULT : U128 = u128("340282366920938463463374607431768211455");
export const NO_CUSTODIAN : U64 = u64("0");
export const PURE_COIN_PAIR : U64 = u64("0");
export const RIGHT : boolean = false;
export const SELL : boolean = false;


export class Order 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Order";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "size", typeTag: AtomicTypeTag.U64 },
  { name: "user", typeTag: AtomicTypeTag.Address },
  { name: "general_custodian_id", typeTag: AtomicTypeTag.U64 }];

  size: U64;
  user: HexString;
  general_custodian_id: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.size = proto['size'] as U64;
    this.user = proto['user'] as HexString;
    this.general_custodian_id = proto['general_custodian_id'] as U64;
  }

  static OrderParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Order {
    const proto = $.parseStructProto(data, typeTag, repo, Order);
    return new Order(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Order", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class OrderBook 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "OrderBook";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "base_type_info", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "quote_type_info", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "lot_size", typeTag: AtomicTypeTag.U64 },
  { name: "tick_size", typeTag: AtomicTypeTag.U64 },
  { name: "generic_asset_transfer_custodian_id", typeTag: AtomicTypeTag.U64 },
  { name: "asks", typeTag: new StructTag(new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"), "critbit", "CritBitTree", [new StructTag(new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"), "market", "Order", [])]) },
  { name: "bids", typeTag: new StructTag(new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"), "critbit", "CritBitTree", [new StructTag(new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"), "market", "Order", [])]) },
  { name: "min_ask", typeTag: AtomicTypeTag.U128 },
  { name: "max_bid", typeTag: AtomicTypeTag.U128 },
  { name: "counter", typeTag: AtomicTypeTag.U64 }];

  base_type_info: Stdlib.Type_info.TypeInfo;
  quote_type_info: Stdlib.Type_info.TypeInfo;
  lot_size: U64;
  tick_size: U64;
  generic_asset_transfer_custodian_id: U64;
  asks: Critbit.CritBitTree;
  bids: Critbit.CritBitTree;
  min_ask: U128;
  max_bid: U128;
  counter: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.base_type_info = proto['base_type_info'] as Stdlib.Type_info.TypeInfo;
    this.quote_type_info = proto['quote_type_info'] as Stdlib.Type_info.TypeInfo;
    this.lot_size = proto['lot_size'] as U64;
    this.tick_size = proto['tick_size'] as U64;
    this.generic_asset_transfer_custodian_id = proto['generic_asset_transfer_custodian_id'] as U64;
    this.asks = proto['asks'] as Critbit.CritBitTree;
    this.bids = proto['bids'] as Critbit.CritBitTree;
    this.min_ask = proto['min_ask'] as U128;
    this.max_bid = proto['max_bid'] as U128;
    this.counter = proto['counter'] as U64;
  }

  static OrderBookParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OrderBook {
    const proto = $.parseStructProto(data, typeTag, repo, OrderBook);
    return new OrderBook(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "OrderBook", []);
  }
  async loadFullState(app: $.AppType) {
    await this.base_type_info.loadFullState(app);
    await this.quote_type_info.loadFullState(app);
    await this.asks.loadFullState(app);
    await this.bids.loadFullState(app);
    this.__app = app;
  }


  orders_vector(
    side: boolean,
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return orders_vector_(this, side, cache);
  }

  orders_vectors(
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return orders_vectors_(this, cache);
  }

  price_levels_vectors(
  ) {
    const cache = this.__app?.cache || new AptosLocalCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return price_levels_vectors_(this, cache);
  }

}

export class OrderBooks 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "OrderBooks";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "map", typeTag: new StructTag(new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"), "open_table", "OpenTable", [AtomicTypeTag.U64, new StructTag(new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"), "market", "OrderBook", [])]) }];

  map: Open_table.OpenTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.map = proto['map'] as Open_table.OpenTable;
  }

  static OrderBooksParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OrderBooks {
    const proto = $.parseStructProto(data, typeTag, repo, OrderBooks);
    return new OrderBooks(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OrderBooks, typeParams);
    return result as unknown as OrderBooks;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, OrderBooks, typeParams);
    await result.loadFullState(app)
    return result as unknown as OrderBooks;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "OrderBooks", []);
  }
  async loadFullState(app: $.AppType) {
    await this.map.loadFullState(app);
    this.__app = app;
  }

}

export class PriceLevel 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PriceLevel";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "price", typeTag: AtomicTypeTag.U64 },
  { name: "size", typeTag: AtomicTypeTag.U64 }];

  price: U64;
  size: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.price = proto['price'] as U64;
    this.size = proto['size'] as U64;
  }

  static PriceLevelParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PriceLevel {
    const proto = $.parseStructProto(data, typeTag, repo, PriceLevel);
    return new PriceLevel(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PriceLevel", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class SimpleOrder 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "SimpleOrder";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "price", typeTag: AtomicTypeTag.U64 },
  { name: "size", typeTag: AtomicTypeTag.U64 }];

  price: U64;
  size: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.price = proto['price'] as U64;
    this.size = proto['size'] as U64;
  }

  static SimpleOrderParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SimpleOrder {
    const proto = $.parseStructProto(data, typeTag, repo, SimpleOrder);
    return new SimpleOrder(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "SimpleOrder", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function cancel_all_limit_orders_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  general_custodian_id: U64,
  side: boolean,
  $c: AptosDataCache,
): void {
  let market_account_id, n_orders, order_id_nearest_spread;
  market_account_id = User.get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c);
  n_orders = User.get_n_orders_internal_($.copy(user), $.copy(market_account_id), side, $c);
  while (($.copy(n_orders)).gt(u64("0"))) {
    {
      order_id_nearest_spread = User.get_order_id_nearest_spread_internal_($.copy(user), $.copy(market_account_id), side, $c);
      cancel_limit_order_($.copy(user), $.copy(host), $.copy(market_id), $.copy(general_custodian_id), side, $.copy(order_id_nearest_spread), $c);
      n_orders = ($.copy(n_orders)).sub(u64("1"));
    }

  }return;
}

export function cancel_all_limit_orders_custodian_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  side: boolean,
  general_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
): void {
  cancel_all_limit_orders_($.copy(user), $.copy(host), $.copy(market_id), Registry.custodian_id_(general_custodian_capability_ref, $c), side, $c);
  return;
}

export function cancel_all_limit_orders_user_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  side: boolean,
  $c: AptosDataCache,
): void {
  cancel_all_limit_orders_(Stdlib.Signer.address_of_(user, $c), $.copy(host), $.copy(market_id), $.copy(NO_CUSTODIAN), side, $c);
  return;
}


export function buildPayload_cancel_all_limit_orders_user (
  host: HexString,
  market_id: U64,
  side: boolean,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"),
    "market",
    "cancel_all_limit_orders_user",
    typeParamStrings,
    [
      host,
      market_id,
      side,
    ],
    isJSON,
  );

}

export function cancel_limit_order_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  general_custodian_id: U64,
  side: boolean,
  order_id: U128,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, lot_size, market_account_id, order_book_ref_mut, order_books_map_ref_mut, tick_size, tree_ref_mut;
  verify_order_book_exists_($.copy(host), $.copy(market_id), $c);
  order_books_map_ref_mut = $c.borrow_global_mut<OrderBooks>(new SimpleStructTag(OrderBooks), $.copy(host)).map;
  order_book_ref_mut = Open_table.borrow_mut_(order_books_map_ref_mut, $.copy(market_id), $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)]);
  if ((side == $.copy(ASK))) {
    temp$1 = order_book_ref_mut.asks;
  }
  else{
    temp$1 = order_book_ref_mut.bids;
  }
  tree_ref_mut = temp$1;
  [temp$2, temp$3] = [tree_ref_mut, $.copy(order_id)];
  if (!Critbit.has_key_(temp$2, temp$3, $c, [new SimpleStructTag(Order)])) {
    throw $.abortCode($.copy(E_NO_ORDER));
  }
  let { user: order_user, general_custodian_id: order_general_custodian_id } = Critbit.pop_(tree_ref_mut, $.copy(order_id), $c, [new SimpleStructTag(Order)]);
  if (!(($.copy(user)).hex() === ($.copy(order_user)).hex())) {
    throw $.abortCode($.copy(E_INVALID_USER));
  }
  if (!($.copy(general_custodian_id)).eq(($.copy(order_general_custodian_id)))) {
    throw $.abortCode($.copy(E_INVALID_CUSTODIAN));
  }
  if ((side == $.copy(ASK))) {
    temp$4 = ($.copy(order_id)).eq(($.copy(order_book_ref_mut.min_ask)));
  }
  else{
    temp$4 = false;
  }
  if (temp$4) {
    if (Critbit.is_empty_(tree_ref_mut, $c, [new SimpleStructTag(Order)])) {
      temp$5 = $.copy(MIN_ASK_DEFAULT);
    }
    else{
      temp$5 = Critbit.min_key_(tree_ref_mut, $c, [new SimpleStructTag(Order)]);
    }
    order_book_ref_mut.min_ask = temp$5;
  }
  else{
    if ((side == $.copy(BID))) {
      temp$6 = ($.copy(order_id)).eq(($.copy(order_book_ref_mut.max_bid)));
    }
    else{
      temp$6 = false;
    }
    if (temp$6) {
      if (Critbit.is_empty_(tree_ref_mut, $c, [new SimpleStructTag(Order)])) {
        temp$7 = $.copy(MAX_BID_DEFAULT);
      }
      else{
        temp$7 = Critbit.max_key_(tree_ref_mut, $c, [new SimpleStructTag(Order)]);
      }
      order_book_ref_mut.max_bid = temp$7;
    }
    else{
    }
  }
  [market_account_id, lot_size, tick_size] = [User.get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c), $.copy(order_book_ref_mut.lot_size), $.copy(order_book_ref_mut.tick_size)];
  User.remove_order_internal_($.copy(user), $.copy(market_account_id), $.copy(lot_size), $.copy(tick_size), side, $.copy(order_id), $c);
  return;
}

export function cancel_limit_order_custodian_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  side: boolean,
  order_id: U128,
  general_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
): void {
  cancel_limit_order_($.copy(user), $.copy(host), $.copy(market_id), Registry.custodian_id_(general_custodian_capability_ref, $c), side, $.copy(order_id), $c);
  return;
}

export function cancel_limit_order_user_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  side: boolean,
  order_id: U128,
  $c: AptosDataCache,
): void {
  cancel_limit_order_(Stdlib.Signer.address_of_(user, $c), $.copy(host), $.copy(market_id), $.copy(NO_CUSTODIAN), side, $.copy(order_id), $c);
  return;
}


export function buildPayload_cancel_limit_order_user (
  host: HexString,
  market_id: U64,
  side: boolean,
  order_id: U128,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"),
    "market",
    "cancel_limit_order_user",
    typeParamStrings,
    [
      host,
      market_id,
      side,
      order_id,
    ],
    isJSON,
  );

}

export function get_counter_ (
  order_book_ref_mut: OrderBook,
  $c: AptosDataCache,
): U64 {
  let count, counter_ref_mut;
  counter_ref_mut = order_book_ref_mut.counter;
  count = $.copy(counter_ref_mut);
  $.set(counter_ref_mut, ($.copy(count)).add(u64("1")));
  return $.copy(count);
}

export function match_ (
  market_id_ref: U64,
  order_book_ref_mut: OrderBook,
  lot_size_ref: U64,
  tick_size_ref: U64,
  direction_ref: boolean,
  min_lots_ref: U64,
  max_lots_ref: U64,
  min_ticks_ref: U64,
  max_ticks_ref: U64,
  limit_price_ref: U64,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  lots_filled_ref_mut: U64,
  ticks_filled_ref_mut: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let lots_until_max, n_orders, side, spread_maker_ref_mut, ticks_until_max, traversal_direction, tree_ref_mut;
  [lots_until_max, ticks_until_max, side, tree_ref_mut, spread_maker_ref_mut, n_orders, traversal_direction] = match_init_(order_book_ref_mut, direction_ref, max_lots_ref, max_ticks_ref, $c, [$p[0], $p[1]]);
  if (($.copy(n_orders)).neq(u64("0"))) {
    match_loop_(market_id_ref, tree_ref_mut, side, lot_size_ref, tick_size_ref, lots_until_max, ticks_until_max, limit_price_ref, n_orders, spread_maker_ref_mut, traversal_direction, optional_base_coins_ref_mut, optional_quote_coins_ref_mut, $c, [$p[0], $p[1]]);
  }
  else{
  }
  match_verify_fills_(min_lots_ref, max_lots_ref, min_ticks_ref, max_ticks_ref, lots_until_max, ticks_until_max, lots_filled_ref_mut, ticks_filled_ref_mut, $c);
  return;
}

export function match_from_market_account_ (
  user_ref: HexString,
  market_account_id_ref: U128,
  market_id_ref: U64,
  order_book_ref_mut: OrderBook,
  direction_ref: boolean,
  min_base_ref: U64,
  max_base_ref: U64,
  min_quote_ref: U64,
  max_quote_ref: U64,
  limit_price_ref: U64,
  lots_filled_ref_mut: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, base_available, base_ceiling, base_on_hand, base_to_withdraw, lot_size, optional_base_coins, optional_quote_coins, quote_available, quote_ceiling, quote_on_hand, quote_to_withdraw, tick_size, ticks_filled;
  lot_size = $.copy(order_book_ref_mut.lot_size);
  tick_size = $.copy(order_book_ref_mut.tick_size);
  [, base_available, base_ceiling, , quote_available, quote_ceiling] = User.get_asset_counts_internal_($.copy(user_ref), $.copy(market_account_id_ref), $c);
  match_range_check_fills_(direction_ref, min_base_ref, max_base_ref, min_quote_ref, max_quote_ref, base_available, base_ceiling, quote_available, quote_ceiling, $c);
  if (($.copy(direction_ref) == $.copy(BUY))) {
    [temp$1, temp$2] = [u64("0"), $.copy(max_quote_ref)];
  }
  else{
    [temp$1, temp$2] = [$.copy(max_base_ref), u64("0")];
  }
  [base_to_withdraw, quote_to_withdraw] = [temp$1, temp$2];
  [optional_base_coins, optional_quote_coins] = User.withdraw_assets_as_option_internal_($.copy(user_ref), $.copy(market_account_id_ref), $.copy(base_to_withdraw), $.copy(quote_to_withdraw), $.copy(order_book_ref_mut.generic_asset_transfer_custodian_id), $c, [$p[0], $p[1]]);
  ticks_filled = u64("0");
  temp$14 = market_id_ref;
  temp$13 = order_book_ref_mut;
  temp$12 = lot_size;
  temp$11 = tick_size;
  temp$10 = direction_ref;
  temp$8 = ($.copy(min_base_ref)).div($.copy(lot_size));
  temp$9 = temp$8;
  temp$6 = ($.copy(max_base_ref)).div($.copy(lot_size));
  temp$7 = temp$6;
  temp$4 = ($.copy(min_quote_ref)).div($.copy(tick_size));
  temp$5 = temp$4;
  temp$3 = ($.copy(max_quote_ref)).div($.copy(tick_size));
  match_(temp$14, temp$13, temp$12, temp$11, temp$10, temp$9, temp$7, temp$5, temp$3, limit_price_ref, optional_base_coins, optional_quote_coins, lots_filled_ref_mut, ticks_filled, $c, [$p[0], $p[1]]);
  if (($.copy(direction_ref) == $.copy(BUY))) {
    [temp$15, temp$16] = [($.copy(lots_filled_ref_mut)).mul($.copy(lot_size)), ($.copy(max_quote_ref)).sub(($.copy(ticks_filled)).mul($.copy(tick_size)))];
  }
  else{
    [temp$15, temp$16] = [($.copy(max_base_ref)).sub(($.copy(lots_filled_ref_mut)).mul($.copy(lot_size))), ($.copy(ticks_filled)).mul($.copy(tick_size))];
  }
  [base_on_hand, quote_on_hand] = [temp$15, temp$16];
  User.deposit_assets_as_option_internal_($.copy(user_ref), $.copy(market_account_id_ref), $.copy(base_on_hand), $.copy(quote_on_hand), optional_base_coins, optional_quote_coins, $.copy(order_book_ref_mut.generic_asset_transfer_custodian_id), $c, [$p[0], $p[1]]);
  return;
}

export function match_init_ (
  order_book_ref_mut: OrderBook,
  direction_ref: boolean,
  max_lots_ref: U64,
  max_ticks_ref: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): [U64, U64, boolean, Critbit.CritBitTree, U128, U64, boolean] {
  let temp$1, temp$2, temp$3, temp$4, n_orders, side, spread_maker_ref_mut, traversal_direction, tree_ref_mut;
  if (!$.deep_eq(Stdlib.Type_info.type_of_($c, [$p[0]]), $.copy(order_book_ref_mut.base_type_info))) {
    throw $.abortCode($.copy(E_INVALID_BASE));
  }
  if (!$.deep_eq(Stdlib.Type_info.type_of_($c, [$p[1]]), $.copy(order_book_ref_mut.quote_type_info))) {
    throw $.abortCode($.copy(E_INVALID_QUOTE));
  }
  if (($.copy(direction_ref) == $.copy(BUY))) {
    [temp$1, temp$2, temp$3, temp$4] = [$.copy(ASK), order_book_ref_mut.asks, order_book_ref_mut.min_ask, $.copy(RIGHT)];
  }
  else{
    [temp$1, temp$2, temp$3, temp$4] = [$.copy(BID), order_book_ref_mut.bids, order_book_ref_mut.max_bid, $.copy(LEFT)];
  }
  [side, tree_ref_mut, spread_maker_ref_mut, traversal_direction] = [temp$1, temp$2, temp$3, temp$4];
  n_orders = Critbit.length_(tree_ref_mut, $c, [new SimpleStructTag(Order)]);
  return [$.copy(max_lots_ref), $.copy(max_ticks_ref), side, tree_ref_mut, spread_maker_ref_mut, $.copy(n_orders), traversal_direction];
}

export function match_loop_ (
  market_id_ref: U64,
  tree_ref_mut: Critbit.CritBitTree,
  side_ref: boolean,
  lot_size_ref: U64,
  tick_size_ref: U64,
  lots_until_max_ref_mut: U64,
  ticks_until_max_ref_mut: U64,
  limit_price_ref: U64,
  n_orders_ref_mut: U64,
  spread_maker_ref_mut: U128,
  traversal_direction_ref: boolean,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let complete_target_fill, new_spread_maker, should_break, should_pop_last, target_child_index, target_order_id, target_order_ref_mut, target_parent_index;
  [target_order_id, target_order_ref_mut, target_parent_index, target_child_index, complete_target_fill, should_pop_last, new_spread_maker] = match_loop_init_(tree_ref_mut, traversal_direction_ref, $c);
  while (true) {
    match_loop_order_(market_id_ref, side_ref, lot_size_ref, tick_size_ref, lots_until_max_ref_mut, ticks_until_max_ref_mut, limit_price_ref, target_order_id, target_order_ref_mut, complete_target_fill, optional_base_coins_ref_mut, optional_quote_coins_ref_mut, $c, [$p[0], $p[1]]);
    [target_order_id, target_order_ref_mut, should_break] = match_loop_order_follow_up_(tree_ref_mut, side_ref, traversal_direction_ref, n_orders_ref_mut, complete_target_fill, should_pop_last, $.copy(target_order_id), target_parent_index, target_child_index, new_spread_maker, $c);
    if (should_break) {
      match_loop_break_(spread_maker_ref_mut, new_spread_maker, should_pop_last, tree_ref_mut, target_order_id, $c);
      break;
    }
    else{
    }
  }
  return;
}

export function match_loop_break_ (
  spread_maker_ref_mut: U128,
  new_spread_maker_ref: U128,
  should_pop_last_ref: boolean,
  tree_ref_mut: Critbit.CritBitTree,
  final_order_id_ref: U128,
  $c: AptosDataCache,
): void {
  $.set(spread_maker_ref_mut, $.copy(new_spread_maker_ref));
  if ($.copy(should_pop_last_ref)) {
    Critbit.pop_(tree_ref_mut, $.copy(final_order_id_ref), $c, [new SimpleStructTag(Order)]);
  }
  else{
  }
  return;
}

export function match_loop_init_ (
  tree_ref_mut: Critbit.CritBitTree,
  traversal_direction_ref: boolean,
  $c: AptosDataCache,
): [U128, Order, U64, U64, boolean, boolean, U128] {
  let target_child_index, target_order_id, target_order_ref_mut, target_parent_index;
  [target_order_id, target_order_ref_mut, target_parent_index, target_child_index] = Critbit.traverse_init_mut_(tree_ref_mut, $.copy(traversal_direction_ref), $c, [new SimpleStructTag(Order)]);
  return [$.copy(target_order_id), target_order_ref_mut, $.copy(target_parent_index), $.copy(target_child_index), false, false, u128("0")];
}

export function match_loop_order_ (
  market_id_ref: U64,
  side_ref: boolean,
  lot_size_ref: U64,
  tick_size_ref: U64,
  lots_until_max_ref_mut: U64,
  ticks_until_max_ref_mut: U64,
  limit_price_ref: U64,
  target_order_id_ref: U128,
  target_order_ref_mut: Order,
  complete_target_fill_ref_mut: boolean,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, base_to_route, fill_size, quote_to_route, target_order_market_account_id, target_order_price, ticks_filled;
  target_order_price = Order_id.price_($.copy(target_order_id_ref), $c);
  if (($.copy(side_ref) == $.copy(ASK))) {
    temp$1 = ($.copy(target_order_price)).gt($.copy(limit_price_ref));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$3 = true;
  }
  else{
    if (($.copy(side_ref) == $.copy(BID))) {
      temp$2 = ($.copy(target_order_price)).lt($.copy(limit_price_ref));
    }
    else{
      temp$2 = false;
    }
    temp$3 = temp$2;
  }
  if (temp$3) {
    $.set(complete_target_fill_ref_mut, false);
    return;
  }
  else{
  }
  fill_size = u64("0");
  [temp$4, temp$5, temp$6, temp$7, temp$8, temp$9] = [lots_until_max_ref_mut, ticks_until_max_ref_mut, target_order_price, target_order_ref_mut, fill_size, complete_target_fill_ref_mut];
  match_loop_order_fill_size_(temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, $c);
  if (($.copy(fill_size)).eq((u64("0")))) {
    $.set(complete_target_fill_ref_mut, false);
    return;
  }
  else{
  }
  ticks_filled = ($.copy(fill_size)).mul($.copy(target_order_price));
  $.set(lots_until_max_ref_mut, ($.copy(lots_until_max_ref_mut)).sub($.copy(fill_size)));
  $.set(ticks_until_max_ref_mut, ($.copy(ticks_until_max_ref_mut)).sub($.copy(ticks_filled)));
  [base_to_route, quote_to_route] = [($.copy(fill_size)).mul($.copy(lot_size_ref)), ($.copy(ticks_filled)).mul($.copy(tick_size_ref))];
  target_order_market_account_id = User.get_market_account_id_($.copy(market_id_ref), $.copy(target_order_ref_mut.general_custodian_id), $c);
  User.fill_order_internal_($.copy(target_order_ref_mut.user), $.copy(target_order_market_account_id), $.copy(side_ref), $.copy(target_order_id_ref), $.copy(complete_target_fill_ref_mut), $.copy(fill_size), optional_base_coins_ref_mut, optional_quote_coins_ref_mut, $.copy(base_to_route), $.copy(quote_to_route), $c, [$p[0], $p[1]]);
  target_order_ref_mut.size = ($.copy(target_order_ref_mut.size)).sub($.copy(fill_size));
  return;
}

export function match_loop_order_fill_size_ (
  lots_until_max_ref: U64,
  ticks_until_max_ref: U64,
  target_order_price_ref: U64,
  target_order_ref: Order,
  fill_size_ref_mut: U64,
  complete_target_fill_ref_mut: boolean,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, complete_target_fill, fill_size, fill_size_max_limited, fill_size_tick_limited;
  fill_size_tick_limited = ($.copy(ticks_until_max_ref)).div($.copy(target_order_price_ref));
  if (($.copy(fill_size_tick_limited)).lt($.copy(lots_until_max_ref))) {
    temp$1 = $.copy(fill_size_tick_limited);
  }
  else{
    temp$1 = $.copy(lots_until_max_ref);
  }
  fill_size_max_limited = temp$1;
  if (($.copy(fill_size_max_limited)).lt($.copy(target_order_ref.size))) {
    [temp$2, temp$3] = [$.copy(fill_size_max_limited), false];
  }
  else{
    [temp$2, temp$3] = [$.copy(target_order_ref.size), true];
  }
  [fill_size, complete_target_fill] = [temp$2, temp$3];
  $.set(fill_size_ref_mut, $.copy(fill_size));
  $.set(complete_target_fill_ref_mut, complete_target_fill);
  return;
}

export function match_loop_order_follow_up_ (
  tree_ref_mut: Critbit.CritBitTree,
  side_ref: boolean,
  traversal_direction_ref: boolean,
  n_orders_ref_mut: U64,
  complete_target_fill_ref: boolean,
  should_pop_last_ref_mut: boolean,
  target_order_id: U128,
  target_parent_index_ref_mut: U64,
  target_child_index_ref_mut: U64,
  new_spread_maker_ref_mut: U128,
  $c: AptosDataCache,
): [U128, Order, boolean] {
  let temp$1, empty_order, should_break, target_child_index, target_order_ref_mut, target_parent_index;
  target_order_ref_mut = Critbit.borrow_mut_(tree_ref_mut, $.copy(target_order_id), $c, [new SimpleStructTag(Order)]);
  $.set(new_spread_maker_ref_mut, $.copy(target_order_id));
  $.set(should_pop_last_ref_mut, false);
  should_break = true;
  if (($.copy(n_orders_ref_mut)).eq((u64("1")))) {
    if ($.copy(complete_target_fill_ref)) {
      $.set(should_pop_last_ref_mut, true);
      if (($.copy(side_ref) == $.copy(ASK))) {
        temp$1 = $.copy(MIN_ASK_DEFAULT);
      }
      else{
        temp$1 = $.copy(MAX_BID_DEFAULT);
      }
      $.set(new_spread_maker_ref_mut, temp$1);
    }
    else{
    }
  }
  else{
    if ($.copy(complete_target_fill_ref)) {
      [target_order_id, target_order_ref_mut, target_parent_index, target_child_index, empty_order] = Critbit.traverse_pop_mut_(tree_ref_mut, $.copy(target_order_id), $.copy(target_parent_index_ref_mut), $.copy(target_child_index_ref_mut), $.copy(n_orders_ref_mut), $.copy(traversal_direction_ref), $c, [new SimpleStructTag(Order)]);
      $.set(target_parent_index_ref_mut, $.copy(target_parent_index));
      $.set(target_child_index_ref_mut, $.copy(target_child_index));
      empty_order;
      should_break = false;
      $.set(n_orders_ref_mut, ($.copy(n_orders_ref_mut)).sub(u64("1")));
    }
    else{
    }
  }
  return [$.copy(target_order_id), target_order_ref_mut, should_break];
}

export function match_range_check_fills_ (
  direction_ref: boolean,
  min_base_ref: U64,
  max_base_ref: U64,
  min_quote_ref: U64,
  max_quote_ref: U64,
  base_available_ref: U64,
  base_ceiling_ref: U64,
  quote_available_ref: U64,
  quote_ceiling_ref: U64,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, in_ceiling, in_ceiling_max, max_in, max_out, out_available;
  if (!!($.copy(min_base_ref)).gt($.copy(max_base_ref))) {
    throw $.abortCode($.copy(E_MIN_BASE_EXCEEDS_MAX));
  }
  if (!!($.copy(min_quote_ref)).gt($.copy(max_quote_ref))) {
    throw $.abortCode($.copy(E_MIN_QUOTE_EXCEEDS_MAX));
  }
  if (($.copy(direction_ref) == $.copy(BUY))) {
    [temp$1, temp$2, temp$3, temp$4] = [$.copy(base_ceiling_ref), $.copy(max_base_ref), $.copy(quote_available_ref), $.copy(max_quote_ref)];
  }
  else{
    [temp$1, temp$2, temp$3, temp$4] = [$.copy(quote_ceiling_ref), $.copy(max_quote_ref), $.copy(base_available_ref), $.copy(max_base_ref)];
  }
  [in_ceiling, max_in, out_available, max_out] = [temp$1, temp$2, temp$3, temp$4];
  in_ceiling_max = (u128($.copy(in_ceiling))).add(u128($.copy(max_in)));
  if (!!($.copy(in_ceiling_max)).gt(u128($.copy(HI_64)))) {
    throw $.abortCode($.copy(E_INBOUND_ASSET_OVERFLOW));
  }
  if (!!($.copy(out_available)).lt($.copy(max_out))) {
    throw $.abortCode($.copy(E_NOT_ENOUGH_OUTBOUND_ASSET));
  }
  return;
}

export function match_verify_fills_ (
  min_lots_ref: U64,
  max_lots_ref: U64,
  min_ticks_ref: U64,
  max_ticks_ref: U64,
  lots_until_max_ref: U64,
  ticks_until_max_ref: U64,
  lots_filled_ref_mut: U64,
  ticks_filled_ref_mut: U64,
  $c: AptosDataCache,
): void {
  $.set(lots_filled_ref_mut, ($.copy(max_lots_ref)).sub($.copy(lots_until_max_ref)));
  $.set(ticks_filled_ref_mut, ($.copy(max_ticks_ref)).sub($.copy(ticks_until_max_ref)));
  if (!!($.copy(lots_filled_ref_mut)).lt($.copy(min_lots_ref))) {
    throw $.abortCode($.copy(E_MIN_LOTS_NOT_FILLED));
  }
  if (!!($.copy(ticks_filled_ref_mut)).lt($.copy(min_ticks_ref))) {
    throw $.abortCode($.copy(E_MIN_TICKS_NOT_FILLED));
  }
  return;
}

export function orders_vector_ (
  order_book_ref_mut: OrderBook,
  side: boolean,
  $c: AptosDataCache,
): SimpleOrder[] {
  let temp$1, temp$2, remaining_traversals, simple_orders, target_id, target_order_ref_mut, target_parent_index, traversal_direction, tree_ref_mut;
  simple_orders = Stdlib.Vector.empty_($c, [new SimpleStructTag(SimpleOrder)]);
  if ((side == $.copy(ASK))) {
    [temp$1, temp$2] = [order_book_ref_mut.asks, $.copy(RIGHT)];
  }
  else{
    [temp$1, temp$2] = [order_book_ref_mut.bids, $.copy(LEFT)];
  }
  [tree_ref_mut, traversal_direction] = [temp$1, temp$2];
  if (Critbit.is_empty_(tree_ref_mut, $c, [new SimpleStructTag(Order)])) {
    return $.copy(simple_orders);
  }
  else{
  }
  remaining_traversals = (Critbit.length_(tree_ref_mut, $c, [new SimpleStructTag(Order)])).sub(u64("1"));
  [target_id, target_order_ref_mut, target_parent_index, ] = Critbit.traverse_init_mut_(tree_ref_mut, traversal_direction, $c, [new SimpleStructTag(Order)]);
  while (true) {
    Stdlib.Vector.push_back_(simple_orders, new SimpleOrder({ price: Order_id.price_($.copy(target_id), $c), size: $.copy(target_order_ref_mut.size) }, new SimpleStructTag(SimpleOrder)), $c, [new SimpleStructTag(SimpleOrder)]);
    if (($.copy(remaining_traversals)).eq((u64("0")))) {
      return $.copy(simple_orders);
    }
    else{
    }
    [target_id, target_order_ref_mut, target_parent_index, ] = Critbit.traverse_mut_(tree_ref_mut, $.copy(target_id), $.copy(target_parent_index), traversal_direction, $c, [new SimpleStructTag(Order)]);
    remaining_traversals = ($.copy(remaining_traversals)).sub(u64("1"));
  }
}

export function orders_vectors_ (
  order_book_ref_mut: OrderBook,
  $c: AptosDataCache,
): [SimpleOrder[], SimpleOrder[]] {
  return [orders_vector_(order_book_ref_mut, $.copy(ASK), $c), orders_vector_(order_book_ref_mut, $.copy(BID), $c)];
}

export function place_limit_order_ (
  user_ref: HexString,
  host_ref: HexString,
  market_id_ref: U64,
  general_custodian_id_ref: U64,
  side_ref: boolean,
  size_ref: U64,
  price_ref: U64,
  post_or_abort_ref: boolean,
  fill_or_abort_ref: boolean,
  immediate_or_cancel_ref: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, direction, lot_size, lots_filled, market_account_id, max_base, max_quote, min_base, order_book_ref_mut, order_books_map_ref_mut, tick_size;
  if (!($.copy(price_ref)).neq(u64("0"))) {
    throw $.abortCode($.copy(E_LIMIT_PRICE_0));
  }
  if (($.copy(size_ref)).eq((u64("0")))) {
    return;
  }
  else{
  }
  verify_order_book_exists_($.copy(host_ref), $.copy(market_id_ref), $c);
  order_books_map_ref_mut = $c.borrow_global_mut<OrderBooks>(new SimpleStructTag(OrderBooks), $.copy(host_ref)).map;
  order_book_ref_mut = Open_table.borrow_mut_(order_books_map_ref_mut, $.copy(market_id_ref), $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)]);
  [market_account_id, lot_size, tick_size, direction, min_base, max_base, max_quote, lots_filled] = [u128("0"), u64("0"), u64("0"), false, u64("0"), u64("0"), u64("0"), u64("0")];
  [temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17] = [user_ref, order_book_ref_mut, market_id_ref, general_custodian_id_ref, side_ref, size_ref, price_ref, post_or_abort_ref, fill_or_abort_ref, immediate_or_cancel_ref, market_account_id, lot_size, tick_size, direction, min_base, max_base, max_quote];
  place_limit_order_pre_match_(temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, $c);
  temp$25 = user_ref;
  temp$24 = market_account_id;
  temp$23 = market_id_ref;
  temp$22 = order_book_ref_mut;
  temp$21 = direction;
  temp$20 = min_base;
  temp$19 = max_base;
  temp$18 = u64("0");
  match_from_market_account_(temp$25, temp$24, temp$23, temp$22, temp$21, temp$20, temp$19, temp$18, max_quote, price_ref, lots_filled, $c, [$p[0], $p[1]]);
  place_limit_order_post_match_(user_ref, order_book_ref_mut, market_account_id, general_custodian_id_ref, lot_size, tick_size, side_ref, size_ref, price_ref, lots_filled, immediate_or_cancel_ref, $c);
  return;
}

export function place_limit_order_custodian_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  side: boolean,
  size: U64,
  price: U64,
  post_or_abort: boolean,
  fill_or_abort: boolean,
  immediate_or_cancel: boolean,
  general_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, temp$3, temp$4;
  temp$4 = user;
  temp$3 = host;
  temp$2 = market_id;
  temp$1 = Registry.custodian_id_(general_custodian_capability_ref, $c);
  place_limit_order_(temp$4, temp$3, temp$2, temp$1, side, size, price, post_or_abort, fill_or_abort, immediate_or_cancel, $c, [$p[0], $p[1]]);
  return;
}

export function place_limit_order_post_match_ (
  user_ref: HexString,
  order_book_ref_mut: OrderBook,
  market_account_id_ref: U128,
  general_custodian_id_ref: U64,
  lot_size_ref: U64,
  tick_size_ref: U64,
  side_ref: boolean,
  size_ref: U64,
  price_ref: U64,
  lots_filled_ref: U64,
  immediate_or_cancel_ref: boolean,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, new_spread_maker, order_id, size_to_fill, spread_maker_ref_mut, tree_ref_mut;
  if ($.copy(immediate_or_cancel_ref)) {
    temp$1 = true;
  }
  else{
    temp$1 = ($.copy(lots_filled_ref)).eq(($.copy(size_ref)));
  }
  if (temp$1) {
    return;
  }
  else{
  }
  size_to_fill = ($.copy(size_ref)).sub($.copy(lots_filled_ref));
  order_id = Order_id.order_id_($.copy(price_ref), get_counter_(order_book_ref_mut, $c), $.copy(side_ref), $c);
  User.register_order_internal_($.copy(user_ref), $.copy(market_account_id_ref), $.copy(side_ref), $.copy(order_id), $.copy(size_to_fill), $.copy(price_ref), $.copy(lot_size_ref), $.copy(tick_size_ref), $c);
  if (($.copy(side_ref) == $.copy(ASK))) {
    [temp$2, temp$3, temp$4] = [order_book_ref_mut.asks, ($.copy(order_id)).lt($.copy(order_book_ref_mut.min_ask)), order_book_ref_mut.min_ask];
  }
  else{
    [temp$2, temp$3, temp$4] = [order_book_ref_mut.bids, ($.copy(order_id)).gt($.copy(order_book_ref_mut.max_bid)), order_book_ref_mut.max_bid];
  }
  [tree_ref_mut, new_spread_maker, spread_maker_ref_mut] = [temp$2, temp$3, temp$4];
  if (new_spread_maker) {
    $.set(spread_maker_ref_mut, $.copy(order_id));
  }
  else{
  }
  Critbit.insert_(tree_ref_mut, $.copy(order_id), new Order({ size: $.copy(size_to_fill), user: $.copy(user_ref), general_custodian_id: $.copy(general_custodian_id_ref) }, new SimpleStructTag(Order)), $c, [new SimpleStructTag(Order)]);
  return;
}

export function place_limit_order_pre_match_ (
  user_ref: HexString,
  order_book_ref: OrderBook,
  market_id_ref: U64,
  general_custodian_id_ref: U64,
  side_ref: boolean,
  size_ref: U64,
  price_ref: U64,
  post_or_abort_ref: boolean,
  fill_or_abort_ref: boolean,
  immediate_or_cancel_ref: boolean,
  market_account_id_ref_mut: U128,
  lot_size_ref_mut: U64,
  tick_size_ref_mut: U64,
  direction_ref_mut: boolean,
  min_base_ref_mut: U64,
  max_base_ref_mut: U64,
  max_quote_ref_mut: U64,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, base, crossed_spread, quote, quote_ceiling, ticks;
  if ($.copy(post_or_abort_ref)) {
    if ($.copy(fill_or_abort_ref)) {
      temp$1 = true;
    }
    else{
      temp$1 = $.copy(immediate_or_cancel_ref);
    }
    temp$3 = !temp$1;
  }
  else{
    if ($.copy(fill_or_abort_ref)) {
      temp$2 = $.copy(immediate_or_cancel_ref);
    }
    else{
      temp$2 = false;
    }
    temp$3 = !temp$2;
  }
  if (!temp$3) {
    throw $.abortCode($.copy(E_TOO_MANY_ORDER_FLAGS));
  }
  if (($.copy(side_ref) == $.copy(ASK))) {
    temp$4 = ($.copy(price_ref)).le(Order_id.price_($.copy(order_book_ref.max_bid), $c));
  }
  else{
    temp$4 = ($.copy(price_ref)).ge(Order_id.price_($.copy(order_book_ref.min_ask), $c));
  }
  crossed_spread = temp$4;
  if (!!($.copy(post_or_abort_ref) && crossed_spread)) {
    throw $.abortCode($.copy(E_POST_OR_ABORT_CROSSED_SPREAD));
  }
  $.set(market_account_id_ref_mut, User.get_market_account_id_($.copy(market_id_ref), $.copy(general_custodian_id_ref), $c));
  if (($.copy(side_ref) == $.copy(ASK))) {
    temp$5 = $.copy(SELL);
  }
  else{
    temp$5 = $.copy(BUY);
  }
  $.set(direction_ref_mut, temp$5);
  $.set(lot_size_ref_mut, $.copy(order_book_ref.lot_size));
  $.set(tick_size_ref_mut, $.copy(order_book_ref.tick_size));
  base = (u128($.copy(size_ref))).mul(u128($.copy(lot_size_ref_mut)));
  if (!!($.copy(base)).gt(u128($.copy(HI_64)))) {
    throw $.abortCode($.copy(E_SIZE_BASE_OVERFLOW));
  }
  ticks = (u128($.copy(size_ref))).mul(u128($.copy(price_ref)));
  if (!!($.copy(ticks)).gt(u128($.copy(HI_64)))) {
    throw $.abortCode($.copy(E_SIZE_TICKS_OVERFLOW));
  }
  quote = ($.copy(ticks)).mul(u128($.copy(tick_size_ref_mut)));
  if (!!($.copy(quote)).gt(u128($.copy(HI_64)))) {
    throw $.abortCode($.copy(E_SIZE_QUOTE_OVERFLOW));
  }
  $.set(max_base_ref_mut, u64($.copy(base)));
  if ($.copy(fill_or_abort_ref)) {
    temp$6 = u64($.copy(base));
  }
  else{
    temp$6 = u64("0");
  }
  $.set(min_base_ref_mut, temp$6);
  if (crossed_spread) {
    temp$7 = ($.copy(side_ref) == $.copy(ASK));
  }
  else{
    temp$7 = false;
  }
  if (temp$7) {
    [, , , , , quote_ceiling] = User.get_asset_counts_internal_($.copy(user_ref), $.copy(market_account_id_ref_mut), $c);
    $.set(max_quote_ref_mut, ($.copy(HI_64)).sub($.copy(quote_ceiling)));
  }
  else{
    $.set(max_quote_ref_mut, u64($.copy(quote)));
  }
  return;
}

export function place_limit_order_user_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  side: boolean,
  size: U64,
  price: U64,
  post_or_abort: boolean,
  fill_or_abort: boolean,
  immediate_or_cancel: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5;
  temp$4 = Stdlib.Signer.address_of_(user, $c);
  temp$5 = temp$4;
  temp$3 = host;
  temp$2 = market_id;
  temp$1 = $.copy(NO_CUSTODIAN);
  place_limit_order_(temp$5, temp$3, temp$2, temp$1, side, size, price, post_or_abort, fill_or_abort, immediate_or_cancel, $c, [$p[0], $p[1]]);
  return;
}


export function buildPayload_place_limit_order_user (
  host: HexString,
  market_id: U64,
  side: boolean,
  size: U64,
  price: U64,
  post_or_abort: boolean,
  fill_or_abort: boolean,
  immediate_or_cancel: boolean,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"),
    "market",
    "place_limit_order_user",
    typeParamStrings,
    [
      host,
      market_id,
      side,
      size,
      price,
      post_or_abort,
      fill_or_abort,
      immediate_or_cancel,
    ],
    isJSON,
  );

}

export function place_market_order_ (
  user_ref: HexString,
  host_ref: HexString,
  market_id_ref: U64,
  general_custodian_id_ref: U64,
  direction_ref: boolean,
  min_base_ref: U64,
  max_base_ref: U64,
  min_quote_ref: U64,
  max_quote_ref: U64,
  limit_price_ref: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let lots_filled, market_account_id, order_book_ref_mut, order_books_map_ref_mut;
  verify_order_book_exists_($.copy(host_ref), $.copy(market_id_ref), $c);
  order_books_map_ref_mut = $c.borrow_global_mut<OrderBooks>(new SimpleStructTag(OrderBooks), $.copy(host_ref)).map;
  order_book_ref_mut = Open_table.borrow_mut_(order_books_map_ref_mut, $.copy(market_id_ref), $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)]);
  market_account_id = User.get_market_account_id_($.copy(market_id_ref), $.copy(general_custodian_id_ref), $c);
  lots_filled = u64("0");
  match_from_market_account_(user_ref, market_account_id, market_id_ref, order_book_ref_mut, direction_ref, min_base_ref, max_base_ref, min_quote_ref, max_quote_ref, limit_price_ref, lots_filled, $c, [$p[0], $p[1]]);
  return;
}

export function place_market_order_custodian_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  general_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, temp$3, temp$4;
  temp$4 = user;
  temp$3 = host;
  temp$2 = market_id;
  temp$1 = Registry.custodian_id_(general_custodian_capability_ref, $c);
  place_market_order_(temp$4, temp$3, temp$2, temp$1, direction, min_base, max_base, min_quote, max_quote, limit_price, $c, [$p[0], $p[1]]);
  return;
}

export function place_market_order_user_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5;
  temp$4 = Stdlib.Signer.address_of_(user, $c);
  temp$5 = temp$4;
  temp$3 = host;
  temp$2 = market_id;
  temp$1 = $.copy(NO_CUSTODIAN);
  place_market_order_(temp$5, temp$3, temp$2, temp$1, direction, min_base, max_base, min_quote, max_quote, limit_price, $c, [$p[0], $p[1]]);
  return;
}


export function buildPayload_place_market_order_user (
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"),
    "market",
    "place_market_order_user",
    typeParamStrings,
    [
      host,
      market_id,
      direction,
      min_base,
      max_base,
      min_quote,
      max_quote,
      limit_price,
    ],
    isJSON,
  );

}

export function price_levels_vector_ (
  simple_orders: SimpleOrder[],
  $c: AptosDataCache,
): PriceLevel[] {
  let level_price, level_size, n_simple_orders, price_levels, simple_order_index, simple_order_ref;
  price_levels = Stdlib.Vector.empty_($c, [new SimpleStructTag(PriceLevel)]);
  if (Stdlib.Vector.is_empty_(simple_orders, $c, [new SimpleStructTag(SimpleOrder)])) {
    return $.copy(price_levels);
  }
  else{
  }
  simple_order_ref = Stdlib.Vector.borrow_(simple_orders, u64("0"), $c, [new SimpleStructTag(SimpleOrder)]);
  level_price = $.copy(simple_order_ref.price);
  level_size = $.copy(simple_order_ref.size);
  n_simple_orders = Stdlib.Vector.length_(simple_orders, $c, [new SimpleStructTag(SimpleOrder)]);
  simple_order_index = u64("1");
  while (($.copy(simple_order_index)).lt($.copy(n_simple_orders))) {
    {
      simple_order_ref = Stdlib.Vector.borrow_(simple_orders, $.copy(simple_order_index), $c, [new SimpleStructTag(SimpleOrder)]);
      if (($.copy(simple_order_ref.price)).neq($.copy(level_price))) {
        Stdlib.Vector.push_back_(price_levels, new PriceLevel({ price: $.copy(level_price), size: $.copy(level_size) }, new SimpleStructTag(PriceLevel)), $c, [new SimpleStructTag(PriceLevel)]);
        [level_price, level_size] = [$.copy(simple_order_ref.price), $.copy(simple_order_ref.size)];
      }
      else{
        level_size = ($.copy(level_size)).add($.copy(simple_order_ref.size));
      }
      simple_order_index = ($.copy(simple_order_index)).add(u64("1"));
    }

  }Stdlib.Vector.push_back_(price_levels, new PriceLevel({ price: $.copy(level_price), size: $.copy(level_size) }, new SimpleStructTag(PriceLevel)), $c, [new SimpleStructTag(PriceLevel)]);
  return $.copy(price_levels);
}

export function price_levels_vectors_ (
  order_book_ref_mut: OrderBook,
  $c: AptosDataCache,
): [PriceLevel[], PriceLevel[]] {
  return [price_levels_vector_(orders_vector_(order_book_ref_mut, $.copy(ASK), $c), $c), price_levels_vector_(orders_vector_(order_book_ref_mut, $.copy(BID), $c), $c)];
}

export function register_market_ (
  host: HexString,
  lot_size: U64,
  tick_size: U64,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let market_id;
  market_id = Registry.register_market_internal_(Stdlib.Signer.address_of_(host, $c), $.copy(lot_size), $.copy(tick_size), $.copy(generic_asset_transfer_custodian_id), $c, [$p[0], $p[1]]);
  register_order_book_(host, $.copy(market_id), $.copy(lot_size), $.copy(tick_size), $.copy(generic_asset_transfer_custodian_id), $c, [$p[0], $p[1]]);
  return;
}

export function register_market_generic_ (
  host: HexString,
  lot_size: U64,
  tick_size: U64,
  generic_asset_transfer_custodian_id_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  register_market_(host, $.copy(lot_size), $.copy(tick_size), Registry.custodian_id_(generic_asset_transfer_custodian_id_ref, $c), $c, [$p[0], $p[1]]);
  return;
}

export function register_market_pure_coin_ (
  host: HexString,
  lot_size: U64,
  tick_size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
): void {
  register_market_(host, $.copy(lot_size), $.copy(tick_size), $.copy(PURE_COIN_PAIR), $c, [$p[0], $p[1]]);
  return;
}


export function buildPayload_register_market_pure_coin (
  lot_size: U64,
  tick_size: U64,
  $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"),
    "market",
    "register_market_pure_coin",
    typeParamStrings,
    [
      lot_size,
      tick_size,
    ],
    isJSON,
  );

}

export function register_order_book_ (
  host: HexString,
  market_id: U64,
  lot_size: U64,
  tick_size: U64,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, host_address, order_books_map_ref_mut;
  host_address = Stdlib.Signer.address_of_(host, $c);
  if (!$c.exists(new SimpleStructTag(OrderBooks), $.copy(host_address))) {
    $c.move_to(new SimpleStructTag(OrderBooks), host, new OrderBooks({ map: Open_table.empty_($c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)]) }, new SimpleStructTag(OrderBooks)));
  }
  else{
  }
  order_books_map_ref_mut = $c.borrow_global_mut<OrderBooks>(new SimpleStructTag(OrderBooks), $.copy(host_address)).map;
  [temp$1, temp$2] = [order_books_map_ref_mut, $.copy(market_id)];
  if (!!Open_table.contains_(temp$1, temp$2, $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)])) {
    throw $.abortCode($.copy(E_ORDER_BOOK_EXISTS));
  }
  Open_table.add_(order_books_map_ref_mut, $.copy(market_id), new OrderBook({ base_type_info: Stdlib.Type_info.type_of_($c, [$p[0]]), quote_type_info: Stdlib.Type_info.type_of_($c, [$p[1]]), lot_size: $.copy(lot_size), tick_size: $.copy(tick_size), generic_asset_transfer_custodian_id: $.copy(generic_asset_transfer_custodian_id), asks: Critbit.empty_($c, [new SimpleStructTag(Order)]), bids: Critbit.empty_($c, [new SimpleStructTag(Order)]), min_ask: $.copy(MIN_ASK_DEFAULT), max_bid: $.copy(MAX_BID_DEFAULT), counter: u64("0") }, new SimpleStructTag(OrderBook)), $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)]);
  return;
}

export function swap_ (
  host_ref: HexString,
  market_id_ref: U64,
  direction_ref: boolean,
  min_base_ref: U64,
  max_base_ref: U64,
  min_quote_ref: U64,
  max_quote_ref: U64,
  limit_price_ref: U64,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  base_filled_ref_mut: U64,
  quote_filled_ref_mut: U64,
  generic_asset_transfer_custodian_id_ref: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, lot_size, lots_filled, order_book_ref_mut, order_books_map_ref_mut, tick_size, ticks_filled;
  verify_order_book_exists_($.copy(host_ref), $.copy(market_id_ref), $c);
  order_books_map_ref_mut = $c.borrow_global_mut<OrderBooks>(new SimpleStructTag(OrderBooks), $.copy(host_ref)).map;
  order_book_ref_mut = Open_table.borrow_mut_(order_books_map_ref_mut, $.copy(market_id_ref), $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)]);
  if (!($.copy(generic_asset_transfer_custodian_id_ref)).eq(($.copy(order_book_ref_mut.generic_asset_transfer_custodian_id)))) {
    throw $.abortCode($.copy(E_INVALID_CUSTODIAN));
  }
  lot_size = $.copy(order_book_ref_mut.lot_size);
  tick_size = $.copy(order_book_ref_mut.tick_size);
  [lots_filled, ticks_filled] = [u64("0"), u64("0")];
  temp$12 = market_id_ref;
  temp$11 = order_book_ref_mut;
  temp$10 = lot_size;
  temp$9 = tick_size;
  temp$8 = direction_ref;
  temp$6 = ($.copy(min_base_ref)).div($.copy(lot_size));
  temp$7 = temp$6;
  temp$4 = ($.copy(max_base_ref)).div($.copy(lot_size));
  temp$5 = temp$4;
  temp$2 = ($.copy(min_quote_ref)).div($.copy(tick_size));
  temp$3 = temp$2;
  temp$1 = ($.copy(max_quote_ref)).div($.copy(tick_size));
  match_(temp$12, temp$11, temp$10, temp$9, temp$8, temp$7, temp$5, temp$3, temp$1, limit_price_ref, optional_base_coins_ref_mut, optional_quote_coins_ref_mut, lots_filled, ticks_filled, $c, [$p[0], $p[1]]);
  $.set(base_filled_ref_mut, ($.copy(lots_filled)).mul($.copy(lot_size)));
  $.set(quote_filled_ref_mut, ($.copy(ticks_filled)).mul($.copy(tick_size)));
  return;
}

export function swap_between_coinstores_ (
  user: HexString,
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, base_filled_drop, base_value, optional_base_coins, optional_quote_coins, quote_filled_drop, quote_value, user_address;
  user_address = Stdlib.Signer.address_of_(user, $c);
  if (!Stdlib.Coin.is_account_registered_($.copy(user_address), $c, [$p[0]])) {
    Stdlib.Coin.register_(user, $c, [$p[0]]);
  }
  else{
  }
  if (!Stdlib.Coin.is_account_registered_($.copy(user_address), $c, [$p[1]])) {
    Stdlib.Coin.register_(user, $c, [$p[1]]);
  }
  else{
  }
  base_value = Stdlib.Coin.balance_($.copy(user_address), $c, [$p[0]]);
  quote_value = Stdlib.Coin.balance_($.copy(user_address), $c, [$p[1]]);
  match_range_check_fills_(direction, min_base, max_base, min_quote, max_quote, base_value, base_value, quote_value, quote_value, $c);
  if ((direction == $.copy(BUY))) {
    [temp$1, temp$2] = [Stdlib.Option.some_(Stdlib.Coin.zero_($c, [$p[0]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), Stdlib.Option.some_(Stdlib.Coin.withdraw_(user, $.copy(max_quote), $c, [$p[1]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])])];
  }
  else{
    [temp$1, temp$2] = [Stdlib.Option.some_(Stdlib.Coin.withdraw_(user, $.copy(max_base), $c, [$p[0]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), Stdlib.Option.some_(Stdlib.Coin.zero_($c, [$p[1]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])])];
  }
  [optional_base_coins, optional_quote_coins] = [temp$1, temp$2];
  [base_filled_drop, quote_filled_drop] = [u64("0"), u64("0")];
  temp$15 = host;
  temp$14 = market_id;
  temp$13 = direction;
  temp$12 = min_base;
  temp$11 = max_base;
  temp$10 = min_quote;
  temp$9 = max_quote;
  temp$8 = limit_price;
  temp$7 = optional_base_coins;
  temp$6 = optional_quote_coins;
  temp$5 = base_filled_drop;
  temp$4 = quote_filled_drop;
  temp$3 = $.copy(PURE_COIN_PAIR);
  swap_(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, temp$3, $c, [$p[0], $p[1]]);
  Stdlib.Coin.deposit_($.copy(user_address), Stdlib.Option.destroy_some_(optional_base_coins, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), $c, [$p[0]]);
  Stdlib.Coin.deposit_($.copy(user_address), Stdlib.Option.destroy_some_(optional_quote_coins, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])]), $c, [$p[1]]);
  return;
}


export function buildPayload_swap_between_coinstores (
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778"),
    "market",
    "swap_between_coinstores",
    typeParamStrings,
    [
      host,
      market_id,
      direction,
      min_base,
      max_base,
      min_quote,
      max_quote,
      limit_price,
    ],
    isJSON,
  );

}

export function swap_coins_ (
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  base_coins_ref_mut: Stdlib.Coin.Coin,
  quote_coins_ref_mut: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
): [U64, U64] {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, base_filled, base_value, optional_base_coins, optional_quote_coins, quote_filled, quote_value;
  base_value = Stdlib.Coin.value_(base_coins_ref_mut, $c, [$p[0]]);
  quote_value = Stdlib.Coin.value_(quote_coins_ref_mut, $c, [$p[1]]);
  match_range_check_fills_(direction, min_base, max_base, min_quote, max_quote, base_value, base_value, quote_value, quote_value, $c);
  if ((direction == $.copy(BUY))) {
    [temp$1, temp$2] = [Stdlib.Option.some_(Stdlib.Coin.zero_($c, [$p[0]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), Stdlib.Option.some_(Stdlib.Coin.extract_(quote_coins_ref_mut, $.copy(max_quote), $c, [$p[1]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])])];
  }
  else{
    [temp$1, temp$2] = [Stdlib.Option.some_(Stdlib.Coin.extract_(base_coins_ref_mut, $.copy(max_base), $c, [$p[0]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), Stdlib.Option.some_(Stdlib.Coin.zero_($c, [$p[1]]), $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])])];
  }
  [optional_base_coins, optional_quote_coins] = [temp$1, temp$2];
  [base_filled, quote_filled] = [u64("0"), u64("0")];
  temp$15 = host;
  temp$14 = market_id;
  temp$13 = direction;
  temp$12 = min_base;
  temp$11 = max_base;
  temp$10 = min_quote;
  temp$9 = max_quote;
  temp$8 = limit_price;
  temp$7 = optional_base_coins;
  temp$6 = optional_quote_coins;
  temp$5 = base_filled;
  temp$4 = quote_filled;
  temp$3 = $.copy(PURE_COIN_PAIR);
  swap_(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, temp$3, $c, [$p[0], $p[1]]);
  Stdlib.Coin.merge_(base_coins_ref_mut, Stdlib.Option.destroy_some_(optional_base_coins, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), $c, [$p[0]]);
  Stdlib.Coin.merge_(quote_coins_ref_mut, Stdlib.Option.destroy_some_(optional_quote_coins, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])]), $c, [$p[1]]);
  return [$.copy(base_filled), $.copy(quote_filled)];
}

export function swap_coins_simulate_ (
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  base_coins_ref_mut: Stdlib.Coin.Coin,
  quote_coins_ref_mut: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
): [U64, U64] {
  return swap_coins_($.copy(host), $.copy(market_id), direction, $.copy(min_base), $.copy(max_base), $.copy(min_quote), $.copy(max_quote), $.copy(limit_price), base_coins_ref_mut, quote_coins_ref_mut, $c, [$p[0], $p[1]]);
}

export function swap_generic_ (
  host: HexString,
  market_id: U64,
  direction: boolean,
  min_base: U64,
  max_base: U64,
  min_quote: U64,
  max_quote: U64,
  limit_price: U64,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  generic_asset_transfer_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <BaseType, QuoteType>*/
): [U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, base_filled, base_is_coin, base_value, generic_asset_transfer_custodian_id, quote_filled, quote_is_coin, quote_value;
  base_is_coin = Stdlib.Coin.is_coin_initialized_($c, [$p[0]]);
  quote_is_coin = Stdlib.Coin.is_coin_initialized_($c, [$p[1]]);
  if (!!(base_is_coin && quote_is_coin)) {
    throw $.abortCode($.copy(E_BOTH_COINS));
  }
  if (!(base_is_coin == Stdlib.Option.is_some_(optional_base_coins_ref_mut, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]))) {
    throw $.abortCode($.copy(E_INVALID_OPTION_BASE));
  }
  if (!(quote_is_coin == Stdlib.Option.is_some_(optional_quote_coins_ref_mut, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])]))) {
    throw $.abortCode($.copy(E_INVALID_OPTION_QUOTE));
  }
  if (base_is_coin) {
    temp$2 = Stdlib.Coin.value_(Stdlib.Option.borrow_(optional_base_coins_ref_mut, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), $c, [$p[0]]);
  }
  else{
    if ((direction == $.copy(BUY))) {
      temp$1 = u64("0");
    }
    else{
      temp$1 = $.copy(max_base);
    }
    temp$2 = temp$1;
  }
  base_value = temp$2;
  if (quote_is_coin) {
    temp$4 = Stdlib.Coin.value_(Stdlib.Option.borrow_(optional_quote_coins_ref_mut, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]])]), $c, [$p[1]]);
  }
  else{
    if ((direction == $.copy(BUY))) {
      temp$3 = $.copy(max_quote);
    }
    else{
      temp$3 = u64("0");
    }
    temp$4 = temp$3;
  }
  quote_value = temp$4;
  match_range_check_fills_(direction, min_base, max_base, min_quote, max_quote, base_value, base_value, quote_value, quote_value, $c);
  [base_filled, quote_filled] = [u64("0"), u64("0")];
  generic_asset_transfer_custodian_id = Registry.custodian_id_(generic_asset_transfer_custodian_capability_ref, $c);
  swap_(host, market_id, direction, min_base, max_base, min_quote, max_quote, limit_price, optional_base_coins_ref_mut, optional_quote_coins_ref_mut, base_filled, quote_filled, generic_asset_transfer_custodian_id, $c, [$p[0], $p[1]]);
  return [$.copy(base_filled), $.copy(quote_filled)];
}

export function verify_order_book_exists_ (
  host: HexString,
  market_id: U64,
  $c: AptosDataCache,
): void {
  let order_books_map_ref;
  if (!$c.exists(new SimpleStructTag(OrderBooks), $.copy(host))) {
    throw $.abortCode($.copy(E_NO_ORDER_BOOKS));
  }
  order_books_map_ref = $c.borrow_global<OrderBooks>(new SimpleStructTag(OrderBooks), $.copy(host)).map;
  if (!Open_table.contains_(order_books_map_ref, $.copy(market_id), $c, [AtomicTypeTag.U64, new SimpleStructTag(OrderBook)])) {
    throw $.abortCode($.copy(E_NO_ORDER_BOOK));
  }
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::market::Order", Order.OrderParser);
  repo.addParser("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::market::OrderBook", OrderBook.OrderBookParser);
  repo.addParser("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::market::OrderBooks", OrderBooks.OrderBooksParser);
  repo.addParser("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::market::PriceLevel", PriceLevel.PriceLevelParser);
  repo.addParser("0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::market::SimpleOrder", SimpleOrder.SimpleOrderParser);
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
  get Order() { return Order; }
  get OrderBook() { return OrderBook; }
  get OrderBooks() { return OrderBooks; }
  async loadOrderBooks(
    owner: HexString,
    loadFull=true,
    fillCache=true,
  ) {
    const val = await OrderBooks.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get PriceLevel() { return PriceLevel; }
  get SimpleOrder() { return SimpleOrder; }
  payload_cancel_all_limit_orders_user(
    host: HexString,
    market_id: U64,
    side: boolean,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_cancel_all_limit_orders_user(host, market_id, side, isJSON);
  }
  async cancel_all_limit_orders_user(
    _account: AptosAccount,
    host: HexString,
    market_id: U64,
    side: boolean,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_cancel_all_limit_orders_user(host, market_id, side, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_cancel_limit_order_user(
    host: HexString,
    market_id: U64,
    side: boolean,
    order_id: U128,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_cancel_limit_order_user(host, market_id, side, order_id, isJSON);
  }
  async cancel_limit_order_user(
    _account: AptosAccount,
    host: HexString,
    market_id: U64,
    side: boolean,
    order_id: U128,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_cancel_limit_order_user(host, market_id, side, order_id, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_place_limit_order_user(
    host: HexString,
    market_id: U64,
    side: boolean,
    size: U64,
    price: U64,
    post_or_abort: boolean,
    fill_or_abort: boolean,
    immediate_or_cancel: boolean,
    $p: TypeTag[], /* <BaseType, QuoteType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_place_limit_order_user(host, market_id, side, size, price, post_or_abort, fill_or_abort, immediate_or_cancel, $p, isJSON);
  }
  async place_limit_order_user(
    _account: AptosAccount,
    host: HexString,
    market_id: U64,
    side: boolean,
    size: U64,
    price: U64,
    post_or_abort: boolean,
    fill_or_abort: boolean,
    immediate_or_cancel: boolean,
    $p: TypeTag[], /* <BaseType, QuoteType>*/
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_place_limit_order_user(host, market_id, side, size, price, post_or_abort, fill_or_abort, immediate_or_cancel, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_place_market_order_user(
    host: HexString,
    market_id: U64,
    direction: boolean,
    min_base: U64,
    max_base: U64,
    min_quote: U64,
    max_quote: U64,
    limit_price: U64,
    $p: TypeTag[], /* <BaseType, QuoteType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_place_market_order_user(host, market_id, direction, min_base, max_base, min_quote, max_quote, limit_price, $p, isJSON);
  }
  async place_market_order_user(
    _account: AptosAccount,
    host: HexString,
    market_id: U64,
    direction: boolean,
    min_base: U64,
    max_base: U64,
    min_quote: U64,
    max_quote: U64,
    limit_price: U64,
    $p: TypeTag[], /* <BaseType, QuoteType>*/
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_place_market_order_user(host, market_id, direction, min_base, max_base, min_quote, max_quote, limit_price, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_register_market_pure_coin(
    lot_size: U64,
    tick_size: U64,
    $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_register_market_pure_coin(lot_size, tick_size, $p, isJSON);
  }
  async register_market_pure_coin(
    _account: AptosAccount,
    lot_size: U64,
    tick_size: U64,
    $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_register_market_pure_coin(lot_size, tick_size, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_swap_between_coinstores(
    host: HexString,
    market_id: U64,
    direction: boolean,
    min_base: U64,
    max_base: U64,
    min_quote: U64,
    max_quote: U64,
    limit_price: U64,
    $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_swap_between_coinstores(host, market_id, direction, min_base, max_base, min_quote, max_quote, limit_price, $p, isJSON);
  }
  async swap_between_coinstores(
    _account: AptosAccount,
    host: HexString,
    market_id: U64,
    direction: boolean,
    min_base: U64,
    max_base: U64,
    min_quote: U64,
    max_quote: U64,
    limit_price: U64,
    $p: TypeTag[], /* <BaseCoinType, QuoteCoinType>*/
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_swap_between_coinstores(host, market_id, direction, min_base, max_base, min_quote, max_quote, limit_price, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
}

