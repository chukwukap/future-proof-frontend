"use client";

import React, { useState } from "react";
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

const GoalsPage = () => {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-card-foreground">
          Savings Goals
        </h1>
        <button
          onClick={() => setShowNewGoalForm(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition duration-300 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Goal
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map((goal) => (
          <div key={goal.id} className="bg-card rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {goal.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Deadline: {goal.deadline}
            </p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>
                  {goal.currentAmount} {goal.currency}
                </span>
                <span>
                  {goal.targetAmount} {goal.currency}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${(goal.currentAmount / goal.targetAmount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-primary">
                {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
                Complete
              </p>
              <button className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/90 transition duration-300">
                Add Funds
              </button>
            </div>
          </div>
        ))}
      </div>
      {showNewGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Create New Goal
            </h2>
            {/* Add form fields for new goal here */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowNewGoalForm(false)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition duration-300 mr-2"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition duration-300">
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
