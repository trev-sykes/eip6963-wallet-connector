import React from "react";
import { useWalletConnect } from "./useEIP6963WalletConnect";

export function WalletSelector() {
    const { availableWallets, activeWallet, signerAddress, connectWallet, disconnectWallet } =
        useWalletConnect();

    return (
        <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "300px" }}>
            <h3>Wallet Selector</h3>

            {signerAddress ? (
                <>
                    <p>Connected: {activeWallet}</p>
                    <p>Address: {signerAddress}</p>
                    <button onClick={disconnectWallet}>Disconnect</button>
                </>
            ) : (
                <>
                    {availableWallets.length === 0 ? (
                        <p>No wallets detected</p>
                    ) : (
                        <select onChange={(e) => connectWallet(e.target.value)}>
                            <option value="">Select a Wallet</option>
                            {availableWallets.map((wallet) => (
                                <option key={wallet.info.name} value={wallet.info.name}>
                                    {wallet.info.name}
                                </option>
                            ))}
                        </select>
                    )}
                </>
            )}
        </div>
    );
}
