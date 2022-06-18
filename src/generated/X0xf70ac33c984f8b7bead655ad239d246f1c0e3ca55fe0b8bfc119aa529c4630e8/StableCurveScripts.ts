import { HexString } from "aptos";
import bigInt from "big-integer";
import { AptosClient } from "aptos";
import { AptosAccount } from "aptos";
import { AptosVectorU8 } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "StableCurveScripts";

export const MICRO_CONVERSION_FACTOR: bigInt.BigInteger = bigInt("1000000");
export const E_LP_TOKEN_ALREADY_REGISTERED: bigInt.BigInteger = bigInt("7");
export const E_OUTPUT_LESS_THAN_MIN: bigInt.BigInteger = bigInt("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED: bigInt.BigInteger = bigInt("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED: bigInt.BigInteger = bigInt("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED: bigInt.BigInteger = bigInt("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED: bigInt.BigInteger = bigInt("4");
export const E_TOKEN_X_NOT_REGISTERED: bigInt.BigInteger = bigInt("5");
export const E_TOKEN_Y_NOT_REGISTERED: bigInt.BigInteger = bigInt("6");

export async function create_new_pool(
  client: AptosClient,
  account: AptosAccount,
  lp_name: AptosVectorU8,
  lp_symbol: AptosVectorU8,
  lp_description: AptosVectorU8,
  lp_logo_url: AptosVectorU8,
  lp_project_url: AptosVectorU8,
  fee: bigInt.BigInteger,
  admin_fee: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::create_new_pool",
    typeParamStrings,
    [
      lp_name.hex(),
      lp_symbol.hex(),
      lp_description.hex(),
      lp_logo_url.hex(),
      lp_project_url.hex(),
      fee.toString(),
      admin_fee.toString(),
    ]
  );
}
export function build_payload_create_new_pool(
  lp_name: AptosVectorU8,
  lp_symbol: AptosVectorU8,
  lp_description: AptosVectorU8,
  lp_logo_url: AptosVectorU8,
  lp_project_url: AptosVectorU8,
  fee: bigInt.BigInteger,
  admin_fee: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::create_new_pool",
    typeParamStrings,
    [
      lp_name.hex(),
      lp_symbol.hex(),
      lp_description.hex(),
      lp_logo_url.hex(),
      lp_project_url.hex(),
      fee.toString(),
      admin_fee.toString(),
    ]
  );
}

export async function add_liquidity(
  client: AptosClient,
  account: AptosAccount,
  amount_x: bigInt.BigInteger,
  amount_y: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::add_liquidity",
    typeParamStrings,
    [
      amount_x.toString(),
      amount_y.toString(),
    ]
  );
}
export function build_payload_add_liquidity(
  amount_x: bigInt.BigInteger,
  amount_y: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::add_liquidity",
    typeParamStrings,
    [
      amount_x.toString(),
      amount_y.toString(),
    ]
  );
}

export async function remove_liquidity(
  client: AptosClient,
  account: AptosAccount,
  liquidity: bigInt.BigInteger,
  min_amount_x: bigInt.BigInteger,
  min_amount_y: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::remove_liquidity",
    typeParamStrings,
    [
      liquidity.toString(),
      min_amount_x.toString(),
      min_amount_y.toString(),
    ]
  );
}
export function build_payload_remove_liquidity(
  liquidity: bigInt.BigInteger,
  min_amount_x: bigInt.BigInteger,
  min_amount_y: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::remove_liquidity",
    typeParamStrings,
    [
      liquidity.toString(),
      min_amount_x.toString(),
      min_amount_y.toString(),
    ]
  );
}

export async function swap_script(
  client: AptosClient,
  account: AptosAccount,
  x_in: bigInt.BigInteger,
  y_in: bigInt.BigInteger,
  x_min_out: bigInt.BigInteger,
  y_min_out: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::swap_script",
    typeParamStrings,
    [
      x_in.toString(),
      y_in.toString(),
      x_min_out.toString(),
      y_min_out.toString(),
    ]
  );
}
export function build_payload_swap_script(
  x_in: bigInt.BigInteger,
  y_in: bigInt.BigInteger,
  x_min_out: bigInt.BigInteger,
  y_min_out: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::swap_script",
    typeParamStrings,
    [
      x_in.toString(),
      y_in.toString(),
      x_min_out.toString(),
      y_min_out.toString(),
    ]
  );
}

export async function mock_deploy_script(
  client: AptosClient,
  account: AptosAccount,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::mock_deploy_script",
    typeParamStrings,
    []
  );
}
export function build_payload_mock_deploy_script(
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::mock_deploy_script",
    typeParamStrings,
    []
  );
}

export function loadParsers(repo: AptosParserRepo) {
}