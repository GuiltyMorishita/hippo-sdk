import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "SafeMath";

export const ERROR_UNDERFLOW : U64 = u64("0");

export function add$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).add($.copy(b));
}

export function div$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).div($.copy(b));
}

export function mul$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).mul($.copy(b));
}

export function sub$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).sub($.copy(b));
}

export function loadParsers(repo: AptosParserRepo) {
}

