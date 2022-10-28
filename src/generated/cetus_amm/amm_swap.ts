import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Amm_config from './amm_config';
export const packageName = 'Cetue-AMM';
export const moduleAddress = new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba');
export const moduleName = 'amm_swap';

export const EPOOL_DOSE_NOT_EXIST: U64 = u64('4007');

export class Pool {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'Pool';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'CoinTypeA', isPhantom: true },
    { name: 'CoinTypeB', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
    { name: 'coin_a', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(0)]) },
    { name: 'coin_b', typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [new $.TypeParamIdx(1)]) },
    {
      name: 'mint_capability',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'MintCapability', [
        new StructTag(
          new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba'),
          'amm_swap',
          'PoolLiquidityCoin',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1)]
        )
      ])
    },
    {
      name: 'burn_capability',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'BurnCapability', [
        new StructTag(
          new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba'),
          'amm_swap',
          'PoolLiquidityCoin',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1)]
        )
      ])
    },
    {
      name: 'locked_liquidity',
      typeTag: new StructTag(new HexString('0x1'), 'coin', 'Coin', [
        new StructTag(
          new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba'),
          'amm_swap',
          'PoolLiquidityCoin',
          [new $.TypeParamIdx(0), new $.TypeParamIdx(1)]
        )
      ])
    },
    { name: 'protocol_fee_to', typeTag: AtomicTypeTag.Address }
  ];

  coin_a: Stdlib.Coin.Coin;
  coin_b: Stdlib.Coin.Coin;
  mint_capability: Stdlib.Coin.MintCapability;
  burn_capability: Stdlib.Coin.BurnCapability;
  locked_liquidity: Stdlib.Coin.Coin;
  protocol_fee_to: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_a = proto['coin_a'] as Stdlib.Coin.Coin;
    this.coin_b = proto['coin_b'] as Stdlib.Coin.Coin;
    this.mint_capability = proto['mint_capability'] as Stdlib.Coin.MintCapability;
    this.burn_capability = proto['burn_capability'] as Stdlib.Coin.BurnCapability;
    this.locked_liquidity = proto['locked_liquidity'] as Stdlib.Coin.Coin;
    this.protocol_fee_to = proto['protocol_fee_to'] as HexString;
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
    await this.coin_a.loadFullState(app);
    await this.coin_b.loadFullState(app);
    await this.mint_capability.loadFullState(app);
    await this.burn_capability.loadFullState(app);
    await this.locked_liquidity.loadFullState(app);
    this.__app = app;
  }
}

export class PoolLiquidityCoin {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = 'PoolLiquidityCoin';
  static typeParameters: TypeParamDeclType[] = [
    { name: 'CoinTypeA', isPhantom: true },
    { name: 'CoinTypeB', isPhantom: true }
  ];
  static fields: FieldDeclType[] = [];

  constructor(proto: any, public typeTag: TypeTag) {}

  static PoolLiquidityCoinParser(data: any, typeTag: TypeTag, repo: AptosParserRepo): PoolLiquidityCoin {
    const proto = $.parseStructProto(data, typeTag, repo, PoolLiquidityCoin);
    return new PoolLiquidityCoin(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, 'PoolLiquidityCoin', $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }
}
export function get_pool_direction_($c: AptosDataCache, $p: TypeTag[] /* <CoinTypeA, CoinTypeB>*/): boolean {
  let temp$1;
  if (
    $c.exists(
      new SimpleStructTag(Pool, [$p[0], $p[1]]),
      new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba')
    )
  ) {
    temp$1 = true;
  } else {
    if (
      !$c.exists(
        new SimpleStructTag(Pool, [$p[1], $p[0]]),
        new HexString('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba')
      )
    ) {
      throw $.abortCode($.copy(EPOOL_DOSE_NOT_EXIST));
    }
    temp$1 = false;
  }
  return temp$1;
}

export function get_reserves_($c: AptosDataCache, $p: TypeTag[] /* <CoinTypeA, CoinTypeB>*/): [U128, U128] {
  let a_reserve, b_reserve, pool;
  pool = $c.borrow_global<Pool>(new SimpleStructTag(Pool, [$p[0], $p[1]]), Amm_config.admin_address_($c));
  a_reserve = u128(Stdlib.Coin.value_(pool.coin_a, $c, [$p[0]]));
  b_reserve = u128(Stdlib.Coin.value_(pool.coin_b, $c, [$p[1]]));
  return [$.copy(a_reserve), $.copy(b_reserve)];
}

export function swap_and_emit_event_(
  _account: HexString,
  coin_a_in: Stdlib.Coin.Coin,
  _coin_b_out: U128,
  coin_b_in: Stdlib.Coin.Coin,
  _coin_a_out: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <CoinTypeA, CoinTypeB>*/
): [Stdlib.Coin.Coin, Stdlib.Coin.Coin, Stdlib.Coin.Coin, Stdlib.Coin.Coin] {
  return [coin_a_in, coin_b_in, Stdlib.Coin.zero_($c, [$p[0]]), Stdlib.Coin.zero_($c, [$p[1]])];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser('0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba::amm_swap::Pool', Pool.PoolParser);
  repo.addParser(
    '0xec42a352cc65eca17a9fa85d0fc602295897ed6b8b8af6a6c79ef490eb8f9eba::amm_swap::PoolLiquidityCoin',
    PoolLiquidityCoin.PoolLiquidityCoinParser
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
  get Pool() {
    return Pool;
  }
  async loadPool(owner: HexString, $p: TypeTag[] /* <CoinTypeA, CoinTypeB> */, loadFull = true, fillCache = true) {
    const val = await Pool.load(this.repo, this.client, owner, $p);
    if (loadFull) {
      await val.loadFullState(this);
    }
    if (fillCache) {
      this.cache.set(val.typeTag, owner, val);
    }
    return val;
  }
  get PoolLiquidityCoin() {
    return PoolLiquidityCoin;
  }
}
