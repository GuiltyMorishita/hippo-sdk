import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
export const packageName = "LiquidSwapInterface";
export const moduleAddress = new HexString("0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9");
export const moduleName = "scripts";


export function register_pool_and_add_liquidity_ (
  _creator: HexString,
  _pool_type: U8,
  _x_amount: U64,
  _x_min_amount: U64,
  _y_amount: U64,
  _y_min_amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, LP>*/
): void {
  return;
}


export function buildPayload_register_pool_and_add_liquidity (
  _pool_type: U8,
  _x_amount: U64,
  _x_min_amount: U64,
  _y_amount: U64,
  _y_min_amount: U64,
  $p: TypeTag[], /* <X, Y, LP>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::scripts::register_pool_and_add_liquidity",
    typeParamStrings,
    [
      $.payloadArg(_pool_type),
      $.payloadArg(_x_amount),
      $.payloadArg(_x_min_amount),
      $.payloadArg(_y_amount),
      $.payloadArg(_y_min_amount),
    ]
  );

}
export function loadParsers(repo: AptosParserRepo) {
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
  }
  register_pool_and_add_liquidity(
    _pool_type: U8,
    _x_amount: U64,
    _x_min_amount: U64,
    _y_amount: U64,
    _y_min_amount: U64,
    $p: TypeTag[], /* <X, Y, LP>*/
  ) {
    return buildPayload_register_pool_and_add_liquidity(_pool_type, _x_amount, _x_min_amount, _y_amount, _y_min_amount, $p);
  }
}

