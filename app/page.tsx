'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);
  const [usdcAmount, setUsdcAmount] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('txHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('txHistory', JSON.stringify(history));
  }, [history]);

  const handlePayment = async () => {
    setStatus('Processing payment...');
    const ref = crypto.randomUUID();
    setHistory([...history, {
      amount: parseFloat(amount).toFixed(2),
      usdc: parseFloat(amount).toFixed(2),
      ref
    }]);
    setStatus('Payment processed successfully.');
  };

  const handleSettle = () => {
    const total = history.reduce((sum, tx) => sum + parseFloat(tx.usdc), 0);
    setUsdcAmount(total.toFixed(2));
    setStatus(`USDC converted and settled: $${total.toFixed(2)}`);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('txHistory');
    setStatus('Transaction history cleared.');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Neutralis Payment Demo</h1>
      <input
        placeholder="Enter amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <button onClick={handlePayment}>Pay</button>
        <button onClick={handleSettle}>Settle</button>
        <button onClick={clearHistory}>Clear</button>
      </div>
      <p>{status}</p>
      <h2>Transaction History</h2>
      <ul>
        {history.map((tx, i) => (
          <li key={i}>${tx.amount} → {tx.usdc} USDC (Ref: {tx.ref})</li>
        ))}
      </ul>
      {usdcAmount && <p>Total Settled: ${usdcAmount}</p>}
    </main>
  );
}