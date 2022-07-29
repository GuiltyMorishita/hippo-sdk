import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as aptos_framework$_ from "../aptos_framework";
import * as std$_ from "../std";
import * as cp_swap$_ from "./cp_swap";
import * as piece_swap$_ from "./piece_swap";
import * as stable_curve_swap$_ from "./stable_curve_swap";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "router";

export const E_OUTPUT_LESS_THAN_MINIMUM : U64 = u64("2");
export const E_UNKNOWN_POOL_TYPE : U64 = u64("1");
export const POOL_TYPE_CONSTANT_PRODUCT : U8 = u8("1");
export const POOL_TYPE_PIECEWISE : U8 = u8("3");
export const POOL_TYPE_STABLE_CURVE : U8 = u8("2");

export function add_liquidity_route$ (
  signer: HexString,
  pool_type: U8,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    [temp$7, temp$8, temp$9] = cp_swap$_.add_liquidity$(signer, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      [temp$4, temp$5, temp$6] = stable_curve_swap$_.add_liquidity$(signer, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        [temp$1, temp$2, temp$3] = piece_swap$_.add_liquidity$(signer, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      [temp$4, temp$5, temp$6] = [temp$1, temp$2, temp$3];
    }
    [temp$7, temp$8, temp$9] = [temp$4, temp$5, temp$6];
  }
  return [temp$7, temp$8, temp$9];
}

export function get_intermediate_output$ (
  pool_type: U8,
  is_x_to_y: boolean,
  x_in: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): aptos_framework$_.coin$_.Coin {
  let temp$11, temp$12, temp$13, temp$14, temp$3, temp$8, x_out, x_out__2, y_out, y_out__1, y_out__10, y_out__4, y_out__6, y_out__9, zero, zero__5, zero2, zero2__7;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    if (is_x_to_y) {
      [x_out, y_out] = cp_swap$_.swap_x_to_exact_y_direct$(x_in, $c, [$p[0], $p[1]] as TypeTag[]);
      aptos_framework$_.coin$_.destroy_zero$(x_out, $c, [$p[0]] as TypeTag[]);
      temp$3 = y_out;
    }
    else{
      [y_out__1, x_out__2] = cp_swap$_.swap_y_to_exact_x_direct$(x_in, $c, [$p[1], $p[0]] as TypeTag[]);
      aptos_framework$_.coin$_.destroy_zero$(x_out__2, $c, [$p[0]] as TypeTag[]);
      temp$3 = y_out__1;
    }
    temp$14 = temp$3;
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      if (is_x_to_y) {
        [zero, zero2, y_out__4] = stable_curve_swap$_.swap_x_to_exact_y_direct$(x_in, $c, [$p[0], $p[1]] as TypeTag[]);
        aptos_framework$_.coin$_.destroy_zero$(zero, $c, [$p[0]] as TypeTag[]);
        aptos_framework$_.coin$_.destroy_zero$(zero2, $c, [$p[0]] as TypeTag[]);
        temp$8 = y_out__4;
      }
      else{
        [zero__5, y_out__6, zero2__7] = stable_curve_swap$_.swap_y_to_exact_x_direct$(x_in, $c, [$p[1], $p[0]] as TypeTag[]);
        aptos_framework$_.coin$_.destroy_zero$(zero__5, $c, [$p[0]] as TypeTag[]);
        aptos_framework$_.coin$_.destroy_zero$(zero2__7, $c, [$p[0]] as TypeTag[]);
        temp$8 = y_out__6;
      }
      temp$13 = temp$8;
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        if (is_x_to_y) {
          y_out__9 = piece_swap$_.swap_x_to_y_direct$(x_in, $c, [$p[0], $p[1]] as TypeTag[]);
          temp$11 = y_out__9;
        }
        else{
          y_out__10 = piece_swap$_.swap_y_to_x_direct$(x_in, $c, [$p[1], $p[0]] as TypeTag[]);
          temp$11 = y_out__10;
        }
        temp$12 = temp$11;
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      temp$13 = temp$12;
    }
    temp$14 = temp$13;
  }
  return temp$14;
}

export function remove_liquidity_route$ (
  signer: HexString,
  pool_type: U8,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    [temp$5, temp$6] = cp_swap$_.remove_liquidity$(signer, $.copy(liquidity), $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      [temp$3, temp$4] = stable_curve_swap$_.remove_liquidity$(signer, $.copy(liquidity), $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        [temp$1, temp$2] = piece_swap$_.remove_liquidity$(signer, $.copy(liquidity), $c, [$p[0], $p[1]] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      [temp$3, temp$4] = [temp$1, temp$2];
    }
    [temp$5, temp$6] = [temp$3, temp$4];
  }
  return [temp$5, temp$6];
}

export function three_step_route$ (
  sender: HexString,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  third_pool_type: U8,
  third_is_x_to_y: boolean,
  x_in: U64,
  a_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, Z, A>*/
): void {
  let coin_a, coin_x, coin_y, coin_z, sender_addr;
  coin_x = aptos_framework$_.coin$_.withdraw$(sender, $.copy(x_in), $c, [$p[0]] as TypeTag[]);
  coin_y = get_intermediate_output$($.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1]] as TypeTag[]);
  coin_z = get_intermediate_output$($.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2]] as TypeTag[]);
  coin_a = get_intermediate_output$($.copy(third_pool_type), third_is_x_to_y, coin_z, $c, [$p[2], $p[3]] as TypeTag[]);
  if (!aptos_framework$_.coin$_.value$(coin_a, $c, [$p[3]] as TypeTag[]).ge($.copy(a_min_out))) {
    throw $.abortCode(E_OUTPUT_LESS_THAN_MINIMUM);
  }
  sender_addr = std$_.signer$_.address_of$(sender, $c);
  if (!aptos_framework$_.coin$_.is_account_registered$($.copy(sender_addr), $c, [$p[3]] as TypeTag[])) {
    aptos_framework$_.coin$_.register_internal$(sender, $c, [$p[3]] as TypeTag[]);
  }
  else{
  }
  aptos_framework$_.coin$_.deposit$($.copy(sender_addr), coin_a, $c, [$p[3]] as TypeTag[]);
  return;
}

export function three_step_route_script$ (
  sender: HexString,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  third_pool_type: U8,
  third_is_x_to_y: boolean,
  x_in: U64,
  a_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, Z, A>*/
): void {
  return three_step_route$(sender, $.copy(first_pool_type), first_is_x_to_y, $.copy(second_pool_type), second_is_x_to_y, $.copy(third_pool_type), third_is_x_to_y, $.copy(x_in), $.copy(a_min_out), $c, [$p[0], $p[1], $p[2], $p[3]] as TypeTag[]);
}


export function buildPayload_three_step_route_script (
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  third_pool_type: U8,
  third_is_x_to_y: boolean,
  x_in: U64,
  a_min_out: U64,
  $p: TypeTag[], /* <X, Y, Z, A>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::router::three_step_route_script",
    typeParamStrings,
    [
      $.payloadArg(first_pool_type),
      $.payloadArg(first_is_x_to_y),
      $.payloadArg(second_pool_type),
      $.payloadArg(second_is_x_to_y),
      $.payloadArg(third_pool_type),
      $.payloadArg(third_is_x_to_y),
      $.payloadArg(x_in),
      $.payloadArg(a_min_out),
    ]
  );

}

export function two_step_route$ (
  sender: HexString,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, Z>*/
): U64 {
  let coin_x, coin_y, coin_z, coin_z_amt, sender_addr;
  coin_x = aptos_framework$_.coin$_.withdraw$(sender, $.copy(x_in), $c, [$p[0]] as TypeTag[]);
  coin_y = get_intermediate_output$($.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1]] as TypeTag[]);
  coin_z = get_intermediate_output$($.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2]] as TypeTag[]);
  coin_z_amt = aptos_framework$_.coin$_.value$(coin_z, $c, [$p[2]] as TypeTag[]);
  if (!$.copy(coin_z_amt).ge($.copy(z_min_out))) {
    throw $.abortCode(E_OUTPUT_LESS_THAN_MINIMUM);
  }
  sender_addr = std$_.signer$_.address_of$(sender, $c);
  if (!aptos_framework$_.coin$_.is_account_registered$($.copy(sender_addr), $c, [$p[2]] as TypeTag[])) {
    aptos_framework$_.coin$_.register_internal$(sender, $c, [$p[2]] as TypeTag[]);
  }
  else{
  }
  aptos_framework$_.coin$_.deposit$($.copy(sender_addr), coin_z, $c, [$p[2]] as TypeTag[]);
  return $.copy(coin_z_amt);
}

export function two_step_route_script$ (
  sender: HexString,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, Z>*/
): void {
  two_step_route$(sender, $.copy(first_pool_type), first_is_x_to_y, $.copy(second_pool_type), second_is_x_to_y, $.copy(x_in), $.copy(z_min_out), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}


export function buildPayload_two_step_route_script (
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $p: TypeTag[], /* <X, Y, Z>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::router::two_step_route_script",
    typeParamStrings,
    [
      $.payloadArg(first_pool_type),
      $.payloadArg(first_is_x_to_y),
      $.payloadArg(second_pool_type),
      $.payloadArg(second_is_x_to_y),
      $.payloadArg(x_in),
      $.payloadArg(z_min_out),
    ]
  );

}

export function loadParsers(repo: AptosParserRepo) {
}

