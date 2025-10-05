'use client';

import { useEffect, useState } from 'react';
import { TransferForm } from '@/components/transfer/TransferForm';
import { Button } from '@/components/ui/button';

export const TransferPage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const checkPhantom = async () => {
      if (window.solana?.isPhantom) {
        try {
          const resp = await window.solana.connect({ onlyIfTrusted: true });
          setWalletConnected(true);
          setPublicKey(resp.publicKey.toString());
        } catch (err) {
          setWalletConnected(false);
        }
      } else {
        setWalletConnected(false);
      }
    };
    checkPhantom();
  }, []);

  const handleConnect = async () => {
    if (!window.solana) return;
    try {
      const resp = await window.solana.connect();
      setWalletConnected(true);
      setPublicKey(resp.publicKey.toString());
    } catch (err) {
      setWalletConnected(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 space-y-8">
      <div className="relative top-0 right-0 flex items-center space-x-2">
        <span
          className={`w-3 h-3 rounded-full ${
            walletConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500 animate-pulse'
          }`}
        />
        <span className="text-gray-300 text-sm">
          {walletConnected
            ? `Connected: ${publicKey?.slice(0, 4)}...${publicKey?.slice(-4)}`
            : 'Wallet not connected'}
        </span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white">Transfer SOL</h1>

      {/* Transfer Form */}
      <TransferForm />
    </div>
  );
};

export default TransferPage;
