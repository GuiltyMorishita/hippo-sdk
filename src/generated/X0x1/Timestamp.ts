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
export const moduleName = "Timestamp";

export const ENOT_GENESIS: bigInt.BigInteger = bigInt("0");
export const ENOT_OPERATING: bigInt.BigInteger = bigInt("1");
export const ETIMESTAMP: bigInt.BigInteger = bigInt("2");
export const MICRO_CONVERSION_FACTOR: bigInt.BigInteger = bigInt("1000000");

export class CurrentTimeMicroseconds {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CurrentTimeMicroseconds";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "microseconds", typeTag: parseTypeTagOrThrow("u64")}
  ];

  microseconds: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.microseconds = proto['microseconds'] as bigInt.BigInteger;
  }

  static CurrentTimeMicrosecondsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CurrentTimeMicroseconds {
    const proto = parseStructProto(data, typeTag, repo, CurrentTimeMicroseconds);
    return new CurrentTimeMicroseconds(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CurrentTimeMicroseconds, typeParams);
    return result as unknown as CurrentTimeMicroseconds;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Timestamp::CurrentTimeMicroseconds", CurrentTimeMicroseconds.CurrentTimeMicrosecondsParser);
}