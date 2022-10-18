import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Coin_helper from './coin_helper';
import * as Curves from './curves';
import * as Liquidity_pool from './liquidity_pool';
import * as Math from './math';
import * as Stable_curve from './stable_curve';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12');
export const moduleName = 'router';

export const ERR_UNREACHABLE: U64 = u64('207');

export function get_amount_out_(amount_in: U64, $c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): U64 {
  let reserve_x, reserve_y, scale_x, scale_y;
  [reserve_x, reserve_y] = get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  [scale_x, scale_y] = get_decimals_scales_($c, [$p[0], $p[1], $p[2]]);
  return get_coin_out_with_fees_(
    $.copy(amount_in),
    $.copy(reserve_x),
    $.copy(reserve_y),
    $.copy(scale_x),
    $.copy(scale_y),
    $c,
    [$p[0], $p[1], $p[2]]
  );
}

export function get_coin_out_with_fees_(
  coin_in: U64,
  reserve_in: U64,
  reserve_out: U64,
  scale_in: U64,
  scale_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): U64 {
  let temp$1,
    temp$3,
    temp$4,
    coin_in_val_after_fees,
    coin_in_val_after_fees__2,
    coin_in_val_scaled,
    fee_multiplier,
    fee_pct,
    fee_scale,
    new_reserve_in;
  [fee_pct, fee_scale] = get_fees_config_($c, [$p[0], $p[1], $p[2]]);
  fee_multiplier = $.copy(fee_scale).sub($.copy(fee_pct));
  if (Curves.is_stable_($c, [$p[2]])) {
    coin_in_val_scaled = Math.mul_to_u128_($.copy(coin_in), $.copy(fee_multiplier), $c);
    if (
      $.copy(coin_in_val_scaled)
        .mod(u128($.copy(fee_scale)))
        .neq(u128('0'))
    ) {
      temp$1 = $.copy(coin_in_val_scaled)
        .div(u128($.copy(fee_scale)))
        .add(u128('1'));
    } else {
      temp$1 = $.copy(coin_in_val_scaled).div(u128($.copy(fee_scale)));
    }
    coin_in_val_after_fees = temp$1;
    temp$4 = u64(
      Stable_curve.coin_out_(
        u128($.copy(coin_in_val_after_fees)),
        $.copy(scale_in),
        $.copy(scale_out),
        u128($.copy(reserve_in)),
        u128($.copy(reserve_out)),
        $c
      )
    );
  } else {
    if (Curves.is_uncorrelated_($c, [$p[2]])) {
      coin_in_val_after_fees__2 = $.copy(coin_in).mul($.copy(fee_multiplier));
      new_reserve_in = $.copy(reserve_in).mul($.copy(fee_scale)).add($.copy(coin_in_val_after_fees__2));
      temp$3 = Math.mul_div_($.copy(coin_in_val_after_fees__2), $.copy(reserve_out), $.copy(new_reserve_in), $c);
    } else {
      throw $.abortCode($.copy(ERR_UNREACHABLE));
    }
    temp$4 = temp$3;
  }
  return temp$4;
}

export function get_decimals_scales_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let temp$1, temp$2, x, y;
  if (Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    [temp$1, temp$2] = Liquidity_pool.get_decimals_scales_($c, [$p[0], $p[1], $p[2]]);
  } else {
    [y, x] = Liquidity_pool.get_decimals_scales_($c, [$p[1], $p[0], $p[2]]);
    [temp$1, temp$2] = [$.copy(x), $.copy(y)];
  }
  return [temp$1, temp$2];
}

export function get_fees_config_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let temp$1, temp$2;
  if (Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    [temp$1, temp$2] = Liquidity_pool.get_fees_config_($c, [$p[0], $p[1], $p[2]]);
  } else {
    [temp$1, temp$2] = Liquidity_pool.get_fees_config_($c, [$p[1], $p[0], $p[2]]);
  }
  return [temp$1, temp$2];
}

export function get_reserves_size_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let temp$1, temp$2, x_res, y_res;
  if (Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    [temp$1, temp$2] = Liquidity_pool.get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  } else {
    [y_res, x_res] = Liquidity_pool.get_reserves_size_($c, [$p[1], $p[0], $p[2]]);
    [temp$1, temp$2] = [$.copy(x_res), $.copy(y_res)];
  }
  return [temp$1, temp$2];
}

export function swap_exact_coin_for_coin_(
  coin_in: Stdlib.Coin.Coin,
  _mint_out_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, LP>*/
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
