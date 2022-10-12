import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as U256 from '../u256';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'stable_curve';

export const ONE_E_8: U128 = u128('100000000');

export function coin_in_(
  coin_out: U128,
  scale_out: U64,
  scale_in: U64,
  reserve_out: U128,
  reserve_in: U128,
  $c: AptosDataCache
): U128 {
  let amount_out, r, reserve_in_u256, reserve_out_u256, total_reserve, u2561e8, x, xy;
  u2561e8 = U256.U256.from_u128_($.copy(ONE_E_8), $c);
  xy = lp_value_($.copy(reserve_in), $.copy(scale_in), $.copy(reserve_out), $.copy(scale_out), $c);
  reserve_in_u256 = U256.U256.div_(
    U256.U256.mul_(U256.U256.from_u128_($.copy(reserve_in), $c), $.copy(u2561e8), $c),
    U256.U256.from_u64_($.copy(scale_in), $c),
    $c
  );
  reserve_out_u256 = U256.U256.div_(
    U256.U256.mul_(U256.U256.from_u128_($.copy(reserve_out), $c), $.copy(u2561e8), $c),
    U256.U256.from_u64_($.copy(scale_out), $c),
    $c
  );
  amount_out = U256.U256.div_(
    U256.U256.mul_(U256.U256.from_u128_($.copy(coin_out), $c), $.copy(u2561e8), $c),
    U256.U256.from_u64_($.copy(scale_out), $c),
    $c
  );
  total_reserve = U256.U256.sub_($.copy(reserve_out_u256), $.copy(amount_out), $c);
  x = U256.U256.sub_(
    get_y_($.copy(total_reserve), $.copy(xy), $.copy(reserve_in_u256), $c),
    $.copy(reserve_in_u256),
    $c
  );
  r = U256.U256.div_(U256.U256.mul_($.copy(x), U256.U256.from_u64_($.copy(scale_in), $c), $c), $.copy(u2561e8), $c);
  return U256.U256.as_u128_($.copy(r), $c);
}

export function coin_out_(
  coin_in: U128,
  scale_in: U64,
  scale_out: U64,
  reserve_in: U128,
  reserve_out: U128,
  $c: AptosDataCache
): U128 {
  let amount_in, r, reserve_in_u256, reserve_out_u256, total_reserve, u2561e8, xy, y;
  u2561e8 = U256.U256.from_u128_($.copy(ONE_E_8), $c);
  xy = lp_value_($.copy(reserve_in), $.copy(scale_in), $.copy(reserve_out), $.copy(scale_out), $c);
  reserve_in_u256 = U256.U256.div_(
    U256.U256.mul_(U256.U256.from_u128_($.copy(reserve_in), $c), $.copy(u2561e8), $c),
    U256.U256.from_u64_($.copy(scale_in), $c),
    $c
  );
  reserve_out_u256 = U256.U256.div_(
    U256.U256.mul_(U256.U256.from_u128_($.copy(reserve_out), $c), $.copy(u2561e8), $c),
    U256.U256.from_u64_($.copy(scale_out), $c),
    $c
  );
  amount_in = U256.U256.div_(
    U256.U256.mul_(U256.U256.from_u128_($.copy(coin_in), $c), $.copy(u2561e8), $c),
    U256.U256.from_u64_($.copy(scale_in), $c),
    $c
  );
  total_reserve = U256.U256.add_($.copy(amount_in), $.copy(reserve_in_u256), $c);
  y = U256.U256.sub_(
    $.copy(reserve_out_u256),
    get_y_($.copy(total_reserve), $.copy(xy), $.copy(reserve_out_u256), $c),
    $c
  );
  r = U256.U256.div_(U256.U256.mul_($.copy(y), U256.U256.from_u64_($.copy(scale_out), $c), $c), $.copy(u2561e8), $c);
  return U256.U256.as_u128_($.copy(r), $c);
}

export function d_(x0_u256: U256.U256.U256, y_u256: U256.U256.U256, $c: AptosDataCache): U256.U256.U256 {
  let three_u256, x3, xx, xxx, xyy3, yy;
  three_u256 = U256.U256.from_u128_(u128('3'), $c);
  x3 = U256.U256.mul_($.copy(three_u256), $.copy(x0_u256), $c);
  yy = U256.U256.mul_($.copy(y_u256), $.copy(y_u256), $c);
  xyy3 = U256.U256.mul_($.copy(x3), $.copy(yy), $c);
  xx = U256.U256.mul_($.copy(x0_u256), $.copy(x0_u256), $c);
  xxx = U256.U256.mul_($.copy(xx), $.copy(x0_u256), $c);
  return U256.U256.add_($.copy(xyy3), $.copy(xxx), $c);
}

export function f_(x0_u256: U256.U256.U256, y_u256: U256.U256.U256, $c: AptosDataCache): U256.U256.U256 {
  let a, b, xx, xxx, yy, yyy;
  yy = U256.U256.mul_($.copy(y_u256), $.copy(y_u256), $c);
  yyy = U256.U256.mul_($.copy(yy), $.copy(y_u256), $c);
  a = U256.U256.mul_($.copy(x0_u256), $.copy(yyy), $c);
  xx = U256.U256.mul_($.copy(x0_u256), $.copy(x0_u256), $c);
  xxx = U256.U256.mul_($.copy(xx), $.copy(x0_u256), $c);
  b = U256.U256.mul_($.copy(xxx), $.copy(y_u256), $c);
  return U256.U256.add_($.copy(a), $.copy(b), $c);
}

export function get_y_(x0: U256.U256.U256, xy: U256.U256.U256, y: U256.U256.U256, $c: AptosDataCache): U256.U256.U256 {
  let temp$1, _dy, cmp, i, k, one_u256;
  i = u64('0');
  one_u256 = U256.U256.from_u128_(u128('1'), $c);
  while ($.copy(i).lt(u64('255'))) {
    {
      k = f_($.copy(x0), $.copy(y), $c);
      _dy = U256.U256.zero_($c);
      cmp = U256.U256.compare_(k, xy, $c);
      if ($.copy(cmp).eq(u8('1'))) {
        _dy = U256.U256.add_(
          U256.U256.div_(U256.U256.sub_($.copy(xy), $.copy(k), $c), d_($.copy(x0), $.copy(y), $c), $c),
          $.copy(one_u256),
          $c
        );
        y = U256.U256.add_($.copy(y), $.copy(_dy), $c);
      } else {
        _dy = U256.U256.div_(U256.U256.sub_($.copy(k), $.copy(xy), $c), d_($.copy(x0), $.copy(y), $c), $c);
        y = U256.U256.sub_($.copy(y), $.copy(_dy), $c);
      }
      cmp = U256.U256.compare_(_dy, one_u256, $c);
      if ($.copy(cmp).eq(u8('0'))) {
        temp$1 = true;
      } else {
        temp$1 = $.copy(cmp).eq(u8('1'));
      }
      if (temp$1) {
        return $.copy(y);
      } else {
      }
      i = $.copy(i).add(u64('1'));
    }
  }
  return $.copy(y);
}

export function lp_value_(x_coin: U128, x_scale: U64, y_coin: U128, y_scale: U64, $c: AptosDataCache): U256.U256.U256 {
  let _a, _b, _x, _y, u2561e8, x_scale_u256, x_u256, y_scale_u256, y_u256;
  x_u256 = U256.U256.from_u128_($.copy(x_coin), $c);
  y_u256 = U256.U256.from_u128_($.copy(y_coin), $c);
  u2561e8 = U256.U256.from_u128_($.copy(ONE_E_8), $c);
  x_scale_u256 = U256.U256.from_u64_($.copy(x_scale), $c);
  y_scale_u256 = U256.U256.from_u64_($.copy(y_scale), $c);
  _x = U256.U256.div_(U256.U256.mul_($.copy(x_u256), $.copy(u2561e8), $c), $.copy(x_scale_u256), $c);
  _y = U256.U256.div_(U256.U256.mul_($.copy(y_u256), $.copy(u2561e8), $c), $.copy(y_scale_u256), $c);
  _a = U256.U256.mul_($.copy(_x), $.copy(_y), $c);
  _b = U256.U256.add_(U256.U256.mul_($.copy(_x), $.copy(_x), $c), U256.U256.mul_($.copy(_y), $.copy(_y), $c), $c);
  return U256.U256.mul_($.copy(_a), $.copy(_b), $c);
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
