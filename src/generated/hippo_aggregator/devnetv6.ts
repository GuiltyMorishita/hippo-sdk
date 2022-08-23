import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Coin_list from "../coin_list";
import * as Econia from "../econia";
import * as Pontem from "../pontem";
import * as Std from "../std";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "devnetv6";

export const BTC_AMOUNT : U64 = (u64("100000000")).mul(u64("1000"));
export const USDC_AMOUNT : U64 = ((u64("100000000")).mul(u64("1000"))).mul(u64("10000"));


export class PontemLP 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "PontemLP";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static PontemLPParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PontemLP {
    const proto = $.parseStructProto(data, typeTag, repo, PontemLP);
    return new PontemLP(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "PontemLP", $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function mock_deploy_econia_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  Econia.Market.register_market_(admin, $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new StructTag(new HexString("0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7"), "registry", "E0", [])]);
  Econia.User.register_market_account_(admin, u64("0"), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new StructTag(new HexString("0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7"), "registry", "E0", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  Econia.User.deposit_collateral_coinstore_(admin, u64("0"), true, $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new StructTag(new HexString("0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7"), "registry", "E0", [])]);
  Econia.User.deposit_collateral_coinstore_(admin, u64("0"), false, $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new StructTag(new HexString("0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7"), "registry", "E0", [])]);
  Econia.Market.place_limit_order_user_(admin, Std.Signer.address_of_(admin, $c), true, $.copy(BTC_AMOUNT), u64("10001"), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new StructTag(new HexString("0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7"), "registry", "E0", [])]);
  Econia.Market.place_limit_order_user_(admin, Std.Signer.address_of_(admin, $c), false, $.copy(BTC_AMOUNT), u64("10000"), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new StructTag(new HexString("0xb1d4c0de8bc24468608637dfdbff975a0888f8935aa63338a44078eec5c7b6c7"), "registry", "E0", [])]);
  return;
}


export function buildPayload_mock_deploy_econia (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"),
    "devnetv6",
    "mock_deploy_econia",
    typeParamStrings,
    []
  );

}

export function mock_deploy_pontem_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])]);
  return Pontem.Scripts.register_pool_and_add_liquidity_(admin, u8("2"), $.copy(BTC_AMOUNT), u64("0"), $.copy(USDC_AMOUNT), u64("0"), $c, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", []), new SimpleStructTag(PontemLP, [new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"), "devnet_coins", "DevnetUSDC", [])])]);
}


export function buildPayload_mock_deploy_pontem (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"),
    "devnetv6",
    "mock_deploy_pontem",
    typeParamStrings,
    []
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::devnetv6::PontemLP", PontemLP.PontemLPParser);
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
  get PontemLP() { return PontemLP; }
  payload_mock_deploy_econia(
  ) {
    return buildPayload_mock_deploy_econia();
  }
  async mock_deploy_econia(
    _account: AptosAccount,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_mock_deploy_econia();
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_mock_deploy_pontem(
  ) {
    return buildPayload_mock_deploy_pontem();
  }
  async mock_deploy_pontem(
    _account: AptosAccount,
    _maxGas = 1000,
  ) {
    const payload = buildPayload_mock_deploy_pontem();
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

