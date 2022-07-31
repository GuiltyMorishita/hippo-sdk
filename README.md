# hippo-sdk

# Directories
- `src/config`: node configuration, allows us to specify which network/fullnode/contract to use.
- `src/generated`: TypeScript interface generated using [move-to-ts](https://github.com/hippospace/move-to-ts)
- `src/aggregator`: Hippo aggregator client SDK
- `src/swap`: Hippo swap client SDK
- `src/tools`: command-line tools for developers
- `src/wallet`: Hippo wallet client SDK


# cli tool
We already deployed the contracts to Aptos devnet (for now, might be wiped out by the time you read this).

## Aggregator CLI
List commands
```
$ yarn cli agg

aggregator

Options:
  -h, --help                                                        display help for command

Commands:
  list-trading-pools
  list-routes <fromSymbol> <toSymbol>
  list-quotes <fromSymbol> <toSymbol> <inputUiAmt>
  swap <fromSymbol> <toSymbol> <inputUiAmt>
  simulate-swap <fromSymbol> <toSymbol> <inputUiAmt> <minOutUiAmt>
  help [command]                                                    display help for command
```

List all available pools
```
$ yarn cli -c .aptos/config.yaml agg list-trading-pools

###########
Pair: BTC - USDC
Dex: Hippo
PoolType: 1

###########
Pair: BTC - USDT
Dex: Hippo
PoolType: 1

###########
Pair: DAI - USDC
Dex: Hippo
PoolType: 3

###########
Pair: USDT - USDC
Dex: Hippo
PoolType: 3

###########
Pair: BTC - USDC
Dex: Econia
PoolType: 1

###########
Pair: BTC - USDC
Dex: Econia
PoolType: 1
```

Get quotes from multiple routes
```
$ yarn cli -c .aptos/config.yaml agg list-quotes BTC DAI 0.1

###########
Route: BTC -> USDC -> DAI
Step 0: BTC -> USDC (via Econia)
Step 1: USDC -> DAI (via Hippo)
x-to-y: 0.00009999002515576115
y-to-x: 9999.99738417296
Quote input: 0.1
Quote output: 999.8534694079265
###########
Route: BTC -> USDC -> DAI
Step 0: BTC -> USDC (via Hippo)
Step 1: USDC -> DAI (via Hippo)
x-to-y: 0.00010021089359466275
y-to-x: 10037.091547286866
Quote input: 0.1
Quote output: 987.7686941186852
###########
Route: BTC -> USDT -> USDC -> DAI
Step 0: BTC -> USDT (via Hippo)
Step 1: USDT -> USDC (via Hippo)
Step 2: USDC -> DAI (via Hippo)
x-to-y: 0.00010023109670032361
y-to-x: 10033.061505127245
Quote input: 0.1
Quote output: 987.3274270314756
###########
Route: BTC -> USDC -> DAI
Step 0: BTC -> USDC (via Econia)
Step 1: USDC -> DAI (via Hippo)
x-to-y: 0
y-to-x: 0
Quote input: 0.1
Quote output: 0
```

## Wallet & Faucet CLI

Get airdrop from faucet:
```
$ yarn cli -c .aptos/config.yaml test wallet-client-faucet BTC 0.1
{
  type: 'user_transaction',
  version: '1904948',
  hash: '0xd2cae8dd0f9a9f930f1cff31734a9caba92529e247d31827f9ef3290f6acccee',
  state_root_hash: '0xcb1cf36930db2e03bac78f6d42ffa4e96cc196805bf48f8c23c113e9b826b47c',
  event_root_hash: '0x32ba5023ca80de4916b23c3bf5adf0c77963e0c8ae6a8f8ac35420677400c4b7',
  gas_used: '158',
  success: true,
  vm_status: 'Executed successfully',
  accumulator_root_hash: '0x4b7dea2a293432e20ea0c8cd766be93fc3fb141c7fed1090d44284c51c462eed',
  changes: [
    {
    ...
```

Show current balance (only hippo devnet tokens supported)
```
$ yarn cli -c .aptos/config.yaml test wallet-client
APTOS: 0.00009842
BTC: 0.1
```

## Token Registry

List coins registered in registry:
```
$ yarn cli -c .aptos/config.yaml show-token-registry
########BTC#######
name: Bitcoin
description: Bitcoin
decimals: 8
logo_url: https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png
project_url: https://bitcoin.org
type: 0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WBTC
delisted: false

########USDC#######
name: USDC
description: USDC
decimals: 8
logo_url: https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png
project_url: https://www.centre.io/
type: 0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WUSDC
delisted: false

########USDT#######
name: USDT
description: Tether
decimals: 8
logo_url: https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg
project_url: https://tether.to/
type: 0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::mock_coin::WUSDT
delisted: false

...
```

## Miscellaneous
You can test the cli with:
```
yarn cli
yarn run v1.22.11
$ node dist/tools/index.js
Usage: hippo-cli [options] [command]

Hippo SDK cli tool.

Options:
  -c, --config <path>                         path to your aptos config.yml (generated with "aptos init")
  -p, --profile <PROFILE>                     aptos config profile to use (default: "default")
  -h, --help                                  display help for command

Commands:
  mock-deploy
  list-modules
  show-token-registry
  show-pools
  hit-faucet <coin-name> <raw-amount>
  show-wallet
  swap <from-coin> <to-coin> <raw-amount-in>
  help [command]                              display help for command
```

You need to provide an aptos config file through `-c` flag. When the node url contains "devnet" in it, the cli tool
automatically picks the deployed devnet contract address.

To get started, try these:
```
yarn cli -c YOUR_CONFIG_FILE test hippo-client
yarn cli -c YOUR_CONFIG_FILE test wallet-client
yarn cli -c YOUR_CONFIG_FILE test wallet-client-faucet BTC 1.1
yarn cli -c YOUR_CONFIG_FILE test wallet-client-faucet USDC 11000
yarn cli -c YOUR_CONFIG_FILE test add-liquidity BTC USDC 1 10000
yarn cli -c YOUR_CONFIG_FILE test swap BTC USDT 0.1
yarn cli -c YOUR_CONFIG_FILE test remove-liquidity BTC USDC 50
yarn cli -c YOUR_CONFIG_FILE test hippo-client
```
