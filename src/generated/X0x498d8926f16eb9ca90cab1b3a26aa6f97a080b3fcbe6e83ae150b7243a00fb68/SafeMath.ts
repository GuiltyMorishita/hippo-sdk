import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68");
export const moduleName = "SafeMath";

export const ERROR_UNDERFLOW: bigInt.BigInteger = bigInt("0");

export function loadParsers(repo: AptosParserRepo) {
}