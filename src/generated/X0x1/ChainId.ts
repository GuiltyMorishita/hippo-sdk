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
export const moduleName = "ChainId";

export const ECHAIN_ID: bigInt.BigInteger = bigInt("0");

export class ChainId {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ChainId";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "id", typeTag: parseTypeTagOrThrow("u8")}
  ];

  id: number;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as number;
  }

  static ChainIdParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ChainId {
    const proto = parseStructProto(data, typeTag, repo, ChainId);
    return new ChainId(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ChainId, typeParams);
    return result as unknown as ChainId;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::ChainId::ChainId", ChainId.ChainIdParser);
}