import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from "aptos";
import * as Basiq from "../basiq";
import * as Coin_list from "../coin_list";
import * as Econia from "../econia";
import * as Pontem from "../pontem";
import * as Stdlib from "../stdlib";
export const packageName = "HippoAggregator";
export const moduleAddress = new HexString("0xdad1c1d54fcff3bf0d83b4b0067d7cf0ebdca3ff17556f77115ada2db1ff23fe");
export const moduleName = "devnet";

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
export function mock_deploy_basiq_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Basiq.Dex.admin_create_pool_(admin, (($.copy(USDC_AMOUNT)).div($.copy(BTC_AMOUNT))).mul(u64("1000000")), (u64("1")).mul(u64("1000000")), Stdlib.String.utf8_([u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80")], $c), Stdlib.String.utf8_([u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67")], $c), true, $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Basiq.Dex.add_liquidity_entry_(admin, $.copy(BTC_AMOUNT), $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  return;
}


export function buildPayload_mock_deploy_basiq (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0xdad1c1d54fcff3bf0d83b4b0067d7cf0ebdca3ff17556f77115ada2db1ff23fe"),
    "devnet",
    "mock_deploy_basiq",
    typeParamStrings,
    [],
    isJSON,
  );

}

export function mock_deploy_econia_ (
  admin: HexString,
  market_id: U64,
  $c: AptosDataCache,
): void {
  let lot_size, tick_size;
  lot_size = u64("1000");
  tick_size = u64("1000");
  Econia.Market.register_market_pure_coin_(admin, $.copy(lot_size), $.copy(tick_size), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Econia.User.register_market_account_(admin, $.copy(market_id), u64("0"), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Econia.User.deposit_from_coinstore_(admin, $.copy(market_id), u64("0"), $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", [])]);
  Econia.User.deposit_from_coinstore_(admin, $.copy(market_id), u64("0"), $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Econia.Market.place_limit_order_user_(admin, Stdlib.Signer.address_of_(admin, $c), $.copy(market_id), true, ($.copy(BTC_AMOUNT)).div($.copy(lot_size)), (u64("10001")).mul(($.copy(lot_size)).div($.copy(tick_size))), true, false, false, $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  Econia.Market.place_limit_order_user_(admin, Stdlib.Signer.address_of_(admin, $c), $.copy(market_id), false, ($.copy(BTC_AMOUNT)).div($.copy(lot_size)), (u64("10000")).mul(($.copy(lot_size)).div($.copy(tick_size))), true, false, false, $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  return;
}


export function buildPayload_mock_deploy_econia (
  market_id: U64,
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0xdad1c1d54fcff3bf0d83b4b0067d7cf0ebdca3ff17556f77115ada2db1ff23fe"),
    "devnet",
    "mock_deploy_econia",
    typeParamStrings,
    [
      market_id,
    ],
    isJSON,
  );

}

export function mock_deploy_pontem_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(BTC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", [])]);
  Coin_list.Devnet_coins.mint_to_wallet_(admin, $.copy(USDC_AMOUNT), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])]);
  return Pontem.Scripts.register_pool_and_add_liquidity_(admin, u8("2"), $.copy(BTC_AMOUNT), u64("0"), $.copy(USDC_AMOUNT), u64("0"), $c, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", []), new SimpleStructTag(PontemLP, [new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetBTC", []), new StructTag(new HexString("0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46"), "devnet_coins", "DevnetUSDC", [])])]);
}


export function buildPayload_mock_deploy_pontem (
  isJSON = false,
): TxnBuilderTypes.TransactionPayloadEntryFunction
   | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString("0xdad1c1d54fcff3bf0d83b4b0067d7cf0ebdca3ff17556f77115ada2db1ff23fe"),
    "devnet",
    "mock_deploy_pontem",
    typeParamStrings,
    [],
    isJSON,
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xdad1c1d54fcff3bf0d83b4b0067d7cf0ebdca3ff17556f77115ada2db1ff23fe::devnet::PontemLP", PontemLP.PontemLPParser);
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
  payload_mock_deploy_basiq(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mock_deploy_basiq(isJSON);
  }
  async mock_deploy_basiq(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_mock_deploy_basiq(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_mock_deploy_econia(
    market_id: U64,
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mock_deploy_econia(market_id, isJSON);
  }
  async mock_deploy_econia(
    _account: AptosAccount,
    market_id: U64,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_mock_deploy_econia(market_id, _isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_mock_deploy_pontem(
    isJSON = false,
  ): TxnBuilderTypes.TransactionPayloadEntryFunction
        | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mock_deploy_pontem(isJSON);
  }
  async mock_deploy_pontem(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false,
  ) {
    const payload = buildPayload_mock_deploy_pontem(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}

