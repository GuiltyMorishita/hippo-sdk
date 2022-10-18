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
export const moduleName = 'math';

export const ERR_DIVIDE_BY_ZERO: U64 = u64('2000');

export function mul_div_(x: U64, y: U64, z: U64, $c: AptosDataCache): U64 {
  let r;
  if (!$.copy(z).neq(u64('0'))) {
    throw $.abortCode($.copy(ERR_DIVIDE_BY_ZERO));
  }
  r = u128($.copy(x))
    .mul(u128($.copy(y)))
    .div(u128($.copy(z)));
  return u64($.copy(r));
}

export function mul_to_u128_(x: U64, y: U64, $c: AptosDataCache): U128 {
  return u128($.copy(x)).mul(u128($.copy(y)));
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
