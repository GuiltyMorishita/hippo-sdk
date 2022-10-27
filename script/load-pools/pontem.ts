import { StructTag } from '@manahippo/move-to-ts';
import { AptosClient, HexString } from 'aptos';
import { Uncorrelated } from '../../src/generated/liquidswap/curves';
import { App } from '../../src/generated';
import { MAINNET_CONFIG } from '../../src/config';
import { LiquidityPool } from '../../src/generated/liquidswap/liquidity_pool';
import { CoinInfo } from '../../src/generated/stdlib/coin';
import { RawStruct } from '../../src/aggregator/types';
import { POOLS } from '../../src/aggregator/pontem/pools';
import { toRawStruct } from '../../src/aggregator/utils';

const SUPPORTED_COINS: [StructTag, number][] = [
  // APT
  [new StructTag(new HexString('0x1'), 'aptos_coin', 'AptosCoin', []), 10],
  // BTC
  [
    new StructTag(new HexString('0xae478ff7d83ed072dbc5e264250e67ef58f57c99d89b447efd8a0a2e8b2be76e'), 'coin', 'T', []),
    20000
  ],
  // APToge
  [
    new StructTag(
      new HexString('0x5c738a5dfa343bee927c39ebe85b0ceb95fdb5ee5b323c95559614f5a77c47cf'),
      'Aptoge',
      'Aptoge',
      []
    ),
    10
  ],
  // MOJO
  [
    new StructTag(
      new HexString('0x881ac202b1f1e6ad4efcff7a1d0579411533f2502417a19211cfc49751ddb5f4'),
      'coin',
      'MOJO',
      []
    ),
    0.02
  ],
  // SOL
  [
    new StructTag(new HexString('0xdd89c0e695df0692205912fb69fc290418bed0dbe6e4573d744a6d5e6bab6c13'), 'coin', 'T', []),
    30
  ],
  // USDA
  [
    new StructTag(
      new HexString('0x1000000fa32d122c18a6a31c009ce5e71674f22d06a581bb0a15575e6addadcc'),
      'usda',
      'USDA',
      []
    ),
    1
  ],
  // USDC
  [
    new StructTag(
      new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
      'asset',
      'USDC',
      []
    ),
    1
  ],
  // USDT
  [
    new StructTag(
      new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
      'asset',
      'USDT',
      []
    ),
    1
  ],
  // WETH
  [
    new StructTag(
      new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
      'asset',
      'WETH',
      []
    ),
    1300
  ],
  // xBTC
  [
    new StructTag(
      new HexString('0x7c2aaaaf3f019bbf7f02beed21fc4ec352cc38272f93cb11e61ec7c89bfe5f4b'),
      'xbtc',
      'XBTC',
      []
    ),
    20000
  ],
  // StakedAptos
  [
    new StructTag(
      new HexString('0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5'),
      'staked_coin',
      'StakedAptos',
      []
    ),
    10
  ],
  // tAPT
  [
    new StructTag(
      new HexString('0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114'),
      'staked_aptos_coin',
      'StakedAptosCoin',
      []
    ),
    10
  ],
  // whUSDC
  [
    new StructTag(new HexString('0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea'), 'coin', 'T', []),
    1
  ],
  // whUSDT
  [
    new StructTag(new HexString('0xa2eda21a58856fda86451436513b867c97eecb4ba099da5775520e0f7492e852'), 'coin', 'T', []),
    1
  ],
  // whETH
  [
    new StructTag(new HexString('0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb'), 'coin', 'T', []),
    1300
  ]
];
type PoolValue = {
  pool: LiquidityPool;
  value: number;
};
async function main() {
  console.log(POOLS.length);
  const client = new AptosClient(MAINNET_CONFIG.fullNodeUrl);
  const app = new App(client);
  const curvesTag = Uncorrelated.getTag();
  let poolValues: PoolValue[] = [];
  let coinInfos = new Map<string, CoinInfo>();
  for (const supportedCoin of SUPPORTED_COINS) {
    const coinInfo = await app.stdlib.coin.loadCoinInfo(supportedCoin[0].address, [supportedCoin[0]]);
    coinInfos.set(supportedCoin[0].getFullname(), coinInfo);
  }
  for (let i = 0; i < SUPPORTED_COINS.length - 1; i++) {
    for (let j = i + 1; j < SUPPORTED_COINS.length; j++) {
      const xTag = SUPPORTED_COINS[i][0];
      const yTag = SUPPORTED_COINS[j][0];
      const xPrice = SUPPORTED_COINS[i][1];
      const yPrice = SUPPORTED_COINS[j][1];

      let res = await getPool(app, xTag, yTag, curvesTag);
      if (res == null) {
        continue;
      }
      const pool = res.pool;
      const exchange = res.exchange;
      let typeParams = (pool.typeTag as StructTag).typeParams as StructTag[];
      console.log('#######');
      console.log(typeParams[0].getFullname());
      console.log(typeParams[1].getFullname());
      // console.log(pool.coin_x_reserve.value.toJsNumber());
      // console.log(pool.coin_y_reserve.value.toJsNumber());
      // console.log(xPrice);
      // console.log(yPrice);
      let value = exchange
        ? (pool.coin_x_reserve.value.toJsNumber() /
            Math.pow(10, coinInfos.get(yTag.getFullname())!.decimals.toJsNumber())) *
            yPrice +
          (pool.coin_y_reserve.value.toJsNumber() /
            Math.pow(10, coinInfos.get(xTag.getFullname())!.decimals.toJsNumber())) *
            xPrice
        : (pool.coin_x_reserve.value.toJsNumber() /
            Math.pow(10, coinInfos.get(xTag.getFullname())!.decimals.toJsNumber())) *
            xPrice +
          (pool.coin_y_reserve.value.toJsNumber() /
            Math.pow(10, coinInfos.get(yTag.getFullname())!.decimals.toJsNumber())) *
            yPrice;
      console.log(value);
      poolValues.push({
        pool,
        value
      });
    }
  }
  poolValues = poolValues.sort((a, b) => {
    return b.value - a.value;
  });
  const pools: RawStruct[][] = [];
  for (let i = 0; i < poolValues.length; i++) {
    const poolValue = poolValues[i];
    let typeParams = (poolValue.pool.typeTag as StructTag).typeParams as StructTag[];
    console.log(i, ' = ', poolValue.value);
    pools.push([toRawStruct(typeParams[0]), toRawStruct(typeParams[1])]);
  }
  poolValues.forEach((poolValue) => {});
  console.log(pools.slice(0, 20));
}

async function getPool(app: App, xTag: StructTag, yTag: StructTag, curvesTag: StructTag) {
  try {
    return {
      pool: await app.liquidswap.liquidity_pool.loadLiquidityPool(MAINNET_CONFIG.pontemAddress, [
        xTag,
        yTag,
        curvesTag
      ]),
      exchange: false
    };
  } catch (e) {
    try {
      return {
        pool: await app.liquidswap.liquidity_pool.loadLiquidityPool(MAINNET_CONFIG.pontemAddress, [
          yTag,
          xTag,
          curvesTag
        ]),
        exchange: true
      };
    } catch (e) {
      return null;
    }
  }
}
main().then().catch(console.error);
