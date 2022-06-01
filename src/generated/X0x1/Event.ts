import { HexString } from "aptos";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import bigInt from "big-integer";
import { AptosClient } from "aptos";
import * as GUID from "./GUID";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Event";


export class GUIDWrapper {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "GUIDWrapper";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "len_bytes", typeTag: parseTypeTagOrThrow("u8")},
    {name: "guid", typeTag: parseTypeTagOrThrow("0x1::GUID::GUID")}
  ];

  len_bytes: number;
  guid: GUID.GUID;

  constructor(proto: any, public typeTag: TypeTag) {
    this.len_bytes = proto['len_bytes'] as number;
    this.guid = proto['guid'] as GUID.GUID;
  }

  static GUIDWrapperParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GUIDWrapper {
    const proto = parseStructProto(data, typeTag, repo, GUIDWrapper);
    return new GUIDWrapper(proto, typeTag);
  }

}

export class EventHandle {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "EventHandle";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "counter", typeTag: parseTypeTagOrThrow("u64")},
    {name: "guid", typeTag: parseTypeTagOrThrow("0x1::Event::GUIDWrapper")}
  ];

  counter: bigInt.BigInteger;
  guid: GUIDWrapper;

  constructor(proto: any, public typeTag: TypeTag) {
    this.counter = proto['counter'] as bigInt.BigInteger;
    this.guid = proto['guid'] as GUIDWrapper;
  }

  static EventHandleParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : EventHandle {
    const proto = parseStructProto(data, typeTag, repo, EventHandle);
    return new EventHandle(proto, typeTag);
  }

}

export class EventHandleGenerator {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "EventHandleGenerator";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "counter", typeTag: parseTypeTagOrThrow("u64")},
    {name: "addr", typeTag: parseTypeTagOrThrow("address")}
  ];

  counter: bigInt.BigInteger;
  addr: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.counter = proto['counter'] as bigInt.BigInteger;
    this.addr = proto['addr'] as HexString;
  }

  static EventHandleGeneratorParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : EventHandleGenerator {
    const proto = parseStructProto(data, typeTag, repo, EventHandleGenerator);
    return new EventHandleGenerator(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, EventHandleGenerator, typeParams);
    return result as unknown as EventHandleGenerator;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Event::GUIDWrapper", GUIDWrapper.GUIDWrapperParser);
  repo.addParser("0x1::Event::EventHandle", EventHandle.EventHandleParser);
  repo.addParser("0x1::Event::EventHandleGenerator", EventHandleGenerator.EventHandleGeneratorParser);
}