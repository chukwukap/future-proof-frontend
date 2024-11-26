"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  BanknotesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface SavingsStatsProps {
  stats: {
    totalSaved: number;
    monthlyAverage: number;
    savingsRate: number;
    yearlyGrowth: number;
    nextMilestone: number;
    streakDays: number;
  };
}

export const SavingsStats = ({ stats }: SavingsStatsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Saved",
      value: formatCurrency(stats.totalSaved),
      change: "+2.5% from last month",
      icon: BanknotesIcon,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Monthly Average",
      value: formatCurrency(stats.monthlyAverage),
      change: `${stats.savingsRate}% of income`,
      icon: ChartBarIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Yearly Growth",
      value: `${stats.yearlyGrowth}%`,
      change: "On track to meet goals",
      icon: ArrowTrendingUpIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Next Milestone",
      value: formatCurrency(stats.nextMilestone),
      change: `${formatCurrency(stats.nextMilestone - stats.totalSaved)} to go`,
      icon: SparklesIcon,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
    {
      title: "Saving Streak",
      value: `${stats.streakDays} Days`,
      change: "Keep it up!",
      icon: FireIcon,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}; 