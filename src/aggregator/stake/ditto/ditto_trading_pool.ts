import { DexType } from '../../types';
import { StakeTradingPool } from '../stake_trading_pool';
import { CoinInfo as StdCoinInfo } from '../../../generated/stdlib/coin';
import { App } from '../../../generated';
import { Types } from 'aptos';

export class DittoTradingPool extends StakeTradingPool {
  private xAmountInfo: Types.MoveResource | undefined;

  get dexType(): DexType {
    return DexType.Ditto;
  }

  getXAmount(): number {
    // @ts-ignore
    let amount = this.xAmountInfo?.data.total_aptos;
    return parseInt(amount) / Math.pow(10, this.xCoinInfo.decimals.toJsNumber());
  }
  async reloadState(app: App): Promise<void> {
    let res = await Promise.all([
      app.client.getAccountResource(this.ownerAddress, this.ownerAddress + '::ditto_staking::DittoPool'),
      StdCoinInfo.load(app.parserRepo, app.client, this.ownerAddress, [this.yInfo.token_type.toTypeTag()])
    ]);
    this.xAmountInfo = res[0];
    this.yAmountInfo = res[1];
  }
  isStateLoaded(): boolean {
    return this.xAmountInfo != undefined && this.yAmountInfo != undefined;
  }
}
