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
import * as Event from "./Event";

export const moduleAddress = new HexString("0x1");
export const moduleName = "Block";

export const EBLOCK_METADATA: bigInt.BigInteger = bigInt("0");
export const EVM_OR_VALIDATOR: bigInt.BigInteger = bigInt("1");

export class BlockMetadata {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BlockMetadata";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "height", typeTag: parseTypeTagOrThrow("u64")},
    {name: "epoch_internal", typeTag: parseTypeTagOrThrow("u64")},
    {name: "new_block_events", typeTag: parseTypeTagOrThrow("0x1::Event::EventHandle<0x1::Block::NewBlockEvent>")}
  ];

  height: bigInt.BigInteger;
  epoch_internal: bigInt.BigInteger;
  new_block_events: Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.height = proto['height'] as bigInt.BigInteger;
    this.epoch_internal = proto['epoch_internal'] as bigInt.BigInteger;
    this.new_block_events = proto['new_block_events'] as Event.EventHandle;
  }

  static BlockMetadataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BlockMetadata {
    const proto = parseStructProto(data, typeTag, repo, BlockMetadata);
    return new BlockMetadata(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, BlockMetadata, typeParams);
    return result as unknown as BlockMetadata;
  }

  static async load_new_block_events(
    repo: AptosParserRepo,
    client: AptosClient,
    address: HexString,
    typeParams: TypeTag[],
  ) {
    const containerTypeTag = parseTypeTagOrThrow("0x1::Block::BlockMetadata");
    if(!(containerTypeTag instanceof StructTag)) {
      throw new Error('Unreachable');
    }
    containerTypeTag.typeParams = typeParams;
    const events = await repo.loadEvents(client, address, containerTypeTag, "new_block_events")
    return events as unknown as NewBlockEvent[];
  }
}

export class NewBlockEvent {
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "NewBlockEvent";
  static typeParameters: TypeParamDeclType[] = [
  ];
  static fields: FieldDeclType[] = [
    {name: "epoch", typeTag: parseTypeTagOrThrow("u64")},
    {name: "round", typeTag: parseTypeTagOrThrow("u64")},
    {name: "previous_block_votes", typeTag: parseTypeTagOrThrow("vector<bool>")},
    {name: "proposer", typeTag: parseTypeTagOrThrow("address")},
    {name: "failed_proposer_indices", typeTag: parseTypeTagOrThrow("vector<u64>")},
    {name: "time_microseconds", typeTag: parseTypeTagOrThrow("u64")}
  ];

  epoch: bigInt.BigInteger;
  round: bigInt.BigInteger;
  previous_block_votes: boolean[];
  proposer: HexString;
  failed_proposer_indices: bigInt.BigInteger[];
  time_microseconds: bigInt.BigInteger;

  constructor(proto: any, public typeTag: TypeTag) {
    this.epoch = proto['epoch'] as bigInt.BigInteger;
    this.round = proto['round'] as bigInt.BigInteger;
    this.previous_block_votes = proto['previous_block_votes'] as boolean[];
    this.proposer = proto['proposer'] as HexString;
    this.failed_proposer_indices = proto['failed_proposer_indices'] as bigInt.BigInteger[];
    this.time_microseconds = proto['time_microseconds'] as bigInt.BigInteger;
  }

  static NewBlockEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : NewBlockEvent {
    const proto = parseStructProto(data, typeTag, repo, NewBlockEvent);
    return new NewBlockEvent(proto, typeTag);
  }

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::Block::BlockMetadata", BlockMetadata.BlockMetadataParser);
  repo.addParser("0x1::Block::NewBlockEvent", NewBlockEvent.NewBlockEventParser);
}