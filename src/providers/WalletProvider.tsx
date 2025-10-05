"use client"
import { createContext, useContext } from 'react';
import { PropsWithChildren } from 'react';
import { usePhantom } from '@/hooks/usePhantom';

const WalletContext = createContext<any | undefined>(undefined);

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const wallet = usePhantom();
  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
