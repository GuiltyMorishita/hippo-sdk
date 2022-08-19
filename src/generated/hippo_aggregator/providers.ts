import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "providers";

export const E_NOT_AUTHORIZED : U64 = u64("1");
export const E_POOL_EXISTS : U64 = u64("1");


export class ApprovedProviders 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "ApprovedProviders";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "providers", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "providers", "SwapPoolProviderInfo", [])) }];

  providers: SwapPoolProviderInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.providers = proto['providers'] as SwapPoolProviderInfo[];
  }

  static ApprovedProvidersParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ApprovedProviders {
    const proto = $.parseStructProto(data, typeTag, repo, ApprovedProviders);
    return new ApprovedProviders(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ApprovedProviders, typeParams);
    return result as unknown as ApprovedProviders;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, ApprovedProviders, typeParams);
    await result.loadFullState(app)
    return result as unknown as ApprovedProviders;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "ApprovedProviders", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class Nothing 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "Nothing";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static NothingParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Nothing {
    const proto = $.parseStructProto(data, typeTag, repo, Nothing);
    return new Nothing(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Nothing, typeParams);
    return result as unknown as Nothing;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, Nothing, typeParams);
    await result.loadFullState(app)
    return result as unknown as Nothing;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "Nothing", []);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}

export class SwapPoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "SwapPoolInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "x_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "y_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "e_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "pool_type", typeTag: AtomicTypeTag.U64 },
  { name: "x_y_order_fixed", typeTag: AtomicTypeTag.Bool }];

  x_type: Aptos_std.Type_info.TypeInfo;
  y_type: Aptos_std.Type_info.TypeInfo;
  e_type: Aptos_std.Type_info.TypeInfo;
  pool_type: U64;
  x_y_order_fixed: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.x_type = proto['x_type'] as Aptos_std.Type_info.TypeInfo;
    this.y_type = proto['y_type'] as Aptos_std.Type_info.TypeInfo;
    this.e_type = proto['e_type'] as Aptos_std.Type_info.TypeInfo;
    this.pool_type = proto['pool_type'] as U64;
    this.x_y_order_fixed = proto['x_y_order_fixed'] as boolean;
  }

  static SwapPoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SwapPoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, SwapPoolInfo);
    return new SwapPoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, SwapPoolInfo, typeParams);
    return result as unknown as SwapPoolInfo;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, SwapPoolInfo, typeParams);
    await result.loadFullState(app)
    return result as unknown as SwapPoolInfo;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "SwapPoolInfo", []);
  }
  async loadFullState(app: $.AppType) {
    await this.x_type.loadFullState(app);
    await this.y_type.loadFullState(app);
    await this.e_type.loadFullState(app);
    this.__app = app;
  }

}

export class SwapPoolProviderInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "SwapPoolProviderInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "swap_name", typeTag: new StructTag(new HexString("0x1"), "string", "String", []) },
  { name: "pools", typeTag: new StructTag(new HexString("0x1"), "simple_map", "SimpleMap", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "providers", "SwapPoolInfo", []), new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "providers", "Nothing", [])]) },
  { name: "contract_address", typeTag: AtomicTypeTag.Address },
  { name: "admin_approved", typeTag: AtomicTypeTag.Bool }];

  swap_name: Std.String.String;
  pools: Aptos_std.Simple_map.SimpleMap;
  contract_address: HexString;
  admin_approved: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.swap_name = proto['swap_name'] as Std.String.String;
    this.pools = proto['pools'] as Aptos_std.Simple_map.SimpleMap;
    this.contract_address = proto['contract_address'] as HexString;
    this.admin_approved = proto['admin_approved'] as boolean;
  }

  static SwapPoolProviderInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SwapPoolProviderInfo {
    const proto = $.parseStructProto(data, typeTag, repo, SwapPoolProviderInfo);
    return new SwapPoolProviderInfo(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "SwapPoolProviderInfo", []);
  }
  async loadFullState(app: $.AppType) {
    await this.swap_name.loadFullState(app);
    await this.pools.loadFullState(app);
    this.__app = app;
  }

}

export class SwapProviderRegistry 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "SwapProviderRegistry";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "providers", typeTag: new StructTag(new HexString("0x1"), "simple_map", "SimpleMap", [AtomicTypeTag.Address, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "providers", "SwapPoolProviderInfo", [])]) }];

  providers: Aptos_std.Simple_map.SimpleMap;

  constructor(proto: any, public typeTag: TypeTag) {
    this.providers = proto['providers'] as Aptos_std.Simple_map.SimpleMap;
  }

  static SwapProviderRegistryParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SwapProviderRegistry {
    const proto = $.parseStructProto(data, typeTag, repo, SwapProviderRegistry);
    return new SwapProviderRegistry(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, SwapProviderRegistry, typeParams);
    return result as unknown as SwapProviderRegistry;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, SwapProviderRegistry, typeParams);
    await result.loadFullState(app)
    return result as unknown as SwapProviderRegistry;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "SwapProviderRegistry", []);
  }
  async loadFullState(app: $.AppType) {
    await this.providers.loadFullState(app);
    this.__app = app;
  }

}
export function add_pool_to_provider_ (
  sender: HexString,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let provider, registry, sender_addr;
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  sender_addr = Std.Signer.address_of_(sender, $c);
  provider = Aptos_std.Simple_map.borrow_mut_(registry.providers, sender_addr, $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  provider_add_pool_(provider, $.copy(pool_type), x_y_order_fixed, $c, [$p[0], $p[1], $p[2]]);
  return;
}


export function buildPayload_add_pool_to_provider (
  pool_type: U64,
  x_y_order_fixed: boolean,
  $p: TypeTag[], /* <X, Y, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::add_pool_to_provider",
    typeParamStrings,
    [
      $.payloadArg(pool_type),
      $.payloadArg(x_y_order_fixed),
    ]
  );

}

export function admin_add_pool_to_provider_ (
  admin: HexString,
  provider_addr: HexString,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let provider, registry;
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode($.copy(E_NOT_AUTHORIZED));
  }
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  provider = Aptos_std.Simple_map.borrow_mut_(registry.providers, provider_addr, $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  provider_add_pool_(provider, $.copy(pool_type), x_y_order_fixed, $c, [$p[0], $p[1], $p[2]]);
  return;
}


export function buildPayload_admin_add_pool_to_provider (
  provider_addr: HexString,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $p: TypeTag[], /* <X, Y, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::admin_add_pool_to_provider",
    typeParamStrings,
    [
      $.payloadArg(provider_addr),
      $.payloadArg(pool_type),
      $.payloadArg(x_y_order_fixed),
    ]
  );

}

export function admin_approve_provider_ (
  admin: HexString,
  contract_address: HexString,
  approved: boolean,
  $c: AptosDataCache,
): void {
  let provider, registry;
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode($.copy(E_NOT_AUTHORIZED));
  }
  provider = Aptos_std.Simple_map.borrow_mut_(registry.providers, contract_address, $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  provider.admin_approved = approved;
  return;
}


export function buildPayload_admin_approve_provider (
  contract_address: HexString,
  approved: boolean,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::admin_approve_provider",
    typeParamStrings,
    [
      $.payloadArg(contract_address),
      $.payloadArg(approved),
    ]
  );

}

export function admin_register_swap_provider_ (
  admin: HexString,
  name: Std.String.String,
  contract_address: HexString,
  $c: AptosDataCache,
): void {
  let provider, registry;
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode($.copy(E_NOT_AUTHORIZED));
  }
  provider = new SwapPoolProviderInfo({ swap_name: $.copy(name), pools: Aptos_std.Simple_map.create_($c, [new SimpleStructTag(SwapPoolInfo), new SimpleStructTag(Nothing)]), contract_address: $.copy(contract_address), admin_approved: true }, new SimpleStructTag(SwapPoolProviderInfo));
  Aptos_std.Simple_map.add_(registry.providers, $.copy(contract_address), $.copy(provider), $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  return;
}


export function buildPayload_admin_register_swap_provider (
  name: Std.String.String,
  contract_address: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::admin_register_swap_provider",
    typeParamStrings,
    [
      $.payloadArg(name),
      $.payloadArg(contract_address),
    ]
  );

}

export function admin_remove_pool_from_provider_ (
  admin: HexString,
  provider_addr: HexString,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let provider, registry;
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode($.copy(E_NOT_AUTHORIZED));
  }
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  provider = Aptos_std.Simple_map.borrow_mut_(registry.providers, provider_addr, $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  provider_remove_pool_(provider, $.copy(pool_type), x_y_order_fixed, $c, [$p[0], $p[1], $p[2]]);
  return;
}


export function buildPayload_admin_remove_pool_from_provider (
  provider_addr: HexString,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $p: TypeTag[], /* <X, Y, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::admin_remove_pool_from_provider",
    typeParamStrings,
    [
      $.payloadArg(provider_addr),
      $.payloadArg(pool_type),
      $.payloadArg(x_y_order_fixed),
    ]
  );

}

export function create_pool_info_ (
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): SwapPoolInfo {
  return new SwapPoolInfo({ x_type: Aptos_std.Type_info.type_of_($c, [$p[0]]), y_type: Aptos_std.Type_info.type_of_($c, [$p[1]]), e_type: Aptos_std.Type_info.type_of_($c, [$p[2]]), pool_type: $.copy(pool_type), x_y_order_fixed: x_y_order_fixed }, new SimpleStructTag(SwapPoolInfo));
}

export function provider_add_pool_ (
  provider: SwapPoolProviderInfo,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let pool_info, reverse_pool_info;
  pool_info = new SwapPoolInfo({ x_type: Aptos_std.Type_info.type_of_($c, [$p[0]]), y_type: Aptos_std.Type_info.type_of_($c, [$p[1]]), e_type: Aptos_std.Type_info.type_of_($c, [$p[2]]), pool_type: $.copy(pool_type), x_y_order_fixed: x_y_order_fixed }, new SimpleStructTag(SwapPoolInfo));
  reverse_pool_info = new SwapPoolInfo({ x_type: Aptos_std.Type_info.type_of_($c, [$p[1]]), y_type: Aptos_std.Type_info.type_of_($c, [$p[0]]), e_type: Aptos_std.Type_info.type_of_($c, [$p[2]]), pool_type: $.copy(pool_type), x_y_order_fixed: x_y_order_fixed }, new SimpleStructTag(SwapPoolInfo));
  if (!!Aptos_std.Simple_map.contains_key_(provider.pools, reverse_pool_info, $c, [new SimpleStructTag(SwapPoolInfo), new SimpleStructTag(Nothing)])) {
    throw $.abortCode($.copy(E_POOL_EXISTS));
  }
  Aptos_std.Simple_map.add_(provider.pools, $.copy(pool_info), new Nothing({  }, new SimpleStructTag(Nothing)), $c, [new SimpleStructTag(SwapPoolInfo), new SimpleStructTag(Nothing)]);
  return;
}

export function provider_remove_pool_ (
  provider: SwapPoolProviderInfo,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let pool_info;
  pool_info = new SwapPoolInfo({ x_type: Aptos_std.Type_info.type_of_($c, [$p[0]]), y_type: Aptos_std.Type_info.type_of_($c, [$p[1]]), e_type: Aptos_std.Type_info.type_of_($c, [$p[2]]), pool_type: $.copy(pool_type), x_y_order_fixed: x_y_order_fixed }, new SimpleStructTag(SwapPoolInfo));
  Aptos_std.Simple_map.remove_(provider.pools, pool_info, $c, [new SimpleStructTag(SwapPoolInfo), new SimpleStructTag(Nothing)]);
  return;
}

export function register_swap_provider_ (
  sender: HexString,
  name: Std.String.String,
  contract_address: HexString,
  $c: AptosDataCache,
): void {
  let provider, registry, sender_addr;
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  sender_addr = Std.Signer.address_of_(sender, $c);
  if (!(($.copy(sender_addr)).hex() === ($.copy(contract_address)).hex())) {
    throw $.abortCode($.copy(E_NOT_AUTHORIZED));
  }
  provider = new SwapPoolProviderInfo({ swap_name: $.copy(name), pools: Aptos_std.Simple_map.create_($c, [new SimpleStructTag(SwapPoolInfo), new SimpleStructTag(Nothing)]), contract_address: $.copy(contract_address), admin_approved: false }, new SimpleStructTag(SwapPoolProviderInfo));
  Aptos_std.Simple_map.add_(registry.providers, $.copy(contract_address), $.copy(provider), $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  return;
}


export function buildPayload_register_swap_provider (
  name: Std.String.String,
  contract_address: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::register_swap_provider",
    typeParamStrings,
    [
      $.payloadArg(name),
      $.payloadArg(contract_address),
    ]
  );

}

export function remove_pool_from_provider_ (
  sender: HexString,
  pool_type: U64,
  x_y_order_fixed: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let provider, registry, sender_addr;
  registry = $c.borrow_global_mut<SwapProviderRegistry>(new SimpleStructTag(SwapProviderRegistry), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  sender_addr = Std.Signer.address_of_(sender, $c);
  provider = Aptos_std.Simple_map.borrow_mut_(registry.providers, sender_addr, $c, [AtomicTypeTag.Address, new SimpleStructTag(SwapPoolProviderInfo)]);
  provider_remove_pool_(provider, $.copy(pool_type), x_y_order_fixed, $c, [$p[0], $p[1], $p[2]]);
  return;
}


export function buildPayload_remove_pool_from_provider (
  pool_type: U64,
  x_y_order_fixed: boolean,
  $p: TypeTag[], /* <X, Y, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::remove_pool_from_provider",
    typeParamStrings,
    [
      $.payloadArg(pool_type),
      $.payloadArg(x_y_order_fixed),
    ]
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::ApprovedProviders", ApprovedProviders.ApprovedProvidersParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::Nothing", Nothing.NothingParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::SwapPoolInfo", SwapPoolInfo.SwapPoolInfoParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::SwapPoolProviderInfo", SwapPoolProviderInfo.SwapPoolProviderInfoParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::providers::SwapProviderRegistry", SwapProviderRegistry.SwapProviderRegistryParser);
}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {
  }
  get moduleAddress() {{ return moduleAddress; }}
  get moduleName() {{ return moduleName; }}
  get ApprovedProviders() { return ApprovedProviders; }
  async loadApprovedProviders(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await ApprovedProviders.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get Nothing() { return Nothing; }
  async loadNothing(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await Nothing.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get SwapPoolInfo() { return SwapPoolInfo; }
  async loadSwapPoolInfo(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await SwapPoolInfo.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  get SwapPoolProviderInfo() { return SwapPoolProviderInfo; }
  get SwapProviderRegistry() { return SwapProviderRegistry; }
  async loadSwapProviderRegistry(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await SwapProviderRegistry.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  payload_add_pool_to_provider(
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
  ) {
    return buildPayload_add_pool_to_provider(pool_type, x_y_order_fixed, $p);
  }
  async add_pool_to_provider(
    _account: AptosAccount,
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_add_pool_to_provider(pool_type, x_y_order_fixed, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_admin_add_pool_to_provider(
    provider_addr: HexString,
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
  ) {
    return buildPayload_admin_add_pool_to_provider(provider_addr, pool_type, x_y_order_fixed, $p);
  }
  async admin_add_pool_to_provider(
    _account: AptosAccount,
    provider_addr: HexString,
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_admin_add_pool_to_provider(provider_addr, pool_type, x_y_order_fixed, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_admin_approve_provider(
    contract_address: HexString,
    approved: boolean,
  ) {
    return buildPayload_admin_approve_provider(contract_address, approved);
  }
  async admin_approve_provider(
    _account: AptosAccount,
    contract_address: HexString,
    approved: boolean,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_admin_approve_provider(contract_address, approved);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_admin_register_swap_provider(
    name: Std.String.String,
    contract_address: HexString,
  ) {
    return buildPayload_admin_register_swap_provider(name, contract_address);
  }
  async admin_register_swap_provider(
    _account: AptosAccount,
    name: Std.String.String,
    contract_address: HexString,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_admin_register_swap_provider(name, contract_address);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_admin_remove_pool_from_provider(
    provider_addr: HexString,
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
  ) {
    return buildPayload_admin_remove_pool_from_provider(provider_addr, pool_type, x_y_order_fixed, $p);
  }
  async admin_remove_pool_from_provider(
    _account: AptosAccount,
    provider_addr: HexString,
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_admin_remove_pool_from_provider(provider_addr, pool_type, x_y_order_fixed, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_register_swap_provider(
    name: Std.String.String,
    contract_address: HexString,
  ) {
    return buildPayload_register_swap_provider(name, contract_address);
  }
  async register_swap_provider(
    _account: AptosAccount,
    name: Std.String.String,
    contract_address: HexString,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_register_swap_provider(name, contract_address);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_pool_from_provider(
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
  ) {
    return buildPayload_remove_pool_from_provider(pool_type, x_y_order_fixed, $p);
  }
  async remove_pool_from_provider(
    _account: AptosAccount,
    pool_type: U64,
    x_y_order_fixed: boolean,
    $p: TypeTag[], /* <X, Y, E>*/
    _maxGas = 1000,
  ) {
    const payload = buildPayload_remove_pool_from_provider(pool_type, x_y_order_fixed, $p);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

