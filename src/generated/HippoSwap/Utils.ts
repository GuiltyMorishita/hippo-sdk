import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "Utils";

export const COMPARE_EQUAL : U8 = u8("1");
export const COMPARE_GREATER : U8 = u8("2");
export const COMPARE_LESS : U8 = u8("0");

export function compare_u64$ (
  a: U64,
  b: U64,
  $c: AptosDataCache,
): U8 {
  let temp$1, temp$2;
  if ($.copy(a).gt($.copy(b))) {
    temp$2 = COMPARE_GREATER;
  }
  else{
    if ($.copy(a).eq($.copy(b))) {
      temp$1 = COMPARE_EQUAL;
    }
    else{
      temp$1 = COMPARE_LESS;
    }
    temp$2 = temp$1;
  }
  return temp$2;
}

export function compare_u8$ (
  a: U8,
  b: U8,
  $c: AptosDataCache,
): U8 {
  let temp$1, temp$2;
  if ($.copy(a).gt($.copy(b))) {
    temp$2 = COMPARE_GREATER;
  }
  else{
    if ($.copy(a).eq($.copy(b))) {
      temp$1 = COMPARE_EQUAL;
    }
    else{
      temp$1 = COMPARE_LESS;
    }
    temp$2 = temp$1;
  }
  return temp$2;
}

export function compare_vec$ (
  v1: U8[],
  v2: U8[],
  $c: AptosDataCache,
): U8 {
  let temp$2, i, n1, n2, r, r__1;
  [n1, n2] = [Std.Vector.length$(v1, $c, [AtomicTypeTag.U8] as TypeTag[]), Std.Vector.length$(v2, $c, [AtomicTypeTag.U8] as TypeTag[])];
  r = compare_u64$($.copy(n1), $.copy(n2), $c);
  if ($.copy(r).neq(COMPARE_EQUAL)) {
    temp$2 = $.copy(r);
  }
  else{
    i = u64("0");
    while (true) {
      if ($.copy(i).eq($.copy(n1))) {
        return COMPARE_EQUAL;
      }
      else{
      }
      r__1 = compare_u8$($.copy(Std.Vector.borrow$(v1, $.copy(i), $c, [AtomicTypeTag.U8] as TypeTag[])), $.copy(Std.Vector.borrow$(v2, $.copy(i), $c, [AtomicTypeTag.U8] as TypeTag[])), $c);
      if ($.copy(r__1).neq(COMPARE_EQUAL)) {
        return $.copy(r__1);
      }
      else{
      }
      i = $.copy(i).add(u64("1"));
    }
  }
  return temp$2;
}

export function is_tokens_sorted$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <T0, T1>*/
): boolean {
  let temp$1, n0, n1, name_compare, r, s0, s1, t0, t1;
  t0 = AptosFramework.TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  n0 = AptosFramework.TypeInfo.module_name$(t0, $c);
  s0 = AptosFramework.TypeInfo.struct_name$(t0, $c);
  t1 = AptosFramework.TypeInfo.type_of$($c, [$p[1]] as TypeTag[]);
  n1 = AptosFramework.TypeInfo.module_name$(t1, $c);
  s1 = AptosFramework.TypeInfo.struct_name$(t1, $c);
  name_compare = compare_vec$(n0, n1, $c);
  if ($.copy(name_compare).neq(COMPARE_EQUAL)) {
    temp$1 = $.copy(name_compare);
  }
  else{
    temp$1 = compare_vec$(s0, s1, $c);
  }
  r = temp$1;
  return $.copy(r).eq(COMPARE_LESS);
}

export function loadParsers(repo: AptosParserRepo) {
}

