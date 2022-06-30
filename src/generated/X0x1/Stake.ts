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
import { StructTag } from "@manahippo/aptos-tsgen";
import { AptosAccount } from "aptos";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";
import * as Coin from "./Coin";
import * as Event from "./Event";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Stake";

export const EALREADY_REGISTERED: bigInt.BigInteger = bigInt("10");
export const EALREADY_VALIDATOR: bigInt.BigInteger = bigInt("6");
export const ELAST_VALIDATOR: bigInt.BigInteger = bigInt("8");
export const ELOCK_TIME_TOO_LONG: bigInt.BigInteger = bigInt("14");
export const ELOCK_TIME_TOO_SHORT: bigInt.BigInteger = bigInt("1");
export const ENOT_OPERATOR: bigInt.BigInteger = bigInt("13");
export const ENOT_OWNER: bigInt.BigInteger = bigInt("11");
export const ENOT_VALIDATOR: bigInt.BigInteger = bigInt("7");
export const ENO_COINS_TO_WITHDRAW: bigInt.BigInteger = bigInt("12");
export const ENO_POST_GENESIS_VALIDATOR_SET_CHANGE_ALLOWED: bigInt.BigInteger = bigInt("15");
export const ESTAKE_EXCEEDS_MAX: bigInt.BigInteger = bigInt("9");
export const ESTAKE_TOO_HIGH: bigInt.BigInteger = bigInt("5");
export const ESTAKE_TOO_LOW: bigInt.BigInteger = bigInt("4");
export const EVALIDATOR_CONFIG: bigInt.BigInteger = bigInt("3");
export const EWITHDRAW_NOT_ALLOWED: bigInt.BigInteger = bigInt("2");

export class OwnerCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "OwnerCapability";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")}
  ];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static OwnerCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OwnerCapability {
    const proto = parseStructProto(data, typeTag, repo, OwnerCapability);
    return new OwnerCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OwnerCapability, typeParams);
    return result as unknown as OwnerCapability;
  }

}

export class StakePool {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StakePool";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "active", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x1::TestCoin::TestCoin>")},
    {name: "inactive", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x1::TestCoin::TestCoin>")},
    {name: "pending_active", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x1::TestCoin::TestCoin>")},
    {name: "pending_inactive", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<0x1::TestCoin::TestCoin>")},
    {name: "locked_until_secs", typeTag: parseTypeTagOrThrow("u64")},
    {name: "operator_address", typeTag: parseTypeTagOrThrow("address")}
  ];

  active: Coin.Coin;
  inactive: Coin.Coin;
  pending_active: Coin.Coin;
  pending_inactive: Coin.Coin;
  locked_until_secs: bigInt.BigInteger;
  operator_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.active = proto['active'] as Coin.Coin;
    this.inactive = proto['inactive'] as Coin.Coin;
    this.pending_active = proto['pending_active'] as Coin.Coin;
    this.pending_inactive = proto['pending_inactive'] as Coin.Coin;
    this.locked_until_secs = proto['locked_until_secs'] as bigInt.BigInteger;
    this.operator_address = proto['operator_address'] as HexString;
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
    {name: "fullnode_address", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "validator_index", typeTag: parseTypeTagOrThrow("u64")}
  ];

  consensus_pubkey: AptosVectorU8;
  network_address: AptosVectorU8;
  fullnode_address: AptosVectorU8;
  validator_index: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.consensus_pubkey = proto['consensus_pubkey'] as AptosVectorU8;
    this.network_address = proto['network_address'] as AptosVectorU8;
    this.fullnode_address = proto['fullnode_address'] as AptosVectorU8;
    this.validator_index = proto['validator_index'] as bigInt.BigInteger;
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

export class ValidatorSetConfiguration {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorSetConfiguration";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "minimum_stake", typeTag: parseTypeTagOrThrow("u64")},
    {name: "maximum_stake", typeTag: parseTypeTagOrThrow("u64")},
    {name: "min_lockup_duration_secs", typeTag: parseTypeTagOrThrow("u64")},
    {name: "max_lockup_duration_secs", typeTag: parseTypeTagOrThrow("u64")},
    {name: "allow_validator_set_change", typeTag: parseTypeTagOrThrow("bool")},
    {name: "rewards_rate_percentage", typeTag: parseTypeTagOrThrow("u64")}
  ];

  minimum_stake: bigInt.BigInteger;
  maximum_stake: bigInt.BigInteger;
  min_lockup_duration_secs: bigInt.BigInteger;
  max_lockup_duration_secs: bigInt.BigInteger;
  allow_validator_set_change: boolean;
  rewards_rate_percentage: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.minimum_stake = proto['minimum_stake'] as bigInt.BigInteger;
    this.maximum_stake = proto['maximum_stake'] as bigInt.BigInteger;
    this.min_lockup_duration_secs = proto['min_lockup_duration_secs'] as bigInt.BigInteger;
    this.max_lockup_duration_secs = proto['max_lockup_duration_secs'] as bigInt.BigInteger;
    this.allow_validator_set_change = proto['allow_validator_set_change'] as boolean;
    this.rewards_rate_percentage = proto['rewards_rate_percentage'] as bigInt.BigInteger;
  }

  static ValidatorSetConfigurationParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorSetConfiguration {
    const proto = parseStructProto(data, typeTag, repo, ValidatorSetConfiguration);
    return new ValidatorSetConfiguration(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorSetConfiguration, typeParams);
    return result as unknown as ValidatorSetConfiguration;
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
    {name: "active_validators", typeTag: parseTypeTagOrThrow("vector<0x1::Stake::ValidatorInfo>")},
    {name: "pending_inactive", typeTag: parseTypeTagOrThrow("vector<0x1::Stake::ValidatorInfo>")},
    {name: "pending_active", typeTag: parseTypeTagOrThrow("vector<0x1::Stake::ValidatorInfo>")}
  ];

  consensus_scheme: number;
  active_validators: ValidatorInfo[];
  pending_inactive: ValidatorInfo[];
  pending_active: ValidatorInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.consensus_scheme = proto['consensus_scheme'] as number;
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

export class TestCoinCapabilities {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TestCoinCapabilities";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "mint_cap", typeTag: parseTypeTagOrThrow("0x1::Coin::MintCapability<0x1::TestCoin::TestCoin>")}
  ];

  mint_cap: Coin.MintCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as Coin.MintCapability;
  }

  static TestCoinCapabilitiesParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TestCoinCapabilities {
    const proto = parseStructProto(data, typeTag, repo, TestCoinCapabilities);
    return new TestCoinCapabilities(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TestCoinCapabilities, typeParams);
    return result as unknown as TestCoinCapabilities;
  }

}

export class ValidatorPerformance {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorPerformance";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "num_blocks", typeTag: parseTypeTagOrThrow("u64")},
    {name: "missed_votes", typeTag: parseTypeTagOrThrow("vector<u64>")}
  ];

  num_blocks: bigInt.BigInteger;
  missed_votes: bigInt.BigInteger[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.num_blocks = proto['num_blocks'] as bigInt.BigInteger;
    this.missed_votes = proto['missed_votes'] as bigInt.BigInteger[];
  }

  static ValidatorPerformanceParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorPerformance {
    const proto = parseStructProto(data, typeTag, repo, ValidatorPerformance);
    return new ValidatorPerformance(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorPerformance, typeParams);
    return result as unknown as ValidatorPerformance;
  }

}

export class StakePoolEvents {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StakePoolEvents";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "register_validator_candidate_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::RegisterValidatorCandidateEvent>")},
    {name: "set_operator_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::SetOperatorEvent>")},
    {name: "add_stake_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::AddStakeEvent>")},
    {name: "rotate_consensus_key_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::RotateConsensusKeyEvent>")},
    {name: "increase_lockup_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::IncreaseLockupEvent>")},
    {name: "join_validator_set_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::JoinValidatorSetEvent>")},
    {name: "distribute_rewards_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::DistributeRewardsEvent>")},
    {name: "unlock_stake_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::UnlockStakeEvent>")},
    {name: "withdraw_stake_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::WithdrawStakeEvent>")},
    {name: "leave_validator_set_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Stake::LeaveValidatorSetEvent>")}
  ];

  register_validator_candidate_events: Event.EventHandle;
  set_operator_events: Event.EventHandle;
  add_stake_events: Event.EventHandle;
  rotate_consensus_key_events: Event.EventHandle;
  increase_lockup_events: Event.EventHandle;
  join_validator_set_events: Event.EventHandle;
  distribute_rewards_events: Event.EventHandle;
  unlock_stake_events: Event.EventHandle;
  withdraw_stake_events: Event.EventHandle;
  leave_validator_set_events: Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.register_validator_candidate_events = proto['register_validator_candidate_events'] as Event.EventHandle;
    this.set_operator_events = proto['set_operator_events'] as Event.EventHandle;
    this.add_stake_events = proto['add_stake_events'] as Event.EventHandle;
    this.rotate_consensus_key_events = proto['rotate_consensus_key_events'] as Event.EventHandle;
    this.increase_lockup_events = proto['increase_lockup_events'] as Event.EventHandle;
    this.join_validator_set_events = proto['join_validator_set_events'] as Event.EventHandle;
    this.distribute_rewards_events = proto['distribute_rewards_events'] as Event.EventHandle;
    this.unlock_stake_events = proto['unlock_stake_events'] as Event.EventHandle;
    this.withdraw_stake_events = proto['withdraw_stake_events'] as Event.EventHandle;
    this.leave_validator_set_events = proto['leave_validator_set_events'] as Event.EventHandle;
  }

  static StakePoolEventsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StakePoolEvents {
    const proto = parseStructProto(data, typeTag, repo, StakePoolEvents);
    return new StakePoolEvents(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StakePoolEvents, typeParams);
    return result as unknown as StakePoolEvents;
  }

  static async load_register_validator_candidate_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "register_validator_candidate_events")
    return events as unknown as RegisterValidatorCandidateEvent[];
  }
  static async load_set_operator_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "set_operator_events")
    return events as unknown as SetOperatorEvent[];
  }
  static async load_add_stake_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "add_stake_events")
    return events as unknown as AddStakeEvent[];
  }
  static async load_rotate_consensus_key_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "rotate_consensus_key_events")
    return events as unknown as RotateConsensusKeyEvent[];
  }
  static async load_increase_lockup_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "increase_lockup_events")
    return events as unknown as IncreaseLockupEvent[];
  }
  static async load_join_validator_set_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "join_validator_set_events")
    return events as unknown as JoinValidatorSetEvent[];
  }
  static async load_distribute_rewards_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "distribute_rewards_events")
    return events as unknown as DistributeRewardsEvent[];
  }
  static async load_unlock_stake_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "unlock_stake_events")
    return events as unknown as UnlockStakeEvent[];
  }
  static async load_withdraw_stake_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "withdraw_stake_events")
    return events as unknown as WithdrawStakeEvent[];
  }
  static async load_leave_validator_set_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Stake::StakePoolEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "leave_validator_set_events")
    return events as unknown as LeaveValidatorSetEvent[];
  }
}

export class RegisterValidatorCandidateEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "RegisterValidatorCandidateEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")}
  ];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static RegisterValidatorCandidateEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RegisterValidatorCandidateEvent {
    const proto = parseStructProto(data, typeTag, repo, RegisterValidatorCandidateEvent);
    return new RegisterValidatorCandidateEvent(proto, typeTag);
  }

}

export class SetOperatorEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "SetOperatorEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "old_operator", typeTag: parseTypeTagOrThrow("address")},
    {name: "new_operator", typeTag: parseTypeTagOrThrow("address")}
  ];

  pool_address: HexString;
  old_operator: HexString;
  new_operator: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.old_operator = proto['old_operator'] as HexString;
    this.new_operator = proto['new_operator'] as HexString;
  }

  static SetOperatorEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SetOperatorEvent {
    const proto = parseStructProto(data, typeTag, repo, SetOperatorEvent);
    return new SetOperatorEvent(proto, typeTag);
  }

}

export class AddStakeEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "AddStakeEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "amount_added", typeTag: parseTypeTagOrThrow("u64")}
  ];

  pool_address: HexString;
  amount_added: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.amount_added = proto['amount_added'] as bigInt.BigInteger;
  }

  static AddStakeEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : AddStakeEvent {
    const proto = parseStructProto(data, typeTag, repo, AddStakeEvent);
    return new AddStakeEvent(proto, typeTag);
  }

}

export class RotateConsensusKeyEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "RotateConsensusKeyEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "old_consensus_pubkey", typeTag: parseTypeTagOrThrow("vector<u8>")},
    {name: "new_consensus_pubkey", typeTag: parseTypeTagOrThrow("vector<u8>")}
  ];

  pool_address: HexString;
  old_consensus_pubkey: AptosVectorU8;
  new_consensus_pubkey: AptosVectorU8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.old_consensus_pubkey = proto['old_consensus_pubkey'] as AptosVectorU8;
    this.new_consensus_pubkey = proto['new_consensus_pubkey'] as AptosVectorU8;
  }

  static RotateConsensusKeyEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RotateConsensusKeyEvent {
    const proto = parseStructProto(data, typeTag, repo, RotateConsensusKeyEvent);
    return new RotateConsensusKeyEvent(proto, typeTag);
  }

}

export class IncreaseLockupEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "IncreaseLockupEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "old_locked_until_secs", typeTag: parseTypeTagOrThrow("u64")},
    {name: "new_locked_until_secs", typeTag: parseTypeTagOrThrow("u64")}
  ];

  pool_address: HexString;
  old_locked_until_secs: bigInt.BigInteger;
  new_locked_until_secs: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.old_locked_until_secs = proto['old_locked_until_secs'] as bigInt.BigInteger;
    this.new_locked_until_secs = proto['new_locked_until_secs'] as bigInt.BigInteger;
  }

  static IncreaseLockupEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : IncreaseLockupEvent {
    const proto = parseStructProto(data, typeTag, repo, IncreaseLockupEvent);
    return new IncreaseLockupEvent(proto, typeTag);
  }

}

export class JoinValidatorSetEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "JoinValidatorSetEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")}
  ];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static JoinValidatorSetEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : JoinValidatorSetEvent {
    const proto = parseStructProto(data, typeTag, repo, JoinValidatorSetEvent);
    return new JoinValidatorSetEvent(proto, typeTag);
  }

}

export class DistributeRewardsEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DistributeRewardsEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "rewards_amount", typeTag: parseTypeTagOrThrow("u64")}
  ];

  pool_address: HexString;
  rewards_amount: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.rewards_amount = proto['rewards_amount'] as bigInt.BigInteger;
  }

  static DistributeRewardsEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DistributeRewardsEvent {
    const proto = parseStructProto(data, typeTag, repo, DistributeRewardsEvent);
    return new DistributeRewardsEvent(proto, typeTag);
  }

}

export class UnlockStakeEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "UnlockStakeEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "amount_unlocked", typeTag: parseTypeTagOrThrow("u64")}
  ];

  pool_address: HexString;
  amount_unlocked: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.amount_unlocked = proto['amount_unlocked'] as bigInt.BigInteger;
  }

  static UnlockStakeEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : UnlockStakeEvent {
    const proto = parseStructProto(data, typeTag, repo, UnlockStakeEvent);
    return new UnlockStakeEvent(proto, typeTag);
  }

}

export class WithdrawStakeEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WithdrawStakeEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")},
    {name: "amount_withdrawn", typeTag: parseTypeTagOrThrow("u64")}
  ];

  pool_address: HexString;
  amount_withdrawn: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.amount_withdrawn = proto['amount_withdrawn'] as bigInt.BigInteger;
  }

  static WithdrawStakeEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WithdrawStakeEvent {
    const proto = parseStructProto(data, typeTag, repo, WithdrawStakeEvent);
    return new WithdrawStakeEvent(proto, typeTag);
  }

}

export class LeaveValidatorSetEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LeaveValidatorSetEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "pool_address", typeTag: parseTypeTagOrThrow("address")}
  ];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static LeaveValidatorSetEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LeaveValidatorSetEvent {
    const proto = parseStructProto(data, typeTag, repo, LeaveValidatorSetEvent);
    return new LeaveValidatorSetEvent(proto, typeTag);
  }

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

export async function set_operator(
  client: AptosClient,
  account: AptosAccount,
  new_operator: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::set_operator",
    typeParamStrings,
    [
      new_operator,
    ]
  );
}
export function build_payload_set_operator(
  new_operator: HexString,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::set_operator",
    typeParamStrings,
    [
      new_operator,
    ]
  );
}

export async function add_stake(
  client: AptosClient,
  account: AptosAccount,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::add_stake",
    typeParamStrings,
    [
      amount.toString(),
    ]
  );
}
export function build_payload_add_stake(
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::add_stake",
    typeParamStrings,
    [
      amount.toString(),
    ]
  );
}

export async function rotate_consensus_key(
  client: AptosClient,
  account: AptosAccount,
  pool_address: HexString,
  new_consensus_pubkey: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::rotate_consensus_key",
    typeParamStrings,
    [
      pool_address,
      new_consensus_pubkey.hex(),
    ]
  );
}
export function build_payload_rotate_consensus_key(
  pool_address: HexString,
  new_consensus_pubkey: AptosVectorU8,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::rotate_consensus_key",
    typeParamStrings,
    [
      pool_address,
      new_consensus_pubkey.hex(),
    ]
  );
}

export async function increase_lockup(
  client: AptosClient,
  account: AptosAccount,
  new_locked_until_secs: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::increase_lockup",
    typeParamStrings,
    [
      new_locked_until_secs.toString(),
    ]
  );
}
export function build_payload_increase_lockup(
  new_locked_until_secs: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::increase_lockup",
    typeParamStrings,
    [
      new_locked_until_secs.toString(),
    ]
  );
}

export async function unlock(
  client: AptosClient,
  account: AptosAccount,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::unlock",
    typeParamStrings,
    [
      amount.toString(),
    ]
  );
}
export function build_payload_unlock(
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::unlock",
    typeParamStrings,
    [
      amount.toString(),
    ]
  );
}

export async function withdraw(
  client: AptosClient,
  account: AptosAccount,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Stake::withdraw",
    typeParamStrings,
    []
  );
}
export function build_payload_withdraw(
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Stake::withdraw",
    typeParamStrings,
    []
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Stake::OwnerCapability", OwnerCapability.OwnerCapabilityParser);
  repo.addParser("0x1::Stake::StakePool", StakePool.StakePoolParser);
  repo.addParser("0x1::Stake::ValidatorConfig", ValidatorConfig.ValidatorConfigParser);
  repo.addParser("0x1::Stake::ValidatorInfo", ValidatorInfo.ValidatorInfoParser);
  repo.addParser("0x1::Stake::ValidatorSetConfiguration", ValidatorSetConfiguration.ValidatorSetConfigurationParser);
  repo.addParser("0x1::Stake::ValidatorSet", ValidatorSet.ValidatorSetParser);
  repo.addParser("0x1::Stake::TestCoinCapabilities", TestCoinCapabilities.TestCoinCapabilitiesParser);
  repo.addParser("0x1::Stake::ValidatorPerformance", ValidatorPerformance.ValidatorPerformanceParser);
  repo.addParser("0x1::Stake::StakePoolEvents", StakePoolEvents.StakePoolEventsParser);
  repo.addParser("0x1::Stake::RegisterValidatorCandidateEvent", RegisterValidatorCandidateEvent.RegisterValidatorCandidateEventParser);
  repo.addParser("0x1::Stake::SetOperatorEvent", SetOperatorEvent.SetOperatorEventParser);
  repo.addParser("0x1::Stake::AddStakeEvent", AddStakeEvent.AddStakeEventParser);
  repo.addParser("0x1::Stake::RotateConsensusKeyEvent", RotateConsensusKeyEvent.RotateConsensusKeyEventParser);
  repo.addParser("0x1::Stake::IncreaseLockupEvent", IncreaseLockupEvent.IncreaseLockupEventParser);
  repo.addParser("0x1::Stake::JoinValidatorSetEvent", JoinValidatorSetEvent.JoinValidatorSetEventParser);
  repo.addParser("0x1::Stake::DistributeRewardsEvent", DistributeRewardsEvent.DistributeRewardsEventParser);
  repo.addParser("0x1::Stake::UnlockStakeEvent", UnlockStakeEvent.UnlockStakeEventParser);
  repo.addParser("0x1::Stake::WithdrawStakeEvent", WithdrawStakeEvent.WithdrawStakeEventParser);
  repo.addParser("0x1::Stake::LeaveValidatorSetEvent", LeaveValidatorSetEvent.LeaveValidatorSetEventParser);
}