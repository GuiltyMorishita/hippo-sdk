import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Econia from "../econia";
import * as Hippo_swap from "../hippo_swap";
import * as Pontem from "../pontem";
import * as Std from "../std";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "aggregatorv6";

export const DEX_ECONIA : U8 = u8("2");
export const DEX_HIPPO : U8 = u8("1");
export const DEX_PONTEM : U8 = u8("3");
export const ECONIA_V1 : U8 = u8("1");
export const E_NOT_ADMIN : U64 = u64("4");
export const E_OUTPUT_LESS_THAN_MINIMUM : U64 = u64("2");
export const E_UNKNOWN_DEX : U64 = u64("3");
export const E_UNKNOWN_POOL_TYPE : U64 = u64("1");
export const HIPPO_CONSTANT_PRODUCT : U8 = u8("1");
export const HIPPO_PIECEWISE : U8 = u8("3");
export const HIPPO_STABLE_CURVE : U8 = u8("2");
export const MAX_SIZE : U64 = u64("9223372036854775808");


export class SignerStore 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "SignerStore";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "signer_cap", typeTag: new StructTag(new HexString("0x1"), "account", "SignerCapability", []) }];

  signer_cap: Aptos_framework.Account.SignerCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.signer_cap = proto['signer_cap'] as Aptos_framework.Account.SignerCapability;
  }

  static SignerStoreParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SignerStore {
    const proto = $.parseStructProto(data, typeTag, repo, SignerStore);
    return new SignerStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, SignerStore, typeParams);
    return result as unknown as SignerStore;
  }
  static async loadByApp(app: $.AppType, address: HexString, typeParams: TypeTag[]) {
    const result = await app.repo.loadResource(app.client, address, SignerStore, typeParams);
    await result.loadFullState(app)
    return result as unknown as SignerStore;
  }
  static getTag(): StructTag {
    return new StructTag(moduleAddress, moduleName, "SignerStore", []);
  }
  async loadFullState(app: $.AppType) {
    await this.signer_cap.loadFullState(app);
    this.__app = app;
  }

}
export function check_and_deposit_ (
  sender: HexString,
  coin: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X>*/
): void {
  let sender_addr;
  sender_addr = Std.Signer.address_of_(sender, $c);
  if (!Aptos_framework.Coin.is_account_registered_($.copy(sender_addr), $c, [$p[0]])) {
    Aptos_framework.Coins.register_internal_(sender, $c, [$p[0]]);
  }
  else{
  }
  Aptos_framework.Coin.deposit_($.copy(sender_addr), coin, $c, [$p[0]]);
  return;
}

export function check_and_deposit_opt_ (
  sender: HexString,
  coin_opt: Std.Option.Option,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X>*/
): void {
  let coin, sender_addr;
  if (Std.Option.is_some_(coin_opt, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])])) {
    coin = Std.Option.extract_(coin_opt, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]);
    sender_addr = Std.Signer.address_of_(sender, $c);
    if (!Aptos_framework.Coin.is_account_registered_($.copy(sender_addr), $c, [$p[0]])) {
      Aptos_framework.Coins.register_internal_(sender, $c, [$p[0]]);
    }
    else{
    }
    Aptos_framework.Coin.deposit_($.copy(sender_addr), coin, $c, [$p[0]]);
  }
  else{
  }
  return Std.Option.destroy_none_(coin_opt, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]);
}

export function get_intermediate_output_ (
  dex_type: U8,
  pool_type: U8,
  is_x_to_y: boolean,
  x_in: Aptos_framework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): [Std.Option.Option, Aptos_framework.Coin.Coin] {
  let temp$10, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$20, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$30, temp$31, temp$4, temp$9, x_out, x_out__2, y_out, y_out__1, y_out__11, y_out__12, y_out__21, y_out__5, y_out__7, zero, zero__6, zero2, zero2__8;
  if (($.copy(dex_type)).eq(($.copy(DEX_HIPPO)))) {
    if (($.copy(pool_type)).eq(($.copy(HIPPO_CONSTANT_PRODUCT)))) {
      if (is_x_to_y) {
        [x_out, y_out] = Hippo_swap.Cp_swap.swap_x_to_exact_y_direct_(x_in, $c, [$p[0], $p[1]]);
        Aptos_framework.Coin.destroy_zero_(x_out, $c, [$p[0]]);
        [temp$3, temp$4] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out];
      }
      else{
        [y_out__1, x_out__2] = Hippo_swap.Cp_swap.swap_y_to_exact_x_direct_(x_in, $c, [$p[1], $p[0]]);
        Aptos_framework.Coin.destroy_zero_(x_out__2, $c, [$p[0]]);
        [temp$3, temp$4] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__1];
      }
      [temp$19, temp$20] = [temp$3, temp$4];
    }
    else{
      if (($.copy(pool_type)).eq(($.copy(HIPPO_STABLE_CURVE)))) {
        if (is_x_to_y) {
          [zero, zero2, y_out__5] = Hippo_swap.Stable_curve_swap.swap_x_to_exact_y_direct_(x_in, $c, [$p[0], $p[1]]);
          Aptos_framework.Coin.destroy_zero_(zero, $c, [$p[0]]);
          Aptos_framework.Coin.destroy_zero_(zero2, $c, [$p[0]]);
          [temp$9, temp$10] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__5];
        }
        else{
          [zero__6, y_out__7, zero2__8] = Hippo_swap.Stable_curve_swap.swap_y_to_exact_x_direct_(x_in, $c, [$p[1], $p[0]]);
          Aptos_framework.Coin.destroy_zero_(zero__6, $c, [$p[0]]);
          Aptos_framework.Coin.destroy_zero_(zero2__8, $c, [$p[0]]);
          [temp$9, temp$10] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__7];
        }
        [temp$17, temp$18] = [temp$9, temp$10];
      }
      else{
        if (($.copy(pool_type)).eq(($.copy(HIPPO_PIECEWISE)))) {
          if (is_x_to_y) {
            y_out__11 = Hippo_swap.Piece_swap.swap_x_to_y_direct_(x_in, $c, [$p[0], $p[1]]);
            [temp$13, temp$14] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__11];
          }
          else{
            y_out__12 = Hippo_swap.Piece_swap.swap_y_to_x_direct_(x_in, $c, [$p[1], $p[0]]);
            [temp$13, temp$14] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__12];
          }
          [temp$15, temp$16] = [temp$13, temp$14];
        }
        else{
          throw $.abortCode($.copy(E_UNKNOWN_POOL_TYPE));
        }
        [temp$17, temp$18] = [temp$15, temp$16];
      }
      [temp$19, temp$20] = [temp$17, temp$18];
    }
    [temp$30, temp$31] = [temp$19, temp$20];
  }
  else{
    if (($.copy(dex_type)).eq(($.copy(DEX_ECONIA)))) {
      if (($.copy(pool_type)).eq(($.copy(ECONIA_V1)))) {
        y_out__21 = Aptos_framework.Coin.zero_($c, [$p[1]]);
        if (is_x_to_y) {
          Econia.Market.swap_(false, new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), x_in, y_out__21, $c, [$p[0], $p[1], $p[2]]);
        }
        else{
          Econia.Market.swap_(true, new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), y_out__21, x_in, $c, [$p[1], $p[0], $p[2]]);
        }
        if ((Aptos_framework.Coin.value_(x_in, $c, [$p[0]])).eq((u64("0")))) {
          Aptos_framework.Coin.destroy_zero_(x_in, $c, [$p[0]]);
          [temp$22, temp$23] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__21];
        }
        else{
          [temp$22, temp$23] = [Std.Option.some_(x_in, $c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), y_out__21];
        }
        [temp$24, temp$25] = [temp$22, temp$23];
      }
      else{
        throw $.abortCode($.copy(E_UNKNOWN_POOL_TYPE));
      }
      [temp$28, temp$29] = [temp$24, temp$25];
    }
    else{
      if (($.copy(dex_type)).eq(($.copy(DEX_PONTEM)))) {
        [temp$26, temp$27] = [Std.Option.none_($c, [new StructTag(new HexString("0x1"), "coin", "Coin", [$p[0]])]), Pontem.Router.swap_exact_coin_for_coin_(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), x_in, u64("0"), $c, [$p[0], $p[1], $p[2]])];
      }
      else{
        throw $.abortCode($.copy(E_UNKNOWN_DEX));
      }
      [temp$28, temp$29] = [temp$26, temp$27];
    }
    [temp$30, temp$31] = [temp$28, temp$29];
  }
  return [temp$30, temp$31];
}

export function initialize_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, signer_cap;
  admin_addr = Std.Signer.address_of_(admin, $c);
  if (!(($.copy(admin_addr)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode($.copy(E_NOT_ADMIN));
  }
  [, signer_cap] = Aptos_framework.Account.create_resource_account_(admin, [u8("115"), u8("105"), u8("103"), u8("110"), u8("101"), u8("114"), u8("118"), u8("51")], $c);
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "aggregatorv6", "SignerStore", []), admin, new SignerStore({ signer_cap: signer_cap }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "aggregatorv6", "SignerStore", [])));
  return;
}


export function buildPayload_initialize (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv6::initialize",
    typeParamStrings,
    []
  );

}

export function one_step_route_ (
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  x_in: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let coin_in, coin_out, coin_remain_opt;
  coin_in = Aptos_framework.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  [coin_remain_opt, coin_out] = get_intermediate_output_($.copy(first_dex_type), $.copy(first_pool_type), first_is_x_to_y, coin_in, $c, [$p[0], $p[1], $p[2]]);
  if (!(Aptos_framework.Coin.value_(coin_out, $c, [$p[1]])).ge($.copy(y_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  check_and_deposit_opt_(sender, coin_remain_opt, $c, [$p[0]]);
  check_and_deposit_(sender, coin_out, $c, [$p[1]]);
  return;
}


export function buildPayload_one_step_route (
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  x_in: U64,
  y_min_out: U64,
  $p: TypeTag[], /* <X, Y, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv6::one_step_route",
    typeParamStrings,
    [
      $.payloadArg(first_dex_type),
      $.payloadArg(first_pool_type),
      $.payloadArg(first_is_x_to_y),
      $.payloadArg(x_in),
      $.payloadArg(y_min_out),
    ]
  );

}

export function three_step_route_ (
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  third_dex_type: U8,
  third_pool_type: U8,
  third_is_x_to_y: boolean,
  x_in: U64,
  m_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, Z, M, E1, E2, E3>*/
): void {
  let coin_m, coin_x, coin_x_remain, coin_y, coin_y_remain, coin_z, coin_z_remain;
  coin_x = Aptos_framework.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  [coin_x_remain, coin_y] = get_intermediate_output_($.copy(first_dex_type), $.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1], $p[4]]);
  [coin_y_remain, coin_z] = get_intermediate_output_($.copy(second_dex_type), $.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2], $p[5]]);
  [coin_z_remain, coin_m] = get_intermediate_output_($.copy(third_dex_type), $.copy(third_pool_type), third_is_x_to_y, coin_z, $c, [$p[2], $p[3], $p[6]]);
  if (!(Aptos_framework.Coin.value_(coin_m, $c, [$p[3]])).ge($.copy(m_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  check_and_deposit_opt_(sender, coin_x_remain, $c, [$p[0]]);
  check_and_deposit_opt_(sender, coin_y_remain, $c, [$p[1]]);
  check_and_deposit_opt_(sender, coin_z_remain, $c, [$p[2]]);
  check_and_deposit_(sender, coin_m, $c, [$p[3]]);
  return;
}


export function buildPayload_three_step_route (
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  third_dex_type: U8,
  third_pool_type: U8,
  third_is_x_to_y: boolean,
  x_in: U64,
  m_min_out: U64,
  $p: TypeTag[], /* <X, Y, Z, M, E1, E2, E3>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv6::three_step_route",
    typeParamStrings,
    [
      $.payloadArg(first_dex_type),
      $.payloadArg(first_pool_type),
      $.payloadArg(first_is_x_to_y),
      $.payloadArg(second_dex_type),
      $.payloadArg(second_pool_type),
      $.payloadArg(second_is_x_to_y),
      $.payloadArg(third_dex_type),
      $.payloadArg(third_pool_type),
      $.payloadArg(third_is_x_to_y),
      $.payloadArg(x_in),
      $.payloadArg(m_min_out),
    ]
  );

}

export function two_step_route_ (
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, Z, E1, E2>*/
): void {
  let coin_x, coin_x_remain, coin_y, coin_y_remain, coin_z;
  coin_x = Aptos_framework.Coin.withdraw_(sender, $.copy(x_in), $c, [$p[0]]);
  [coin_x_remain, coin_y] = get_intermediate_output_($.copy(first_dex_type), $.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1], $p[3]]);
  [coin_y_remain, coin_z] = get_intermediate_output_($.copy(second_dex_type), $.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2], $p[4]]);
  if (!(Aptos_framework.Coin.value_(coin_z, $c, [$p[2]])).ge($.copy(z_min_out))) {
    throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MINIMUM));
  }
  check_and_deposit_opt_(sender, coin_x_remain, $c, [$p[0]]);
  check_and_deposit_opt_(sender, coin_y_remain, $c, [$p[1]]);
  check_and_deposit_(sender, coin_z, $c, [$p[2]]);
  return;
}


export function buildPayload_two_step_route (
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  second_dex_type: U8,
  second_pool_type: U8,
  second_is_x_to_y: boolean,
  x_in: U64,
  z_min_out: U64,
  $p: TypeTag[], /* <X, Y, Z, E1, E2>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv6::two_step_route",
    typeParamStrings,
    [
      $.payloadArg(first_dex_type),
      $.payloadArg(first_pool_type),
      $.payloadArg(first_is_x_to_y),
      $.payloadArg(second_dex_type),
      $.payloadArg(second_pool_type),
      $.payloadArg(second_is_x_to_y),
      $.payloadArg(x_in),
      $.payloadArg(z_min_out),
    ]
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv6::SignerStore", SignerStore.SignerStoreParser);
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
  get SignerStore() { return SignerStore; }
  async loadSignerStore(
    owner: HexString,
    loadFull=true,
  ) {
    const val = await SignerStore.load(this.repo, this.client, owner, [] as TypeTag[]);
    if (loadFull) {
      await val.loadFullState(this);
    }
    return val;
  }
  initialize(
  ) {
    return buildPayload_initialize();
  }
  one_step_route(
    first_dex_type: U8,
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    x_in: U64,
    y_min_out: U64,
    $p: TypeTag[], /* <X, Y, E>*/
  ) {
    return buildPayload_one_step_route(first_dex_type, first_pool_type, first_is_x_to_y, x_in, y_min_out, $p);
  }
  three_step_route(
    first_dex_type: U8,
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    second_dex_type: U8,
    second_pool_type: U8,
    second_is_x_to_y: boolean,
    third_dex_type: U8,
    third_pool_type: U8,
    third_is_x_to_y: boolean,
    x_in: U64,
    m_min_out: U64,
    $p: TypeTag[], /* <X, Y, Z, M, E1, E2, E3>*/
  ) {
    return buildPayload_three_step_route(first_dex_type, first_pool_type, first_is_x_to_y, second_dex_type, second_pool_type, second_is_x_to_y, third_dex_type, third_pool_type, third_is_x_to_y, x_in, m_min_out, $p);
  }
  two_step_route(
    first_dex_type: U8,
    first_pool_type: U8,
    first_is_x_to_y: boolean,
    second_dex_type: U8,
    second_pool_type: U8,
    second_is_x_to_y: boolean,
    x_in: U64,
    z_min_out: U64,
    $p: TypeTag[], /* <X, Y, Z, E1, E2>*/
  ) {
    return buildPayload_two_step_route(first_dex_type, first_pool_type, first_is_x_to_y, second_dex_type, second_pool_type, second_is_x_to_y, x_in, z_min_out, $p);
  }
}

