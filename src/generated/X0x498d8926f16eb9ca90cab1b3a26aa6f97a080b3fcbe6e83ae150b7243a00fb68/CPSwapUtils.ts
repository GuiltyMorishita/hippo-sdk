import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "CPSwapUtils";

export const ERROR_INSUFFICIENT_AMOUNT: bigInt.BigInteger = bigInt("2");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT: bigInt.BigInteger = bigInt("0");
export const ERROR_INSUFFICIENT_LIQUIDITY: bigInt.BigInteger = bigInt("1");

export function loadParsers(repo: AptosParserRepo) {
}