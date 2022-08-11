
import { AptosClient } from "aptos";
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Capability from './capability';
import * as Coins from './coins';
import * as Critbit from './critbit';
import * as Init from './init';
import * as Market from './market';
import * as Open_table from './open_table';
import * as Order_id from './order_id';
import * as Registry from './registry';
import * as User from './user';

export * as Capability from './capability';
export * as Coins from './coins';
export * as Critbit from './critbit';
export * as Init from './init';
export * as Market from './market';
export * as Open_table from './open_table';
export * as Order_id from './order_id';
export * as Registry from './registry';
export * as User from './user';


export function loadParsers(repo: AptosParserRepo) {
  Capability.loadParsers(repo);
  Coins.loadParsers(repo);
  Critbit.loadParsers(repo);
  Init.loadParsers(repo);
  Market.loadParsers(repo);
  Open_table.loadParsers(repo);
  Order_id.loadParsers(repo);
  Registry.loadParsers(repo);
  User.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  capability : Capability.App
  coins : Coins.App
  critbit : Critbit.App
  init : Init.App
  market : Market.App
  open_table : Open_table.App
  order_id : Order_id.App
  registry : Registry.App
  user : User.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
    this.capability = new Capability.App(client, repo);
    this.coins = new Coins.App(client, repo);
    this.critbit = new Critbit.App(client, repo);
    this.init = new Init.App(client, repo);
    this.market = new Market.App(client, repo);
    this.open_table = new Open_table.App(client, repo);
    this.order_id = new Order_id.App(client, repo);
    this.registry = new Registry.App(client, repo);
    this.user = new User.App(client, repo);
  }
}
