# eip6963-wallet-connector

A simple and lightweight wallet connection solution using EIP-6963 and React, designed to seamlessly integrate various Ethereum wallets into your DApp.

## Features

- **Wallet Detection:** Automatically detects available wallets that support EIP-6963.
- **Wallet Connection:** Easily connect and disconnect wallets with a simple interface.
- **Signer Management:** Retrieves and manages wallet signer information.
- **Active Wallet Display:** Displays the currently connected wallet and its address.

## Requirements

To use `eip6963-wallet-connector`, ensure you have the following dependencies installed:

- **React**: >= 17.0.0 (for component-based UI rendering)
- **ethers**: >= 5.0.0 (for Ethereum wallet interactions and signer management)

## Installation

To install `eip6963-wallet-connector`, run the following command:

```bash
npm install eip6963-wallet-connector
```
Below is an example of how to integrate it with a state management solution like Zustand:
````
const useMyWalletStore = create((set) => {
  const wallet = useWalletConnect();
  return { ...wallet, customStuff: "foo" };
});
````
