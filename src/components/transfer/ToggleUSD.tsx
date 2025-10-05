'use client';

import { Switch } from '@/components/ui/switch';

interface ToggleUSDProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

export const ToggleUSD = ({ value, onChange }: ToggleUSDProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-300 text-sm">SOL</span>
      <Switch checked={value} onCheckedChange={onChange} />
      <span className="text-gray-300 text-sm">USD</span>
    </div>
  );
};
