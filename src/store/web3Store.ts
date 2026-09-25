"use client";

import { create } from "zustand";
import { BrowserProvider, formatEther } from "ethers";

// Extended window interface to include ethereum provider
declare global {
  interface Window {
    ethereum?: any;
  }
}

const BOT_CHAIN_MAINNET = {
  chainId: "0x2A5", // 677 in hex
  chainName: "BOT Chain Mainnet",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet-rpc.botchain.ai"], // Fallback if user doesn't have it
  blockExplorerUrls: ["https://scan.botchain.ai/"],
};

interface Web3State {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;

  connectWallet: () => Promise<void>;
  disconnect: () => void;
  checkConnection: () => Promise<void>;
  switchToBotChain: () => Promise<void>;
}

export const useWeb3Store = create<Web3State>((set, get) => ({
  address: null,
  isConnected: false,
  chainId: null,
  balance: null,
  isConnecting: false,
  error: null,

  connectWallet: async () => {
    try {
      set({ isConnecting: true, error: null });

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask is not installed! Please install it to continue.");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found.");
      }

      const address = accounts[0];
      const provider = new BrowserProvider(window.ethereum);
      
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      const balanceWei = await provider.getBalance(address);
      const balance = formatEther(balanceWei);

      set({
        address,
        isConnected: true,
        chainId,
        balance,
        isConnecting: false,
      });

      // Automatically prompt to switch network if not on BOT Chain Mainnet
      if (chainId !== 677) {
        await get().switchToBotChain();
      }
    } catch (error: any) {
      set({ 
        isConnecting: false, 
        error: error.message || "Failed to connect wallet" 
      });
      console.error("Wallet connection error:", error);
    }
  },

  disconnect: () => {
    set({
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
      error: null,
    });
  },

  checkConnection: async () => {
    if (typeof window === "undefined" || !window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);
        const balanceWei = await provider.getBalance(address);
        const balance = formatEther(balanceWei);

        set({
          address,
          isConnected: true,
          chainId,
          balance,
        });
      }
    } catch (error) {
      console.error("Check connection error:", error);
    }
  },

  switchToBotChain: async () => {
    if (typeof window === "undefined" || !window.ethereum) return;

    try {
      // Try to switch to the BOT Chain Mainnet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BOT_CHAIN_MAINNET.chainId }],
      });
      
      // Update state if successful
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      set({ chainId: Number(network.chainId) });
      
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BOT_CHAIN_MAINNET],
          });
          
          const provider = new BrowserProvider(window.ethereum);
          const network = await provider.getNetwork();
          set({ chainId: Number(network.chainId) });
          
        } catch (addError) {
          console.error("Failed to add BOT Chain:", addError);
        }
      } else {
        console.error("Failed to switch to BOT Chain:", error);
      }
    }
  },
}));

// Set up listeners for account/chain changes outside the store
if (typeof window !== "undefined" && window.ethereum) {
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length === 0) {
      useWeb3Store.getState().disconnect();
    } else {
      // Re-fetch balance and state
      useWeb3Store.getState().checkConnection();
    }
  });

  window.ethereum.on("chainChanged", () => {
    // We can reload the page or optimally just refresh connection state
    window.location.reload();
  });
}
