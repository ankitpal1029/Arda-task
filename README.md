## Setting up

- make a copy of `.env.example` rename it to `.env` and fill the fields.
- do `yarn`
- initialize database: `yarn knex migrate:latest`
- `yarn start`

Use `index.js` in `client-reference` to make calls to the api.

## Side note

I tried populating the transaction on the server side and get it signed on the client but for some reason
this didn't work.

Token Addresses i've used:
YANGIT_ERC20=0xC77f633E052077924f3fA224522e350229361770
ANOTHER_ERC20=0xdB95f9A0075DFCd1508ddb504Db3E9E4cFB1662A
Address that gave the approvals=0x657D3C03e450E4815f3411Aa26713A2A90e9Ad83

# TASK

The goal is to expose a couple of APIs that do the following:

## Allowance API

1. Takes an address as the input
2. Return the set of ERC20 allowances that the address has provided

### Implementation

We can use public RPC providers like Ankr to make the smart contract read calls.
The solution space of the supported number of ERC20 addresses can be constrained.

## Update Allowance API

1. Sets the allowances the address had provided, back to 0

### Implementation

This involves investigation of how to set the allowances in a non-custodial way.
Testing on Goerli should also be okay for this.
