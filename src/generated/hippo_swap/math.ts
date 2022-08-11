import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "math";


export function max_ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1;
  if (($.copy(a)).lt($.copy(b))) {
    temp$1 = $.copy(b);
  }
  else{
    temp$1 = $.copy(a);
  }
  return temp$1;
}

export function max_u64_ (
  a: U64,
  b: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1;
  if (($.copy(a)).lt($.copy(b))) {
    temp$1 = $.copy(b);
  }
  else{
    temp$1 = $.copy(a);
  }
  return temp$1;
}

export function min_ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1;
  if (($.copy(a)).gt($.copy(b))) {
    temp$1 = $.copy(b);
  }
  else{
    temp$1 = $.copy(a);
  }
  return temp$1;
}

export function pow_ (
  base: U128,
  exp: U8,
  $c: AptosDataCache,
): U128 {
  let result;
  result = u128("1");
  while (true) {
    if ((($.copy(exp)).and(u8("1"))).eq((u8("1")))) {
      result = ($.copy(result)).mul($.copy(base));
    }
    else{
    }
    exp = ($.copy(exp)).shr(u8("1"));
    base = ($.copy(base)).mul($.copy(base));
    if (($.copy(exp)).eq((u8("0")))) {
      break;
    }
    else{
    }
  }
  return $.copy(result);
}

export function sqrt_ (
  y: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1, temp$2, x, z;
  if (($.copy(y)).lt(u128("4"))) {
    if (($.copy(y)).eq((u128("0")))) {
      temp$1 = u128("0");
    }
    else{
      temp$1 = u128("1");
    }
    temp$2 = temp$1;
  }
  else{
    z = $.copy(y);
    x = (($.copy(y)).div(u128("2"))).add(u128("1"));
    while (($.copy(x)).lt($.copy(z))) {
      {
        z = $.copy(x);
        x = ((($.copy(y)).div($.copy(x))).add($.copy(x))).div(u128("2"));
      }

    }temp$2 = $.copy(z);
  }
  return temp$2;
}

export function loadParsers(repo: AptosParserRepo) {
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
  }
}

