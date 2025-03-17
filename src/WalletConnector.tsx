import { useWalletConnect } from "./useEIP6963WalletConnect";
import { CSSProperties, useState } from "react";

export function QuickWallet() {
    const [isHovered, setIsHovered] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // Move this up so connecting and error are available for styles
    const {
        availableWallets,
        activeWallet,
        signerAddress,
        walletIconURL,
        connectWallet,
        disconnectWallet,
        connecting,
        error,
    } = useWalletConnect();

    // Enhanced Styles with animations
    const imageStyleProps: CSSProperties = {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isConnected ? "scale(1.1)" : "scale(1)",
        boxShadow: isConnected ? "0 0 10px rgba(76, 175, 80, 0.5)" : "none",
    };

    const buttonStyle: CSSProperties = {
        padding: "10px 20px",
        background: "linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "700",
        transition: "all 0.4s ease",
        boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    };

    const buttonHoverStyle: CSSProperties = {
        background: "linear-gradient(135deg, #45a049 0%, #276d2a 100%)",
        boxShadow: "0 6px 20px rgba(76, 175, 80, 0.5)",
    };

    const containerStyle: CSSProperties = {
        padding: "2rem",
        border: "1px solid rgba(204, 204, 204, 0.2)",
        borderRadius: "12px",
        maxWidth: "400px",
        minWidth: "300px",
        background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isConnected ? "scale(1.02)" : "scale(1)",
    };

    const selectStyle: CSSProperties = {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "16px",
        width: "100%",
        marginTop: "12px",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
        opacity: connecting ? 0.5 : 1, // Now safe to use
        pointerEvents: connecting ? "none" : "auto", // Now safe to use
    };

    const addressStyle: CSSProperties = {
        margin: "10px 0",
        fontSize: "14px",
        color: "#333",
        fontFamily: "monospace",
        backgroundColor: "#eef7ee",
        padding: "8px",
        borderRadius: "6px",
        wordBreak: "break-all",
        transition: "opacity 0.3s ease",
        opacity: isConnected ? 1 : 0.8,
    };

    const headerStyle: CSSProperties = {
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "1.5rem",
        color: "#2e7d32",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    };

    const errorStyle: CSSProperties = {
        margin: "10px 0",
        fontSize: "14px",
        color: "#d32f2f",
        fontStyle: "italic",
    };

    const handleConnect = (walletName: string) => {
        connectWallet(walletName).then(() => setIsConnected(true));
    };

    const handleDisconnect = () => {
        disconnectWallet();
        setIsConnected(false);
        setIsHovered(false);
    };

    const getButtonStyle = (): CSSProperties => ({
        ...buttonStyle,
        ...(isHovered ? buttonHoverStyle : {}),
    });

    return (
        <div style={containerStyle}>
            <h3 style={headerStyle}>
                {connecting ? "Connecting..." : isConnected ? "Connected" : "Connect Wallet"}
            </h3>

            {signerAddress ? (
                <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "12px",
                        }}
                    >
                        <img src={walletIconURL} alt="wallet icon" style={imageStyleProps} />
                        <p style={{ margin: 0, fontWeight: "600", fontSize: "16px", color: "#444" }}>
                            {activeWallet}
                        </p>
                    </div>
                    <p style={addressStyle}>Address: {signerAddress}</p>
                    <button
                        onClick={handleDisconnect}
                        style={getButtonStyle()}
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <div style={{ animation: "slideUp 0.5s ease-out" }}>
                    {availableWallets.length === 0 ? (
                        <p style={{ fontSize: "16px", color: "#888", fontStyle: "italic" }}>
                            No wallets detected 😕
                        </p>
                    ) : connecting ? (
                        <p style={{ fontSize: "16px", color: "#555" }}>Please approve in your wallet...</p>
                    ) : (
                        <>
                            {error && <p style={errorStyle}>{error}</p>}
                            <select
                                onChange={(e) => handleConnect(e.target.value)}
                                style={selectStyle}
                                onFocus={(e) => (e.target.style.borderColor = "#4CAF50")}
                                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                            >
                                <option value="">Choose Your Wallet</option>
                                {availableWallets.map((wallet) => (
                                    <option key={wallet.info.name} value={wallet.info.name}>
                                        {wallet.info.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </div>
            )}

            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
            </style>
        </div>
    );
}