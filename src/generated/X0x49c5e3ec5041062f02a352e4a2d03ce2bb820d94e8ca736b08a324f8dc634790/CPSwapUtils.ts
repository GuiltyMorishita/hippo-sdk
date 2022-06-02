import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");
export const moduleName = "CPSwapUtils";

export const ERROR_INSUFFICIENT_AMOUNT: bigInt.BigInteger = bigInt("2");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT: bigInt.BigInteger = bigInt("0");
export const ERROR_INSUFFICIENT_LIQUIDITY: bigInt.BigInteger = bigInt("1");

export function loadParsers(repo: AptosParserRepo) {
}