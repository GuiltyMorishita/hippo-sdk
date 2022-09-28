import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'tortuga-stub';
export const moduleAddress = new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab');
export const moduleName = 'stake_router';

export function stake_(_user: HexString, _amount: U64, $c: AptosDataCache): void {
  return;
}

export function buildPayload_stake(
  _amount: U64,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab'),
    'stake_router',
    'stake',
    typeParamStrings,
    [_amount],
    isJSON
  );
}
export function stake_coins_(aptos: Stdlib.Coin.Coin, $c: AptosDataCache): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(aptos, $c, [new StructTag(new HexString('0x1'), 'aptos_coin', 'AptosCoin', [])]);
  return Stdlib.Coin.zero_($c, [
    new StructTag(
      new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab'),
      'staked_aptos_coin',
      'StakedAptosCoin',
      []
    )
  ]);
}

export function unstake_(_user: HexString, _amount: U64, $c: AptosDataCache): void {
  return;
}

export function buildPayload_unstake(
  _amount: U64,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab'),
    'stake_router',
    'unstake',
    typeParamStrings,
    [_amount],
    isJSON
  );
}
export function unstake_immediate_(_user: HexString, _amount: U64, $c: AptosDataCache): void {
  return;
}

export function buildPayload_unstake_immediate(
  _amount: U64,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab'),
    'stake_router',
    'unstake_immediate',
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
  payload_stake(
    _amount: U64,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_stake(_amount, isJSON);
  }
  async stake(_account: AptosAccount, _amount: U64, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_stake(_amount, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_unstake(
    _amount: U64,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_unstake(_amount, isJSON);
  }
  async unstake(_account: AptosAccount, _amount: U64, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_unstake(_amount, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_unstake_immediate(
    _amount: U64,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_unstake_immediate(_amount, isJSON);
  }
  async unstake_immediate(_account: AptosAccount, _amount: U64, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_unstake_immediate(_amount, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
