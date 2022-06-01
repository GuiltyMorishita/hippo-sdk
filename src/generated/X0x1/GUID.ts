import { HexString } from "aptos";
import bigInt from "big-integer";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";

export const moduleAddress = new HexString("0x1");
export const moduleName = "GUID";

export const EGUID_GENERATOR_NOT_PUBLISHED: bigInt.BigInteger = bigInt("0");

export class Generator {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Generator";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "counter", typeTag: parseTypeTagOrThrow("u64")}
  ];

  counter: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.counter = proto['counter'] as bigInt.BigInteger;
  }

  static GeneratorParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Generator {
    const proto = parseStructProto(data, typeTag, repo, Generator);
    return new Generator(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Generator, typeParams);
    return result as unknown as Generator;
  }

}

export class GUID {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "GUID";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "id", typeTag: parseTypeTagOrThrow("0x1::GUID::ID")}
  ];

  id: ID;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as ID;
  }

  static GUIDParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GUID {
    const proto = parseStructProto(data, typeTag, repo, GUID);
    return new GUID(proto, typeTag);
  }

}

export class ID {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ID";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "creation_num", typeTag: parseTypeTagOrThrow("u64")},
    {name: "addr", typeTag: parseTypeTagOrThrow("address")}
  ];

  creation_num: bigInt.BigInteger;
  addr: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.creation_num = proto['creation_num'] as bigInt.BigInteger;
    this.addr = proto['addr'] as HexString;
  }

  static IDParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ID {
    const proto = parseStructProto(data, typeTag, repo, ID);
    return new ID(proto, typeTag);
  }

}

export class CreateCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CreateCapability";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "addr", typeTag: parseTypeTagOrThrow("address")}
  ];

  addr: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.addr = proto['addr'] as HexString;
  }

  static CreateCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CreateCapability {
    const proto = parseStructProto(data, typeTag, repo, CreateCapability);
    return new CreateCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CreateCapability, typeParams);
    return result as unknown as CreateCapability;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::GUID::Generator", Generator.GeneratorParser);
  repo.addParser("0x1::GUID::GUID", GUID.GUIDParser);
  repo.addParser("0x1::GUID::ID", ID.IDParser);
  repo.addParser("0x1::GUID::CreateCapability", CreateCapability.CreateCapabilityParser);
}