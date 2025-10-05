'use client';

import { useState, useEffect, useRef } from 'react';

export interface TokenEvent {
  name: string;
  symbol: string;
  uri: string;
  mint: string;
}

const DEFAULT_WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://127.0.0.1:8080/connect';

export const useTokenFeed = (wsUrl: string = DEFAULT_WS_URL) => {
  const [tokens, setTokens] = useState<TokenEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevents hook from connecting before mount (Next.js hydration safe)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const connect = () => {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsLoading(false);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const token: TokenEvent = JSON.parse(event.data);
          setTokens((prev) => {
            // Deduplicate by mint
            if (prev.find((t) => t.mint === token.mint)) return prev;
            return [token, ...prev];
          });
        } catch (err) {
          console.error('Failed to parse token event', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error', err);
        setError('WebSocket connection error');
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected, retrying in 1s...');
        retryTimeoutRef.current = setTimeout(connect, 1000);
      };
    };

    connect();

    return () => {
      wsRef.current?.close();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [wsUrl, mounted]);

  return { tokens, isLoading, error };
};
