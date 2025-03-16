import { useState, useEffect } from "react";
import { ethers } from "ethers";


interface WalletInfo {
    info: { name: string };
    provider: any;
}

export function useWalletConnect() {
    const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
    const [provider, setProvider] = useState<any>(null);
    const [signer, setSigner] = useState<any>(null);
    const [signerAddress, setSignerAddress] = useState<string>("");
    const [activeWallet, setActiveWallet] = useState<string>("");

    // Detect wallets using EIP-6963
    useEffect(() => {
        const wallets: WalletInfo[] = [];

        const handler = (event: any) => {
            wallets.push(event.detail);
        };

        window.addEventListener("eip6963:announceProvider", handler);
        window.dispatchEvent(new Event("eip6963:requestProvider"));

        setTimeout(() => {
            window.removeEventListener("eip6963:announceProvider", handler);
            setAvailableWallets(wallets);
        }, 2000);
    }, []);

    // Set the active wallet and create a signer
    const connectWallet = async (walletName: string) => {
        const walletInfo = availableWallets.find((w) => w.info.name === walletName);
        if (!walletInfo) {
            console.error("Selected wallet not found:", walletName);
            return;
        }

        const provider = walletInfo.provider;
        await provider.request({ method: "eth_requestAccounts" });

        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        const signerAddress = await signer.getAddress();

        setProvider(ethersProvider);
        setSigner(signer);
        setSignerAddress(signerAddress);
        setActiveWallet(walletName);

        // Listen for account changes
        provider.on("accountsChanged", async () => {
            const newSigner = await ethersProvider.getSigner();
            const newSignerAddress = await newSigner.getAddress();
            setSigner(newSigner);
            setSignerAddress(newSignerAddress);
        });
    };

    // Clear wallet state
    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setSignerAddress("");
        setActiveWallet("");
    };

    return {
        availableWallets,
        activeWallet,
        signer,
        signerAddress,
        connectWallet,
        disconnectWallet,
    };
}
