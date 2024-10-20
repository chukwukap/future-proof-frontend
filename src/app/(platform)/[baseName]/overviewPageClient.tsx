"use client";

import React, { useState } from "react";
import BalanceCard from "./_components/balanceCard";
import GoalsList from "./_components/goalsList";
import RecentActivityList, {
  TransactionWithToken,
} from "./_components/recentActivityList";
import PortfolioSummary from "./_components/portfolioSummary";
import { Balance, Token } from "@prisma/client";
import { toast } from "sonner";
import { GoalWithToken } from "./goals/goalsPageClient";

export type BalanceWithToken = Balance & {
  token: Token;
};

interface OverviewPageClientProps {
  balances: BalanceWithToken[];
  goals: GoalWithToken[];
  transactions: TransactionWithToken[];
}

function OverviewPageClient({
  balances,
  goals: initialGoals,
  transactions,
}: OverviewPageClientProps) {
  const [goals, setGoals] = useState(initialGoals);
  console.log(goals, balances, transactions);

  const onAddFunds = async (goalId: string, amount: string) => {
    try {
      // Here you would typically call an API to update the goal
      // For now, we'll just update the state locally
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                currentAmount: (
                  parseFloat(goal.currentAmount) + parseFloat(amount)
                ).toString(),
              }
            : goal
        )
      );
      toast.success("Funds added successfully");
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error("Failed to add funds");
    }
  };

  return (
    <div className="space-y-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioSummary balances={balances} />
        <GoalsList goals={goals} onAddFunds={onAddFunds} />
      </div>
      <RecentActivityList transactions={transactions} />
    </div>
  );
}

export default OverviewPageClient;
