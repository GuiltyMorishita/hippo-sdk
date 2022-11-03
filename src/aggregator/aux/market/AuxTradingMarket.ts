import { DexType, PoolType, PriceType, QuoteType, TradingPool, UITokenAmount } from '../../types';
import { HexString, Types } from 'aptos';
import { u64 } from '@manahippo/move-to-ts';
import { App } from '../../../generated';
import { RawCoinInfo } from '@manahippo/coin-list';
import * as move_to_ts from '@manahippo/move-to-ts';

export interface L2Quote {
  price: number;
  quantity: number;
}

export interface RawMarket {
  lotSize: number;
  tickSize: number;
  bids: L2Quote[];
  asks: L2Quote[];
}

export class AuxTradingMarket extends TradingPool {
  market: RawMarket | null;
  constructor(public ownerAddr: HexString, public xCoinInfo: RawCoinInfo, public yCoinInfo: RawCoinInfo) {
    super();
    this.market = null;
  }
  get dexType(): DexType {
    return DexType.Aux;
  }
  get poolType(): PoolType {
    return u64(1);
  }
  getPrice(): PriceType {
    return {} as PriceType;
  }

  getQuote(inputUiAmt: UITokenAmount, isXtoY: boolean): QuoteType {
    if (!this.isStateLoaded()) {
      throw new Error('Aux market not loaded. cannot compute quote');
    }
    // todo fees
    const l2Quotes = isXtoY ? this.market!.bids : this.market!.asks;
    let inputBalance = isXtoY
      ? Math.floor((inputUiAmt * Math.pow(10, this.xCoinInfo.decimals)) / this.market?.lotSize!) * this.market?.lotSize!
      : 0;
    let outputAmt = 0;
    for (const l2Quote of l2Quotes) {
      if (isXtoY) {
        if (inputBalance < l2Quote.quantity) {
          outputAmt = outputAmt + (inputBalance * l2Quote.price) / Math.pow(10, this.xCoinInfo.decimals);
          inputBalance = 0;
        } else {
          outputAmt = outputAmt + (l2Quote.quantity * l2Quote.price) / Math.pow(10, this.xCoinInfo.decimals);
          inputBalance = inputBalance - l2Quote.quantity;
        }
      }
      // else {
      //   if (inputBalance < l2Quote.price * l2Quote.quantity) {
      //     outputAmt = outputAmt + inputBalance / l2Quote.price;
      //     inputBalance = 0;
      //   } else {
      //     outputAmt = outputAmt + l2Quote.quantity;
      //     inputBalance = inputBalance - l2Quote.price * l2Quote.quantity;
      //   }
      // }

      if (inputBalance <= 0) {
        break;
      }
    }
    const outputUiAmt = isXtoY ? outputAmt / Math.pow(10, this.yCoinInfo.decimals) : 0;
    return {
      inputSymbol: isXtoY ? this.xCoinInfo.symbol : this.yCoinInfo.symbol,
      outputSymbol: isXtoY ? this.yCoinInfo.symbol : this.xCoinInfo.symbol,
      inputUiAmt,
      outputUiAmt,
      avgPrice: outputUiAmt / inputBalance
    };
  }
  get isRoutable(): boolean {
    return true;
  }

  isStateLoaded(): boolean {
    return this.market != null;
  }

  makePayload(inputUiAmt: UITokenAmount, minOutAmt: UITokenAmount): Types.EntryFunctionPayload {
    throw new Error('Not Implemented');
  }

  async reloadStateInternal(app: App): Promise<void> {
    if (this.market == null) {
      let [{ lotSize, tickSize }, { bids, asks }] = await Promise.all([
        this.loadMarket(app),
        this.reloadAsksAndBids(app)
      ]);
      this.market = { lotSize, tickSize, bids, asks };
    } else {
      const { asks, bids } = await this.reloadAsksAndBids(app);
      this.market.asks = asks;
      this.market.bids = bids;
    }
  }
  async loadMarket(app: App) {
    const type = `${this.ownerAddr}::clob_market::Market<${this.xTag.getFullname()}, ${this.yTag.getFullname()}>`;
    const market = await app.client.getAccountResource(this.ownerAddr, type);
    // @ts-ignore
    return { lotSize: parseInt(market.data.lot_size), tickSize: parseInt(market.data.tick_size) };
  }
  async reloadAsksAndBids(app: App) {
    const payload = app.aux.clob_market.payload_load_market_into_event([this.xTag, this.yTag]);
    const result = await move_to_ts.simulatePayloadTx(app.client, move_to_ts.SIM_KEYS, payload);
    const l2 = result.events[0];
    const bids: L2Quote[] = (l2?.data.bids ?? []).map((bid: any) => ({
      price: parseInt(bid.price),
      quantity: parseInt(bid.quantity)
    }));
    const asks: L2Quote[] = (l2?.data.asks ?? []).map((ask: any) => ({
      price: parseInt(ask.price),
      quantity: parseInt(ask.quantity)
    }));
    return { asks, bids };
  }
}
