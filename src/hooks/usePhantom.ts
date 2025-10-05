'use client';
import { useState, useEffect, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { toast } from 'sonner';

declare global {
  interface Window {
    solana?: any;
  }
}

export const usePhantom = () => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  // Run only on client
  useEffect(() => {
    setIsPhantomInstalled(!!window.solana?.isPhantom);
  }, []);

  const connectWallet = useCallback(async () => {
    if (!isPhantomInstalled) {
      toast.error('Phantom wallet not installed!');
      return;
    }
    try {
      const resp = await window.solana.connect();
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
    await window.solana.disconnect();
    setPublicKey(null);
    setIsConnected(false);
    toast('Wallet disconnected');
  }, [isPhantomInstalled]);

  useEffect(() => {
    if (!isPhantomInstalled) return;

    const handleConnect = (event: { publicKey: PublicKey }) => {
      setPublicKey(event.publicKey);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setPublicKey(null);
      setIsConnected(false);
    };

    window.solana.on?.('connect', handleConnect);
    window.solana.on?.('disconnect', handleDisconnect);

    return () => {
      window.solana?.removeListener?.('connect', handleConnect);
      window.solana?.removeListener?.('disconnect', handleDisconnect);
    };
  }, [isPhantomInstalled]);

  return { publicKey, isConnected, isPhantomInstalled, connectWallet, disconnectWallet };
};
