import { HexString } from "aptos";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");
export const moduleName = "Utils";

export const COMPARE_EQUAL: number = 1;
export const COMPARE_GREATER: number = 2;
export const COMPARE_LESS: number = 0;

export function loadParsers(repo: AptosParserRepo) {
}