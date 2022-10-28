import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as U256 from './u256';
export const packageName = 'Cetue-AMM';
export const moduleAddress = new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba');
export const moduleName = 'amm_math';

export const EDIVIDE_BY_ZERO: U64 = u64('2001');

export function mul_div_u128_(x: U128, y: U128, z: U128, $c: AptosDataCache): U256.U256 {
  let x_u256, y_u256, z_u256;
  if ($.copy(z).eq(u128('0'))) {
    throw $.abortCode(Stdlib.Error.aborted_($.copy(EDIVIDE_BY_ZERO), $c));
  } else {
  }
  x_u256 = U256.from_u128_($.copy(x), $c);
  y_u256 = U256.from_u128_($.copy(y), $c);
  z_u256 = U256.from_u128_($.copy(z), $c);
  return U256.div_(U256.mul_($.copy(x_u256), $.copy(y_u256), $c), $.copy(z_u256), $c);
}

export function safe_mul_div_u128_(x: U128, y: U128, z: U128, $c: AptosDataCache): U128 {
  return U256.as_u128_(mul_div_u128_($.copy(x), $.copy(y), $.copy(z), $c), $c);
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
