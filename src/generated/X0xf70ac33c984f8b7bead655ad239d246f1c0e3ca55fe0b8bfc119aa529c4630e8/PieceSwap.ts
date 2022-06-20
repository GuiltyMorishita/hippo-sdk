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

export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "PieceSwap";

export const ERROR_ALREADY_INITIALIZED: bigInt.BigInteger = bigInt("1");
export const ERROR_NOT_CREATOR: bigInt.BigInteger = bigInt("3");
export const ERROR_ONLY_ADMIN: bigInt.BigInteger = bigInt("0");
export const MINIMUM_LIQUIDITY: bigInt.BigInteger = bigInt("1000");
export const MODULE_ADMIN: HexString = new HexString("f70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const ERROR_COIN_NOT_INITIALIZED: bigInt.BigInteger = bigInt("2");

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

}

export class PieceSwapPoolInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PieceSwapPoolInfo";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true},
    {name: "$tv1", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "reserve_x", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv0>")},
    {name: "reserve_y", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv1>")},
    {name: "lp_amt", typeTag: parseTypeTagOrThrow("u64")},
    {name: "lp_mint_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::MintCapability<0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwap::LPToken<$tv0,$tv1>>")},
    {name: "lp_burn_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::BurnCapability<0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwap::LPToken<$tv0,$tv1>>")},
    {name: "K", typeTag: parseTypeTagOrThrow("u128")},
    {name: "K2", typeTag: parseTypeTagOrThrow("u128")},
    {name: "Xa", typeTag: parseTypeTagOrThrow("u128")},
    {name: "Xb", typeTag: parseTypeTagOrThrow("u128")},
    {name: "m", typeTag: parseTypeTagOrThrow("u128")},
    {name: "n", typeTag: parseTypeTagOrThrow("u128")},
    {name: "x_deci_mult", typeTag: parseTypeTagOrThrow("u64")},
    {name: "y_deci_mult", typeTag: parseTypeTagOrThrow("u64")},
    {name: "swap_fee_per_million", typeTag: parseTypeTagOrThrow("u64")},
    {name: "protocol_fee_share_per_thousand", typeTag: parseTypeTagOrThrow("u64")},
    {name: "protocol_fee_x", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv0>")},
    {name: "protocol_fee_y", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv1>")}
  ];

  reserve_x: X0x1.Coin.Coin;
  reserve_y: X0x1.Coin.Coin;
  lp_amt: bigInt.BigInteger;
  lp_mint_cap: X0x1.Coin.MintCapability;
  lp_burn_cap: X0x1.Coin.BurnCapability;
  K: bigInt.BigInteger;
  K2: bigInt.BigInteger;
  Xa: bigInt.BigInteger;
  Xb: bigInt.BigInteger;
  m: bigInt.BigInteger;
  n: bigInt.BigInteger;
  x_deci_mult: bigInt.BigInteger;
  y_deci_mult: bigInt.BigInteger;
  swap_fee_per_million: bigInt.BigInteger;
  protocol_fee_share_per_thousand: bigInt.BigInteger;
  protocol_fee_x: X0x1.Coin.Coin;
  protocol_fee_y: X0x1.Coin.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as X0x1.Coin.Coin;
    this.reserve_y = proto['reserve_y'] as X0x1.Coin.Coin;
    this.lp_amt = proto['lp_amt'] as bigInt.BigInteger;
    this.lp_mint_cap = proto['lp_mint_cap'] as X0x1.Coin.MintCapability;
    this.lp_burn_cap = proto['lp_burn_cap'] as X0x1.Coin.BurnCapability;
    this.K = proto['K'] as bigInt.BigInteger;
    this.K2 = proto['K2'] as bigInt.BigInteger;
    this.Xa = proto['Xa'] as bigInt.BigInteger;
    this.Xb = proto['Xb'] as bigInt.BigInteger;
    this.m = proto['m'] as bigInt.BigInteger;
    this.n = proto['n'] as bigInt.BigInteger;
    this.x_deci_mult = proto['x_deci_mult'] as bigInt.BigInteger;
    this.y_deci_mult = proto['y_deci_mult'] as bigInt.BigInteger;
    this.swap_fee_per_million = proto['swap_fee_per_million'] as bigInt.BigInteger;
    this.protocol_fee_share_per_thousand = proto['protocol_fee_share_per_thousand'] as bigInt.BigInteger;
    this.protocol_fee_x = proto['protocol_fee_x'] as X0x1.Coin.Coin;
    this.protocol_fee_y = proto['protocol_fee_y'] as X0x1.Coin.Coin;
  }

  static PieceSwapPoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PieceSwapPoolInfo {
    const proto = parseStructProto(data, typeTag, repo, PieceSwapPoolInfo);
    return new PieceSwapPoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PieceSwapPoolInfo, typeParams);
    return result as unknown as PieceSwapPoolInfo;
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwap::PieceSwapPoolInfo", PieceSwapPoolInfo.PieceSwapPoolInfoParser);
}