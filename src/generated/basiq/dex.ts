import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Stdlib from "../stdlib";
export const packageName = "basiq";
export const moduleAddress = new HexString("0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab");
export const moduleName = "dex";



export class V1LP 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  __app: $.AppType | null = null;
  static structName: string = "V1LP";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinX", isPhantom: true },
    { name: "CoinY", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static V1LPParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : V1LP {
    const proto = $.parseStructProto(data, typeTag, repo, V1LP);
    return new V1LP(proto, typeTag);
  }

  static makeTag($p: TypeTag[]): StructTag {
    return new StructTag(moduleAddress, moduleName, "V1LP", $p);
  }
  async loadFullState(app: $.AppType) {
    this.__app = app;
  }

}
export function add_liquidity_entry_ (
  _sender: HexString,
  _amount_x: U64,
  _amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinX, CoinY>*/
): void {
  return;
}


export function buildPayload_add_liquidity_entry (
  _amount_x: U64,
  _amount_y: U64,
  $p: TypeTag[], /* <CoinX, CoinY>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab"),
    "dex",
    "add_liquidity_entry",
    typeParamStrings,
    [
      _amount_x,
      _amount_y,
    ],
    isJSON,
  );

}
export function admin_create_pool_ (
  _admin: HexString,
  _x_price: U64,
  _y_price: U64,
  _lp_name: Stdlib.String.String,
  _lp_symbol: Stdlib.String.String,
  _is_not_pegged: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinX, CoinY>*/
): void {
  return;
}


export function buildPayload_admin_create_pool (
  _x_price: U64,
  _y_price: U64,
  _lp_name: Stdlib.String.String,
  _lp_symbol: Stdlib.String.String,
  _is_not_pegged: boolean,
  $p: TypeTag[], /* <CoinX, CoinY>*/
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString("0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab"),
    "dex",
    "admin_create_pool",
    typeParamStrings,
    [
      _x_price,
      _y_price,
      _lp_name,
      _lp_symbol,
      _is_not_pegged,
    ],
    isJSON,
  );

}
export function swap_ (
  coin_from: Stdlib.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinFrom, CoinTo>*/
): Stdlib.Coin.Coin {
  Stdlib.Coin.destroy_zero_(coin_from, $c, [$p[0]]);
  return Stdlib.Coin.zero_($c, [$p[1]]);
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab::dex::V1LP", V1LP.V1LPParser);
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
  get V1LP() { return V1LP; }
  payload_add_liquidity_entry(
    _amount_x: U64,
    _amount_y: U64,
    $p: TypeTag[], /* <CoinX, CoinY>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_liquidity_entry(_amount_x, _amount_y, $p, isJSON);
  }
  async add_liquidity_entry(
    _account: AptosAccount,
    _amount_x: U64,
    _amount_y: U64,
    $p: TypeTag[], /* <CoinX, CoinY>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_add_liquidity_entry(_amount_x, _amount_y, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_admin_create_pool(
    _x_price: U64,
    _y_price: U64,
    _lp_name: Stdlib.String.String,
    _lp_symbol: Stdlib.String.String,
    _is_not_pegged: boolean,
    $p: TypeTag[], /* <CoinX, CoinY>*/
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_admin_create_pool(_x_price, _y_price, _lp_name, _lp_symbol, _is_not_pegged, $p, isJSON);
  }
  async admin_create_pool(
    _account: AptosAccount,
    _x_price: U64,
    _y_price: U64,
    _lp_name: Stdlib.String.String,
    _lp_symbol: Stdlib.String.String,
    _is_not_pegged: boolean,
    $p: TypeTag[], /* <CoinX, CoinY>*/
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_admin_create_pool(_x_price, _y_price, _lp_name, _lp_symbol, _is_not_pegged, $p, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

