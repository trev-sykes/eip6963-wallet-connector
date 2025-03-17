import { ethers } from "ethers";
interface WalletInfo {
    info: {
        name: string;
        icon: string;
    };
    provider: any;
}
export declare function useWalletConnect(): {
    availableWallets: WalletInfo[];
    activeWallet: string;
    signer: ethers.Signer | null;
    signerAddress: string;
    walletIconURL: string;
    connectWallet: (walletName: string) => Promise<void>;
    disconnectWallet: () => void;
    connecting: boolean;
    error: string | null;
};
export {};
