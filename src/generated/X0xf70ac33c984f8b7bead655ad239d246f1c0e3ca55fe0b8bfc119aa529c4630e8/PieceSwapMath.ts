import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "PieceSwapMath";

export const BILLION: bigInt.BigInteger = bigInt("1000000000");
export const ENABLE_PLOT: boolean = false;
export const E_X_Y_NOT_EQUAL: bigInt.BigInteger = bigInt("0");
export const FRACTION_MULT: bigInt.BigInteger = bigInt("1000000000");
export const NUM_STEPS: bigInt.BigInteger = bigInt("40");
export const PRECISION_FACTOR: bigInt.BigInteger = bigInt("1000000");

export function loadParsers(repo: AptosParserRepo) {
}