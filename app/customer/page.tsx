'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomerPage() {
  const [status, setStatus] = useState('');

  const handlePurchase = () => {
    setStatus('Processing payment...');
    setTimeout(() => {
      setStatus('Payment confirmed! Thank you.');
    }, 2000);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Customer View</h2>
      <p className="mb-2">Purchase Price: $49.99</p>
      <input
        type="text"
        placeholder="Card Number"
        className="w-full p-2 border rounded mb-2"
        value="**** **** **** 1234"
        readOnly
      />
      <input
        type="text"
        placeholder="Expiration Date"
        className="w-full p-2 border rounded mb-2"
        value="**/**"
        readOnly
      />
      <input
        type="text"
        placeholder="CVV"
        className="w-full p-2 border rounded mb-2"
        value="***"
        readOnly
      />
      <button
        onClick={handlePurchase}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Payment
      </button>
      {status && <p className="mt-4 font-semibold">{status}</p>}
      <div className="mt-6 flex gap-4">
        <Link href="/backend" className="text-sm text-blue-600 underline">View Backend</Link>
        <Link href="/client" className="text-sm text-blue-600 underline">Go to Client View</Link>
      </div>
    </div>
  );
}
