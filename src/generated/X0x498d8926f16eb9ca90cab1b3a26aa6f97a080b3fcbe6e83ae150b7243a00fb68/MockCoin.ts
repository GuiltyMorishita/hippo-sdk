import { HexString } from "aptos";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";
import { AptosAccount } from "aptos";
import bigInt from "big-integer";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";
import * as X0x1 from "../X0x1";

export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "MockCoin";


export class TokenSharedCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenSharedCapability";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "mint", typeTag: parseTypeTagOrThrow("0x1::Coin::MintCapability<$tv0>")},
    {name: "burn", typeTag: parseTypeTagOrThrow("0x1::Coin::BurnCapability<$tv0>")}
  ];

  mint: X0x1.Coin.MintCapability;
  burn: X0x1.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint = proto['mint'] as X0x1.Coin.MintCapability;
    this.burn = proto['burn'] as X0x1.Coin.BurnCapability;
  }

  static TokenSharedCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenSharedCapability {
    const proto = parseStructProto(data, typeTag, repo, TokenSharedCapability);
    return new TokenSharedCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenSharedCapability, typeParams);
    return result as unknown as TokenSharedCapability;
  }

}

export class WBTC {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WBTC";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WBTCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WBTC {
    const proto = parseStructProto(data, typeTag, repo, WBTC);
    return new WBTC(proto, typeTag);
  }

}

export class WETH {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WETH";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WETHParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WETH {
    const proto = parseStructProto(data, typeTag, repo, WETH);
    return new WETH(proto, typeTag);
  }

}

export class WUSDT {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WUSDT";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WUSDTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WUSDT {
    const proto = parseStructProto(data, typeTag, repo, WUSDT);
    return new WUSDT(proto, typeTag);
  }

}

export class WUSDC {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WUSDC";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WUSDCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WUSDC {
    const proto = parseStructProto(data, typeTag, repo, WUSDC);
    return new WUSDC(proto, typeTag);
  }

}

export class WDAI {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WDAI";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WDAIParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WDAI {
    const proto = parseStructProto(data, typeTag, repo, WDAI);
    return new WDAI(proto, typeTag);
  }

}

export class WDOT {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WDOT";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WDOTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WDOT {
    const proto = parseStructProto(data, typeTag, repo, WDOT);
    return new WDOT(proto, typeTag);
  }

}

export class WSOL {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WSOL";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static WSOLParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WSOL {
    const proto = parseStructProto(data, typeTag, repo, WSOL);
    return new WSOL(proto, typeTag);
  }

}

export async function faucet_mint_to_script(
  client: AptosClient,
  account: AptosAccount,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::faucet_mint_to_script",
    typeParamStrings,
    [
      amount.toString(),
    ]
  );
}
export function build_payload_faucet_mint_to_script(
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::faucet_mint_to_script",
    typeParamStrings,
    [
      amount.toString(),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::TokenSharedCapability", TokenSharedCapability.TokenSharedCapabilityParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WBTC", WBTC.WBTCParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WETH", WETH.WETHParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WUSDT", WUSDT.WUSDTParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WUSDC", WUSDC.WUSDCParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WDAI", WDAI.WDAIParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WDOT", WDOT.WDOTParser);
  repo.addParser("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::MockCoin::WSOL", WSOL.WSOLParser);
}