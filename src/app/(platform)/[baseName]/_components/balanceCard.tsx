import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

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
  console.log(change);
  // Placeholder change calculation (random value between -5 and 5)
  const randomChange = Math.random() * 10 - 5;

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{symbol}</h3>
        <span
          className={`flex items-center ${
            randomChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {randomChange >= 0 ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          {Math.abs(randomChange).toFixed(2)}%
        </span>
      </div>
      <p className="text-3xl font-bold">{parseFloat(balance).toFixed(2)}</p>
    </div>
  );
};

export default BalanceCard;
