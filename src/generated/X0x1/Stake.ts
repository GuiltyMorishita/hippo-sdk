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
import * as Coin from "./Coin";
import * as IterableTable from "./IterableTable";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Stake";

export const EDELEGATION_NOT_FOUND: bigInt.BigInteger = bigInt("1");
export const EALREADY_VALIDATOR: bigInt.BigInteger = bigInt("7");
export const EDELEGATION_ALREADY_EXIST: bigInt.BigInteger = bigInt("10");
export const EDELEGATION_EXCEED_MAX: bigInt.BigInteger = bigInt("11");
export const ELAST_VALIDATOR: bigInt.BigInteger = bigInt("9");
export const ELOCK_TIME_TOO_SHORT: bigInt.BigInteger = bigInt("2");
export const ENOT_VALIDATOR: bigInt.BigInteger = bigInt("8");
export const ESTAKE_TOO_HIGH: bigInt.BigInteger = bigInt("6");
export const ESTAKE_TOO_LOW: bigInt.BigInteger = bigInt("5");
export const EVALIDATOR_CONFIG: bigInt.BigInteger = bigInt("4");
export const EWITHDRAW_NOT_ALLOWED: bigInt.BigInteger = bigInt("3");
export const MINIMUM_LOCK_PERIOD: bigInt.BigInteger = bigInt("86400");

export class Delegation {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Delegation";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "coins", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x1::TestCoin::TestCoin>")},
    {name: "rewards", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x1::TestCoin::TestCoin>")},
    {name: "locked_until_secs", typeTag: parseTypeTagOrThrow("u64")}
  ];

  coins: Coin.Coin;
  rewards: Coin.Coin;
  locked_until_secs: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coins = proto['coins'] as Coin.Coin;
    this.rewards = proto['rewards'] as Coin.Coin;
    this.locked_until_secs = proto['locked_until_secs'] as bigInt.BigInteger;
  }

  static DelegationParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Delegation {
    const proto = parseStructProto(data, typeTag, repo, Delegation);
    return new Delegation(proto, typeTag);
  }

}

export class StakePool {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StakePool";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "voting_power", typeTag: parseTypeTagOrThrow("u64")},
    {name: "next_epoch_voting_power", typeTag: parseTypeTagOrThrow("u64")},
    {name: "active", typeTag: parseTypeTagOrThrow("0x1::IterableTable::IterableTable<address,0x1::Stake::Delegation>")},
    {name: "inactive", typeTag: parseTypeTagOrThrow("0x1::IterableTable::IterableTable<address,0x1::Stake::Delegation>")},
    {name: "pending_active", typeTag: parseTypeTagOrThrow("0x1::IterableTable::IterableTable<address,0x1::Stake::Delegation>")},
    {name: "pending_inactive", typeTag: parseTypeTagOrThrow("0x1::IterableTable::IterableTable<address,0x1::Stake::Delegation>")}
  ];

  voting_power: bigInt.BigInteger;
  next_epoch_voting_power: bigInt.BigInteger;
  active: IterableTable.IterableTable;
  inactive: IterableTable.IterableTable;
  pending_active: IterableTable.IterableTable;
  pending_inactive: IterableTable.IterableTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.voting_power = proto['voting_power'] as bigInt.BigInteger;
    this.next_epoch_voting_power = proto['next_epoch_voting_power'] as bigInt.BigInteger;
    this.active = proto['active'] as IterableTable.IterableTable;
    this.inactive = proto['inactive'] as IterableTable.IterableTable;
    this.pending_active = proto['pending_active'] as IterableTable.IterableTable;
    this.pending_inactive = proto['pending_inactive'] as IterableTable.IterableTable;
  }

  static StakePoolParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StakePool {
    const proto = parseStructProto(data, typeTag, repo, StakePool);
    return new StakePool(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StakePool, typeParams);
    return result as unknown as StakePool;
  }

}

export class ValidatorConfig {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorConfig";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "consensus_pubkey", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "network_address", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "fullnode_address", typeTag: parseTypeTagOrThrow("vector<u8>")}
  ];

  consensus_pubkey: AptosVectorU8;
  network_address: AptosVectorU8;
  fullnode_address: AptosVectorU8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.consensus_pubkey = proto['consensus_pubkey'] as AptosVectorU8;
    this.network_address = proto['network_address'] as AptosVectorU8;
    this.fullnode_address = proto['fullnode_address'] as AptosVectorU8;
  }

  static ValidatorConfigParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorConfig {
    const proto = parseStructProto(data, typeTag, repo, ValidatorConfig);
    return new ValidatorConfig(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorConfig, typeParams);
    return result as unknown as ValidatorConfig;
  }

}

export class ValidatorInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorInfo";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "addr", typeTag: parseTypeTagOrThrow("address")},
    {name: "voting_power", typeTag: parseTypeTagOrThrow("u64")},
    {name: "config", typeTag: parseTypeTagOrThrow("0x1::Stake::ValidatorConfig")}
  ];

  addr: HexString;
  voting_power: bigInt.BigInteger;
  config: ValidatorConfig;

  constructor(proto: any, public typeTag: TypeTag) {
    this.addr = proto['addr'] as HexString;
    this.voting_power = proto['voting_power'] as bigInt.BigInteger;
    this.config = proto['config'] as ValidatorConfig;
  }

  static ValidatorInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorInfo {
    const proto = parseStructProto(data, typeTag, repo, ValidatorInfo);
    return new ValidatorInfo(proto, typeTag);
  }

}

export class ValidatorSet {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorSet";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "consensus_scheme", typeTag: parseTypeTagOrThrow("u8")},
    {name: "minimum_stake", typeTag: parseTypeTagOrThrow("u64")},
    {name: "maximum_stake", typeTag: parseTypeTagOrThrow("u64")},
    {name: "active_validators", typeTag: parseTypeTagOrThrow("vector<0x1::Stake::ValidatorInfo>")},
    {name: "pending_inactive", typeTag: parseTypeTagOrThrow("vector<0x1::Stake::ValidatorInfo>")},
    {name: "pending_active", typeTag: parseTypeTagOrThrow("vector<0x1::Stake::ValidatorInfo>")}
  ];

  consensus_scheme: number;
  minimum_stake: bigInt.BigInteger;
  maximum_stake: bigInt.BigInteger;
  active_validators: ValidatorInfo[];
  pending_inactive: ValidatorInfo[];
  pending_active: ValidatorInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.consensus_scheme = proto['consensus_scheme'] as number;
    this.minimum_stake = proto['minimum_stake'] as bigInt.BigInteger;
    this.maximum_stake = proto['maximum_stake'] as bigInt.BigInteger;
    this.active_validators = proto['active_validators'] as ValidatorInfo[];
    this.pending_inactive = proto['pending_inactive'] as ValidatorInfo[];
    this.pending_active = proto['pending_active'] as ValidatorInfo[];
  }

  static ValidatorSetParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorSet {
    const proto = parseStructProto(data, typeTag, repo, ValidatorSet);
    return new ValidatorSet(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorSet, typeParams);
    return result as unknown as ValidatorSet;
  }

}

export async function unlock(
  client: AptosClient,
  account: AptosAccount,
  from: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::unlock",
    typeParamStrings,
    [
      from,
    ]
  );
}
export function build_payload_unlock(
  from: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::unlock",
    typeParamStrings,
    [
      from,
    ]
  );
}

export async function withdraw(
  client: AptosClient,
  account: AptosAccount,
  from: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::withdraw",
    typeParamStrings,
    [
      from,
    ]
  );
}
export function build_payload_withdraw(
  from: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::withdraw",
    typeParamStrings,
    [
      from,
    ]
  );
}

export async function register_validator_candidate(
  client: AptosClient,
  account: AptosAccount,
  consensus_pubkey: AptosVectorU8,
  network_address: AptosVectorU8,
  fullnode_address: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::register_validator_candidate",
    typeParamStrings,
    [
      consensus_pubkey.hex(),
      network_address.hex(),
      fullnode_address.hex(),
    ]
  );
}
export function build_payload_register_validator_candidate(
  consensus_pubkey: AptosVectorU8,
  network_address: AptosVectorU8,
  fullnode_address: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::register_validator_candidate",
    typeParamStrings,
    [
      consensus_pubkey.hex(),
      network_address.hex(),
      fullnode_address.hex(),
    ]
  );
}

export async function rotate_consensus_key(
  client: AptosClient,
  account: AptosAccount,
  consensus_pubkey: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::rotate_consensus_key",
    typeParamStrings,
    [
      consensus_pubkey.hex(),
    ]
  );
}
export function build_payload_rotate_consensus_key(
  consensus_pubkey: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::rotate_consensus_key",
    typeParamStrings,
    [
      consensus_pubkey.hex(),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Stake::Delegation", Delegation.DelegationParser);
  repo.addParser("0x1::Stake::StakePool", StakePool.StakePoolParser);
  repo.addParser("0x1::Stake::ValidatorConfig", ValidatorConfig.ValidatorConfigParser);
  repo.addParser("0x1::Stake::ValidatorInfo", ValidatorInfo.ValidatorInfoParser);
  repo.addParser("0x1::Stake::ValidatorSet", ValidatorSet.ValidatorSetParser);
}