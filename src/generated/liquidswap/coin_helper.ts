import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Curves from './curves';
import * as Math from './math';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'coin_helper';

export const ERR_CANNOT_BE_THE_SAME_COIN: U64 = u64('3000');
export const ERR_IS_NOT_COIN: U64 = u64('3001');
export const SYMBOL_PREFIX_LENGTH: U64 = u64('4');

export function assert_is_coin_($c: AptosDataCache, $p: TypeTag[] /* <CoinType>*/): void {
  if (!Stdlib.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode($.copy(ERR_IS_NOT_COIN));
  }
  return;
}

export function coin_symbol_prefix_($c: AptosDataCache, $p: TypeTag[] /* <CoinType>*/): Stdlib.String.String {
  let prefix_length, symbol;
  symbol = Stdlib.Coin.symbol_($c, [$p[0]]);
  prefix_length = Math.min_u64_(Stdlib.String.length_(symbol, $c), $.copy(SYMBOL_PREFIX_LENGTH), $c);
  return Stdlib.String.sub_string_(symbol, u64('0'), $.copy(prefix_length), $c);
}

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

export function generate_lp_name_and_symbol_(
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.String.String, Stdlib.String.String] {
  let temp$1, temp$2, curve_name, curve_symbol, lp_name, lp_symbol;
  lp_name = Stdlib.String.utf8_([], $c);
  Stdlib.String.append_utf8_(
    lp_name,
    [u8('76'), u8('105'), u8('113'), u8('117'), u8('105'), u8('100'), u8('76'), u8('80'), u8('45')],
    $c
  );
  Stdlib.String.append_(lp_name, Stdlib.Coin.symbol_($c, [$p[0]]), $c);
  Stdlib.String.append_utf8_(lp_name, [u8('45')], $c);
  Stdlib.String.append_(lp_name, Stdlib.Coin.symbol_($c, [$p[1]]), $c);
  lp_symbol = Stdlib.String.utf8_([], $c);
  Stdlib.String.append_(lp_symbol, coin_symbol_prefix_($c, [$p[0]]), $c);
  Stdlib.String.append_utf8_(lp_symbol, [u8('45')], $c);
  Stdlib.String.append_(lp_symbol, coin_symbol_prefix_($c, [$p[1]]), $c);
  if (Curves.is_stable_($c, [$p[2]])) {
    [temp$1, temp$2] = [[u8('45'), u8('83')], [u8('42')]];
  } else {
    [temp$1, temp$2] = [[u8('45'), u8('85')], []];
  }
  [curve_name, curve_symbol] = [temp$1, temp$2];
  Stdlib.String.append_utf8_(lp_name, $.copy(curve_name), $c);
  Stdlib.String.append_utf8_(lp_symbol, $.copy(curve_symbol), $c);
  return [$.copy(lp_name), $.copy(lp_symbol)];
}

export function is_sorted_($c: AptosDataCache, $p: TypeTag[] /* <X, Y>*/): boolean {
  let order;
  order = compare_($c, [$p[0], $p[1]]);
  if (!!Stdlib.Comparator.is_equal_(order, $c)) {
    throw $.abortCode($.copy(ERR_CANNOT_BE_THE_SAME_COIN));
  }
  return Stdlib.Comparator.is_smaller_than_(order, $c);
}

export function supply_($c: AptosDataCache, $p: TypeTag[] /* <CoinType>*/): U128 {
  let temp$1;
  temp$1 = Stdlib.Coin.supply_($c, [$p[0]]);
  return Stdlib.Option.extract_(temp$1, $c, [AtomicTypeTag.U128]);
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
