import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'Econia';
export const moduleAddress = new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778');
export const moduleName = 'registry';

export const E_INVALID_BASE_ASSET: U64 = u64('10');
export const E_INVALID_CUSTODIAN: U64 = u64('5');
export const E_INVALID_MARKET_ID: U64 = u64('9');
export const E_INVALID_QUOTE_ASSET: U64 = u64('11');
export const E_LOT_SIZE_0: U64 = u64('3');
export const E_MARKET_EXISTS: U64 = u64('7');
export const E_NOT_ECONIA: U64 = u64('0');
export const E_NOT_IN_MARKET_PAIR: U64 = u64('8');
export const E_NO_REGISTRY: U64 = u64('2');
export const E_REGISTRY_EXISTS: U64 = u64('1');
export const E_SAME_COIN: U64 = u64('6');
export const E_TICK_SIZE_0: U64 = u64('4');
export const NO_CUSTODIAN: U64 = u64('0');
export const PURE_COIN_PAIR: U64 = u64('0');

export class CustodianCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'CustodianCapability';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [{ name: 'custodian_id', typeTag: AtomicTypeTag.U64 }];

  custodian_id: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.custodian_id = proto['custodian_id'] as U64;
  }

  static CustodianCapabilityParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): CustodianCapability {
    const proto = $.parseStructProto(data, typeTag, repo, CustodianCapability);
    return new CustodianCapability(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'CustodianCapability', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class GenericAsset {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'GenericAsset';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static GenericAssetParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): GenericAsset {
    const proto = $.parseStructProto(data, typeTag, repo, GenericAsset);
    return new GenericAsset(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'GenericAsset', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class MarketInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'MarketInfo';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'host', typeTag: AtomicTypeTag.Address },
    {
      name: 'trading_pair_info',
      typeTag: new StructTag(
        new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
        'registry',
        'TradingPairInfo',
        []
      )
    }
  ];

  host: HexString;
  trading_pair_info: TradingPairInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.host = proto['host'] as HexString;
    this.trading_pair_info = proto['trading_pair_info'] as TradingPairInfo;
  }

  static MarketInfoParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): MarketInfo {
    const proto = $.parseStructProto(data, typeTag, repo, MarketInfo);
    return new MarketInfo(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'MarketInfo', []);
  }
  async loadFullState(app: $.AppType) {
    await this.trading_pair_info.loadFullState(app);
    this.__app = app;
  }
}

export class Registry {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Registry';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: 'hosts',
      typeTag: new StructTag(new HexString('0x1'), 'table', 'Table', [
        new StructTag(
          new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
          'registry',
          'TradingPairInfo',
          []
        ),
        AtomicTypeTag.Address
      ])
    },
    {
      name: 'markets',
      typeTag: new VectorTag(
        new StructTag(
          new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
          'registry',
          'MarketInfo',
          []
        )
      )
    },
    { name: 'n_custodians', typeTag: AtomicTypeTag.U64 }
  ];

  hosts: Stdlib.Table.Table;
  markets: MarketInfo[];
  n_custodians: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.hosts = proto['hosts'] as Stdlib.Table.Table;
    this.markets = proto['markets'] as MarketInfo[];
    this.n_custodians = proto['n_custodians'] as U64;
  }

  static RegistryParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Registry {
    const proto = $.parseStructProto(data, typeTag, repo, Registry);
    return new Registry(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Registry, typeParams);
    return result as unknown as Registry;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Registry, typeParams);
    await result.loadFullState(app);
    return result as unknown as Registry;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Registry', []);
  }
  async loadFullState(app: $.AppType) {
    await this.hosts.loadFullState(app);
    this.__app = app;
  }
}

export class TradingPairInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'TradingPairInfo';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'base_type_info', typeTag: new StructTag(new HexString('0x1'), 'type_info', 'TypeInfo', []) },
    { name: 'quote_type_info', typeTag: new StructTag(new HexString('0x1'), 'type_info', 'TypeInfo', []) },
    { name: 'lot_size', typeTag: AtomicTypeTag.U64 },
    { name: 'tick_size', typeTag: AtomicTypeTag.U64 },
    { name: 'generic_asset_transfer_custodian_id', typeTag: AtomicTypeTag.U64 },
    { name: 'agnostic_disambiguator', typeTag: AtomicTypeTag.U64 }
  ];

  base_type_info: Stdlib.Type_info.TypeInfo;
  quote_type_info: Stdlib.Type_info.TypeInfo;
  lot_size: U64;
  tick_size: U64;
  generic_asset_transfer_custodian_id: U64;
  agnostic_disambiguator: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.base_type_info = proto['base_type_info'] as Stdlib.Type_info.TypeInfo;
    this.quote_type_info = proto['quote_type_info'] as Stdlib.Type_info.TypeInfo;
    this.lot_size = proto['lot_size'] as U64;
    this.tick_size = proto['tick_size'] as U64;
    this.generic_asset_transfer_custodian_id = proto['generic_asset_transfer_custodian_id'] as U64;
    this.agnostic_disambiguator = proto['agnostic_disambiguator'] as U64;
  }

  static TradingPairInfoParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): TradingPairInfo {
    const proto = $.parseStructProto(data, typeTag, repo, TradingPairInfo);
    return new TradingPairInfo(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'TradingPairInfo', []);
  }
  async loadFullState(app: $.AppType) {
    await this.base_type_info.loadFullState(app);
    await this.quote_type_info.loadFullState(app);
    this.__app = app;
  }
}
export function custodian_id_(custodian_capability_ref: CustodianCapability, $c: AptosDataCache): U64 {
  return $.copy(custodian_capability_ref.custodian_id);
}

export function get_verified_market_custodian_id_(
  market_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): U64 {
  let registry_ref, trading_pair_info_ref;
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    throw $.abortCode($.copy(E_NO_REGISTRY));
  }
  registry_ref = $c.borrow_global<Registry>(
    new SimpleStructTag(Registry),
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
  );
  if (!$.copy(market_id).lt(Stdlib.Vector.length_(registry_ref.markets, $c, [new SimpleStructTag(MarketInfo)]))) {
    throw $.abortCode($.copy(E_INVALID_MARKET_ID));
  }
  trading_pair_info_ref = Stdlib.Vector.borrow_(registry_ref.markets, $.copy(market_id), $c, [
    new SimpleStructTag(MarketInfo)
  ]).trading_pair_info;
  if (!$.deep_eq($.copy(trading_pair_info_ref.base_type_info), Stdlib.Type_info.type_of_($c, [$p[0]]))) {
    throw $.abortCode($.copy(E_INVALID_BASE_ASSET));
  }
  if (!$.deep_eq($.copy(trading_pair_info_ref.quote_type_info), Stdlib.Type_info.type_of_($c, [$p[1]]))) {
    throw $.abortCode($.copy(E_INVALID_QUOTE_ASSET));
  }
  return $.copy(trading_pair_info_ref.generic_asset_transfer_custodian_id);
}

export function init_registry_(account: HexString, $c: AptosDataCache): void {
  if (
    !(
      Stdlib.Signer.address_of_(account, $c).hex() ===
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778').hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_ECONIA));
  }
  if (
    !!$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    throw $.abortCode($.copy(E_REGISTRY_EXISTS));
  }
  $c.move_to(
    new SimpleStructTag(Registry),
    account,
    new Registry(
      {
        hosts: Stdlib.Table.new___($c, [new SimpleStructTag(TradingPairInfo), AtomicTypeTag.Address]),
        markets: Stdlib.Vector.empty_($c, [new SimpleStructTag(MarketInfo)]),
        n_custodians: u64('0')
      },
      new SimpleStructTag(Registry)
    )
  );
  return;
}

export function buildPayload_init_registry(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
    'registry',
    'init_registry',
    typeParamStrings,
    [],
    isJSON
  );
}

export function is_base_asset_(market_info: MarketInfo, $c: AptosDataCache, $p: TypeTag[] /* <T>*/): boolean {
  let type_info;
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  if ($.deep_eq($.copy(type_info), $.copy(market_info.trading_pair_info.base_type_info))) {
    return true;
  } else {
  }
  if ($.deep_eq($.copy(type_info), $.copy(market_info.trading_pair_info.quote_type_info))) {
    return false;
  } else {
  }
  throw $.abortCode($.copy(E_NOT_IN_MARKET_PAIR));
}

export function is_base_or_quote_(market_info: MarketInfo, $c: AptosDataCache, $p: TypeTag[] /* <T>*/): boolean {
  let temp$1, type_info;
  type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  if ($.deep_eq($.copy(type_info), $.copy(market_info.trading_pair_info.base_type_info))) {
    temp$1 = true;
  } else {
    temp$1 = $.deep_eq($.copy(type_info), $.copy(market_info.trading_pair_info.quote_type_info));
  }
  return temp$1;
}

export function is_registered_custodian_id_(custodian_id: U64, $c: AptosDataCache): boolean {
  let temp$1;
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    return false;
  } else {
  }
  if ($.copy(custodian_id).le(n_custodians_($c))) {
    temp$1 = $.copy(custodian_id).neq($.copy(NO_CUSTODIAN));
  } else {
    temp$1 = false;
  }
  return temp$1;
}

export function is_registered_trading_pair_(trading_pair_info: TradingPairInfo, $c: AptosDataCache): boolean {
  let registry_ref;
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    return false;
  } else {
  }
  registry_ref = $c.borrow_global<Registry>(
    new SimpleStructTag(Registry),
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
  );
  return Stdlib.Table.contains_(registry_ref.hosts, $.copy(trading_pair_info), $c, [
    new SimpleStructTag(TradingPairInfo),
    AtomicTypeTag.Address
  ]);
}

export function n_custodians_($c: AptosDataCache): U64 {
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    throw $.abortCode($.copy(E_NO_REGISTRY));
  }
  return $.copy(
    $c.borrow_global<Registry>(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    ).n_custodians
  );
}

export function n_markets_($c: AptosDataCache): U64 {
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    throw $.abortCode($.copy(E_NO_REGISTRY));
  }
  return Stdlib.Vector.length_(
    $c.borrow_global<Registry>(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    ).markets,
    $c,
    [new SimpleStructTag(MarketInfo)]
  );
}

export function register_custodian_capability_($c: AptosDataCache): CustodianCapability {
  let custodian_id, registry_ref_mut;
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    throw $.abortCode($.copy(E_NO_REGISTRY));
  }
  registry_ref_mut = $c.borrow_global_mut<Registry>(
    new SimpleStructTag(Registry),
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
  );
  custodian_id = $.copy(registry_ref_mut.n_custodians).add(u64('1'));
  registry_ref_mut.n_custodians = $.copy(custodian_id);
  return new CustodianCapability({ custodian_id: $.copy(custodian_id) }, new SimpleStructTag(CustodianCapability));
}

export function register_market_internal_(
  host: HexString,
  lot_size: U64,
  tick_size: U64,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): U64 {
  let temp$1,
    agnostic_disambiguator,
    base_is_coin,
    base_type_info,
    market_id,
    pure_coin,
    quote_is_coin,
    quote_type_info,
    registry_ref_mut,
    trading_pair_info;
  if (
    !$c.exists(
      new SimpleStructTag(Registry),
      new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
    )
  ) {
    throw $.abortCode($.copy(E_NO_REGISTRY));
  }
  if (!$.copy(lot_size).gt(u64('0'))) {
    throw $.abortCode($.copy(E_LOT_SIZE_0));
  }
  if (!$.copy(tick_size).gt(u64('0'))) {
    throw $.abortCode($.copy(E_TICK_SIZE_0));
  }
  base_type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  quote_type_info = Stdlib.Type_info.type_of_($c, [$p[1]]);
  base_is_coin = Stdlib.Coin.is_coin_initialized_($c, [$p[0]]);
  quote_is_coin = Stdlib.Coin.is_coin_initialized_($c, [$p[1]]);
  pure_coin = base_is_coin && quote_is_coin;
  market_id = n_markets_($c);
  if (pure_coin) {
    temp$1 = $.copy(PURE_COIN_PAIR);
  } else {
    temp$1 = $.copy(market_id);
  }
  agnostic_disambiguator = temp$1;
  trading_pair_info = new TradingPairInfo(
    {
      base_type_info: $.copy(base_type_info),
      quote_type_info: $.copy(quote_type_info),
      lot_size: $.copy(lot_size),
      tick_size: $.copy(tick_size),
      generic_asset_transfer_custodian_id: $.copy(generic_asset_transfer_custodian_id),
      agnostic_disambiguator: $.copy(agnostic_disambiguator)
    },
    new SimpleStructTag(TradingPairInfo)
  );
  if (pure_coin) {
    if (!!$.deep_eq($.copy(base_type_info), $.copy(quote_type_info))) {
      throw $.abortCode($.copy(E_SAME_COIN));
    }
    if (!!is_registered_trading_pair_($.copy(trading_pair_info), $c)) {
      throw $.abortCode($.copy(E_MARKET_EXISTS));
    }
    if (!$.copy(generic_asset_transfer_custodian_id).eq($.copy(PURE_COIN_PAIR))) {
      throw $.abortCode($.copy(E_INVALID_CUSTODIAN));
    }
  } else {
    if (!is_registered_custodian_id_($.copy(generic_asset_transfer_custodian_id), $c)) {
      throw $.abortCode($.copy(E_INVALID_CUSTODIAN));
    }
  }
  registry_ref_mut = $c.borrow_global_mut<Registry>(
    new SimpleStructTag(Registry),
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778')
  );
  Stdlib.Table.add_(registry_ref_mut.hosts, $.copy(trading_pair_info), $.copy(host), $c, [
    new SimpleStructTag(TradingPairInfo),
    AtomicTypeTag.Address
  ]);
  Stdlib.Vector.push_back_(
    registry_ref_mut.markets,
    new MarketInfo(
      { host: $.copy(host), trading_pair_info: $.copy(trading_pair_info) },
      new SimpleStructTag(MarketInfo)
    ),
    $c,
    [new SimpleStructTag(MarketInfo)]
  );
  return $.copy(market_id);
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::registry::CustodianCapability',
    CustodianCapability.CustodianCapabilityParser
  );
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::registry::GenericAsset',
    GenericAsset.GenericAssetParser
  );
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::registry::MarketInfo',
    MarketInfo.MarketInfoParser
  );
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::registry::Registry',
    Registry.RegistryParser
  );
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::registry::TradingPairInfo',
    TradingPairInfo.TradingPairInfoParser
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
  get CustodianCapability() {
    return CustodianCapability;
  }
  get GenericAsset() {
    return GenericAsset;
  }
  get MarketInfo() {
    return MarketInfo;
  }
  get Registry() {
    return Registry;
  }
  async loadRegistry(owner: HexString, loadFull = true, fillCache = true) {
    const val = await Registry.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get TradingPairInfo() {
    return TradingPairInfo;
  }
  payload_init_registry(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_init_registry(isJSON);
  }
  async init_registry(_account: AptosAccount, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_init_registry(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
