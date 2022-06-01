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
import { AptosAccount } from "aptos";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x1");
export const moduleName = "TransactionPublishingOption";

export const ECONFIG: bigInt.BigInteger = bigInt("1");

export class TransactionPublishingOption {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TransactionPublishingOption";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "script_allow_list", typeTag: parseTypeTagOrThrow("vector<vector<u8>>")},
    {name: "module_publishing_allowed", typeTag: parseTypeTagOrThrow("bool")}
  ];

  script_allow_list: AptosVectorU8[];
  module_publishing_allowed: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.script_allow_list = proto['script_allow_list'] as AptosVectorU8[];
    this.module_publishing_allowed = proto['module_publishing_allowed'] as boolean;
  }

  static TransactionPublishingOptionParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TransactionPublishingOption {
    const proto = parseStructProto(data, typeTag, repo, TransactionPublishingOption);
    return new TransactionPublishingOption(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TransactionPublishingOption, typeParams);
    return result as unknown as TransactionPublishingOption;
  }

}

export async function set_module_publishing_allowed(
  client: AptosClient,
  account: AptosAccount,
  is_allowed: boolean,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::TransactionPublishingOption::set_module_publishing_allowed",
    typeParamStrings,
    [
      is_allowed,
    ]
  );
}
export function build_payload_set_module_publishing_allowed(
  is_allowed: boolean,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::TransactionPublishingOption::set_module_publishing_allowed",
    typeParamStrings,
    [
      is_allowed,
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::TransactionPublishingOption::TransactionPublishingOption", TransactionPublishingOption.TransactionPublishingOptionParser);
}