'use client';

import { useState, useEffect, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { toast } from 'sonner';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      publicKey?: PublicKey;
      connect?: () => Promise<{ publicKey: PublicKey }>;
      disconnect?: () => Promise<void>;
      on?: (
        event: 'connect' | 'disconnect',
        handler: (args: { publicKey?: PublicKey }) => void
      ) => void;
      removeListener?: (
        event: 'connect' | 'disconnect',
        handler: (args: { publicKey?: PublicKey }) => void
      ) => void;
    };
  }
}

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const isPhantomInstalled = !!window.solana?.isPhantom;

  const connectWallet = useCallback(async () => {
    if (!isPhantomInstalled) {
      toast.error('Phantom wallet not installed!');
      return;
    }

    try {
      const resp = await window.solana!.connect!();
      setPublicKey(resp.publicKey);
      setIsConnected(true);
      toast.success('Wallet connected!');
    } catch (err) {
      console.error('Wallet connection error:', err);
      toast.error('Failed to connect wallet');
    }
  }, [isPhantomInstalled]);

  const disconnectWallet = useCallback(async () => {
    if (!isPhantomInstalled) return;
    try {
      await window.solana!.disconnect!();
      setPublicKey(null);
      setIsConnected(false);
      toast('Wallet disconnected');
    } catch (err) {
      console.error('Wallet disconnect error:', err);
      toast.error('Failed to disconnect wallet');
    }
  }, [isPhantomInstalled]);

  useEffect(() => {
    if (!isPhantomInstalled) return;

    const handleConnect = (event: { publicKey?: PublicKey }) => {
      setPublicKey(event.publicKey || null);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setPublicKey(null);
      setIsConnected(false);
    };

    if (window.solana) {
      window.solana.on?.('connect', handleConnect);
      window.solana.on?.('disconnect', handleDisconnect);
    }

    return () => {
      window.solana?.removeListener?.('connect', handleConnect);
      window.solana?.removeListener?.('disconnect', handleDisconnect);
    };
  }, [isPhantomInstalled]);

  return {
    publicKey,
    isConnected,
    isPhantomInstalled,
    connectWallet,
    disconnectWallet,
  };
};
