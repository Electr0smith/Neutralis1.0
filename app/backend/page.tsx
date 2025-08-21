'use client';

import { useState } from 'react';
import Link from 'next/link';

const getRandomSpread = (range: number) => {
  return (Math.random() * range).toFixed(4);
};

export default function BackendView() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const simulateTransaction = () => {
    const ref = crypto.randomUUID();
    const fiatAmount = 49.99;
    const midMarket = 1.0002;
    const buyPrice = parseFloat((midMarket + parseFloat(getRandomSpread(0.002))).toFixed(4));
    const sellPrice = parseFloat((midMarket - parseFloat(getRandomSpread(0.002))).toFixed(4));
    const usdcPurchased = parseFloat((fiatAmount / buyPrice).toFixed(4));
    const feeAmount = parseFloat((fiatAmount * 0.005).toFixed(2));
    const usdcAfterFee = parseFloat((usdcPurchased - (feeAmount / buyPrice)).toFixed(4));
    const merchantReceives = parseFloat((usdcAfterFee * sellPrice).toFixed(2));
    const netMargin = parseFloat((merchantReceives - (fiatAmount - feeAmount)).toFixed(2));

    const data = {
      ref,
      fiatAmount,
      buyPrice,
      usdcPurchased,
      feeAmount,
      usdcAfterFee,
      sellPrice,
      merchantReceives,
      netMargin,
    };

    setTransactions([data, ...transactions]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Backend Simulation</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={simulateTransaction}
      >
        Simulate Transaction
      </button>
      <div className="mt-6 space-y-6">
        {transactions.map((tx) => (
          <div key={tx.ref} className="p-4 border rounded bg-gray-50">
            <p><strong>Ref:</strong> {tx.ref}</p>
            <p><strong>Customer Paid:</strong> ${tx.fiatAmount.toFixed(2)}</p>
            <p><strong>USDC Buy @:</strong> ${tx.buyPrice} → {tx.usdcPurchased} USDC</p>
            <p><strong>Fee:</strong> ${tx.feeAmount} (0.5%)</p>
            <p><strong>USDC After Fee:</strong> {tx.usdcAfterFee} USDC</p>
            <p><strong>USDC Sell @:</strong> ${tx.sellPrice} → ${tx.merchantReceives}</p>
            <p><strong>Net Margin:</strong> <span className={tx.netMargin >= 0 ? 'text-green-600' : 'text-red-600'}>{tx.netMargin >= 0 ? '+' : ''}{tx.netMargin.toFixed(2)}</span></p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <Link href="/customer" className="text-sm text-blue-600 underline">Back to Customer</Link>
        <Link href="/client" className="text-sm text-blue-600 underline">Go to Client View</Link>
      </div>
    </div>
  );
}