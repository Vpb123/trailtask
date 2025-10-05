'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TokenItem } from './TokenItem';
import { TokenEvent } from '@/hooks/useTokenFeed';

interface Props {
  tokens: TokenEvent[];
}

export const TokenList = ({ tokens }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90, // adjust height per TokenItem
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-[400px] w-full overflow-auto bg-gray-900 rounded-md p-1"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const token = tokens[virtualRow.index];
          return (
            <div
              key={token.mint}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <TokenItem token={token} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
