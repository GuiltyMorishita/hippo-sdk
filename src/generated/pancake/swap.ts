import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'PancakeSwap';
export const moduleAddress = new HexString('0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa');
export const moduleName = 'swap';

export const ERROR_INSUFFICIENT_OUTPUT_AMOUNT: U64 = u64('13');
export const RESOURCE_ACCOUNT: HexString = new HexString(
  '0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa'
);

export class TokenPairReserve {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'TokenPairReserve';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'reserve_x', typeTag: AtomicTypeTag.U64 },
    { name: 'reserve_y', typeTag: AtomicTypeTag.U64 },
    { name: 'block_timestamp_last', typeTag: AtomicTypeTag.U64 }
  ];

  reserve_x: U64;
  reserve_y: U64;
  block_timestamp_last: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as U64;
    this.reserve_y = proto['reserve_y'] as U64;
    this.block_timestamp_last = proto['block_timestamp_last'] as U64;
  }

  static TokenPairReserveParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): TokenPairReserve {
    const proto = $.parseStructProto(data, typeTag, repo, TokenPairReserve);
    return new TokenPairReserve(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairReserve, typeParams);
    return result as unknown as TokenPairReserve;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, TokenPairReserve, typeParams);
    await result.loadFullState(app);
    return result as unknown as TokenPairReserve;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'TokenPairReserve', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function token_reserves_($c: AptosDataCache, $p: TypeTag[] /* <X, Y>*/): [U64, U64, U64] {
  let reserve;
  reserve = $c.borrow_global<TokenPairReserve>(
    new SimpleStructTag(TokenPairReserve, [$p[0], $p[1]]),
    $.copy(RESOURCE_ACCOUNT)
  );
  return [$.copy(reserve.reserve_x), $.copy(reserve.reserve_y), $.copy(reserve.block_timestamp_last)];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::swap::TokenPairReserve',
    TokenPairReserve.TokenPairReserveParser
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
  get TokenPairReserve() {
    return TokenPairReserve;
  }
  async loadTokenPairReserve(owner: HexString, $p: TypeTag[] /* <X, Y> */, loadFull = true, fillCache = true) {
    const val = await TokenPairReserve.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
}
