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
  new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"),
)

export const DEVNET_CONFIG = new NetworkConfiguration(
  "devnet",
  "https://fullnode.devnet.aptoslabs.com/",
  "https://faucet.devnet.aptoslabs.com/",
  new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"),
)

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  devnet: DEVNET_CONFIG,
}