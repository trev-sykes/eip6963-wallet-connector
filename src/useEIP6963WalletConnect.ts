import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface WalletInfo {
    info: { name: string; icon: string };
    provider: any;
}

export function useWalletConnect() {
    const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [signerAddress, setSignerAddress] = useState<string>("");
    const [activeWallet, setActiveWallet] = useState<string>("");
    const [walletIconURL, setWalletIconURL] = useState<string>("");
    const [connecting, setConnecting] = useState<boolean>(false); // New state
    const [error, setError] = useState<string | null>(null); // New state for errors

    useEffect(() => {
        const wallets: WalletInfo[] = [];
        const handler = (event: any) => wallets.push(event.detail);

        window.addEventListener("eip6963:announceProvider", handler);
        window.dispatchEvent(new Event("eip6963:requestProvider"));

        setTimeout(() => {
            window.removeEventListener("eip6963:announceProvider", handler);
            setAvailableWallets(wallets);
        }, 2000);
    }, []);

    const connectWallet = async (walletName: string) => {
        setConnecting(true); // Start connecting state
        setError(null); // Clear previous errors
        try {
            const walletInfo = availableWallets.find((w) => w.info.name === walletName);
            if (!walletInfo) {
                throw new Error(`Wallet "${walletName}" not found`);
            }

            const provider = walletInfo.provider;
            await provider.request({ method: "eth_requestAccounts" }); // This can be rejected

            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();
            const signerAddress = await signer.getAddress();
            const walletIconURL = walletInfo.info.icon;

            setProvider(ethersProvider);
            setSigner(signer);
            setSignerAddress(signerAddress);
            setActiveWallet(walletName);
            setWalletIconURL(walletIconURL);

            provider.on("accountsChanged", async () => {
                const newSigner = await ethersProvider.getSigner();
                const newSignerAddress = await newSigner.getAddress();
                setSigner(newSigner);
                setSignerAddress(newSignerAddress);
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to connect wallet");
        } finally {
            setConnecting(false); // End connecting state, success or fail
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setSignerAddress("");
        setActiveWallet("");
        setWalletIconURL("");
        setError(null); // Clear errors on disconnect
    };

    return {
        availableWallets,
        activeWallet,
        signer,
        signerAddress,
        walletIconURL,
        connectWallet,
        disconnectWallet,
        connecting, // Expose connecting state
        error, // Expose error state
    };
}