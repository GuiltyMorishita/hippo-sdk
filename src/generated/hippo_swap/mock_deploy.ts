import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as aptos_framework$_ from "../aptos_framework";
import * as std$_ from "../std";
import * as token_registry$_ from "../token_registry";
import * as mock_coin$_ from "./mock_coin";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "mock_deploy";


export function init_coin_and_create_store$ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  if (!aptos_framework$_.coin$_.is_coin_initialized$($c, [$p[0]] as TypeTag[])) {
    mock_coin$_.initialize$(admin, $.copy(decimals), $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  if (!token_registry$_.token_registry$_.has_token$(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), $c, [$p[0]] as TypeTag[])) {
    token_registry$_.token_registry$_.add_token$(admin, $.copy(name), $.copy(symbol), $.copy(name), u8($.copy(decimals)), [], [], $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  return;
}

export function init_registry$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  if (!token_registry$_.token_registry$_.is_registry_initialized$(std$_.signer$_.address_of$(admin, $c), $c)) {
    token_registry$_.token_registry$_.initialize$(admin, $c);
  }
  else{
  }
  return;
}

export function loadParsers(repo: AptosParserRepo) {
}

