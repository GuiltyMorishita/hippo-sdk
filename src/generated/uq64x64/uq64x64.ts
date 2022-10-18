import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'UQ64x64';
export const moduleAddress = new HexString('0x4e9fce03284c0ce0b86c88dd5a46f050cad2f4f33c4cdd29d98f501868558c81');
export const moduleName = 'uq64x64';

export const EQUAL: U8 = u8('0');
export const ERR_DIVIDE_BY_ZERO: U64 = u64('100');
export const GREATER_THAN: U8 = u8('2');
export const LESS_THAN: U8 = u8('1');
export const Q64: U128 = u128('18446744073709551615');

export class UQ64x64 {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'UQ64x64';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [{ name: 'v', typeTag: AtomicTypeTag.U128 }];

  v: U128;

  constructor(proto: any, public typeTag: TypeTag) {
    this.v = proto['v'] as U128;
  }

  static UQ64x64Parser(data: any, typeTag: TypeTag, repo: AptosParserRepo): UQ64x64 {
    const proto = $.parseStructProto(data, typeTag, repo, UQ64x64);
    return new UQ64x64(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'UQ64x64', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function compare_(left: UQ64x64, right: UQ64x64, $c: AptosDataCache): U8 {
  if ($.copy(left.v).eq($.copy(right.v))) {
    return $.copy(EQUAL);
  } else {
    if ($.copy(left.v).lt($.copy(right.v))) {
      return $.copy(LESS_THAN);
    } else {
      return $.copy(GREATER_THAN);
    }
  }
}

export function decode_(uq: UQ64x64, $c: AptosDataCache): U64 {
  return u64($.copy(uq.v).div($.copy(Q64)));
}

export function div_(uq: UQ64x64, y: U64, $c: AptosDataCache): UQ64x64 {
  let v;
  if (!$.copy(y).neq(u64('0'))) {
    throw $.abortCode($.copy(ERR_DIVIDE_BY_ZERO));
  }
  v = $.copy(uq.v).div(u128($.copy(y)));
  return new UQ64x64({ v: $.copy(v) }, new SimpleStructTag(UQ64x64));
}

export function encode_(x: U64, $c: AptosDataCache): UQ64x64 {
  let v;
  v = u128($.copy(x)).mul($.copy(Q64));
  return new UQ64x64({ v: $.copy(v) }, new SimpleStructTag(UQ64x64));
}

export function fraction_(numerator: U64, denominator: U64, $c: AptosDataCache): UQ64x64 {
  let r, v;
  if (!$.copy(denominator).neq(u64('0'))) {
    throw $.abortCode($.copy(ERR_DIVIDE_BY_ZERO));
  }
  r = u128($.copy(numerator)).mul($.copy(Q64));
  v = $.copy(r).div(u128($.copy(denominator)));
  return new UQ64x64({ v: $.copy(v) }, new SimpleStructTag(UQ64x64));
}

export function is_zero_(uq: UQ64x64, $c: AptosDataCache): boolean {
  return $.copy(uq.v).eq(u128('0'));
}

export function mul_(uq: UQ64x64, y: U64, $c: AptosDataCache): UQ64x64 {
  let v;
  v = $.copy(uq.v).mul(u128($.copy(y)));
  return new UQ64x64({ v: $.copy(v) }, new SimpleStructTag(UQ64x64));
}

export function to_u128_(uq: UQ64x64, $c: AptosDataCache): U128 {
  return $.copy(uq.v);
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x4e9fce03284c0ce0b86c88dd5a46f050cad2f4f33c4cdd29d98f501868558c81::uq64x64::UQ64x64',
    UQ64x64.UQ64x64Parser
  );
}
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
  get UQ64x64() {
    return UQ64x64;
  }
}
