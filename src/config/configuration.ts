import { HexString } from "aptos"

export class NetworkConfiguration {
  constructor(
    public name: string,
    public fullNodeUrl: string,
    public faucetUrl: string,
    public contractAddress: HexString,
    public isMainnet = false,
  ) {

  }
}

export const LOCAL_CONFIG = new NetworkConfiguration(
  "localhost",
  "http://0.0.0.0:8080",
  "http://0.0.0.0:8000",
  new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790"),
)

export const DEVNET_CONFIG = new NetworkConfiguration(
  "devnet",
  "https://fullnode.devnet.aptoslabs.com/",
  "https://faucet.devnet.aptoslabs.com/",
  new HexString("0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790"),
)

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  devnet: DEVNET_CONFIG,
}