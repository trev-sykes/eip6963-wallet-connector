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
- **TypeScript**: Recommended for type safety

## Installation

To install `eip6963-wallet-connector`, run the following command:

```bash
npm install eip6963-wallet-connector
```

## Usage

### Basic Integration

Here's how you can integrate `eip6963-wallet-connector` into your React app:

```tsx
import { useWalletConnect } from "eip6963-wallet-connector";

function WalletComponent() {
    const { availableWallets, activeWallet, signerAddress, connectWallet, disconnectWallet } = useWalletConnect();
    
    return (
        <div>
            <h3>Wallet Connection</h3>
            {signerAddress ? (
                <div>
                    <p>Connected Wallet: {activeWallet}</p>
                    <p>Address: {signerAddress}</p>
                    <button onClick={disconnectWallet}>Disconnect</button>
                </div>
            ) : (
                <div>
                    <select onChange={(e) => connectWallet(e.target.value)}>
                        <option value="">Select Wallet</option>
                        {availableWallets.map((wallet) => (
                            <option key={wallet.info.name} value={wallet.info.name}>
                                {wallet.info.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default WalletComponent;
```

## API

`useWalletConnect()` returns the following:

- **availableWallets**: Array of detected wallets.
- **activeWallet**: The name of the currently connected wallet.
- **signer**: An `ethers.Signer` instance for signing transactions.
- **signerAddress**: The connected wallet's address.
- **walletIconURL**: The icon of the connected wallet.
- **connecting**: `true` while the wallet is being connected.
- **error**: Error message if the connection fails.
- **connectWallet(walletName: string)**: Connects to a wallet by name.
- **disconnectWallet()**: Disconnects the current wallet.

### Using the Signer

Once connected, you can use the signer to sign transactions:

```tsx
import { useWalletConnect } from "eip6963-wallet-connector";
import { ethers } from "ethers";

function SendTransaction() {
    const { signer } = useWalletConnect();

    const sendTransaction = async () => {
        if (!signer) return;
        const tx = await signer.sendTransaction({
            to: "0xRecipientAddressHere",
            value: ethers.parseEther("0.01"),
        });
        console.log("Transaction hash:", tx.hash);
    };

    return <button onClick={sendTransaction}>Send 0.01 ETH</button>;
}
```

### State Management Example (Zustand)

If you use Zustand for state management, you can integrate the wallet connection like this:

```tsx
import { create } from "zustand";
import { useWalletConnect } from "eip6963-wallet-connector";

const useMyWalletStore = create((set) => {
    const wallet = useWalletConnect();
    return { ...wallet, customStuff: "foo" };
});
```

## Troubleshooting

- **No wallets detected?** Ensure your wallet supports EIP-6963.
- **Getting "Wallet not found" error?** Make sure the wallet name matches one of `availableWallets`.
- **Transactions failing?** Check if your wallet has enough ETH to cover gas fees.
- **UI not updating?** Ensure your state management correctly handles reactivity.

## License

MIT License. Feel free to contribute or modify!
