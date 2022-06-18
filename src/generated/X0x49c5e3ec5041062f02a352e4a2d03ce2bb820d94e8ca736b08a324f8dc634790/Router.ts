import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosClient } from "aptos";
import { AptosAccount } from "aptos";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790");
export const moduleName = "Router";

export const E_OUTPUT_LESS_THAN_MINIMUM: bigInt.BigInteger = bigInt("2");
export const E_UNKNOWN_POOL_TYPE: bigInt.BigInteger = bigInt("1");
export const POOL_TYPE_CONSTANT_PRODUCT: number = 1;
export const POOL_TYPE_PIECEWISE: number = 3;
export const POOL_TYPE_STABLE_CURVE: number = 2;

export async function two_step_route_script(
  client: AptosClient,
  account: AptosAccount,
  first_pool_type: number,
  first_is_x_to_y: boolean,
  second_pool_type: number,
  second_is_x_to_y: boolean,
  x_in: bigInt.BigInteger,
  z_min_out: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::Router::two_step_route_script",
    typeParamStrings,
    [
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      x_in.toString(),
      z_min_out.toString(),
    ]
  );
}
export function build_payload_two_step_route_script(
  first_pool_type: number,
  first_is_x_to_y: boolean,
  second_pool_type: number,
  second_is_x_to_y: boolean,
  x_in: bigInt.BigInteger,
  z_min_out: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::Router::two_step_route_script",
    typeParamStrings,
    [
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      x_in.toString(),
      z_min_out.toString(),
    ]
  );
}

export async function three_step_route_script(
  client: AptosClient,
  account: AptosAccount,
  first_pool_type: number,
  first_is_x_to_y: boolean,
  second_pool_type: number,
  second_is_x_to_y: boolean,
  third_pool_type: number,
  third_is_x_to_y: boolean,
  x_in: bigInt.BigInteger,
  a_min_out: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::Router::three_step_route_script",
    typeParamStrings,
    [
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      third_pool_type,
      third_is_x_to_y,
      x_in.toString(),
      a_min_out.toString(),
    ]
  );
}
export function build_payload_three_step_route_script(
  first_pool_type: number,
  first_is_x_to_y: boolean,
  second_pool_type: number,
  second_is_x_to_y: boolean,
  third_pool_type: number,
  third_is_x_to_y: boolean,
  x_in: bigInt.BigInteger,
  a_min_out: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790::Router::three_step_route_script",
    typeParamStrings,
    [
      first_pool_type,
      first_is_x_to_y,
      second_pool_type,
      second_is_x_to_y,
      third_pool_type,
      third_is_x_to_y,
      x_in.toString(),
      a_min_out.toString(),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
}