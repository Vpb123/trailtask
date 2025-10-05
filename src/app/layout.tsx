import './globals.css';
import { ReactNode } from 'react';
import { QueryProvider } from '@/providers/QueryProvider';
import { ToastProvider } from '@/components/common/ToastProvider';
import Header from '@/components/layout/Header';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <QueryProvider>
          <ToastProvider>
            <Header />
            <main className="p-4">{children}</main>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
