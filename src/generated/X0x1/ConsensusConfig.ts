import { HexString } from "aptos";
import bigInt from "big-integer";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { AptosVectorU8 } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";

export const moduleAddress = new HexString("0x1");
export const moduleName = "ConsensusConfig";

export const ECONFIG: bigInt.BigInteger = bigInt("0");

export class ConsensusConfig {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ConsensusConfig";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "config", typeTag: parseTypeTagOrThrow("vector<u8>")}
  ];

  config: AptosVectorU8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.config = proto['config'] as AptosVectorU8;
  }

  static ConsensusConfigParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ConsensusConfig {
    const proto = parseStructProto(data, typeTag, repo, ConsensusConfig);
    return new ConsensusConfig(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ConsensusConfig, typeParams);
    return result as unknown as ConsensusConfig;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::ConsensusConfig::ConsensusConfig", ConsensusConfig.ConsensusConfigParser);
}