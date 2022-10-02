import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Router from './router';
export const packageName = 'Liquidswap';
export const moduleAddress = new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9');
export const moduleName = 'scripts';

export function add_liquidity_(
  account: HexString,
  coin_x_val: U64,
  coin_x_val_min: U64,
  coin_y_val: U64,
  coin_y_val_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let account_addr, coin_x, coin_x_remainder, coin_y, coin_y_remainder, lp_coins;
  coin_x = Stdlib.Coin.withdraw_(account, $.copy(coin_x_val), $c, [$p[0]]);
  coin_y = Stdlib.Coin.withdraw_(account, $.copy(coin_y_val), $c, [$p[1]]);
  [coin_x_remainder, coin_y_remainder, lp_coins] = Router.add_liquidity_(
    coin_x,
    $.copy(coin_x_val_min),
    coin_y,
    $.copy(coin_y_val_min),
    $c,
    [$p[0], $p[1], $p[2]]
  );
  account_addr = Stdlib.Signer.address_of_(account, $c);
  if (
    !Stdlib.Coin.is_account_registered_($.copy(account_addr), $c, [
      new StructTag(
        new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
        'lp_coin',
        'LP',
        [$p[0], $p[1], $p[2]]
      )
    ])
  ) {
    Stdlib.Coin.register_(account, $c, [
      new StructTag(
        new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
        'lp_coin',
        'LP',
        [$p[0], $p[1], $p[2]]
      )
    ]);
  } else {
  }
  Stdlib.Coin.deposit_($.copy(account_addr), coin_x_remainder, $c, [$p[0]]);
  Stdlib.Coin.deposit_($.copy(account_addr), coin_y_remainder, $c, [$p[1]]);
  Stdlib.Coin.deposit_($.copy(account_addr), lp_coins, $c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  return;
}

export function buildPayload_add_liquidity(
  coin_x_val: U64,
  coin_x_val_min: U64,
  coin_y_val: U64,
  coin_y_val_min: U64,
  $p: TypeTag[] /* <X, Y, Curve>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'scripts',
    'add_liquidity',
    typeParamStrings,
    [coin_x_val, coin_x_val_min, coin_y_val, coin_y_val_min],
    isJSON
  );
}
export function register_pool_(account: HexString, $c: AptosDataCache, $p: TypeTag[] /* <X, Y, Curve>*/): void {
  Router.register_pool_(account, $c, [$p[0], $p[1], $p[2]]);
  return;
}

export function buildPayload_register_pool(
  $p: TypeTag[] /* <X, Y, Curve>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'scripts',
    'register_pool',
    typeParamStrings,
    [],
    isJSON
  );
}
export function register_pool_and_add_liquidity_(
  account: HexString,
  coin_x_val: U64,
  coin_x_val_min: U64,
  coin_y_val: U64,
  coin_y_val_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  Router.register_pool_(account, $c, [$p[0], $p[1], $p[2]]);
  add_liquidity_(account, $.copy(coin_x_val), $.copy(coin_x_val_min), $.copy(coin_y_val), $.copy(coin_y_val_min), $c, [
    $p[0],
    $p[1],
    $p[2]
  ]);
  return;
}

export function buildPayload_register_pool_and_add_liquidity(
  coin_x_val: U64,
  coin_x_val_min: U64,
  coin_y_val: U64,
  coin_y_val_min: U64,
  $p: TypeTag[] /* <X, Y, Curve>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'scripts',
    'register_pool_and_add_liquidity',
    typeParamStrings,
    [coin_x_val, coin_x_val_min, coin_y_val, coin_y_val_min],
    isJSON
  );
}
export function remove_liquidity_(
  account: HexString,
  lp_val: U64,
  min_x_out_val: U64,
  min_y_out_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let account_addr, coin_x, coin_y, lp_coins;
  lp_coins = Stdlib.Coin.withdraw_(account, $.copy(lp_val), $c, [
    new StructTag(
      new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
      'lp_coin',
      'LP',
      [$p[0], $p[1], $p[2]]
    )
  ]);
  [coin_x, coin_y] = Router.remove_liquidity_(lp_coins, $.copy(min_x_out_val), $.copy(min_y_out_val), $c, [
    $p[0],
    $p[1],
    $p[2]
  ]);
  account_addr = Stdlib.Signer.address_of_(account, $c);
  Stdlib.Coin.deposit_($.copy(account_addr), coin_x, $c, [$p[0]]);
  Stdlib.Coin.deposit_($.copy(account_addr), coin_y, $c, [$p[1]]);
  return;
}

export function buildPayload_remove_liquidity(
  lp_val: U64,
  min_x_out_val: U64,
  min_y_out_val: U64,
  $p: TypeTag[] /* <X, Y, Curve>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'scripts',
    'remove_liquidity',
    typeParamStrings,
    [lp_val, min_x_out_val, min_y_out_val],
    isJSON
  );
}
export function swap_(
  account: HexString,
  coin_val: U64,
  coin_out_min_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let account_addr, coin_x, coin_y;
  coin_x = Stdlib.Coin.withdraw_(account, $.copy(coin_val), $c, [$p[0]]);
  coin_y = Router.swap_exact_coin_for_coin_(coin_x, $.copy(coin_out_min_val), $c, [$p[0], $p[1], $p[2]]);
  account_addr = Stdlib.Signer.address_of_(account, $c);
  Stdlib.Coin.deposit_($.copy(account_addr), coin_y, $c, [$p[1]]);
  return;
}

export function buildPayload_swap(
  coin_val: U64,
  coin_out_min_val: U64,
  $p: TypeTag[] /* <X, Y, Curve>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'scripts',
    'swap',
    typeParamStrings,
    [coin_val, coin_out_min_val],
    isJSON
  );
}
export function swap_into_(
  account: HexString,
  coin_val_max: U64,
  coin_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y, Curve>*/
): void {
  let account_addr, coin_x, coin_x__1, coin_y;
  coin_x = Stdlib.Coin.withdraw_(account, $.copy(coin_val_max), $c, [$p[0]]);
  [coin_x__1, coin_y] = Router.swap_coin_for_exact_coin_(coin_x, $.copy(coin_out), $c, [$p[0], $p[1], $p[2]]);
  account_addr = Stdlib.Signer.address_of_(account, $c);
  Stdlib.Coin.deposit_($.copy(account_addr), coin_x__1, $c, [$p[0]]);
  Stdlib.Coin.deposit_($.copy(account_addr), coin_y, $c, [$p[1]]);
  return;
}

export function buildPayload_swap_into(
  coin_val_max: U64,
  coin_out: U64,
  $p: TypeTag[] /* <X, Y, Curve>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
    'scripts',
    'swap_into',
    typeParamStrings,
    [coin_val_max, coin_out],
    isJSON
  );
}
export function loadParsers(repo: AptosParserRepo) {}
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
  payload_add_liquidity(
    coin_x_val: U64,
    coin_x_val_min: U64,
    coin_y_val: U64,
    coin_y_val_min: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_liquidity(coin_x_val, coin_x_val_min, coin_y_val, coin_y_val_min, $p, isJSON);
  }
  async add_liquidity(
    _account: AptosAccount,
    coin_x_val: U64,
    coin_x_val_min: U64,
    coin_y_val: U64,
    coin_y_val_min: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_add_liquidity(coin_x_val, coin_x_val_min, coin_y_val, coin_y_val_min, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_register_pool(
    $p: TypeTag[] /* <X, Y, Curve>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_register_pool($p, isJSON);
  }
  async register_pool(_account: AptosAccount, $p: TypeTag[] /* <X, Y, Curve>*/, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_register_pool($p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_register_pool_and_add_liquidity(
    coin_x_val: U64,
    coin_x_val_min: U64,
    coin_y_val: U64,
    coin_y_val_min: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_register_pool_and_add_liquidity(
      coin_x_val,
      coin_x_val_min,
      coin_y_val,
      coin_y_val_min,
      $p,
      isJSON
    );
  }
  async register_pool_and_add_liquidity(
    _account: AptosAccount,
    coin_x_val: U64,
    coin_x_val_min: U64,
    coin_y_val: U64,
    coin_y_val_min: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_register_pool_and_add_liquidity(
      coin_x_val,
      coin_x_val_min,
      coin_y_val,
      coin_y_val_min,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_liquidity(
    lp_val: U64,
    min_x_out_val: U64,
    min_y_out_val: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_remove_liquidity(lp_val, min_x_out_val, min_y_out_val, $p, isJSON);
  }
  async remove_liquidity(
    _account: AptosAccount,
    lp_val: U64,
    min_x_out_val: U64,
    min_y_out_val: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_remove_liquidity(lp_val, min_x_out_val, min_y_out_val, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_swap(
    coin_val: U64,
    coin_out_min_val: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_swap(coin_val, coin_out_min_val, $p, isJSON);
  }
  async swap(
    _account: AptosAccount,
    coin_val: U64,
    coin_out_min_val: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_swap(coin_val, coin_out_min_val, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_swap_into(
    coin_val_max: U64,
    coin_out: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_swap_into(coin_val_max, coin_out, $p, isJSON);
  }
  async swap_into(
    _account: AptosAccount,
    coin_val_max: U64,
    coin_out: U64,
    $p: TypeTag[] /* <X, Y, Curve>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_swap_into(coin_val_max, coin_out, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
