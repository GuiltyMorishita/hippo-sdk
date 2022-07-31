import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Econia$_ from "../Econia";
import * as aptos_framework$_ from "../aptos_framework";
import * as hippo_swap$_ from "../hippo_swap";
import * as std$_ from "../std";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "aggregatorv3";

export const DEX_ECONIA : U8 = u8("2");
export const DEX_HIPPO : U8 = u8("1");
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
  static structName: string = "SignerStore";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "signer_cap", typeTag: new StructTag(new HexString("0x1"), "account", "SignerCapability", []) }];

  signer_cap: aptos_framework$_.account$_.SignerCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.signer_cap = proto['signer_cap'] as aptos_framework$_.account$_.SignerCapability;
  }

  static SignerStoreParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SignerStore {
    const proto = $.parseStructProto(data, typeTag, repo, SignerStore);
    return new SignerStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, SignerStore, typeParams);
    return result as unknown as SignerStore;
  }
}
export function get_intermediate_output$ (
  dex_type: U8,
  pool_type: U8,
  is_x_to_y: boolean,
  x_in: aptos_framework$_.coin$_.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): aptos_framework$_.coin$_.Coin {
  let temp$11, temp$12, temp$13, temp$14, temp$16, temp$17, temp$18, temp$3, temp$8, hippo_signer, hippo_signer_addr, store, x_out, x_out__2, x_size, y_amt, y_init_balance, y_out, y_out__1, y_out__10, y_out__15, y_out__4, y_out__6, y_out__9, zero, zero__5, zero2, zero2__7;
  if ($.copy(dex_type).eq(DEX_HIPPO)) {
    if ($.copy(pool_type).eq(HIPPO_CONSTANT_PRODUCT)) {
      if (is_x_to_y) {
        [x_out, y_out] = hippo_swap$_.cp_swap$_.swap_x_to_exact_y_direct$(x_in, $c, [$p[0], $p[1]] as TypeTag[]);
        aptos_framework$_.coin$_.destroy_zero$(x_out, $c, [$p[0]] as TypeTag[]);
        temp$3 = y_out;
      }
      else{
        [y_out__1, x_out__2] = hippo_swap$_.cp_swap$_.swap_y_to_exact_x_direct$(x_in, $c, [$p[1], $p[0]] as TypeTag[]);
        aptos_framework$_.coin$_.destroy_zero$(x_out__2, $c, [$p[0]] as TypeTag[]);
        temp$3 = y_out__1;
      }
      temp$14 = temp$3;
    }
    else{
      if ($.copy(pool_type).eq(HIPPO_STABLE_CURVE)) {
        if (is_x_to_y) {
          [zero, zero2, y_out__4] = hippo_swap$_.stable_curve_swap$_.swap_x_to_exact_y_direct$(x_in, $c, [$p[0], $p[1]] as TypeTag[]);
          aptos_framework$_.coin$_.destroy_zero$(zero, $c, [$p[0]] as TypeTag[]);
          aptos_framework$_.coin$_.destroy_zero$(zero2, $c, [$p[0]] as TypeTag[]);
          temp$8 = y_out__4;
        }
        else{
          [zero__5, y_out__6, zero2__7] = hippo_swap$_.stable_curve_swap$_.swap_y_to_exact_x_direct$(x_in, $c, [$p[1], $p[0]] as TypeTag[]);
          aptos_framework$_.coin$_.destroy_zero$(zero__5, $c, [$p[0]] as TypeTag[]);
          aptos_framework$_.coin$_.destroy_zero$(zero2__7, $c, [$p[0]] as TypeTag[]);
          temp$8 = y_out__6;
        }
        temp$13 = temp$8;
      }
      else{
        if ($.copy(pool_type).eq(HIPPO_PIECEWISE)) {
          if (is_x_to_y) {
            y_out__9 = hippo_swap$_.piece_swap$_.swap_x_to_y_direct$(x_in, $c, [$p[0], $p[1]] as TypeTag[]);
            temp$11 = y_out__9;
          }
          else{
            y_out__10 = hippo_swap$_.piece_swap$_.swap_y_to_x_direct$(x_in, $c, [$p[1], $p[0]] as TypeTag[]);
            temp$11 = y_out__10;
          }
          temp$12 = temp$11;
        }
        else{
          throw $.abortCode(E_UNKNOWN_POOL_TYPE);
        }
        temp$13 = temp$12;
      }
      temp$14 = temp$13;
    }
    temp$18 = temp$14;
  }
  else{
    if ($.copy(dex_type).eq(DEX_ECONIA)) {
      if ($.copy(pool_type).eq(ECONIA_V1)) {
        store = $c.borrow_global<SignerStore>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "aggregatorv3", "SignerStore", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
        hippo_signer = aptos_framework$_.account$_.create_signer_with_capability$(store.signer_cap, $c);
        hippo_signer_addr = std$_.signer$_.address_of$(hippo_signer, $c);
        if (!aptos_framework$_.coin$_.is_account_registered$($.copy(hippo_signer_addr), $c, [$p[0]] as TypeTag[])) {
          aptos_framework$_.coin$_.register_internal$(hippo_signer, $c, [$p[0]] as TypeTag[]);
        }
        else{
        }
        if (!aptos_framework$_.coin$_.is_account_registered$($.copy(hippo_signer_addr), $c, [$p[1]] as TypeTag[])) {
          aptos_framework$_.coin$_.register_internal$(hippo_signer, $c, [$p[1]] as TypeTag[]);
        }
        else{
        }
        y_init_balance = aptos_framework$_.coin$_.balance$($.copy(hippo_signer_addr), $c, [$p[1]] as TypeTag[]);
        x_size = aptos_framework$_.coin$_.value$(x_in, $c, [$p[0]] as TypeTag[]);
        aptos_framework$_.coin$_.deposit$($.copy(hippo_signer_addr), x_in, $c, [$p[0]] as TypeTag[]);
        if (is_x_to_y) {
          Econia$_.Match$_.swap_sell$(hippo_signer, new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), $.copy(x_size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
        }
        else{
          Econia$_.Match$_.swap_buy$(hippo_signer, new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), MAX_SIZE, $.copy(x_size), $c, [$p[1], $p[0], $p[2]] as TypeTag[]);
        }
        y_amt = aptos_framework$_.coin$_.balance$($.copy(hippo_signer_addr), $c, [$p[1]] as TypeTag[]);
        y_out__15 = aptos_framework$_.coin$_.withdraw$(hippo_signer, $.copy(y_amt).sub($.copy(y_init_balance)), $c, [$p[1]] as TypeTag[]);
        temp$16 = y_out__15;
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      temp$17 = temp$16;
    }
    else{
      throw $.abortCode(E_UNKNOWN_DEX);
    }
    temp$18 = temp$17;
  }
  return temp$18;
}

export function initialize$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, signer_cap;
  admin_addr = std$_.signer$_.address_of$(admin, $c);
  if (!($.copy(admin_addr).hex() === new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a").hex())) {
    throw $.abortCode(E_NOT_ADMIN);
  }
  [, signer_cap] = aptos_framework$_.account$_.create_resource_account$(admin, [u8("115"), u8("105"), u8("103"), u8("110"), u8("101"), u8("114"), u8("118"), u8("51")], $c);
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "aggregatorv3", "SignerStore", []), admin, new SignerStore({ signer_cap: signer_cap }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "aggregatorv3", "SignerStore", [])));
  return;
}


export function buildPayload_initialize (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv3::initialize",
    typeParamStrings,
    []
  );

}

export function one_step_route$ (
  sender: HexString,
  first_dex_type: U8,
  first_pool_type: U8,
  first_is_x_to_y: boolean,
  x_in: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y, E>*/
): void {
  let coin_in, coin_out;
  coin_in = aptos_framework$_.coin$_.withdraw$(sender, $.copy(x_in), $c, [$p[0]] as TypeTag[]);
  coin_out = get_intermediate_output$($.copy(first_dex_type), $.copy(first_pool_type), first_is_x_to_y, coin_in, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  if (!aptos_framework$_.coin$_.value$(coin_out, $c, [$p[1]] as TypeTag[]).ge($.copy(y_min_out))) {
    throw $.abortCode(E_OUTPUT_LESS_THAN_MINIMUM);
  }
  aptos_framework$_.coin$_.deposit$(std$_.signer$_.address_of$(sender, $c), coin_out, $c, [$p[1]] as TypeTag[]);
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
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv3::one_step_route",
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

export function three_step_route$ (
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
  let coin_m, coin_x, coin_y, coin_z;
  coin_x = aptos_framework$_.coin$_.withdraw$(sender, $.copy(x_in), $c, [$p[0]] as TypeTag[]);
  coin_y = get_intermediate_output$($.copy(first_dex_type), $.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1], $p[4]] as TypeTag[]);
  coin_z = get_intermediate_output$($.copy(second_dex_type), $.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2], $p[5]] as TypeTag[]);
  coin_m = get_intermediate_output$($.copy(third_dex_type), $.copy(third_pool_type), third_is_x_to_y, coin_z, $c, [$p[2], $p[3], $p[6]] as TypeTag[]);
  if (!aptos_framework$_.coin$_.value$(coin_m, $c, [$p[3]] as TypeTag[]).ge($.copy(m_min_out))) {
    throw $.abortCode(E_OUTPUT_LESS_THAN_MINIMUM);
  }
  aptos_framework$_.coin$_.deposit$(std$_.signer$_.address_of$(sender, $c), coin_m, $c, [$p[3]] as TypeTag[]);
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
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv3::three_step_route",
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

export function two_step_route$ (
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
  let coin_x, coin_y, coin_z;
  coin_x = aptos_framework$_.coin$_.withdraw$(sender, $.copy(x_in), $c, [$p[0]] as TypeTag[]);
  coin_y = get_intermediate_output$($.copy(first_dex_type), $.copy(first_pool_type), first_is_x_to_y, coin_x, $c, [$p[0], $p[1], $p[3]] as TypeTag[]);
  coin_z = get_intermediate_output$($.copy(second_dex_type), $.copy(second_pool_type), second_is_x_to_y, coin_y, $c, [$p[1], $p[2], $p[4]] as TypeTag[]);
  if (!aptos_framework$_.coin$_.value$(coin_z, $c, [$p[2]] as TypeTag[]).ge($.copy(z_min_out))) {
    throw $.abortCode(E_OUTPUT_LESS_THAN_MINIMUM);
  }
  aptos_framework$_.coin$_.deposit$(std$_.signer$_.address_of$(sender, $c), coin_z, $c, [$p[2]] as TypeTag[]);
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
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv3::two_step_route",
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
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::aggregatorv3::SignerStore", SignerStore.SignerStoreParser);
}

