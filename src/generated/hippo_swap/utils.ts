import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Std from "../std";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "utils";



export class PoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PoolInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_type", typeTag: AtomicTypeTag.U8 },
  { name: "pool_idx", typeTag: AtomicTypeTag.U8 }];

  pool_type: U8;
  pool_idx: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_type = proto['pool_type'] as U8;
    this.pool_idx = proto['pool_idx'] as U8;
  }

  static PoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, PoolInfo);
    return new PoolInfo(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PoolInfo", []);
  }

}

export class PoolList 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PoolList";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "list", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolInfo", [])) }];

  list: PoolInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.list = proto['list'] as PoolInfo[];
  }

  static PoolListParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PoolList {
    const proto = $.parseStructProto(data, typeTag, repo, PoolList);
    return new PoolList(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PoolList, typeParams);
    return result as unknown as PoolList;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PoolList", []);
  }

}
export function compute_pool_list_ (
  $c: AptosDataCache,
): PoolList {
  let list;
  list = Std.Vector.empty_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolInfo", [])]);
  Std.Vector.push_back_(list, new PoolInfo({ pool_type: u8("0"), pool_idx: u8("0") }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolInfo", [])), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolInfo", [])]);
  return new PoolList({ list: $.copy(list) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolList", []));
}

export function get_pool_list_ (
  user: HexString,
  $c: AptosDataCache,
): void {
  if ($c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolList", []), Std.Signer.address_of_(user, $c))) {
    $c.move_from<PoolList>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolList", []), Std.Signer.address_of_(user, $c));
  }
  else{
  }
  return $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolList", []), user, compute_pool_list_($c));
}


export function buildPayload_get_pool_list (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::utils::get_pool_list",
    typeParamStrings,
    []
  );

}

export async function query_get_pool_list(
  client: AptosClient,
  account: AptosAccount,
  repo: AptosParserRepo,
  $p: TypeTag[],
) {
  const payload = buildPayload_get_pool_list();
  const outputTypeTag = new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "utils", "PoolList", []);
  const output = await $.simulatePayloadTx(client, account, payload);
  return $.takeSimulationValue<PoolList>(output, outputTypeTag, repo)
}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::utils::PoolInfo", PoolInfo.PoolInfoParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::utils::PoolList", PoolList.PoolListParser);
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
  }
  async loadPoolList(
    owner: HexString,
  ) {
    return PoolList.load(this.repo, this.client, owner, [] as TypeTag[]);
  }
  get_pool_list(
  ) {
    return buildPayload_get_pool_list();
  }
}

