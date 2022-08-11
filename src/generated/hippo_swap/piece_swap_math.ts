import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Math from "./math";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "piece_swap_math";

export const BILLION : U128 = u128("1000000000");
export const ENABLE_PLOT : boolean = false;
export const E_X_Y_NOT_EQUAL : U64 = u64("0");
export const FRACTION_MULT : U128 = u128("1000000000");
export const NUM_STEPS : U128 = u128("40");
export const PRECISION_FACTOR : U128 = u128("1000000");

export function compare_fraction_ (
  first_numerator: U128,
  first_denominator: U128,
  second_numerator: U128,
  second_denominator: U128,
  $c: AptosDataCache,
): boolean {
  return (($.copy(first_numerator)).mul($.copy(second_denominator))).lt(($.copy(second_numerator)).mul($.copy(first_denominator)));
}

export function compute_initialization_constants_ (
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  $c: AptosDataCache,
): [U128, U128, U128, U128, U128] {
  let k2, m, n, xa, xb;
  m = Math.sqrt_(div_w_($.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $c), $c);
  xa = (Math.sqrt_(div_w_($.copy(k), $.copy(w2_numerator), $.copy(w2_denominator), $c), $c)).sub($.copy(m));
  xb = (($.copy(k)).div(($.copy(xa)).add($.copy(m)))).sub($.copy(m));
  k2 = mul_w_(($.copy(xa)).mul($.copy(xa)), $.copy(w2_numerator), $.copy(w2_denominator), $c);
  n = ($.copy(xb)).sub(($.copy(k2)).div($.copy(xa)));
  return [$.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $.copy(k2)];
}

export function div_w_ (
  multiplier: U128,
  numerator: U128,
  denominator: U128,
  $c: AptosDataCache,
): U128 {
  return (($.copy(multiplier)).mul($.copy(denominator))).div($.copy(numerator));
}

export function get_add_liquidity_actual_amount_ (
  current_x: U128,
  current_y: U128,
  current_lp: U128,
  add_amt_x: U128,
  add_amt_y: U128,
  $c: AptosDataCache,
): [U128, U128, U128] {
  let temp$1, temp$2, add_x_to_y, current_x_to_y, optimal_amt_x, optimal_amt_y, optimal_lp, optimal_lp__3;
  if (($.copy(add_amt_x)).eq((u128("0")))) {
    temp$1 = true;
  }
  else{
    temp$1 = ($.copy(add_amt_y)).eq((u128("0")));
  }
  if (temp$1) {
    return [u128("0"), u128("0"), u128("0")];
  }
  else{
  }
  if (($.copy(current_x)).eq((u128("0")))) {
    temp$2 = true;
  }
  else{
    temp$2 = ($.copy(current_y)).eq((u128("0")));
  }
  if (temp$2) {
    if (!($.copy(add_amt_x)).eq(($.copy(add_amt_y)))) {
      throw $.abortCode(E_X_Y_NOT_EQUAL);
    }
    return [$.copy(add_amt_x), $.copy(add_amt_y), $.copy(add_amt_x)];
  }
  else{
  }
  current_x_to_y = (($.copy(current_x)).mul(FRACTION_MULT)).div($.copy(current_y));
  add_x_to_y = (($.copy(add_amt_x)).mul(FRACTION_MULT)).div($.copy(add_amt_y));
  if (($.copy(current_x_to_y)).gt($.copy(add_x_to_y))) {
    optimal_amt_y = (($.copy(current_y)).mul($.copy(add_amt_x))).div($.copy(current_x));
    optimal_lp = (($.copy(current_lp)).mul($.copy(add_amt_x))).div($.copy(current_x));
    return [$.copy(add_amt_x), $.copy(optimal_amt_y), $.copy(optimal_lp)];
  }
  else{
    optimal_amt_x = (($.copy(current_x)).mul($.copy(add_amt_y))).div($.copy(current_y));
    optimal_lp__3 = (($.copy(current_lp)).mul($.copy(add_amt_y))).div($.copy(current_y));
    return [$.copy(optimal_amt_x), $.copy(add_amt_y), $.copy(optimal_lp__3)];
  }
}

export function get_remove_liquidity_amounts_ (
  current_x: U128,
  current_y: U128,
  current_lp_amt: U128,
  remove_lp_amt: U128,
  $c: AptosDataCache,
): [U128, U128] {
  let temp$1;
  if (($.copy(remove_lp_amt)).eq((u128("0")))) {
    temp$1 = true;
  }
  else{
    temp$1 = ($.copy(current_lp_amt)).eq((u128("0")));
  }
  if (temp$1) {
    return [u128("0"), u128("0")];
  }
  else{
  }
  return [(($.copy(current_x)).mul($.copy(remove_lp_amt))).div($.copy(current_lp_amt)), (($.copy(current_y)).mul($.copy(remove_lp_amt))).div($.copy(current_lp_amt))];
}

export function get_swap_x_to_y_out_ (
  current_x: U128,
  current_y: U128,
  input_x: U128,
  k: U128,
  k2: U128,
  xa: U128,
  xb: U128,
  m: U128,
  n: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1, denominator, max_x_y, numerator, preprocessed_input_x;
  max_x_y = Math.max_($.copy(current_x), $.copy(current_y), $c);
  numerator = u128("1");
  denominator = u128("1");
  while (($.copy(max_x_y)).gt(BILLION)) {
    {
      max_x_y = ($.copy(max_x_y)).div(u128("10"));
      denominator = ($.copy(denominator)).mul(u128("10"));
    }

  }while (($.copy(max_x_y)).lt((BILLION).div(u128("10")))) {
    {
      max_x_y = ($.copy(max_x_y)).mul(u128("10"));
      numerator = ($.copy(numerator)).mul(u128("10"));
    }

  }preprocessed_input_x = (($.copy(input_x)).mul($.copy(numerator))).div($.copy(denominator));
  if (($.copy(preprocessed_input_x)).lt(u128("10000"))) {
    temp$1 = ((get_swap_x_to_y_out_preprocessed_inner_((($.copy(current_x)).mul($.copy(numerator))).div($.copy(denominator)), (($.copy(current_y)).mul($.copy(numerator))).div($.copy(denominator)), $.copy(input_x), $.copy(numerator), $.copy(denominator), $.copy(k), $.copy(k2), $.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $c)).mul($.copy(denominator))).div(($.copy(numerator)).mul(PRECISION_FACTOR));
  }
  else{
    temp$1 = ((get_swap_x_to_y_out_preprocessed_inner_((($.copy(current_x)).mul($.copy(numerator))).div($.copy(denominator)), (($.copy(current_y)).mul($.copy(numerator))).div($.copy(denominator)), $.copy(preprocessed_input_x), u128("1"), u128("1"), $.copy(k), $.copy(k2), $.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $c)).mul($.copy(denominator))).div(($.copy(numerator)).mul(PRECISION_FACTOR));
  }
  return temp$1;
}

export function get_swap_x_to_y_out_preprocessed_ (
  current_x: U128,
  current_y: U128,
  input_x: U128,
  k: U128,
  k2: U128,
  xa: U128,
  xb: U128,
  m: U128,
  n: U128,
  $c: AptosDataCache,
): U128 {
  return get_swap_x_to_y_out_preprocessed_inner_($.copy(current_x), $.copy(current_y), $.copy(input_x), u128("1"), u128("1"), $.copy(k), $.copy(k2), $.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $c);
}

export function get_swap_x_to_y_out_preprocessed_inner_ (
  current_x: U128,
  current_y: U128,
  input_x: U128,
  preprocessing_numerator: U128,
  preprocessing_denominator: U128,
  k: U128,
  k2: U128,
  xa: U128,
  xb: U128,
  m: U128,
  n: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1, temp$20, temp$28, temp$3, temp$31, temp$32, _dydx_denominator, _dydx_numerator, dydx_denominator, dydx_denominator__7, dydx_numerator, dydx_numerator__6, f_denominator, f_denominator__22, f_denominator__5, f_numerator, f_numerator__21, f_numerator__4, input_xF_next_stage, input_xF_next_stage__14, p_current_xF, p_current_xF__23, p_current_xF__8, p_current_yF, p_current_yF__24, p_current_yF__9, p_delta_yF, p_delta_yF__18, p_delta_yF__29, p_delta_yF_this_stage, p_delta_yF_this_stage__13, p_input_xF, p_input_xF__10, p_input_xF__25, p_k, p_k2, p_m, p_n, p_new_xF, p_new_xF__11, p_new_xF__26, p_new_yF, p_new_yF__17, p_new_yF__27, p_output_y, p_output_y__16, p_output_y__19, p_output_y__2, p_output_y__30, p_output_yF_next_stage, p_output_yF_next_stage__15, p_output_y_max, p_output_y_max__12, p_xa, p_xb;
  p_xa = ($.copy(xa)).mul(PRECISION_FACTOR);
  p_xb = ($.copy(xb)).mul(PRECISION_FACTOR);
  p_m = ($.copy(m)).mul(PRECISION_FACTOR);
  p_n = ($.copy(n)).mul(PRECISION_FACTOR);
  p_k = (($.copy(k)).mul(PRECISION_FACTOR)).mul(PRECISION_FACTOR);
  p_k2 = (($.copy(k2)).mul(PRECISION_FACTOR)).mul(PRECISION_FACTOR);
  if (compare_fraction_($.copy(current_x), $.copy(current_y), $.copy(xa), $.copy(xb), $c)) {
    [f_numerator, f_denominator, dydx_numerator, dydx_denominator] = solve_F_upper_left_($.copy(current_x), $.copy(current_y), $.copy(n), $.copy(k2), $c);
    p_current_xF = ((($.copy(current_x)).mul($.copy(f_numerator))).mul(PRECISION_FACTOR)).div($.copy(f_denominator));
    p_current_yF = ((($.copy(current_y)).mul($.copy(f_numerator))).mul(PRECISION_FACTOR)).div($.copy(f_denominator));
    p_input_xF = ((((($.copy(input_x)).mul($.copy(f_numerator))).mul(PRECISION_FACTOR)).div($.copy(f_denominator))).mul($.copy(preprocessing_numerator))).div($.copy(preprocessing_denominator));
    p_new_xF = ($.copy(p_current_xF)).add($.copy(p_input_xF));
    if (($.copy(p_new_xF)).gt($.copy(p_xa))) {
      p_output_y_max = mul_w_(((($.copy(input_x)).mul(PRECISION_FACTOR)).mul($.copy(preprocessing_numerator))).div($.copy(preprocessing_denominator)), $.copy(dydx_numerator), $.copy(dydx_denominator), $c);
      p_delta_yF_this_stage = ($.copy(p_current_yF)).sub($.copy(p_xb));
      input_xF_next_stage = (($.copy(p_new_xF)).sub($.copy(p_xa))).div(PRECISION_FACTOR);
      p_output_yF_next_stage = get_swap_x_to_y_out_preprocessed_($.copy(xa), $.copy(xb), $.copy(input_xF_next_stage), $.copy(k), $.copy(k2), $.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $c);
      p_output_y = ((($.copy(p_delta_yF_this_stage)).add($.copy(p_output_yF_next_stage))).mul($.copy(f_denominator))).div($.copy(f_numerator));
      temp$3 = Math.min_($.copy(p_output_y), $.copy(p_output_y_max), $c);
    }
    else{
      p_new_yF = (($.copy(p_k2)).div($.copy(p_new_xF))).add($.copy(p_n));
      if (($.copy(p_current_yF)).gt($.copy(p_new_yF))) {
        temp$1 = ($.copy(p_current_yF)).sub($.copy(p_new_yF));
      }
      else{
        temp$1 = u128("0");
      }
      p_delta_yF = temp$1;
      p_output_y__2 = (($.copy(p_delta_yF)).mul($.copy(f_denominator))).div($.copy(f_numerator));
      temp$3 = $.copy(p_output_y__2);
    }
    temp$32 = temp$3;
  }
  else{
    if (compare_fraction_($.copy(current_x), $.copy(current_y), $.copy(xb), $.copy(xa), $c)) {
      [f_numerator__4, f_denominator__5, dydx_numerator__6, dydx_denominator__7] = solve_F_middle_($.copy(current_x), $.copy(current_y), $.copy(m), $.copy(k), $c);
      p_current_xF__8 = ((($.copy(current_x)).mul($.copy(f_numerator__4))).mul(PRECISION_FACTOR)).div($.copy(f_denominator__5));
      p_current_yF__9 = ((($.copy(current_y)).mul($.copy(f_numerator__4))).mul(PRECISION_FACTOR)).div($.copy(f_denominator__5));
      p_input_xF__10 = ((((($.copy(input_x)).mul($.copy(f_numerator__4))).mul(PRECISION_FACTOR)).div($.copy(f_denominator__5))).mul($.copy(preprocessing_numerator))).div($.copy(preprocessing_denominator));
      p_new_xF__11 = ($.copy(p_current_xF__8)).add($.copy(p_input_xF__10));
      if (($.copy(p_new_xF__11)).gt($.copy(p_xb))) {
        p_output_y_max__12 = mul_w_(((($.copy(input_x)).mul(PRECISION_FACTOR)).mul($.copy(preprocessing_numerator))).div($.copy(preprocessing_denominator)), $.copy(dydx_numerator__6), $.copy(dydx_denominator__7), $c);
        p_delta_yF_this_stage__13 = ($.copy(p_current_yF__9)).sub($.copy(p_xa));
        input_xF_next_stage__14 = (($.copy(p_new_xF__11)).sub($.copy(p_xb))).div(PRECISION_FACTOR);
        p_output_yF_next_stage__15 = get_swap_x_to_y_out_preprocessed_($.copy(xb), $.copy(xa), $.copy(input_xF_next_stage__14), $.copy(k), $.copy(k2), $.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $c);
        p_output_y__16 = ((($.copy(p_delta_yF_this_stage__13)).add($.copy(p_output_yF_next_stage__15))).mul($.copy(f_denominator__5))).div($.copy(f_numerator__4));
        temp$20 = Math.min_($.copy(p_output_y__16), $.copy(p_output_y_max__12), $c);
      }
      else{
        p_new_yF__17 = (($.copy(p_k)).div(($.copy(p_new_xF__11)).add($.copy(p_m)))).sub($.copy(p_m));
        p_delta_yF__18 = ($.copy(p_current_yF__9)).sub($.copy(p_new_yF__17));
        p_output_y__19 = (($.copy(p_delta_yF__18)).mul($.copy(f_denominator__5))).div($.copy(f_numerator__4));
        temp$20 = $.copy(p_output_y__19);
      }
      temp$31 = temp$20;
    }
    else{
      [f_numerator__21, f_denominator__22, _dydx_numerator, _dydx_denominator] = solve_F_bottom_right_($.copy(current_x), $.copy(current_y), $.copy(n), $.copy(k2), $c);
      p_current_xF__23 = ((($.copy(current_x)).mul($.copy(f_numerator__21))).mul(PRECISION_FACTOR)).div($.copy(f_denominator__22));
      p_current_yF__24 = ((($.copy(current_y)).mul($.copy(f_numerator__21))).mul(PRECISION_FACTOR)).div($.copy(f_denominator__22));
      p_input_xF__25 = ((((($.copy(input_x)).mul($.copy(f_numerator__21))).mul(PRECISION_FACTOR)).div($.copy(f_denominator__22))).mul($.copy(preprocessing_numerator))).div($.copy(preprocessing_denominator));
      p_new_xF__26 = ($.copy(p_current_xF__23)).add($.copy(p_input_xF__25));
      p_new_yF__27 = ($.copy(p_k2)).div(($.copy(p_new_xF__26)).sub($.copy(p_n)));
      if (($.copy(p_current_yF__24)).gt($.copy(p_new_yF__27))) {
        temp$28 = ($.copy(p_current_yF__24)).sub($.copy(p_new_yF__27));
      }
      else{
        temp$28 = u128("0");
      }
      p_delta_yF__29 = temp$28;
      p_output_y__30 = (($.copy(p_delta_yF__29)).mul($.copy(f_denominator__22))).div($.copy(f_numerator__21));
      temp$31 = $.copy(p_output_y__30);
    }
    temp$32 = temp$31;
  }
  return temp$32;
}

export function get_swap_y_to_x_out_ (
  current_x: U128,
  current_y: U128,
  input_y: U128,
  k: U128,
  k2: U128,
  xa: U128,
  xb: U128,
  m: U128,
  n: U128,
  $c: AptosDataCache,
): U128 {
  return get_swap_x_to_y_out_($.copy(current_y), $.copy(current_x), $.copy(input_y), $.copy(k), $.copy(k2), $.copy(xa), $.copy(xb), $.copy(m), $.copy(n), $c);
}

export function mul_w_ (
  multiplier: U128,
  numerator: U128,
  denominator: U128,
  $c: AptosDataCache,
): U128 {
  return (($.copy(multiplier)).mul($.copy(numerator))).div($.copy(denominator));
}

export function solve_F_bottom_right_ (
  x: U128,
  y: U128,
  n: U128,
  k2: U128,
  $c: AptosDataCache,
): [U128, U128, U128, U128] {
  return solve_F_upper_left_($.copy(y), $.copy(x), $.copy(n), $.copy(k2), $c);
}

export function solve_F_middle_ (
  x: U128,
  y: U128,
  m: U128,
  k: U128,
  $c: AptosDataCache,
): [U128, U128, U128, U128] {
  let b, denominator, numerator, xF, x_plus_y, xf_plus_m, xy;
  xy = ($.copy(x)).mul($.copy(y));
  x_plus_y = ($.copy(x)).add($.copy(y));
  b = ($.copy(x_plus_y)).mul($.copy(m));
  numerator = (Math.sqrt_((($.copy(b)).mul($.copy(b))).add(((u128("4")).mul($.copy(xy))).mul(($.copy(k)).sub(($.copy(m)).mul($.copy(m))))), $c)).sub($.copy(b));
  denominator = (u128("2")).mul($.copy(xy));
  xF = mul_w_($.copy(x), $.copy(numerator), $.copy(denominator), $c);
  xf_plus_m = ($.copy(xF)).add($.copy(m));
  return [$.copy(numerator), $.copy(denominator), $.copy(k), ($.copy(xf_plus_m)).mul($.copy(xf_plus_m))];
}

export function solve_F_upper_left_ (
  x: U128,
  y: U128,
  n: U128,
  k2: U128,
  $c: AptosDataCache,
): [U128, U128, U128, U128] {
  let denominator, numerator, xF, xn, xy;
  xn = ($.copy(x)).mul($.copy(n));
  xy = ($.copy(x)).mul($.copy(y));
  numerator = ($.copy(xn)).add(Math.sqrt_((($.copy(xn)).mul($.copy(xn))).add(((u128("4")).mul($.copy(xy))).mul($.copy(k2))), $c));
  denominator = (u128("2")).mul($.copy(xy));
  xF = mul_w_($.copy(x), $.copy(numerator), $.copy(denominator), $c);
  return [$.copy(numerator), $.copy(denominator), $.copy(k2), ($.copy(xF)).mul($.copy(xF))];
}

export function loadParsers(repo: AptosParserRepo) {
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
  }
}

