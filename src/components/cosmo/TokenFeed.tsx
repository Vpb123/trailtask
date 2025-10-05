'use client';

import { Card } from '@/components/ui/card';
import { useTokenFeed } from '@/hooks/useTokenFeed';
import { TokenList } from './TokenList';
import { Loading } from '@/components/common/Loading';
import { ErrorCard } from '@/components/common/ErrorCard';

export const TokenFeed = () => {
  const { tokens, isLoading, error } = useTokenFeed();

  return (
    <Card className="p-6 space-y-4 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold">Live Token Feed</h2>

      {isLoading && <Loading count={5} />}

      {error && <ErrorCard message={error} />}

      {!isLoading && !error && tokens.length === 0 && (
        <p className="text-gray-400">No tokens available yet.</p>
      )}

      {!isLoading && !error && tokens.length > 0 && (
        <TokenList tokens={tokens} />
      )}
    </Card>
  );
};
