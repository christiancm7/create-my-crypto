"use client";

import React, { useMemo } from "react";
import { ThemeProvider } from "next-themes";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  // Add other Solana wallet adapters as needed
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Import Solana wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

const config = getDefaultConfig({
  appName: "Create My Crypto",
  projectId: "dcd1fdec761d64ad3aefca904a32d776",
  chains: [mainnet, base],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // Use devnet for Solana
  const network = WalletAdapterNetwork.Devnet;

  // You can add more wallet adapters here
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      // Add other wallet adapters here
    ],
    [network]
  );

  // Use the RPC URL from environment variables, falling back to clusterApiUrl if not set
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl(network),
    [network]
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
