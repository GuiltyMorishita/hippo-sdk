import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
export const packageName = 'Cetue-AMM';
export const moduleAddress = new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba');
export const moduleName = 'amm_config';

export const DEFAULT_TRADE_FEE_DENOMINATOR: U64 = u64('10000');
export const DEFAULT_TRADE_FEE_NUMERATOR: U64 = u64('1');

export class PoolFeeConfig {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolFeeConfig';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'CoinTypeA', isPhantom: true },
    { name: 'CoinTypeB', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'trade_fee_numerator', typeTag: AtomicTypeTag.U64 },
    { name: 'trade_fee_denominator', typeTag: AtomicTypeTag.U64 },
    { name: 'protocol_fee_numerator', typeTag: AtomicTypeTag.U64 },
    { name: 'protocol_fee_denominator', typeTag: AtomicTypeTag.U64 }
  ];

  trade_fee_numerator: U64;
  trade_fee_denominator: U64;
  protocol_fee_numerator: U64;
  protocol_fee_denominator: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.trade_fee_numerator = proto['trade_fee_numerator'] as U64;
    this.trade_fee_denominator = proto['trade_fee_denominator'] as U64;
    this.protocol_fee_numerator = proto['protocol_fee_numerator'] as U64;
    this.protocol_fee_denominator = proto['protocol_fee_denominator'] as U64;
  }

  static PoolFeeConfigParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolFeeConfig {
    const proto = $.parseStructProto(data, typeTag, repo, PoolFeeConfig);
    return new PoolFeeConfig(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PoolFeeConfig, typeParams);
    return result as unknown as PoolFeeConfig;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, PoolFeeConfig, typeParams);
    await result.loadFullState(app);
    return result as unknown as PoolFeeConfig;
  }
  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolFeeConfig', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function admin_address_($c: AptosDataCache): HexString {
  return new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba');
}

export function get_trade_fee_($c: AptosDataCache, $p: TypeTag[] /* <CoinTypeA, CoinTypeB>*/): [U64, U64] {
  let temp$1, temp$2, fee_config;
  if ($c.exists(new SimpleStructTag(PoolFeeConfig, [$p[0], $p[1]]), admin_address_($c))) {
    fee_config = $c.borrow_global<PoolFeeConfig>(
      new SimpleStructTag(PoolFeeConfig, [$p[0], $p[1]]),
      admin_address_($c)
    );
    [temp$1, temp$2] = [$.copy(fee_config.trade_fee_numerator), $.copy(fee_config.trade_fee_denominator)];
  } else {
    [temp$1, temp$2] = [$.copy(DEFAULT_TRADE_FEE_NUMERATOR), $.copy(DEFAULT_TRADE_FEE_DENOMINATOR)];
  }
  return [temp$1, temp$2];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba::amm_config::PoolFeeConfig',
    PoolFeeConfig.PoolFeeConfigParser
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
  get PoolFeeConfig() {
    return PoolFeeConfig;
  }
  async loadPoolFeeConfig(
    owner: HexString,
    $p: TypeTag[] /* <CoinTypeA, CoinTypeB> */,
    loadFull = true,
    fillCache = true
  ) {
    const val = await PoolFeeConfig.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
}
