import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'ditto-staking';
export const moduleAddress = new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894');
export const moduleName = 'staked_coin';

export class StakedAptos {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'StakedAptos';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [{ name: 'dummy_field', typeTag: AtomicTypeTag.Bool }];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static StakedAptosParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): StakedAptos {
    const proto = $.parseStructProto(data, typeTag, repo, StakedAptos);
    return new StakedAptos(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'StakedAptos', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894::staked_coin::StakedAptos',
    StakedAptos.StakedAptosParser
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
  get StakedAptos() {
    return StakedAptos;
  }
}
