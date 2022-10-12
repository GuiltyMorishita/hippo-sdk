import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'math';

export const ERR_DIVIDE_BY_ZERO: U64 = u64('2000');
export const MAX_U128: U128 = u128('340282366920938463463374607431768211455');
export const MAX_U64: U128 = u128('18446744073709551615');

export function min_u64_(a: U64, b: U64, $c: AptosDataCache): U64 {
  let temp$1;
  if ($.copy(a).lt($.copy(b))) {
    temp$1 = $.copy(a);
  } else {
    temp$1 = $.copy(b);
  }
  return temp$1;
}

export function mul_div_(x: U64, y: U64, z: U64, $c: AptosDataCache): U64 {
  let r;
  if (!$.copy(z).neq(u64('0'))) {
    throw $.abortCode($.copy(ERR_DIVIDE_BY_ZERO));
  }
  r = u128($.copy(x))
    .mul(u128($.copy(y)))
    .div(u128($.copy(z)));
  return u64($.copy(r));
}

export function mul_div_u128_(x: U128, y: U128, z: U128, $c: AptosDataCache): U64 {
  let r;
  if (!$.copy(z).neq(u128('0'))) {
    throw $.abortCode($.copy(ERR_DIVIDE_BY_ZERO));
  }
  r = $.copy(x).mul($.copy(y)).div($.copy(z));
  return u64($.copy(r));
}

export function mul_to_u128_(x: U64, y: U64, $c: AptosDataCache): U128 {
  return u128($.copy(x)).mul(u128($.copy(y)));
}

export function overflow_add_(a: U128, b: U128, $c: AptosDataCache): U128 {
  let r;
  r = $.copy(MAX_U128).sub($.copy(b));
  if ($.copy(r).lt($.copy(a))) {
    return $.copy(a).sub($.copy(r)).sub(u128('1'));
  } else {
  }
  r = $.copy(MAX_U128).sub($.copy(a));
  if ($.copy(r).lt($.copy(b))) {
    return $.copy(b).sub($.copy(r)).sub(u128('1'));
  } else {
  }
  return $.copy(a).add($.copy(b));
}

export function pow_10_(degree: U8, $c: AptosDataCache): U64 {
  let i, res;
  res = u64('1');
  i = u8('0');
  while (true) {
    {
    }
    if (!$.copy(i).lt($.copy(degree))) break;
    {
      res = $.copy(res).mul(u64('10'));
      i = $.copy(i).add(u8('1'));
    }
  }
  return $.copy(res);
}

export function sqrt_(y: U128, $c: AptosDataCache): U64 {
  let temp$1, temp$2, x, z;
  if ($.copy(y).lt(u128('4'))) {
    if ($.copy(y).eq(u128('0'))) {
      temp$1 = u64('0');
    } else {
      temp$1 = u64('1');
    }
    temp$2 = temp$1;
  } else {
    z = $.copy(y);
    x = $.copy(y).div(u128('2')).add(u128('1'));
    while ($.copy(x).lt($.copy(z))) {
      {
        z = $.copy(x);
        x = $.copy(y).div($.copy(x)).add($.copy(x)).div(u128('2'));
      }
    }
    temp$2 = u64($.copy(z));
  }
  return temp$2;
}

export function loadParsers(repo: AptosParserRepo) {}
export class App {
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {}
  get moduleAddress() {
    {
      return moduleAddress;
    }
  }
  get moduleName() {
    {
      return moduleName;
    }
  }
}
