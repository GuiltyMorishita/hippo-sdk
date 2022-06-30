import { HexString } from "aptos";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Comparator";

export const EQUAL: number = 0;
export const GREATER: number = 2;
export const SMALLER: number = 1;

export class Result {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Result";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "inner", typeTag: parseTypeTagOrThrow("u8")}
  ];

  inner: number;

  constructor(proto: any, public typeTag: TypeTag) {
    this.inner = proto['inner'] as number;
  }

  static ResultParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Result {
    const proto = parseStructProto(data, typeTag, repo, Result);
    return new Result(proto, typeTag);
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Comparator::Result", Result.ResultParser);
}