'use client';

import { Card } from '@/components/ui/card';

export const ErrorCard = ({ message }: { message: string }) => {
  return (
    <Card className="bg-red-800 text-white p-4 rounded-lg">
      <p className="font-medium">Error: {message}</p>
    </Card>
  );
};
