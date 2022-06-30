import { HexString } from "aptos";
import bigInt from "big-integer";
import { TypeParamDeclType } from "@manahippo/aptos-tsgen";
import { FieldDeclType } from "@manahippo/aptos-tsgen";
import { parseTypeTagOrThrow } from "@manahippo/aptos-tsgen";
import { TypeTag } from "@manahippo/aptos-tsgen";
import { AptosParserRepo } from "@manahippo/aptos-tsgen";
import { parseStructProto } from "@manahippo/aptos-tsgen";
import { AptosClient } from "aptos";
import { StructTag } from "@manahippo/aptos-tsgen";
import { AptosAccount } from "aptos";
import { getTypeTagFullname } from "@manahippo/aptos-tsgen";
import { sendAndWait } from "@manahippo/aptos-tsgen";
import { buildPayload } from "@manahippo/aptos-tsgen";
import * as Event from "./Event";
import * as Option from "./Option";
import * as TypeInfo from "./TypeInfo";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Coin";

export const MAX_U128: bigInt.BigInteger = bigInt("340282366920938463463374607431768211455");
export const ECOIN_INFO_ADDRESS_MISMATCH: bigInt.BigInteger = bigInt("0");
export const ECOIN_INFO_ALREADY_PUBLISHED: bigInt.BigInteger = bigInt("1");
export const ECOIN_INFO_NOT_PUBLISHED: bigInt.BigInteger = bigInt("2");
export const ECOIN_STORE_ALREADY_PUBLISHED: bigInt.BigInteger = bigInt("3");
export const ECOIN_STORE_NOT_PUBLISHED: bigInt.BigInteger = bigInt("4");
export const EDESTRUCTION_OF_NONZERO_TOKEN: bigInt.BigInteger = bigInt("6");
export const EINSUFFICIENT_BALANCE: bigInt.BigInteger = bigInt("5");
export const ETOTAL_SUPPLY_OVERFLOW: bigInt.BigInteger = bigInt("7");

export class CoinEvents {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CoinEvents";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "register_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Coin::RegisterEvent>")}
  ];

  register_events: Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.register_events = proto['register_events'] as Event.EventHandle;
  }

  static CoinEventsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinEvents {
    const proto = parseStructProto(data, typeTag, repo, CoinEvents);
    return new CoinEvents(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinEvents, typeParams);
    return result as unknown as CoinEvents;
  }

  static async load_register_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Coin::CoinEvents");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "register_events")
    return events as unknown as RegisterEvent[];
  }
}

export class Coin {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Coin";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "value", typeTag: parseTypeTagOrThrow("u64")}
  ];

  value: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.value = proto['value'] as bigInt.BigInteger;
  }

  static CoinParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Coin {
    const proto = parseStructProto(data, typeTag, repo, Coin);
    return new Coin(proto, typeTag);
  }

}

export class CoinStore {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CoinStore";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "coin", typeTag: parseTypeTagOrThrow("0x1::Coin::Coin<$tv0>")},
    {name: "deposit_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Coin::DepositEvent>")},
    {name: "withdraw_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Coin::WithdrawEvent>")}
  ];

  coin: Coin;
  deposit_events: Event.EventHandle;
  withdraw_events: Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin = proto['coin'] as Coin;
    this.deposit_events = proto['deposit_events'] as Event.EventHandle;
    this.withdraw_events = proto['withdraw_events'] as Event.EventHandle;
  }

  static CoinStoreParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinStore {
    const proto = parseStructProto(data, typeTag, repo, CoinStore);
    return new CoinStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinStore, typeParams);
    return result as unknown as CoinStore;
  }

  static async load_deposit_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Coin::CoinStore");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "deposit_events")
    return events as unknown as DepositEvent[];
  }
  static async load_withdraw_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Coin::CoinStore");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "withdraw_events")
    return events as unknown as WithdrawEvent[];
  }
}

export class CoinInfo {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CoinInfo";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "name", typeTag: parseTypeTagOrThrow("0x1::ASCII::String")},
    {name: "symbol", typeTag: parseTypeTagOrThrow("0x1::ASCII::String")},
    {name: "decimals", typeTag: parseTypeTagOrThrow("u64")},
    {name: "supply", typeTag: parseTypeTagOrThrow("0x1::Option::Option<u128>")}
  ];

  name: string;
  symbol: string;
  decimals: bigInt.BigInteger;
  supply: Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as string;
    this.symbol = proto['symbol'] as string;
    this.decimals = proto['decimals'] as bigInt.BigInteger;
    this.supply = proto['supply'] as Option.Option;
  }

  static CoinInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinInfo {
    const proto = parseStructProto(data, typeTag, repo, CoinInfo);
    return new CoinInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinInfo, typeParams);
    return result as unknown as CoinInfo;
  }

}

export class DepositEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DepositEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "amount", typeTag: parseTypeTagOrThrow("u64")}
  ];

  amount: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.amount = proto['amount'] as bigInt.BigInteger;
  }

  static DepositEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DepositEvent {
    const proto = parseStructProto(data, typeTag, repo, DepositEvent);
    return new DepositEvent(proto, typeTag);
  }

}

export class WithdrawEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WithdrawEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "amount", typeTag: parseTypeTagOrThrow("u64")}
  ];

  amount: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.amount = proto['amount'] as bigInt.BigInteger;
  }

  static WithdrawEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WithdrawEvent {
    const proto = parseStructProto(data, typeTag, repo, WithdrawEvent);
    return new WithdrawEvent(proto, typeTag);
  }

}

export class RegisterEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "RegisterEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "type_info", typeTag: parseTypeTagOrThrow("0x1::TypeInfo::TypeInfo")}
  ];

  type_info: TypeInfo.TypeInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_info = proto['type_info'] as TypeInfo.TypeInfo;
  }

  static RegisterEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RegisterEvent {
    const proto = parseStructProto(data, typeTag, repo, RegisterEvent);
    return new RegisterEvent(proto, typeTag);
  }

}

export class MintCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "MintCapability";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static MintCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : MintCapability {
    const proto = parseStructProto(data, typeTag, repo, MintCapability);
    return new MintCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, MintCapability, typeParams);
    return result as unknown as MintCapability;
  }

}

export class BurnCapability {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BurnCapability";
  static typeParameters: TypeParamDeclType[] = [
    {name: "$tv0", isPhantom: true}
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static BurnCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BurnCapability {
    const proto = parseStructProto(data, typeTag, repo, BurnCapability);
    return new BurnCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, BurnCapability, typeParams);
    return result as unknown as BurnCapability;
  }

}

export async function register(
  client: AptosClient,
  account: AptosAccount,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Coin::register",
    typeParamStrings,
    []
  );
}
export function build_payload_register(
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Coin::register",
    typeParamStrings,
    []
  );
}

export async function transfer(
  client: AptosClient,
  account: AptosAccount,
  to: HexString,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Coin::transfer",
    typeParamStrings,
    [
      to,
      amount.toString(),
    ]
  );
}
export function build_payload_transfer(
  to: HexString,
  amount: bigInt.BigInteger,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Coin::transfer",
    typeParamStrings,
    [
      to,
      amount.toString(),
    ]
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Coin::CoinEvents", CoinEvents.CoinEventsParser);
  repo.addParser("0x1::Coin::Coin", Coin.CoinParser);
  repo.addParser("0x1::Coin::CoinStore", CoinStore.CoinStoreParser);
  repo.addParser("0x1::Coin::CoinInfo", CoinInfo.CoinInfoParser);
  repo.addParser("0x1::Coin::DepositEvent", DepositEvent.DepositEventParser);
  repo.addParser("0x1::Coin::WithdrawEvent", WithdrawEvent.WithdrawEventParser);
  repo.addParser("0x1::Coin::RegisterEvent", RegisterEvent.RegisterEventParser);
  repo.addParser("0x1::Coin::MintCapability", MintCapability.MintCapabilityParser);
  repo.addParser("0x1::Coin::BurnCapability", BurnCapability.BurnCapabilityParser);
}