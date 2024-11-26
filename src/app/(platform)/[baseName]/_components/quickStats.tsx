import React from "react";
import {
  ArrowTrendingUpIcon,
  WalletIcon,
  ChartBarIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

const QuickStats = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$12,345.67",
      change: "+12.3%",
      icon: WalletIcon,
      trend: "up",
    },
    {
      title: "Total Savings",
      value: "$5,432.10",
      change: "+8.7%",
      icon: ChartBarIcon,
      trend: "up",
    },
    {
      title: "Active Goals",
      value: "4",
      change: "+2",
      icon: ArrowTrendingUpIcon,
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-primary/50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <ArrowUpIcon className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">{stat.change}</span>
            <span className="text-sm text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
