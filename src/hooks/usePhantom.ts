'use client';
import { useState, useEffect, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { toast } from 'sonner';

// Phantom wallet interface
interface PhantomProvider {
  isPhantom?: boolean;
  publicKey?: PublicKey;
  isConnected?: boolean;
  connect: (opts?: { onlyIfTrusted: boolean }) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: 'connect' | 'disconnect', handler: (arg?: any) => void) => void;
  removeListener: (event: 'connect' | 'disconnect', handler: (arg?: any) => void) => void;
}

// Extend window for Phantom
declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  // Detect Phantom on mount
  useEffect(() => {
    const solana = window.solana;
    if (solana?.isPhantom) {
      setIsPhantomInstalled(true);

      // Auto-connect if already trusted
      solana.connect({ onlyIfTrusted: true })
        .then((resp) => {
          setPublicKey(resp.publicKey);
          setIsConnected(true);
        })
        .catch(() => {
          setIsConnected(false);
        });

      // Event listeners
      const handleConnect = (event: { publicKey: PublicKey }) => {
        setPublicKey(event.publicKey);
        setIsConnected(true);
      };
      const handleDisconnect = () => {
        setPublicKey(null);
        setIsConnected(false);
      };

      solana.on('connect', handleConnect);
      solana.on('disconnect', handleDisconnect);

      return () => {
        solana.removeListener('connect', handleConnect);
        solana.removeListener('disconnect', handleDisconnect);
      };
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!isPhantomInstalled) {
      toast.error('Phantom wallet not installed!');
      return;
    }
    try {
      const resp = await window.solana!.connect();
      setPublicKey(resp.publicKey);
      setIsConnected(true);
      toast.success('Wallet connected!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect wallet');
    }
  }, [isPhantomInstalled]);

  const disconnectWallet = useCallback(async () => {
    if (!isPhantomInstalled) return;
    try {
      await window.solana!.disconnect();
      setPublicKey(null);
      setIsConnected(false);
      toast('Wallet disconnected');
    } catch (err) {
      console.error(err);
      toast.error('Failed to disconnect wallet');
    }
  }, [isPhantomInstalled]);

  return { publicKey, isConnected, isPhantomInstalled, connectWallet, disconnectWallet };
};
