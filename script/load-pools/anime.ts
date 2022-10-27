import { parseMoveStructTag, StructTag } from '@manahippo/move-to-ts';
import { AptosClient } from 'aptos';
import { App } from '../../src/generated';
import { MAINNET_CONFIG } from '../../src/config';
import { LiquidityPool } from '../../src/generated/SwapDeployer/AnimeSwapPoolV1';
import { CoinInfo } from '../../src/generated/stdlib/coin';
import { RawStruct } from '../../src/aggregator/types';
import { toRawStruct } from '../../src/aggregator/utils';

// import { POOLS } from './pools';

const PRICES: [string, number][] = [
  ['APT', 10],
  ['USD', 1],
  ['BTC', 20000],
  ['ETH', 1300],
  ['MOJO', 0.02],
  ['SHIT', 0.0008]
];
async function main() {
  const client = new AptosClient(MAINNET_CONFIG.fullNodeUrl);
  const app = new App(client);
  let poolList: { pool: LiquidityPool; value: number }[] = [];
  const ownerAddr = MAINNET_CONFIG.animeAddress;
  const resources = await app.client.getAccountResources(ownerAddr);
  let prices = new Map<string, number>();
  let coinInfos = new Map<string, CoinInfo>();
  for (const resource of resources) {
    if (resource.type.indexOf('AnimeSwapPoolV1::LiquidityPool') >= 0) {
      const tag = parseMoveStructTag(resource.type);
      const pool = await app.SwapDeployer.AnimeSwapPoolV1.LiquidityPool.load(
        app.parserRepo,
        app.client,
        ownerAddr,
        tag.typeParams
      );
      let typeParams = (pool.typeTag as StructTag).typeParams as StructTag[];
      await loadPrice(prices, coinInfos, app, typeParams[0]);
      await loadPrice(prices, coinInfos, app, typeParams[1]);
      if (prices.has(typeParams[0].getFullname()) && prices.has(typeParams[1].getFullname())) {
        let value =
          (pool.coin_x_reserve.value.toJsNumber() /
            Math.pow(10, coinInfos.get(typeParams[0].getFullname())!.decimals.toJsNumber())) *
            prices.get(typeParams[0].getFullname())! +
          (pool.coin_y_reserve.value.toJsNumber() /
            Math.pow(10, coinInfos.get(typeParams[1].getFullname())!.decimals.toJsNumber())) *
            prices.get(typeParams[1].getFullname())!;
        poolList.push({ pool, value });
      }
    }
  }
  poolList.sort((a, b) => {
    return b.value - a.value;
  });
  console.log(prices);
  poolList.forEach((poolValue) => {
    const pool = poolValue.pool;
    let typeParams = (pool.typeTag as StructTag).typeParams as StructTag[];
    console.log(coinInfos.get(typeParams[0].getFullname())!.symbol.str());
    console.log(coinInfos.get(typeParams[1].getFullname())!.symbol.str());
    console.log(poolValue.value);
  });
  poolList = poolList.slice(0, 20);
  let pools: RawStruct[][] = [];
  poolList.forEach((poolValue) => {
    let typeParams = (poolValue.pool.typeTag as StructTag).typeParams as StructTag[];
    pools.push([toRawStruct(typeParams[0]), toRawStruct(typeParams[1])]);
  });
  console.log(pools);
}

async function loadPrice(
  prices: Map<string, number>,
  coinInfos: Map<string, CoinInfo>,
  app: App,
  typeParam: StructTag
) {
  if (prices.get(typeParam.getFullname()) == undefined) {
    const coinInfo = await app.stdlib.coin.loadCoinInfo(typeParam.address, [typeParam]);
    for (const price of PRICES) {
      if (coinInfo.symbol.str().includes(price[0])) {
        prices.set(typeParam.getFullname(), price[1]);
        coinInfos.set(typeParam.getFullname(), coinInfo);
      }
    }
  }
}

main().then().catch(console.error);
