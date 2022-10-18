import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12');
export const moduleName = 'curves';

export const ERR_INVALID_CURVE: U64 = u64('10001');

export class Stable {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Stable';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static StableParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Stable {
    const proto = $.parseStructProto(data, typeTag, repo, Stable);
    return new Stable(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Stable', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class Uncorrelated {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Uncorrelated';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static UncorrelatedParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Uncorrelated {
    const proto = $.parseStructProto(data, typeTag, repo, Uncorrelated);
    return new Uncorrelated(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Uncorrelated', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function assert_valid_curve_($c: AptosDataCache, $p: TypeTag[] /* <Curve>*/): void {
  if (!is_valid_curve_($c, [$p[0]])) {
    throw $.abortCode($.copy(ERR_INVALID_CURVE));
  }
  return;
}

export function is_stable_($c: AptosDataCache, $p: TypeTag[] /* <Curve>*/): boolean {
  return $.deep_eq(
    Stdlib.Type_info.type_of_($c, [$p[0]]),
    Stdlib.Type_info.type_of_($c, [new SimpleStructTag(Stable)])
  );
}

export function is_uncorrelated_($c: AptosDataCache, $p: TypeTag[] /* <Curve>*/): boolean {
  return $.deep_eq(
    Stdlib.Type_info.type_of_($c, [$p[0]]),
    Stdlib.Type_info.type_of_($c, [new SimpleStructTag(Uncorrelated)])
  );
}

export function is_valid_curve_($c: AptosDataCache, $p: TypeTag[] /* <Curve>*/): boolean {
  let temp$1;
  if (is_uncorrelated_($c, [$p[0]])) {
    temp$1 = true;
  } else {
    temp$1 = is_stable_($c, [$p[0]]);
  }
  return temp$1;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Stable',
    Stable.StableParser
  );
  repo.addParser(
    '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated',
    Uncorrelated.UncorrelatedParser
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
  get Stable() {
    return Stable;
  }
  get Uncorrelated() {
    return Uncorrelated;
  }
}
