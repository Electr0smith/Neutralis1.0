'use client';

import React, { useState } from 'react';

type PaymentRecord = {
  amount: string;
  usdc: string;
  ref: string;
};

export default function Page() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState<PaymentRecord[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(Number(amount))) {
      setStatus('Please enter a valid amount.');
      return;
    }

    setStatus('Processing payment...');

    const ref = crypto.randomUUID();

    // This is where you'd call your backend /api/payment or similar
    setTimeout(() => {
      setHistory([
        ...history,
        {
          amount: parseFloat(amount).toFixed(2),
          usdc: parseFloat(amount).toFixed(2), // Pretend 1:1 for MVP
          ref,
        },
      ]);
      setStatus('Payment successful!');
      setAmount('');
    }, 1000);
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Neutralis Payment Portal</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2 font-semibold">Amount (USD)</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="e.g. 19.99"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Submit Payment
        </button>
      </form>

      {status && <p className="mb-4">{status}</p>}

      {history.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment History</h2>
          <ul className="border border-gray-200 rounded p-4 bg-gray-50">
            {history.map((entry, index) => (
              <li key={index} className="mb-2">
                <strong>${entry.amount}</strong> | Ref: <code>{entry.ref}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}