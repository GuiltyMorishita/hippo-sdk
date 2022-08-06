import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "utils";

export const COMPARE_EQUAL : U8 = u8("1");
export const COMPARE_GREATER : U8 = u8("2");
export const COMPARE_LESS : U8 = u8("0");

export function compare_u64_ (
  a: U64,
  b: U64,
  $c: AptosDataCache,
): U8 {
  let temp$1, temp$2;
  if (($.copy(a)).gt($.copy(b))) {
    temp$2 = COMPARE_GREATER;
  }
  else{
    if (($.copy(a)).eq(($.copy(b)))) {
      temp$1 = COMPARE_EQUAL;
    }
    else{
      temp$1 = COMPARE_LESS;
    }
    temp$2 = temp$1;
  }
  return temp$2;
}

export function compare_u8_ (
  a: U8,
  b: U8,
  $c: AptosDataCache,
): U8 {
  let temp$1, temp$2;
  if (($.copy(a)).gt($.copy(b))) {
    temp$2 = COMPARE_GREATER;
  }
  else{
    if (($.copy(a)).eq(($.copy(b)))) {
      temp$1 = COMPARE_EQUAL;
    }
    else{
      temp$1 = COMPARE_LESS;
    }
    temp$2 = temp$1;
  }
  return temp$2;
}

export function compare_vec_ (
  v1: U8[],
  v2: U8[],
  $c: AptosDataCache,
): U8 {
  let temp$2, i, n1, n2, r, r__1;
  [n1, n2] = [Std.Vector.length_(v1, $c, [AtomicTypeTag.U8]), Std.Vector.length_(v2, $c, [AtomicTypeTag.U8])];
  r = compare_u64_($.copy(n1), $.copy(n2), $c);
  if (($.copy(r)).neq(COMPARE_EQUAL)) {
    temp$2 = $.copy(r);
  }
  else{
    i = u64("0");
    while (true) {
      if (($.copy(i)).eq(($.copy(n1)))) {
        return COMPARE_EQUAL;
      }
      else{
      }
      r__1 = compare_u8_($.copy(Std.Vector.borrow_(v1, $.copy(i), $c, [AtomicTypeTag.U8])), $.copy(Std.Vector.borrow_(v2, $.copy(i), $c, [AtomicTypeTag.U8])), $c);
      if (($.copy(r__1)).neq(COMPARE_EQUAL)) {
        return $.copy(r__1);
      }
      else{
      }
      i = ($.copy(i)).add(u64("1"));
    }
  }
  return temp$2;
}

export function is_tokens_sorted_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <T0, T1>*/
): boolean {
  let temp$1, n0, n1, name_compare, r, s0, s1, t0, t1;
  t0 = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  n0 = Aptos_std.Type_info.module_name_(t0, $c);
  s0 = Aptos_std.Type_info.struct_name_(t0, $c);
  t1 = Aptos_std.Type_info.type_of_($c, [$p[1]]);
  n1 = Aptos_std.Type_info.module_name_(t1, $c);
  s1 = Aptos_std.Type_info.struct_name_(t1, $c);
  name_compare = compare_vec_(n0, n1, $c);
  if (($.copy(name_compare)).neq(COMPARE_EQUAL)) {
    temp$1 = $.copy(name_compare);
  }
  else{
    temp$1 = compare_vec_(s0, s1, $c);
  }
  r = temp$1;
  return ($.copy(r)).eq((COMPARE_LESS));
}

export function loadParsers(repo: AptosParserRepo) {
}

