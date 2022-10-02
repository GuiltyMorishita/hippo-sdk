import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'curves';

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

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::curves::Stable',
    Stable.StableParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::curves::Uncorrelated',
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
