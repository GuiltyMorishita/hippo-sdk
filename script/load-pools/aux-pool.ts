import { AuxPoolProvider } from '../../src/aggregator/aux';
import { AptosClient } from 'aptos';
import { App, MAINNET_CONFIG as netconf } from '../../src';
import { CoinListClient, NetworkType } from '@manahippo/coin-list';
import { RawStruct } from '../../src/aggregator/types';
import { StructTag } from '@manahippo/move-to-ts';
import { toRawStruct } from '../../src/aggregator/utils';

async function main() {
  const client = new AptosClient(netconf.fullNodeUrl);
  const app = new App(client);
  const coinListClient = new CoinListClient(netconf.name as NetworkType);
  const auxPoolPrivider = new AuxPoolProvider(app, netconf, coinListClient);
  const allPools = await auxPoolPrivider.loadPoolList();
  const promises: Promise<void>[] = [];
  for (const pool of allPools) {
    promises.push(pool.reloadState(app));
  }
  await Promise.all(promises);
  console.log(allPools.length);
  const result: RawStruct[][] = [];
  allPools.forEach((pool) => {
    let typeParams = (pool.pool!.typeTag as StructTag).typeParams as StructTag[];
    if (pool.pool != undefined && pool.pool.x_reserve.value.toJsNumber() > 0) {
      result.push([toRawStruct(typeParams[0]), toRawStruct(typeParams[1])]);
    }
  });
  console.log(result.length);
  console.log(result);
}

main().then().catch(console.error);
