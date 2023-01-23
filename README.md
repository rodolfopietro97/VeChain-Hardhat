# VeChain HardHat boilperplate project
This repo contains a boilerplate Hardhat project able to deploy Smart Contracts into VeChain network.

# How to
## 1. Install project and dependencies
```bash
npm install
```


## 2. Compile your Smart Contracts

```bash
npx hardhat compile
```

If all goes ok you will have an **/artifacts** folder.


## 3. Edit configuration for deploy

Go to **./scripts/deployVeChain.ts** file and edit the following variables:

```typescript
/**
 * Mnemonics to use for sign and deploy contract
 * 
 * This is a test account :D
 */
const MNEMONICS = [
    'vivid',
    'any',
    'call',
    'mammal',
    'mosquito',
    'budget',
    'midnight',
    'expose',
    'spirit',
    'approve',
    'reject',
    'system'
]

/**
 * Address of a node
 */
const NETWORK_URL = 'https://testnet.veblocks.net/'

/**
 * URL of a delegate (and decide if use a delegate or not)
 */
const DELEGATE_URL = "https://sponsor-testnet.vechain.energy/by/90"
const USE_SPONSOR = true

/**
 * URL of block explorer
 */
const EXPLORER_URL = "https://explore-testnet.vechain.org/"

/**
 * Enable verbose mode
 */
const VERBOSE = true

/**
 * Name of smart contract to deploy (WITHOUT .sol)
 */
const CONTRACT_NAME = "Test"
```


## 4. You are ready to deploy!
```bash
npx hardhat run ./scripts/deployVeChain.ts
```
