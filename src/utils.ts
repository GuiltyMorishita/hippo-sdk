import { StructTag, getTypeTagFullname, parseTypeTagOrThrow, TypeTag, u8str, strToU8 } from "@manahippo/move-to-ts";
import { HexString } from "aptos";
import * as AptosStdlib from "./generated/aptos_std";


export function typeInfoToTypeTag(typeInfo: AptosStdlib.Type_info.TypeInfo) {
  const fullname =  `${typeInfo.account_address.hex()}::${u8str(typeInfo.module_name)}::${u8str(typeInfo.struct_name)}`;
  return parseTypeTagOrThrow(fullname);
}

export function typeTagToTypeInfo(tag: StructTag): AptosStdlib.Type_info.TypeInfo {
  return new AptosStdlib.Type_info.TypeInfo({
    account_address: tag.address,
    module_name: strToU8(tag.module),
    struct_name: strToU8(tag.name),
  }, new StructTag(AptosStdlib.Type_info.moduleAddress, AptosStdlib.Type_info.moduleName, AptosStdlib.Type_info.TypeInfo.structName, []))
}

export function isTypeInfoSame(ti1: AptosStdlib.Type_info.TypeInfo, ti2: AptosStdlib.Type_info.TypeInfo) {
  return ti1.account_address.toShortString() === ti2.account_address.toShortString() &&
    u8str(ti1.module_name) === u8str(ti2.module_name) && 
    u8str(ti1.struct_name) === u8str(ti2.struct_name);
}

export function printResource(resource: any) {
  console.log(JSON.stringify(resource, null, 2));
}

export function printResources(resources: any[]) {
  let i = 0;
  console.log(`Total resource count: ${resources.length}`);
  for (const resource of resources) {
    console.log(`##################${i}`);
    printResource(resource);
    i++;
  }
}