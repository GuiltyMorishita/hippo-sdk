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
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'router';

export const ERR_COIN_OUT_NUM_LESS_THAN_EXPECTED_MINIMUM: U64 = u64('205');
export const ERR_COIN_VAL_MAX_LESS_THAN_NEEDED: U64 = u64('206');
export const ERR_INSUFFICIENT_X_AMOUNT: U64 = u64('203');
export const ERR_INSUFFICIENT_Y_AMOUNT: U64 = u64('202');
export const ERR_INVALID_CURVE: U64 = u64('207');
export const ERR_OVERLIMIT_X: U64 = u64('204');
export const ERR_WRONG_AMOUNT: U64 = u64('200');
export const ERR_WRONG_COIN_ORDER: U64 = u64('208');
export const ERR_WRONG_RESERVE: U64 = u64('201');

export function add_liquidity_(
  coin_x: Stdlib.Coin.Coin,
  min_coin_x_val: U64,
  coin_y: Stdlib.Coin.Coin,
  min_coin_y_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  let coin_x_opt, coin_x_val, coin_y_opt, coin_y_val, lp_coins, optimal_x, optimal_y;
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_COIN_ORDER));
  }
  coin_x_val = Stdlib.Coin.value_(coin_x, $c, [$p[0]]);
  coin_y_val = Stdlib.Coin.value_(coin_y, $c, [$p[1]]);
  if (!$.copy(coin_x_val).ge($.copy(min_coin_x_val))) {
    throw $.abortCode($.copy(ERR_INSUFFICIENT_X_AMOUNT));
  }
  if (!$.copy(coin_y_val).ge($.copy(min_coin_y_val))) {
    throw $.abortCode($.copy(ERR_INSUFFICIENT_Y_AMOUNT));
  }
  [optimal_x, optimal_y] = calc_optimal_coin_values_(
    $.copy(coin_x_val),
    $.copy(coin_y_val),
    $.copy(min_coin_x_val),
    $.copy(min_coin_y_val),
    $c,
    [$p[0], $p[1], $p[2]]
  );
  coin_x_opt = Stdlib.Coin.extract_(coin_x, $.copy(optimal_x), $c, [$p[0]]);
  coin_y_opt = Stdlib.Coin.extract_(coin_y, $.copy(optimal_y), $c, [$p[1]]);
  lp_coins = Liquidity_pool.mint_(coin_x_opt, coin_y_opt, $c, [$p[0], $p[1], $p[2]]);
  return [coin_x, coin_y, lp_coins];
}

export function calc_optimal_coin_values_(
  x_desired: U64,
  y_desired: U64,
  x_min: U64,
  y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [U64, U64] {
  let temp$1, reserves_x, reserves_y, x_returned, y_returned;
  [reserves_x, reserves_y] = get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  if ($.copy(reserves_x).eq(u64('0'))) {
    temp$1 = $.copy(reserves_y).eq(u64('0'));
  } else {
    temp$1 = false;
  }
  if (temp$1) {
    return [$.copy(x_desired), $.copy(y_desired)];
  } else {
    y_returned = convert_with_current_price_($.copy(x_desired), $.copy(reserves_x), $.copy(reserves_y), $c);
    if ($.copy(y_returned).le($.copy(y_desired))) {
      if (!$.copy(y_returned).ge($.copy(y_min))) {
        throw $.abortCode($.copy(ERR_INSUFFICIENT_Y_AMOUNT));
      }
      return [$.copy(x_desired), $.copy(y_returned)];
    } else {
      x_returned = convert_with_current_price_($.copy(y_desired), $.copy(reserves_y), $.copy(reserves_x), $c);
      if (!$.copy(x_returned).le($.copy(x_desired))) {
        throw $.abortCode($.copy(ERR_OVERLIMIT_X));
      }
      if (!$.copy(x_returned).ge($.copy(x_min))) {
        throw $.abortCode($.copy(ERR_INSUFFICIENT_X_AMOUNT));
      }
      return [$.copy(x_returned), $.copy(y_desired)];
    }
  }
}

export function convert_with_current_price_(coin_in: U64, reserve_in: U64, reserve_out: U64, $c: AptosDataCache): U64 {
  let temp$1, res;
  if (!$.copy(coin_in).gt(u64('0'))) {
    throw $.abortCode($.copy(ERR_WRONG_AMOUNT));
  }
  if ($.copy(reserve_in).gt(u64('0'))) {
    temp$1 = $.copy(reserve_out).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERR_WRONG_RESERVE));
  }
  res = Math.mul_div_($.copy(coin_in), $.copy(reserve_out), $.copy(reserve_in), $c);
  return u64($.copy(res));
}

export function get_amount_in_(amount_out: U64, $c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): U64 {
  let reserve_x, reserve_y, scale_x, scale_y;
  [reserve_x, reserve_y] = get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  [scale_x, scale_y] = get_decimals_scales_($c, [$p[0], $p[1], $p[2]]);
  return get_coin_in_with_fees_(
    $.copy(amount_out),
    $.copy(reserve_y),
    $.copy(reserve_x),
    $.copy(scale_y),
    $.copy(scale_x),
    $c,
    [$p[2]]
  );
}

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
    [$p[2]]
  );
}

export function get_coin_in_with_fees_(
  coin_out: U64,
  reserve_out: U64,
  reserve_in: U64,
  scale_out: U64,
  scale_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <Curve>*/
): U64 {
  let temp$2, temp$3, coin_in, coin_in__1, fee_multiplier, fee_pct, fee_scale, new_reserves_out;
  [fee_pct, fee_scale] = Liquidity_pool.get_fees_config_($c);
  fee_multiplier = $.copy(fee_scale).sub($.copy(fee_pct));
  if (Curves.is_stable_($c, [$p[0]])) {
    coin_in = u64(
      Stable_curve.coin_in_(
        u128($.copy(coin_out)),
        $.copy(scale_out),
        $.copy(scale_in),
        u128($.copy(reserve_out)),
        u128($.copy(reserve_in)),
        $c
      )
    ).add(u64('1'));
    temp$3 = $.copy(coin_in).mul($.copy(fee_scale)).div($.copy(fee_multiplier)).add(u64('1'));
  } else {
    if (Curves.is_uncorrelated_($c, [$p[0]])) {
      new_reserves_out = $.copy(reserve_out).sub($.copy(coin_out)).mul($.copy(fee_multiplier));
      coin_in__1 = Math.mul_div_(
        $.copy(coin_out),
        $.copy(reserve_in).mul($.copy(fee_scale)),
        $.copy(new_reserves_out),
        $c
      ).add(u64('1'));
      temp$2 = $.copy(coin_in__1);
    } else {
      throw $.abortCode($.copy(ERR_INVALID_CURVE));
    }
    temp$3 = temp$2;
  }
  return temp$3;
}

export function get_coin_out_with_fees_(
  coin_in: U64,
  reserve_in: U64,
  reserve_out: U64,
  scale_in: U64,
  scale_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <Curve>*/
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
  [fee_pct, fee_scale] = Liquidity_pool.get_fees_config_($c);
  fee_multiplier = $.copy(fee_scale).sub($.copy(fee_pct));
  if (Curves.is_stable_($c, [$p[0]])) {
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
    if (Curves.is_uncorrelated_($c, [$p[0]])) {
      coin_in_val_after_fees__2 = $.copy(coin_in).mul($.copy(fee_multiplier));
      new_reserve_in = $.copy(reserve_in).mul($.copy(fee_scale)).add($.copy(coin_in_val_after_fees__2));
      temp$3 = Math.mul_div_($.copy(coin_in_val_after_fees__2), $.copy(reserve_out), $.copy(new_reserve_in), $c);
    } else {
      throw $.abortCode($.copy(ERR_INVALID_CURVE));
    }
    temp$4 = temp$3;
  }
  return temp$4;
}

export function get_cumulative_prices_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U128, U128, U64] {
  let temp$1, temp$2, temp$3, t, x, y;
  if (Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    [temp$1, temp$2, temp$3] = Liquidity_pool.get_cumulative_prices_($c, [$p[0], $p[1], $p[2]]);
  } else {
    [y, x, t] = Liquidity_pool.get_cumulative_prices_($c, [$p[1], $p[0], $p[2]]);
    [temp$1, temp$2, temp$3] = [$.copy(x), $.copy(y), $.copy(t)];
  }
  return [temp$1, temp$2, temp$3];
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

export function get_reserves_for_lp_coins_(
  lp_to_burn_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [U64, U64] {
  let temp$1, lp_coins_total, x_reserve, x_to_return_val, y_reserve, y_to_return_val;
  [x_reserve, y_reserve] = get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  lp_coins_total = Coin_helper.supply_($c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  x_to_return_val = Math.mul_div_u128_(
    u128($.copy(lp_to_burn_val)),
    u128($.copy(x_reserve)),
    $.copy(lp_coins_total),
    $c
  );
  y_to_return_val = Math.mul_div_u128_(
    u128($.copy(lp_to_burn_val)),
    u128($.copy(y_reserve)),
    $.copy(lp_coins_total),
    $c
  );
  if ($.copy(x_to_return_val).gt(u64('0'))) {
    temp$1 = $.copy(y_to_return_val).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERR_WRONG_AMOUNT));
  }
  return [$.copy(x_to_return_val), $.copy(y_to_return_val)];
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

export function is_swap_exists_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): boolean {
  let temp$1;
  if (Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    temp$1 = Liquidity_pool.is_pool_exists_($c, [$p[0], $p[1], $p[2]]);
  } else {
    temp$1 = Liquidity_pool.is_pool_exists_($c, [$p[1], $p[0], $p[2]]);
  }
  return temp$1;
}

export function register_pool_(account: HexString, $c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): void {
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_COIN_ORDER));
  }
  Liquidity_pool.register_(account, $c, [$p[0], $p[1], $p[2]]);
  return;
}

export function remove_liquidity_(
  lp_coins: Stdlib.Coin.Coin,
  min_x_out_val: U64,
  min_y_out_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  let x_out, y_out;
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_COIN_ORDER));
  }
  [x_out, y_out] = Liquidity_pool.burn_(lp_coins, $c, [$p[0], $p[1], $p[2]]);
  if (!Stdlib.Coin.value_(x_out, $c, [$p[0]]).ge($.copy(min_x_out_val))) {
    throw $.abortCode($.copy(ERR_COIN_OUT_NUM_LESS_THAN_EXPECTED_MINIMUM));
  }
  if (!Stdlib.Coin.value_(y_out, $c, [$p[1]]).ge($.copy(min_y_out_val))) {
    throw $.abortCode($.copy(ERR_COIN_OUT_NUM_LESS_THAN_EXPECTED_MINIMUM));
  }
  return [x_out, y_out];
}

export function swap_coin_for_coin_unchecked_(
  coin_in: Stdlib.Coin.Coin,
  coin_out_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): Stdlib.Coin.Coin {
  let coin_out, zero;
  if (Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    [zero, coin_out] = Liquidity_pool.swap_(
      coin_in,
      u64('0'),
      Stdlib.Coin.zero_($c, [$p[1]]),
      $.copy(coin_out_val),
      $c,
      [$p[0], $p[1], $p[2]]
    );
  } else {
    [coin_out, zero] = Liquidity_pool.swap_(
      Stdlib.Coin.zero_($c, [$p[1]]),
      $.copy(coin_out_val),
      coin_in,
      u64('0'),
      $c,
      [$p[1], $p[0], $p[2]]
    );
  }
  Stdlib.Coin.destroy_zero_(zero, $c, [$p[0]]);
  return coin_out;
}

export function swap_coin_for_exact_coin_(
  coin_max_in: Stdlib.Coin.Coin,
  coin_out_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  let coin_in, coin_in_val_needed, coin_out, coin_val_max;
  coin_in_val_needed = get_amount_in_($.copy(coin_out_val), $c, [$p[0], $p[1], $p[2]]);
  coin_val_max = Stdlib.Coin.value_(coin_max_in, $c, [$p[0]]);
  if (!$.copy(coin_in_val_needed).le($.copy(coin_val_max))) {
    throw $.abortCode($.copy(ERR_COIN_VAL_MAX_LESS_THAN_NEEDED));
  }
  coin_in = Stdlib.Coin.extract_(coin_max_in, $.copy(coin_in_val_needed), $c, [$p[0]]);
  coin_out = swap_coin_for_coin_unchecked_(coin_in, $.copy(coin_out_val), $c, [$p[0], $p[1], $p[2]]);
  return [coin_max_in, coin_out];
}

export function swap_exact_coin_for_coin_(
  coin_in: Stdlib.Coin.Coin,
  coin_out_min_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): Stdlib.Coin.Coin {
  let coin_in_val, coin_out, coin_out_val;
  coin_in_val = Stdlib.Coin.value_(coin_in, $c, [$p[0]]);
  coin_out_val = get_amount_out_($.copy(coin_in_val), $c, [$p[0], $p[1], $p[2]]);
  if (!$.copy(coin_out_val).ge($.copy(coin_out_min_val))) {
    throw $.abortCode($.copy(ERR_COIN_OUT_NUM_LESS_THAN_EXPECTED_MINIMUM));
  }
  coin_out = swap_coin_for_coin_unchecked_(coin_in, $.copy(coin_out_val), $c, [$p[0], $p[1], $p[2]]);
  return coin_out;
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
