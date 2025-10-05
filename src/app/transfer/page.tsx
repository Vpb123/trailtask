'use client';

import { TransferForm } from '@/components/transfer/TransferForm';
import { useWallet } from '@/providers/WalletProvider';
import { Button } from '@/components/ui/button';

export const TransferPage = () => {
  const { publicKey, isConnected, connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 space-y-8">
      <div className="flex items-center space-x-2">
        <span
          className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500 animate-pulse'
          }`}
        />
        <span className="text-gray-300 text-sm">
          {isConnected
            ? `Connected: ${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}`
            : 'Wallet not connected'}
        </span>
        {!isConnected && (
          <Button size="sm" variant="default" onClick={connectWallet}>
            Connect
          </Button>
        )}
      </div>

      <h1 className="text-3xl font-bold text-white">Transfer SOL</h1>

      <TransferForm />
    </div>
  );
};

export default TransferPage;
