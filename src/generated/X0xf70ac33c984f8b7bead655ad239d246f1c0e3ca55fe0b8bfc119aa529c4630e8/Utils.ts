import { HexString } from "aptos";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "Utils";

export const COMPARE_EQUAL: number = 1;
export const COMPARE_GREATER: number = 2;
export const COMPARE_LESS: number = 0;

export function loadParsers(repo: AptosParserRepo) {
}