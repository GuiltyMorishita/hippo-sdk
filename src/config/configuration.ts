import { HexString } from 'aptos';
import { Hippo_config } from '../generated/hippo_swap';
import { Coin_list } from '../generated/coin_list';
import { hippo_aggregator, liquidswap_lp } from '../generated';

export class NetworkConfiguration {
  constructor(
    public name: string,
    public fullNodeUrl: string,
    public faucetUrl: string,
    public simulationAddress: HexString,
    public simulationPubkey: HexString,
    public hippoDexAddress: HexString,
    public coinListAddress: HexString,
    public hippoAggregatorAddress: HexString,
    public pontemAddress: HexString,
    public econiaAddress: HexString,
    public basiqAddress: HexString,
    public dittoAddress: HexString,
    public tortugaAddress: HexString,
    public isMainNet = false
  ) {}

  get simulationKeys() {
    return {
      pubkey: this.simulationPubkey,
      address: this.simulationAddress
    };
  }
}

export const LOCAL_CONFIG = new NetworkConfiguration(
  'localhost',
  'http://0.0.0.0:8080',
  'http://0.0.0.0:8000',
  // simulationAddress coin list now
  new HexString('0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46'),
  // simulationPubkey coin list now
  new HexString('0xc5aad5bddffb7516c7a02a2fb14fa50cfaf7497281bc89f90024005f44f3e393'),
  // hippo dex
  Hippo_config.moduleAddress,
  // coin list
  Coin_list.moduleAddress,
  // hippo aggregator
  hippo_aggregator.Aggregator.moduleAddress,
  // pontem
  liquidswap_lp.Lp_coin.moduleAddress,
  // econia
  new HexString('0xc0deb00c9154b6b64db01eeb77d08255300315e1fa35b687d384a703f6034fbd'),
  // basiq
  new HexString('0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab'),
  // ditto
  new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
  // tortuga
  new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab')
);

export const DEVNET_CONFIG = new NetworkConfiguration(
  'devnet',
  'https://fullnode.devnet.aptoslabs.com/v1',
  'https://faucet.devnet.aptoslabs.com',
  // simulationAddress coin list now
  new HexString('0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46'),
  // simulationPubkey coin list now
  new HexString('0xc5aad5bddffb7516c7a02a2fb14fa50cfaf7497281bc89f90024005f44f3e393'),
  // hippo dex
  Hippo_config.moduleAddress,
  // coin list
  Coin_list.moduleAddress,
  // hippo aggregator
  hippo_aggregator.Aggregator.moduleAddress,
  // pontem
  liquidswap_lp.Lp_coin.moduleAddress,
  // econia
  new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
  // basiq
  new HexString('0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab'),
  // ditto
  new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
  // tortuga
  new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab')
);
export const TESTNET_CONFIG = new NetworkConfiguration(
  'devnet',
  'https://fullnode.testnet.aptoslabs.com/v1',
  'https://faucet.testnet.aptoslabs.com',
  // simulationAddress coin list now
  new HexString('0xb5d6dbc225e8c42cec66664ebbccaef2098107f699510613a0b90214f659bb46'),
  // simulationPubkey coin list now
  new HexString('0xc5aad5bddffb7516c7a02a2fb14fa50cfaf7497281bc89f90024005f44f3e393'),
  // hippo dex
  Hippo_config.moduleAddress,
  // coin list
  Coin_list.moduleAddress,
  // hippo aggregator
  new HexString('0x89576037b3cc0b89645ea393a47787bb348272c76d6941c574b053672b848039'),
  // pontem
  new HexString('0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9'),
  // econia
  new HexString('0xe56148c106146758a4172a7189cd8487f84997de6f6c2b3396106a8f82cb0c33'),
  // basiq
  new HexString('0x4885b08864b81ca42b19c38fff2eb958b5e312b1ec366014d4afff2775c19aab'),
  // ditto
  new HexString('0x4d87417a2fb3248887d820f7737d9c4aeeb9591c5de91d08f7f490550e733894'),
  // tortuga
  new HexString('0x12d75d5bde2535789041cd380e832038da873a4ba86348ca891d374e1d0e15ab')
);

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  devnet: DEVNET_CONFIG,
  testnet: TESTNET_CONFIG
};
