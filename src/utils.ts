import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import * as X0x1 from "./generated/X0x1";


export function typeInfoToTypeTag(typeInfo: X0x1.TypeInfo.TypeInfo) {
  const fullname =  `${typeInfo.account_address.hex()}::${typeInfo.module_name.toString()}::${typeInfo.struct_name.toString()}`;
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