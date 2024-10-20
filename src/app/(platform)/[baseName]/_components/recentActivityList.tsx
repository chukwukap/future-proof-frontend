import React from "react";
import { Token, Transaction } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

export type TransactionWithToken = Transaction & {
  token: Token;
};

interface RecentActivityListProps {
  transactions: TransactionWithToken[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({
  transactions,
}) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              {transaction.type === "DEPOSIT" ? (
                <ArrowUpIcon className="w-6 h-6 text-green-500 mr-2" />
              ) : (
                <ArrowDownIcon className="w-6 h-6 text-red-500 mr-2" />
              )}
              <div>
                <p className="font-semibold">{transaction.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="font-semibold">
              {transaction.type === "DEPOSIT" ? "+" : "-"}
              {parseFloat(transaction.amount).toFixed(2)}{" "}
              {/* {transaction.token.symbol} */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
