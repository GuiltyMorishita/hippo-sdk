import * as $ from "@manahippo/move-to-ts";
import {
  AptosDataCache,
  AptosParserRepo,
  DummyCache,
  AptosLocalCache,
} from "@manahippo/move-to-ts";
import { U8, U64, U128 } from "@manahippo/move-to-ts";
import { u8, u64, u128 } from "@manahippo/move-to-ts";
import { TypeParamDeclType, FieldDeclType } from "@manahippo/move-to-ts";
import {
  AtomicTypeTag,
  StructTag,
  TypeTag,
  VectorTag,
  SimpleStructTag,
} from "@manahippo/move-to-ts";
import {
  HexString,
  AptosClient,
  AptosAccount,
  TxnBuilderTypes,
  Types,
} from "aptos";
import * as Coin_list from "../coin_list";
import * as Stdlib from "../stdlib";
import * as Cp_swap from "./cp_swap";
import * as Math from "./math";
export const packageName = "hippo-swap";
export const moduleAddress = new HexString(
  "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
);
export const moduleName = "cp_scripts";

export const E_LP_TOKEN_ALREADY_IN_COIN_LIST: U64 = u64("8");
export const E_LP_TOKEN_ALREADY_REGISTERED: U64 = u64("7");
export const E_OUTPUT_LESS_THAN_MIN: U64 = u64("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED: U64 = u64("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED: U64 = u64("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED: U64 = u64("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED: U64 = u64("4");
export const E_TOKEN_X_NOT_REGISTERED: U64 = u64("5");
export const E_TOKEN_Y_NOT_REGISTERED: U64 = u64("6");

export function add_liquidity_script_(
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  Cp_swap.add_liquidity_(sender, $.copy(amount_x), $.copy(amount_y), $c, [
    $p[0],
    $p[1],
  ]);
  return;
}

export function buildPayload_add_liquidity_script(
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[] /* <X, Y>*/,
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "cp_scripts",
    "add_liquidity_script",
    typeParamStrings,
    [amount_x, amount_y],
    isJSON
  );
}

export function create_new_pool_(
  admin: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  let admin_addr, decimals, decimals__1;
  admin_addr = Stdlib.Signer.address_of_(admin, $c);
  if (!Coin_list.Coin_list.is_registry_initialized_($c)) {
    throw $.abortCode($.copy(E_TOKEN_REGISTRY_NOT_INITIALIZED));
  }
  if (!Coin_list.Coin_list.is_coin_registered_($c, [$p[0]])) {
    throw $.abortCode($.copy(E_TOKEN_X_NOT_REGISTERED));
  }
  if (!Coin_list.Coin_list.is_coin_registered_($c, [$p[1]])) {
    throw $.abortCode($.copy(E_TOKEN_Y_NOT_REGISTERED));
  }
  if (
    !!Coin_list.Coin_list.is_coin_registered_($c, [
      new StructTag(
        new HexString(
          "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
        ),
        "cp_swap",
        "LPToken",
        [$p[0], $p[1]]
      ),
    ])
  ) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_REGISTERED));
  }
  if (
    !!Coin_list.Coin_list.is_coin_registered_($c, [
      new StructTag(
        new HexString(
          "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
        ),
        "cp_swap",
        "LPToken",
        [$p[1], $p[0]]
      ),
    ])
  ) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_REGISTERED));
  }
  if (
    !!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [
      new StructTag(
        new HexString(
          "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
        ),
        "cp_swap",
        "LPToken",
        [$p[0], $p[1]]
      ),
    ])
  ) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_IN_COIN_LIST));
  }
  if (
    !!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [
      new StructTag(
        new HexString(
          "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
        ),
        "cp_swap",
        "LPToken",
        [$p[1], $p[0]]
      ),
    ])
  ) {
    throw $.abortCode($.copy(E_LP_TOKEN_ALREADY_IN_COIN_LIST));
  }
  decimals = Math.max_(
    u128(Stdlib.Coin.decimals_($c, [$p[0]])),
    u128(Stdlib.Coin.decimals_($c, [$p[1]])),
    $c
  );
  decimals__1 = u8($.copy(decimals));
  Cp_swap.create_token_pair_(
    admin,
    $.copy(fee_to),
    fee_on,
    $.copy(lp_name),
    $.copy(lp_symbol),
    $.copy(decimals__1),
    $c,
    [$p[0], $p[1]]
  );
  Coin_list.Coin_list.add_to_registry_by_signer_(
    admin,
    Stdlib.String.utf8_($.copy(lp_name), $c),
    Stdlib.String.utf8_($.copy(lp_symbol), $c),
    Stdlib.String.utf8_(Stdlib.Vector.empty_($c, [AtomicTypeTag.U8]), $c),
    Stdlib.String.utf8_($.copy(lp_logo_url), $c),
    Stdlib.String.utf8_($.copy(lp_project_url), $c),
    false,
    $c,
    [
      new StructTag(
        new HexString(
          "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
        ),
        "cp_swap",
        "LPToken",
        [$p[0], $p[1]]
      ),
    ]
  );
  if (!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [$p[0]])) {
    Coin_list.Coin_list.add_to_list_(admin, $c, [$p[0]]);
  } else {
  }
  if (!Coin_list.Coin_list.is_coin_in_list_($.copy(admin_addr), $c, [$p[1]])) {
    Coin_list.Coin_list.add_to_list_(admin, $c, [$p[1]]);
  } else {
  }
  Coin_list.Coin_list.add_to_list_(admin, $c, [
    new StructTag(
      new HexString(
        "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
      ),
      "cp_swap",
      "LPToken",
      [$p[0], $p[1]]
    ),
  ]);
  return;
}

export function create_new_pool_script_(
  sender: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  create_new_pool_(
    sender,
    $.copy(fee_to),
    fee_on,
    $.copy(lp_name),
    $.copy(lp_symbol),
    $.copy(lp_logo_url),
    $.copy(lp_project_url),
    $c,
    [$p[0], $p[1]]
  );
  return;
}

export function buildPayload_create_new_pool_script(
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $p: TypeTag[] /* <X, Y>*/,
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "cp_scripts",
    "create_new_pool_script",
    typeParamStrings,
    [fee_to, fee_on, lp_name, lp_symbol, lp_logo_url, lp_project_url],
    isJSON
  );
}

export function mock_create_pair_and_add_liquidity_(
  admin: HexString,
  symbol: U8[],
  left_amt: U64,
  right_amt: U64,
  lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  let some_lp, some_x, some_y, unused_x, unused_y;
  create_new_pool_(
    admin,
    Stdlib.Signer.address_of_(admin, $c),
    false,
    $.copy(symbol),
    $.copy(symbol),
    [],
    [],
    $c,
    [$p[0], $p[1]]
  );
  some_x = Coin_list.Devnet_coins.mint_($.copy(left_amt), $c, [$p[0]]);
  some_y = Coin_list.Devnet_coins.mint_($.copy(right_amt), $c, [$p[1]]);
  [unused_x, unused_y, some_lp] = Cp_swap.add_liquidity_direct_(
    some_x,
    some_y,
    $c,
    [$p[0], $p[1]]
  );
  if (!Stdlib.Coin.value_(unused_x, $c, [$p[0]]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  if (!Stdlib.Coin.value_(unused_y, $c, [$p[1]]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  if (
    !Stdlib.Coin.value_(some_lp, $c, [
      new StructTag(
        new HexString(
          "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
        ),
        "cp_swap",
        "LPToken",
        [$p[0], $p[1]]
      ),
    ]).eq($.copy(lp_amt))
  ) {
    throw $.abortCode(u64("5"));
  }
  Coin_list.Devnet_coins.burn_(unused_x, $c, [$p[0]]);
  Coin_list.Devnet_coins.burn_(unused_y, $c, [$p[1]]);
  Stdlib.Coin.deposit_(Stdlib.Signer.address_of_(admin, $c), some_lp, $c, [
    new StructTag(
      new HexString(
        "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
      ),
      "cp_swap",
      "LPToken",
      [$p[0], $p[1]]
    ),
  ]);
  return;
}

export function mock_deploy_script_(
  admin: HexString,
  $c: AptosDataCache
): void {
  let btc_amt;
  btc_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity_(
    admin,
    [
      u8("66"),
      u8("84"),
      u8("67"),
      u8("45"),
      u8("85"),
      u8("83"),
      u8("68"),
      u8("67"),
      u8("45"),
      u8("76"),
      u8("80"),
    ],
    $.copy(btc_amt),
    $.copy(btc_amt).mul(u64("10000")),
    $.copy(btc_amt).mul(u64("100")).sub(u64("1000")),
    $c,
    [
      new StructTag(
        new HexString(
          "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"
        ),
        "devnet_coins",
        "DevnetBTC",
        []
      ),
      new StructTag(
        new HexString(
          "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"
        ),
        "devnet_coins",
        "DevnetUSDC",
        []
      ),
    ]
  );
  mock_create_pair_and_add_liquidity_(
    admin,
    [
      u8("66"),
      u8("84"),
      u8("67"),
      u8("45"),
      u8("85"),
      u8("83"),
      u8("68"),
      u8("84"),
      u8("45"),
      u8("76"),
      u8("80"),
    ],
    $.copy(btc_amt),
    $.copy(btc_amt).mul(u64("10000")),
    $.copy(btc_amt).mul(u64("100")).sub(u64("1000")),
    $c,
    [
      new StructTag(
        new HexString(
          "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"
        ),
        "devnet_coins",
        "DevnetBTC",
        []
      ),
      new StructTag(
        new HexString(
          "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68"
        ),
        "devnet_coins",
        "DevnetUSDT",
        []
      ),
    ]
  );
  return;
}

export function buildPayload_mock_deploy_script(
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "cp_scripts",
    "mock_deploy_script",
    typeParamStrings,
    [],
    isJSON
  );
}

export function remove_liquidity_script_(
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  Cp_swap.remove_liquidity_(
    sender,
    $.copy(liquidity),
    $.copy(amount_x_min),
    $.copy(amount_y_min),
    $c,
    [$p[0], $p[1]]
  );
  return;
}

export function buildPayload_remove_liquidity_script(
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $p: TypeTag[] /* <X, Y>*/,
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "cp_scripts",
    "remove_liquidity_script",
    typeParamStrings,
    [liquidity, amount_x_min, amount_y_min],
    isJSON
  );
}

export function swap_script_(
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[] /* <X, Y>*/
): void {
  let temp$1, temp$2, x_out, y_out;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  } else {
    temp$1 = false;
  }
  if (!!temp$1) {
    throw $.abortCode($.copy(E_SWAP_ONLY_ONE_IN_ALLOWED));
  }
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$2 = $.copy(y_min_out).gt(u64("0"));
  } else {
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode($.copy(E_SWAP_ONLY_ONE_OUT_ALLOWED));
  }
  if ($.copy(x_in).gt(u64("0"))) {
    y_out = Cp_swap.swap_x_to_exact_y_(
      sender,
      $.copy(x_in),
      Stdlib.Signer.address_of_(sender, $c),
      $c,
      [$p[0], $p[1]]
    );
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MIN));
    }
  } else {
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = Cp_swap.swap_y_to_exact_x_(
        sender,
        $.copy(y_in),
        Stdlib.Signer.address_of_(sender, $c),
        $c,
        [$p[0], $p[1]]
      );
      if (!$.copy(x_out).ge($.copy(x_min_out))) {
        throw $.abortCode($.copy(E_OUTPUT_LESS_THAN_MIN));
      }
    } else {
      if (!false) {
        throw $.abortCode($.copy(E_SWAP_NONZERO_INPUT_REQUIRED));
      }
    }
  }
  return;
}

export function buildPayload_swap_script(
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $p: TypeTag[] /* <X, Y>*/,
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  const typeParamStrings = $p.map((t) => $.getTypeTagFullname(t));
  return $.buildPayload(
    new HexString(
      "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"
    ),
    "cp_scripts",
    "swap_script",
    typeParamStrings,
    [x_in, y_in, x_min_out, y_min_out],
    isJSON
  );
}

export function loadParsers(repo: AptosParserRepo) {}
export class App {
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache
  ) {}
  get moduleAddress() {
    {
      return moduleAddress;
    }
  }
  get moduleName() {
    {
      return moduleName;
    }
  }
  payload_add_liquidity_script(
    amount_x: U64,
    amount_y: U64,
    $p: TypeTag[] /* <X, Y>*/,
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_add_liquidity_script(amount_x, amount_y, $p, isJSON);
  }
  async add_liquidity_script(
    _account: AptosAccount,
    amount_x: U64,
    amount_y: U64,
    $p: TypeTag[] /* <X, Y>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_add_liquidity_script(
      amount_x,
      amount_y,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_create_new_pool_script(
    fee_to: HexString,
    fee_on: boolean,
    lp_name: U8[],
    lp_symbol: U8[],
    lp_logo_url: U8[],
    lp_project_url: U8[],
    $p: TypeTag[] /* <X, Y>*/,
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_create_new_pool_script(
      fee_to,
      fee_on,
      lp_name,
      lp_symbol,
      lp_logo_url,
      lp_project_url,
      $p,
      isJSON
    );
  }
  async create_new_pool_script(
    _account: AptosAccount,
    fee_to: HexString,
    fee_on: boolean,
    lp_name: U8[],
    lp_symbol: U8[],
    lp_logo_url: U8[],
    lp_project_url: U8[],
    $p: TypeTag[] /* <X, Y>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_create_new_pool_script(
      fee_to,
      fee_on,
      lp_name,
      lp_symbol,
      lp_logo_url,
      lp_project_url,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_mock_deploy_script(
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_mock_deploy_script(isJSON);
  }
  async mock_deploy_script(
    _account: AptosAccount,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_mock_deploy_script(_isJSON);
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_remove_liquidity_script(
    liquidity: U64,
    amount_x_min: U64,
    amount_y_min: U64,
    $p: TypeTag[] /* <X, Y>*/,
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_remove_liquidity_script(
      liquidity,
      amount_x_min,
      amount_y_min,
      $p,
      isJSON
    );
  }
  async remove_liquidity_script(
    _account: AptosAccount,
    liquidity: U64,
    amount_x_min: U64,
    amount_y_min: U64,
    $p: TypeTag[] /* <X, Y>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_remove_liquidity_script(
      liquidity,
      amount_x_min,
      amount_y_min,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
  payload_swap_script(
    x_in: U64,
    y_in: U64,
    x_min_out: U64,
    y_min_out: U64,
    $p: TypeTag[] /* <X, Y>*/,
    isJSON = false
  ):
    | TxnBuilderTypes.TransactionPayloadEntryFunction
    | Types.TransactionPayload_EntryFunctionPayload {
    return buildPayload_swap_script(
      x_in,
      y_in,
      x_min_out,
      y_min_out,
      $p,
      isJSON
    );
  }
  async swap_script(
    _account: AptosAccount,
    x_in: U64,
    y_in: U64,
    x_min_out: U64,
    y_min_out: U64,
    $p: TypeTag[] /* <X, Y>*/,
    _maxGas = 1000,
    _isJSON = false
  ) {
    const payload = buildPayload_swap_script(
      x_in,
      y_in,
      x_min_out,
      y_min_out,
      $p,
      _isJSON
    );
    return $.sendPayloadTx(this.client, _account, payload, _maxGas);
  }
}
