import {AptosAccount, AptosClient, HexString, TxnBuilderTypes, Types} from "aptos";
import { Command } from "commander";
import * as fs from "fs";
import * as yaml from "yaml";
import { CONFIGS } from "../config";
import { App } from "../generated";
import { AptosDataCache, strToU8 } from "@manahippo/move-to-ts";
import * as Std from "../generated/stdlib";

export const readConfig = (program: Command) => {
  const {config, profile} = program.opts();
  const ymlContent = fs.readFileSync(config, {encoding: "utf-8"});
  const result = yaml.parse(ymlContent);
  //console.log(result);
  if (!result.profiles) {
    throw new Error("Expect a profiles to be present in yaml config");
  }
  if (!result.profiles[profile]) {
    throw new Error(`Expect a ${profile} profile to be present in yaml config`);
  }
  const url = result.profiles[profile].rest_url;
  const privateKeyStr = result.profiles[profile].private_key;
  if (!url) {
    throw new Error(`Expect rest_url to be present in ${profile} profile`);
  }
  if (!privateKeyStr) {
    throw new Error(`Expect private_key to be present in ${profile} profile`);
  }
  const privateKey = new HexString(privateKeyStr);
  const isDevnet = (url as string).includes("devnet");
  const netConf = isDevnet? CONFIGS.devnet : CONFIGS.localhost;
  const hippoDexAddress = netConf.hippoDexAddress;
  const client = new AptosClient(result.profiles[profile].rest_url);
  const app = new App(client);
  const account = new AptosAccount(privateKey.toUint8Array());
  console.log(`Using address ${account.address().hex()}`);
  return {app, client, account, hippoDexAddress, netConf};
}

export function strToString(str: string, $c: AptosDataCache){
  return Std.String.utf8_(strToU8(str), $c);
}
