import { HexString } from "aptos";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "Utils";

export const COMPARE_EQUAL: number = 1;
export const COMPARE_GREATER: number = 2;
export const COMPARE_LESS: number = 0;

export function loadParsers(repo: AptosParserRepo) {
}