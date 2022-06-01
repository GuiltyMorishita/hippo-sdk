
export class NetworkConfiguration {
  constructor(
    public name: string,
    public fullNodeUrl: string,
    public faucetUrl: string,
    public isMainnet = false,
  ) {

  }
}

export const LOCAL_CONFIG = new NetworkConfiguration(
  "localhost",
  "http://0.0.0.0:8080",
  "http://0.0.0.0:8000",
)

export const DEVNET_CONFIG = new NetworkConfiguration(
  "devnet",
  "https://fullnode.devnet.aptoslabs.com/",
  "https://faucet.devnet.aptoslabs.com/",
)

export const CONFIGS = {
  localhost: LOCAL_CONFIG,
  devnet: DEVNET_CONFIG,
}