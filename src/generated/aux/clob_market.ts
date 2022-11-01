import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'aux';
export const moduleAddress = new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541');
export const moduleName = 'clob_market';

export function load_market_into_event_(_sender: HexString, $c: AptosDataCache, $p: TypeTag[] /* <B, Q>*/): void {
  return;
}

export function buildPayload_load_market_into_event(
  $p: TypeTag[] /* <B, Q>*/,
  isJSON = false
): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString('0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541'),
    'clob_market',
    'load_market_into_event',
    typeParamStrings,
    [],
    isJSON
  );
}
export function place_market_order_mut_(
  _sender_addr: HexString,
  _base_coin: Stdlib.Coin.Coin,
  _quote_coin: Stdlib.Coin.Coin,
  _is_bid: boolean,
  _order_type: U64,
  _limit_price: U64,
  _quantity: U64,
  _client_order_id: U128,
  $c: AptosDataCache,
  $p: TypeTag[] /* <B, Q>*/
): [U64, U64] {
  return [u64('0'), u64('0')];
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
  payload_load_market_into_event(
    $p: TypeTag[] /* <B, Q>*/,
    isJSON = false
  ): TxnBuilderTypes.TransactionPayloadEntryFunction | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_load_market_into_event($p, isJSON);
  }
  async load_market_into_event(
    _account: AptosAccount,
    $p: TypeTag[] /* <B, Q>*/,
    option?: OptionTransaction,
    _isJSON = false
  ) {
    const payload__ = buildPayload_load_market_into_event($p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload__, option);
  }
}
