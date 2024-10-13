"use client";

import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

interface Activity {
  id: string;
  type: "deposit" | "withdrawal" | "interest";
  amount: number;
  currency: string;
  date: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "deposit",
    amount: 1000,
    currency: "USDC",
    date: "2023-07-01",
  },
  {
    id: "2",
    type: "withdrawal",
    amount: 500,
    currency: "USDC",
    date: "2023-07-05",
  },
  {
    id: "3",
    type: "interest",
    amount: 10,
    currency: "USDC",
    date: "2023-07-10",
  },
  {
    id: "4",
    type: "deposit",
    amount: 2000,
    currency: "EURC",
    date: "2023-07-15",
  },
];

const ActivityIcon: React.FC<{ type: Activity["type"] }> = ({ type }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  switch (type) {
    case "deposit":
      return (
        <ArrowDownIcon
          className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-600"}`}
        />
      );
    case "withdrawal":
      return (
        <ArrowUpIcon
          className={`h-5 w-5 ${isDark ? "text-red-400" : "text-red-600"}`}
        />
      );
    case "interest":
      return (
        <CurrencyDollarIcon
          className={`h-5 w-5 ${
            isDark ? "text-yellow-400" : "text-yellow-600"
          }`}
        />
      );
  }
};

const RecentActivityList: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-2xl font-semibold text-card-foreground">
          Recent Activity
        </h3>
      </div>
      <ul className="divide-y divide-border">
        {mockActivities.map((activity) => (
          <li
            key={activity.id}
            className="p-6 hover:bg-muted/50 transition duration-150 ease-in-out"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-muted p-2 rounded-full">
                  <ActivityIcon type={activity.type} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {activity.type.charAt(0).toUpperCase() +
                    activity.type.slice(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`inline-flex items-center text-sm font-semibold ${
                  activity.type === "withdrawal"
                    ? "text-red-500 dark:text-red-400"
                    : activity.type === "interest"
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-green-500 dark:text-green-400"
                }`}
              >
                {activity.type === "withdrawal" ? "-" : "+"}
                {activity.amount} {activity.currency}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityList;
