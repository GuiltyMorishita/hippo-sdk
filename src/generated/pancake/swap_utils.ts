import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'PancakeSwap';
export const moduleAddress = new HexString('0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa');
export const moduleName = 'swap_utils';

export const ERROR_INSUFFICIENT_INPUT_AMOUNT: U64 = u64('0');
export const ERROR_INSUFFICIENT_LIQUIDITY: U64 = u64('1');
export const ERROR_INSUFFICIENT_OUTPOT_AMOUNT: U64 = u64('3');

export function get_amount_in_(amount_out: U64, reserve_in: U64, reserve_out: U64, $c: AptosDataCache): U64 {
  let temp$1, denominator, numerator;
  if (!$.copy(amount_out).gt(u64('0'))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_OUTPOT_AMOUNT));
  }
  if ($.copy(reserve_in).gt(u64('0'))) {
    temp$1 = $.copy(reserve_out).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_LIQUIDITY));
  }
  numerator = u128($.copy(reserve_in))
    .mul(u128($.copy(amount_out)))
    .mul(u128('10000'));
  denominator = u128($.copy(reserve_out))
    .sub(u128($.copy(amount_out)))
    .mul(u128('9975'));
  return u64($.copy(numerator).div($.copy(denominator))).add(u64('1'));
}

export function get_amount_out_(amount_in: U64, reserve_in: U64, reserve_out: U64, $c: AptosDataCache): U64 {
  let temp$1, amount_in_with_fee, denominator, numerator;
  if (!$.copy(amount_in).gt(u64('0'))) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_INPUT_AMOUNT));
  }
  if ($.copy(reserve_in).gt(u64('0'))) {
    temp$1 = $.copy(reserve_out).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERROR_INSUFFICIENT_LIQUIDITY));
  }
  amount_in_with_fee = u128($.copy(amount_in)).mul(u128('9975'));
  numerator = $.copy(amount_in_with_fee).mul(u128($.copy(reserve_out)));
  denominator = u128($.copy(reserve_in)).mul(u128('10000')).add($.copy(amount_in_with_fee));
  return u64($.copy(numerator).div($.copy(denominator)));
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
