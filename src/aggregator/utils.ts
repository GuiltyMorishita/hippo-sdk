import { StructTag } from '@manahippo/move-to-ts';
import { RawStruct } from './types';
import { HexString } from 'aptos';

export function toRawStruct(structTag: StructTag): RawStruct {
  return { address: structTag.address.hex(), module: structTag.module, name: structTag.name } as RawStruct;
}
export function toStructTag(st: RawStruct): StructTag {
  return new StructTag(new HexString(st.address), st.module, st.name, []);
}
