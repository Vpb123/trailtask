import './globals.css';
import { ReactNode } from 'react';
import { QueryProvider } from '@/providers/QueryProvider';
import { ToastProvider } from '@/components/common/ToastProvider';
import Header from '@/components/layout/Header';
import { WalletProvider } from '@/providers/WalletProvider';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <WalletProvider>
        <QueryProvider>
          <ToastProvider>
            <Header />
            <main className="p-4">{children}</main>
          </ToastProvider>
        </QueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
