import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Basiq from '../basiq';
import * as Econia from '../econia';
import * as Hippo_swap from '../hippo_swap';
import * as Pontem from '../pontem';
import * as Stdlib from '../stdlib';
export const packageName = 'HippoAggregator';
export const moduleAddress = new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33');
export const moduleName = 'aggregator';

export const DEX_BASIQ: U8 = u8('4');
export const DEX_ECONIA: U8 = u8('2');
export const DEX_HIPPO: U8 = u8('1');
export const DEX_PONTEM: U8 = u8('3');
export const E_NOT_ADMIN: U64 = u64('4');
export const E_OUTPUT_LESS_THAN_MINIMUM: U64 = u64('2');
export const E_UNKNOWN_DEX: U64 = u64('3');
export const E_UNKNOWN_POOL_TYPE: U64 = u64('1');
export const HIPPO_CONSTANT_PRODUCT: U64 = u64('1');
export const HIPPO_PIECEWISE: U64 = u64('3');
export const HIPPO_STABLE_CURVE: U64 = u64('2');
export const HI_64: U64 = u64('18446744073709551615');

export class EventStore {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'EventStore';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: 'swap_step_events',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
          'aggregator',
          'SwapStepEvent',
          []
        )
      ])
    }
  ];

  swap_step_events: Stdlib.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.swap_step_events = proto['swap_step_events'] as Stdlib.Event.EventHandle;
  }

  static EventStoreParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): EventStore {
    const proto = $.parseStructProto(data, typeTag, repo, EventStore);
    return new EventStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, EventStore, typeParams);
    return result as unknown as EventStore;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, EventStore, typeParams);
    await result.loadFullState(app);
    return result as unknown as EventStore;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'EventStore', []);
  }
  async loadFullState(app: $.AppType) {
    await this.swap_step_events.loadFullState(app);
    this.__app = app;
  }
}

export class SwapStepEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'SwapStepEvent';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'dex_type', typeTag: AtomicTypeTag.U8 },
    { name: 'pool_type', typeTag: AtomicTypeTag.U64 },
    { name: 'x_type_info', typeTag: new StructTag(new HexString('0x1'), 'type_info', 'TypeInfo', []) },
    { name: 'y_type_info', typeTag: new StructTag(new HexString('0x1'), 'type_info', 'TypeInfo', []) },
    { name: 'input_amount', typeTag: AtomicTypeTag.U64 },
    { name: 'output_amount', typeTag: AtomicTypeTag.U64 },
    { name: 'time_stamp', typeTag: AtomicTypeTag.U64 }
  ];

  dex_type: U8;
  pool_type: U64;
  x_type_info: Stdlib.Type_info.TypeInfo;
  y_type_info: Stdlib.Type_info.TypeInfo;
  input_amount: U64;
  output_amount: U64;
  time_stamp: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dex_type = proto['dex_type'] as U8;
    this.pool_type = proto['pool_type'] as U64;
    this.x_type_info = proto['x_type_info'] as Stdlib.Type_info.TypeInfo;
    this.y_type_info = proto['y_type_info'] as Stdlib.Type_info.TypeInfo;
    this.input_amount = proto['input_amount'] as U64;
    this.output_amount = proto['output_amount'] as U64;
    this.time_stamp = proto['time_stamp'] as U64;
  }

  static SwapStepEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): SwapStepEvent {
    const proto = $.parseStructProto(data, typeTag, repo, SwapStepEvent);
    return new SwapStepEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'SwapStepEvent', []);
  }
  async loadFullState(app: $.AppType) {
    await this.x_type_info.loadFullState(app);
    await this.y_type_info.loadFullState(app);
    this.__app = app;
  }
}
export function check_and_deposit_(
  sender: HexString,
  coin: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X>*/
): void {
  let sender_addr;
  sender_addr = Stdlib.Signer.address_of_(sender, $c);
  if (!Stdlib.Coin.is_account_registered_($.copy(sender_addr), $c, [$p[0]])) {
    Stdlib.Coin.register_(sender, $c, [$p[0]]);
  } else {
  }
  Stdlib.Coin.deposit_($.copy(sender_addr), coin, $c, [$p[0]]);
  return;
}

export function check_and_deposit_opt_(
  sender: HexString,
  coin_opt: Stdlib.Option.Option,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X>*/
): void {
  let coin, sender_addr;
  if (Stdlib.Option.is_some_(coin_opt, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])])) {
    coin = Stdlib.Option.extract_(coin_opt, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]);
    sender_addr = Stdlib.Signer.address_of_(sender, $c);
    if (!Stdlib.Coin.is_account_registered_($.copy(sender_addr), $c, [$p[0]])) {
      Stdlib.Coin.register_(sender, $c, [$p[0]]);
    } else {
    }
    Stdlib.Coin.deposit_($.copy(sender_addr), coin, $c, [$p[0]]);
  } else {
  }
  return Stdlib.Option.destroy_none_(coin_opt, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]);
}

export function emit_swap_step_event_(
  dex_type: U8,
  pool_type: U64,
  input_amount: U64,
  output_amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <Input, Output>*/
): void {
  let event_store;
  event_store = $c.borrow_global_mut<EventStore>(
    new SimpleStructTag(EventStore),
    new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33')
  );
  Stdlib.Event.emit_event_(
    event_store.swap_step_events,
    new SwapStepEvent(
      {
        dex_type: $.copy(dex_type),
        pool_type: $.copy(pool_type),
        x_type_info: Stdlib.Type_info.type_of_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
        y_type_info: Stdlib.Type_info.type_of_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[1]])]),
        input_amount: $.copy(input_amount),
        output_amount: $.copy(output_amount),
        time_stamp: Stdlib.Timestamp.now_microseconds_($c)
      },
      new SimpleStructTag(SwapStepEvent)
    ),
    $c,
    [new SimpleStructTag(SwapStepEvent)]
  );
  return;
}

export function get_intermediate_output_(
  dex_type: U8,
  pool_type: U64,
  is_x_to_y: boolean,
  x_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, E>*/
): [Stdlib.Option.Option, Stdlib.Coin.Coin] {
  let temp$10,
    temp$13,
    temp$14,
    temp$15,
    temp$16,
    temp$17,
    temp$18,
    temp$19,
    temp$20,
    temp$22,
    temp$23,
    temp$24,
    temp$25,
    temp$26,
    temp$27,
    temp$28,
    temp$29,
    temp$3,
    temp$30,
    temp$31,
    temp$33,
    temp$4,
    temp$9,
    coin_in_value,
    coin_in_value__34,
    market_id,
    x_out,
    x_out__2,
    x_out_opt,
    x_value,
    y_out,
    y_out__1,
    y_out__11,
    y_out__12,
    y_out__21,
    y_out__32,
    y_out__5,
    y_out__7,
    zero,
    zero__6,
    zero2,
    zero2__8;
  coin_in_value = Stdlib.Coin.value_(x_in, $c, [$p[0]]);
  if ($.copy(dex_type).eq($.copy(DEX_HIPPO))) {
    if ($.copy(pool_type).eq($.copy(HIPPO_CONSTANT_PRODUCT))) {
      if (is_x_to_y) {
        [x_out, y_out] = Hippo_swap.Cp_swap.swap_x_to_exact_y_direct_(x_in, $c, [$p[0], $p[1]]);
        Stdlib.Coin.destroy_zero_(x_out, $c, [$p[0]]);
        [temp$3, temp$4] = [
          Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
          y_out
        ];
      } else {
        [y_out__1, x_out__2] = Hippo_swap.Cp_swap.swap_y_to_exact_x_direct_(x_in, $c, [$p[1], $p[0]]);
        Stdlib.Coin.destroy_zero_(x_out__2, $c, [$p[0]]);
        [temp$3, temp$4] = [
          Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
          y_out__1
        ];
      }
      [temp$19, temp$20] = [temp$3, temp$4];
    } else {
      if ($.copy(pool_type).eq($.copy(HIPPO_STABLE_CURVE))) {
        if (is_x_to_y) {
          [zero, zero2, y_out__5] = Hippo_swap.Stable_curve_swap.swap_x_to_exact_y_direct_(x_in, $c, [$p[0], $p[1]]);
          Stdlib.Coin.destroy_zero_(zero, $c, [$p[0]]);
          Stdlib.Coin.destroy_zero_(zero2, $c, [$p[0]]);
          [temp$9, temp$10] = [
            Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
            y_out__5
          ];
        } else {
          [zero__6, y_out__7, zero2__8] = Hippo_swap.Stable_curve_swap.swap_y_to_exact_x_direct_(x_in, $c, [
            $p[1],
            $p[0]
          ]);
          Stdlib.Coin.destroy_zero_(zero__6, $c, [$p[0]]);
          Stdlib.Coin.destroy_zero_(zero2__8, $c, [$p[0]]);
          [temp$9, temp$10] = [
            Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
            y_out__7
          ];
        }
        [temp$17, temp$18] = [temp$9, temp$10];
      } else {
        if ($.copy(pool_type).eq($.copy(HIPPO_PIECEWISE))) {
          if (is_x_to_y) {
            y_out__11 = Hippo_swap.Piece_swap.swap_x_to_y_direct_(x_in, $c, [$p[0], $p[1]]);
            [temp$13, temp$14] = [
              Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
              y_out__11
            ];
          } else {
            y_out__12 = Hippo_swap.Piece_swap.swap_y_to_x_direct_(x_in, $c, [$p[1], $p[0]]);
            [temp$13, temp$14] = [
              Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
              y_out__12
            ];
          }
          [temp$15, temp$16] = [temp$13, temp$14];
        } else {
          throw $.abortCode($.copy(E_UNKNOWN_POOL_TYPE));
        }
        [temp$17, temp$18] = [temp$15, temp$16];
      }
      [temp$19, temp$20] = [temp$17, temp$18];
    }
    [temp$30, temp$31] = [temp$19, temp$20];
  } else {
    if ($.copy(dex_type).eq($.copy(DEX_ECONIA))) {
      y_out__21 = Stdlib.Coin.zero_($c, [$p[1]]);
      x_value = Stdlib.Coin.value_(x_in, $c, [$p[0]]);
      market_id = $.copy(pool_type);
      if (is_x_to_y) {
        Econia.Market.swap_coins_(
          new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
          $.copy(market_id),
          false,
          u64('0'),
          $.copy(x_value),
          u64('0'),
          $.copy(HI_64),
          u64('0'),
          x_in,
          y_out__21,
          $c,
          [$p[0], $p[1]]
        );
      } else {
        Econia.Market.swap_coins_(
          new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
          $.copy(market_id),
          true,
          u64('0'),
          $.copy(HI_64),
          u64('0'),
          $.copy(x_value),
          $.copy(HI_64),
          y_out__21,
          x_in,
          $c,
          [$p[1], $p[0]]
        );
      }
      if (Stdlib.Coin.value_(x_in, $c, [$p[0]]).eq(u64('0'))) {
        Stdlib.Coin.destroy_zero_(x_in, $c, [$p[0]]);
        [temp$22, temp$23] = [
          Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
          y_out__21
        ];
      } else {
        [temp$22, temp$23] = [
          Stdlib.Option.some_(x_in, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
          y_out__21
        ];
      }
      [temp$28, temp$29] = [temp$22, temp$23];
    } else {
      if ($.copy(dex_type).eq($.copy(DEX_PONTEM))) {
        [temp$26, temp$27] = [
          Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
          Pontem.Router.swap_exact_coin_for_coin_(
            new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
            x_in,
            u64('0'),
            $c,
            [$p[0], $p[1], $p[2]]
          )
        ];
      } else {
        if ($.copy(dex_type).eq($.copy(DEX_BASIQ))) {
          [temp$24, temp$25] = [
            Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
            Basiq.Dex.swap_(x_in, $c, [$p[0], $p[1]])
          ];
        } else {
          throw $.abortCode($.copy(E_UNKNOWN_DEX));
        }
        [temp$26, temp$27] = [temp$24, temp$25];
      }
      [temp$28, temp$29] = [temp$26, temp$27];
    }
    [temp$30, temp$31] = [temp$28, temp$29];
  }
  [x_out_opt, y_out__32] = [temp$30, temp$31];
  if (Stdlib.Option.is_some_(x_out_opt, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])])) {
    temp$33 = $.copy(coin_in_value).sub(
      Stdlib.Coin.value_(
        Stdlib.Option.borrow_(x_out_opt, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
        $c,
        [$p[0]]
      )
    );
  } else {
    temp$33 = $.copy(coin_in_value);
  }
  coin_in_value__34 = temp$33;
  emit_swap_step_event_(
    $.copy(dex_type),
    $.copy(pool_type),
    $.copy(coin_in_value__34),
    Stdlib.Coin.value_(y_out__32, $c, [$p[1]]),
    $c,
    [$p[0], $p[1]]
  );
  return [x_out_opt, y_out__32];
}

export function init_module_(admin: HexString, $c: AptosDataCache): void {
  let admin_addr;
  admin_addr = Stdlib.Signer.address_of_(admin, $c);
  if (
    !(
      $.copy(admin_addr).hex() ===
      new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33').hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_ADMIN));
  }
  $c.move_to(
    new SimpleStructTag(EventStore),
    admin,
    new EventStore(
      { swap_step_events: Stdlib.Account.new_event_handle_(admin, $c, [new SimpleStructTag(SwapStepEvent)]) },
      new SimpleStructTag(EventStore)
    )
  );
  return;
}

export function one_step_direct_(
  dex_type: U8,
  pool_type: U64,
  is_x_to_y: boolean,
  x_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, E>*/
): [Stdlib.Option.Option, Stdlib.Coin.Coin] {
  return get_intermediate_output_($.copy(dex_type), $.copy(pool_type), is_x_to_y, x_in, $c, [$p[0], $p[1], $p[2]]);
}

export function one_step_route_(
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  x_in: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, E>*/
): void {
  let coin_in, coin_out, coin_remain_opt;
  coin_in = Stdlib.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  [coin_remain_opt, coin_out] = one_step_direct_(
    $.copy(first_dex_type),
    $.copy(first_pool_type),
    first_is_x_to_y,
    coin_in,
    $c,
    [$p[0], $p[1], $p[2]]
  );
  if (!Stdlib.Coin.value_(coin_out, $c, [$p[1]]).ge($.copy(y_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  check_and_deposit_opt_(sender, coin_remain_opt, $c, [$p[0]]);
  check_and_deposit_(sender, coin_out, $c, [$p[1]]);
  return;
}

export function buildPayload_one_step_route(
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  x_in: U64,
  y_min_out: U64,
  $p: TypeTag[] /* <X, Y, E>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
    'aggregator',
    'one_step_route',
    typeParamStrings,
    [first_dex_type, first_pool_type, first_is_x_to_y, x_in, y_min_out],
    isJSON
  );
}

export function three_step_direct_(
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U64,
  second_is_x_to_y: boolean,
  third_dex_type: U8,
  third_pool_type: U64,
  third_is_x_to_y: boolean,
  x_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Z, M, E1, E2, E3>*/
): [Stdlib.Option.Option, Stdlib.Option.Option, Stdlib.Option.Option, Stdlib.Coin.Coin] {
  let coin_m, coin_x_remain, coin_y, coin_y_remain, coin_z, coin_z_remain;
  [coin_x_remain, coin_y] = get_intermediate_output_(
    $.copy(first_dex_type),
    $.copy(first_pool_type),
    first_is_x_to_y,
    x_in,
    $c,
    [$p[0], $p[1], $p[4]]
  );
  [coin_y_remain, coin_z] = get_intermediate_output_(
    $.copy(second_dex_type),
    $.copy(second_pool_type),
    second_is_x_to_y,
    coin_y,
    $c,
    [$p[1], $p[2], $p[5]]
  );
  [coin_z_remain, coin_m] = get_intermediate_output_(
    $.copy(third_dex_type),
    $.copy(third_pool_type),
    third_is_x_to_y,
    coin_z,
    $c,
    [$p[2], $p[3], $p[6]]
  );
  return [coin_x_remain, coin_y_remain, coin_z_remain, coin_m];
}

export function three_step_route_(
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U64,
  second_is_x_to_y: boolean,
  third_dex_type: U8,
  third_pool_type: U64,
  third_is_x_to_y: boolean,
  x_in: U64,
  m_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Z, M, E1, E2, E3>*/
): void {
  let coin_m, coin_x, coin_x_remain, coin_y_remain, coin_z_remain;
  coin_x = Stdlib.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  [coin_x_remain, coin_y_remain, coin_z_remain, coin_m] = three_step_direct_(
    $.copy(first_dex_type),
    $.copy(first_pool_type),
    first_is_x_to_y,
    $.copy(second_dex_type),
    $.copy(second_pool_type),
    second_is_x_to_y,
    $.copy(third_dex_type),
    $.copy(third_pool_type),
    third_is_x_to_y,
    coin_x,
    $c,
    [$p[0], $p[1], $p[2], $p[3], $p[4], $p[5], $p[6]]
  );
  if (!Stdlib.Coin.value_(coin_m, $c, [$p[3]]).ge($.copy(m_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  check_and_deposit_opt_(sender, coin_x_remain, $c, [$p[0]]);
  check_and_deposit_opt_(sender, coin_y_remain, $c, [$p[1]]);
  check_and_deposit_opt_(sender, coin_z_remain, $c, [$p[2]]);
  check_and_deposit_(sender, coin_m, $c, [$p[3]]);
  return;
}

export function buildPayload_three_step_route(
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U64,
  second_is_x_to_y: boolean,
  third_dex_type: U8,
  third_pool_type: U64,
  third_is_x_to_y: boolean,
  x_in: U64,
  m_min_out: U64,
  $p: TypeTag[] /* <X, Y, Z, M, E1, E2, E3>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
    'aggregator',
    'three_step_route',
    typeParamStrings,
    [
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      second_dex_type,
      second_pool_type,
      second_is_x_to_y,
      third_dex_type,
      third_pool_type,
      third_is_x_to_y,
      x_in,
      m_min_out
    ],
    isJSON
  );
}

export function two_step_direct_(
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U64,
  second_is_x_to_y: boolean,
  x_in: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Z, E1, E2>*/
): [Stdlib.Option.Option, Stdlib.Option.Option, Stdlib.Coin.Coin] {
  let coin_x_remain, coin_y, coin_y_remain, coin_z;
  [coin_x_remain, coin_y] = get_intermediate_output_(
    $.copy(first_dex_type),
    $.copy(first_pool_type),
    first_is_x_to_y,
    x_in,
    $c,
    [$p[0], $p[1], $p[3]]
  );
  [coin_y_remain, coin_z] = get_intermediate_output_(
    $.copy(second_dex_type),
    $.copy(second_pool_type),
    second_is_x_to_y,
    coin_y,
    $c,
    [$p[1], $p[2], $p[4]]
  );
  return [coin_x_remain, coin_y_remain, coin_z];
}

export function two_step_route_(
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U64,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Z, E1, E2>*/
): void {
  let coin_x, coin_x_remain, coin_y_remain, coin_z;
  coin_x = Stdlib.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  [coin_x_remain, coin_y_remain, coin_z] = two_step_direct_(
    $.copy(first_dex_type),
    $.copy(first_pool_type),
    first_is_x_to_y,
    $.copy(second_dex_type),
    $.copy(second_pool_type),
    second_is_x_to_y,
    coin_x,
    $c,
    [$p[0], $p[1], $p[2], $p[3], $p[4]]
  );
  if (!Stdlib.Coin.value_(coin_z, $c, [$p[2]]).ge($.copy(z_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  check_and_deposit_opt_(sender, coin_x_remain, $c, [$p[0]]);
  check_and_deposit_opt_(sender, coin_y_remain, $c, [$p[1]]);
  check_and_deposit_(sender, coin_z, $c, [$p[2]]);
  return;
}

export function buildPayload_two_step_route(
  first_dex_type: U8,
  first_pool_type: U64,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U64,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $p: TypeTag[] /* <X, Y, Z, E1, E2>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
    'aggregator',
    'two_step_route',
    typeParamStrings,
    [
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      second_dex_type,
      second_pool_type,
      second_is_x_to_y,
      x_in,
      z_min_out
    ],
    isJSON
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33::aggregator::EventStore',
    EventStore.EventStoreParser
  );
  repo.addParser(
    '0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33::aggregator::SwapStepEvent',
    SwapStepEvent.SwapStepEventParser
  );
}
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
  get EventStore() {
    return EventStore;
  }
  async loadEventStore(owner: HexString, loadFull = true) {
    const val = await EventStore.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get SwapStepEvent() {
    return SwapStepEvent;
  }
  payload_one_step_route(
    first_dex_type: U8,
    first_pool_type: U64,
    first_is_x_to_y: boolean,
    x_in: U64,
    y_min_out: U64,
    $p: TypeTag[] /* <X, Y, E>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_one_step_route(first_dex_type, first_pool_type, first_is_x_to_y, x_in, y_min_out, $p, isJSON);
  }
  async one_step_route(
    _account: AptosAccount,
    first_dex_type: U8,
    first_pool_type: U64,
    first_is_x_to_y: boolean,
    x_in: U64,
    y_min_out: U64,
    $p: TypeTag[] /* <X, Y, E>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_one_step_route(
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      x_in,
      y_min_out,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_three_step_route(
    first_dex_type: U8,
    first_pool_type: U64,
    first_is_x_to_y: boolean,
    second_dex_type: U8,
    second_pool_type: U64,
    second_is_x_to_y: boolean,
    third_dex_type: U8,
    third_pool_type: U64,
    third_is_x_to_y: boolean,
    x_in: U64,
    m_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z, M, E1, E2, E3>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_three_step_route(
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      second_dex_type,
      second_pool_type,
      second_is_x_to_y,
      third_dex_type,
      third_pool_type,
      third_is_x_to_y,
      x_in,
      m_min_out,
      $p,
      isJSON
    );
  }
  async three_step_route(
    _account: AptosAccount,
    first_dex_type: U8,
    first_pool_type: U64,
    first_is_x_to_y: boolean,
    second_dex_type: U8,
    second_pool_type: U64,
    second_is_x_to_y: boolean,
    third_dex_type: U8,
    third_pool_type: U64,
    third_is_x_to_y: boolean,
    x_in: U64,
    m_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z, M, E1, E2, E3>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_three_step_route(
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      second_dex_type,
      second_pool_type,
      second_is_x_to_y,
      third_dex_type,
      third_pool_type,
      third_is_x_to_y,
      x_in,
      m_min_out,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_two_step_route(
    first_dex_type: U8,
    first_pool_type: U64,
    first_is_x_to_y: boolean,
    second_dex_type: U8,
    second_pool_type: U64,
    second_is_x_to_y: boolean,
    x_in: U64,
    z_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z, E1, E2>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_two_step_route(
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      second_dex_type,
      second_pool_type,
      second_is_x_to_y,
      x_in,
      z_min_out,
      $p,
      isJSON
    );
  }
  async two_step_route(
    _account: AptosAccount,
    first_dex_type: U8,
    first_pool_type: U64,
    first_is_x_to_y: boolean,
    second_dex_type: U8,
    second_pool_type: U64,
    second_is_x_to_y: boolean,
    x_in: U64,
    z_min_out: U64,
    $p: TypeTag[] /* <X, Y, Z, E1, E2>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_two_step_route(
      first_dex_type,
      first_pool_type,
      first_is_x_to_y,
      second_dex_type,
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
