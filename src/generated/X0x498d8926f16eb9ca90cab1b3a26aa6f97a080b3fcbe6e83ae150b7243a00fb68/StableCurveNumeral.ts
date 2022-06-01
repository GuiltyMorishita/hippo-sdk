import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "StableCurveNumeral";

export const ERROR_SWAP_INVALID_AMOUNT: bigInt.BigInteger = bigInt("2021");
export const ERROR_SWAP_INVALID_DERIVIATION: bigInt.BigInteger = bigInt("2020");

export function loadParsers(repo: AptosParserRepo) {
}