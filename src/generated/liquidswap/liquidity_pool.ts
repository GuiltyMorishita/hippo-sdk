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
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12');
export const moduleName = 'liquidity_pool';

export const ERR_DISABLED: U64 = u64('4002');
export const ERR_EMERGENCY: U64 = u64('4001');
export const ERR_POOL_DOES_NOT_EXIST: U64 = u64('107');
export const ERR_POOL_IS_LOCKED: U64 = u64('111');
export const ERR_WRONG_PAIR_ORDERING: U64 = u64('100');
export const FEE_SCALE: U64 = u64('10000');

export class IsEmergency {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'IsEmergency';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static IsEmergencyParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): IsEmergency {
    const proto = $.parseStructProto(data, typeTag, repo, IsEmergency);
    return new IsEmergency(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, IsEmergency, typeParams);
    return result as unknown as IsEmergency;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, IsEmergency, typeParams);
    await result.loadFullState(app);
    return result as unknown as IsEmergency;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'IsEmergency', []);
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
          new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948'),
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
          new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948'),
          'lp_coin',
          'LP',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    { name: 'x_scale', typeTag: AtomicTypeTag.U64 },
    { name: 'y_scale', typeTag: AtomicTypeTag.U64 },
    { name: 'locked', typeTag: AtomicTypeTag.Bool },
    { name: 'fee', typeTag: AtomicTypeTag.U64 },
    { name: 'dao_fee', typeTag: AtomicTypeTag.U64 }
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
  locked: boolean;
  fee: U64;
  dao_fee: U64;

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
    this.locked = proto['locked'] as boolean;
    this.fee = proto['fee'] as U64;
    this.dao_fee = proto['dao_fee'] as U64;
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
export function assert_no_emergency_($c: AptosDataCache): void {
  if (!!is_emergency_($c)) {
    throw $.abortCode($.copy(ERR_EMERGENCY));
  }
  return;
}

export function assert_pool_unlocked_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): void {
  let pool;
  pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
  );
  if (!($.copy(pool.locked) == false)) {
    throw $.abortCode($.copy(ERR_POOL_IS_LOCKED));
  }
  return;
}

export function get_decimals_scales_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let pool;
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
  );
  return [$.copy(pool.x_scale), $.copy(pool.y_scale)];
}

export function get_fee_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): U64 {
  let pool;
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
  );
  return $.copy(pool.fee);
}

export function get_fees_config_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  return [get_fee_($c, [$p[0], $p[1], $p[2]]), $.copy(FEE_SCALE)];
}

export function get_reserves_size_($c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): [U64, U64] {
  let liquidity_pool, x_reserve, y_reserve;
  assert_no_emergency_($c);
  if (!Coin_helper.is_sorted_($c, [$p[0], $p[1]])) {
    throw $.abortCode($.copy(ERR_WRONG_PAIR_ORDERING));
  }
  if (
    !$c.exists(
      new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
      new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
    )
  ) {
    throw $.abortCode($.copy(ERR_POOL_DOES_NOT_EXIST));
  }
  assert_pool_unlocked_($c, [$p[0], $p[1], $p[2]]);
  liquidity_pool = $c.borrow_global<LiquidityPool>(
    new SimpleStructTag(LiquidityPool, [$p[0], $p[1], $p[2]]),
    new HexString('0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948')
  );
  x_reserve = Stdlib.Coin.value_(liquidity_pool.coin_x_reserve, $c, [$p[0]]);
  y_reserve = Stdlib.Coin.value_(liquidity_pool.coin_y_reserve, $c, [$p[1]]);
  return [$.copy(x_reserve), $.copy(y_reserve)];
}

export function is_emergency_($c: AptosDataCache): boolean {
  return $c.exists(
    new SimpleStructTag(IsEmergency),
    new HexString('0xa6d6e549b917e454464ff6c63f91386d98769ea512bc778bdaca00969f896764')
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::IsEmergency',
    IsEmergency.IsEmergencyParser
  );
  repo.addParser(
    '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::LiquidityPool',
    LiquidityPool.LiquidityPoolParser
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
  get IsEmergency() {
    return IsEmergency;
  }
  async loadIsEmergency(owner: HexString, loadFull = true, fillCache = true) {
    const val = await IsEmergency.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
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
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
}
