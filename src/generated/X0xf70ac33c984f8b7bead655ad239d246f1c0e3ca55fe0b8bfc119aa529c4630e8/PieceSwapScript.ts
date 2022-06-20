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
export const moduleName = "PieceSwapScript";

export const E_LP_TOKEN_ALREADY_REGISTERED: bigInt.BigInteger = bigInt("7");
export const E_OUTPUT_LESS_THAN_MIN: bigInt.BigInteger = bigInt("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED: bigInt.BigInteger = bigInt("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED: bigInt.BigInteger = bigInt("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED: bigInt.BigInteger = bigInt("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED: bigInt.BigInteger = bigInt("4");
export const E_TOKEN_X_NOT_REGISTERED: bigInt.BigInteger = bigInt("5");
export const E_TOKEN_Y_NOT_REGISTERED: bigInt.BigInteger = bigInt("6");

export async function create_new_pool_script(
  client: AptosClient,
  account: AptosAccount,
  lp_name: AptosVectorU8,
  lp_symbol: AptosVectorU8,
  k: bigInt.BigInteger,
  w1_numerator: bigInt.BigInteger,
  w1_denominator: bigInt.BigInteger,
  w2_numerator: bigInt.BigInteger,
  w2_denominator: bigInt.BigInteger,
  swap_fee_per_million: bigInt.BigInteger,
  protocol_fee_share_per_thousand: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::create_new_pool_script",
    typeParamStrings,
    [
      lp_name.hex(),
      lp_symbol.hex(),
      k.toString(),
      w1_numerator.toString(),
      w1_denominator.toString(),
      w2_numerator.toString(),
      w2_denominator.toString(),
      swap_fee_per_million.toString(),
      protocol_fee_share_per_thousand.toString(),
    ]
  );
}
export function build_payload_create_new_pool_script(
  lp_name: AptosVectorU8,
  lp_symbol: AptosVectorU8,
  k: bigInt.BigInteger,
  w1_numerator: bigInt.BigInteger,
  w1_denominator: bigInt.BigInteger,
  w2_numerator: bigInt.BigInteger,
  w2_denominator: bigInt.BigInteger,
  swap_fee_per_million: bigInt.BigInteger,
  protocol_fee_share_per_thousand: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::create_new_pool_script",
    typeParamStrings,
    [
      lp_name.hex(),
      lp_symbol.hex(),
      k.toString(),
      w1_numerator.toString(),
      w1_denominator.toString(),
      w2_numerator.toString(),
      w2_denominator.toString(),
      swap_fee_per_million.toString(),
      protocol_fee_share_per_thousand.toString(),
    ]
  );
}

export async function add_liquidity_script(
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
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::add_liquidity_script",
    typeParamStrings,
    [
      amount_x.toString(),
      amount_y.toString(),
    ]
  );
}
export function build_payload_add_liquidity_script(
  amount_x: bigInt.BigInteger,
  amount_y: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::add_liquidity_script",
    typeParamStrings,
    [
      amount_x.toString(),
      amount_y.toString(),
    ]
  );
}

export async function remove_liquidity_script(
  client: AptosClient,
  account: AptosAccount,
  liquidity: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::remove_liquidity_script",
    typeParamStrings,
    [
      liquidity.toString(),
    ]
  );
}
export function build_payload_remove_liquidity_script(
  liquidity: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::remove_liquidity_script",
    typeParamStrings,
    [
      liquidity.toString(),
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
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::swap_script",
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
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::swap_script",
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
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::mock_deploy_script",
    typeParamStrings,
    []
  );
}
export function build_payload_mock_deploy_script(
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::mock_deploy_script",
    typeParamStrings,
    []
  );
}

export function loadParsers(repo: AptosParserRepo) {
}