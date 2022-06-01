import { HexString } from "aptos";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";
import * as Coin from "./Coin";

export const moduleAddress = new HexString("0x1");
export const moduleName = "TransactionFee";


export class TestCoinCapabilities {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TestCoinCapabilities";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "burn_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::BurnCapability<0x1::TestCoin::TestCoin>")}
  ];

  burn_cap: Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.burn_cap = proto['burn_cap'] as Coin.BurnCapability;
  }

  static TestCoinCapabilitiesParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TestCoinCapabilities {
    const proto = parseStructProto(data, typeTag, repo, TestCoinCapabilities);
    return new TestCoinCapabilities(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TestCoinCapabilities, typeParams);
    return result as unknown as TestCoinCapabilities;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::TransactionFee::TestCoinCapabilities", TestCoinCapabilities.TestCoinCapabilitiesParser);
}