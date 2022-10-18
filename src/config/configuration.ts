import { HexString } from 'aptos';
import { Coin_list } from '../generated/coin_list';
import { aux } from '../generated';
import { econia, hippo_aggregator } from '../generated';

export class NetworkConfiguration {
  constructor(
    public name: string,
    public fullNodeUrl: string,
    public faucetUrl: string,
    public coinListAddress: HexString,
    public hippoAggregatorAddress: HexString,
    public pontemAddress: HexString,
    public econiaAddress: HexString,
    public basiqAddress: HexString,
    public dittoAddress: HexString,
    public tortugaAddress: HexString,
    public aptoswapAddress: HexString,
    public auxAddress: HexString,
    public isMainNet = false
  ) {}
}

export const LOCAL_CONFIG = new NetworkConfiguration(
  'localhost',
  'http://0.0.0.0:8080',
  'http://0.0.0.0:8000',
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
  new HexString('0xa5d3ac4d429052674ed38adc62d010e52d7c24ca159194d17ddc196ddb7e480b'),
  // aux
  aux.Amm.moduleAddress
);

export const TESTNET_CONFIG = new NetworkConfiguration(
  'testnet',
  'https://fullnode.testnet.aptoslabs.com/v1',
  'https://faucet.testnet.aptoslabs.com',
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
  new HexString('0xa5d3ac4d429052674ed38adc62d010e52d7c24ca159194d17ddc196ddb7e480b'),
  // aux
  aux.Amm.moduleAddress
);

export const MAINNET_CONFIG = new NetworkConfiguration(
  'mainnet',
  'https://fullnode.mainnet.aptoslabs.com/v1',
  '',
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
  new HexString('0xa5d3ac4d429052674ed38adc62d010e52d7c24ca159194d17ddc196ddb7e480b'),
  // aux
  aux.Amm.moduleAddress
);

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  testnet: TESTNET_CONFIG,
  mainnet: MAINNET_CONFIG
};
