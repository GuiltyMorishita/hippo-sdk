import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12');
export const moduleName = 'scripts';

export function register_pool_and_add_liquidity_(
  _creator: HexString,
  _x_amount: U64,
  _x_min_amount: U64,
  _y_amount: U64,
  _y_min_amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, LP>*/
): void {
  return;
}

export function buildPayload_register_pool_and_add_liquidity(
  _x_amount: U64,
  _x_min_amount: U64,
  _y_amount: U64,
  _y_min_amount: U64,
  $p: TypeTag[] /* <X, Y, LP>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12'),
    'scripts',
    'register_pool_and_add_liquidity',
    typeParamStrings,
    [_x_amount, _x_min_amount, _y_amount, _y_min_amount],
    isJSON
  );
}
export function loadParsers(repo: AptosParserRepo) {}
export class App {
  constructor(public client: AptosClient, public repo: AptosParserRepo, public cache: AptosLocalCache) {}
  get moduleAddress() {
    {
      return moduleAddress;
    }
  }
  get moduleName() {
    {
      return moduleName;
    }
  }
  payload_register_pool_and_add_liquidity(
    _x_amount: U64,
    _x_min_amount: U64,
    _y_amount: U64,
    _y_min_amount: U64,
    $p: TypeTag[] /* <X, Y, LP>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_register_pool_and_add_liquidity(_x_amount, _x_min_amount, _y_amount, _y_min_amount, $p, isJSON);
  }
  async register_pool_and_add_liquidity(
    _account: AptosAccount,
    _x_amount: U64,
    _x_min_amount: U64,
    _y_amount: U64,
    _y_min_amount: U64,
    $p: TypeTag[] /* <X, Y, LP>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_register_pool_and_add_liquidity(
      _x_amount,
      _x_min_amount,
      _y_amount,
      _y_min_amount,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
}
