# ETH Token Exchange

A minimal DEX (Decentralized Exchange) architecture. This project implements a smart contract "Vending Machine" that holds a reserve of tokens and ETH, allowing users to trade between the two assets based on a fixed exchange rate.

## 💱 Features
- **Buy Tokens**: Send ETH to receive Custom Tokens.
- **Sell Tokens**: Approve and transfer Tokens to receive ETH.
- **Owner Liquidity**: The admin can withdraw funds or add more tokens to the pool.
- **Live Rates**: UI updates based on contract reserves.

## ⚙️ Logic
[Image of token swap smart contract logic]

- **Exchange Rate**: 1 ETH = 100 Tokens.
- **Liquidity**: The contract must be funded with Tokens by the deployer to facilitate "Buy" orders.

## 🚀 Usage Guide

1. **Install**
   ```bash
   npm install
