// src/wagmi.js
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia, polygonMumbai, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Choose which chains you'd like to show
const chains = [mainnet, polygon, sepolia, polygonMumbai];

const config = getDefaultConfig({
  appName: 'Your App Name',
  projectId: '20b8bb528f3d35108958540b651c7bed', // Get one from https://cloud.walletconnect.com
  chains
});

const queryClient = new QueryClient();

export const WagmiConfig = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};