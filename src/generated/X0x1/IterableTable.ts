import { HexString } from "aptos";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import * as Option from "./Option";
import * as Table from "./Table";

export const moduleAddress = new HexString("0x1");
export const moduleName = "IterableTable";


export class IterableValue {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "IterableValue";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: false},
    {name: "$tv1", isPhantom: false}
  ];
  static fields: FieldDeclType[] = [
    {name: "val", typeTag: parseTypeTagOrThrow("$tv1")},
    {name: "prev", typeTag: parseTypeTagOrThrow("0x1::Option::Option<$tv0>")},
    {name: "next", typeTag: parseTypeTagOrThrow("0x1::Option::Option<$tv0>")}
  ];

  val: any;
  prev: Option.Option;
  next: Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.val = proto['val'] as any;
    this.prev = proto['prev'] as Option.Option;
    this.next = proto['next'] as Option.Option;
  }

  static IterableValueParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : IterableValue {
    const proto = parseStructProto(data, typeTag, repo, IterableValue);
    return new IterableValue(proto, typeTag);
  }

}

export class IterableTable {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "IterableTable";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: false},
    {name: "$tv1", isPhantom: false}
  ];
  static fields: FieldDeclType[] = [
    {name: "inner", typeTag: parseTypeTagOrThrow("0x1::Table::Table<$tv0,0x1::IterableTable::IterableValue<$tv0,$tv1>>")},
    {name: "head", typeTag: parseTypeTagOrThrow("0x1::Option::Option<$tv0>")},
    {name: "tail", typeTag: parseTypeTagOrThrow("0x1::Option::Option<$tv0>")}
  ];

  inner: Table.Table;
  head: Option.Option;
  tail: Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.inner = proto['inner'] as Table.Table;
    this.head = proto['head'] as Option.Option;
    this.tail = proto['tail'] as Option.Option;
  }

  static IterableTableParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : IterableTable {
    const proto = parseStructProto(data, typeTag, repo, IterableTable);
    return new IterableTable(proto, typeTag);
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::IterableTable::IterableValue", IterableValue.IterableValueParser);
  repo.addParser("0x1::IterableTable::IterableTable", IterableTable.IterableTableParser);
}