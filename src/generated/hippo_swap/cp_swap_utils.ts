import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Safe_math from "./safe_math";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "cp_swap_utils";

export const ERROR_INSUFFICIENT_AMOUNT : U64 = u64("2");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT : U64 = u64("0");
export const ERROR_INSUFFICIENT_LIQUIDITY : U64 = u64("1");

export function get_amount_out_ (
  amount_in: U64,
  reserve_in: U64,
  reserve_out: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1, amount_in_with_fee, denominator, numerator;
  if (!($.copy(amount_in)).gt(u64("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_INPUT_AMOUNT);
  }
  if (($.copy(reserve_in)).gt(u64("0"))) {
    temp$1 = ($.copy(reserve_out)).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY);
  }
  amount_in_with_fee = Safe_math.mul_(u128($.copy(amount_in)), u128("997"), $c);
  numerator = Safe_math.mul_($.copy(amount_in_with_fee), u128($.copy(reserve_out)), $c);
  denominator = (Safe_math.mul_(u128($.copy(reserve_in)), u128("1000"), $c)).add($.copy(amount_in_with_fee));
  return u64(Safe_math.div_($.copy(numerator), $.copy(denominator), $c));
}

export function quote_ (
  amount_x: U64,
  reserve_x: U64,
  reserve_y: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1;
  if (!($.copy(amount_x)).gt(u64("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_AMOUNT);
  }
  if (($.copy(reserve_x)).gt(u64("0"))) {
    temp$1 = ($.copy(reserve_y)).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY);
  }
  return u64(Safe_math.div_(Safe_math.mul_(u128($.copy(amount_x)), u128($.copy(reserve_y)), $c), u128($.copy(reserve_x)), $c));
}

export function loadParsers(repo: AptosParserRepo) {
}

