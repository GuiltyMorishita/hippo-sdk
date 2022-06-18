import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");
export const moduleName = "PieceSwapMath";

export const BILLION: bigInt.BigInteger = bigInt("1000000000");
export const ENABLE_PLOT: boolean = false;
export const E_X_Y_NOT_EQUAL: bigInt.BigInteger = bigInt("0");
export const FRACTION_MULT: bigInt.BigInteger = bigInt("1000000000");
export const NUM_STEPS: bigInt.BigInteger = bigInt("40");
export const PRECISION_FACTOR: bigInt.BigInteger = bigInt("1000000");

export function loadParsers(repo: AptosParserRepo) {
}