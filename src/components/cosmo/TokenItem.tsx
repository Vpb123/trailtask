'use client';

import { TokenEvent } from '@/hooks/useTokenFeed';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  token: TokenEvent;
}

export const TokenItem = ({ token }: Props) => {
  const [imgError, setImgError] = useState(false);

  // Fallback to symbol if image fails
  const renderAvatar = () => {
    if (imgError || !token.uri) {
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white font-bold rounded-lg">
          {token.symbol.slice(0, 2).toUpperCase()}
        </div>
      );
    }

    return (
      <Image
        src={token.uri}
        alt={token.name}
        width={48}
        height={48}
        className="rounded-lg object-cover"
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <div className="flex items-center p-3 space-x-10 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors border border-gray-800">
      {/* Avatar */}
      {renderAvatar()}

      {/* Token Info */}
      <div className="flex flex-col overflow-hidden">
        <span className="font-semibold text-white truncate">{token.name}</span>
        <span className="text-sm text-gray-400 truncate">{token.symbol}</span>
        <span className="text-xs text-gray-500 font-mono truncate">
          {token.mint}
        </span>
      </div>
    </div>
  );
};
