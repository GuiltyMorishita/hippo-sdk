import { AptosClient } from 'aptos';
import { App, MAINNET_CONFIG as netconf } from '../../src';
import { coinInfoToTag, CoinListClient, NetworkType } from '@manahippo/coin-list';
import { RawStruct } from '../../src/aggregator/types';
import { toRawStruct } from '../../src/aggregator/utils';
import { PancakePoolProvider } from '../../src/aggregator/pancake';

async function main() {
  const client = new AptosClient(netconf.fullNodeUrl);
  const app = new App(client);
  const coinListClient = new CoinListClient(netconf.name as NetworkType);
  const poolProvider = new PancakePoolProvider(app, netconf, coinListClient);
  const allPools = await poolProvider.loadPoolList();
  const promises: Promise<void>[] = [];
  for (const pool of allPools) {
    promises.push(pool.reloadState(app));
  }
  await Promise.all(promises);
  console.log(allPools.length);
  const result: RawStruct[][] = [];
  allPools.forEach((pool) => {
    result.push([toRawStruct(coinInfoToTag(pool.xCoinInfo)), toRawStruct(coinInfoToTag(pool.yCoinInfo))]);
  });
  console.log(result.length);
  console.log(result);
}

main().then().catch(console.error);
