"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateGoalDialog } from "./_components/create-goal-dialog";
import { GoalDetailsSheet } from "./_components/goal-details-sheet";
import { GoalWithToken } from "@/types";

// Mock data
const mockGoals = [
  {
    id: "1",
    name: "House Down Payment",
    targetAmount: 50000,
    currentAmount: 35000,
    currency: "USDC",
    deadline: "2024-12-31",
    category: "Real Estate",
    monthlyTarget: 2000,
    lastContribution: "2024-02-15",
    status: "on_track",
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 25000,
    currentAmount: 15000,
    currency: "USDC",
    deadline: "2024-06-30",
    category: "Safety Net",
    monthlyTarget: 1500,
    lastContribution: "2024-02-10",
    status: "behind",
  },
  // Add more mock goals...
];

const GoalsPageClient = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalWithToken | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState("all");

  const stats = {
    totalSaved: mockGoals.reduce((acc, goal) => acc + goal.currentAmount, 0),
    totalGoals: mockGoals.length,
    completedGoals: mockGoals.filter(
      (goal) => goal.currentAmount >= goal.targetAmount
    ).length,
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-white">Savings Goals</h1>
            <p className="text-gray-400 mt-1">
              Track and achieve your financial targets
            </p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BanknotesIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Saved</p>
                <p className="text-2xl font-semibold">
                  ${stats.totalSaved.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <ChartBarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Goals</p>
                <p className="text-2xl font-semibold">{stats.totalGoals}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <ArrowTrendingUpIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-semibold">{stats.completedGoals}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="all">All Goals</TabsTrigger>
            <TabsTrigger value="on_track">On Track</TabsTrigger>
            <TabsTrigger value="behind">Needs Attention</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;

          return (
            <Card
              key={goal.id}
              className="p-6 bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedGoal(goal as GoalWithToken)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {goal.name}
                  </h3>
                  <p className="text-sm text-gray-400">{goal.category}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    goal.status === "on_track"
                      ? "bg-green-500/10 text-green-400"
                      : goal.status === "behind"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {goal.status === "on_track"
                    ? "On Track"
                    : goal.status === "behind"
                    ? "Behind"
                    : "Completed"}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span>${goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <BanknotesIcon className="h-4 w-4 mr-1" />
                    <span>${goal.monthlyTarget.toLocaleString()}/month</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modals */}
      <CreateGoalDialog open={isCreating} onOpenChange={setIsCreating} />
      <GoalDetailsSheet
        goal={selectedGoal}
        onClose={() => setSelectedGoal(null)}
      />
    </div>
  );
};

export default GoalsPageClient;
