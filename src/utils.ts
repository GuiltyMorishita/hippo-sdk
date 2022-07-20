import { StructTag, getTypeTagFullname, parseTypeTagOrThrow, TypeTag, u8str, strToU8 } from "@manahippo/move-to-ts";
import { HexString } from "aptos";
import * as AptosFramework from "./generated/AptosFramework";


export function typeInfoToTypeTag(typeInfo: AptosFramework.TypeInfo.TypeInfo) {
  const fullname =  `${typeInfo.account_address.hex()}::${u8str(typeInfo.module_name)}::${u8str(typeInfo.struct_name)}`;
  return parseTypeTagOrThrow(fullname);
}

export function typeTagToTypeInfo(tag: TypeTag): AptosFramework.TypeInfo.TypeInfo {
  const fullname = getTypeTagFullname(tag);
  const [addr, modName, structName] = fullname.split("::");
  return new AptosFramework.TypeInfo.TypeInfo({
    account_address: new HexString(addr),
    module_name: strToU8(modName),
    struct_name: strToU8(structName),
  }, new StructTag(AptosFramework.TypeInfo.moduleAddress, AptosFramework.TypeInfo.moduleName, AptosFramework.TypeInfo.TypeInfo.structName, []))
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