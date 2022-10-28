import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Amm_config from './amm_config';
import * as Amm_swap from './amm_swap';
import * as Amm_utils from './amm_utils';
export const packageName = 'Cetue-AMM';
export const moduleAddress = new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba');
export const moduleName = 'amm_router';

export function compute_b_out_(
  amount_a_in: U128,
  is_forward: boolean,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinTypeA, CoinTypeB>*/
): U128 {
  let temp$5,
    fee_denominator,
    fee_denominator__2,
    fee_numerator,
    fee_numerator__1,
    reserve_a,
    reserve_a__4,
    reserve_b,
    reserve_b__3;
  if (is_forward) {
    [fee_numerator, fee_denominator] = Amm_config.get_trade_fee_($c, [$p[0], $p[1]]);
    [reserve_a, reserve_b] = Amm_swap.get_reserves_($c, [$p[0], $p[1]]);
    temp$5 = Amm_utils.get_amount_out_(
      $.copy(amount_a_in),
      u128($.copy(reserve_a)),
      u128($.copy(reserve_b)),
      $.copy(fee_numerator),
      $.copy(fee_denominator),
      $c
    );
  } else {
    [fee_numerator__1, fee_denominator__2] = Amm_config.get_trade_fee_($c, [$p[1], $p[0]]);
    [reserve_b__3, reserve_a__4] = Amm_swap.get_reserves_($c, [$p[1], $p[0]]);
    temp$5 = Amm_utils.get_amount_out_(
      $.copy(amount_a_in),
      u128($.copy(reserve_a__4)),
      u128($.copy(reserve_b__3)),
      $.copy(fee_numerator__1),
      $.copy(fee_denominator__2),
      $c
    );
  }
  return temp$5;
}

export function swap_(
  _account: HexString,
  coin_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinTypeA, CoinTypeB>*/
): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(coin_in, $c, [$p[0]]);
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
