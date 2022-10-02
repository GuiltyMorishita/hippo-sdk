import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'LiquidswapInit';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'lp_account';

export const ERR_NOT_ENOUGH_PERMISSIONS: U64 = u64('1701');

export class CapabilityStorage {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'CapabilityStorage';
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: 'signer_cap', typeTag: new StructTag(new HexString('0x1'), 'account', 'SignerCapability', []) }
  ];

  signer_cap: Stdlib.Account.SignerCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.signer_cap = proto['signer_cap'] as Stdlib.Account.SignerCapability;
  }

  static CapabilityStorageParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): CapabilityStorage {
    const proto = $.parseStructProto(data, typeTag, repo, CapabilityStorage);
    return new CapabilityStorage(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CapabilityStorage, typeParams);
    return result as unknown as CapabilityStorage;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, CapabilityStorage, typeParams);
    await result.loadFullState(app);
    return result as unknown as CapabilityStorage;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, 'CapabilityStorage', []);
  }
  async loadFullState(app: $.AppType) {
    await this.signer_cap.loadFullState(app);
    this.__app = app;
  }
}
export function initialize_lp_account_(
  liquidswap_admin: HexString,
  lp_coin_metadata_serialized: U8[],
  lp_coin_code: U8[],
  $c: AptosDataCache
): void {
  let lp_acc, signer_cap;
  if (
    !(
      Stdlib.Signer.address_of_(liquidswap_admin, $c).hex() ===
      new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NOT_ENOUGH_PERMISSIONS));
  }
  [lp_acc, signer_cap] = Stdlib.Account.create_resource_account_(
    liquidswap_admin,
    [
      u8('108'),
      u8('105'),
      u8('113'),
      u8('117'),
      u8('105'),
      u8('100'),
      u8('115'),
      u8('119'),
      u8('97'),
      u8('112'),
      u8('95'),
      u8('97'),
      u8('99'),
      u8('99'),
      u8('111'),
      u8('117'),
      u8('110'),
      u8('116'),
      u8('95'),
      u8('115'),
      u8('101'),
      u8('101'),
      u8('100')
    ],
    $c
  );
  Stdlib.Code.publish_package_txn_(lp_acc, $.copy(lp_coin_metadata_serialized), [$.copy(lp_coin_code)], $c);
  $c.move_to(
    new SimpleStructTag(CapabilityStorage),
    liquidswap_admin,
    new CapabilityStorage({ signer_cap: signer_cap }, new SimpleStructTag(CapabilityStorage))
  );
  return;
}

export function buildPayload_initialize_lp_account(
  lp_coin_metadata_serialized: U8[],
  lp_coin_code: U8[],
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'lp_account',
    'initialize_lp_account',
    typeParamStrings,
    [lp_coin_metadata_serialized, lp_coin_code],
    isJSON
  );
}
export function retrieve_signer_cap_(liquidswap_admin: HexString, $c: AptosDataCache): Stdlib.Account.SignerCapability {
  if (
    !(
      Stdlib.Signer.address_of_(liquidswap_admin, $c).hex() ===
      new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9').hex()
    )
  ) {
    throw $.abortCode($.copy(ERR_NOT_ENOUGH_PERMISSIONS));
  }
  let { signer_cap: signer_cap } = $c.move_from<CapabilityStorage>(
    new SimpleStructTag(CapabilityStorage),
    Stdlib.Signer.address_of_(liquidswap_admin, $c)
  );
  return signer_cap;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::lp_account::CapabilityStorage',
    CapabilityStorage.CapabilityStorageParser
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
  get CapabilityStorage() {
    return CapabilityStorage;
  }
  async loadCapabilityStorage(owner: HexString, loadFull = true, fillCache = true) {
    const val = await CapabilityStorage.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  payload_initialize_lp_account(
    lp_coin_metadata_serialized: U8[],
    lp_coin_code: U8[],
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_initialize_lp_account(lp_coin_metadata_serialized, lp_coin_code, isJSON);
  }
  async initialize_lp_account(
    _account: AptosAccount,
    lp_coin_metadata_serialized: U8[],
    lp_coin_code: U8[],
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_initialize_lp_account(lp_coin_metadata_serialized, lp_coin_code, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
