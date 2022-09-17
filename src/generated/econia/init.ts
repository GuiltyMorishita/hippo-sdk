import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
import * as Market from './market';
import * as Registry from './registry';
export const packageName = 'Econia';
export const moduleAddress = new HexString('0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a');
export const moduleName = 'init';

export const E_NOT_ECONIA: U64 = u64('0');

export function init_econia_(account: HexString, $c: AptosDataCache): void {
  if (
    !(
      Stdlib.Signer.address_of_(account, $c).hex() ===
      new HexString('0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a').hex()
    )
  ) {
    throw $.abortCode($.copy(E_NOT_ECONIA));
  }
  Registry.init_registry_(account, $c);
  Market.init_econia_capability_store_(account, $c);
  return;
}

export function buildPayload_init_econia(
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString('0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a'),
    'init',
    'init_econia',
    typeParamStrings,
    [],
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
  payload_init_econia(
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_init_econia(isJSON);
  }
  async init_econia(_account: AptosAccount, _maxGas = 1000, _isJSON = false) {
    const payload = buildPayload_init_econia(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
