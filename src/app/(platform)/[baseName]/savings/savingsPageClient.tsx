"use client";

import React, { useState } from "react";

const supportedTokens = [
  { symbol: "USDC", balance: "5000", apy: 5.2 },
  { symbol: "EURC", balance: "3000", apy: 4.8 },
  { symbol: "cbBTC", balance: "2000", apy: 3.5 },
];

const SavingsPageClient = () => {
  const [selectedToken, setSelectedToken] = useState(supportedTokens[0]);
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-card-foreground mb-8">Savings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Deposit or Withdraw
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Select Token
              </label>
              <select
                id="token"
                value={selectedToken.symbol}
                onChange={(e) =>
                  setSelectedToken(
                    supportedTokens.find((t) => t.symbol === e.target.value) ||
                      supportedTokens[0]
                  )
                }
                className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
              >
                {supportedTokens.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex space-x-4">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition duration-300">
                Deposit
              </button>
              <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition duration-300">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Savings Overview
          </h2>
          <div className="space-y-4">
            {supportedTokens.map((token) => (
              <div
                key={token.symbol}
                className="flex justify-between items-center p-4 bg-muted rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold text-card-foreground">
                    {token.symbol}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Balance: {token.balance}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    {token.apy}% APY
                  </p>
                  <p className="text-sm text-muted-foreground">Earning</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsPageClient;
