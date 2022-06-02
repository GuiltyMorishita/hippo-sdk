import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "StableCurveNumeral";

export const ERROR_SWAP_INVALID_AMOUNT: bigInt.BigInteger = bigInt("2021");
export const ERROR_SWAP_INVALID_DERIVIATION: bigInt.BigInteger = bigInt("2020");

export function loadParsers(repo: AptosParserRepo) {
}