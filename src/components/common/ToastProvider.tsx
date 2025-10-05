// src/components/ui/ToastProvider.tsx
'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface Props {
  children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        duration={4000}
        closeButton
      />
    </>
  );
};
