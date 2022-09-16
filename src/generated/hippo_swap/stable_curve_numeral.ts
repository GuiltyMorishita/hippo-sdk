import * as $ from "@manahippo/move-to-ts";
import {
  AptosDataCache,
  AptosParserRepo,
  DummyCache,
  AptosLocalCache,
} from "@manahippo/move-to-ts";
import { U8, U64, U128 } from "@manahippo/move-to-ts";
import { u8, u64, u128 } from "@manahippo/move-to-ts";
import { TypeParamDeclType, FieldDeclType } from "@manahippo/move-to-ts";
import {
  AtomicTypeTag,
  StructTag,
  TypeTag,
  VectorTag,
  SimpleStructTag,
} from "@manahippo/move-to-ts";
import {
  HexString,
  AptosClient,
  AptosAccount,
  TxnBuilderTypes,
  Types,
} from "aptos";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString(
  "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
);
export const moduleName = "stable_curve_numeral";

export const ERROR_SWAP_INVALID_AMOUNT: U64 = u64("2021");
export const ERROR_SWAP_INVALID_DERIVIATION: U64 = u64("2020");

export function get_A_(
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  timestamp: U64,
  $c: AptosDataCache
): U64 {
  let temp$1, temp$2;
  if ($.copy(timestamp).lt($.copy(future_A_time))) {
    if ($.copy(future_A).lt($.copy(initial_A))) {
      temp$1 = $.copy(initial_A).sub(
        $.copy(initial_A)
          .sub($.copy(future_A))
          .mul($.copy(timestamp).sub($.copy(initial_A_time)))
          .div($.copy(future_A_time).sub($.copy(initial_A_time)))
      );
    } else {
      temp$1 = $.copy(initial_A).add(
        $.copy(future_A)
          .sub($.copy(initial_A))
          .mul($.copy(timestamp).sub($.copy(initial_A_time)))
          .div($.copy(future_A_time).sub($.copy(initial_A_time)))
      );
    }
    temp$2 = temp$1;
  } else {
    temp$2 = $.copy(future_A);
  }
  return temp$2;
}

export function get_D_(x: U128, y: U128, amp: U64, $c: AptosDataCache): U128 {
  return get_D_origin_($.copy(x), $.copy(y), $.copy(amp), $c);
}

export function get_D_newton_method_(
  x: U128,
  y: U128,
  amp: U64,
  $c: AptosDataCache
): U128 {
  let d0, result;
  d0 = $.copy(x).add($.copy(y));
  if ($.copy(d0).eq(u128("0"))) {
    return $.copy(d0);
  } else {
  }
  [result] = recur_D_newton_method_(
    $.copy(d0),
    $.copy(x),
    $.copy(y),
    u128($.copy(amp)),
    u128("0"),
    u128("100"),
    $c
  );
  return $.copy(result);
}

export function get_D_origin_(
  x: U128,
  y: U128,
  amp: U64,
  $c: AptosDataCache
): U128 {
  let temp$1, _iter, ann, d, end, iter, result, s;
  s = $.copy(x).add($.copy(y));
  if ($.copy(s).eq(u128("0"))) {
    temp$1 = $.copy(s);
  } else {
    [d, ann, iter, end] = [
      $.copy(s),
      u128($.copy(amp)).mul(u128("2")),
      u128("0"),
      u128("255"),
    ];
    [result, _iter] = recur_D_origin_(
      $.copy(d),
      $.copy(x),
      $.copy(y),
      $.copy(s),
      $.copy(ann),
      $.copy(iter),
      $.copy(end),
      $c
    );
    temp$1 = $.copy(result);
  }
  return temp$1;
}

export function get_y_(x: U64, amp: U64, d: U128, $c: AptosDataCache): U128 {
  let amp__1, b, c, result, x__2, y;
  if (!$.copy(x).neq(u64("0"))) {
    throw $.abortCode($.copy(ERROR_SWAP_INVALID_AMOUNT));
  }
  if ($.copy(d).eq(u128("0"))) {
    return u128("0");
  } else {
  }
  amp__1 = u128($.copy(amp));
  x__2 = u128($.copy(x));
  y = $.copy(d);
  b = $.copy(x__2).add($.copy(d).div(u128("2").mul($.copy(amp__1))));
  c = $.copy(d)
    .mul($.copy(d))
    .div($.copy(x__2))
    .mul($.copy(d))
    .div(u128("8").mul($.copy(amp__1)));
  [result] = recur_y_(
    $.copy(y),
    $.copy(b),
    $.copy(c),
    $.copy(d),
    u128("0"),
    u128("100"),
    $c
  );
  return $.copy(result);
}

export function recur_D_improved_(
  d: U128,
  x: U128,
  y: U128,
  s: U128,
  ann: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache
): [U128, U128] {
  let temp$1, temp$2, temp$3, temp$4, d_prev, new_d, result;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode($.copy(ERROR_SWAP_INVALID_DERIVIATION));
  }
  d_prev = $.copy(d);
  result = u128("0");
  d = $.copy(d)
    .mul($.copy(d))
    .mul($.copy(d))
    .div($.copy(x))
    .div($.copy(y))
    .div(u128("4"));
  new_d = $.copy(ann)
    .mul($.copy(s))
    .add($.copy(d).mul(u128("2")))
    .mul($.copy(d_prev))
    .div(
      $.copy(ann)
        .sub(u128("1"))
        .mul($.copy(d_prev))
        .add(u128("3").mul($.copy(d)))
    );
  if ($.copy(new_d).gt($.copy(d_prev))) {
    temp$1 = $.copy(new_d).le($.copy(d_prev).add(u128("1")));
  } else {
    temp$1 = false;
  }
  if (temp$1) {
    result = $.copy(new_d);
  } else {
  }
  if ($.copy(new_d).le($.copy(d_prev))) {
    temp$2 = $.copy(d_prev).le($.copy(new_d).add(u128("1")));
  } else {
    temp$2 = false;
  }
  if (temp$2) {
    result = $.copy(new_d);
  } else {
  }
  if ($.copy(result).eq(u128("0"))) {
    [temp$3, temp$4] = recur_D_improved_(
      $.copy(new_d),
      $.copy(x),
      $.copy(y),
      $.copy(s),
      $.copy(ann),
      $.copy(iter).add(u128("1")),
      $.copy(end),
      $c
    );
  } else {
    [temp$3, temp$4] = [$.copy(result), $.copy(iter)];
  }
  return [temp$3, temp$4];
}

export function recur_D_newton_method_(
  d: U128,
  x: U128,
  y: U128,
  amp: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache
): [U128, U128] {
  let temp$1, temp$2, d1, minuend;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode($.copy(ERROR_SWAP_INVALID_DERIVIATION));
  }
  d1 = u128("8")
    .mul($.copy(amp))
    .mul($.copy(x))
    .mul($.copy(y))
    .mul($.copy(x).add($.copy(y)))
    .add(u128("2").mul($.copy(d)).mul($.copy(d)).mul($.copy(d)))
    .div(
      u128("3")
        .mul($.copy(d))
        .mul($.copy(d))
        .add(
          u128("4")
            .mul($.copy(x))
            .mul($.copy(y))
            .mul(u128("2").mul($.copy(amp)).sub(u128("1")))
        )
    );
  minuend = $.copy(d).sub($.copy(d1));
  if ($.copy(minuend).le(u128("1"))) {
    [temp$1, temp$2] = [$.copy(d1), $.copy(iter)];
  } else {
    [temp$1, temp$2] = recur_D_newton_method_(
      $.copy(d1),
      $.copy(x),
      $.copy(y),
      $.copy(amp),
      $.copy(iter).add(u128("1")),
      $.copy(end),
      $c
    );
  }
  return [temp$1, temp$2];
}

export function recur_D_origin_(
  d: U128,
  x: U128,
  y: U128,
  s: U128,
  ann: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache
): [U128, U128] {
  let temp$1, temp$2, temp$3, temp$4, d_p, d_prev, new_d, result;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode($.copy(ERROR_SWAP_INVALID_DERIVIATION));
  }
  d_prev = $.copy(d);
  result = u128("0");
  d_p = $.copy(d);
  d_p = $.copy(d_p)
    .mul($.copy(d))
    .div($.copy(x).mul(u128("2")));
  d_p = $.copy(d_p)
    .mul($.copy(d))
    .div($.copy(y).mul(u128("2")));
  new_d = $.copy(ann)
    .mul($.copy(s))
    .add($.copy(d_p).mul(u128("2")))
    .mul($.copy(d))
    .div(
      $.copy(ann)
        .sub(u128("1"))
        .mul($.copy(d))
        .add(u128("3").mul($.copy(d_p)))
    );
  if ($.copy(new_d).gt($.copy(d_prev))) {
    temp$1 = $.copy(new_d).le($.copy(d_prev).add(u128("1")));
  } else {
    temp$1 = false;
  }
  if (temp$1) {
    result = $.copy(new_d);
  } else {
  }
  if ($.copy(new_d).le($.copy(d_prev))) {
    temp$2 = $.copy(d_prev).le($.copy(new_d).add(u128("1")));
  } else {
    temp$2 = false;
  }
  if (temp$2) {
    result = $.copy(new_d);
  } else {
  }
  if ($.copy(result).eq(u128("0"))) {
    [temp$3, temp$4] = recur_D_origin_(
      $.copy(new_d),
      $.copy(x),
      $.copy(y),
      $.copy(s),
      $.copy(ann),
      $.copy(iter).add(u128("1")),
      $.copy(end),
      $c
    );
  } else {
    [temp$3, temp$4] = [$.copy(result), $.copy(iter)];
  }
  return [temp$3, temp$4];
}

export function recur_y_(
  y: U128,
  b: U128,
  c: U128,
  d: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache
): [U128, U128] {
  let temp$1, difference, y_next;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode($.copy(ERROR_SWAP_INVALID_DERIVIATION));
  }
  y_next = $.copy(y)
    .mul($.copy(y))
    .add($.copy(c))
    .div(u128("2").mul($.copy(y)).add($.copy(b)).sub($.copy(d)));
  if ($.copy(y_next).gt($.copy(y))) {
    temp$1 = $.copy(y_next).sub($.copy(y));
  } else {
    temp$1 = $.copy(y).sub($.copy(y_next));
  }
  difference = temp$1;
  if ($.copy(difference).le(u128("1"))) {
    return [$.copy(y_next), $.copy(iter)];
  } else {
    return recur_y_(
      $.copy(y_next),
      $.copy(b),
      $.copy(c),
      $.copy(d),
      $.copy(iter).add(u128("1")),
      $.copy(end),
      $c
    );
  }
}

export function loadParsers(repo: AptosParserRepo) {}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache
  ) {}
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
