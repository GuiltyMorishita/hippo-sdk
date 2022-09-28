import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Stdlib from "../stdlib";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c9154b6b64db01eeb77d08255300315e1fa35b687d384a703f6034fbd");
export const moduleName = "open_table";



export class OpenTable 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "OpenTable";
  static typeParameters: TypeParamDeclType[] = [
    { name: "K", isPhantom: false },
    { name: "V", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "base_table", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)]) },
  { name: "keys", typeTag: new VectorTag(new $.TypeParamIdx(0)) }];

  base_table: Stdlib.Table.Table;
  keys: any[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.base_table = proto['base_table'] as Stdlib.Table.Table;
    this.keys = proto['keys'] as any[];
  }

  static OpenTableParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OpenTable {
    const proto = $.parseStructProto(data, typeTag, repo, OpenTable);
    return new OpenTable(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "OpenTable", $p);
  }
  async loadFullState(app: $.AppType) {
    await this.base_table.loadFullState(app);
    this.__app = app;
  }

}
export function add_ (
  open_table: OpenTable,
  key: any,
  value: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): void {
  Stdlib.Table.add_(open_table.base_table, $.copy(key), value, $c, [$p[0], $p[1]]);
  Stdlib.Vector.push_back_(open_table.keys, $.copy(key), $c, [$p[0]]);
  return;
}

export function borrow_ (
  open_table: OpenTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): any {
  return Stdlib.Table.borrow_(open_table.base_table, $.copy(key), $c, [$p[0], $p[1]]);
}

export function borrow_mut_ (
  open_table: OpenTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): any {
  return Stdlib.Table.borrow_mut_(open_table.base_table, $.copy(key), $c, [$p[0], $p[1]]);
}

export function contains_ (
  open_table: OpenTable,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): boolean {
  return Stdlib.Table.contains_(open_table.base_table, $.copy(key), $c, [$p[0], $p[1]]);
}

export function empty_ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): OpenTable {
  return new OpenTable({ base_table: Stdlib.Table.new___($c, [$p[0], $p[1]]), keys: Stdlib.Vector.empty_($c, [$p[0]]) }, new SimpleStructTag(OpenTable, [$p[0], $p[1]]));
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xc0deb00c9154b6b64db01eeb77d08255300315e1fa35b687d384a703f6034fbd::open_table::OpenTable", OpenTable.OpenTableParser);
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
  get OpenTable() { return OpenTable; }
}

