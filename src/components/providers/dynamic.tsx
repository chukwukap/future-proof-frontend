"use client";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia } from "viem/chains";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "b50b74f7-74c0-4e1a-b6d1-aa94595ca609",
        walletConnectors: [EthereumWalletConnectors],
        walletConnectPreferredChains: [`eip155:${baseSepolia.id}`],
        recommendedWallets: [
          {
            walletKey: "coinbase",
          },
        ],
        newToWeb3WalletChainMap: {
          primary_chain: "evm",
          wallets: {
            evm: "coinbase",
          },
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <DynamicWidget />
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
