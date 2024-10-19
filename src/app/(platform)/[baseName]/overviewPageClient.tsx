"use client";

import React from "react";
import BalanceCard from "./_components/balanceCard";
import GoalsList from "./_components/goalsList";
import RecentActivityList from "./_components/recentActivityList";
import PortfolioSummary from "./_components/portfolioSummary";
import { useDisconnect } from "wagmi";

function OverviewPageClient() {
  const { disconnect } = useDisconnect();
  const supportedTokens = [
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      balance: "5000",
      change: 2.5,
    },
    {
      address: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
      symbol: "EURC",
      balance: "3000",
      change: -1.2,
    },
    {
      address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      symbol: "cbBTC",
      balance: "2000",
      change: 5.7,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportedTokens.map((token) => (
          <BalanceCard
            key={token.address}
            symbol={token.symbol}
            balance={token.balance}
            change={token.change}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <button onClick={() => disconnect()}>Disconnect</button>
        <PortfolioSummary />
        <GoalsList />
      </div>
      <RecentActivityList />
    </div>
  );
}
export default OverviewPageClient;
