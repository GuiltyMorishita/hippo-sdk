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

export const moduleAddress = new HexString("0x1");
export const moduleName = "Reconfiguration";

export const MAX_U64: bigInt.BigInteger = bigInt("18446744073709551615");
export const ECONFIG: bigInt.BigInteger = bigInt("1");
export const ECONFIGURATION: bigInt.BigInteger = bigInt("0");
export const EINVALID_BLOCK_TIME: bigInt.BigInteger = bigInt("3");
export const EINVALID_GUID_FOR_EVENT: bigInt.BigInteger = bigInt("4");
export const EMODIFY_CAPABILITY: bigInt.BigInteger = bigInt("2");

export class NewEpochEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "NewEpochEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "epoch", typeTag: parseTypeTagOrThrow("u64")}
  ];

  epoch: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.epoch = proto['epoch'] as bigInt.BigInteger;
  }

  static NewEpochEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : NewEpochEvent {
    const proto = parseStructProto(data, typeTag, repo, NewEpochEvent);
    return new NewEpochEvent(proto, typeTag);
  }

}

export class Configuration {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Configuration";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "epoch", typeTag: parseTypeTagOrThrow("u64")},
    {name: "last_reconfiguration_time", typeTag: parseTypeTagOrThrow("u64")},
    {name: "events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Reconfiguration::NewEpochEvent>")}
  ];

  epoch: bigInt.BigInteger;
  last_reconfiguration_time: bigInt.BigInteger;
  events: Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.epoch = proto['epoch'] as bigInt.BigInteger;
    this.last_reconfiguration_time = proto['last_reconfiguration_time'] as bigInt.BigInteger;
    this.events = proto['events'] as Event.EventHandle;
  }

  static ConfigurationParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Configuration {
    const proto = parseStructProto(data, typeTag, repo, Configuration);
    return new Configuration(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Configuration, typeParams);
    return result as unknown as Configuration;
  }

  static async load_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Reconfiguration::Configuration");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "events")
    return events as unknown as NewEpochEvent[];
  }
}

export class DisableReconfiguration {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DisableReconfiguration";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "dummy_field", typeTag: parseTypeTagOrThrow("bool")}
  ];

  dummy_field: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.dummy_field = proto['dummy_field'] as boolean;
  }

  static DisableReconfigurationParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DisableReconfiguration {
    const proto = parseStructProto(data, typeTag, repo, DisableReconfiguration);
    return new DisableReconfiguration(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, DisableReconfiguration, typeParams);
    return result as unknown as DisableReconfiguration;
  }

}

export async function force_reconfigure(
  client: AptosClient,
  account: AptosAccount,
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return sendAndWait(
    client,
    account,
    "0x1::Reconfiguration::force_reconfigure",
    typeParamStrings,
    []
  );
}
export function build_payload_force_reconfigure(
  typeParams: TypeTag[],
) {
  const typeParamStrings = typeParams.map(t=>getTypeTagFullname(t));
  return buildPayload(
    "0x1::Reconfiguration::force_reconfigure",
    typeParamStrings,
    []
  );
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Reconfiguration::NewEpochEvent", NewEpochEvent.NewEpochEventParser);
  repo.addParser("0x1::Reconfiguration::Configuration", Configuration.ConfigurationParser);
  repo.addParser("0x1::Reconfiguration::DisableReconfiguration", DisableReconfiguration.DisableReconfigurationParser);
}