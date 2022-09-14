import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Stdlib from "../stdlib";
export const packageName = "Liquidswap";
export const moduleAddress = new HexString("0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9");
export const moduleName = "router";


export function swap_exact_coin_for_coin_ (
  _pool_addr: HexString,
  coin_in: Stdlib.Coin.Coin,
  _mint_out_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, LP>*/
): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(coin_in, $c, [$p[0]]);
  return Stdlib.Coin.zero_($c, [$p[1]]);
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

