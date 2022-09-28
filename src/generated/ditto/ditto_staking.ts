import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'ditto-staking';
export const moduleAddress = new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894');
export const moduleName = 'ditto_staking';

export function exchange_aptos_(aptos: Stdlib.Coin.Coin, $c: AptosDataCache): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(aptos, $c, [new StructTag(new HexString('0x1'), 'aptos_coin', 'AptosCoin', [])]);
  return Stdlib.Coin.zero_($c, [
    new StructTag(
      new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
      'staked_coin',
      'StakedAptos',
      []
    )
  ]);
}

export function exchange_staptos_(staptos: Stdlib.Coin.Coin, $c: AptosDataCache): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(staptos, $c, [
    new StructTag(
      new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
      'staked_coin',
      'StakedAptos',
      []
    )
  ]);
  return Stdlib.Coin.zero_($c, [new StructTag(new HexString('0x1'), 'aptos_coin', 'AptosCoin', [])]);
}

export function instant_unstake_(_user: HexString, _amount: U64, $c: AptosDataCache): void {
  return;
}

export function buildPayload_instant_unstake(
  _amount: U64,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
    'ditto_staking',
    'instant_unstake',
    typeParamStrings,
    [_amount],
    isJSON
  );
}
export function stake_aptos_(_user: HexString, _amount: U64, $c: AptosDataCache): void {
  return;
}

export function buildPayload_stake_aptos(
  _amount: U64,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
    'ditto_staking',
    'stake_aptos',
    typeParamStrings,
    [_amount],
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
  payload_instant_unstake(
    _amount: U64,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_instant_unstake(_amount, isJSON);
  }
  async instant_unstake(_account: AptosAccount, _amount: U64, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_instant_unstake(_amount, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_stake_aptos(
    _amount: U64,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_stake_aptos(_amount, isJSON);
  }
  async stake_aptos(_account: AptosAccount, _amount: U64, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_stake_aptos(_amount, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
