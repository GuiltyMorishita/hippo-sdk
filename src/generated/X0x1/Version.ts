import { HexString } from "aptos";
import bigInt from "big-integer";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";
import { AptosAccount } from "aptos";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Version";

export const ECONFIG: bigInt.BigInteger = bigInt("0");
export const EINVALID_MAJOR_VERSION_NUMBER: bigInt.BigInteger = bigInt("1");

export class Version {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Version";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "major", typeTag: parseTypeTagOrThrow("u64")}
  ];

  major: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.major = proto['major'] as bigInt.BigInteger;
  }

  static VersionParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Version {
    const proto = parseStructProto(data, typeTag, repo, Version);
    return new Version(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Version, typeParams);
    return result as unknown as Version;
  }

}

export async function set_version(
  client: AptosClient,
  account: AptosAccount,
  major: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Version::set_version",
    typeParamStrings,
    [
      major.toString(),
    ]
  );
}
export function build_payload_set_version(
  major: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Version::set_version",
    typeParamStrings,
    [
      major.toString(),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Version::Version", Version.VersionParser);
}