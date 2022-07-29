import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as std$_ from "../std";
import * as Caps$_ from "./Caps";
import * as Registry$_ from "./Registry";
import * as Version$_ from "./Version";
export const packageName = "Econia";
export const moduleAddress = new HexString("0x389397a906ddab111bc8f8bfece404424d9da38f64e45f262e444281a2d71618");
export const moduleName = "Init";

export const E_NOT_ECONIA : U64 = u64("0");

export function init_econia$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  if (!(std$_.signer$_.address_of$(account, $c).hex() === new HexString("0x389397a906ddab111bc8f8bfece404424d9da38f64e45f262e444281a2d71618").hex())) {
    throw $.abortCode(E_NOT_ECONIA);
  }
  Caps$_.init_caps$(account, $c);
  Registry$_.init_registry$(account, $c);
  Version$_.init_mock_version_number$(account, $c);
  return;
}


export function buildPayload_init_econia (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x389397a906ddab111bc8f8bfece404424d9da38f64e45f262e444281a2d71618::Init::init_econia",
    typeParamStrings,
    []
  );

}

export function loadParsers(repo: AptosParserRepo) {
}

