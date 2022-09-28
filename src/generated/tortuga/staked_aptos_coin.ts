import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'tortuga-stub';
export const moduleAddress = new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab');
export const moduleName = 'staked_aptos_coin';

export class StakedAptosCoin {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'StakedAptosCoin';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [{ name: 'dummy_field', typeTag: AtomicTypeTag.Bool }];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static StakedAptosCoinParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): StakedAptosCoin {
    const proto = $.parseStructProto(data, typeTag, repo, StakedAptosCoin);
    return new StakedAptosCoin(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'StakedAptosCoin', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab::staked_aptos_coin::StakedAptosCoin',
    StakedAptosCoin.StakedAptosCoinParser
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
  get StakedAptosCoin() {
    return StakedAptosCoin;
  }
}
