'use client';

import { useState, useEffect, useRef } from 'react';

export interface TokenEvent {
  name: string;
  symbol: string;
  uri: string;
  mint: string;
}
const webSocketUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://127.0.0.1:8080/connect';
export const useTokenFeed = (wsUrl: string = webSocketUrl) => {
  const [tokens, setTokens] = useState<TokenEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsLoading(false);
    };

    ws.onmessage = (event) => {
      try {
        const token: TokenEvent = JSON.parse(event.data);

        // Deduplicate by mint
        setTokens((prev) => {
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
      setIsLoading(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  return { tokens, isLoading, error };
};
