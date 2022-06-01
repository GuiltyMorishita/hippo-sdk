import { HexString } from "aptos";
import { AptosClient } from "aptos";
import { AptosAccount } from "aptos";
import { AptosVectorU8 } from "@manahippo/aptos-tsgen";
import bigInt from "big-integer";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Genesis";


export async function create_initialize_validators(
  client: AptosClient,
  account: AptosAccount,
  owners: HexString[],
  owner_auth_keys: AptosVectorU8[],
  consensus_pubkeys: AptosVectorU8[],
  validator_network_addresses: AptosVectorU8[],
  full_node_network_addresses: AptosVectorU8[],
  staking_distribution: bigInt.BigInteger[],
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Genesis::create_initialize_validators",
    typeParamStrings,
    [
      owners,
      owner_auth_keys.map((x)=>{return x.hex();}),
      consensus_pubkeys.map((x)=>{return x.hex();}),
      validator_network_addresses.map((x)=>{return x.hex();}),
      full_node_network_addresses.map((x)=>{return x.hex();}),
      staking_distribution.map(bigi => bigi.toString()),
    ]
  );
}
export function build_payload_create_initialize_validators(
  owners: HexString[],
  owner_auth_keys: AptosVectorU8[],
  consensus_pubkeys: AptosVectorU8[],
  validator_network_addresses: AptosVectorU8[],
  full_node_network_addresses: AptosVectorU8[],
  staking_distribution: bigInt.BigInteger[],
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Genesis::create_initialize_validators",
    typeParamStrings,
    [
      owners,
      owner_auth_keys.map((x)=>{return x.hex();}),
      consensus_pubkeys.map((x)=>{return x.hex();}),
      validator_network_addresses.map((x)=>{return x.hex();}),
      full_node_network_addresses.map((x)=>{return x.hex();}),
      staking_distribution.map(bigi => bigi.toString()),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
}