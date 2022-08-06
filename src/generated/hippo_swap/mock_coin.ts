import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "mock_coin";



export class TokenSharedCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenSharedCapability";
  static typeParameters: TypeParamDeclType[] = [
    { name: "TokenType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mint", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new $.TypeParamIdx(0)]) },
  { name: "burn", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new $.TypeParamIdx(0)]) }];

  mint: Aptos_framework.Coin.MintCapability;
  burn: Aptos_framework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint = proto['mint'] as Aptos_framework.Coin.MintCapability;
    this.burn = proto['burn'] as Aptos_framework.Coin.BurnCapability;
  }

  static TokenSharedCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenSharedCapability {
    const proto = $.parseStructProto(data, typeTag, repo, TokenSharedCapability);
    return new TokenSharedCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenSharedCapability, typeParams);
    return result as unknown as TokenSharedCapability;
  }
}

export class WBTC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WBTC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WBTCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WBTC {
    const proto = $.parseStructProto(data, typeTag, repo, WBTC);
    return new WBTC(proto, typeTag);
  }

}

export class WDAI 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WDAI";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WDAIParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WDAI {
    const proto = $.parseStructProto(data, typeTag, repo, WDAI);
    return new WDAI(proto, typeTag);
  }

}

export class WDOT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WDOT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WDOTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WDOT {
    const proto = $.parseStructProto(data, typeTag, repo, WDOT);
    return new WDOT(proto, typeTag);
  }

}

export class WETH 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WETH";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WETHParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WETH {
    const proto = $.parseStructProto(data, typeTag, repo, WETH);
    return new WETH(proto, typeTag);
  }

}

export class WSOL 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WSOL";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WSOLParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WSOL {
    const proto = $.parseStructProto(data, typeTag, repo, WSOL);
    return new WSOL(proto, typeTag);
  }

}

export class WUSDC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WUSDC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WUSDCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WUSDC {
    const proto = $.parseStructProto(data, typeTag, repo, WUSDC);
    return new WUSDC(proto, typeTag);
  }

}

export class WUSDT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WUSDT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WUSDTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WUSDT {
    const proto = $.parseStructProto(data, typeTag, repo, WUSDT);
    return new WUSDT(proto, typeTag);
  }

}
export function burn_ (
  tokens: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let temp$1, addr, amt, cap;
  temp$1 = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  addr = Aptos_std.Type_info.account_address_(temp$1, $c);
  cap = $c.borrow_global<TokenSharedCapability>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "TokenSharedCapability", [$p[0]]), $.copy(addr));
  amt = Aptos_framework.Coin.value_(tokens, $c, [$p[0]]);
  if (($.copy(amt)).eq((u64("0")))) {
    Aptos_framework.Coin.destroy_zero_(tokens, $c, [$p[0]]);
  }
  else{
    Aptos_framework.Coin.burn_(tokens, cap.burn, $c, [$p[0]]);
  }
  return;
}

export function faucet_mint_to_ (
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let coin, to_addr;
  to_addr = Std.Signer.address_of_(to, $c);
  if (!Aptos_framework.Coin.is_account_registered_($.copy(to_addr), $c, [$p[0]])) {
    Aptos_framework.Coins.register_internal_(to, $c, [$p[0]]);
  }
  else{
  }
  coin = mint_($.copy(amount), $c, [$p[0]]);
  Aptos_framework.Coin.deposit_($.copy(to_addr), coin, $c, [$p[0]]);
  return;
}

export function faucet_mint_to_script_ (
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  faucet_mint_to_(to, $.copy(amount), $c, [$p[0]]);
  return;
}


export function buildPayload_faucet_mint_to_script (
  amount: U64,
  $p: TypeTag[], /* <TokenType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::faucet_mint_to_script",
    typeParamStrings,
    [
      $.payloadArg(amount),
    ]
  );

}

export function initialize_ (
  account: HexString,
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let temp$1, burn_capability, mint_capability, name;
  temp$1 = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  name = Std.String.utf8_(Aptos_std.Type_info.struct_name_(temp$1, $c), $c);
  [mint_capability, burn_capability] = Aptos_framework.Coin.initialize_(account, $.copy(name), $.copy(name), $.copy(decimals), true, $c, [$p[0]]);
  Aptos_framework.Coins.register_internal_(account, $c, [$p[0]]);
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "TokenSharedCapability", [$p[0]]), account, new TokenSharedCapability({ mint: $.copy(mint_capability), burn: $.copy(burn_capability) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "TokenSharedCapability", [$p[0]])));
  return;
}

export function mint_ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): Aptos_framework.Coin.Coin {
  let temp$1, addr, cap;
  temp$1 = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  addr = Aptos_std.Type_info.account_address_(temp$1, $c);
  cap = $c.borrow_global<TokenSharedCapability>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "mock_coin", "TokenSharedCapability", [$p[0]]), $.copy(addr));
  return Aptos_framework.Coin.mint_($.copy(amount), cap.mint, $c, [$p[0]]);
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::TokenSharedCapability", TokenSharedCapability.TokenSharedCapabilityParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WBTC", WBTC.WBTCParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WDAI", WDAI.WDAIParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WDOT", WDOT.WDOTParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WETH", WETH.WETHParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WSOL", WSOL.WSOLParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WUSDC", WUSDC.WUSDCParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WUSDT", WUSDT.WUSDTParser);
}

