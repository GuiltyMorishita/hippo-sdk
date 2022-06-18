import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "CPSwapUtils";

export const ERROR_INSUFFICIENT_AMOUNT: bigInt.BigInteger = bigInt("2");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT: bigInt.BigInteger = bigInt("0");
export const ERROR_INSUFFICIENT_LIQUIDITY: bigInt.BigInteger = bigInt("1");

export function loadParsers(repo: AptosParserRepo) {
}