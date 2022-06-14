import { AptosParserRepo, getTypeTagFullname, parseTypeTagOrThrow, StructTag, TypeTag } from "@manahippo/aptos-tsgen";
import { AptosClient, HexString } from "aptos";
import bigInt from "big-integer";
import { NetworkConfiguration } from "../config";
import { CPSwap, TokenRegistry, StableCurveSwap } from "../generated/X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790";
import { CoinInfo } from "../generated/X0x1/Coin";
import { typeInfoToTypeTag } from "../utils";
import { HippoPool, UITokenAmount } from "./baseTypes";
import { HippoConstantProductPool } from "./constantProductPool";
import { HippoStableCurvePool } from "./stableCurvePool";


enum SwapClientErrors {
  NO_ROUTE,
}

export async function loadContractResources(netConf: NetworkConfiguration, client: AptosClient, repo: AptosParserRepo) {
  const resources = await client.getAccountResources(netConf.contractAddress);
  let registry: TokenRegistry.TokenRegistry | null = null;
  const cpMetas: CPSwap.TokenPairMetadata[] = [];
  const stablePoolInfos: StableCurveSwap.StableCurvePoolInfo[] = [];
  for(const resource of resources) {
    try{
      const typeTag = parseTypeTagOrThrow(resource.type);
      const parsed = repo.parse(resource.data, typeTag);
      if (parsed instanceof TokenRegistry.TokenRegistry) {
        registry = parsed;
      }
      else if(parsed instanceof CPSwap.TokenPairMetadata) {
        cpMetas.push(parsed);
      }
      else if(parsed instanceof StableCurveSwap.StableCurvePoolInfo) {
        stablePoolInfos.push(parsed);
      }
    }
    catch(e) {
      console.log(`Could not parse resource of type: ${resource.type}`);
    }
  }
  if(!registry) {
    throw new Error(`Failed to load TokenRegistry from contract account: ${netConf.contractAddress.hex()}`);
  }
  return {registry, cpMetas, stablePoolInfos}
}

export class HippoSwapClient {
  // supported single tokens
  public singleTokens: TokenRegistry.TokenInfo[];
  // maps TokenInfo.symbol to TokenInfo
  public symbolToTokenInfo: Record<string, TokenRegistry.TokenInfo>;
  // maps token-struct-fullname to TokenInfo
  public tokenFullnameToTokenInfo: Record<string, TokenRegistry.TokenInfo>;
  // maps `${xToken-struct-fullname}<->${yToken-struct-fullname}` to constant-product LP token
  public xyFullnameToPools: Record<string, HippoPool[]>;
  public contractAddress: HexString;

  static async createInOneCall(netConfig: NetworkConfiguration, aptosClient: AptosClient, repo: AptosParserRepo) {
    const {registry, cpMetas, stablePoolInfos} = await loadContractResources(netConfig, aptosClient, repo);
    return new HippoSwapClient(netConfig, aptosClient, registry.token_info_list, cpMetas, stablePoolInfos, repo);
  }
  constructor(
    public netConfig: NetworkConfiguration,
    public aptosClient: AptosClient,
    public tokenList:  TokenRegistry.TokenInfo[],
    public cpMetas: CPSwap.TokenPairMetadata[],
    public stablePoolInfos: StableCurveSwap.StableCurvePoolInfo[],
    public repo: AptosParserRepo,
  ) {
    // init cached maps/lists
    this.singleTokens = [];
    this.symbolToTokenInfo = {};
    this.tokenFullnameToTokenInfo = {};
    this.xyFullnameToPools = {};
    this.contractAddress = netConfig.contractAddress;
    // build maps and caches from tokenList
    this.buildCache();
  }

  buildCache() {
    this.singleTokens = [];
    this.symbolToTokenInfo = {};
    this.tokenFullnameToTokenInfo = {};
    this.xyFullnameToPools = {};
    for(const tokenInfo of this.tokenList) {
      if(tokenInfo.delisted) {
        continue;
      }
      const coinTypeTag = typeInfoToTypeTag(tokenInfo.token_type);
      const tokenFullname = getTypeTagFullname(coinTypeTag);
      this.symbolToTokenInfo[tokenInfo.symbol] = tokenInfo;
      this.tokenFullnameToTokenInfo[tokenFullname] = tokenInfo;
      if (
        coinTypeTag instanceof StructTag &&
        coinTypeTag.address.hex() === this.contractAddress.hex() && 
        [CPSwap.moduleName, StableCurveSwap.moduleName].includes(coinTypeTag.module)
      ) {
        continue;
      }
      else {
        this.singleTokens.push(tokenInfo);
      }
    }
    // build map from cpPools
    for(const cpMeta of this.cpMetas) {
      const {xTokenInfo, yTokenInfo, xTag, yTag} = this.getXYTokenInfo(cpMeta);
      const lpTag = new StructTag(CPSwap.moduleAddress, CPSwap.moduleName, CPSwap.LPToken.structName, [xTag, yTag]);
      const lpTokenInfo = this.tokenFullnameToTokenInfo[getTypeTagFullname(lpTag)];
      this.addPool(new HippoConstantProductPool(xTokenInfo, yTokenInfo, lpTokenInfo, cpMeta));
    }
    for(const stablePool of this.stablePoolInfos) {
      const {xTokenInfo, yTokenInfo, xTag, yTag} = this.getXYTokenInfo(stablePool);
      const lpTag = new StructTag(CPSwap.moduleAddress, CPSwap.moduleName, CPSwap.LPToken.structName, [xTag, yTag]);
      const lpTokenInfo = this.tokenFullnameToTokenInfo[getTypeTagFullname(lpTag)];
      this.addPool(new HippoStableCurvePool(xTokenInfo, yTokenInfo, lpTokenInfo, stablePool));
    }
  }

  getXYTokenInfo(proto: any) {
    const typeTag = proto.typeTag;
    if(!(typeTag && typeTag instanceof StructTag)) {
      throw new Error(`Unexpected proto: ${JSON.stringify(proto, null, 2)}`);
    }
    if (typeTag.typeParams.length !== 2) {
      throw new Error(`Unexpected typeparameter length: ${proto.typeTag.typeParams.length }`);
    }
    const [xTag, yTag] = typeTag.typeParams;
    const xTokenInfo = this.tokenFullnameToTokenInfo[getTypeTagFullname(xTag)];
    const yTokenInfo = this.tokenFullnameToTokenInfo[getTypeTagFullname(yTag)];
    return {xTokenInfo, yTokenInfo, xTag, yTag};
  }

  addPool(pool: HippoPool) {
    const xyFullname = pool.xyFullname();
    if(!(xyFullname in this.xyFullnameToPools)) {
      this.xyFullnameToPools[xyFullname] = [];
    }
    this.xyFullnameToPools[xyFullname].push(pool);
  }

  getTokenInfoBySymbol(symbol: string) {
    return this.symbolToTokenInfo[symbol];
  }

  getDirectPoolsBySymbol(symbolX: string, symbolY: string) {
    const tokenX = this.getTokenInfoBySymbol(symbolX);
    const tokenY = this.getTokenInfoBySymbol(symbolY);
    // if we don't even have the single-tokens in our registry, don't even bother checking LPs
    if(!tokenX || !tokenY) {
      return null;
    }
    const [tagX, tagY] = [tokenX, tokenY].map(ti=> typeInfoToTypeTag(ti.token_type));
    const jointNameXY = this.getJointName(tagX, tagY);
    const jointNameYX = this.getJointName(tagY, tagX);
    const poolsXY = this.xyFullnameToPools[jointNameXY]
    if (poolsXY && poolsXY.length) {
      return {pools: poolsXY, isReversed: false, jointName: jointNameXY};
    }
    const poolsYX = this.xyFullnameToPools[jointNameYX];
    if (poolsYX && poolsXY.length) {
      return {pools: poolsYX, isReversed: true, jointName: jointNameYX};
    }
    return null;
  }

  hasDirectPoolFor(symbolX: string, symbolY: string) {
    const lpInfo = this.getDirectPoolsBySymbol(symbolX, symbolY);
    return lpInfo !== null;
  }

  getDirectPriceBySymbols(symbolX: string, symbolY: string) {
    const lpInfo = this.getDirectPoolsBySymbol(symbolX, symbolY);
    if(!lpInfo) {
      return SwapClientErrors.NO_ROUTE;
    }
    const {pools, isReversed, jointName} = lpInfo;
    // HOW do we report price when multiple pools are available?
    /*
    const priceInfo = this.getCpPrice(cpMeta);
    if (isReversed) {
      return {xToY: priceInfo.yToX, yToX: priceInfo.xToY};
    }
    else {
      return priceInfo;
    }
    */
  }

  getQuote(pool: HippoPool, isXtoY: boolean, inputUiAmt: number) {
    return pool.getQuote(inputUiAmt, isXtoY);
  }

  getQuoteBySymbols(symbolX: string, symbolY: string, inputUiAmt: number) {
    throw new Error();
  }

  async reloadOnePoolBySymbols(symbolX: string, symbolY: string) {
    const lpInfo = this.getDirectPoolsBySymbol(symbolX, symbolY);
    if(!lpInfo) {
      return SwapClientErrors.NO_ROUTE;
    }
    const {lpToken, isReversed, jointName} = lpInfo;
    const cpMeta = this.xyFullnameToCPMeta[jointName];
    await this.reloadOnePool(cpMeta);
  }

  async reloadOnePool(cpMeta: CPSwap.TokenPairMetadata) {
    if(!(cpMeta.typeTag instanceof StructTag)) {
      throw new Error();
    }
    const typeTagFullname = getTypeTagFullname(cpMeta.typeTag);
    this.aptosClient.getAccountResource(cpMeta.typeTag.address, typeTagFullname);
  }

  async reloadAllPools() {
    const {registry, cpMetas} = await loadContractResources(this.netConfig, this.aptosClient, this.repo);
    this.tokenList = registry.token_info_list;
    this.cpMetas = cpMetas;
    this.buildCache();
  }

  getJointName(xTag: TypeTag, yTag: TypeTag) {
    if(!(xTag instanceof StructTag)) {
      throw new Error(`Expected xTag to be StructTag but received: ${JSON.stringify(xTag)}`);
    }
    if(!(yTag instanceof StructTag)) {
      throw new Error(`Expected yTag to be StructTag but received: ${JSON.stringify(yTag)}`);
    }
    const [xFullname, yFullname] = [xTag, yTag].map(getTypeTagFullname);
    return `${xFullname}<->${yFullname}`;
  }

  async getTokenTotalSupply(tokenInfo: TokenRegistry.TokenInfo) {
    const coinTag = typeInfoToTypeTag(tokenInfo.token_type);
    const coinInfo = await CoinInfo.load(this.repo, this.aptosClient, this.netConfig.contractAddress, [coinTag]);
    if (coinInfo.supply.vec.length > 0) {
      return coinInfo.supply.vec[0] as unknown as bigInt.BigInteger;
    }
    return null;
  }

  async getTokenTotalSupplyBySymbol(symbol: string) {
    const tokenInfo = this.symbolToTokenInfo[symbol];
    if (!tokenInfo) {
      throw new Error("Symbol not found");
    }
    return await this.getTokenTotalSupply(tokenInfo);
  }

  printSelf() {
    for(const token of this.singleTokens) {
      console.log(`Single token: ${token.symbol}`);
    }
    for(const cpMeta of this.cpMetas) {
      if(!(cpMeta.typeTag instanceof StructTag)) {
        throw new Error();
      }
      const [xTag, yTag] = cpMeta.typeTag.typeParams;
      const [xFullname, yFullname] = [xTag, yTag].map(getTypeTagFullname);
      const [xTokenInfo, yTokenInfo] = [xFullname, yFullname].map(name=>this.tokenFullnameToTokenInfo[name]);
      console.log("#############")
      console.log(`CP Pool: ${xTokenInfo.symbol} <-> ${yTokenInfo.symbol}`);
      console.log(`CP x balance: ${cpMeta.balance_x.value.toJSNumber() / Math.pow(10, xTokenInfo.decimals)}`);
      console.log(`CP y balance: ${cpMeta.balance_y.value.toJSNumber() / Math.pow(10, yTokenInfo.decimals)}`);
      console.log(`CP price (y-per-x): ${this.getCpPrice(cpMeta).yToX}`)
    }
  }
}