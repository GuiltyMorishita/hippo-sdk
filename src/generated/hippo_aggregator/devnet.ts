import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Aux from '../aux';
import * as Coin_list from '../coin_list';
import * as Liquidswap from '../liquidswap';
export const packageName = 'HippoAggregator';
export const moduleAddress = new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039');
export const moduleName = 'devnet';

export const BTC_AMOUNT: U64 = u64('100000000').mul(u64('1000'));
export const STABLE_COIN_AMOUNT: U64 = u64('100000000').mul(u64('1000')).mul(u64('10000'));

export class PontemLP {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PontemLP';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static PontemLPParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PontemLP {
    const proto = $.parseStructProto(data, typeTag, repo, PontemLP);
    return new PontemLP(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PontemLP', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}

export class PontemLP2 {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PontemLP2';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'X', isPhantom: true },
    { name: 'Y', isPhantom: true },
    { name: 'curve', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static PontemLP2Parser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PontemLP2 {
    const proto = $.parseStructProto(data, typeTag, repo, PontemLP2);
    return new PontemLP2(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PontemLP2', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function deploy_aux_(
  admin: HexString,
  xAmount: U64,
  yAmount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  Aux.Amm.create_pool_(admin, u64('1'), $c, [$p[0], $p[1]]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(xAmount), $c, [$p[0]]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(yAmount), $c, [$p[1]]);
  return Aux.Amm.add_exact_liquidity_(admin, $.copy(xAmount), $.copy(yAmount), $c, [$p[0], $p[1]]);
}

export function deploy_pontem_(
  admin: HexString,
  xAmount: U64,
  yAmount: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <xCoin, yCoin, curve>*/
): void {
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(xAmount), $c, [$p[0]]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(yAmount), $c, [$p[1]]);
  return Liquidswap.Scripts.register_pool_and_add_liquidity_(
    admin,
    $.copy(xAmount),
    $.copy(xAmount),
    $.copy(yAmount),
    $.copy(yAmount),
    $c,
    [$p[0], $p[1], $p[2]]
  );
}

export function mock_deploy_aux_(admin: HexString, $c: AptosDataCache): void {
  deploy_aux_(admin, $.copy(BTC_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetBTC',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDC',
      []
    )
  ]);
  deploy_aux_(admin, $.copy(BTC_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetBTC',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDT',
      []
    )
  ]);
  deploy_aux_(admin, $.copy(STABLE_COIN_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDC',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDT',
      []
    )
  ]);
  deploy_aux_(admin, $.copy(STABLE_COIN_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetDAI',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDC',
      []
    )
  ]);
  return;
}

export function buildPayload_mock_deploy_aux(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'devnet',
    'mock_deploy_aux',
    typeParamStrings,
    [],
    isJSON
  );
}

export function mock_deploy_pontem_(admin: HexString, $c: AptosDataCache): void {
  deploy_pontem_(admin, $.copy(BTC_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetBTC',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDC',
      []
    ),
    new StructTag(
      new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12'),
      'curves',
      'Uncorrelated',
      []
    )
  ]);
  deploy_pontem_(admin, $.copy(BTC_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetBTC',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDT',
      []
    ),
    new StructTag(
      new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12'),
      'curves',
      'Uncorrelated',
      []
    )
  ]);
  deploy_pontem_(admin, $.copy(STABLE_COIN_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDC',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDT',
      []
    ),
    new StructTag(
      new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12'),
      'curves',
      'Stable',
      []
    )
  ]);
  deploy_pontem_(admin, $.copy(STABLE_COIN_AMOUNT), $.copy(STABLE_COIN_AMOUNT), $c, [
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetDAI',
      []
    ),
    new StructTag(
      new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
      'devnet_coins',
      'DevnetUSDC',
      []
    ),
    new StructTag(
      new HexString('0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12'),
      'curves',
      'Stable',
      []
    )
  ]);
  return;
}

export function buildPayload_mock_deploy_pontem(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'devnet',
    'mock_deploy_pontem',
    typeParamStrings,
    [],
    isJSON
  );
}

export function registe_coins_(
  hippo_swap: HexString,
  coin_list: HexString,
  deploy_coin_list: boolean,
  $c: AptosDataCache
): void {
  let _coin_list, _deploy_coin_list, _hippo_swap;
  _hippo_swap = hippo_swap;
  _coin_list = coin_list;
  _deploy_coin_list = deploy_coin_list;
  return;
}

export function buildPayload_registe_coins(
  deploy_coin_list: boolean,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
    'devnet',
    'registe_coins',
    typeParamStrings,
    [deploy_coin_list],
    isJSON
  );
}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser(
    '0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039::devnet::PontemLP',
    PontemLP.PontemLPParser
  );
  repo.addParser(
    '0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039::devnet::PontemLP2',
    PontemLP2.PontemLP2Parser
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
  get PontemLP() {
    return PontemLP;
  }
  get PontemLP2() {
    return PontemLP2;
  }
  payload_mock_deploy_aux(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mock_deploy_aux(isJSON);
  }
  async mock_deploy_aux(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload__ = buildPayload_mock_deploy_aux(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_mock_deploy_pontem(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mock_deploy_pontem(isJSON);
  }
  async mock_deploy_pontem(_account: AptosAccount, option?: OptionTransaction, _isJSON = false) {
    const payload__ = buildPayload_mock_deploy_pontem(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
  payload_registe_coins(
    deploy_coin_list: boolean,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_registe_coins(deploy_coin_list, isJSON);
  }
  async registe_coins(_account: AptosAccount, deploy_coin_list: boolean, option?: OptionTransaction, _isJSON = false) {
    const payload__ = buildPayload_registe_coins(deploy_coin_list, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
}
