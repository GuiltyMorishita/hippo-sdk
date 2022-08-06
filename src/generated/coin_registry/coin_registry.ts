import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
export const packageName = "CoinRegistry";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "coin_registry";

export const E_ADMIN_ONLY : U64 = u64("1");
export const E_ALREADY_INITIALIZED : U64 = u64("2");
export const E_SYMBOL_ALREADY_EXISTS : U64 = u64("3");
export const E_SYMBOL_DOES_NOT_EXIST : U64 = u64("4");
export const E_TYPE_ALREADY_EXISTS : U64 = u64("4");


export class TokenInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "symbol", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "description", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "decimals", typeTag: AtomicTypeTag.U8 },
  { name: "logo_url", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "project_url", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "delisted", typeTag: AtomicTypeTag.Bool },
  { name: "token_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) }];

  name: Std.String.String;
  symbol: Std.String.String;
  description: Std.String.String;
  decimals: U8;
  logo_url: Std.String.String;
  project_url: Std.String.String;
  delisted: boolean;
  token_type: Aptos_std.Type_info.TypeInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Std.String.String;
    this.symbol = proto['symbol'] as Std.String.String;
    this.description = proto['description'] as Std.String.String;
    this.decimals = proto['decimals'] as U8;
    this.logo_url = proto['logo_url'] as Std.String.String;
    this.project_url = proto['project_url'] as Std.String.String;
    this.delisted = proto['delisted'] as boolean;
    this.token_type = proto['token_type'] as Aptos_std.Type_info.TypeInfo;
  }

  static TokenInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenInfo {
    const proto = $.parseStructProto(data, typeTag, repo, TokenInfo);
    return new TokenInfo(proto, typeTag);
  }

}

export class TokenRegistry 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenRegistry";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "admin", typeTag: AtomicTypeTag.Address },
  { name: "symbol_to_token_info", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]) },
  { name: "type_info_to_symbol", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x1"), "string", "String", [])]) },
  { name: "symbol_to_list_idx", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new StructTag(new HexString("0x1"), "string", "String", []), AtomicTypeTag.U64]) },
  { name: "token_info_list", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])) }];

  admin: HexString;
  symbol_to_token_info: Aptos_std.Table.Table;
  type_info_to_symbol: Aptos_std.Table.Table;
  symbol_to_list_idx: Aptos_std.Table.Table;
  token_info_list: TokenInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.admin = proto['admin'] as HexString;
    this.symbol_to_token_info = proto['symbol_to_token_info'] as Aptos_std.Table.Table;
    this.type_info_to_symbol = proto['type_info_to_symbol'] as Aptos_std.Table.Table;
    this.symbol_to_list_idx = proto['symbol_to_list_idx'] as Aptos_std.Table.Table;
    this.token_info_list = proto['token_info_list'] as TokenInfo[];
  }

  static TokenRegistryParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenRegistry {
    const proto = $.parseStructProto(data, typeTag, repo, TokenRegistry);
    return new TokenRegistry(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenRegistry, typeParams);
    return result as unknown as TokenRegistry;
  }
}
export function add_token_ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  description: U8[],
  decimals: U8,
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let admin_addr, index, registry, token_info, type_info;
  admin_addr = Std.Signer.address_of_(admin, $c);
  registry = $c.borrow_global_mut<TokenRegistry>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), $.copy(admin_addr));
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  token_info = new TokenInfo({ name: Std.String.utf8_($.copy(name), $c), symbol: Std.String.utf8_($.copy(symbol), $c), description: Std.String.utf8_($.copy(description), $c), decimals: $.copy(decimals), logo_url: Std.String.utf8_($.copy(logo_url), $c), project_url: Std.String.utf8_($.copy(project_url), $c), delisted: false, token_type: $.copy(type_info) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", []));
  if (!!Aptos_std.Table.contains_(registry.symbol_to_token_info, $.copy(token_info.symbol), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])])) {
    throw $.abortCode(E_SYMBOL_ALREADY_EXISTS);
  }
  if (!!Aptos_std.Table.contains_(registry.type_info_to_symbol, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x1"), "string", "String", [])])) {
    throw $.abortCode(E_TYPE_ALREADY_EXISTS);
  }
  Aptos_std.Table.add_(registry.symbol_to_token_info, $.copy(token_info.symbol), $.copy(token_info), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  Aptos_std.Table.add_(registry.type_info_to_symbol, $.copy(type_info), $.copy(token_info.symbol), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  index = Std.Vector.length_(registry.token_info_list, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  Std.Vector.push_back_(registry.token_info_list, $.copy(token_info), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  Aptos_std.Table.add_(registry.symbol_to_list_idx, $.copy(token_info.symbol), $.copy(index), $c, [new StructTag(new HexString("0x1"), "string", "String", []), AtomicTypeTag.U64]);
  return;
}

export function add_token_script_ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  description: U8[],
  decimals: U8,
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  return add_token_(admin, $.copy(name), $.copy(symbol), $.copy(description), $.copy(decimals), $.copy(logo_url), $.copy(project_url), $c, [$p[0]]);
}


export function buildPayload_add_token_script (
  name: U8[],
  symbol: U8[],
  description: U8[],
  decimals: U8,
  logo_url: U8[],
  project_url: U8[],
  $p: TypeTag[], /* <TokenType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::coin_registry::add_token_script",
    typeParamStrings,
    [
      $.u8ArrayArg(name),
      $.u8ArrayArg(symbol),
      $.u8ArrayArg(description),
      $.payloadArg(decimals),
      $.u8ArrayArg(logo_url),
      $.u8ArrayArg(project_url),
    ]
  );

}

export function delist_token_ (
  admin: HexString,
  symbol: U8[],
  $c: AptosDataCache,
): void {
  let admin_addr, index, registry, symbol_str, type_info;
  admin_addr = Std.Signer.address_of_(admin, $c);
  registry = $c.borrow_global_mut<TokenRegistry>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), $.copy(admin_addr));
  symbol_str = Std.String.utf8_($.copy(symbol), $c);
  if (!Aptos_std.Table.contains_(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])])) {
    throw $.abortCode(E_SYMBOL_DOES_NOT_EXIST);
  }
  index = $.copy(Aptos_std.Table.borrow_(registry.symbol_to_list_idx, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), AtomicTypeTag.U64]));
  type_info = $.copy(Aptos_std.Table.borrow_(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]).token_type);
  Std.Vector.borrow_mut_(registry.token_info_list, $.copy(index), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]).delisted = true;
  Aptos_std.Table.remove_(registry.symbol_to_list_idx, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), AtomicTypeTag.U64]);
  Aptos_std.Table.remove_(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  Aptos_std.Table.remove_(registry.type_info_to_symbol, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  return;
}

export function delist_token_script_ (
  admin: HexString,
  symbol: U8[],
  $c: AptosDataCache,
): void {
  delist_token_(admin, $.copy(symbol), $c);
  return;
}


export function buildPayload_delist_token_script (
  symbol: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::coin_registry::delist_token_script",
    typeParamStrings,
    [
      $.u8ArrayArg(symbol),
    ]
  );

}

export function has_token_ (
  admin: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): boolean {
  let registry, type_info;
  registry = $c.borrow_global<TokenRegistry>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), $.copy(admin));
  type_info = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  return Aptos_std.Table.contains_(registry.type_info_to_symbol, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
}

export function initialize_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, admin_addr;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), $.copy(admin_addr))) {
    throw $.abortCode(E_ALREADY_INITIALIZED);
  }
  temp$6 = admin;
  temp$1 = $.copy(admin_addr);
  temp$2 = Aptos_std.Table.new___($c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  temp$3 = Aptos_std.Table.new___($c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), new StructTag(new HexString("0x1"), "string", "String", [])]);
  temp$4 = Std.Vector.empty_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  temp$5 = Aptos_std.Table.new___($c, [new StructTag(new HexString("0x1"), "string", "String", []), AtomicTypeTag.U64]);
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), temp$6, new TokenRegistry({ admin: temp$1, symbol_to_token_info: temp$2, type_info_to_symbol: temp$3, symbol_to_list_idx: temp$5, token_info_list: temp$4 }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", [])));
  return;
}

export function initialize_script_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize_(admin, $c);
  return;
}


export function buildPayload_initialize_script (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::coin_registry::initialize_script",
    typeParamStrings,
    []
  );

}

export function is_registry_initialized_ (
  admin: HexString,
  $c: AptosDataCache,
): boolean {
  return $c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), $.copy(admin));
}

export function update_token_info_ (
  admin: HexString,
  symbol: U8[],
  description: U8[],
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
): void {
  let admin_addr, index, list_token_info, registry, symbol_str, table_token_info;
  admin_addr = Std.Signer.address_of_(admin, $c);
  registry = $c.borrow_global_mut<TokenRegistry>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenRegistry", []), $.copy(admin_addr));
  symbol_str = Std.String.utf8_($.copy(symbol), $c);
  if (!Aptos_std.Table.contains_(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])])) {
    throw $.abortCode(E_SYMBOL_DOES_NOT_EXIST);
  }
  index = $.copy(Aptos_std.Table.borrow_(registry.symbol_to_list_idx, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), AtomicTypeTag.U64]));
  list_token_info = Std.Vector.borrow_mut_(registry.token_info_list, $.copy(index), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  list_token_info.description = Std.String.utf8_($.copy(description), $c);
  list_token_info.logo_url = Std.String.utf8_($.copy(logo_url), $c);
  list_token_info.project_url = Std.String.utf8_($.copy(project_url), $c);
  table_token_info = Aptos_std.Table.borrow_mut_(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "string", "String", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "coin_registry", "TokenInfo", [])]);
  table_token_info.description = Std.String.utf8_($.copy(description), $c);
  table_token_info.logo_url = Std.String.utf8_($.copy(logo_url), $c);
  table_token_info.project_url = Std.String.utf8_($.copy(project_url), $c);
  return;
}

export function update_token_info_script_ (
  admin: HexString,
  symbol: U8[],
  description: U8[],
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
): void {
  update_token_info_(admin, $.copy(symbol), $.copy(description), $.copy(logo_url), $.copy(project_url), $c);
  return;
}


export function buildPayload_update_token_info_script (
  symbol: U8[],
  description: U8[],
  logo_url: U8[],
  project_url: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::coin_registry::update_token_info_script",
    typeParamStrings,
    [
      $.u8ArrayArg(symbol),
      $.u8ArrayArg(description),
      $.u8ArrayArg(logo_url),
      $.u8ArrayArg(project_url),
    ]
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::coin_registry::TokenInfo", TokenInfo.TokenInfoParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::coin_registry::TokenRegistry", TokenRegistry.TokenRegistryParser);
}

