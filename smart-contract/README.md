## Proof of Taste

A decentralized content curation platform where users can submit and vote on social media content, with daily rewards distributed to top-ranked posts.

## How It Works

### Submission & Voting
- Users submit posts by providing a content URL and paying a 0.01 ETH submission fee
- Each submission automatically receives 1 vote from the creator
- Other users can vote by paying a 0.001 ETH voting fee
- All fees contribute to the daily reward pool

### Rewards Distribution
Daily rewards are distributed to the top 5 posts based on vote count:
- 1st place: 40% of daily pool
- 2nd place: 30% of daily pool
- 3rd place: 15% of daily pool
- 4th place: 10% of daily pool
- 5th place: 5% of daily pool

### Security Features
- One vote per address per post
- Daily rewards are automatically distributed
- Admin controls for emergency situations
- Posts must be active to receive votes
- Rewards can only be claimed once

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Local Development

```shell
# Install dependencies
$ forge install

# Start local node
$ anvil

# Deploy contract
$ forge script script/Deploy.s.sol:DeployScript --rpc-url localhost --private-key <your_private_key>

# Run tests
$ forge test
```

### Interacting with Contract

```shell
# Submit a post (0.01 ETH required)
$ cast send <contract_address> "submitPost(string)" "<content_url>" --value 0.01ether

# Vote on a post (0.001 ETH required)
$ cast send <contract_address> "vote(uint256)" <post_id> --value 0.001ether

# View top posts for a day
$ cast call <contract_address> "getTopPosts(uint256)" <day_number>
```

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
