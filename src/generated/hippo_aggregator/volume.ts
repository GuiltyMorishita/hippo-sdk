import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'HippoAggregator';
export const moduleAddress = new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039');
export const moduleName = 'volume';

export const E_NOT_ADMIN: U64 = u64('1');
export const E_NOT_POSTER: U64 = u64('2');
export const E_REPEAT_POST: U64 = u64('3');
export const E_VERCTOR_LENGT_NOT_EQUAL: U64 = u64('4');
export const VOLUME_HISTORY_LENGTH: U64 = u64('30');

export class PoolProvider {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolProvider';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'dex_type', typeTag: AtomicTypeTag.U8 },
    { name: 'amount', typeTag: AtomicTypeTag.U64 }
  ];

  dex_type: U8;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dex_type = proto['dex_type'] as U8;
    this.amount = proto['amount'] as U64;
  }

  static PoolProviderParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolProvider {
    const proto = $.parseStructProto(data, typeTag, repo, PoolProvider);
    return new PoolProvider(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolProvider', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class TotalVolume {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'TotalVolume';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'start_time', typeTag: AtomicTypeTag.U64 },
    { name: 'amount', typeTag: AtomicTypeTag.U64 }
  ];

  start_time: U64;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.start_time = proto['start_time'] as U64;
    this.amount = proto['amount'] as U64;
  }

  static TotalVolumeParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): TotalVolume {
    const proto = $.parseStructProto(data, typeTag, repo, TotalVolume);
    return new TotalVolume(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'TotalVolume', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class TradingPair {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'TradingPair';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'coin_x', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'coin_y', typeTag: new StructTag(new HexString('0x1'), 'string', 'String', []) },
    { name: 'amount', typeTag: AtomicTypeTag.U64 }
  ];

  coin_x: Stdlib.String.String;
  coin_y: Stdlib.String.String;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_x = proto['coin_x'] as Stdlib.String.String;
    this.coin_y = proto['coin_y'] as Stdlib.String.String;
    this.amount = proto['amount'] as U64;
  }

  static TradingPairParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): TradingPair {
    const proto = $.parseStructProto(data, typeTag, repo, TradingPair);
    return new TradingPair(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'TradingPair', []);
  }
  async loadFullState(app: $.AppType) {
    await this.coin_x.loadFullState(app);
    await this.coin_y.loadFullState(app);
    this.__app = app;
  }
}

export class Volume {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Volume';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'poster', typeTag: AtomicTypeTag.Address },
    { name: 'total_volume', typeTag: AtomicTypeTag.U128 },
    { name: 'last_24h_volume', typeTag: AtomicTypeTag.U64 },
    { name: 'last_7d_volume', typeTag: AtomicTypeTag.U64 },
    { name: 'data_end_sequence_number', typeTag: AtomicTypeTag.U64 },
    { name: 'data_end_time', typeTag: AtomicTypeTag.U64 },
    { name: 'volume_decimals', typeTag: AtomicTypeTag.U64 },
    {
      name: 'total_volume_history_24h',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
          'volume',
          'TotalVolume',
          []
        )
      )
    },
    {
      name: 'total_volume_history_7d',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
          'volume',
          'TotalVolume',
          []
        )
      )
    },
    {
      name: 'top_trading_pairs_24h',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
          'volume',
          'TradingPair',
          []
        )
      )
    },
    {
      name: 'top_trading_pairs_7d',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
          'volume',
          'TradingPair',
          []
        )
      )
    },
    {
      name: 'top_pool_provider_24h',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
          'volume',
          'PoolProvider',
          []
        )
      )
    },
    {
      name: 'top_pool_provider_7d',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
          'volume',
          'PoolProvider',
          []
        )
      )
    }
  ];

  poster: HexString;
  total_volume: U128;
  last_24h_volume: U64;
  last_7d_volume: U64;
  data_end_sequence_number: U64;
  data_end_time: U64;
  volume_decimals: U64;
  total_volume_history_24h: TotalVolume[];
  total_volume_history_7d: TotalVolume[];
  top_trading_pairs_24h: TradingPair[];
  top_trading_pairs_7d: TradingPair[];
  top_pool_provider_24h: PoolProvider[];
  top_pool_provider_7d: PoolProvider[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.poster = proto['poster'] as HexString;
    this.total_volume = proto['total_volume'] as U128;
    this.last_24h_volume = proto['last_24h_volume'] as U64;
    this.last_7d_volume = proto['last_7d_volume'] as U64;
    this.data_end_sequence_number = proto['data_end_sequence_number'] as U64;
    this.data_end_time = proto['data_end_time'] as U64;
    this.volume_decimals = proto['volume_decimals'] as U64;
    this.total_volume_history_24h = proto['total_volume_history_24h'] as TotalVolume[];
    this.total_volume_history_7d = proto['total_volume_history_7d'] as TotalVolume[];
    this.top_trading_pairs_24h = proto['top_trading_pairs_24h'] as TradingPair[];
    this.top_trading_pairs_7d = proto['top_trading_pairs_7d'] as TradingPair[];
    this.top_pool_provider_24h = proto['top_pool_provider_24h'] as PoolProvider[];
    this.top_pool_provider_7d = proto['top_pool_provider_7d'] as PoolProvider[];
  }

  static VolumeParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Volume {
    const proto = $.parseStructProto(data, typeTag, repo, Volume);
    return new Volume(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Volume, typeParams);
    return result as unknown as Volume;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Volume, typeParams);
    await result.loadFullState(app);
    return result as unknown as Volume;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Volume', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function add_volume_(
  total_volume_array: TotalVolume[],
  round_start_time: U64,
  amount: U64,
  $c: AptosDataCache
): void {
  let array_length, total_volume;
  array_length = Stdlib.Vector.length_(total_volume_array, $c, [new SimpleStructTag(TotalVolume)]);
  if ($.copy(array_length).eq(u64('0'))) {
    Stdlib.Vector.push_back_(
      total_volume_array,
      new TotalVolume(
        { start_time: $.copy(round_start_time), amount: $.copy(amount) },
        new SimpleStructTag(TotalVolume)
      ),
      $c,
      [new SimpleStructTag(TotalVolume)]
    );
    return;
  } else {
  }
  total_volume = Stdlib.Vector.borrow_mut_(total_volume_array, $.copy(array_length).sub(u64('1')), $c, [
    new SimpleStructTag(TotalVolume)
  ]);
  if ($.copy(total_volume.start_time).eq($.copy(round_start_time))) {
    total_volume.amount = $.copy(total_volume.amount).add($.copy(amount));
  } else {
    Stdlib.Vector.push_back_(
      total_volume_array,
      new TotalVolume(
        { start_time: $.copy(round_start_time), amount: $.copy(amount) },
        new SimpleStructTag(TotalVolume)
      ),
      $c,
      [new SimpleStructTag(TotalVolume)]
    );
  }
  if ($.copy(array_length).gt($.copy(VOLUME_HISTORY_LENGTH))) {
    Stdlib.Vector.remove_(total_volume_array, u64('0'), $c, [new SimpleStructTag(TotalVolume)]);
  } else {
  }
  return;
}

export function clean_(poster: HexString, $c: AptosDataCache): void {
  let volume;
  volume = $c.borrow_global_mut<Volume>(
    new SimpleStructTag(Volume),
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039')
  );
  if (!(Stdlib.Signer.address_of_(poster, $c).hex() === $.copy(volume.poster).hex())) {
    throw $.abortCode($.copy(E_NOT_POSTER));
  }
  volume.total_volume = u128('0');
  volume.data_end_sequence_number = u64('0');
  volume.data_end_time = u64('0');
  volume.total_volume_history_24h = Stdlib.Vector.empty_($c, [new SimpleStructTag(TotalVolume)]);
  volume.total_volume_history_7d = Stdlib.Vector.empty_($c, [new SimpleStructTag(TotalVolume)]);
  volume.top_trading_pairs_24h = Stdlib.Vector.empty_($c, [new SimpleStructTag(TradingPair)]);
  volume.top_trading_pairs_7d = Stdlib.Vector.empty_($c, [new SimpleStructTag(TradingPair)]);
  volume.top_pool_provider_24h = Stdlib.Vector.empty_($c, [new SimpleStructTag(PoolProvider)]);
  volume.top_pool_provider_7d = Stdlib.Vector.empty_($c, [new SimpleStructTag(PoolProvider)]);
  return;
}

export function buildPayload_clean(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'volume',
    'clean',
    typeParamStrings,
    [],
    isJSON
  );
}

export function fetch_volume_(fetcher: HexString, $c: AptosDataCache): void {
  return $c.move_to(new SimpleStructTag(Volume), fetcher, get_volume_($c));
}

export function buildPayload_fetch_volume(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'volume',
    'fetch_volume',
    typeParamStrings,
    [],
    isJSON
  );
}

export async function query_fetch_volume(
  client: AptosClient,
  fetcher: $.SimulationKeys,
  repo: AptosParserRepo,
  $p: TypeTag[],
  option?: OptionTransaction,
  _isJSON = false
) {
  const payload = buildPayload_fetch_volume(_isJSON);
  const outputTypeTag = new SimpleStructTag(Volume);
  const output = await $.simulatePayloadTx(client, fetcher, payload, option);
  return $.takeSimulationValue<Volume>(output, outputTypeTag, repo);
}
export function get_volume_($c: AptosDataCache): Volume {
  return $.copy(
    $c.borrow_global<Volume>(
      new SimpleStructTag(Volume),
      new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039')
    )
  );
}

export function buildPayload_get_volume(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'volume',
    'get_volume',
    typeParamStrings,
    [],
    isJSON
  );
}
export function initialize_(admin: HexString, poster: HexString, $c: AptosDataCache): void {
  let admin_addr;
  admin_addr = Stdlib.Signer.address_of_(admin, $c);
  if (
    !(
      $.copy(admin_addr).hex() ===
      new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039').hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_ADMIN));
  }
  return $c.move_to(
    new SimpleStructTag(Volume),
    admin,
    new Volume(
      {
        poster: $.copy(poster),
        total_volume: u128('0'),
        last_24h_volume: u64('0'),
        last_7d_volume: u64('0'),
        data_end_sequence_number: u64('0'),
        data_end_time: u64('0'),
        volume_decimals: u64('4'),
        total_volume_history_24h: Stdlib.Vector.empty_($c, [new SimpleStructTag(TotalVolume)]),
        total_volume_history_7d: Stdlib.Vector.empty_($c, [new SimpleStructTag(TotalVolume)]),
        top_trading_pairs_24h: Stdlib.Vector.empty_($c, [new SimpleStructTag(TradingPair)]),
        top_trading_pairs_7d: Stdlib.Vector.empty_($c, [new SimpleStructTag(TradingPair)]),
        top_pool_provider_24h: Stdlib.Vector.empty_($c, [new SimpleStructTag(PoolProvider)]),
        top_pool_provider_7d: Stdlib.Vector.empty_($c, [new SimpleStructTag(PoolProvider)])
      },
      new SimpleStructTag(Volume)
    )
  );
}

export function buildPayload_initialize(
  poster: HexString,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'volume',
    'initialize',
    typeParamStrings,
    [poster],
    isJSON
  );
}

export function parse_pool_provider_vector_(
  dex_type_vector: U8[],
  amount_vector: U64[],
  $c: AptosDataCache
): PoolProvider[] {
  let i, pool_provider;
  pool_provider = Stdlib.Vector.empty_($c, [new SimpleStructTag(PoolProvider)]);
  i = u64('0');
  while ($.copy(i).lt(Stdlib.Vector.length_(dex_type_vector, $c, [AtomicTypeTag.U8]))) {
    {
      Stdlib.Vector.push_back_(
        pool_provider,
        new PoolProvider(
          {
            dex_type: $.copy(Stdlib.Vector.borrow_(dex_type_vector, $.copy(i), $c, [AtomicTypeTag.U8])),
            amount: $.copy(Stdlib.Vector.borrow_(amount_vector, $.copy(i), $c, [AtomicTypeTag.U64]))
          },
          new SimpleStructTag(PoolProvider)
        ),
        $c,
        [new SimpleStructTag(PoolProvider)]
      );
      i = $.copy(i).add(u64('1'));
    }
  }
  return $.copy(pool_provider);
}

export function parse_trading_pairs_vector_(
  coin_x_vector: U8[][],
  coin_y_vector: U8[][],
  amount_vector: U64[],
  $c: AptosDataCache
): TradingPair[] {
  let i, trading_pairs;
  trading_pairs = Stdlib.Vector.empty_($c, [new SimpleStructTag(TradingPair)]);
  i = u64('0');
  while ($.copy(i).lt(Stdlib.Vector.length_(coin_x_vector, $c, [new VectorTag(AtomicTypeTag.U8)]))) {
    {
      Stdlib.Vector.push_back_(
        trading_pairs,
        new TradingPair(
          {
            coin_x: Stdlib.String.utf8_(
              $.copy(Stdlib.Vector.borrow_(coin_x_vector, $.copy(i), $c, [new VectorTag(AtomicTypeTag.U8)])),
              $c
            ),
            coin_y: Stdlib.String.utf8_(
              $.copy(Stdlib.Vector.borrow_(coin_y_vector, $.copy(i), $c, [new VectorTag(AtomicTypeTag.U8)])),
              $c
            ),
            amount: $.copy(Stdlib.Vector.borrow_(amount_vector, $.copy(i), $c, [AtomicTypeTag.U64]))
          },
          new SimpleStructTag(TradingPair)
        ),
        $c,
        [new SimpleStructTag(TradingPair)]
      );
      i = $.copy(i).add(u64('1'));
    }
  }
  return $.copy(trading_pairs);
}

export function post_(
  poster: HexString,
  amount: U64,
  last_24_volume: U64,
  last_7d_volume: U64,
  round_start_time_24h: U64,
  round_start_time_7d: U64,
  new_data_end_time: U64,
  new_data_end_seauence_number: U64,
  trading_pairs_24h_coin_x: U8[][],
  trading_pairs_24h_coin_y: U8[][],
  trading_pairs_24h_amount: U64[],
  trading_pairs_7d_coin_x: U8[][],
  trading_pairs_7d_coin_y: U8[][],
  trading_pairs_7d_amount: U64[],
  pool_provider_24h_dex_type: U8[],
  pool_provider_24h_amount: U64[],
  pool_provider_7d_dex_type: U8[],
  pool_provider_7d_amount: U64[],
  $c: AptosDataCache
): void {
  let temp$1, volume;
  volume = $c.borrow_global_mut<Volume>(
    new SimpleStructTag(Volume),
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039')
  );
  if (!(Stdlib.Signer.address_of_(poster, $c).hex() === $.copy(volume.poster).hex())) {
    throw $.abortCode($.copy(E_NOT_POSTER));
  }
  if ($.copy(volume.data_end_sequence_number).eq(u64('0'))) {
    temp$1 = true;
  } else {
    temp$1 = $.copy(new_data_end_seauence_number).neq($.copy(volume.data_end_sequence_number));
  }
  if (!temp$1) {
    throw $.abortCode($.copy(E_REPEAT_POST));
  }
  if (
    !Stdlib.Vector.length_(trading_pairs_24h_coin_x, $c, [new VectorTag(AtomicTypeTag.U8)]).eq(
      Stdlib.Vector.length_(trading_pairs_24h_coin_y, $c, [new VectorTag(AtomicTypeTag.U8)])
    )
  ) {
    throw $.abortCode($.copy(E_VERCTOR_LENGT_NOT_EQUAL));
  }
  if (
    !Stdlib.Vector.length_(trading_pairs_24h_coin_x, $c, [new VectorTag(AtomicTypeTag.U8)]).eq(
      Stdlib.Vector.length_(trading_pairs_24h_amount, $c, [AtomicTypeTag.U64])
    )
  ) {
    throw $.abortCode($.copy(E_VERCTOR_LENGT_NOT_EQUAL));
  }
  if (
    !Stdlib.Vector.length_(trading_pairs_7d_coin_x, $c, [new VectorTag(AtomicTypeTag.U8)]).eq(
      Stdlib.Vector.length_(trading_pairs_7d_coin_y, $c, [new VectorTag(AtomicTypeTag.U8)])
    )
  ) {
    throw $.abortCode($.copy(E_VERCTOR_LENGT_NOT_EQUAL));
  }
  if (
    !Stdlib.Vector.length_(trading_pairs_7d_coin_x, $c, [new VectorTag(AtomicTypeTag.U8)]).eq(
      Stdlib.Vector.length_(trading_pairs_7d_amount, $c, [AtomicTypeTag.U64])
    )
  ) {
    throw $.abortCode($.copy(E_VERCTOR_LENGT_NOT_EQUAL));
  }
  if (
    !Stdlib.Vector.length_(pool_provider_24h_dex_type, $c, [AtomicTypeTag.U8]).eq(
      Stdlib.Vector.length_(pool_provider_24h_amount, $c, [AtomicTypeTag.U64])
    )
  ) {
    throw $.abortCode($.copy(E_VERCTOR_LENGT_NOT_EQUAL));
  }
  if (
    !Stdlib.Vector.length_(pool_provider_7d_dex_type, $c, [AtomicTypeTag.U8]).eq(
      Stdlib.Vector.length_(pool_provider_7d_amount, $c, [AtomicTypeTag.U64])
    )
  ) {
    throw $.abortCode($.copy(E_VERCTOR_LENGT_NOT_EQUAL));
  }
  volume.last_24h_volume = $.copy(last_24_volume);
  volume.last_7d_volume = $.copy(last_7d_volume);
  volume.data_end_time = $.copy(new_data_end_time);
  volume.data_end_sequence_number = $.copy(new_data_end_seauence_number);
  volume.total_volume = $.copy(volume.total_volume).add(u128($.copy(amount)));
  add_volume_(volume.total_volume_history_24h, $.copy(round_start_time_24h), $.copy(amount), $c);
  add_volume_(volume.total_volume_history_7d, $.copy(round_start_time_7d), $.copy(amount), $c);
  volume.top_trading_pairs_24h = parse_trading_pairs_vector_(
    trading_pairs_24h_coin_x,
    trading_pairs_24h_coin_y,
    trading_pairs_24h_amount,
    $c
  );
  volume.top_trading_pairs_7d = parse_trading_pairs_vector_(
    trading_pairs_7d_coin_x,
    trading_pairs_7d_coin_y,
    trading_pairs_7d_amount,
    $c
  );
  volume.top_pool_provider_24h = parse_pool_provider_vector_(pool_provider_24h_dex_type, pool_provider_24h_amount, $c);
  volume.top_pool_provider_7d = parse_pool_provider_vector_(pool_provider_7d_dex_type, pool_provider_7d_amount, $c);
  return;
}

export function buildPayload_post(
  amount: U64,
  last_24_volume: U64,
  last_7d_volume: U64,
  round_start_time_24h: U64,
  round_start_time_7d: U64,
  new_data_end_time: U64,
  new_data_end_seauence_number: U64,
  trading_pairs_24h_coin_x: U8[][],
  trading_pairs_24h_coin_y: U8[][],
  trading_pairs_24h_amount: U64[],
  trading_pairs_7d_coin_x: U8[][],
  trading_pairs_7d_coin_y: U8[][],
  trading_pairs_7d_amount: U64[],
  pool_provider_24h_dex_type: U8[],
  pool_provider_24h_amount: U64[],
  pool_provider_7d_dex_type: U8[],
  pool_provider_7d_amount: U64[],
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'volume',
    'post',
    typeParamStrings,
    [
      amount,
      last_24_volume,
      last_7d_volume,
      round_start_time_24h,
      round_start_time_7d,
      new_data_end_time,
      new_data_end_seauence_number,
      trading_pairs_24h_coin_x,
      trading_pairs_24h_coin_y,
      trading_pairs_24h_amount,
      trading_pairs_7d_coin_x,
      trading_pairs_7d_coin_y,
      trading_pairs_7d_amount,
      pool_provider_24h_dex_type,
      pool_provider_24h_amount,
      pool_provider_7d_dex_type,
      pool_provider_7d_amount
    ],
    isJSON
  );
}
export function set_poster_(admin: HexString, new_poster: HexString, $c: AptosDataCache): void {
  let admin_addr, volume;
  admin_addr = Stdlib.Signer.address_of_(admin, $c);
  if (
    !(
      $.copy(admin_addr).hex() ===
      new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039').hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_ADMIN));
  }
  volume = $c.borrow_global_mut<Volume>(new SimpleStructTag(Volume), $.copy(admin_addr));
  volume.poster = $.copy(new_poster);
  return;
}

export function buildPayload_set_poster(
  new_poster: HexString,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'volume',
    'set_poster',
    typeParamStrings,
    [new_poster],
    isJSON
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039::volume::PoolProvider',
    PoolProvider.PoolProviderParser
  );
  repo.addParser(
    '0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039::volume::TotalVolume',
    TotalVolume.TotalVolumeParser
  );
  repo.addParser(
    '0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039::volume::TradingPair',
    TradingPair.TradingPairParser
  );
  repo.addParser(
    '0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039::volume::Volume',
    Volume.VolumeParser
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
  get PoolProvider() {
    return PoolProvider;
  }
  get TotalVolume() {
    return TotalVolume;
  }
  get TradingPair() {
    return TradingPair;
  }
  get Volume() {
    return Volume;
  }
  async loadVolume(owner: HexString, loadFull = true, fillCache = true) {
    const val = await Volume.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  payload_clean(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_clean(isJSON);
  }
  async clean(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_clean(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_fetch_volume(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_fetch_volume(isJSON);
  }
  async fetch_volume(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_fetch_volume(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  async query_fetch_volume(fetcher: $.SimulationKeys, $p: TypeTag[], option?: OptionTransaction, _isJSON = false) {
    return query_fetch_volume(this.client, fetcher, this.repo, $p, option);
  }
  payload_get_volume(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_get_volume(isJSON);
  }
  async get_volume(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_get_volume(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_initialize(
    poster: HexString,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_initialize(poster, isJSON);
  }
  async initialize(_account: AptosAccount, poster: HexString, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_initialize(poster, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_post(
    amount: U64,
    last_24_volume: U64,
    last_7d_volume: U64,
    round_start_time_24h: U64,
    round_start_time_7d: U64,
    new_data_end_time: U64,
    new_data_end_seauence_number: U64,
    trading_pairs_24h_coin_x: U8[][],
    trading_pairs_24h_coin_y: U8[][],
    trading_pairs_24h_amount: U64[],
    trading_pairs_7d_coin_x: U8[][],
    trading_pairs_7d_coin_y: U8[][],
    trading_pairs_7d_amount: U64[],
    pool_provider_24h_dex_type: U8[],
    pool_provider_24h_amount: U64[],
    pool_provider_7d_dex_type: U8[],
    pool_provider_7d_amount: U64[],
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_post(
      amount,
      last_24_volume,
      last_7d_volume,
      round_start_time_24h,
      round_start_time_7d,
      new_data_end_time,
      new_data_end_seauence_number,
      trading_pairs_24h_coin_x,
      trading_pairs_24h_coin_y,
      trading_pairs_24h_amount,
      trading_pairs_7d_coin_x,
      trading_pairs_7d_coin_y,
      trading_pairs_7d_amount,
      pool_provider_24h_dex_type,
      pool_provider_24h_amount,
      pool_provider_7d_dex_type,
      pool_provider_7d_amount,
      isJSON
    );
  }
  async post(
    _account: AptosAccount,
    amount: U64,
    last_24_volume: U64,
    last_7d_volume: U64,
    round_start_time_24h: U64,
    round_start_time_7d: U64,
    new_data_end_time: U64,
    new_data_end_seauence_number: U64,
    trading_pairs_24h_coin_x: U8[][],
    trading_pairs_24h_coin_y: U8[][],
    trading_pairs_24h_amount: U64[],
    trading_pairs_7d_coin_x: U8[][],
    trading_pairs_7d_coin_y: U8[][],
    trading_pairs_7d_amount: U64[],
    pool_provider_24h_dex_type: U8[],
    pool_provider_24h_amount: U64[],
    pool_provider_7d_dex_type: U8[],
    pool_provider_7d_amount: U64[],
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload = buildPayload_post(
      amount,
      last_24_volume,
      last_7d_volume,
      round_start_time_24h,
      round_start_time_7d,
      new_data_end_time,
      new_data_end_seauence_number,
      trading_pairs_24h_coin_x,
      trading_pairs_24h_coin_y,
      trading_pairs_24h_amount,
      trading_pairs_7d_coin_x,
      trading_pairs_7d_coin_y,
      trading_pairs_7d_amount,
      pool_provider_24h_dex_type,
      pool_provider_24h_amount,
      pool_provider_7d_dex_type,
      pool_provider_7d_amount,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_set_poster(
    new_poster: HexString,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_set_poster(new_poster, isJSON);
  }
  async set_poster(_account: AptosAccount, new_poster: HexString, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_set_poster(new_poster, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
}
