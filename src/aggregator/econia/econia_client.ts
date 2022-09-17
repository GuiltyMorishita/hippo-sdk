import { AptosClient, HexString } from 'aptos';
import { AptosParserRepo, AtomicTypeTag, moveValueToOpenApiObject, StructTag } from '@manahippo/move-to-ts';
import { MarketInfo, Registry } from '../../generated/econia/registry';
import { getProjectRepo } from '../../generated';

export class EconiaClient {
  constructor(public aptosClient: AptosClient, public repo: AptosParserRepo, public registryOwner: HexString) {}

  async getMarkets(): Promise<[MarketInfo, HexString][]> {
    const registry = await Registry.load(this.repo, this.aptosClient, this.registryOwner, []);
    const repo = getProjectRepo();
    const keys = registry.markets.keys as MarketInfo[];
    const promises: Promise<void>[] = [];
    const entries: [MarketInfo, HexString][] = [];
    keys.forEach((mi) => {
      const loader = async () => {
        const value = await this.aptosClient.getTableItem(registry.markets.base_table.handle.toString(), {
          key_type: (mi.typeTag as StructTag).getFullname(),
          value_type: 'address',
          key: moveValueToOpenApiObject(mi, mi.typeTag)
        });
        const owner = repo.parse(value, AtomicTypeTag.Address) as HexString;
        entries.push([mi, owner]);
      };
      promises.push(loader());
    });
    await Promise.all(promises);
    return entries;
  }
}
