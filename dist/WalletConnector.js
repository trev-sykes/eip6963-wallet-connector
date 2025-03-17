import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useWalletConnect } from "./useEIP6963WalletConnect";
import { useState } from "react";
export function WalletConnector() {
    const [isHovered, setIsHovered] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    // Move this up so connecting and error are available for styles
    const { availableWallets, activeWallet, signerAddress, walletIconURL, connectWallet, disconnectWallet, connecting, error, } = useWalletConnect();
    // Enhanced Styles with animations
    const imageStyleProps = {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isConnected ? "scale(1.1)" : "scale(1)",
        boxShadow: isConnected ? "0 0 10px rgba(76, 175, 80, 0.5)" : "none",
    };
    const buttonStyle = {
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
    const buttonHoverStyle = {
        background: "linear-gradient(135deg, #45a049 0%, #276d2a 100%)",
        boxShadow: "0 6px 20px rgba(76, 175, 80, 0.5)",
    };
    const containerStyle = {
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
    const selectStyle = {
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
    const addressStyle = {
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
    const headerStyle = {
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "1.5rem",
        color: "#2e7d32",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    };
    const errorStyle = {
        margin: "10px 0",
        fontSize: "14px",
        color: "#d32f2f",
        fontStyle: "italic",
    };
    const handleConnect = (walletName) => {
        connectWallet(walletName).then(() => setIsConnected(true));
    };
    const handleDisconnect = () => {
        disconnectWallet();
        setIsConnected(false);
        setIsHovered(false);
    };
    const getButtonStyle = () => (Object.assign(Object.assign({}, buttonStyle), (isHovered ? buttonHoverStyle : {})));
    return (_jsxs("div", { style: containerStyle, children: [_jsx("h3", { style: headerStyle, children: connecting ? "Connecting..." : isConnected ? "Connected" : "Connect Wallet" }), signerAddress ? (_jsxs("div", { style: { animation: "fadeIn 0.5s ease-in-out" }, children: [_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "12px",
                        }, children: [_jsx("img", { src: walletIconURL, alt: "wallet icon", style: imageStyleProps }), _jsx("p", { style: { margin: 0, fontWeight: "600", fontSize: "16px", color: "#444" }, children: activeWallet })] }), _jsxs("p", { style: addressStyle, children: ["Address: ", signerAddress] }), _jsx("button", { onClick: handleDisconnect, style: getButtonStyle(), onMouseOver: () => setIsHovered(true), onMouseOut: () => setIsHovered(false), children: "Disconnect" })] })) : (_jsx("div", { style: { animation: "slideUp 0.5s ease-out" }, children: availableWallets.length === 0 ? (_jsx("p", { style: { fontSize: "16px", color: "#888", fontStyle: "italic" }, children: "No wallets detected \uD83D\uDE15" })) : connecting ? (_jsx("p", { style: { fontSize: "16px", color: "#555" }, children: "Please approve in your wallet..." })) : (_jsxs(_Fragment, { children: [error && _jsx("p", { style: errorStyle, children: error }), _jsxs("select", { onChange: (e) => handleConnect(e.target.value), style: selectStyle, onFocus: (e) => (e.target.style.borderColor = "#4CAF50"), onBlur: (e) => (e.target.style.borderColor = "#ddd"), children: [_jsx("option", { value: "", children: "Choose Your Wallet" }), availableWallets.map((wallet) => (_jsx("option", { value: wallet.info.name, children: wallet.info.name }, wallet.info.name)))] })] })) })), _jsx("style", { children: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        ` })] }));
}
