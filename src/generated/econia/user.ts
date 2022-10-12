import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Critbit from './critbit';
import * as Open_table from './open_table';
import * as Order_id from './order_id';
import * as Registry from './registry';
export const packageName = 'Econia';
export const moduleAddress = new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778');
export const moduleName = 'user';

export const ASK: boolean = true;
export const BID: boolean = false;
export const COIN_ASSET_TRANSFER: U64 = u64('0');
export const E_DEPOSIT_OVERFLOW_ASSET_CEILING: U64 = u64('5');
export const E_EXISTS_MARKET_ACCOUNT: U64 = u64('2');
export const E_NOT_COIN_ASSET: U64 = u64('13');
export const E_NOT_ENOUGH_ASSET_AVAILABLE: U64 = u64('4');
export const E_NOT_GENERIC_ASSET: U64 = u64('12');
export const E_NOT_IN_MARKET_PAIR: U64 = u64('0');
export const E_NO_MARKET_ACCOUNT: U64 = u64('3');
export const E_NO_MARKET_ACCOUNTS: U64 = u64('7');
export const E_NO_ORDERS: U64 = u64('15');
export const E_OVERFLOW_ASSET_IN: U64 = u64('10');
export const E_OVERFLOW_ASSET_OUT: U64 = u64('11');
export const E_PRICE_0: U64 = u64('9');
export const E_SIZE_0: U64 = u64('8');
export const E_TICKS_OVERFLOW: U64 = u64('6');
export const E_UNAUTHORIZED_CUSTODIAN: U64 = u64('14');
export const E_UNREGISTERED_CUSTODIAN_ID: U64 = u64('1');
export const FIRST_64: U8 = u8('64');
export const HI_64: U64 = u64('18446744073709551615');
export const IN: boolean = true;
export const NO_CUSTODIAN: U64 = u64('0');
export const OUT: boolean = false;
export const PURE_COIN_PAIR: U64 = u64('0');

export class Collateral {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Collateral';
  static typeParameters: TypeParamDeclType[] = [{ name: 'CoinType', isPhantom: true }];
  static fields: FieldDeclType[] = [
    {
      name: 'map',
      typeTag: new StructTag(
        new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
        'open_table',
        'OpenTable',
        [AtomicTypeTag.U128, new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(0)])]
      )
    }
  ];

  map: Open_table.OpenTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.map = proto['map'] as Open_table.OpenTable;
  }

  static CollateralParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Collateral {
    const proto = $.parseStructProto(data, typeTag, repo, Collateral);
    return new Collateral(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Collateral, typeParams);
    return result as unknown as Collateral;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Collateral, typeParams);
    await result.loadFullState(app);
    return result as unknown as Collateral;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Collateral', $p);
  }
  async loadFullState(app: $.AppType) {
    await this.map.loadFullState(app);
    this.__app = app;
  }
}

export class MarketAccount {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'MarketAccount';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'base_type_info', typeTag: new StructTag(new HexString('0x1'), 'type_info', 'TypeInfo', []) },
    { name: 'quote_type_info', typeTag: new StructTag(new HexString('0x1'), 'type_info', 'TypeInfo', []) },
    { name: 'generic_asset_transfer_custodian_id', typeTag: AtomicTypeTag.U64 },
    {
      name: 'asks',
      typeTag: new StructTag(
        new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
        'critbit',
        'CritBitTree',
        [AtomicTypeTag.U64]
      )
    },
    {
      name: 'bids',
      typeTag: new StructTag(
        new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
        'critbit',
        'CritBitTree',
        [AtomicTypeTag.U64]
      )
    },
    { name: 'base_total', typeTag: AtomicTypeTag.U64 },
    { name: 'base_available', typeTag: AtomicTypeTag.U64 },
    { name: 'base_ceiling', typeTag: AtomicTypeTag.U64 },
    { name: 'quote_total', typeTag: AtomicTypeTag.U64 },
    { name: 'quote_available', typeTag: AtomicTypeTag.U64 },
    { name: 'quote_ceiling', typeTag: AtomicTypeTag.U64 }
  ];

  base_type_info: Stdlib.Type_info.TypeInfo;
  quote_type_info: Stdlib.Type_info.TypeInfo;
  generic_asset_transfer_custodian_id: U64;
  asks: Critbit.CritBitTree;
  bids: Critbit.CritBitTree;
  base_total: U64;
  base_available: U64;
  base_ceiling: U64;
  quote_total: U64;
  quote_available: U64;
  quote_ceiling: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.base_type_info = proto['base_type_info'] as Stdlib.Type_info.TypeInfo;
    this.quote_type_info = proto['quote_type_info'] as Stdlib.Type_info.TypeInfo;
    this.generic_asset_transfer_custodian_id = proto['generic_asset_transfer_custodian_id'] as U64;
    this.asks = proto['asks'] as Critbit.CritBitTree;
    this.bids = proto['bids'] as Critbit.CritBitTree;
    this.base_total = proto['base_total'] as U64;
    this.base_available = proto['base_available'] as U64;
    this.base_ceiling = proto['base_ceiling'] as U64;
    this.quote_total = proto['quote_total'] as U64;
    this.quote_available = proto['quote_available'] as U64;
    this.quote_ceiling = proto['quote_ceiling'] as U64;
  }

  static MarketAccountParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): MarketAccount {
    const proto = $.parseStructProto(data, typeTag, repo, MarketAccount);
    return new MarketAccount(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'MarketAccount', []);
  }
  async loadFullState(app: $.AppType) {
    await this.base_type_info.loadFullState(app);
    await this.quote_type_info.loadFullState(app);
    await this.asks.loadFullState(app);
    await this.bids.loadFullState(app);
    this.__app = app;
  }
}

export class MarketAccounts {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'MarketAccounts';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: 'map',
      typeTag: new StructTag(
        new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
        'open_table',
        'OpenTable',
        [
          AtomicTypeTag.U128,
          new StructTag(
            new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
            'user',
            'MarketAccount',
            []
          )
        ]
      )
    }
  ];

  map: Open_table.OpenTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.map = proto['map'] as Open_table.OpenTable;
  }

  static MarketAccountsParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): MarketAccounts {
    const proto = $.parseStructProto(data, typeTag, repo, MarketAccounts);
    return new MarketAccounts(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, MarketAccounts, typeParams);
    return result as unknown as MarketAccounts;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, MarketAccounts, typeParams);
    await result.loadFullState(app);
    return result as unknown as MarketAccounts;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'MarketAccounts', []);
  }
  async loadFullState(app: $.AppType) {
    await this.map.loadFullState(app);
    this.__app = app;
  }
}
export function borrow_transfer_fields_mixed_(
  market_accounts_map_ref_mut: Open_table.OpenTable,
  market_account_id: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): [U64, U64, U64, U64] {
  let asset_type_info, market_account_ref_mut;
  market_account_ref_mut = Open_table.borrow_mut_(market_accounts_map_ref_mut, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  asset_type_info = Stdlib.Type_info.type_of_($c, [$p[0]]);
  if ($.deep_eq($.copy(asset_type_info), $.copy(market_account_ref_mut.base_type_info))) {
    return [
      market_account_ref_mut.base_total,
      market_account_ref_mut.base_available,
      market_account_ref_mut.base_ceiling,
      market_account_ref_mut.generic_asset_transfer_custodian_id
    ];
  } else {
    if ($.deep_eq($.copy(asset_type_info), $.copy(market_account_ref_mut.quote_type_info))) {
      return [
        market_account_ref_mut.quote_total,
        market_account_ref_mut.quote_available,
        market_account_ref_mut.quote_ceiling,
        market_account_ref_mut.generic_asset_transfer_custodian_id
      ];
    } else {
    }
  }
  throw $.abortCode($.copy(E_NOT_IN_MARKET_PAIR));
}

export function deposit_asset_(
  user: HexString,
  market_account_id: U128,
  amount: U64,
  optional_coins: Stdlib.Option.Option,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): void {
  let asset_available_ref_mut,
    asset_ceiling_ref_mut,
    asset_total_ref_mut,
    collateral_map_ref_mut,
    collateral_ref_mut,
    generic_asset_transfer_custodian_id_ref,
    market_accounts_map_ref_mut;
  verify_market_account_exists_($.copy(user), $.copy(market_account_id), $c);
  market_accounts_map_ref_mut = $c.borrow_global_mut<MarketAccounts>(
    new SimpleStructTag(MarketAccounts),
    $.copy(user)
  ).map;
  [asset_total_ref_mut, asset_available_ref_mut, asset_ceiling_ref_mut, generic_asset_transfer_custodian_id_ref] =
    borrow_transfer_fields_mixed_(market_accounts_map_ref_mut, $.copy(market_account_id), $c, [$p[0]]);
  if (
    !!u128($.copy(asset_ceiling_ref_mut))
      .add(u128($.copy(amount)))
      .gt(u128($.copy(HI_64)))
  ) {
    throw $.abortCode($.copy(E_DEPOSIT_OVERFLOW_ASSET_CEILING));
  }
  $.set(asset_total_ref_mut, $.copy(asset_total_ref_mut).add($.copy(amount)));
  $.set(asset_available_ref_mut, $.copy(asset_available_ref_mut).add($.copy(amount)));
  $.set(asset_ceiling_ref_mut, $.copy(asset_ceiling_ref_mut).add($.copy(amount)));
  if (Stdlib.Option.is_some_(optional_coins, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])])) {
    collateral_map_ref_mut = $c.borrow_global_mut<Collateral>(
      new SimpleStructTag(Collateral, [$p[0]]),
      $.copy(user)
    ).map;
    collateral_ref_mut = Open_table.borrow_mut_(collateral_map_ref_mut, $.copy(market_account_id), $c, [
      AtomicTypeTag.U128,
      new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
    ]);
    Stdlib.Coin.merge_(
      collateral_ref_mut,
      Stdlib.Option.destroy_some_(optional_coins, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
      $c,
      [$p[0]]
    );
  } else {
    if (!$.copy(generic_asset_transfer_custodian_id).eq($.copy(generic_asset_transfer_custodian_id_ref))) {
      throw $.abortCode($.copy(E_UNAUTHORIZED_CUSTODIAN));
    }
    Stdlib.Option.destroy_none_(optional_coins, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]);
  }
  return;
}

export function deposit_asset_as_option_internal_(
  user: HexString,
  market_account_id: U128,
  amount: U64,
  optional_coins: Stdlib.Option.Option,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): void {
  return deposit_asset_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(amount),
    optional_coins,
    $.copy(generic_asset_transfer_custodian_id),
    $c,
    [$p[0]]
  );
}

export function deposit_assets_as_option_internal_(
  user: HexString,
  market_account_id: U128,
  base_amount: U64,
  quote_amount: U64,
  optional_base_coins: Stdlib.Option.Option,
  optional_quote_coins: Stdlib.Option.Option,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): void {
  deposit_asset_as_option_internal_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(base_amount),
    optional_base_coins,
    $.copy(generic_asset_transfer_custodian_id),
    $c,
    [$p[0]]
  );
  deposit_asset_as_option_internal_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(quote_amount),
    optional_quote_coins,
    $.copy(generic_asset_transfer_custodian_id),
    $c,
    [$p[1]]
  );
  return;
}

export function deposit_coins_(
  user: HexString,
  market_id: U64,
  general_custodian_id: U64,
  coins: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): void {
  return deposit_asset_(
    $.copy(user),
    get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c),
    Stdlib.Coin.value_(coins, $c, [$p[0]]),
    Stdlib.Option.some_(coins, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
    $.copy(COIN_ASSET_TRANSFER),
    $c,
    [$p[0]]
  );
}

export function deposit_from_coinstore_(
  user: HexString,
  market_id: U64,
  general_custodian_id: U64,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): void {
  return deposit_coins_(
    Stdlib.Signer.address_of_(user, $c),
    $.copy(market_id),
    $.copy(general_custodian_id),
    Stdlib.Coin.withdraw_(user, $.copy(amount), $c, [$p[0]]),
    $c,
    [$p[0]]
  );
}

export function buildPayload_deposit_from_coinstore(
  market_id: U64,
  general_custodian_id: U64,
  amount: U64,
  $p: TypeTag[] /* <CoinType>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
    'user',
    'deposit_from_coinstore',
    typeParamStrings,
    [market_id, general_custodian_id, amount],
    isJSON
  );
}

export function deposit_generic_asset_(
  user: HexString,
  market_id: U64,
  general_custodian_id: U64,
  amount: U64,
  generic_asset_transfer_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): void {
  let generic_asset_transfer_custodian_id;
  if (!!Stdlib.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_NOT_GENERIC_ASSET));
  }
  generic_asset_transfer_custodian_id = Registry.custodian_id_(generic_asset_transfer_custodian_capability_ref, $c);
  return deposit_asset_(
    $.copy(user),
    get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c),
    $.copy(amount),
    Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]),
    $.copy(generic_asset_transfer_custodian_id),
    $c,
    [$p[0]]
  );
}

export function fill_order_internal_(
  user: HexString,
  market_account_id: U128,
  side: boolean,
  order_id: U128,
  complete_fill: boolean,
  fill_size: U64,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  base_to_route: U64,
  quote_to_route: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): void {
  fill_order_update_market_account_(
    $.copy(user),
    $.copy(market_account_id),
    side,
    $.copy(order_id),
    complete_fill,
    $.copy(fill_size),
    $.copy(base_to_route),
    $.copy(quote_to_route),
    $c
  );
  fill_order_route_collateral_(
    $.copy(user),
    $.copy(market_account_id),
    side,
    optional_base_coins_ref_mut,
    optional_quote_coins_ref_mut,
    $.copy(base_to_route),
    $.copy(quote_to_route),
    $c,
    [$p[0], $p[1]]
  );
  return;
}

export function fill_order_route_collateral_(
  user: HexString,
  market_account_id: U128,
  side: boolean,
  optional_base_coins_ref_mut: Stdlib.Option.Option,
  optional_quote_coins_ref_mut: Stdlib.Option.Option,
  base_to_route: U64,
  quote_to_route: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, base_direction, quote_direction;
  if (side == $.copy(ASK)) {
    [temp$1, temp$2] = [$.copy(OUT), $.copy(IN)];
  } else {
    [temp$1, temp$2] = [$.copy(IN), $.copy(OUT)];
  }
  [base_direction, quote_direction] = [temp$1, temp$2];
  if (
    Stdlib.Option.is_some_(optional_base_coins_ref_mut, $c, [
      new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
    ])
  ) {
    fill_order_route_collateral_single_(
      $.copy(user),
      $.copy(market_account_id),
      Stdlib.Option.borrow_mut_(optional_base_coins_ref_mut, $c, [
        new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
      ]),
      $.copy(base_to_route),
      base_direction,
      $c,
      [$p[0]]
    );
  } else {
  }
  if (
    Stdlib.Option.is_some_(optional_quote_coins_ref_mut, $c, [
      new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[1]])
    ])
  ) {
    fill_order_route_collateral_single_(
      $.copy(user),
      $.copy(market_account_id),
      Stdlib.Option.borrow_mut_(optional_quote_coins_ref_mut, $c, [
        new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[1]])
      ]),
      $.copy(quote_to_route),
      quote_direction,
      $c,
      [$p[1]]
    );
  } else {
  }
  return;
}

export function fill_order_route_collateral_single_(
  user: HexString,
  market_account_id: U128,
  external_coins_ref_mut: Stdlib.Coin.Coin,
  amount: U64,
  direction: boolean,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): void {
  let collateral_map_ref_mut, collateral_ref_mut;
  collateral_map_ref_mut = $c.borrow_global_mut<Collateral>(new SimpleStructTag(Collateral, [$p[0]]), $.copy(user)).map;
  collateral_ref_mut = Open_table.borrow_mut_(collateral_map_ref_mut, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
  ]);
  if (direction == $.copy(IN)) {
    Stdlib.Coin.merge_(
      collateral_ref_mut,
      Stdlib.Coin.extract_(external_coins_ref_mut, $.copy(amount), $c, [$p[0]]),
      $c,
      [$p[0]]
    );
  } else {
    Stdlib.Coin.merge_(
      external_coins_ref_mut,
      Stdlib.Coin.extract_(collateral_ref_mut, $.copy(amount), $c, [$p[0]]),
      $c,
      [$p[0]]
    );
  }
  return;
}

export function fill_order_update_market_account_(
  user: HexString,
  market_account_id: U128,
  side: boolean,
  order_id: U128,
  complete_fill: boolean,
  fill_size: U64,
  base_to_route: U64,
  quote_to_route: U64,
  $c: AptosDataCache
): void {
  let temp$1,
    temp$2,
    temp$3,
    temp$4,
    temp$5,
    temp$6,
    temp$7,
    asset_in,
    asset_in_available_ref_mut,
    asset_in_total_ref_mut,
    asset_out,
    asset_out_ceiling_ref_mut,
    asset_out_total_ref_mut,
    market_account_ref_mut,
    market_accounts_map_ref_mut,
    order_size_ref_mut,
    tree_ref_mut;
  market_accounts_map_ref_mut = $c.borrow_global_mut<MarketAccounts>(
    new SimpleStructTag(MarketAccounts),
    $.copy(user)
  ).map;
  market_account_ref_mut = Open_table.borrow_mut_(market_accounts_map_ref_mut, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  if (side == $.copy(ASK)) {
    [temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7] = [
      market_account_ref_mut.asks,
      $.copy(quote_to_route),
      market_account_ref_mut.quote_total,
      market_account_ref_mut.quote_available,
      $.copy(base_to_route),
      market_account_ref_mut.base_total,
      market_account_ref_mut.base_ceiling
    ];
  } else {
    [temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7] = [
      market_account_ref_mut.bids,
      $.copy(base_to_route),
      market_account_ref_mut.base_total,
      market_account_ref_mut.base_available,
      $.copy(quote_to_route),
      market_account_ref_mut.quote_total,
      market_account_ref_mut.quote_ceiling
    ];
  }
  [
    tree_ref_mut,
    asset_in,
    asset_in_total_ref_mut,
    asset_in_available_ref_mut,
    asset_out,
    asset_out_total_ref_mut,
    asset_out_ceiling_ref_mut
  ] = [temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7];
  if (complete_fill) {
    Critbit.pop_(tree_ref_mut, $.copy(order_id), $c, [AtomicTypeTag.U64]);
  } else {
    order_size_ref_mut = Critbit.borrow_mut_(tree_ref_mut, $.copy(order_id), $c, [AtomicTypeTag.U64]);
    $.set(order_size_ref_mut, $.copy(order_size_ref_mut).sub($.copy(fill_size)));
  }
  $.set(asset_in_total_ref_mut, $.copy(asset_in_total_ref_mut).add($.copy(asset_in)));
  $.set(asset_in_available_ref_mut, $.copy(asset_in_available_ref_mut).add($.copy(asset_in)));
  $.set(asset_out_total_ref_mut, $.copy(asset_out_total_ref_mut).sub($.copy(asset_out)));
  $.set(asset_out_ceiling_ref_mut, $.copy(asset_out_ceiling_ref_mut).sub($.copy(asset_out)));
  return;
}

export function get_asset_counts_(
  user: HexString,
  market_account_id: U128,
  $c: AptosDataCache
): [U64, U64, U64, U64, U64, U64] {
  let market_account_ref, market_accounts_map_ref;
  verify_market_account_exists_($.copy(user), $.copy(market_account_id), $c);
  market_accounts_map_ref = $c.borrow_global<MarketAccounts>(new SimpleStructTag(MarketAccounts), $.copy(user)).map;
  market_account_ref = Open_table.borrow_(market_accounts_map_ref, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  return [
    $.copy(market_account_ref.base_total),
    $.copy(market_account_ref.base_available),
    $.copy(market_account_ref.base_ceiling),
    $.copy(market_account_ref.quote_total),
    $.copy(market_account_ref.quote_available),
    $.copy(market_account_ref.quote_ceiling)
  ];
}

export function get_asset_counts_custodian_(
  user: HexString,
  market_id: U64,
  general_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache
): [U64, U64, U64, U64, U64, U64] {
  return get_asset_counts_(
    $.copy(user),
    get_market_account_id_($.copy(market_id), Registry.custodian_id_(general_custodian_capability_ref, $c), $c),
    $c
  );
}

export function get_asset_counts_internal_(
  user: HexString,
  market_account_id: U128,
  $c: AptosDataCache
): [U64, U64, U64, U64, U64, U64] {
  return get_asset_counts_($.copy(user), $.copy(market_account_id), $c);
}

export function get_asset_counts_user_(
  user: HexString,
  market_id: U64,
  $c: AptosDataCache
): [U64, U64, U64, U64, U64, U64] {
  return get_asset_counts_(
    Stdlib.Signer.address_of_(user, $c),
    get_market_account_id_($.copy(market_id), $.copy(NO_CUSTODIAN), $c),
    $c
  );
}

export function get_general_custodian_id_(market_account_id: U128, $c: AptosDataCache): U64 {
  return u64($.copy(market_account_id).and(u128($.copy(HI_64))));
}

export function get_market_account_id_(market_id: U64, general_custodian_id: U64, $c: AptosDataCache): U128 {
  return u128($.copy(market_id))
    .shl($.copy(FIRST_64))
    .or(u128($.copy(general_custodian_id)));
}

export function get_market_id_(market_account_id: U128, $c: AptosDataCache): U64 {
  return u64($.copy(market_account_id).shr($.copy(FIRST_64)));
}

export function get_n_orders_internal_(
  user: HexString,
  market_account_id: U128,
  side: boolean,
  $c: AptosDataCache
): U64 {
  let temp$1, market_account_ref, market_accounts_map_ref, tree_ref;
  verify_market_account_exists_($.copy(user), $.copy(market_account_id), $c);
  market_accounts_map_ref = $c.borrow_global<MarketAccounts>(new SimpleStructTag(MarketAccounts), $.copy(user)).map;
  market_account_ref = Open_table.borrow_(market_accounts_map_ref, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  if (side == $.copy(ASK)) {
    temp$1 = market_account_ref.asks;
  } else {
    temp$1 = market_account_ref.bids;
  }
  tree_ref = temp$1;
  return Critbit.length_(tree_ref, $c, [AtomicTypeTag.U64]);
}

export function get_order_id_nearest_spread_internal_(
  user: HexString,
  market_account_id: U128,
  side: boolean,
  $c: AptosDataCache
): U128 {
  let temp$1, temp$2, market_account_ref, market_accounts_map_ref, tree_ref;
  verify_market_account_exists_($.copy(user), $.copy(market_account_id), $c);
  market_accounts_map_ref = $c.borrow_global<MarketAccounts>(new SimpleStructTag(MarketAccounts), $.copy(user)).map;
  market_account_ref = Open_table.borrow_(market_accounts_map_ref, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  if (side == $.copy(ASK)) {
    temp$1 = market_account_ref.asks;
  } else {
    temp$1 = market_account_ref.bids;
  }
  tree_ref = temp$1;
  if (!!Critbit.is_empty_(tree_ref, $c, [AtomicTypeTag.U64])) {
    throw $.abortCode($.copy(E_NO_ORDERS));
  }
  if (side == $.copy(ASK)) {
    temp$2 = Critbit.min_key_(tree_ref, $c, [AtomicTypeTag.U64]);
  } else {
    temp$2 = Critbit.max_key_(tree_ref, $c, [AtomicTypeTag.U64]);
  }
  return temp$2;
}

export function range_check_new_order_(
  side: boolean,
  size: U64,
  price: U64,
  lot_size: U64,
  tick_size: U64,
  in_asset_ceiling: U64,
  out_asset_available: U64,
  $c: AptosDataCache
): [U64, U64] {
  let temp$1, temp$2, base_fill, in_asset_fill, out_asset_fill, quote_fill, ticks;
  if (!$.copy(size).gt(u64('0'))) {
    throw $.abortCode($.copy(E_SIZE_0));
  }
  if (!$.copy(price).gt(u64('0'))) {
    throw $.abortCode($.copy(E_PRICE_0));
  }
  base_fill = u128($.copy(size)).mul(u128($.copy(lot_size)));
  ticks = u128($.copy(size)).mul(u128($.copy(price)));
  if (!!$.copy(ticks).gt(u128($.copy(HI_64)))) {
    throw $.abortCode($.copy(E_TICKS_OVERFLOW));
  }
  quote_fill = $.copy(ticks).mul(u128($.copy(tick_size)));
  if (side == $.copy(ASK)) {
    [temp$1, temp$2] = [$.copy(quote_fill), $.copy(base_fill)];
  } else {
    [temp$1, temp$2] = [$.copy(base_fill), $.copy(quote_fill)];
  }
  [in_asset_fill, out_asset_fill] = [temp$1, temp$2];
  if (
    !!$.copy(in_asset_fill)
      .add(u128($.copy(in_asset_ceiling)))
      .gt(u128($.copy(HI_64)))
  ) {
    throw $.abortCode($.copy(E_OVERFLOW_ASSET_IN));
  }
  if (!!$.copy(out_asset_fill).gt(u128($.copy(HI_64)))) {
    throw $.abortCode($.copy(E_OVERFLOW_ASSET_OUT));
  }
  if (!!$.copy(out_asset_fill).gt(u128($.copy(out_asset_available)))) {
    throw $.abortCode($.copy(E_NOT_ENOUGH_ASSET_AVAILABLE));
  }
  return [u64($.copy(in_asset_fill)), u64($.copy(out_asset_fill))];
}

export function register_collateral_entry_(
  user: HexString,
  market_account_id: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): void {
  let temp$1, temp$2, collateral_map_ref_mut, user_address;
  user_address = Stdlib.Signer.address_of_(user, $c);
  if (!$c.exists(new SimpleStructTag(Collateral, [$p[0]]), $.copy(user_address))) {
    $c.move_to(
      new SimpleStructTag(Collateral, [$p[0]]),
      user,
      new Collateral(
        {
          map: Open_table.empty_($c, [AtomicTypeTag.U128, new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])])
        },
        new SimpleStructTag(Collateral, [$p[0]])
      )
    );
  } else {
  }
  collateral_map_ref_mut = $c.borrow_global_mut<Collateral>(
    new SimpleStructTag(Collateral, [$p[0]]),
    $.copy(user_address)
  ).map;
  [temp$1, temp$2] = [collateral_map_ref_mut, $.copy(market_account_id)];
  if (
    !!Open_table.contains_(temp$1, temp$2, $c, [
      AtomicTypeTag.U128,
      new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
    ])
  ) {
    throw $.abortCode($.copy(E_EXISTS_MARKET_ACCOUNT));
  }
  Open_table.add_(collateral_map_ref_mut, $.copy(market_account_id), Stdlib.Coin.zero_($c, [$p[0]]), $c, [
    AtomicTypeTag.U128,
    new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
  ]);
  return;
}

export function register_market_account_(
  user: HexString,
  market_id: U64,
  general_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): void {
  let market_account_id;
  if ($.copy(general_custodian_id).neq($.copy(NO_CUSTODIAN))) {
    if (!Registry.is_registered_custodian_id_($.copy(general_custodian_id), $c)) {
      throw $.abortCode($.copy(E_UNREGISTERED_CUSTODIAN_ID));
    }
  } else {
  }
  market_account_id = get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c);
  register_market_accounts_entry_(user, $.copy(market_account_id), $c, [$p[0], $p[1]]);
  if (Stdlib.Coin.is_coin_initialized_($c, [$p[0]])) {
    register_collateral_entry_(user, $.copy(market_account_id), $c, [$p[0]]);
  } else {
  }
  if (Stdlib.Coin.is_coin_initialized_($c, [$p[1]])) {
    register_collateral_entry_(user, $.copy(market_account_id), $c, [$p[1]]);
  } else {
  }
  return;
}

export function buildPayload_register_market_account(
  market_id: U64,
  general_custodian_id: U64,
  $p: TypeTag[] /* <BaseType, QuoteType>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
    'user',
    'register_market_account',
    typeParamStrings,
    [market_id, general_custodian_id],
    isJSON
  );
}

export function register_market_accounts_entry_(
  user: HexString,
  market_account_id: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): void {
  let temp$1, temp$2, generic_asset_transfer_custodian_id, market_accounts_map_ref_mut, user_address;
  generic_asset_transfer_custodian_id = Registry.get_verified_market_custodian_id_(
    get_market_id_($.copy(market_account_id), $c),
    $c,
    [$p[0], $p[1]]
  );
  user_address = Stdlib.Signer.address_of_(user, $c);
  if (!$c.exists(new SimpleStructTag(MarketAccounts), $.copy(user_address))) {
    $c.move_to(
      new SimpleStructTag(MarketAccounts),
      user,
      new MarketAccounts(
        { map: Open_table.empty_($c, [AtomicTypeTag.U128, new SimpleStructTag(MarketAccount)]) },
        new SimpleStructTag(MarketAccounts)
      )
    );
  } else {
  }
  market_accounts_map_ref_mut = $c.borrow_global_mut<MarketAccounts>(
    new SimpleStructTag(MarketAccounts),
    $.copy(user_address)
  ).map;
  [temp$1, temp$2] = [market_accounts_map_ref_mut, $.copy(market_account_id)];
  if (!!Open_table.contains_(temp$1, temp$2, $c, [AtomicTypeTag.U128, new SimpleStructTag(MarketAccount)])) {
    throw $.abortCode($.copy(E_EXISTS_MARKET_ACCOUNT));
  }
  Open_table.add_(
    market_accounts_map_ref_mut,
    $.copy(market_account_id),
    new MarketAccount(
      {
        base_type_info: Stdlib.Type_info.type_of_($c, [$p[0]]),
        quote_type_info: Stdlib.Type_info.type_of_($c, [$p[1]]),
        generic_asset_transfer_custodian_id: $.copy(generic_asset_transfer_custodian_id),
        asks: Critbit.empty_($c, [AtomicTypeTag.U64]),
        bids: Critbit.empty_($c, [AtomicTypeTag.U64]),
        base_total: u64('0'),
        base_available: u64('0'),
        base_ceiling: u64('0'),
        quote_total: u64('0'),
        quote_available: u64('0'),
        quote_ceiling: u64('0')
      },
      new SimpleStructTag(MarketAccount)
    ),
    $c,
    [AtomicTypeTag.U128, new SimpleStructTag(MarketAccount)]
  );
  return;
}

export function register_order_internal_(
  user: HexString,
  market_account_id: U128,
  side: boolean,
  order_id: U128,
  size: U64,
  price: U64,
  lot_size: U64,
  tick_size: U64,
  $c: AptosDataCache
): void {
  let temp$1,
    temp$2,
    temp$3,
    in_asset_ceiling_ref_mut,
    in_asset_fill,
    market_account_ref_mut,
    market_accounts_map_ref_mut,
    out_asset_available_ref_mut,
    out_asset_fill,
    tree_ref_mut;
  verify_market_account_exists_($.copy(user), $.copy(market_account_id), $c);
  market_accounts_map_ref_mut = $c.borrow_global_mut<MarketAccounts>(
    new SimpleStructTag(MarketAccounts),
    $.copy(user)
  ).map;
  market_account_ref_mut = Open_table.borrow_mut_(market_accounts_map_ref_mut, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  if (side == $.copy(ASK)) {
    [temp$1, temp$2, temp$3] = [
      market_account_ref_mut.asks,
      market_account_ref_mut.quote_ceiling,
      market_account_ref_mut.base_available
    ];
  } else {
    [temp$1, temp$2, temp$3] = [
      market_account_ref_mut.bids,
      market_account_ref_mut.base_ceiling,
      market_account_ref_mut.quote_available
    ];
  }
  [tree_ref_mut, in_asset_ceiling_ref_mut, out_asset_available_ref_mut] = [temp$1, temp$2, temp$3];
  [in_asset_fill, out_asset_fill] = range_check_new_order_(
    side,
    $.copy(size),
    $.copy(price),
    $.copy(lot_size),
    $.copy(tick_size),
    $.copy(in_asset_ceiling_ref_mut),
    $.copy(out_asset_available_ref_mut),
    $c
  );
  Critbit.insert_(tree_ref_mut, $.copy(order_id), $.copy(size), $c, [AtomicTypeTag.U64]);
  $.set(in_asset_ceiling_ref_mut, $.copy(in_asset_ceiling_ref_mut).add($.copy(in_asset_fill)));
  $.set(out_asset_available_ref_mut, $.copy(out_asset_available_ref_mut).sub($.copy(out_asset_fill)));
  return;
}

export function remove_order_internal_(
  user: HexString,
  market_account_id: U128,
  lot_size: U64,
  tick_size: U64,
  side: boolean,
  order_id: U128,
  $c: AptosDataCache
): void {
  let temp$1,
    temp$2,
    temp$3,
    temp$4,
    temp$5,
    asset_available_ref_mut,
    asset_ceiling_ref_mut,
    ceiling_decrement_amount,
    market_account_ref_mut,
    market_accounts_map_ref_mut,
    size,
    size_multiplier_available,
    size_multiplier_ceiling,
    tree_ref_mut,
    unlocked;
  market_accounts_map_ref_mut = $c.borrow_global_mut<MarketAccounts>(
    new SimpleStructTag(MarketAccounts),
    $.copy(user)
  ).map;
  market_account_ref_mut = Open_table.borrow_mut_(market_accounts_map_ref_mut, $.copy(market_account_id), $c, [
    AtomicTypeTag.U128,
    new SimpleStructTag(MarketAccount)
  ]);
  if (side == $.copy(ASK)) {
    [temp$1, temp$2, temp$3, temp$4, temp$5] = [
      market_account_ref_mut.asks,
      market_account_ref_mut.base_available,
      market_account_ref_mut.quote_ceiling,
      $.copy(lot_size),
      Order_id.price_($.copy(order_id), $c).mul($.copy(tick_size))
    ];
  } else {
    [temp$1, temp$2, temp$3, temp$4, temp$5] = [
      market_account_ref_mut.bids,
      market_account_ref_mut.quote_available,
      market_account_ref_mut.base_ceiling,
      Order_id.price_($.copy(order_id), $c).mul($.copy(tick_size)),
      $.copy(lot_size)
    ];
  }
  [tree_ref_mut, asset_available_ref_mut, asset_ceiling_ref_mut, size_multiplier_available, size_multiplier_ceiling] = [
    temp$1,
    temp$2,
    temp$3,
    temp$4,
    temp$5
  ];
  size = Critbit.pop_(tree_ref_mut, $.copy(order_id), $c, [AtomicTypeTag.U64]);
  unlocked = $.copy(size).mul($.copy(size_multiplier_available));
  $.set(asset_available_ref_mut, $.copy(asset_available_ref_mut).add($.copy(unlocked)));
  ceiling_decrement_amount = $.copy(size).mul($.copy(size_multiplier_ceiling));
  $.set(asset_ceiling_ref_mut, $.copy(asset_ceiling_ref_mut).sub($.copy(ceiling_decrement_amount)));
  return;
}

export function verify_market_account_exists_(user: HexString, market_account_id: U128, $c: AptosDataCache): void {
  let market_accounts_map_ref;
  if (!$c.exists(new SimpleStructTag(MarketAccounts), $.copy(user))) {
    throw $.abortCode($.copy(E_NO_MARKET_ACCOUNTS));
  }
  market_accounts_map_ref = $c.borrow_global<MarketAccounts>(new SimpleStructTag(MarketAccounts), $.copy(user)).map;
  if (
    !Open_table.contains_(market_accounts_map_ref, $.copy(market_account_id), $c, [
      AtomicTypeTag.U128,
      new SimpleStructTag(MarketAccount)
    ])
  ) {
    throw $.abortCode($.copy(E_NO_MARKET_ACCOUNT));
  }
  return;
}

export function withdraw_asset_(
  user: HexString,
  market_account_id: U128,
  amount: U64,
  asset_is_coin: boolean,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): Stdlib.Option.Option {
  let asset_available_ref_mut,
    asset_ceiling_ref_mut,
    asset_total_ref_mut,
    collateral_map_ref_mut,
    collateral_ref_mut,
    generic_asset_transfer_custodian_id_ref,
    market_accounts_map_ref_mut;
  verify_market_account_exists_($.copy(user), $.copy(market_account_id), $c);
  market_accounts_map_ref_mut = $c.borrow_global_mut<MarketAccounts>(
    new SimpleStructTag(MarketAccounts),
    $.copy(user)
  ).map;
  [asset_total_ref_mut, asset_available_ref_mut, asset_ceiling_ref_mut, generic_asset_transfer_custodian_id_ref] =
    borrow_transfer_fields_mixed_(market_accounts_map_ref_mut, $.copy(market_account_id), $c, [$p[0]]);
  if (!!$.copy(amount).gt($.copy(asset_available_ref_mut))) {
    throw $.abortCode($.copy(E_NOT_ENOUGH_ASSET_AVAILABLE));
  }
  $.set(asset_total_ref_mut, $.copy(asset_total_ref_mut).sub($.copy(amount)));
  $.set(asset_available_ref_mut, $.copy(asset_available_ref_mut).sub($.copy(amount)));
  $.set(asset_ceiling_ref_mut, $.copy(asset_ceiling_ref_mut).sub($.copy(amount)));
  if (asset_is_coin) {
    collateral_map_ref_mut = $c.borrow_global_mut<Collateral>(
      new SimpleStructTag(Collateral, [$p[0]]),
      $.copy(user)
    ).map;
    collateral_ref_mut = Open_table.borrow_mut_(collateral_map_ref_mut, $.copy(market_account_id), $c, [
      AtomicTypeTag.U128,
      new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
    ]);
    return Stdlib.Option.some_(Stdlib.Coin.extract_(collateral_ref_mut, $.copy(amount), $c, [$p[0]]), $c, [
      new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])
    ]);
  } else {
    if (!$.copy(generic_asset_transfer_custodian_id).eq($.copy(generic_asset_transfer_custodian_id_ref))) {
      throw $.abortCode($.copy(E_UNAUTHORIZED_CUSTODIAN));
    }
    return Stdlib.Option.none_($c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]);
  }
}

export function withdraw_asset_as_option_internal_(
  user: HexString,
  market_account_id: U128,
  amount: U64,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): Stdlib.Option.Option {
  return withdraw_asset_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(amount),
    Stdlib.Coin.is_coin_initialized_($c, [$p[0]]),
    $.copy(generic_asset_transfer_custodian_id),
    $c,
    [$p[0]]
  );
}

export function withdraw_assets_as_option_internal_(
  user: HexString,
  market_account_id: U128,
  base_amount: U64,
  quote_amount: U64,
  generic_asset_transfer_custodian_id: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <BaseType, QuoteType>*/
): [Stdlib.Option.Option, Stdlib.Option.Option] {
  return [
    withdraw_asset_(
      $.copy(user),
      $.copy(market_account_id),
      $.copy(base_amount),
      Stdlib.Coin.is_coin_initialized_($c, [$p[0]]),
      $.copy(generic_asset_transfer_custodian_id),
      $c,
      [$p[0]]
    ),
    withdraw_asset_(
      $.copy(user),
      $.copy(market_account_id),
      $.copy(quote_amount),
      Stdlib.Coin.is_coin_initialized_($c, [$p[1]]),
      $.copy(generic_asset_transfer_custodian_id),
      $c,
      [$p[1]]
    )
  ];
}

export function withdraw_coins_(
  user: HexString,
  market_id: U64,
  general_custodian_id: U64,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): Stdlib.Coin.Coin {
  let market_account_id, option_coins;
  if (!Stdlib.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_NOT_COIN_ASSET));
  }
  market_account_id = get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c);
  option_coins = withdraw_asset_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(amount),
    true,
    $.copy(COIN_ASSET_TRANSFER),
    $c,
    [$p[0]]
  );
  return Stdlib.Option.destroy_some_(option_coins, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]);
}

export function withdraw_coins_as_option_internal_(
  user: HexString,
  market_account_id: U128,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): Stdlib.Option.Option {
  return withdraw_asset_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(amount),
    true,
    $.copy(COIN_ASSET_TRANSFER),
    $c,
    [$p[0]]
  );
}

export function withdraw_coins_custodian_(
  user: HexString,
  market_id: U64,
  amount: U64,
  general_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): Stdlib.Coin.Coin {
  return withdraw_coins_(
    $.copy(user),
    $.copy(market_id),
    Registry.custodian_id_(general_custodian_capability_ref, $c),
    $.copy(amount),
    $c,
    [$p[0]]
  );
}

export function withdraw_coins_user_(
  user: HexString,
  market_id: U64,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): Stdlib.Coin.Coin {
  return withdraw_coins_(
    Stdlib.Signer.address_of_(user, $c),
    $.copy(market_id),
    $.copy(NO_CUSTODIAN),
    $.copy(amount),
    $c,
    [$p[0]]
  );
}

export function withdraw_generic_asset_(
  user: HexString,
  market_id: U64,
  general_custodian_id: U64,
  amount: U64,
  generic_asset_transfer_custodian_capability_ref: Registry.CustodianCapability,
  $c: AptosDataCache,
  $p: TypeTag[] /* <AssetType>*/
): void {
  let empty_option, generic_asset_transfer_custodian_id, market_account_id;
  if (!!Stdlib.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_NOT_GENERIC_ASSET));
  }
  generic_asset_transfer_custodian_id = Registry.custodian_id_(generic_asset_transfer_custodian_capability_ref, $c);
  market_account_id = get_market_account_id_($.copy(market_id), $.copy(general_custodian_id), $c);
  empty_option = withdraw_asset_(
    $.copy(user),
    $.copy(market_account_id),
    $.copy(amount),
    false,
    $.copy(generic_asset_transfer_custodian_id),
    $c,
    [$p[0]]
  );
  Stdlib.Option.destroy_none_(empty_option, $c, [new StructTag(new HexString('0x1'), 'coin', 'Coin', [$p[0]])]);
  return;
}

export function withdraw_to_coinstore_(
  user: HexString,
  market_id: U64,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinType>*/
): void {
  let coins;
  coins = withdraw_coins_user_(user, $.copy(market_id), $.copy(amount), $c, [$p[0]]);
  Stdlib.Coin.deposit_(Stdlib.Signer.address_of_(user, $c), coins, $c, [$p[0]]);
  return;
}

export function buildPayload_withdraw_to_coinstore(
  market_id: U64,
  amount: U64,
  $p: TypeTag[] /* <CoinType>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778'),
    'user',
    'withdraw_to_coinstore',
    typeParamStrings,
    [market_id, amount],
    isJSON
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::user::Collateral',
    Collateral.CollateralParser
  );
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::user::MarketAccount',
    MarketAccount.MarketAccountParser
  );
  repo.addParser(
    '0x51d8534aba004732df9a7229f89d6d7a687ad56f8c906e482f62ee298ec7c778::user::MarketAccounts',
    MarketAccounts.MarketAccountsParser
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
  get Collateral() {
    return Collateral;
  }
  async loadCollateral(owner: HexString, $p: TypeTag[] /* <CoinType> */, loadFull = true, fillCache = true) {
    const val = await Collateral.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get MarketAccount() {
    return MarketAccount;
  }
  get MarketAccounts() {
    return MarketAccounts;
  }
  async loadMarketAccounts(owner: HexString, loadFull = true, fillCache = true) {
    const val = await MarketAccounts.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  payload_deposit_from_coinstore(
    market_id: U64,
    general_custodian_id: U64,
    amount: U64,
    $p: TypeTag[] /* <CoinType>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_deposit_from_coinstore(market_id, general_custodian_id, amount, $p, isJSON);
  }
  async deposit_from_coinstore(
    _account: AptosAccount,
    market_id: U64,
    general_custodian_id: U64,
    amount: U64,
    $p: TypeTag[] /* <CoinType>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload = buildPayload_deposit_from_coinstore(market_id, general_custodian_id, amount, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_register_market_account(
    market_id: U64,
    general_custodian_id: U64,
    $p: TypeTag[] /* <BaseType, QuoteType>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_register_market_account(market_id, general_custodian_id, $p, isJSON);
  }
  async register_market_account(
    _account: AptosAccount,
    market_id: U64,
    general_custodian_id: U64,
    $p: TypeTag[] /* <BaseType, QuoteType>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload = buildPayload_register_market_account(market_id, general_custodian_id, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_withdraw_to_coinstore(
    market_id: U64,
    amount: U64,
    $p: TypeTag[] /* <CoinType>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_withdraw_to_coinstore(market_id, amount, $p, isJSON);
  }
  async withdraw_to_coinstore(
    _account: AptosAccount,
    market_id: U64,
    amount: U64,
    $p: TypeTag[] /* <CoinType>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload = buildPayload_withdraw_to_coinstore(market_id, amount, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
}
