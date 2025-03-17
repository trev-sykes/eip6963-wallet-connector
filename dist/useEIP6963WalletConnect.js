var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import { ethers } from "ethers";
export function useWalletConnect() {
    const [availableWallets, setAvailableWallets] = useState([]);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [signerAddress, setSignerAddress] = useState("");
    const [activeWallet, setActiveWallet] = useState("");
    const [walletIconURL, setWalletIconURL] = useState("");
    const [connecting, setConnecting] = useState(false); // New state
    const [error, setError] = useState(null); // New state for errors
    useEffect(() => {
        const wallets = [];
        const handler = (event) => wallets.push(event.detail);
        window.addEventListener("eip6963:announceProvider", handler);
        window.dispatchEvent(new Event("eip6963:requestProvider"));
        setTimeout(() => {
            window.removeEventListener("eip6963:announceProvider", handler);
            setAvailableWallets(wallets);
        }, 2000);
    }, []);
    const connectWallet = (walletName) => __awaiter(this, void 0, void 0, function* () {
        setConnecting(true); // Start connecting state
        setError(null); // Clear previous errors
        try {
            const walletInfo = availableWallets.find((w) => w.info.name === walletName);
            if (!walletInfo) {
                throw new Error(`Wallet "${walletName}" not found`);
            }
            const provider = walletInfo.provider;
            yield provider.request({ method: "eth_requestAccounts" }); // This can be rejected
            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = yield ethersProvider.getSigner();
            const signerAddress = yield signer.getAddress();
            const walletIconURL = walletInfo.info.icon;
            setProvider(ethersProvider);
            setSigner(signer);
            setSignerAddress(signerAddress);
            setActiveWallet(walletName);
            setWalletIconURL(walletIconURL);
            provider.on("accountsChanged", () => __awaiter(this, void 0, void 0, function* () {
                const newSigner = yield ethersProvider.getSigner();
                const newSignerAddress = yield newSigner.getAddress();
                setSigner(newSigner);
                setSignerAddress(newSignerAddress);
            }));
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Failed to connect wallet");
        }
        finally {
            setConnecting(false); // End connecting state, success or fail
        }
    });
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
