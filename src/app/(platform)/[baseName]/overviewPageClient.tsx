"use client";

import React, { useState } from "react";
import BalanceCard from "./_components/balanceCard";
import GoalsList from "./_components/goalsList";
import RecentActivityList, {
  TransactionWithToken,
} from "./_components/recentActivityList";
import PortfolioSummary from "./_components/portfolioSummary";
import { Balance, Token } from "@prisma/client";
import { Goal } from "@prisma/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export type BalanceWithToken = Balance & {
  token: Token;
};

interface OverviewPageClientProps {
  balances: BalanceWithToken[];
  goals: Goal[];
  transactions: TransactionWithToken[];
}

function OverviewPageClient({
  balances,
  goals: initialGoals,
  transactions,
}: OverviewPageClientProps) {
  const [goals, setGoals] = useState(initialGoals);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Financial Overview
            </h1>
            <p className="text-gray-400 mt-1">
              Track your assets, goals, and recent activity
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <>
            {/* Balances Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {balances.map((balance) => (
                <BalanceCard
                  key={balance.id}
                  symbol={balance.token.symbol}
                  balance={"33"}
                  change={0}
                />
              ))}
            </div>

            {/* Portfolio and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Portfolio Summary
                </h2>
                <PortfolioSummary balances={balances} />
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Total Assets</p>
                    <p className="text-2xl font-semibold">$45,000</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Monthly Change</p>
                    <p className="text-2xl font-semibold text-green-500">
                      +15.5%
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "goals" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>
            <GoalsList goals={goals} onAddFunds={() => {}} />
          </Card>
        )}

        {activeTab === "activity" && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <RecentActivityList transactions={transactions} />
          </Card>
        )}
      </div>
    </div>
  );
}

export default OverviewPageClient;
