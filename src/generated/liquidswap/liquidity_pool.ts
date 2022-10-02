import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as U256 from '../u256';
import * as Uq64x64 from '../uq64x64';
import * as Coin_helper from './coin_helper';
import * as Curves from './curves';
import * as Dao_storage from './dao_storage';
import * as Emergency from './emergency';
import * as Lp_account from './lp_account';
import * as Math from './math';
import * as Stable_curve from './stable_curve';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'liquidity_pool';

export const ERR_EMPTY_COIN_IN: U64 = u64('104');
export const ERR_INCORRECT_BURN_VALUES: U64 = u64('106');
export const ERR_INCORRECT_SWAP: U64 = u64('105');
export const ERR_INVALID_CURVE: U64 = u64('108');
export const ERR_NOT_ENOUGH_INITIAL_LIQUIDITY: U64 = u64('102');
export const ERR_NOT_ENOUGH_LIQUIDITY: U64 = u64('103');
export const ERR_NOT_ENOUGH_PERMISSIONS_TO_INITIALIZE: U64 = u64('109');
export const ERR_POOL_DOES_NOT_EXIST: U64 = u64('107');
export const ERR_POOL_EXISTS_FOR_PAIR: U64 = u64('101');
export const ERR_WRONG_PAIR_ORDERING: U64 = u64('100');
export const FEE_MULTIPLIER: U64 = u64('30');
export const FEE_SCALE: U64 = u64('10000');
export const MINIMAL_LIQUIDITY: U64 = u64('1000');

export class EventsStore {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'EventsStore';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    {
      name: 'pool_created_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'liquidity_pool',
          'PoolCreatedEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'liquidity_added_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'liquidity_pool',
          'LiquidityAddedEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'liquidity_removed_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'liquidity_pool',
          'LiquidityRemovedEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'swap_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'liquidity_pool',
          'SwapEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'oracle_updated_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'liquidity_pool',
          'OracleUpdatedEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    }
  ];

  pool_created_handle: Stdlib.Event.EventHandle;
  liquidity_added_handle: Stdlib.Event.EventHandle;
  liquidity_removed_handle: Stdlib.Event.EventHandle;
  swap_handle: Stdlib.Event.EventHandle;
  oracle_updated_handle: Stdlib.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_created_handle = proto['pool_created_handle'] as Stdlib.Event.EventHandle;
    this.liquidity_added_handle = proto['liquidity_added_handle'] as Stdlib.Event.EventHandle;
    this.liquidity_removed_handle = proto['liquidity_removed_handle'] as Stdlib.Event.EventHandle;
    this.swap_handle = proto['swap_handle'] as Stdlib.Event.EventHandle;
    this.oracle_updated_handle = proto['oracle_updated_handle'] as Stdlib.Event.EventHandle;
  }

  static EventsStoreParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): EventsStore {
    const proto = $.parseStructProto(data, typeTag, repo, EventsStore);
    return new EventsStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, EventsStore, typeParams);
    return result as unknown as EventsStore;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, EventsStore, typeParams);
    await result.loadFullState(app);
    return result as unknown as EventsStore;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'EventsStore', $p);
  }
  async loadFullState(app: $.AppType) {
    await this.pool_created_handle.loadFullState(app);
    await this.liquidity_added_handle.loadFullState(app);
    await this.liquidity_removed_handle.loadFullState(app);
    await this.swap_handle.loadFullState(app);
    await this.oracle_updated_handle.loadFullState(app);
    this.__app = app;
  }
}

export class LiquidityAddedEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'LiquidityAddedEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'added_x_val', typeTag: AtomicTypeTag.U64 },
    { name: 'added_y_val', typeTag: AtomicTypeTag.U64 },
    { name: 'lp_tokens_received', typeTag: AtomicTypeTag.U64 }
  ];

  added_x_val: U64;
  added_y_val: U64;
  lp_tokens_received: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.added_x_val = proto['added_x_val'] as U64;
    this.added_y_val = proto['added_y_val'] as U64;
    this.lp_tokens_received = proto['lp_tokens_received'] as U64;
  }

  static LiquidityAddedEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): LiquidityAddedEvent {
    const proto = $.parseStructProto(data, typeTag, repo, LiquidityAddedEvent);
    return new LiquidityAddedEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'LiquidityAddedEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class LiquidityPool {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'LiquidityPool';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'coin_x_reserve', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(0)]) },
    { name: 'coin_y_reserve', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(1)]) },
    { name: 'last_block_timestamp', typeTag: AtomicTypeTag.U64 },
    { name: 'last_price_x_cumulative', typeTag: AtomicTypeTag.U128 },
    { name: 'last_price_y_cumulative', typeTag: AtomicTypeTag.U128 },
    {
      name: 'lp_mint_cap',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'MintCapability', [
        new StructTag(
          new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
          'lp_coin',
          'LP',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'lp_burn_cap',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'BurnCapability', [
        new StructTag(
          new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
          'lp_coin',
          'LP',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    { name: 'x_scale', typeTag: AtomicTypeTag.U64 },
    { name: 'y_scale', typeTag: AtomicTypeTag.U64 }
  ];

  coin_x_reserve: Stdlib.Coin.Coin;
  coin_y_reserve: Stdlib.Coin.Coin;
  last_block_timestamp: U64;
  last_price_x_cumulative: U128;
  last_price_y_cumulative: U128;
  lp_mint_cap: Stdlib.Coin.MintCapability;
  lp_burn_cap: Stdlib.Coin.BurnCapability;
  x_scale: U64;
  y_scale: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_x_reserve = proto['coin_x_reserve'] as Stdlib.Coin.Coin;
    this.coin_y_reserve = proto['coin_y_reserve'] as Stdlib.Coin.Coin;
    this.last_block_timestamp = proto['last_block_timestamp'] as U64;
    this.last_price_x_cumulative = proto['last_price_x_cumulative'] as U128;
    this.last_price_y_cumulative = proto['last_price_y_cumulative'] as U128;
    this.lp_mint_cap = proto['lp_mint_cap'] as Stdlib.Coin.MintCapability;
    this.lp_burn_cap = proto['lp_burn_cap'] as Stdlib.Coin.BurnCapability;
    this.x_scale = proto['x_scale'] as U64;
    this.y_scale = proto['y_scale'] as U64;
  }

  static LiquidityPoolParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): LiquidityPool {
    const proto = $.parseStructProto(data, typeTag, repo, LiquidityPool);
    return new LiquidityPool(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LiquidityPool, typeParams);
    return result as unknown as LiquidityPool;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, LiquidityPool, typeParams);
    await result.loadFullState(app);
    return result as unknown as LiquidityPool;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'LiquidityPool', $p);
  }
  async loadFullState(app: $.AppType) {
    await this.coin_x_reserve.loadFullState(app);
    await this.coin_y_reserve.loadFullState(app);
    await this.lp_mint_cap.loadFullState(app);
    await this.lp_burn_cap.loadFullState(app);
    this.__app = app;
  }
}

export class LiquidityRemovedEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'LiquidityRemovedEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'returned_x_val', typeTag: AtomicTypeTag.U64 },
    { name: 'returned_y_val', typeTag: AtomicTypeTag.U64 },
    { name: 'lp_tokens_burned', typeTag: AtomicTypeTag.U64 }
  ];

  returned_x_val: U64;
  returned_y_val: U64;
  lp_tokens_burned: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.returned_x_val = proto['returned_x_val'] as U64;
    this.returned_y_val = proto['returned_y_val'] as U64;
    this.lp_tokens_burned = proto['lp_tokens_burned'] as U64;
  }

  static LiquidityRemovedEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): LiquidityRemovedEvent {
    const proto = $.parseStructProto(data, typeTag, repo, LiquidityRemovedEvent);
    return new LiquidityRemovedEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'LiquidityRemovedEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class OracleUpdatedEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'OracleUpdatedEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'last_price_x_cumulative', typeTag: AtomicTypeTag.U128 },
    { name: 'last_price_y_cumulative', typeTag: AtomicTypeTag.U128 }
  ];

  last_price_x_cumulative: U128;
  last_price_y_cumulative: U128;

  constructor(proto: any, public typeTag: TypeTag) {
    this.last_price_x_cumulative = proto['last_price_x_cumulative'] as U128;
    this.last_price_y_cumulative = proto['last_price_y_cumulative'] as U128;
  }

  static OracleUpdatedEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): OracleUpdatedEvent {
    const proto = $.parseStructProto(data, typeTag, repo, OracleUpdatedEvent);
    return new OracleUpdatedEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'OracleUpdatedEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class PoolAccountCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolAccountCapability';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'signer_cap', typeTag: new StructTag(new HexString('0x1'), 'account', 'SignerCapability', []) }
  ];

  signer_cap: Stdlib.Account.SignerCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.signer_cap = proto['signer_cap'] as Stdlib.Account.SignerCapability;
  }

  static PoolAccountCapabilityParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolAccountCapability {
    const proto = $.parseStructProto(data, typeTag, repo, PoolAccountCapability);
    return new PoolAccountCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PoolAccountCapability, typeParams);
    return result as unknown as PoolAccountCapability;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, PoolAccountCapability, typeParams);
    await result.loadFullState(app);
    return result as unknown as PoolAccountCapability;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolAccountCapability', []);
  }
  async loadFullState(app: $.AppType) {
    await this.signer_cap.loadFullState(app);
    this.__app = app;
  }
}

export class PoolCreatedEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolCreatedEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [{ name: 'creator', typeTag: AtomicTypeTag.Address }];

  creator: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.creator = proto['creator'] as HexString;
  }

  static PoolCreatedEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolCreatedEvent {
    const proto = $.parseStructProto(data, typeTag, repo, PoolCreatedEvent);
    return new PoolCreatedEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolCreatedEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class SwapEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'SwapEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'x_in', typeTag: AtomicTypeTag.U64 },
    { name: 'x_out', typeTag: AtomicTypeTag.U64 },
    { name: 'y_in', typeTag: AtomicTypeTag.U64 },
    { name: 'y_out', typeTag: AtomicTypeTag.U64 }
  ];

  x_in: U64;
  x_out: U64;
  y_in: U64;
  y_out: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.x_in = proto['x_in'] as U64;
    this.x_out = proto['x_out'] as U64;
    this.y_in = proto['y_in'] as U64;
    this.y_out = proto['y_out'] as U64;
  }

  static SwapEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): SwapEvent {
    const proto = $.parseStructProto(data, typeTag, repo, SwapEvent);
    return new SwapEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'SwapEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function assert_lp_value_is_increased_(
  x_scale: U64,
  y_scale: U64,
  x_res: U128,
  y_res: U128,
  x_res_with_fees: U128,
  y_res_with_fees: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <Curve>*/
): void {
  let cmp,
    cmp__3,
    lp_value_after_swap_and_fee,
    lp_value_after_swap_and_fee__2,
    lp_value_before_swap,
    lp_value_before_swap__1,
    lp_value_before_swap_u256;
  if (Curves.is_stable_($c, [$p[0]])) {
    lp_value_before_swap = Stable_curve.lp_value_($.copy(x_res), $.copy(x_scale), $.copy(y_res), $.copy(y_scale), $c);
    lp_value_after_swap_and_fee = Stable_curve.lp_value_(
      $.copy(x_res_with_fees),
      $.copy(x_scale),
      $.copy(y_res_with_fees),
      $.copy(y_scale),
      $c
    );
    cmp = U256.U256.compare_(lp_value_after_swap_and_fee, lp_value_before_swap, $c);
    if (!$.copy(cmp).eq(u8('2'))) {
      throw $.abortCode($.copy(ERR_INCORRECT_SWAP));
    }
  } else {
    if (Curves.is_uncorrelated_($c, [$p[0]])) {
      lp_value_before_swap__1 = $.copy(x_res).mul($.copy(y_res));
      lp_value_before_swap_u256 = U256.U256.mul_(
        U256.U256.from_u128_($.copy(lp_value_before_swap__1), $c),
        U256.U256.from_u64_($.copy(FEE_SCALE).mul($.copy(FEE_SCALE)), $c),
        $c
      );
      lp_value_after_swap_and_fee__2 = U256.U256.mul_(
        U256.U256.from_u128_($.copy(x_res_with_fees), $c),
        U256.U256.from_u128_($.copy(y_res_with_fees), $c),
        $c
      );
      cmp__3 = U256.U256.compare_(lp_value_after_swap_and_fee__2, lp_value_before_swap_u256, $c);
      if (!$.copy(cmp__3).eq(u8('2'))) {
        throw $.abortCode($.copy(ERR_INCORRECT_SWAP));
      }
    } else {
      throw $.abortCode($.copy(ERR_INVALID_CURVE));
    }
  }
  return;
}

export function burn_(
  lp_coins: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  let temp$1,
    burned_lp_coins_val,
    events_store,
    lp_coins_total,
    pool,
    x_coin_to_return,
    x_reserve_val,
    x_to_return_val,
    y_coin_to_return,
    y_reserve_val,
    y_to_return_val;
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  burned_lp_coins_val = Stdlib.Coin.value_(lp_coins, $c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  pool = $c.borrow_global_mut<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  lp_coins_total = Coin_helper.supply_($c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  x_reserve_val = Stdlib.Coin.value_(pool.coin_x_reserve, $c, [$p[0]]);
  y_reserve_val = Stdlib.Coin.value_(pool.coin_y_reserve, $c, [$p[1]]);
  x_to_return_val = Math.mul_div_u128_(
    u128($.copy(burned_lp_coins_val)),
    u128($.copy(x_reserve_val)),
    $.copy(lp_coins_total),
    $c
  );
  y_to_return_val = Math.mul_div_u128_(
    u128($.copy(burned_lp_coins_val)),
    u128($.copy(y_reserve_val)),
    $.copy(lp_coins_total),
    $c
  );
  if ($.copy(x_to_return_val).gt(u64('0'))) {
    temp$1 = $.copy(y_to_return_val).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERR_INCORRECT_BURN_VALUES));
  }
  x_coin_to_return = Stdlib.Coin.extract_(pool.coin_x_reserve, $.copy(x_to_return_val), $c, [$p[0]]);
  y_coin_to_return = Stdlib.Coin.extract_(pool.coin_y_reserve, $.copy(y_to_return_val), $c, [$p[1]]);
  update_oracle_(pool, $.copy(x_reserve_val), $.copy(y_reserve_val), $c, [$p[0], $p[1], $p[2]]);
  Stdlib.Coin.burn_(lp_coins, pool.lp_burn_cap, $c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  events_store = $c.borrow_global_mut<EventsStore>(
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  Stdlib.Event.emit_event_(
    events_store.liquidity_removed_handle,
    new LiquidityRemovedEvent(
      {
        returned_x_val: $.copy(x_to_return_val),
        returned_y_val: $.copy(y_to_return_val),
        lp_tokens_burned: $.copy(burned_lp_coins_val)
      },
      new SimpleStructTag(LiquidityRemovedEvent, [$p[0], $p[1], $p[2]])
    ),
    $c,
    [new SimpleStructTag(LiquidityRemovedEvent, [$p[0], $p[1], $p[2]])]
  );
  return [x_coin_to_return, y_coin_to_return];
}

export function get_cumulative_prices_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U128, U128, U64] {
  let last_block_timestamp, last_price_x_cumulative, last_price_y_cumulative, liquidity_pool;
  Emergency.assert_no_emergency_($c);
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  liquidity_pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  last_price_x_cumulative = $.copy(liquidity_pool.last_price_x_cumulative);
  last_price_y_cumulative = $.copy(liquidity_pool.last_price_y_cumulative);
  last_block_timestamp = $.copy(liquidity_pool.last_block_timestamp);
  return [$.copy(last_price_x_cumulative), $.copy(last_price_y_cumulative), $.copy(last_block_timestamp)];
}

export function get_decimals_scales_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let pool;
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  return [$.copy(pool.x_scale), $.copy(pool.y_scale)];
}

export function get_fees_config_($c: AptosDataCache): [U64, U64] {
  return [$.copy(FEE_MULTIPLIER), $.copy(FEE_SCALE)];
}

export function get_reserves_size_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let liquidity_pool, x_reserve, y_reserve;
  Emergency.assert_no_emergency_($c);
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  liquidity_pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  x_reserve = Stdlib.Coin.value_(liquidity_pool.coin_x_reserve, $c, [$p[0]]);
  y_reserve = Stdlib.Coin.value_(liquidity_pool.coin_y_reserve, $c, [$p[1]]);
  return [$.copy(x_reserve), $.copy(y_reserve)];
}

export function initialize_(liquidswap_admin: HexString, $c: AptosDataCache): void {
  let signer_cap;
  if (
    !(
      Stdlib.Signer.address_of_(liquidswap_admin, $c).hex() ===
      new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NOT_ENOUGH_PERMISSIONS_TO_INITIALIZE));
  }
  signer_cap = Lp_account.retrieve_signer_cap_(liquidswap_admin, $c);
  $c.move_to(
    new SimpleStructTag(PoolAccountCapability),
    liquidswap_admin,
    new PoolAccountCapability({ signer_cap: signer_cap }, new SimpleStructTag(PoolAccountCapability))
  );
  return;
}

export function buildPayload_initialize(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'liquidity_pool',
    'initialize',
    typeParamStrings,
    [],
    isJSON
  );
}
export function is_pool_exists_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): boolean {
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  return $c.exists(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
}

export function mint_(
  coin_x: Stdlib.Coin.Coin,
  coin_y: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): Stdlib.Coin.Coin {
  let temp$1,
    temp$2,
    events_store,
    initial_liq,
    lp_coins,
    lp_coins_total,
    pool,
    provided_liq,
    x_liq,
    x_provided_val,
    x_reserve_size,
    y_liq,
    y_provided_val,
    y_reserve_size;
  Emergency.assert_no_emergency_($c);
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  lp_coins_total = Coin_helper.supply_($c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  [x_reserve_size, y_reserve_size] = get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  x_provided_val = Stdlib.Coin.value_(coin_x, $c, [$p[0]]);
  y_provided_val = Stdlib.Coin.value_(coin_y, $c, [$p[1]]);
  if ($.copy(lp_coins_total).eq(u128('0'))) {
    initial_liq = Math.sqrt_(Math.mul_to_u128_($.copy(x_provided_val), $.copy(y_provided_val), $c), $c);
    if (!$.copy(initial_liq).gt($.copy(MINIMAL_LIQUIDITY))) {
      throw $.abortCode($.copy(ERR_NOT_ENOUGH_INITIAL_LIQUIDITY));
    }
    temp$2 = $.copy(initial_liq).sub($.copy(MINIMAL_LIQUIDITY));
  } else {
    x_liq = Math.mul_div_u128_(u128($.copy(x_provided_val)), $.copy(lp_coins_total), u128($.copy(x_reserve_size)), $c);
    y_liq = Math.mul_div_u128_(u128($.copy(y_provided_val)), $.copy(lp_coins_total), u128($.copy(y_reserve_size)), $c);
    if ($.copy(x_liq).lt($.copy(y_liq))) {
      temp$1 = $.copy(x_liq);
    } else {
      temp$1 = $.copy(y_liq);
    }
    temp$2 = temp$1;
  }
  provided_liq = temp$2;
  if (!$.copy(provided_liq).gt(u64('0'))) {
    throw $.abortCode($.copy(ERR_NOT_ENOUGH_LIQUIDITY));
  }
  pool = $c.borrow_global_mut<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  Stdlib.Coin.merge_(pool.coin_x_reserve, coin_x, $c, [$p[0]]);
  Stdlib.Coin.merge_(pool.coin_y_reserve, coin_y, $c, [$p[1]]);
  lp_coins = Stdlib.Coin.mint_($.copy(provided_liq), pool.lp_mint_cap, $c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  update_oracle_(pool, $.copy(x_reserve_size), $.copy(y_reserve_size), $c, [$p[0], $p[1], $p[2]]);
  events_store = $c.borrow_global_mut<EventsStore>(
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  Stdlib.Event.emit_event_(
    events_store.liquidity_added_handle,
    new LiquidityAddedEvent(
      {
        added_x_val: $.copy(x_provided_val),
        added_y_val: $.copy(y_provided_val),
        lp_tokens_received: $.copy(provided_liq)
      },
      new SimpleStructTag(LiquidityAddedEvent, [$p[0], $p[1], $p[2]])
    ),
    $c,
    [new SimpleStructTag(LiquidityAddedEvent, [$p[0], $p[1], $p[2]])]
  );
  return lp_coins;
}

export function new_reserves_after_fees_scaled_(
  x_reserve: U64,
  y_reserve: U64,
  x_in_val: U64,
  y_in_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <Curve>*/
): [U128, U128] {
  let temp$1, temp$2, temp$3, temp$4, x_res_new_after_fee, y_res_new_after_fee;
  if (Curves.is_uncorrelated_($c, [$p[0]])) {
    temp$2 = Math.mul_to_u128_($.copy(x_reserve), $.copy(FEE_SCALE), $c).sub(
      Math.mul_to_u128_($.copy(x_in_val), $.copy(FEE_MULTIPLIER), $c)
    );
  } else {
    if (Curves.is_stable_($c, [$p[0]])) {
      temp$1 = u128(
        $.copy(x_reserve).sub(Math.mul_div_($.copy(x_in_val), $.copy(FEE_MULTIPLIER), $.copy(FEE_SCALE), $c))
      );
    } else {
      throw $.abortCode($.copy(ERR_INVALID_CURVE));
    }
    temp$2 = temp$1;
  }
  x_res_new_after_fee = temp$2;
  if (Curves.is_uncorrelated_($c, [$p[0]])) {
    temp$4 = Math.mul_to_u128_($.copy(y_reserve), $.copy(FEE_SCALE), $c).sub(
      Math.mul_to_u128_($.copy(y_in_val), $.copy(FEE_MULTIPLIER), $c)
    );
  } else {
    if (Curves.is_stable_($c, [$p[0]])) {
      temp$3 = u128(
        $.copy(y_reserve).sub(Math.mul_div_($.copy(y_in_val), $.copy(FEE_MULTIPLIER), $.copy(FEE_SCALE), $c))
      );
    } else {
      throw $.abortCode($.copy(ERR_INVALID_CURVE));
    }
    temp$4 = temp$3;
  }
  y_res_new_after_fee = temp$4;
  return [$.copy(x_res_new_after_fee), $.copy(y_res_new_after_fee)];
}

export function register_(acc: HexString, $c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): void {
  let temp$1,
    events_store,
    lp_burn_cap,
    lp_freeze_cap,
    lp_mint_cap,
    lp_name,
    lp_symbol,
    pool,
    pool_account,
    pool_cap,
    x_scale,
    y_scale;
  Emergency.assert_no_emergency_($c);
  Coin_helper.assert_is_coin_($c, [$p[0]]);
  Coin_helper.assert_is_coin_($c, [$p[1]]);
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (Curves.is_stable_($c, [$p[2]])) {
    temp$1 = true;
  } else {
    temp$1 = Curves.is_uncorrelated_($c, [$p[2]]);
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERR_INVALID_CURVE));
  }
  if (
    !!$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_EXISTS_FOR_PAIR));
  }
  pool_cap = $c.borrow_global<PoolAccountCapability>(
    new SimpleStructTag(PoolAccountCapability),
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9')
  );
  pool_account = Stdlib.Account.create_signer_with_capability_(pool_cap.signer_cap, $c);
  [lp_name, lp_symbol] = Coin_helper.generate_lp_name_and_symbol_($c, [$p[0], $p[1], $p[2]]);
  [lp_burn_cap, lp_freeze_cap, lp_mint_cap] = Stdlib.Coin.initialize_(
    pool_account,
    $.copy(lp_name),
    $.copy(lp_symbol),
    u8('6'),
    true,
    $c,
    [
      new StructTag(
        new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
        'lp_coin',
        'LP',
        [$p[0], $p[1], $p[2]]
      )
    ]
  );
  Stdlib.Coin.destroy_freeze_cap_($.copy(lp_freeze_cap), $c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  x_scale = u64('0');
  y_scale = u64('0');
  if (Curves.is_stable_($c, [$p[2]])) {
    x_scale = Math.pow_10_(Stdlib.Coin.decimals_($c, [$p[0]]), $c);
    y_scale = Math.pow_10_(Stdlib.Coin.decimals_($c, [$p[1]]), $c);
  } else {
  }
  pool = new LiquidityPool(
    {
      coin_x_reserve: Stdlib.Coin.zero_($c, [$p[0]]),
      coin_y_reserve: Stdlib.Coin.zero_($c, [$p[1]]),
      last_block_timestamp: u64('0'),
      last_price_x_cumulative: u128('0'),
      last_price_y_cumulative: u128('0'),
      lp_mint_cap: $.copy(lp_mint_cap),
      lp_burn_cap: $.copy(lp_burn_cap),
      x_scale: $.copy(x_scale),
      y_scale: $.copy(y_scale)
    },
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]])
  );
  $c.move_to(new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]), pool_account, pool);
  Dao_storage.register_(pool_account, $c, [$p[0], $p[1], $p[2]]);
  events_store = new EventsStore(
    {
      pool_created_handle: Stdlib.Account.new_event_handle_(pool_account, $c, [
        new SimpleStructTag(PoolCreatedEvent, [$p[0], $p[1], $p[2]])
      ]),
      liquidity_added_handle: Stdlib.Account.new_event_handle_(pool_account, $c, [
        new SimpleStructTag(LiquidityAddedEvent, [$p[0], $p[1], $p[2]])
      ]),
      liquidity_removed_handle: Stdlib.Account.new_event_handle_(pool_account, $c, [
        new SimpleStructTag(LiquidityRemovedEvent, [$p[0], $p[1], $p[2]])
      ]),
      swap_handle: Stdlib.Account.new_event_handle_(pool_account, $c, [
        new SimpleStructTag(SwapEvent, [$p[0], $p[1], $p[2]])
      ]),
      oracle_updated_handle: Stdlib.Account.new_event_handle_(pool_account, $c, [
        new SimpleStructTag(OracleUpdatedEvent, [$p[0], $p[1], $p[2]])
      ])
    },
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]])
  );
  Stdlib.Event.emit_event_(
    events_store.pool_created_handle,
    new PoolCreatedEvent(
      { creator: Stdlib.Signer.address_of_(acc, $c) },
      new SimpleStructTag(PoolCreatedEvent, [$p[0], $p[1], $p[2]])
    ),
    $c,
    [new SimpleStructTag(PoolCreatedEvent, [$p[0], $p[1], $p[2]])]
  );
  $c.move_to(new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]), pool_account, events_store);
  return;
}

export function split_third_of_fee_to_dao_(
  pool: LiquidityPool,
  x_in_val: U64,
  y_in_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let dao_fee_multiplier, dao_x_fee_val, dao_x_in, dao_y_fee_val, dao_y_in;
  dao_fee_multiplier = $.copy(FEE_MULTIPLIER).div(u64('3'));
  dao_x_fee_val = Math.mul_div_($.copy(x_in_val), $.copy(dao_fee_multiplier), $.copy(FEE_SCALE), $c);
  dao_y_fee_val = Math.mul_div_($.copy(y_in_val), $.copy(dao_fee_multiplier), $.copy(FEE_SCALE), $c);
  dao_x_in = Stdlib.Coin.extract_(pool.coin_x_reserve, $.copy(dao_x_fee_val), $c, [$p[0]]);
  dao_y_in = Stdlib.Coin.extract_(pool.coin_y_reserve, $.copy(dao_y_fee_val), $c, [$p[1]]);
  Dao_storage.deposit_(
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
    dao_x_in,
    dao_y_in,
    $c,
    [$p[0], $p[1], $p[2]]
  );
  return;
}

export function swap_(
  x_in: Stdlib.Coin.Coin,
  x_out: U64,
  y_in: Stdlib.Coin.Coin,
  y_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  let temp$1,
    temp$2,
    temp$3,
    temp$4,
    temp$5,
    temp$6,
    events_store,
    pool,
    x_in_val,
    x_res_new_after_fee,
    x_reserve_size,
    x_swapped,
    y_in_val,
    y_res_new_after_fee,
    y_reserve_size,
    y_swapped;
  Emergency.assert_no_emergency_($c);
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  x_in_val = Stdlib.Coin.value_(x_in, $c, [$p[0]]);
  y_in_val = Stdlib.Coin.value_(y_in, $c, [$p[1]]);
  if ($.copy(x_in_val).gt(u64('0'))) {
    temp$1 = true;
  } else {
    temp$1 = $.copy(y_in_val).gt(u64('0'));
  }
  if (!temp$1) {
    throw $.abortCode($.copy(ERR_EMPTY_COIN_IN));
  }
  [x_reserve_size, y_reserve_size] = get_reserves_size_($c, [$p[0], $p[1], $p[2]]);
  pool = $c.borrow_global_mut<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  Stdlib.Coin.merge_(pool.coin_x_reserve, x_in, $c, [$p[0]]);
  Stdlib.Coin.merge_(pool.coin_y_reserve, y_in, $c, [$p[1]]);
  x_swapped = Stdlib.Coin.extract_(pool.coin_x_reserve, $.copy(x_out), $c, [$p[0]]);
  y_swapped = Stdlib.Coin.extract_(pool.coin_y_reserve, $.copy(y_out), $c, [$p[1]]);
  [x_res_new_after_fee, y_res_new_after_fee] = new_reserves_after_fees_scaled_(
    Stdlib.Coin.value_(pool.coin_x_reserve, $c, [$p[0]]),
    Stdlib.Coin.value_(pool.coin_y_reserve, $c, [$p[1]]),
    $.copy(x_in_val),
    $.copy(y_in_val),
    $c,
    [$p[2]]
  );
  assert_lp_value_is_increased_(
    $.copy(pool.x_scale),
    $.copy(pool.y_scale),
    u128($.copy(x_reserve_size)),
    u128($.copy(y_reserve_size)),
    u128($.copy(x_res_new_after_fee)),
    u128($.copy(y_res_new_after_fee)),
    $c,
    [$p[2]]
  );
  split_third_of_fee_to_dao_(pool, $.copy(x_in_val), $.copy(y_in_val), $c, [$p[0], $p[1], $p[2]]);
  update_oracle_(pool, $.copy(x_reserve_size), $.copy(y_reserve_size), $c, [$p[0], $p[1], $p[2]]);
  events_store = $c.borrow_global_mut<EventsStore>(
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]),
    new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
  );
  temp$6 = events_store.swap_handle;
  temp$2 = $.copy(x_in_val);
  temp$3 = $.copy(y_in_val);
  temp$4 = $.copy(x_out);
  temp$5 = $.copy(y_out);
  Stdlib.Event.emit_event_(
    temp$6,
    new SwapEvent(
      { x_in: temp$2, x_out: temp$4, y_in: temp$3, y_out: temp$5 },
      new SimpleStructTag(SwapEvent, [$p[0], $p[1], $p[2]])
    ),
    $c,
    [new SimpleStructTag(SwapEvent, [$p[0], $p[1], $p[2]])]
  );
  return [x_swapped, y_swapped];
}

export function update_oracle_(
  pool: LiquidityPool,
  x_reserve: U64,
  y_reserve: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let temp$1,
    temp$2,
    block_timestamp,
    events_store,
    last_block_timestamp,
    last_price_x_cumulative,
    last_price_y_cumulative,
    time_elapsed;
  last_block_timestamp = $.copy(pool.last_block_timestamp);
  block_timestamp = Stdlib.Timestamp.now_seconds_($c);
  time_elapsed = u128($.copy(block_timestamp).sub($.copy(last_block_timestamp)));
  if ($.copy(time_elapsed).gt(u128('0'))) {
    temp$1 = $.copy(x_reserve).neq(u64('0'));
  } else {
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(y_reserve).neq(u64('0'));
  } else {
    temp$2 = false;
  }
  if (temp$2) {
    last_price_x_cumulative = Uq64x64.Uq64x64.to_u128_(
      Uq64x64.Uq64x64.fraction_($.copy(y_reserve), $.copy(x_reserve), $c),
      $c
    ).mul($.copy(time_elapsed));
    last_price_y_cumulative = Uq64x64.Uq64x64.to_u128_(
      Uq64x64.Uq64x64.fraction_($.copy(x_reserve), $.copy(y_reserve), $c),
      $c
    ).mul($.copy(time_elapsed));
    pool.last_price_x_cumulative = Math.overflow_add_(
      $.copy(pool.last_price_x_cumulative),
      $.copy(last_price_x_cumulative),
      $c
    );
    pool.last_price_y_cumulative = Math.overflow_add_(
      $.copy(pool.last_price_y_cumulative),
      $.copy(last_price_y_cumulative),
      $c
    );
    events_store = $c.borrow_global_mut<EventsStore>(
      new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]),
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e')
    );
    Stdlib.Event.emit_event_(
      events_store.oracle_updated_handle,
      new OracleUpdatedEvent(
        {
          last_price_x_cumulative: $.copy(pool.last_price_x_cumulative),
          last_price_y_cumulative: $.copy(pool.last_price_y_cumulative)
        },
        new SimpleStructTag(OracleUpdatedEvent, [$p[0], $p[1], $p[2]])
      ),
      $c,
      [new SimpleStructTag(OracleUpdatedEvent, [$p[0], $p[1], $p[2]])]
    );
  } else {
  }
  pool.last_block_timestamp = $.copy(block_timestamp);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::EventsStore',
    EventsStore.EventsStoreParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::LiquidityAddedEvent',
    LiquidityAddedEvent.LiquidityAddedEventParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::LiquidityPool',
    LiquidityPool.LiquidityPoolParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::LiquidityRemovedEvent',
    LiquidityRemovedEvent.LiquidityRemovedEventParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::OracleUpdatedEvent',
    OracleUpdatedEvent.OracleUpdatedEventParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::PoolAccountCapability',
    PoolAccountCapability.PoolAccountCapabilityParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::PoolCreatedEvent',
    PoolCreatedEvent.PoolCreatedEventParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::liquidity_pool::SwapEvent',
    SwapEvent.SwapEventParser
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
  get EventsStore() {
    return EventsStore;
  }
  async loadEventsStore(owner: HexString, $p: TypeTag[] /* <X, Y, Curve> */, loadFull = true, fillCache = true) {
    const val = await EventsStore.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.move_to(val.typeTag, owner, val);
    }
    return val;
  }
  get LiquidityAddedEvent() {
    return LiquidityAddedEvent;
  }
  get LiquidityPool() {
    return LiquidityPool;
  }
  async loadLiquidityPool(owner: HexString, $p: TypeTag[] /* <X, Y, Curve> */, loadFull = true, fillCache = true) {
    const val = await LiquidityPool.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.move_to(val.typeTag, owner, val);
    }
    return val;
  }
  get LiquidityRemovedEvent() {
    return LiquidityRemovedEvent;
  }
  get OracleUpdatedEvent() {
    return OracleUpdatedEvent;
  }
  get PoolAccountCapability() {
    return PoolAccountCapability;
  }
  async loadPoolAccountCapability(owner: HexString, loadFull = true, fillCache = true) {
    const val = await PoolAccountCapability.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.move_to(val.typeTag, owner, val);
    }
    return val;
  }
  get PoolCreatedEvent() {
    return PoolCreatedEvent;
  }
  get SwapEvent() {
    return SwapEvent;
  }
  payload_initialize(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_initialize(isJSON);
  }
  async initialize(_account: AptosAccount, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_initialize(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
