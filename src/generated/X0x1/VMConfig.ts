import { HexString } from "aptos";
import bigInt from "big-integer";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";
import { AptosVectorU8 } from "@manahippo/aptos-tsgen";
import { AptosAccount } from "aptos";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";

export const moduleAddress = new HexString("0x1");
export const moduleName = "VMConfig";

export const ECONFIG: bigInt.BigInteger = bigInt("0");
export const EGAS_CONSTANT_INCONSISTENCY: bigInt.BigInteger = bigInt("1");

export class VMConfig {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "VMConfig";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "gas_schedule", typeTag: parseTypeTagOrThrow("0x1::VMConfig::GasSchedule")}
  ];

  gas_schedule: GasSchedule;

  constructor(proto: any, public typeTag: TypeTag) {
    this.gas_schedule = proto['gas_schedule'] as GasSchedule;
  }

  static VMConfigParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : VMConfig {
    const proto = parseStructProto(data, typeTag, repo, VMConfig);
    return new VMConfig(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, VMConfig, typeParams);
    return result as unknown as VMConfig;
  }

}

export class GasSchedule {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "GasSchedule";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "instruction_schedule", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "native_schedule", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "gas_constants", typeTag: parseTypeTagOrThrow("0x1::VMConfig::GasConstants")}
  ];

  instruction_schedule: AptosVectorU8;
  native_schedule: AptosVectorU8;
  gas_constants: GasConstants;

  constructor(proto: any, public typeTag: TypeTag) {
    this.instruction_schedule = proto['instruction_schedule'] as AptosVectorU8;
    this.native_schedule = proto['native_schedule'] as AptosVectorU8;
    this.gas_constants = proto['gas_constants'] as GasConstants;
  }

  static GasScheduleParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GasSchedule {
    const proto = parseStructProto(data, typeTag, repo, GasSchedule);
    return new GasSchedule(proto, typeTag);
  }

}

export class GasConstants {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "GasConstants";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "global_memory_per_byte_cost", typeTag: parseTypeTagOrThrow("u64")},
    {name: "global_memory_per_byte_write_cost", typeTag: parseTypeTagOrThrow("u64")},
    {name: "min_transaction_gas_units", typeTag: parseTypeTagOrThrow("u64")},
    {name: "large_transaction_cutoff", typeTag: parseTypeTagOrThrow("u64")},
    {name: "intrinsic_gas_per_byte", typeTag: parseTypeTagOrThrow("u64")},
    {name: "maximum_number_of_gas_units", typeTag: parseTypeTagOrThrow("u64")},
    {name: "min_price_per_gas_unit", typeTag: parseTypeTagOrThrow("u64")},
    {name: "max_price_per_gas_unit", typeTag: parseTypeTagOrThrow("u64")},
    {name: "max_transaction_size_in_bytes", typeTag: parseTypeTagOrThrow("u64")},
    {name: "gas_unit_scaling_factor", typeTag: parseTypeTagOrThrow("u64")},
    {name: "default_account_size", typeTag: parseTypeTagOrThrow("u64")}
  ];

  global_memory_per_byte_cost: bigInt.BigInteger;
  global_memory_per_byte_write_cost: bigInt.BigInteger;
  min_transaction_gas_units: bigInt.BigInteger;
  large_transaction_cutoff: bigInt.BigInteger;
  intrinsic_gas_per_byte: bigInt.BigInteger;
  maximum_number_of_gas_units: bigInt.BigInteger;
  min_price_per_gas_unit: bigInt.BigInteger;
  max_price_per_gas_unit: bigInt.BigInteger;
  max_transaction_size_in_bytes: bigInt.BigInteger;
  gas_unit_scaling_factor: bigInt.BigInteger;
  default_account_size: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.global_memory_per_byte_cost = proto['global_memory_per_byte_cost'] as bigInt.BigInteger;
    this.global_memory_per_byte_write_cost = proto['global_memory_per_byte_write_cost'] as bigInt.BigInteger;
    this.min_transaction_gas_units = proto['min_transaction_gas_units'] as bigInt.BigInteger;
    this.large_transaction_cutoff = proto['large_transaction_cutoff'] as bigInt.BigInteger;
    this.intrinsic_gas_per_byte = proto['intrinsic_gas_per_byte'] as bigInt.BigInteger;
    this.maximum_number_of_gas_units = proto['maximum_number_of_gas_units'] as bigInt.BigInteger;
    this.min_price_per_gas_unit = proto['min_price_per_gas_unit'] as bigInt.BigInteger;
    this.max_price_per_gas_unit = proto['max_price_per_gas_unit'] as bigInt.BigInteger;
    this.max_transaction_size_in_bytes = proto['max_transaction_size_in_bytes'] as bigInt.BigInteger;
    this.gas_unit_scaling_factor = proto['gas_unit_scaling_factor'] as bigInt.BigInteger;
    this.default_account_size = proto['default_account_size'] as bigInt.BigInteger;
  }

  static GasConstantsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GasConstants {
    const proto = parseStructProto(data, typeTag, repo, GasConstants);
    return new GasConstants(proto, typeTag);
  }

}

export async function set_gas_constants(
  client: AptosClient,
  account: AptosAccount,
  global_memory_per_byte_cost: bigInt.BigInteger,
  global_memory_per_byte_write_cost: bigInt.BigInteger,
  min_transaction_gas_units: bigInt.BigInteger,
  large_transaction_cutoff: bigInt.BigInteger,
  intrinsic_gas_per_byte: bigInt.BigInteger,
  maximum_number_of_gas_units: bigInt.BigInteger,
  min_price_per_gas_unit: bigInt.BigInteger,
  max_price_per_gas_unit: bigInt.BigInteger,
  max_transaction_size_in_bytes: bigInt.BigInteger,
  gas_unit_scaling_factor: bigInt.BigInteger,
  default_account_size: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::VMConfig::set_gas_constants",
    typeParamStrings,
    [
      global_memory_per_byte_cost.toString(),
      global_memory_per_byte_write_cost.toString(),
      min_transaction_gas_units.toString(),
      large_transaction_cutoff.toString(),
      intrinsic_gas_per_byte.toString(),
      maximum_number_of_gas_units.toString(),
      min_price_per_gas_unit.toString(),
      max_price_per_gas_unit.toString(),
      max_transaction_size_in_bytes.toString(),
      gas_unit_scaling_factor.toString(),
      default_account_size.toString(),
    ]
  );
}
export function build_payload_set_gas_constants(
  global_memory_per_byte_cost: bigInt.BigInteger,
  global_memory_per_byte_write_cost: bigInt.BigInteger,
  min_transaction_gas_units: bigInt.BigInteger,
  large_transaction_cutoff: bigInt.BigInteger,
  intrinsic_gas_per_byte: bigInt.BigInteger,
  maximum_number_of_gas_units: bigInt.BigInteger,
  min_price_per_gas_unit: bigInt.BigInteger,
  max_price_per_gas_unit: bigInt.BigInteger,
  max_transaction_size_in_bytes: bigInt.BigInteger,
  gas_unit_scaling_factor: bigInt.BigInteger,
  default_account_size: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::VMConfig::set_gas_constants",
    typeParamStrings,
    [
      global_memory_per_byte_cost.toString(),
      global_memory_per_byte_write_cost.toString(),
      min_transaction_gas_units.toString(),
      large_transaction_cutoff.toString(),
      intrinsic_gas_per_byte.toString(),
      maximum_number_of_gas_units.toString(),
      min_price_per_gas_unit.toString(),
      max_price_per_gas_unit.toString(),
      max_transaction_size_in_bytes.toString(),
      gas_unit_scaling_factor.toString(),
      default_account_size.toString(),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::VMConfig::VMConfig", VMConfig.VMConfigParser);
  repo.addParser("0x1::VMConfig::GasSchedule", GasSchedule.GasScheduleParser);
  repo.addParser("0x1::VMConfig::GasConstants", GasConstants.GasConstantsParser);
}