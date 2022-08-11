
import { AptosClient } from "aptos";
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Account from './account';
import * as Aptos_coin from './aptos_coin';
import * as Aptos_governance from './aptos_governance';
import * as Block from './block';
import * as Bucket_table from './bucket_table';
import * as Chain_id from './chain_id';
import * as Code from './code';
import * as Coin from './coin';
import * as Coins from './coins';
import * as Consensus_config from './consensus_config';
import * as Genesis from './genesis';
import * as Governance_proposal from './governance_proposal';
import * as Managed_coin from './managed_coin';
import * as Reconfiguration from './reconfiguration';
import * as Resource_account from './resource_account';
import * as Stake from './stake';
import * as System_addresses from './system_addresses';
import * as Timestamp from './timestamp';
import * as Transaction_context from './transaction_context';
import * as Transaction_fee from './transaction_fee';
import * as Version from './version';
import * as Vm_config from './vm_config';
import * as Voting from './voting';

export * as Account from './account';
export * as Aptos_coin from './aptos_coin';
export * as Aptos_governance from './aptos_governance';
export * as Block from './block';
export * as Bucket_table from './bucket_table';
export * as Chain_id from './chain_id';
export * as Code from './code';
export * as Coin from './coin';
export * as Coins from './coins';
export * as Consensus_config from './consensus_config';
export * as Genesis from './genesis';
export * as Governance_proposal from './governance_proposal';
export * as Managed_coin from './managed_coin';
export * as Reconfiguration from './reconfiguration';
export * as Resource_account from './resource_account';
export * as Stake from './stake';
export * as System_addresses from './system_addresses';
export * as Timestamp from './timestamp';
export * as Transaction_context from './transaction_context';
export * as Transaction_fee from './transaction_fee';
export * as Version from './version';
export * as Vm_config from './vm_config';
export * as Voting from './voting';


export function loadParsers(repo: AptosParserRepo) {
  Account.loadParsers(repo);
  Aptos_coin.loadParsers(repo);
  Aptos_governance.loadParsers(repo);
  Block.loadParsers(repo);
  Bucket_table.loadParsers(repo);
  Chain_id.loadParsers(repo);
  Code.loadParsers(repo);
  Coin.loadParsers(repo);
  Coins.loadParsers(repo);
  Consensus_config.loadParsers(repo);
  Genesis.loadParsers(repo);
  Governance_proposal.loadParsers(repo);
  Managed_coin.loadParsers(repo);
  Reconfiguration.loadParsers(repo);
  Resource_account.loadParsers(repo);
  Stake.loadParsers(repo);
  System_addresses.loadParsers(repo);
  Timestamp.loadParsers(repo);
  Transaction_context.loadParsers(repo);
  Transaction_fee.loadParsers(repo);
  Version.loadParsers(repo);
  Vm_config.loadParsers(repo);
  Voting.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}

export class App {
  account : Account.App
  aptos_coin : Aptos_coin.App
  aptos_governance : Aptos_governance.App
  block : Block.App
  bucket_table : Bucket_table.App
  chain_id : Chain_id.App
  code : Code.App
  coin : Coin.App
  coins : Coins.App
  consensus_config : Consensus_config.App
  genesis : Genesis.App
  governance_proposal : Governance_proposal.App
  managed_coin : Managed_coin.App
  reconfiguration : Reconfiguration.App
  resource_account : Resource_account.App
  stake : Stake.App
  system_addresses : System_addresses.App
  timestamp : Timestamp.App
  transaction_context : Transaction_context.App
  transaction_fee : Transaction_fee.App
  version : Version.App
  vm_config : Vm_config.App
  voting : Voting.App
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
    this.account = new Account.App(client, repo);
    this.aptos_coin = new Aptos_coin.App(client, repo);
    this.aptos_governance = new Aptos_governance.App(client, repo);
    this.block = new Block.App(client, repo);
    this.bucket_table = new Bucket_table.App(client, repo);
    this.chain_id = new Chain_id.App(client, repo);
    this.code = new Code.App(client, repo);
    this.coin = new Coin.App(client, repo);
    this.coins = new Coins.App(client, repo);
    this.consensus_config = new Consensus_config.App(client, repo);
    this.genesis = new Genesis.App(client, repo);
    this.governance_proposal = new Governance_proposal.App(client, repo);
    this.managed_coin = new Managed_coin.App(client, repo);
    this.reconfiguration = new Reconfiguration.App(client, repo);
    this.resource_account = new Resource_account.App(client, repo);
    this.stake = new Stake.App(client, repo);
    this.system_addresses = new System_addresses.App(client, repo);
    this.timestamp = new Timestamp.App(client, repo);
    this.transaction_context = new Transaction_context.App(client, repo);
    this.transaction_fee = new Transaction_fee.App(client, repo);
    this.version = new Version.App(client, repo);
    this.vm_config = new Vm_config.App(client, repo);
    this.voting = new Voting.App(client, repo);
  }
}
