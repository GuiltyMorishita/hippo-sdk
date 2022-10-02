import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Cp_swap from './cp_swap';
import * as Piece_swap from './piece_swap';
export const packageName = 'hippo-swap';
export const moduleAddress = new HexString('0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f');
export const moduleName = 'router';

export const E_DEPRECATED: U64 = u64('3');
export const E_OUTPUT_LESS_THAN_MINIMUM: U64 = u64('2');
export const E_UNKNOWN_POOL_TYPE: U64 = u64('1');
export const POOL_TYPE_CONSTANT_PRODUCT: U8 = u8('1');
export const POOL_TYPE_PIECEWISE: U8 = u8('3');
export const POOL_TYPE_STABLE_CURVE: U8 = u8('2');

export function add_liquidity_route_(
  signer: HexString,
  pool_type: U8,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): [U64, U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  if ($.copy(pool_type).eq($.copy(POOL_TYPE_CONSTANT_PRODUCT))) {
    [temp$4, temp$5, temp$6] = Cp_swap.add_liquidity_(signer, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]]);
  } else {
    if ($.copy(pool_type).eq($.copy(POOL_TYPE_PIECEWISE))) {
      [temp$1, temp$2, temp$3] = Piece_swap.add_liquidity_(signer, $.copy(amount_x), $.copy(amount_y), $c, [
        $p[0],
        $p[1]
      ]);
    } else {
      throw $.abortCode($.copy(E_UNKNOWN_POOL_TYPE));
    }
    [temp$4, temp$5, temp$6] = [temp$1, temp$2, temp$3];
  }
  return [temp$4, temp$5, temp$6];
}

export function get_intermediate_output_(
  pool_type: U8,
  is_x_to_y: boolean,
  x_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): Stdlib.Coin.Coin {
  let temp$3, temp$6, temp$7, temp$8, temp$9, x_out, x_out__2, y_out, y_out__1, y_out__4, y_out__5;
  if ($.copy(pool_type).eq($.copy(POOL_TYPE_CONSTANT_PRODUCT))) {
    if (is_x_to_y) {
      [x_out, y_out] = Cp_swap.swap_x_to_exact_y_direct_(x_in, $c, [$p[0], $p[1]]);
      Stdlib.Coin.destroy_zero_(x_out, $c, [$p[0]]);
      temp$3 = y_out;
    } else {
      [y_out__1, x_out__2] = Cp_swap.swap_y_to_exact_x_direct_(x_in, $c, [$p[1], $p[0]]);
      Stdlib.Coin.destroy_zero_(x_out__2, $c, [$p[0]]);
      temp$3 = y_out__1;
    }
    temp$9 = temp$3;
  } else {
    if ($.copy(pool_type).eq($.copy(POOL_TYPE_STABLE_CURVE))) {
      throw $.abortCode($.copy(E_DEPRECATED));
    } else {
      if ($.copy(pool_type).eq($.copy(POOL_TYPE_PIECEWISE))) {
        if (is_x_to_y) {
          y_out__4 = Piece_swap.swap_x_to_y_direct_(x_in, $c, [$p[0], $p[1]]);
          temp$6 = y_out__4;
        } else {
          y_out__5 = Piece_swap.swap_y_to_x_direct_(x_in, $c, [$p[1], $p[0]]);
          temp$6 = y_out__5;
        }
        temp$7 = temp$6;
      } else {
        throw $.abortCode($.copy(E_UNKNOWN_POOL_TYPE));
      }
      temp$8 = temp$7;
    }
    temp$9 = temp$8;
  }
  return temp$9;
}

export function remove_liquidity_route_(
  signer: HexString,
  pool_type: U8,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): [U64, U64] {
  let temp$1, temp$2, temp$3, temp$4;
  if ($.copy(pool_type).eq($.copy(POOL_TYPE_CONSTANT_PRODUCT))) {
    [temp$3, temp$4] = Cp_swap.remove_liquidity_(
      signer,
      $.copy(liquidity),
      $.copy(amount_x_min),
      $.copy(amount_y_min),
      $c,
      [$p[0], $p[1]]
    );
  } else {
    if ($.copy(pool_type).eq($.copy(POOL_TYPE_PIECEWISE))) {
      [temp$1, temp$2] = Piece_swap.remove_liquidity_(signer, $.copy(liquidity), $c, [$p[0], $p[1]]);
    } else {
      throw $.abortCode($.copy(E_UNKNOWN_POOL_TYPE));
    }
    [temp$3, temp$4] = [temp$1, temp$2];
  }
  return [temp$3, temp$4];
}

export function three_step_route_(
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
  $p: TypeTag[] /* <X, Y, Z, A>*/
): void {
  let coin_a, coin_x, coin_y, coin_z, sender_addr;
  coin_x = Stdlib.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  coin_y = get_intermediate_output_($.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1]]);
  coin_z = get_intermediate_output_($.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2]]);
  coin_a = get_intermediate_output_($.copy(third_pool_type), third_is_x_to_y, coin_z, $c, [$p[2], $p[3]]);
  if (!Stdlib.Coin.value_(coin_a, $c, [$p[3]]).ge($.copy(a_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  sender_addr = Stdlib.Signer.address_of_(sender, $c);
  if (!Stdlib.Coin.is_account_registered_($.copy(sender_addr), $c, [$p[3]])) {
    Stdlib.Coin.register_(sender, $c, [$p[3]]);
  } else {
  }
  Stdlib.Coin.deposit_($.copy(sender_addr), coin_a, $c, [$p[3]]);
  return;
}

export function three_step_route_script_(
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
  $p: TypeTag[] /* <X, Y, Z, A>*/
): void {
  return three_step_route_(
    sender,
    $.copy(first_pool_type),
    first_is_x_to_y,
    $.copy(second_pool_type),
    second_is_x_to_y,
    $.copy(third_pool_type),
    third_is_x_to_y,
    $.copy(x_in),
    $.copy(a_min_out),
    $c,
    [$p[0], $p[1], $p[2], $p[3]]
  );
}

export function buildPayload_three_step_route_script(
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  third_pool_type: U8,
  third_is_x_to_y: boolean,
  x_in: U64,
  a_min_out: U64,
  $p: TypeTag[] /* <X, Y, Z, A>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f'),
    'router',
    'three_step_route_script',
    typeParamStrings,
    [
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      third_pool_type,
      third_is_x_to_y,
      x_in,
      a_min_out
    ],
    isJSON
  );
}

export function two_step_route_(
  sender: HexString,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Z>*/
): U64 {
  let coin_x, coin_y, coin_z, coin_z_amt, sender_addr;
  coin_x = Stdlib.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  coin_y = get_intermediate_output_($.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1]]);
  coin_z = get_intermediate_output_($.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2]]);
  coin_z_amt = Stdlib.Coin.value_(coin_z, $c, [$p[2]]);
  if (!$.copy(coin_z_amt).ge($.copy(z_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  sender_addr = Stdlib.Signer.address_of_(sender, $c);
  if (!Stdlib.Coin.is_account_registered_($.copy(sender_addr), $c, [$p[2]])) {
    Stdlib.Coin.register_(sender, $c, [$p[2]]);
  } else {
  }
  Stdlib.Coin.deposit_($.copy(sender_addr), coin_z, $c, [$p[2]]);
  return $.copy(coin_z_amt);
}

export function two_step_route_script_(
  sender: HexString,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Z>*/
): void {
  two_step_route_(
    sender,
    $.copy(first_pool_type),
    first_is_x_to_y,
    $.copy(second_pool_type),
    second_is_x_to_y,
    $.copy(x_in),
    $.copy(z_min_out),
    $c,
    [$p[0], $p[1], $p[2]]
  );
  return;
}

export function buildPayload_two_step_route_script(
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $p: TypeTag[] /* <X, Y, Z>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x46e159be621e7493284112c551733e6378f931fd2fc851975bc36bedaae4de0f'),
    'router',
    'two_step_route_script',
    typeParamStrings,
    [first_pool_type, first_is_x_to_y, second_pool_type, second_is_x_to_y, x_in, z_min_out],
    isJSON
  );
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
  payload_three_step_route_script(
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    second_pool_type: U8,
    second_is_x_to_y: boolean,
    third_pool_type: U8,
    third_is_x_to_y: boolean,
    x_in: U64,
    a_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z, A>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_three_step_route_script(
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      third_pool_type,
      third_is_x_to_y,
      x_in,
      a_min_out,
      $p,
      isJSON
    );
  }
  async three_step_route_script(
    _account: AptosAccount,
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    second_pool_type: U8,
    second_is_x_to_y: boolean,
    third_pool_type: U8,
    third_is_x_to_y: boolean,
    x_in: U64,
    a_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z, A>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_three_step_route_script(
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      third_pool_type,
      third_is_x_to_y,
      x_in,
      a_min_out,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_two_step_route_script(
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    second_pool_type: U8,
    second_is_x_to_y: boolean,
    x_in: U64,
    z_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_two_step_route_script(
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      x_in,
      z_min_out,
      $p,
      isJSON
    );
  }
  async two_step_route_script(
    _account: AptosAccount,
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    second_pool_type: U8,
    second_is_x_to_y: boolean,
    x_in: U64,
    z_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_two_step_route_script(
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      x_in,
      z_min_out,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
