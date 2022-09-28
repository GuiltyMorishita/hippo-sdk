import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c9154b6b64db01eeb77d08255300315e1fa35b687d384a703f6034fbd");
export const moduleName = "order_id";

export const ASK : boolean = true;
export const BID : boolean = false;
export const FIRST_64 : U8 = u8("64");
export const HI_64 : U64 = u64("18446744073709551615");

export function counter_ask_ (
  order_id: U128,
  $c: AptosDataCache,
): U64 {
  return u64(($.copy(order_id)).and(u128($.copy(HI_64))));
}

export function counter_bid_ (
  order_id: U128,
  $c: AptosDataCache,
): U64 {
  return (u64(($.copy(order_id)).and(u128($.copy(HI_64))))).xor($.copy(HI_64));
}

export function order_id_ (
  price: U64,
  counter: U64,
  side: boolean,
  $c: AptosDataCache,
): U128 {
  let temp$1;
  if ((side == $.copy(ASK))) {
    temp$1 = order_id_ask_($.copy(price), $.copy(counter), $c);
  }
  else{
    temp$1 = order_id_bid_($.copy(price), $.copy(counter), $c);
  }
  return temp$1;
}

export function order_id_ask_ (
  price: U64,
  counter: U64,
  $c: AptosDataCache,
): U128 {
  return ((u128($.copy(price))).shl($.copy(FIRST_64))).or(u128($.copy(counter)));
}

export function order_id_bid_ (
  price: U64,
  counter: U64,
  $c: AptosDataCache,
): U128 {
  return ((u128($.copy(price))).shl($.copy(FIRST_64))).or(u128(($.copy(counter)).xor($.copy(HI_64))));
}

export function price_ (
  order_id: U128,
  $c: AptosDataCache,
): U64 {
  return u64(($.copy(order_id)).shr($.copy(FIRST_64)));
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
}

