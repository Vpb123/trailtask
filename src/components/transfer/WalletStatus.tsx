'use client';

import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useWallet } from '@/providers/WalletProvider';

export const WalletStatus = () => {
const { publicKey, isConnected, connectWallet, disconnectWallet, isPhantomInstalled } = useWallet();
  if (!isPhantomInstalled) {
    return (
      <Button variant="destructive" size="sm" onClick={() => window.open('https://phantom.app/', '_blank')}>
        Install Phantom
      </Button>
    );
  }

  return isConnected && publicKey ? (
    <div className="flex items-center space-x-2">
      <Avatar className="bg-gray-700 w-6 h-6" />
      <span className="font-mono text-sm text-white">
        {`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`}
      </span>
      <Button variant="outline" size="sm" onClick={disconnectWallet}>
        Disconnect
      </Button>
    </div>
  ) : (
    <Button variant="default" size="sm" onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
};
