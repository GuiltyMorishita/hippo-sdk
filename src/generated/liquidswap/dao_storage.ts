import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'dao_storage';

export const ERR_NOT_ADMIN_ACCOUNT: U64 = u64('402');
export const ERR_NOT_REGISTERED: U64 = u64('401');

export class CoinDepositedEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'CoinDepositedEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'x_val', typeTag: AtomicTypeTag.U64 },
    { name: 'y_val', typeTag: AtomicTypeTag.U64 }
  ];

  x_val: U64;
  y_val: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.x_val = proto['x_val'] as U64;
    this.y_val = proto['y_val'] as U64;
  }

  static CoinDepositedEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): CoinDepositedEvent {
    const proto = $.parseStructProto(data, typeTag, repo, CoinDepositedEvent);
    return new CoinDepositedEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'CoinDepositedEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class CoinWithdrawnEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'CoinWithdrawnEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'x_val', typeTag: AtomicTypeTag.U64 },
    { name: 'y_val', typeTag: AtomicTypeTag.U64 }
  ];

  x_val: U64;
  y_val: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.x_val = proto['x_val'] as U64;
    this.y_val = proto['y_val'] as U64;
  }

  static CoinWithdrawnEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): CoinWithdrawnEvent {
    const proto = $.parseStructProto(data, typeTag, repo, CoinWithdrawnEvent);
    return new CoinWithdrawnEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'CoinWithdrawnEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

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
      name: 'storage_registered_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'dao_storage',
          'StorageCreatedEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'coin_deposited_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'dao_storage',
          'CoinDepositedEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    },
    {
      name: 'coin_withdrawn_handle',
      typeTag: new StructTag(new HexString('0x1'), 'event', 'EventHandle', [
        new StructTag(
          new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
          'dao_storage',
          'CoinWithdrawnEvent',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1), new $.TypeParamIdx(2)]
        )
      ])
    }
  ];

  storage_registered_handle: Stdlib.Event.EventHandle;
  coin_deposited_handle: Stdlib.Event.EventHandle;
  coin_withdrawn_handle: Stdlib.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.storage_registered_handle = proto['storage_registered_handle'] as Stdlib.Event.EventHandle;
    this.coin_deposited_handle = proto['coin_deposited_handle'] as Stdlib.Event.EventHandle;
    this.coin_withdrawn_handle = proto['coin_withdrawn_handle'] as Stdlib.Event.EventHandle;
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
    await this.storage_registered_handle.loadFullState(app);
    await this.coin_deposited_handle.loadFullState(app);
    await this.coin_withdrawn_handle.loadFullState(app);
    this.__app = app;
  }
}

export class Storage {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Storage';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'coin_x', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(0)]) },
    { name: 'coin_y', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(1)]) }
  ];

  coin_x: Stdlib.Coin.Coin;
  coin_y: Stdlib.Coin.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_x = proto['coin_x'] as Stdlib.Coin.Coin;
    this.coin_y = proto['coin_y'] as Stdlib.Coin.Coin;
  }

  static StorageParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Storage {
    const proto = $.parseStructProto(data, typeTag, repo, Storage);
    return new Storage(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Storage, typeParams);
    return result as unknown as Storage;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Storage, typeParams);
    await result.loadFullState(app);
    return result as unknown as Storage;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Storage', $p);
  }
  async loadFullState(app: $.AppType) {
    await this.coin_x.loadFullState(app);
    await this.coin_y.loadFullState(app);
    this.__app = app;
  }
}

export class StorageCreatedEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'StorageCreatedEvent';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'Curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static StorageCreatedEventParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): StorageCreatedEvent {
    const proto = $.parseStructProto(data, typeTag, repo, StorageCreatedEvent);
    return new StorageCreatedEvent(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'StorageCreatedEvent', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function deposit_(
  pool_addr: HexString,
  coin_x: Stdlib.Coin.Coin,
  coin_y: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let events_store, storage, x_val, y_val;
  if (!$c.exists(new SimpleStructTag(Storage, [$p[0], $p[1], $p[2]]), $.copy(pool_addr))) {
    throw $.abortCode($.copy(ERR_NOT_REGISTERED));
  }
  x_val = Stdlib.Coin.value_(coin_x, $c, [$p[0]]);
  y_val = Stdlib.Coin.value_(coin_y, $c, [$p[1]]);
  storage = $c.borrow_global_mut<Storage>(new SimpleStructTag(Storage, [$p[0], $p[1], $p[2]]), $.copy(pool_addr));
  Stdlib.Coin.merge_(storage.coin_x, coin_x, $c, [$p[0]]);
  Stdlib.Coin.merge_(storage.coin_y, coin_y, $c, [$p[1]]);
  events_store = $c.borrow_global_mut<EventsStore>(
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]),
    $.copy(pool_addr)
  );
  Stdlib.Event.emit_event_(
    events_store.coin_deposited_handle,
    new CoinDepositedEvent(
      { x_val: $.copy(x_val), y_val: $.copy(y_val) },
      new SimpleStructTag(CoinDepositedEvent, [$p[0], $p[1], $p[2]])
    ),
    $c,
    [new SimpleStructTag(CoinDepositedEvent, [$p[0], $p[1], $p[2]])]
  );
  return;
}

export function register_(owner: HexString, $c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): void {
  let events_store, storage;
  storage = new Storage(
    { coin_x: Stdlib.Coin.zero_($c, [$p[0]]), coin_y: Stdlib.Coin.zero_($c, [$p[1]]) },
    new SimpleStructTag(Storage, [$p[0], $p[1], $p[2]])
  );
  $c.move_to(new SimpleStructTag(Storage, [$p[0], $p[1], $p[2]]), owner, storage);
  events_store = new EventsStore(
    {
      storage_registered_handle: Stdlib.Account.new_event_handle_(owner, $c, [
        new SimpleStructTag(StorageCreatedEvent, [$p[0], $p[1], $p[2]])
      ]),
      coin_deposited_handle: Stdlib.Account.new_event_handle_(owner, $c, [
        new SimpleStructTag(CoinDepositedEvent, [$p[0], $p[1], $p[2]])
      ]),
      coin_withdrawn_handle: Stdlib.Account.new_event_handle_(owner, $c, [
        new SimpleStructTag(CoinWithdrawnEvent, [$p[0], $p[1], $p[2]])
      ])
    },
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]])
  );
  Stdlib.Event.emit_event_(
    events_store.storage_registered_handle,
    new StorageCreatedEvent({}, new SimpleStructTag(StorageCreatedEvent, [$p[0], $p[1], $p[2]])),
    $c,
    [new SimpleStructTag(StorageCreatedEvent, [$p[0], $p[1], $p[2]])]
  );
  $c.move_to(new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]), owner, events_store);
  return;
}

export function withdraw_(
  dao_admin_acc: HexString,
  pool_addr: HexString,
  x_val: U64,
  y_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  let coin_x, coin_y, events_store, storage;
  if (
    !(
      Stdlib.Signer.address_of_(dao_admin_acc, $c).hex() ===
      new HexString('0xb4d7b2466d211c1f4629e8340bb1a9e75e7f8fb38cc145c54c5c9f9d5017a318').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NOT_ADMIN_ACCOUNT));
  }
  storage = $c.borrow_global_mut<Storage>(new SimpleStructTag(Storage, [$p[0], $p[1], $p[2]]), $.copy(pool_addr));
  coin_x = Stdlib.Coin.extract_(storage.coin_x, $.copy(x_val), $c, [$p[0]]);
  coin_y = Stdlib.Coin.extract_(storage.coin_y, $.copy(y_val), $c, [$p[1]]);
  events_store = $c.borrow_global_mut<EventsStore>(
    new SimpleStructTag(EventsStore, [$p[0], $p[1], $p[2]]),
    $.copy(pool_addr)
  );
  Stdlib.Event.emit_event_(
    events_store.coin_withdrawn_handle,
    new CoinWithdrawnEvent(
      { x_val: $.copy(x_val), y_val: $.copy(y_val) },
      new SimpleStructTag(CoinWithdrawnEvent, [$p[0], $p[1], $p[2]])
    ),
    $c,
    [new SimpleStructTag(CoinWithdrawnEvent, [$p[0], $p[1], $p[2]])]
  );
  return [coin_x, coin_y];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::dao_storage::CoinDepositedEvent',
    CoinDepositedEvent.CoinDepositedEventParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::dao_storage::CoinWithdrawnEvent',
    CoinWithdrawnEvent.CoinWithdrawnEventParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::dao_storage::EventsStore',
    EventsStore.EventsStoreParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::dao_storage::Storage',
    Storage.StorageParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::dao_storage::StorageCreatedEvent',
    StorageCreatedEvent.StorageCreatedEventParser
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
  get CoinDepositedEvent() {
    return CoinDepositedEvent;
  }
  get CoinWithdrawnEvent() {
    return CoinWithdrawnEvent;
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
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get Storage() {
    return Storage;
  }
  async loadStorage(owner: HexString, $p: TypeTag[] /* <X, Y, Curve> */, loadFull = true, fillCache = true) {
    const val = await Storage.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get StorageCreatedEvent() {
    return StorageCreatedEvent;
  }
}
