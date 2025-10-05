'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transferSchema, TransferFormData } from '@/validations/transferSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ToggleUSD } from './ToggleUSD';
import { useState } from 'react';
import { useSolPrice } from '@/hooks/useSolPrice';
import { useSolTransfer } from '@/hooks/useSolTransfer';
import { toast } from 'sonner';

export const TransferForm = () => {
  const { solPrice } = useSolPrice();
  const { transferSol, isTransferring } = useSolTransfer();
  const [showUSD, setShowUSD] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: { amount: 0, to: '' },
  });

  const watchAmount = watch('amount');

  const onSubmit = async (data: TransferFormData) => {
    try {
      await transferSol({ toAddress: data.to, amount: data.amount });
      toast.success('Transaction sent successfully!');
    } catch {
      toast.error('Transaction failed');
    }
  };

  return (
    <Card className="p-6 space-y-6 w-full max-w-md mx-auto border border-gray-700 rounded-xl bg-gray-900">
      <h2 className="text-2xl font-bold text-white">Send SOL</h2>

      {watchAmount > 0 && (
        <div className="text-center">
          <span className="text-gray-400 text-sm">Estimated Value</span>
          <div className="text-3xl font-bold text-green-400">
            {showUSD ? `$${(watchAmount * solPrice).toFixed(2)}` : `${watchAmount} SOL`}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount Field */}
        <div className="flex flex-col space-y-1">
          <label className="text-gray-300 text-sm">Amount (SOL)</label>
          <Input
            type="number"
            step="0.0001"
            placeholder="0.0"
            className="bg-gray-800 border border-gray-600 text-white focus:border-green-400 focus:ring-0"
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
        </div>

        {/* Wallet Address Field */}
        <div className="flex flex-col space-y-1">
          <label className="text-gray-300 text-sm">To Wallet Address</label>
          <Input
            type="text"
            placeholder="Enter destination address"
            className="bg-gray-100 border border-gray-600 text-white focus:border-green-400 focus:ring-0"
            {...register('to')}
          />
          {errors.to && <span className="text-red-500 text-xs">{errors.to.message}</span>}
        </div>

        {/* Toggle + Button */}
        <div className="flex justify-between items-center">
          <ToggleUSD value={showUSD} onChange={setShowUSD} />
          <Button
            type="submit"
            disabled={isTransferring}
            className="bg-transparent border border-green-400 text-green-400 hover:bg-green-500 hover:text-white transition-colors"
          >
            {isTransferring ? 'Sending...' : 'Send SOL'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
