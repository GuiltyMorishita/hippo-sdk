import { HexString } from 'aptos';
import { Hippo_config } from '../generated/hippo_swap';
import { Coin_list } from '../generated/coin_list';
import { econia, hippo_aggregator } from '../generated';

export class NetworkConfiguration {
  constructor(
    public name: string,
    public fullNodeUrl: string,
    public faucetUrl: string,
    public hippoDexAddress: HexString,
    public coinListAddress: HexString,
    public hippoAggregatorAddress: HexString,
    public pontemAddress: HexString,
    public econiaAddress: HexString,
    public basiqAddress: HexString,
    public dittoAddress: HexString,
    public tortugaAddress: HexString,
    public aptoswapAddress: HexString,
    public isMainNet = false
  ) {}
}

export const LOCAL_CONFIG = new NetworkConfiguration(
  'localhost',
  'http://0.0.0.0:8080',
  'http://0.0.0.0:8000',
  // hippo dex
  Hippo_config.moduleAddress,
  // coin list
  Coin_list.moduleAddress,
  // hippo aggregator
  hippo_aggregator.Aggregator.moduleAddress,
  // pontem
  new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
  // econia
  econia.Market.moduleAddress,
  // basiq
  new HexString('0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab'),
  // ditto
  new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
  // tortuga
  new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab'),
  // aptoswap
  new HexString('0x6b6f23b7ecaa50a02c699be6cc1d3e60a545090ba24e6b145ad71639e38bf4ba')
);

export const TESTNET_CONFIG = new NetworkConfiguration(
  'devnet',
  'https://fullnode.testnet.aptoslabs.com/v1',
  'https://faucet.testnet.aptoslabs.com',
  // hippo dex
  Hippo_config.moduleAddress,
  // coin list
  Coin_list.moduleAddress,
  // hippo aggregator
  hippo_aggregator.Aggregator.moduleAddress,
  // pontem
  new HexString('0x385068db10693e06512ed54b1e6e8f1fb9945bb7a78c28a45585939ce953f99e'),
  // econia
  econia.Market.moduleAddress,
  // basiq
  new HexString('0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab'),
  // ditto
  new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
  // tortuga
  new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab'),
  // aptoswap
  new HexString('0x6b6f23b7ecaa50a02c699be6cc1d3e60a545090ba24e6b145ad71639e38bf4ba')
);

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  testnet: TESTNET_CONFIG
};
