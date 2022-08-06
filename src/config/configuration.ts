import { HexString } from "aptos"

export class NetworkConfiguration {
  constructor(
    public name: string,
    public fullNodeUrl: string,
    public faucetUrl: string,
    public contractAddress: HexString,
    public pontemAddress: HexString,
    public econiaAddress: HexString,
    public isMainnet = false,
  ) {

  }
}

export const LOCAL_CONFIG = new NetworkConfiguration(
  "localhost",
  "http://0.0.0.0:8080",
  "http://0.0.0.0:8000",
  // hippo
  new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"),
  // pontem
  new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"),
  // econia
  new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"),
)

export const DEVNET_CONFIG = new NetworkConfiguration(
  "devnet",
  "https://fullnode.devnet.aptoslabs.com/v1",
  "https://faucet.devnet.aptoslabs.com",
  // hippo
  new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"),
  // pontem
  new HexString("0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9"),
  // econia
  new HexString("0x389397a906ddab111bc8f8bfece404424d9da38f64e45f262e444281a2d71618"),
)

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  devnet: DEVNET_CONFIG,
}