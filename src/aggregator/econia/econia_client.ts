import { AptosClient, HexString } from 'aptos';
import { AptosParserRepo } from '@manahippo/move-to-ts';
import { MarketInfo, Registry } from '../../generated/econia/registry';

export class EconiaClient {
  constructor(public aptosClient: AptosClient, public repo: AptosParserRepo, public registryOwner: HexString) {}

  async getMarkets(): Promise<MarketInfo[]> {
    const registry = await Registry.load(this.repo, this.aptosClient, this.registryOwner, []);
    return registry.markets;
  }
}
