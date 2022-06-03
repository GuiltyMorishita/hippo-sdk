import { AptosParserRepo, parseTypeTagOrThrow, StructTag } from "@manahippo/aptos-tsgen";
import { AptosClient, HexString } from "aptos";
import { NetworkConfiguration } from "../config";
import { TokenRegistry } from "../generated/X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790";
import * as X0x1 from "../generated/X0x1";

export async function getCoinStoresForAddress(client: AptosClient, address: HexString, repo: AptosParserRepo) {
  const walletResources = await client.getAccountResources(address);
  const stores: X0x1.Coin.CoinStore[] = [];
  for(const resource of walletResources) {
    try{
      const typeTag = parseTypeTagOrThrow(resource.type);
      if(!(typeTag instanceof StructTag)) {
        continue;
      }
      // we only looking for 0x1::Coin::CoinStore
      if(
        typeTag.address.hex() !== X0x1.Coin.moduleAddress.hex() ||
        typeTag.module !== X0x1.Coin.moduleName ||
        typeTag.name !== X0x1.Coin.CoinStore.structName
      ) {
        continue;
      }
      const store = repo.parse(resource.data, typeTag) as unknown as X0x1.Coin.CoinStore;
      stores.push(store);
    }
    catch(e) {
      console.warn(`Failed to parse resource of type: ${resource.type}`);
      continue;
    }
  }
  return stores;
}


export class HippoWalletClient {
  constructor(
    public netConf: NetworkConfiguration,
    public aptosClient: AptosClient,
    public repo: AptosParserRepo,
    public registry: TokenRegistry.TokenRegistry,
    public walletAddress: HexString,
    public coinStores: X0x1.Coin.CoinStore[],
  ) {

  }

  async refreshStores() {
    this.coinStores = await getCoinStoresForAddress(this.aptosClient, this.walletAddress, this.repo);
  }

  static async createInTwoCalls(
    netConf: NetworkConfiguration, 
    aptosClient: AptosClient, 
    repo: AptosParserRepo, 
    walletAddress: HexString
  ) {
    const registry = await TokenRegistry.TokenRegistry.load(repo, aptosClient, netConf.contractAddress, []);
    const stores = await getCoinStoresForAddress(aptosClient, walletAddress, repo);
    return new HippoWalletClient(netConf, aptosClient, repo, registry, walletAddress, stores);
  }
}