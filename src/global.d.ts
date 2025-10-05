import { PublicKey } from '@solana/web3.js';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      publicKey?: PublicKey;
      connect?: () => Promise<{ publicKey: PublicKey }>;
      disconnect?: () => Promise<void>;
      on?: (event: 'connect' | 'disconnect', handler: (args: { publicKey?: PublicKey }) => void) => void;
      removeListener?: (event: 'connect' | 'disconnect', handler: (args: { publicKey?: PublicKey }) => void) => void;
    };
  }
}

export {};
