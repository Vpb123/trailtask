'use client';

import { TokenFeed } from '@/components/cosmo/TokenFeed';

export default function CosmoPage() {
  return (
    <main className="h-[87vh] bg-gray-950 p-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <header className="mb-2">
          <h1 className="text-4xl font-bold text-white">Cosmo</h1>
          <p className="text-gray-400 mt-1">
            Live feed of newly created Solana tokens.
          </p>
        </header>

        <TokenFeed />
      </div>
    </main>
  );
}
