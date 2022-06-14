import { getTypeTagFullname, StructTag } from "@manahippo/aptos-tsgen";
import { TransactionPayload } from "aptos/dist/api/data-contracts";
import { TokenInfo } from "../generated/X0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790/TokenRegistry";
import { typeInfoToTypeTag } from "../utils";

export type UITokenAmount = number;

export type PriceType = {
  xToY: number;
  yToX: number;
}

export type QuoteType = {
  inputSymbol: string;
  outputSymbol: string;
  inputUiAmt: UITokenAmount;
  outputUiAmt: UITokenAmount;
  initialPrice: number;
  avgPrice: number;
  finalPrice: number; 
  priceImpact: number;
}

export enum PoolType {
  CONSTANT_PRODUCT = 0,
  STABLE_CURVE = 1,
  THREE_PIECE = 2,
}

export abstract class HippoPool {
  constructor(
    public xTokenInfo: TokenInfo,
    public yTokenInfo: TokenInfo,
    public lpTokenInfo: TokenInfo,
  ) {

  }

  abstract getCurrentPrice(): PriceType;

  abstract getQuote(uiAmount: UITokenAmount, isXToY: boolean) : QuoteType;

  abstract estimateWithdrawalOutput(lpUiAmount: UITokenAmount, lpSupplyUiAmt: UITokenAmount): {xUiAmt: UITokenAmount; yUiAmt: UITokenAmount};

  abstract estimateNeededYFromXDeposit(xUiAmt: UITokenAmount): UITokenAmount;
  abstract estimateNeededXFromYDeposit(yUiAmt: UITokenAmount): UITokenAmount;

  abstract getPoolType(): PoolType;

  xTag(): StructTag {
    return typeInfoToTypeTag(this.xTokenInfo.token_type) as StructTag;
  }

  yTag(): StructTag {
    return typeInfoToTypeTag(this.yTokenInfo.token_type) as StructTag;
  }

  lpTag(): StructTag {
    return typeInfoToTypeTag(this.lpTokenInfo.token_type) as StructTag;
  }

  xyFullname(): string {
    const [xFullname, yFullname] = [this.xTag(), this.yTag()].map(getTypeTagFullname);
    return `${xFullname}<->${yFullname}`;
  }

  // transactions
  abstract makeSwapPayload( 
    amountIn: UITokenAmount, 
    minAmountOut: UITokenAmount, 
    isXtoY: boolean
  ): Promise<TransactionPayload>;

  abstract makeAddLiquidityPayload(lhsAmt: UITokenAmount, rhsAmt: UITokenAmount): Promise<TransactionPayload>;

  abstract makeRemoveLiquidityPayload(
    liqiudityAmt: UITokenAmount, 
    lhsMinAmt: UITokenAmount, 
    rhsMinAmt: UITokenAmount,
  ): Promise<TransactionPayload>;
}