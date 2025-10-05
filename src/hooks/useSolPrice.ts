'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSolPrice = (pollInterval: number = 60000) => {
  const [solPrice, setSolPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async () => {
    try {
      const COINGECKO_API = process.env.NEXT_PUBLIC_COINGECKO!;
      const res = await axios.get(
        `${COINGECKO_API}/simple/price?ids=solana&vs_currencies=usd`
      );
      const price = res.data.solana.usd;
      setSolPrice(price);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch SOL price:', err);
      setError('Failed to fetch SOL price');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(() => {
      fetchPrice();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [pollInterval]);

  return { solPrice, isLoading, error };
};
