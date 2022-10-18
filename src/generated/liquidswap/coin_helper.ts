import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12');
export const moduleName = 'coin_helper';

export const ERR_CANNOT_BE_THE_SAME_COIN: U64 = u64('3000');
export const ERR_IS_NOT_COIN: U64 = u64('3001');
export const SYMBOL_PREFIX_LENGTH: U64 = u64('4');

export function compare_($c: AptosDataCache, $p: TypeTag[] /* <X, Y>*/): Stdlib.Comparator.Result {
  let address_cmp,
    module_cmp,
    struct_cmp,
    x_address,
    x_info,
    x_module_name,
    x_struct_name,
    y_address,
    y_info,
    y_module_name,
    y_struct_name;
  x_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  y_info = Stdlib.Type_info.type_of_($c, [$p[1]]);
  x_struct_name = Stdlib.Type_info.struct_name_(x_info, $c);
  y_struct_name = Stdlib.Type_info.struct_name_(y_info, $c);
  struct_cmp = Stdlib.Comparator.compare_(x_struct_name, y_struct_name, $c, [new VectorTag(AtomicTypeTag.U8)]);
  if (!Stdlib.Comparator.is_equal_(struct_cmp, $c)) {
    return struct_cmp;
  } else {
  }
  x_module_name = Stdlib.Type_info.module_name_(x_info, $c);
  y_module_name = Stdlib.Type_info.module_name_(y_info, $c);
  module_cmp = Stdlib.Comparator.compare_(x_module_name, y_module_name, $c, [new VectorTag(AtomicTypeTag.U8)]);
  if (!Stdlib.Comparator.is_equal_(module_cmp, $c)) {
    return module_cmp;
  } else {
  }
  x_address = Stdlib.Type_info.account_address_(x_info, $c);
  y_address = Stdlib.Type_info.account_address_(y_info, $c);
  address_cmp = Stdlib.Comparator.compare_(x_address, y_address, $c, [AtomicTypeTag.Address]);
  return address_cmp;
}

export function is_sorted_($c: AptosDataCache, $p: TypeTag[] /* <X, Y>*/): boolean {
  let order;
  order = compare_($c, [$p[0], $p[1]]);
  if (!!Stdlib.Comparator.is_equal_(order, $c)) {
    throw $.abortCode($.copy(ERR_CANNOT_BE_THE_SAME_COIN));
  }
  return Stdlib.Comparator.is_smaller_than_(order, $c);
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
}
