import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Std from "../std";
import * as Providers from "./providers";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "lego";


export function list_all_pools_ (
  $c: AptosDataCache,
): Providers.SwapPoolInfo[] {
  return Std.Vector.empty_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "providers", "SwapPoolInfo", [])]);
}

export function quote_x_to_y_ (
  _pool_type: U64,
  _x_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): [U64, U64] {
  return [u64("0"), u64("0")];
}

export function quote_y_to_x_ (
  _pool_type: U64,
  _y_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): [U64, U64] {
  return [u64("0"), u64("0")];
}

export function swap_x_to_y_ (
  _pool_type: U64,
  x_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): Aptos_framework.Coin.Coin {
  Aptos_framework.Coin.destroy_zero_(x_in, $c, [$p[0]]);
  return Aptos_framework.Coin.zero_($c, [$p[1]]);
}

export function swap_y_to_x_ (
  _pool_type: U64,
  y_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): Aptos_framework.Coin.Coin {
  Aptos_framework.Coin.destroy_zero_(y_in, $c, [$p[1]]);
  return Aptos_framework.Coin.zero_($c, [$p[0]]);
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

