import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'hippo-swap';
export const moduleAddress = new HexString('0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f');
export const moduleName = 'utils';

export class PoolInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolInfo';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'pool_type', typeTag: AtomicTypeTag.U8 },
    { name: 'pool_idx', typeTag: AtomicTypeTag.U8 }
  ];

  pool_type: U8;
  pool_idx: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_type = proto['pool_type'] as U8;
    this.pool_idx = proto['pool_idx'] as U8;
  }

  static PoolInfoParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, PoolInfo);
    return new PoolInfo(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolInfo', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class PoolList {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolList';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: 'list',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f'),
          'utils',
          'PoolInfo',
          []
        )
      )
    }
  ];

  list: PoolInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.list = proto['list'] as PoolInfo[];
  }

  static PoolListParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolList {
    const proto = $.parseStructProto(data, typeTag, repo, PoolList);
    return new PoolList(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PoolList, typeParams);
    return result as unknown as PoolList;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, PoolList, typeParams);
    await result.loadFullState(app);
    return result as unknown as PoolList;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolList', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function compute_pool_list_($c: AptosDataCache): PoolList {
  let list;
  list = Stdlib.Vector.empty_($c, [new SimpleStructTag(PoolInfo)]);
  Stdlib.Vector.push_back_(
    list,
    new PoolInfo({ pool_type: u8('0'), pool_idx: u8('0') }, new SimpleStructTag(PoolInfo)),
    $c,
    [new SimpleStructTag(PoolInfo)]
  );
  return new PoolList({ list: $.copy(list) }, new SimpleStructTag(PoolList));
}

export function get_pool_list_(user: HexString, $c: AptosDataCache): void {
  if ($c.exists(new SimpleStructTag(PoolList), Stdlib.Signer.address_of_(user, $c))) {
    $c.move_from<PoolList>(new SimpleStructTag(PoolList), Stdlib.Signer.address_of_(user, $c));
  } else {
  }
  return $c.move_to(new SimpleStructTag(PoolList), user, compute_pool_list_($c));
}

export function buildPayload_get_pool_list(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f'),
    'utils',
    'get_pool_list',
    typeParamStrings,
    [],
    isJSON
  );
}

export async function query_get_pool_list(
  client: AptosClient,
  fetcher: $.SimulationKeys,
  repo: AptosParserRepo,
  $p: TypeTag[]
) {
  const payload = buildPayload_get_pool_list();
  const outputTypeTag = new SimpleStructTag(PoolList);
  const output = await $.simulatePayloadTx(client, fetcher, payload);
  return $.takeSimulationValue<PoolList>(output, outputTypeTag, repo);
}
function make_query_get_pool_list(app: App) {
  function maker(fetcher: $.SimulationKeys, $p: TypeTag[]) {
    return query_get_pool_list(app.client, fetcher, app.repo, $p);
  }
  return maker;
}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f::utils::PoolInfo',
    PoolInfo.PoolInfoParser
  );
  repo.addParser(
    '0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f::utils::PoolList',
    PoolList.PoolListParser
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
  get PoolInfo() {
    return PoolInfo;
  }
  get PoolList() {
    return PoolList;
  }
  async loadPoolList(owner: HexString, loadFull = true, fillCache = true) {
    const val = await PoolList.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  payload_get_pool_list(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_get_pool_list(isJSON);
  }
  async get_pool_list(_account: AptosAccount, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_get_pool_list(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  get query_get_pool_list() {
    return make_query_get_pool_list(this);
  }
}
