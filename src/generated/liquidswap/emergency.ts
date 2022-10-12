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
export const moduleName = 'emergency';

export const ERR_DISABLED: U64 = u64('4002');
export const ERR_EMERGENCY: U64 = u64('4001');
export const ERR_NOT_EMERGENCY: U64 = u64('4003');
export const ERR_NO_PERMISSIONS: U64 = u64('4000');

export class Disabled {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Disabled';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static DisabledParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Disabled {
    const proto = $.parseStructProto(data, typeTag, repo, Disabled);
    return new Disabled(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Disabled, typeParams);
    return result as unknown as Disabled;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Disabled, typeParams);
    await result.loadFullState(app);
    return result as unknown as Disabled;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Disabled', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class Emergency {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Emergency';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static EmergencyParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): Emergency {
    const proto = $.parseStructProto(data, typeTag, repo, Emergency);
    return new Emergency(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Emergency, typeParams);
    return result as unknown as Emergency;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Emergency, typeParams);
    await result.loadFullState(app);
    return result as unknown as Emergency;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'Emergency', []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function assert_no_emergency_($c: AptosDataCache): void {
  if (!!is_emergency_($c)) {
    throw $.abortCode($.copy(ERR_EMERGENCY));
  }
  return;
}

export function disable_forever_(account: HexString, $c: AptosDataCache): void {
  if (!!is_disabled_($c)) {
    throw $.abortCode($.copy(ERR_DISABLED));
  }
  if (
    !(
      Stdlib.Signer.address_of_(account, $c).hex() ===
      new HexString('0xb4d7b2466d211c1f4629e8340bb1a9e75e7f8fb38cc145c54c5c9f9d5017a318').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NO_PERMISSIONS));
  }
  $c.move_to(new SimpleStructTag(Disabled), account, new Disabled({}, new SimpleStructTag(Disabled)));
  return;
}

export function buildPayload_disable_forever(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'emergency',
    'disable_forever',
    typeParamStrings,
    [],
    isJSON
  );
}
export function is_disabled_($c: AptosDataCache): boolean {
  return $c.exists(
    new SimpleStructTag(Disabled),
    new HexString('0xb4d7b2466d211c1f4629e8340bb1a9e75e7f8fb38cc145c54c5c9f9d5017a318')
  );
}

export function is_emergency_($c: AptosDataCache): boolean {
  return $c.exists(
    new SimpleStructTag(Emergency),
    new HexString('0xb4d7b2466d211c1f4629e8340bb1a9e75e7f8fb38cc145c54c5c9f9d5017a318')
  );
}

export function pause_(account: HexString, $c: AptosDataCache): void {
  if (!!is_disabled_($c)) {
    throw $.abortCode($.copy(ERR_DISABLED));
  }
  assert_no_emergency_($c);
  if (
    !(
      Stdlib.Signer.address_of_(account, $c).hex() ===
      new HexString('0xb4d7b2466d211c1f4629e8340bb1a9e75e7f8fb38cc145c54c5c9f9d5017a318').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NO_PERMISSIONS));
  }
  $c.move_to(new SimpleStructTag(Emergency), account, new Emergency({}, new SimpleStructTag(Emergency)));
  return;
}

export function buildPayload_pause(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'emergency',
    'pause',
    typeParamStrings,
    [],
    isJSON
  );
}
export function resume_(account: HexString, $c: AptosDataCache): void {
  let account_addr;
  if (!!is_disabled_($c)) {
    throw $.abortCode($.copy(ERR_DISABLED));
  }
  account_addr = Stdlib.Signer.address_of_(account, $c);
  if (
    !(
      $.copy(account_addr).hex() ===
      new HexString('0xb4d7b2466d211c1f4629e8340bb1a9e75e7f8fb38cc145c54c5c9f9d5017a318').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NO_PERMISSIONS));
  }
  if (!is_emergency_($c)) {
    throw $.abortCode($.copy(ERR_NOT_EMERGENCY));
  }
  $c.move_from<Emergency>(new SimpleStructTag(Emergency), $.copy(account_addr));
  return;
}

export function buildPayload_resume(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'emergency',
    'resume',
    typeParamStrings,
    [],
    isJSON
  );
}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::emergency::Disabled',
    Disabled.DisabledParser
  );
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::emergency::Emergency',
    Emergency.EmergencyParser
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
  get Disabled() {
    return Disabled;
  }
  async loadDisabled(owner: HexString, loadFull = true, fillCache = true) {
    const val = await Disabled.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get Emergency() {
    return Emergency;
  }
  async loadEmergency(owner: HexString, loadFull = true, fillCache = true) {
    const val = await Emergency.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  payload_disable_forever(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_disable_forever(isJSON);
  }
  async disable_forever(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_disable_forever(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_pause(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_pause(isJSON);
  }
  async pause(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_pause(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
  payload_resume(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_resume(isJSON);
  }
  async resume(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload = buildPayload_resume(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, option);
  }
}
