import { StructTag } from '@manahippo/move-to-ts';
import { StructType } from './types';
import { HexString } from 'aptos';

export function toStructType(structTag: StructTag) {
  return { address: structTag.address.hex(), module: structTag.module, name: structTag.name } as StructType;
}
export function toStructTag(st: StructType): StructTag {
  return new StructTag(new HexString(st.address), st.module, st.name, []);
}
