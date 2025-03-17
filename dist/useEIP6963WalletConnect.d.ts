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
    signer: any;
    signerAddress: string;
    walletIconURL: string;
    connectWallet: (walletName: string) => Promise<void>;
    disconnectWallet: () => void;
};
export {};
