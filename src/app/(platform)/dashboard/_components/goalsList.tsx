"use client";

import React from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

const mockGoals = [
  {
    id: "1",
    name: "Vacation",
    currentAmount: 2000,
    targetAmount: 5000,
    currency: "USDC",
    deadline: "2023-12-31",
  },
  {
    id: "2",
    name: "New Car",
    currentAmount: 10000,
    targetAmount: 30000,
    currency: "USDC",
    deadline: "2024-06-30",
  },
  {
    id: "3",
    name: "Emergency Fund",
    currentAmount: 5000,
    targetAmount: 10000,
    currency: "EURC",
    deadline: "2023-09-30",
  },
];

const GoalsList: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-card-foreground">
          Your Savings Goals
        </h3>
        <button className="text-primary hover:text-primary/80 font-medium flex items-center transition-colors duration-200">
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Goal
        </button>
      </div>
      <ul className="divide-y divide-border">
        {mockGoals.map((goal) => (
          <li key={goal.id}>
            <Link href={`/dashboard/goals/${goal.id}`}>
              <div className="p-6 hover:bg-muted/50 transition duration-150 ease-in-out">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-medium text-card-foreground">
                    {goal.name}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {goal.deadline}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">
                    {goal.currentAmount} / {goal.targetAmount} {goal.currency}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {((goal.currentAmount / goal.targetAmount) * 100).toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${
                        (goal.currentAmount / goal.targetAmount) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsList;
