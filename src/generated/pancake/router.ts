import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Swap from './swap';
import * as Swap_utils from './swap_utils';
export const packageName = 'PancakeSwap';
export const moduleAddress = new HexString('0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa');
export const moduleName = 'router';

export function get_amount_in_(
  amount_out: U64,
  is_forward: boolean,
  $c: AptosDataCache,
  $p: TypeTag[] /* <InputCoin, OutputCoin>*/
): U64 {
  let temp$3, rin, rin__2, rout, rout__1;
  if (is_forward) {
    [rin, rout] = Swap.token_reserves_($c, [$p[0], $p[1]]);
    temp$3 = Swap_utils.get_amount_in_($.copy(amount_out), $.copy(rin), $.copy(rout), $c);
  } else {
    [rout__1, rin__2] = Swap.token_reserves_($c, [$p[1], $p[0]]);
    temp$3 = Swap_utils.get_amount_in_($.copy(amount_out), $.copy(rin__2), $.copy(rout__1), $c);
  }
  return temp$3;
}

export function get_amount_out_(
  amount_in: U64,
  is_forward: boolean,
  $c: AptosDataCache,
  $p: TypeTag[] /* <InputCoin, OutputCoint>*/
): U64 {
  let temp$3, rin, rin__2, rout, rout__1;
  if (is_forward) {
    [rin, rout] = Swap.token_reserves_($c, [$p[0], $p[1]]);
    temp$3 = Swap_utils.get_amount_out_($.copy(amount_in), $.copy(rin), $.copy(rout), $c);
  } else {
    [rout__1, rin__2] = Swap.token_reserves_($c, [$p[0], $p[1]]);
    temp$3 = Swap_utils.get_amount_out_($.copy(amount_in), $.copy(rin__2), $.copy(rout__1), $c);
  }
  return temp$3;
}

export function swap_exact_x_to_y_direct_external_(
  x_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(x_in, $c, [$p[0]]);
  return Stdlib.Coin.zero_($c, [$p[1]]);
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
