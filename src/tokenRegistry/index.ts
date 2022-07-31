import { AptosParserRepo } from "@manahippo/move-to-ts";
import { AptosClient } from "aptos";
import { NetworkConfiguration } from "../config";
import { TypeInfo } from "../generated/aptos_std/type_info";
import { TokenInfo, TokenRegistry } from "../generated/coin_registry/coin_registry";


export class TokenRegistryClient {
  fullnameToTokenInfo: Record<string, TokenInfo>;
  constructor(
    public registry: TokenRegistry,
  ) {
    this.fullnameToTokenInfo = {};
    for(const tokenInfo of this.registry.token_info_list) {
      const fullname = tokenInfo.token_type.typeFullname();
      this.fullnameToTokenInfo[fullname] = tokenInfo;
    }
  }

  hasTokenType(tokenType: TypeInfo) {
    return tokenType.typeFullname() in this.fullnameToTokenInfo;
  }

  getTokenInfoList() {
    return this.registry.token_info_list.filter(ti => !ti.delisted);
  }

  getTokenInfoBySymbol(symbol: string) {
    return this.getTokenInfoList().filter(ti => ti.symbol.str() === symbol);
  }

  getTokenInfoByType(tokenType: TypeInfo) {
    return this.fullnameToTokenInfo[tokenType.typeFullname()];
  }

  static async load(repo: AptosParserRepo, client: AptosClient, netConf: NetworkConfiguration) {
    const registry = await TokenRegistry.load(repo, client, netConf.contractAddress, []);
    return new TokenRegistryClient(registry);
  }
}