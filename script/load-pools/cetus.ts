import { AptosClient } from 'aptos';
import { App, MAINNET_CONFIG as netconf } from '../../src';
import { CoinListClient, NetworkType } from '@manahippo/coin-list';
import { RawStruct } from '../../src/aggregator/types';
import { toRawStruct } from '../../src/aggregator/utils';
import { CetusPoolProvider } from '../../src/aggregator/cetus';

async function main() {
  const client = new AptosClient(netconf.fullNodeUrl);
  const app = new App(client);
  const coinListClient = new CoinListClient(netconf.name as NetworkType);
  const poolProvider = new CetusPoolProvider(app, netconf, coinListClient);
  const allPools = await poolProvider.loadPoolList();
  const promises: Promise<void>[] = [];
  for (const pool of allPools) {
    promises.push(pool.reloadState(app));
  }
  await Promise.all(promises);

  const result: RawStruct[][] = [];
  allPools.forEach((pool) => {
    const poolRawStruct = [toRawStruct(pool.xTag), toRawStruct(pool.yTag)];
    console.log(poolRawStruct);
    console.log(pool.pool?.coin_a.value.toJsNumber());
    console.log(pool.pool?.coin_b.value.toJsNumber());
    if (pool.pool?.coin_a.value.toJsNumber()! > 0) {
      result.push(poolRawStruct);
    }
  });
  console.log(result);
  console.log(allPools.length);
  console.log(result.length);
}

main().then().catch(console.error);
