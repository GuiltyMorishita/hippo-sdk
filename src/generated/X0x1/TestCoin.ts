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
import * as Coin from "./Coin";

export const moduleAddress = new HexString("0x1");
export const moduleName = "TestCoin";

export const EALREADY_DELEGATED: bigInt.BigInteger = bigInt("2");
export const EDELEGATION_NOT_FOUND: bigInt.BigInteger = bigInt("3");
export const ENO_CAPABILITIES: bigInt.BigInteger = bigInt("1");

export class TestCoin {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TestCoin";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static TestCoinParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TestCoin {
    const proto = parseStructProto(data, typeTag, repo, TestCoin);
    return new TestCoin(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TestCoin, typeParams);
    return result as unknown as TestCoin;
  }

}

export class Capabilities {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Capabilities";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "mint_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::MintCapability<0x1::TestCoin::TestCoin>")}
  ];

  mint_cap: Coin.MintCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as Coin.MintCapability;
  }

  static CapabilitiesParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Capabilities {
    const proto = parseStructProto(data, typeTag, repo, Capabilities);
    return new Capabilities(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Capabilities, typeParams);
    return result as unknown as Capabilities;
  }

}

export class DelegatedMintCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DelegatedMintCapability";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "to", typeTag: parseTypeTagOrThrow("address")}
  ];

  to: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.to = proto['to'] as HexString;
  }

  static DelegatedMintCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DelegatedMintCapability {
    const proto = parseStructProto(data, typeTag, repo, DelegatedMintCapability);
    return new DelegatedMintCapability(proto, typeTag);
  }

}

export class Delegations {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Delegations";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "inner", typeTag: parseTypeTagOrThrow("vector<0x1::TestCoin::DelegatedMintCapability>")}
  ];

  inner: DelegatedMintCapability[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.inner = proto['inner'] as DelegatedMintCapability[];
  }

  static DelegationsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Delegations {
    const proto = parseStructProto(data, typeTag, repo, Delegations);
    return new Delegations(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Delegations, typeParams);
    return result as unknown as Delegations;
  }

}

export async function mint(
  client: AptosClient,
  account: AptosAccount,
  dst_addr: HexString,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::TestCoin::mint",
    typeParamStrings,
    [
      dst_addr,
      amount.toString(),
    ]
  );
}
export function build_payload_mint(
  dst_addr: HexString,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::TestCoin::mint",
    typeParamStrings,
    [
      dst_addr,
      amount.toString(),
    ]
  );
}

export async function delegate_mint_capability(
  client: AptosClient,
  account: AptosAccount,
  to: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::TestCoin::delegate_mint_capability",
    typeParamStrings,
    [
      to,
    ]
  );
}
export function build_payload_delegate_mint_capability(
  to: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::TestCoin::delegate_mint_capability",
    typeParamStrings,
    [
      to,
    ]
  );
}

export async function claim_mint_capability(
  client: AptosClient,
  account: AptosAccount,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::TestCoin::claim_mint_capability",
    typeParamStrings,
    []
  );
}
export function build_payload_claim_mint_capability(
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::TestCoin::claim_mint_capability",
    typeParamStrings,
    []
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::TestCoin::TestCoin", TestCoin.TestCoinParser);
  repo.addParser("0x1::TestCoin::Capabilities", Capabilities.CapabilitiesParser);
  repo.addParser("0x1::TestCoin::DelegatedMintCapability", DelegatedMintCapability.DelegatedMintCapabilityParser);
  repo.addParser("0x1::TestCoin::Delegations", Delegations.DelegationsParser);
}