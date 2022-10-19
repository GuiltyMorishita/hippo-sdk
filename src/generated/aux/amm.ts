import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Uint256 from './uint256';
export const packageName = 'aux';
export const moduleAddress = new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541');
export const moduleName = 'amm';

export const EINSUFFICIENT_INPUT_AMOUNT: U64 = u64('16');
export const EINSUFFICIENT_LIQUIDITY: U64 = u64('17');
export const EINSUFFICIENT_OUTPUT_AMOUNT: U64 = u64('19');
export const EPOOL_NOT_FOUND: U64 = u64('2');

export class AddLiquidityEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'AddLiquidityEvent';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'timestamp', typeTag: AtomicTypeTag.U64 },
    { name: 'x_coin_type', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'y_coin_type', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'x_added_au', typeTag: AtomicTypeTag.U64 },
    { name: 'y_added_au', typeTag: AtomicTypeTag.U64 },
    { name: 'lp_minted_au', typeTag: AtomicTypeTag.U64 }
  ];

  timestamp: U64;
  x_coin_type: Stdlib.String.String;
  y_coin_type: Stdlib.String.String;
  x_added_au: U64;
  y_added_au: U64;
  lp_minted_au: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.timestamp = proto['timestamp'] as U64;
    this.x_coin_type = proto['x_coin_type'] as Stdlib.String.String;
    this.y_coin_type = proto['y_coin_type'] as Stdlib.String.String;
    this.x_added_au = proto['x_added_au'] as U64;
    this.y_added_au = proto['y_added_au'] as U64;
    this.lp_minted_au = proto['lp_minted_au'] as U64;
  }

  static AddLiquidityEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): AddLiquidityEvent {
    const proto = $.parseStructProto(data, typeTag, repo, AddLiquidityEvent);
    return new AddLiquidityEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'AddLiquidityEvent', []);
  }
  async loadFullState(app: $.AppType) {
    await this.x_coin_type.loadFullState(app);
    await this.y_coin_type.loadFullState(app);
    this.__app = app;
  }
}

export class LP {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'LP';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static LPParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): LP {
    const proto = $.parseStructProto(data, typeTag, repo, LP);
    return new LP(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'LP', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class Pool {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Pool';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'frozen', typeTag: AtomicTypeTag.Bool },
    { name: 'timestamp', typeTag: AtomicTypeTag.U64 },
    { name: 'fee_bps', typeTag: AtomicTypeTag.U64 },
    {
      name: 'swap_events',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
          'amm',
          'SwapEvent',
          []
        )
      ])
    },
    {
      name: 'add_liquidity_events',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
          'amm',
          'AddLiquidityEvent',
          []
        )
      ])
    },
    {
      name: 'remove_liquidity_events',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
          'amm',
          'RemoveLiquidityEvent',
          []
        )
      ])
    },
    { name: 'x_reserve', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(0)]) },
    { name: 'y_reserve', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(1)]) },
    {
      name: 'lp_mint',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'MintCapability', [
        new StructTag(
          new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
          'amm',
          'LP',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1)]
        )
      ])
    },
    {
      name: 'lp_burn',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'BurnCapability', [
        new StructTag(
          new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
          'amm',
          'LP',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1)]
        )
      ])
    }
  ];

  frozen: boolean;
  timestamp: U64;
  fee_bps: U64;
  swap_events: Stdlib.Event.EventHandle;
  add_liquidity_events: Stdlib.Event.EventHandle;
  remove_liquidity_events: Stdlib.Event.EventHandle;
  x_reserve: Stdlib.Coin.Coin;
  y_reserve: Stdlib.Coin.Coin;
  lp_mint: Stdlib.Coin.MintCapability;
  lp_burn: Stdlib.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.frozen = proto['frozen'] as boolean;
    this.timestamp = proto['timestamp'] as U64;
    this.fee_bps = proto['fee_bps'] as U64;
    this.swap_events = proto['swap_events'] as Stdlib.Event.EventHandle;
    this.add_liquidity_events = proto['add_liquidity_events'] as Stdlib.Event.EventHandle;
    this.remove_liquidity_events = proto['remove_liquidity_events'] as Stdlib.Event.EventHandle;
    this.x_reserve = proto['x_reserve'] as Stdlib.Coin.Coin;
    this.y_reserve = proto['y_reserve'] as Stdlib.Coin.Coin;
    this.lp_mint = proto['lp_mint'] as Stdlib.Coin.MintCapability;
    this.lp_burn = proto['lp_burn'] as Stdlib.Coin.BurnCapability;
  }

  static PoolParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Pool {
    const proto = $.parseStructProto(data, typeTag, repo, Pool);
    return new Pool(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Pool, typeParams);
    return result as unknown as Pool;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Pool, typeParams);
    await result.loadFullState(app);
    return result as unknown as Pool;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Pool', $p);
  }
  async loadFullState(app: $.AppType) {
    await this.swap_events.loadFullState(app);
    await this.add_liquidity_events.loadFullState(app);
    await this.remove_liquidity_events.loadFullState(app);
    await this.x_reserve.loadFullState(app);
    await this.y_reserve.loadFullState(app);
    await this.lp_mint.loadFullState(app);
    await this.lp_burn.loadFullState(app);
    this.__app = app;
  }
}

export class RemoveLiquidityEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'RemoveLiquidityEvent';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'timestamp', typeTag: AtomicTypeTag.U64 },
    { name: 'x_coin_type', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'y_coin_type', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'x_removed_au', typeTag: AtomicTypeTag.U64 },
    { name: 'y_removed_au', typeTag: AtomicTypeTag.U64 },
    { name: 'lp_burned_au', typeTag: AtomicTypeTag.U64 }
  ];

  timestamp: U64;
  x_coin_type: Stdlib.String.String;
  y_coin_type: Stdlib.String.String;
  x_removed_au: U64;
  y_removed_au: U64;
  lp_burned_au: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.timestamp = proto['timestamp'] as U64;
    this.x_coin_type = proto['x_coin_type'] as Stdlib.String.String;
    this.y_coin_type = proto['y_coin_type'] as Stdlib.String.String;
    this.x_removed_au = proto['x_removed_au'] as U64;
    this.y_removed_au = proto['y_removed_au'] as U64;
    this.lp_burned_au = proto['lp_burned_au'] as U64;
  }

  static RemoveLiquidityEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): RemoveLiquidityEvent {
    const proto = $.parseStructProto(data, typeTag, repo, RemoveLiquidityEvent);
    return new RemoveLiquidityEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'RemoveLiquidityEvent', []);
  }
  async loadFullState(app: $.AppType) {
    await this.x_coin_type.loadFullState(app);
    await this.y_coin_type.loadFullState(app);
    this.__app = app;
  }
}

export class SwapEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'SwapEvent';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'sender_addr', typeTag: AtomicTypeTag.Address },
    { name: 'timestamp', typeTag: AtomicTypeTag.U64 },
    { name: 'in_coin_type', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'out_coin_type', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'in_reserve', typeTag: AtomicTypeTag.U64 },
    { name: 'out_reserve', typeTag: AtomicTypeTag.U64 },
    { name: 'in_au', typeTag: AtomicTypeTag.U64 },
    { name: 'out_au', typeTag: AtomicTypeTag.U64 },
    { name: 'fee_bps', typeTag: AtomicTypeTag.U64 }
  ];

  sender_addr: HexString;
  timestamp: U64;
  in_coin_type: Stdlib.String.String;
  out_coin_type: Stdlib.String.String;
  in_reserve: U64;
  out_reserve: U64;
  in_au: U64;
  out_au: U64;
  fee_bps: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.sender_addr = proto['sender_addr'] as HexString;
    this.timestamp = proto['timestamp'] as U64;
    this.in_coin_type = proto['in_coin_type'] as Stdlib.String.String;
    this.out_coin_type = proto['out_coin_type'] as Stdlib.String.String;
    this.in_reserve = proto['in_reserve'] as U64;
    this.out_reserve = proto['out_reserve'] as U64;
    this.in_au = proto['in_au'] as U64;
    this.out_au = proto['out_au'] as U64;
    this.fee_bps = proto['fee_bps'] as U64;
  }

  static SwapEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): SwapEvent {
    const proto = $.parseStructProto(data, typeTag, repo, SwapEvent);
    return new SwapEvent(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'SwapEvent', []);
  }
  async loadFullState(app: $.AppType) {
    await this.in_coin_type.loadFullState(app);
    await this.out_coin_type.loadFullState(app);
    this.__app = app;
  }
}
export function add_exact_liquidity_(
  _sender: HexString,
  _x_au: U64,
  _y_au: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  return;
}

export function buildPayload_add_exact_liquidity(
  _x_au: U64,
  _y_au: U64,
  $p: TypeTag[] /* <X, Y>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
    'amm',
    'add_exact_liquidity',
    typeParamStrings,
    [_x_au, _y_au],
    isJSON
  );
}
export function au_in_(au_out: U64, $c: AptosDataCache, $p: TypeTag[] /* <CoinIn, CoinOut>*/): U64 {
  let temp$4, temp$5, pool, pool__1, x_reserve, x_reserve__2, y_reserve, y_reserve__3;
  if (
    $c.exists(
      new SimpleStructTag(Pool, [$p[0], $p[1]]),
      new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
    )
  ) {
    pool = $c.borrow_global<Pool>(
      new SimpleStructTag(Pool, [$p[0], $p[1]]),
      new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
    );
    x_reserve = Stdlib.Coin.value_(pool.x_reserve, $c, [$p[0]]);
    y_reserve = Stdlib.Coin.value_(pool.y_reserve, $c, [$p[1]]);
    temp$5 = get_amount_in_($.copy(au_out), $.copy(x_reserve), $.copy(y_reserve), $.copy(pool.fee_bps), $c);
  } else {
    if (
      $c.exists(
        new SimpleStructTag(Pool, [$p[1], $p[0]]),
        new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
      )
    ) {
      pool__1 = $c.borrow_global<Pool>(
        new SimpleStructTag(Pool, [$p[1], $p[0]]),
        new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
      );
      x_reserve__2 = Stdlib.Coin.value_(pool__1.x_reserve, $c, [$p[1]]);
      y_reserve__3 = Stdlib.Coin.value_(pool__1.y_reserve, $c, [$p[0]]);
      temp$4 = get_amount_in_($.copy(au_out), $.copy(y_reserve__3), $.copy(x_reserve__2), $.copy(pool__1.fee_bps), $c);
    } else {
      throw $.abortCode($.copy(EPOOL_NOT_FOUND));
    }
    temp$5 = temp$4;
  }
  return temp$5;
}

export function au_out_(au_in: U64, $c: AptosDataCache, $p: TypeTag[] /* <CoinIn, CoinOut>*/): U64 {
  let temp$4, temp$5, pool, pool__1, x_reserve, x_reserve__2, y_reserve, y_reserve__3;
  if (
    $c.exists(
      new SimpleStructTag(Pool, [$p[0], $p[1]]),
      new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
    )
  ) {
    pool = $c.borrow_global<Pool>(
      new SimpleStructTag(Pool, [$p[0], $p[1]]),
      new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
    );
    x_reserve = Stdlib.Coin.value_(pool.x_reserve, $c, [$p[0]]);
    y_reserve = Stdlib.Coin.value_(pool.y_reserve, $c, [$p[1]]);
    temp$5 = get_amount_out_($.copy(au_in), $.copy(x_reserve), $.copy(y_reserve), $.copy(pool.fee_bps), $c);
  } else {
    if (
      $c.exists(
        new SimpleStructTag(Pool, [$p[1], $p[0]]),
        new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
      )
    ) {
      pool__1 = $c.borrow_global<Pool>(
        new SimpleStructTag(Pool, [$p[1], $p[0]]),
        new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541')
      );
      x_reserve__2 = Stdlib.Coin.value_(pool__1.x_reserve, $c, [$p[1]]);
      y_reserve__3 = Stdlib.Coin.value_(pool__1.y_reserve, $c, [$p[0]]);
      temp$4 = get_amount_out_($.copy(au_in), $.copy(y_reserve__3), $.copy(x_reserve__2), $.copy(pool__1.fee_bps), $c);
    } else {
      throw $.abortCode($.copy(EPOOL_NOT_FOUND));
    }
    temp$5 = temp$4;
  }
  return temp$5;
}

export function create_pool_(_sender: HexString, _fee_bps: U64, $c: AptosDataCache, $p: TypeTag[] /* <X, Y>*/): void {
  return;
}

export function buildPayload_create_pool(
  _fee_bps: U64,
  $p: TypeTag[] /* <X, Y>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
    'amm',
    'create_pool',
    typeParamStrings,
    [_fee_bps],
    isJSON
  );
}
export function get_amount_in_(
  amount_out: U64,
  reserve_in: U64,
  reserve_out: U64,
  fee_bps: U64,
  $c: AptosDataCache
): U64 {
  let temp$1, denominator, numerator;
  if (!$.copy(amount_out).gt(u64('0'))) {
    throw $.abortCode($.copy(EINSUFFICIENT_OUTPUT_AMOUNT));
  }
  if ($.copy(reserve_in).gt(u64('0'))) {
    temp$1 = $.copy(reserve_out).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(EINSUFFICIENT_LIQUIDITY));
  }
  numerator = u128($.copy(reserve_in))
    .mul(u128($.copy(amount_out)))
    .mul(u128('10000'));
  denominator = u128($.copy(reserve_out).sub($.copy(amount_out))).mul(u128(u64('10000').sub($.copy(fee_bps))));
  return u64($.copy(numerator).add($.copy(denominator)).sub(u128('1')).div($.copy(denominator)));
}

export function get_amount_out_(
  amount_in: U64,
  reserve_in: U64,
  reserve_out: U64,
  fee_bps: U64,
  $c: AptosDataCache
): U64 {
  let temp$1, amount_in_with_fee, denominator, numerator;
  if (!$.copy(amount_in).gt(u64('0'))) {
    throw $.abortCode($.copy(EINSUFFICIENT_INPUT_AMOUNT));
  }
  if ($.copy(reserve_in).gt(u64('0'))) {
    temp$1 = $.copy(reserve_out).gt(u64('0'));
  } else {
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode($.copy(EINSUFFICIENT_LIQUIDITY));
  }
  amount_in_with_fee = u128($.copy(amount_in)).mul(u128(u64('10000').sub($.copy(fee_bps))));
  numerator = Uint256.downcast_(
    Uint256.underlying_mul_to_uint256_($.copy(amount_in_with_fee), u128($.copy(reserve_out)), $c),
    $c
  );
  denominator = u128($.copy(reserve_in)).mul(u128('10000')).add($.copy(amount_in_with_fee));
  return u64($.copy(numerator).div($.copy(denominator)));
}

export function swap_exact_coin_for_coin_mut_(
  _sender_addr: HexString,
  _user_in: Stdlib.Coin.Coin,
  _user_out: Stdlib.Coin.Coin,
  _au_in: U64,
  _min_au_out: U64,
  _use_limit_price: boolean,
  _max_out_per_in_au_numerator: U128,
  _max_out_per_in_au_denominator: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinIn, CoinOut>*/
): [U64, U64] {
  return [u64('0'), u64('0')];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541::amm::AddLiquidityEvent',
    AddLiquidityEvent.AddLiquidityEventParser
  );
  repo.addParser('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541::amm::LP', LP.LPParser);
  repo.addParser('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541::amm::Pool', Pool.PoolParser);
  repo.addParser(
    '0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541::amm::RemoveLiquidityEvent',
    RemoveLiquidityEvent.RemoveLiquidityEventParser
  );
  repo.addParser(
    '0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541::amm::SwapEvent',
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
  get AddLiquidityEvent() {
    return AddLiquidityEvent;
  }
  get LP() {
    return LP;
  }
  get Pool() {
    return Pool;
  }
  async loadPool(owner: HexString, $p: TypeTag[] /* <X, Y> */, loadFull = true, fillCache = true) {
    const val = await Pool.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get RemoveLiquidityEvent() {
    return RemoveLiquidityEvent;
  }
  get SwapEvent() {
    return SwapEvent;
  }
  payload_add_exact_liquidity(
    _x_au: U64,
    _y_au: U64,
    $p: TypeTag[] /* <X, Y>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_exact_liquidity(_x_au, _y_au, $p, isJSON);
  }
  async add_exact_liquidity(
    _account: AptosAccount,
    _x_au: U64,
    _y_au: U64,
    $p: TypeTag[] /* <X, Y>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_add_exact_liquidity(_x_au, _y_au, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_create_pool(
    _fee_bps: U64,
    $p: TypeTag[] /* <X, Y>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_create_pool(_fee_bps, $p, isJSON);
  }
  async create_pool(
    _account: AptosAccount,
    _fee_bps: U64,
    $p: TypeTag[] /* <X, Y>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_create_pool(_fee_bps, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
}
