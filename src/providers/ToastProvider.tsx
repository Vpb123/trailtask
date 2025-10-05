// src/components/ui/ToastProvider.tsx
'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#1a1a1a', color: '#fff', fontWeight: 500 },
        }}
      />
    </>
  );
};
