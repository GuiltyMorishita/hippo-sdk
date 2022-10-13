import * as $ from '@manahippo/move-to-ts';
import { AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache } from '@manahippo/move-to-ts';
import { U8, U64, U128 } from '@manahippo/move-to-ts';
import { u8, u64, u128 } from '@manahippo/move-to-ts';
import { TypeParamDeclType, FieldDeclType } from '@manahippo/move-to-ts';
import { AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag } from '@manahippo/move-to-ts';
import { OptionTransaction } from '@manahippo/move-to-ts';
import { HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types } from 'aptos';
import * as Stdlib from '../stdlib';
export const packageName = 'Aptoswap';
export const moduleAddress = new HexString('0x6b6f23b7ecaa50a02c699be6cc1d3e60a545090ba24e6b145ad71639e38bf4ba');
export const moduleName = 'pool';

export function swap_x_to_y_direct_(
  in_coin: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(in_coin, $c, [$p[0]]);
  return Stdlib.Coin.zero_($c, [$p[1]]);
}

export function swap_y_to_x_direct_(
  in_coin: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(in_coin, $c, [$p[1]]);
  return Stdlib.Coin.zero_($c, [$p[0]]);
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
}
