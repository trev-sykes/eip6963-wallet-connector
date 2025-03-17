# @trev0sykes/quick-connect

A simple and powerful wallet connection solution using EIP-6963 and React, designed to seamlessly integrate various Ethereum wallets into your DApp.

## Features

- **Wallet Detection:** Automatically detects available wallets that support EIP-6963.
- **Wallet Connection:** Easily connect and disconnect wallets with a simple interface.
- **Signer Management:** Retrieves and manages wallet signer information.
- **Active Wallet Display:** Display the currently connected wallet and its address.

## Installation

To install **@trev0sykes/quick-connect**, run the following command:

```bash
npm install @trev0sykes/quick-connect


example of how you can use it in a state management 
````
const useMyWalletStore = create((set) => {
  const wallet = useWalletConnect();
  return { ...wallet, customStuff: "foo" };
});
````