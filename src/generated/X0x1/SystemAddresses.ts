import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x1");
export const moduleName = "SystemAddresses";

export const ENOT_CORE_RESOURCE_ADDRESS: bigInt.BigInteger = bigInt("0");
export const EVM: bigInt.BigInteger = bigInt("1");

export function loadParsers(repo: AptosParserRepo) {
}