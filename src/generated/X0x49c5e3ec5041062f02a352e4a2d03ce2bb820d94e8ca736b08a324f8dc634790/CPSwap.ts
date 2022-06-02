import { HexString } from "aptos";
import bigInt from "big-integer";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";
import * as X0x1 from "../X0x1";

export const moduleAddress = new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");
export const moduleName = "CPSwap";

export const ERROR_INSUFFICIENT_AMOUNT: bigInt.BigInteger = bigInt("6");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT: bigInt.BigInteger = bigInt("14");
export const ERROR_INSUFFICIENT_LIQUIDITY: bigInt.BigInteger = bigInt("7");
export const BALANCE_MAX: bigInt.BigInteger = bigInt("5192296858534827628530496329220095");
export const ERROR_ALREADY_INITIALIZED: bigInt.BigInteger = bigInt("1");
export const ERROR_ALREADY_LOCKED: bigInt.BigInteger = bigInt("3");
export const ERROR_INSUFFICIENT_LIQUIDITY_BURNED: bigInt.BigInteger = bigInt("10");
export const ERROR_INSUFFICIENT_LIQUIDITY_MINTED: bigInt.BigInteger = bigInt("4");
export const ERROR_INSUFFICIENT_OUTPUT_AMOUNT: bigInt.BigInteger = bigInt("13");
export const ERROR_INSUFFICIENT_TOKEN0_AMOUNT: bigInt.BigInteger = bigInt("11");
export const ERROR_INSUFFICIENT_TOKEN1_AMOUNT: bigInt.BigInteger = bigInt("12");
export const ERROR_INVALID_AMOUNT: bigInt.BigInteger = bigInt("8");
export const ERROR_K: bigInt.BigInteger = bigInt("15");
export const ERROR_NOT_CREATOR: bigInt.BigInteger = bigInt("2");
export const ERROR_ONLY_ADMIN: bigInt.BigInteger = bigInt("0");
export const ERROR_OVERFLOW: bigInt.BigInteger = bigInt("5");
export const ERROR_TOKENS_NOT_SORTED: bigInt.BigInteger = bigInt("9");
export const ERROR_X_NOT_REGISTERED: bigInt.BigInteger = bigInt("16");
export const ERROR_Y_NOT_REGISTERED: bigInt.BigInteger = bigInt("16");
export const MINIMUM_LIQUIDITY: bigInt.BigInteger = bigInt("1000");
export const MODULE_ADMIN: HexString = new HexString("49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");

export class LPToken {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LPToken";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true},
    {name: "$tv1", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static LPTokenParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LPToken {
    const proto = parseStructProto(data, typeTag, repo, LPToken);
    return new LPToken(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LPToken, typeParams);
    return result as unknown as LPToken;
  }

}

export class TokenPairMetadata {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenPairMetadata";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true},
    {name: "$tv1", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "locked", typeTag: parseTypeTagOrThrow("bool")},
    {name: "creator", typeTag: parseTypeTagOrThrow("address")},
    {name: "fee_to", typeTag: parseTypeTagOrThrow("address")},
    {name: "fee_on", typeTag: parseTypeTagOrThrow("bool")},
    {name: "k_last", typeTag: parseTypeTagOrThrow("u128")},
    {name: "lp", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::CPSwap::LPToken<$tv0,$tv1>>")},
    {name: "balance_x", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv0>")},
    {name: "balance_y", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv1>")},
    {name: "mint_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::MintCapability<0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::CPSwap::LPToken<$tv0,$tv1>>")},
    {name: "burn_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::BurnCapability<0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::CPSwap::LPToken<$tv0,$tv1>>")}
  ];

  locked: boolean;
  creator: HexString;
  fee_to: HexString;
  fee_on: boolean;
  k_last: bigInt.BigInteger;
  lp: X0x1.Coin.Coin;
  balance_x: X0x1.Coin.Coin;
  balance_y: X0x1.Coin.Coin;
  mint_cap: X0x1.Coin.MintCapability;
  burn_cap: X0x1.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.locked = proto['locked'] as boolean;
    this.creator = proto['creator'] as HexString;
    this.fee_to = proto['fee_to'] as HexString;
    this.fee_on = proto['fee_on'] as boolean;
    this.k_last = proto['k_last'] as bigInt.BigInteger;
    this.lp = proto['lp'] as X0x1.Coin.Coin;
    this.balance_x = proto['balance_x'] as X0x1.Coin.Coin;
    this.balance_y = proto['balance_y'] as X0x1.Coin.Coin;
    this.mint_cap = proto['mint_cap'] as X0x1.Coin.MintCapability;
    this.burn_cap = proto['burn_cap'] as X0x1.Coin.BurnCapability;
  }

  static TokenPairMetadataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenPairMetadata {
    const proto = parseStructProto(data, typeTag, repo, TokenPairMetadata);
    return new TokenPairMetadata(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairMetadata, typeParams);
    return result as unknown as TokenPairMetadata;
  }

}

export class TokenPairReserve {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenPairReserve";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true},
    {name: "$tv1", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "reserve_x", typeTag: parseTypeTagOrThrow("u64")},
    {name: "reserve_y", typeTag: parseTypeTagOrThrow("u64")},
    {name: "block_timestamp_last", typeTag: parseTypeTagOrThrow("u64")}
  ];

  reserve_x: bigInt.BigInteger;
  reserve_y: bigInt.BigInteger;
  block_timestamp_last: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as bigInt.BigInteger;
    this.reserve_y = proto['reserve_y'] as bigInt.BigInteger;
    this.block_timestamp_last = proto['block_timestamp_last'] as bigInt.BigInteger;
  }

  static TokenPairReserveParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenPairReserve {
    const proto = parseStructProto(data, typeTag, repo, TokenPairReserve);
    return new TokenPairReserve(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairReserve, typeParams);
    return result as unknown as TokenPairReserve;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::CPSwap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::CPSwap::TokenPairMetadata", TokenPairMetadata.TokenPairMetadataParser);
  repo.addParser("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::CPSwap::TokenPairReserve", TokenPairReserve.TokenPairReserveParser);
}