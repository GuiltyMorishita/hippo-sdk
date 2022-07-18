import { parseTypeTagOrThrow, u8str } from "@manahippo/move-to-ts";
import * as AptosFramework from "./generated/AptosFramework";


export function typeInfoToTypeTag(typeInfo: AptosFramework.TypeInfo.TypeInfo) {
  const fullname =  `${typeInfo.account_address.hex()}::${u8str(typeInfo.module_name)}::${u8str(typeInfo.struct_name)}`;
  return parseTypeTagOrThrow(fullname);
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