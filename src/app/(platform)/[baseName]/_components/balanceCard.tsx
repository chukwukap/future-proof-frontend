"use client";

import React from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

interface BalanceCardProps {
  symbol: string;
  balance: string;
  change: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  symbol,
  balance,
  change,
}) => {
  return (
    <div className="rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl bg-card hover:bg-card/90">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-primary/10 p-3">
            <span className="text-primary font-bold text-xl">{symbol}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              {symbol}
            </h3>
            <p className="text-sm text-muted-foreground">Balance</p>
          </div>
        </div>
        <div
          className={`flex items-center ${
            change >= 0
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {change >= 0 ? (
            <ArrowUpIcon className="w-5 h-5 mr-1" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 mr-1" />
          )}
          <span className="font-medium text-sm">{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-4xl font-bold text-card-foreground mb-6">{balance}</p>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          <PlusIcon className="w-5 h-5 mr-2" />
          Deposit
        </button>
        <button className="flex items-center justify-center px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-lg hover:bg-secondary/20 transition duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50">
          <MinusIcon className="w-5 h-5 mr-2" />
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
