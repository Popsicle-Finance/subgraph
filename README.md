# Popsicle Finance Subgraph

## Installation

```bash
$ yarn
$ yarn prepare:selected network
$ yarn codegen
```

## Running the app

```bash
$ make up
$ make create-local
$ make deploy-local

Testing:  http://localhost:8000/subgraphs/name/abracadabra-subgraph/graphql

```

## Supported networks

Popsicle Finance works on networks such as `Ethereum` and `Arbitrum`.
You can see the configurations for each network here `./deployments/*.json`;

## Methods that are tracked

```
PopsicleV3Optimizer
└── events
    └── Deposit(indexed address,uint256,uint256,uint256)
    └── CollectFees(uint256,uint256,uint256,uint256)
```

## Deployment

### TheGraph Studio

Set the authorization code that links your account on thegraph.com:

```bash
yarn auth <access-token>
```

Deploy the subgraph to the [TheGraph Studio](https://thegraph.com/studio/):

```bash
yarn deploy <subgraph-name>
```
