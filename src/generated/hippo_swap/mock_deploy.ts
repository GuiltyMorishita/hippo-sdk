import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Coin_registry from "../coin_registry";
import * as Std from "../std";
import * as Mock_coin from "./mock_coin";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "mock_deploy";


export function init_coin_and_create_store_ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  if (!Aptos_framework.Coin.is_coin_initialized_($c, [$p[0]])) {
    Mock_coin.initialize_(admin, $.copy(decimals), $c, [$p[0]]);
  }
  else{
  }
  if (!Coin_registry.Coin_registry.has_token_(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), $c, [$p[0]])) {
    Coin_registry.Coin_registry.add_token_(admin, $.copy(name), $.copy(symbol), $.copy(name), u8($.copy(decimals)), [], [], $c, [$p[0]]);
  }
  else{
  }
  return;
}

export function init_registry_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  if (!Coin_registry.Coin_registry.is_registry_initialized_(Std.Signer.address_of_(admin, $c), $c)) {
    Coin_registry.Coin_registry.initialize_(admin, $c);
  }
  else{
  }
  return;
}

export function loadParsers(repo: AptosParserRepo) {
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
}

