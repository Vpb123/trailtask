'use client';

import { useState, useCallback } from 'react';
import { PublicKey, Transaction, SystemProgram, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'sonner';

interface TransferParams {
  toAddress: string;
  amount: number; // in SOL
}

interface UseSolTransferReturn {
  isTransferring: boolean;
  error: string | null;
  transferSol: (params: TransferParams) => Promise<void>;
}

const DEVNET_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC!;

export const useSolTransfer = (): UseSolTransferReturn => {
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transferSol = useCallback(async ({ toAddress, amount }: TransferParams) => {
    if (!window.solana?.isPhantom) {
      toast.error('Phantom wallet is not installed!');
      return;
    }

    try {
      setIsTransferring(true);
      setError(null);

      // Validate recipient
      let recipientPubKey: PublicKey;
      try {
        recipientPubKey = new PublicKey(toAddress);
      } catch {
        throw new Error('Invalid wallet address');
      }

      const connection = new Connection(DEVNET_RPC);

      // Convert SOL to lamports
      const lamports = Math.round(amount * LAMPORTS_PER_SOL);

      // Build transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: window.solana.publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      // Request Phantom to sign the transaction
      const { signature } = await window.solana.signAndSendTransaction(transaction);

      // Confirm transaction
      await connection.confirmTransaction(signature, 'confirmed');

      toast.success(`Successfully sent ${amount} SOL to ${toAddress}`);
    } catch (err: unknown) {
      console.error('Transfer failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Transfer failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsTransferring(false);
    }
  }, []);

  return { isTransferring, error, transferSol };
};
