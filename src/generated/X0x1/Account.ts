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
export const moduleName = "Account";

export const MAX_U64: bigInt.BigInteger = bigInt("18446744073709551615");
export const EACCOUNT: bigInt.BigInteger = bigInt("0");
export const EADDR_NOT_MATCH_PREIMAGE: bigInt.BigInteger = bigInt("7");
export const ECANNOT_CREATE_AT_CORE_CODE: bigInt.BigInteger = bigInt("6");
export const ECANNOT_CREATE_AT_VM_RESERVED: bigInt.BigInteger = bigInt("4");
export const EGAS: bigInt.BigInteger = bigInt("5");
export const EMALFORMED_AUTHENTICATION_KEY: bigInt.BigInteger = bigInt("3");
export const EMODULE_NOT_ALLOWED: bigInt.BigInteger = bigInt("10");
export const EMULTI_AGENT_NOT_SUPPORTED: bigInt.BigInteger = bigInt("9");
export const ENOT_APTOS_FRAMEWORK: bigInt.BigInteger = bigInt("2");
export const ESCRIPT_NOT_ALLOWED: bigInt.BigInteger = bigInt("11");
export const ESEQUENCE_NUMBER_TOO_BIG: bigInt.BigInteger = bigInt("1");
export const EWRITESET_NOT_ALLOWED: bigInt.BigInteger = bigInt("8");
export const PROLOGUE_EACCOUNT_DNE: bigInt.BigInteger = bigInt("1004");
export const PROLOGUE_EBAD_CHAIN_ID: bigInt.BigInteger = bigInt("1007");
export const PROLOGUE_ECANT_PAY_GAS_DEPOSIT: bigInt.BigInteger = bigInt("1005");
export const PROLOGUE_EINVALID_ACCOUNT_AUTH_KEY: bigInt.BigInteger = bigInt("1001");
export const PROLOGUE_EINVALID_WRITESET_SENDER: bigInt.BigInteger = bigInt("1010");
export const PROLOGUE_EMODULE_NOT_ALLOWED: bigInt.BigInteger = bigInt("1009");
export const PROLOGUE_ESCRIPT_NOT_ALLOWED: bigInt.BigInteger = bigInt("1008");
export const PROLOGUE_ESECONDARY_KEYS_ADDRESSES_COUNT_MISMATCH: bigInt.BigInteger = bigInt("1012");
export const PROLOGUE_ESEQUENCE_NUMBER_TOO_BIG: bigInt.BigInteger = bigInt("1011");
export const PROLOGUE_ESEQUENCE_NUMBER_TOO_NEW: bigInt.BigInteger = bigInt("1003");
export const PROLOGUE_ESEQUENCE_NUMBER_TOO_OLD: bigInt.BigInteger = bigInt("1002");
export const PROLOGUE_ETRANSACTION_EXPIRED: bigInt.BigInteger = bigInt("1006");

export class Account {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Account";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "authentication_key", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "sequence_number", typeTag: parseTypeTagOrThrow("u64")},
    {name: "self_address", typeTag: parseTypeTagOrThrow("address")}
  ];

  authentication_key: AptosVectorU8;
  sequence_number: bigInt.BigInteger;
  self_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.authentication_key = proto['authentication_key'] as AptosVectorU8;
    this.sequence_number = proto['sequence_number'] as bigInt.BigInteger;
    this.self_address = proto['self_address'] as HexString;
  }

  static AccountParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Account {
    const proto = parseStructProto(data, typeTag, repo, Account);
    return new Account(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Account, typeParams);
    return result as unknown as Account;
  }

}

export class ChainSpecificAccountInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ChainSpecificAccountInfo";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "module_addr", typeTag: parseTypeTagOrThrow("address")},
    {name: "module_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "script_prologue_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "module_prologue_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "writeset_prologue_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "multi_agent_prologue_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "user_epilogue_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "writeset_epilogue_name", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "currency_code_required", typeTag: parseTypeTagOrThrow("bool")}
  ];

  module_addr: HexString;
  module_name: AptosVectorU8;
  script_prologue_name: AptosVectorU8;
  module_prologue_name: AptosVectorU8;
  writeset_prologue_name: AptosVectorU8;
  multi_agent_prologue_name: AptosVectorU8;
  user_epilogue_name: AptosVectorU8;
  writeset_epilogue_name: AptosVectorU8;
  currency_code_required: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.module_addr = proto['module_addr'] as HexString;
    this.module_name = proto['module_name'] as AptosVectorU8;
    this.script_prologue_name = proto['script_prologue_name'] as AptosVectorU8;
    this.module_prologue_name = proto['module_prologue_name'] as AptosVectorU8;
    this.writeset_prologue_name = proto['writeset_prologue_name'] as AptosVectorU8;
    this.multi_agent_prologue_name = proto['multi_agent_prologue_name'] as AptosVectorU8;
    this.user_epilogue_name = proto['user_epilogue_name'] as AptosVectorU8;
    this.writeset_epilogue_name = proto['writeset_epilogue_name'] as AptosVectorU8;
    this.currency_code_required = proto['currency_code_required'] as boolean;
  }

  static ChainSpecificAccountInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ChainSpecificAccountInfo {
    const proto = parseStructProto(data, typeTag, repo, ChainSpecificAccountInfo);
    return new ChainSpecificAccountInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ChainSpecificAccountInfo, typeParams);
    return result as unknown as ChainSpecificAccountInfo;
  }

}

export async function rotate_authentication_key(
  client: AptosClient,
  account: AptosAccount,
  new_auth_key: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Account::rotate_authentication_key",
    typeParamStrings,
    [
      new_auth_key.hex(),
    ]
  );
}
export function build_payload_rotate_authentication_key(
  new_auth_key: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Account::rotate_authentication_key",
    typeParamStrings,
    [
      new_auth_key.hex(),
    ]
  );
}

export async function create_account(
  client: AptosClient,
  account: AptosAccount,
  auth_key: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Account::create_account",
    typeParamStrings,
    [
      auth_key,
    ]
  );
}
export function build_payload_create_account(
  auth_key: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Account::create_account",
    typeParamStrings,
    [
      auth_key,
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Account::Account", Account.AccountParser);
  repo.addParser("0x1::Account::ChainSpecificAccountInfo", ChainSpecificAccountInfo.ChainSpecificAccountInfoParser);
}