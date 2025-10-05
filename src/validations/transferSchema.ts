import { z } from 'zod';
import { PublicKey } from '@solana/web3.js';

export const transferSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0'),
  to: z
    .string()
    .refine((val) => {
      try {
        new PublicKey(val);
        return true;
      } catch {
        return false;
      }
    }, 'Invalid Solana wallet address'),
});

export type TransferFormData = z.infer<typeof transferSchema>;
