'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ClientPage() {
  const [transactions, setTransactions] = useState<string[]>([]);

  const simulateClientReceipt = () => {
    const ref = crypto.randomUUID();
    setTransactions([`Payment received with Ref: ${ref}`, ...transactions]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Client View</h2>
      <p className="mb-2">Product: Game XYZ</p>
      <p className="mb-4">Purchase Price: $49.99</p>
      <button
        onClick={simulateClientReceipt}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Simulate Payment Received
      </button>
      <div className="mt-4 space-y-2">
        {transactions.map((t, i) => (
          <p key={i} className="text-sm text-gray-700">{t}</p>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <Link href="/customer" className="text-sm text-blue-600 underline">Back to Customer</Link>
        <Link href="/backend" className="text-sm text-blue-600 underline">View Backend</Link>
      </div>
    </div>
  );
}
