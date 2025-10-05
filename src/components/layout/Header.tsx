"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WalletStatus } from "@/components/transfer/WalletStatus";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
      <h1 className="text-xl font-bold text-white">Trial Task</h1>

      <nav className="flex items-center space-x-4">
        <Link href="/cosmo">
          <Button variant="ghost" size="sm">
            Cosmo
          </Button>
        </Link>

        <Link href="/transfer">
          <Button variant="ghost" size="sm">
            Transfer
          </Button>
        </Link>

        {/* Wallet connect placeholder */}
        <WalletStatus />
      </nav>
    </header>
  );
}
