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
import * as Stdlib from "../stdlib";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString(
  "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
);
export const moduleName = "volume";

export const E_NOT_ADMIN: U64 = u64("1");
export const E_NOT_POSTER: U64 = u64("2");
export const E_REPEAT_POST: U64 = u64("3");
export const PERIOD_LENGTH_24H: U64 = u64("24").mul(u64("60")).mul(u64("60"));
export const PERIOD_LENGTH_7D: U64 = u64("7")
  .mul(u64("24"))
  .mul(u64("60"))
  .mul(u64("60"));
export const VOLUME_HISTORY_LENGTH: U64 = u64("30");

export class PoolProvider {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PoolProvider";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "dex_type", typeTag: AtomicTypeTag.U8 },
    { name: "amount", typeTag: AtomicTypeTag.U8 },
  ];

  dex_type: U8;
  amount: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dex_type = proto["dex_type"] as U8;
    this.amount = proto["amount"] as U8;
  }

  static PoolProviderParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): PoolProvider {
    const proto = $.parseStructProto(data, typeTag, repo, PoolProvider);
    return new PoolProvider(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "PoolProvider", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class TotalVolume {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "TotalVolume";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "start_time", typeTag: AtomicTypeTag.U64 },
    { name: "end_time", typeTag: AtomicTypeTag.U64 },
    { name: "amount", typeTag: AtomicTypeTag.U64 },
  ];

  start_time: U64;
  end_time: U64;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.start_time = proto["start_time"] as U64;
    this.end_time = proto["end_time"] as U64;
    this.amount = proto["amount"] as U64;
  }

  static TotalVolumeParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): TotalVolume {
    const proto = $.parseStructProto(data, typeTag, repo, TotalVolume);
    return new TotalVolume(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "TotalVolume", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class TradingPair {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "TradingPair";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: "x_type_info",
      typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []),
    },
    {
      name: "y_type_info",
      typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []),
    },
    { name: "amount", typeTag: AtomicTypeTag.U64 },
  ];

  x_type_info: Stdlib.Type_info.TypeInfo;
  y_type_info: Stdlib.Type_info.TypeInfo;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.x_type_info = proto["x_type_info"] as Stdlib.Type_info.TypeInfo;
    this.y_type_info = proto["y_type_info"] as Stdlib.Type_info.TypeInfo;
    this.amount = proto["amount"] as U64;
  }

  static TradingPairParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): TradingPair {
    const proto = $.parseStructProto(data, typeTag, repo, TradingPair);
    return new TradingPair(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "TradingPair", []);
  }
  async loadFullState(app: $.AppType) {
    await this.x_type_info.loadFullState(app);
    await this.y_type_info.loadFullState(app);
    this.__app = app;
  }
}

export class Volume {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Volume";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "poster", typeTag: AtomicTypeTag.Address },
    { name: "data_end_sequence_number", typeTag: AtomicTypeTag.U64 },
    { name: "data_end_time", typeTag: AtomicTypeTag.U64 },
    { name: "volume_decimals", typeTag: AtomicTypeTag.U64 },
    {
      name: "total_volume_history_24h",
      typeTag: new VectorTag(
        new StructTag(
          new HexString(
            "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
          ),
          "volume",
          "TotalVolume",
          []
        )
      ),
    },
    {
      name: "total_volume_history_7d",
      typeTag: new VectorTag(
        new StructTag(
          new HexString(
            "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
          ),
          "volume",
          "TotalVolume",
          []
        )
      ),
    },
    {
      name: "top_trading_pairs_24h",
      typeTag: new VectorTag(
        new StructTag(
          new HexString(
            "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
          ),
          "volume",
          "TradingPair",
          []
        )
      ),
    },
    {
      name: "top_trading_pairs_7d",
      typeTag: new VectorTag(
        new StructTag(
          new HexString(
            "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
          ),
          "volume",
          "TradingPair",
          []
        )
      ),
    },
    {
      name: "top_pool_provider_24h",
      typeTag: new VectorTag(
        new StructTag(
          new HexString(
            "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
          ),
          "volume",
          "PoolProvider",
          []
        )
      ),
    },
    {
      name: "top_pool_provider_7d",
      typeTag: new VectorTag(
        new StructTag(
          new HexString(
            "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
          ),
          "volume",
          "PoolProvider",
          []
        )
      ),
    },
  ];

  poster: HexString;
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
    this.poster = proto["poster"] as HexString;
    this.data_end_sequence_number = proto["data_end_sequence_number"] as U64;
    this.data_end_time = proto["data_end_time"] as U64;
    this.volume_decimals = proto["volume_decimals"] as U64;
    this.total_volume_history_24h = proto[
      "total_volume_history_24h"
    ] as TotalVolume[];
    this.total_volume_history_7d = proto[
      "total_volume_history_7d"
    ] as TotalVolume[];
    this.top_trading_pairs_24h = proto[
      "top_trading_pairs_24h"
    ] as TradingPair[];
    this.top_trading_pairs_7d = proto["top_trading_pairs_7d"] as TradingPair[];
    this.top_pool_provider_24h = proto[
      "top_pool_provider_24h"
    ] as PoolProvider[];
    this.top_pool_provider_7d = proto["top_pool_provider_7d"] as PoolProvider[];
  }

  static VolumeParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): Volume {
    const proto = $.parseStructProto(data, typeTag, repo, Volume);
    return new Volume(proto, typeTag);
  }

  static async load(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[]
  ) {
    const result = await repo.loadResource(client, address, Volume, typeParams);
    return result as unknown as Volume;
  }
  static async loadByApp(
    app: $.AppType,
    address: HexString,
    typeParams: TypeTag[]
  ) {
    const result = await app.repo.loadResource(
      app.client,
      address,
      Volume,
      typeParams
    );
    await result.loadFullState(app);
    return result as unknown as Volume;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Volume", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function add_volume_(
  total_volume_array: TotalVolume[],
  round_start_time: U64,
  data_end_time: U64,
  peroid_length: U64,
  amount: U64,
  $c: AptosDataCache
): void {
  let temp$1, array_length, total_volume;
  array_length = Stdlib.Vector.length_(total_volume_array, $c, [
    new SimpleStructTag(TotalVolume),
  ]);
  if ($.copy(array_length).eq(u64("0"))) {
    Stdlib.Vector.push_back_(
      total_volume_array,
      new TotalVolume(
        {
          start_time: $.copy(round_start_time),
          end_time: $.copy(data_end_time),
          amount: $.copy(amount),
        },
        new SimpleStructTag(TotalVolume)
      ),
      $c,
      [new SimpleStructTag(TotalVolume)]
    );
    return;
  } else {
  }
  total_volume = Stdlib.Vector.borrow_mut_(
    total_volume_array,
    $.copy(array_length).sub(u64("1")),
    $c,
    [new SimpleStructTag(TotalVolume)]
  );
  if ($.copy(total_volume.start_time).eq($.copy(round_start_time))) {
    temp$1 = true;
  } else {
    temp$1 = $.copy(total_volume.start_time)
      .add($.copy(peroid_length))
      .le($.copy(data_end_time));
  }
  if (temp$1) {
    total_volume.amount = $.copy(total_volume.amount).add($.copy(amount));
  } else {
    Stdlib.Vector.push_back_(
      total_volume_array,
      new TotalVolume(
        {
          start_time: $.copy(round_start_time),
          end_time: $.copy(data_end_time),
          amount: $.copy(amount),
        },
        new SimpleStructTag(TotalVolume)
      ),
      $c,
      [new SimpleStructTag(TotalVolume)]
    );
  }
  if ($.copy(array_length).gt($.copy(VOLUME_HISTORY_LENGTH))) {
    Stdlib.Vector.remove_(total_volume_array, u64("0"), $c, [
      new SimpleStructTag(TotalVolume),
    ]);
  } else {
  }
  return;
}

export function fetch_volume_(fetcher: HexString, $c: AptosDataCache): void {
  return $c.move_to(new SimpleStructTag(Volume), fetcher, get_volume_($c));
}

export function buildPayload_fetch_volume(
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "volume",
    "fetch_volume",
    typeParamStrings,
    [],
    isJSON
  );
}

export async function query_fetch_volume(
  client: AptosClient,
  fetcher: $.SimulationKeys,
  repo: AptosParserRepo,
  $p: TypeTag[]
) {
  const payload = buildPayload_fetch_volume();
  const outputTypeTag = new SimpleStructTag(Volume);
  const output = await $.simulatePayloadTx(client, fetcher, payload);
  return $.takeSimulationValue<Volume>(output, outputTypeTag, repo);
}
function make_query_fetch_volume(app: App) {
  function maker(fetcher: $.SimulationKeys, $p: TypeTag[]) {
    return query_fetch_volume(app.client, fetcher, app.repo, $p);
  }
  return maker;
}
export function get_volume_($c: AptosDataCache): Volume {
  return $.copy(
    $c.borrow_global<Volume>(
      new SimpleStructTag(Volume),
      new HexString(
        "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
      )
    )
  );
}

export function buildPayload_get_volume(
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "volume",
    "get_volume",
    typeParamStrings,
    [],
    isJSON
  );
}
export function initialize_(
  admin: HexString,
  poster: HexString,
  $c: AptosDataCache
): void {
  let admin_addr;
  admin_addr = Stdlib.Signer.address_of_(admin, $c);
  if (
    !(
      $.copy(admin_addr).hex() ===
      new HexString(
        "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
      ).hex()
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
        data_end_sequence_number: u64("0"),
        data_end_time: u64("0"),
        volume_decimals: u64("4"),
        total_volume_history_24h: Stdlib.Vector.empty_($c, [
          new SimpleStructTag(TotalVolume),
        ]),
        total_volume_history_7d: Stdlib.Vector.empty_($c, [
          new SimpleStructTag(TotalVolume),
        ]),
        top_trading_pairs_24h: Stdlib.Vector.empty_($c, [
          new SimpleStructTag(TradingPair),
        ]),
        top_trading_pairs_7d: Stdlib.Vector.empty_($c, [
          new SimpleStructTag(TradingPair),
        ]),
        top_pool_provider_24h: Stdlib.Vector.empty_($c, [
          new SimpleStructTag(PoolProvider),
        ]),
        top_pool_provider_7d: Stdlib.Vector.empty_($c, [
          new SimpleStructTag(PoolProvider),
        ]),
      },
      new SimpleStructTag(Volume)
    )
  );
}

export function buildPayload_initialize(
  poster: HexString,
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "volume",
    "initialize",
    typeParamStrings,
    [poster],
    isJSON
  );
}

export function newTradingPair_(
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): TradingPair {
  return new TradingPair(
    {
      x_type_info: Stdlib.Type_info.type_of_($c, [
        new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]]),
      ]),
      y_type_info: Stdlib.Type_info.type_of_($c, [
        new StructTag(new HexString("0x1"), "coin", "Coin", [$p[1]]),
      ]),
      amount: $.copy(amount),
    },
    new SimpleStructTag(TradingPair)
  );
}

export function post_(
  poster: HexString,
  amount: U64,
  round_start_time_24h: U64,
  round_start_time_7d: U64,
  new_data_end_time: U64,
  new_data_end_seauence_number: U64,
  trading_pairs_24h: TradingPair[],
  trading_pairs_7d: TradingPair[],
  pool_provider_24h: PoolProvider[],
  pool_provider_7d: PoolProvider[],
  $c: AptosDataCache
): void {
  let volume;
  volume = $c.borrow_global_mut<Volume>(
    new SimpleStructTag(Volume),
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    )
  );
  if (
    !(
      Stdlib.Signer.address_of_(poster, $c).hex() ===
      $.copy(volume.poster).hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_POSTER));
  }
  if (!$.copy(new_data_end_time).neq($.copy(volume.data_end_time))) {
    throw $.abortCode($.copy(E_REPEAT_POST));
  }
  if (
    !$.copy(new_data_end_seauence_number).neq(
      $.copy(volume.data_end_sequence_number)
    )
  ) {
    throw $.abortCode($.copy(E_REPEAT_POST));
  }
  add_volume_(
    volume.total_volume_history_24h,
    $.copy(round_start_time_24h),
    $.copy(new_data_end_time),
    $.copy(PERIOD_LENGTH_24H),
    $.copy(amount),
    $c
  );
  add_volume_(
    volume.total_volume_history_7d,
    $.copy(round_start_time_7d),
    $.copy(new_data_end_time),
    $.copy(PERIOD_LENGTH_7D),
    $.copy(amount),
    $c
  );
  volume.data_end_sequence_number = $.copy(new_data_end_seauence_number);
  volume.data_end_time = $.copy(new_data_end_time);
  volume.top_trading_pairs_24h = $.copy(trading_pairs_24h);
  volume.top_trading_pairs_7d = $.copy(trading_pairs_7d);
  volume.top_pool_provider_24h = $.copy(pool_provider_24h);
  volume.top_pool_provider_7d = $.copy(pool_provider_7d);
  return;
}

export function set_poster_(
  admin: HexString,
  new_poster: HexString,
  $c: AptosDataCache
): void {
  let admin_addr, volume;
  admin_addr = Stdlib.Signer.address_of_(admin, $c);
  if (
    !(
      $.copy(admin_addr).hex() ===
      new HexString(
        "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
      ).hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_ADMIN));
  }
  volume = $c.borrow_global_mut<Volume>(
    new SimpleStructTag(Volume),
    $.copy(admin_addr)
  );
  volume.poster = $.copy(new_poster);
  return;
}

export function buildPayload_set_poster(
  new_poster: HexString,
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "volume",
    "set_poster",
    typeParamStrings,
    [new_poster],
    isJSON
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::volume::PoolProvider",
    PoolProvider.PoolProviderParser
  );
  repo.addParser(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::volume::TotalVolume",
    TotalVolume.TotalVolumeParser
  );
  repo.addParser(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::volume::TradingPair",
    TradingPair.TradingPairParser
  );
  repo.addParser(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::volume::Volume",
    Volume.VolumeParser
  );
}
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
  async loadVolume(owner: HexString, loadFull = true) {
    const val = await Volume.load(
      this.repo,
      this.client,
      owner,
      [] as TypeTag[]
    );
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  payload_fetch_volume(
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_fetch_volume(isJSON);
  }
  async fetch_volume(_account: AptosAccount, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_fetch_volume(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  get query_fetch_volume() {
    return make_query_fetch_volume(this);
  }
  payload_get_volume(
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_get_volume(isJSON);
  }
  async get_volume(_account: AptosAccount, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_get_volume(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_initialize(
    poster: HexString,
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_initialize(poster, isJSON);
  }
  async initialize(
    _account: AptosAccount,
    poster: HexString,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_initialize(poster, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_set_poster(
    new_poster: HexString,
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_set_poster(new_poster, isJSON);
  }
  async set_poster(
    _account: AptosAccount,
    new_poster: HexString,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_set_poster(new_poster, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
