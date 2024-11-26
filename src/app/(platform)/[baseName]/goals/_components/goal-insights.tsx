"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Goal } from "@/types";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GoalInsightsProps {
  goal: Goal;
}

export const GoalInsights = ({ goal }: GoalInsightsProps) => {
  // Generate projection data
  const generateProjectionData = () => {
    const data = [];
    let currentAmount = goal.currentAmount;
    const monthlyContribution = goal.monthlyTarget;
    const months = 12;

    for (let i = 0; i <= months; i++) {
      data.push({
        month: i,
        conservative:
          currentAmount *
          (1 + goal.projectedGrowth.scenarios.conservative) ** i,
        moderate:
          currentAmount * (1 + goal.projectedGrowth.scenarios.moderate) ** i,
        aggressive:
          currentAmount * (1 + goal.projectedGrowth.scenarios.aggressive) ** i,
        target: goal.targetAmount,
      });
      currentAmount += monthlyContribution;
    }
    return data;
  };

  const projectionData = generateProjectionData();

  const chartData = {
    labels: projectionData.map((d) => `Month ${d.month}`),
    datasets: [
      {
        label: "Conservative",
        data: projectionData.map((d) => d.conservative),
        borderColor: "#94a3b8",
        backgroundColor: "#94a3b8",
        tension: 0.4,
      },
      {
        label: "Moderate",
        data: projectionData.map((d) => d.moderate),
        borderColor: "#60a5fa",
        backgroundColor: "#60a5fa",
        tension: 0.4,
      },
      {
        label: "Aggressive",
        data: projectionData.map((d) => d.aggressive),
        borderColor: "#34d399",
        backgroundColor: "#34d399",
        tension: 0.4,
      },
      {
        label: "Target",
        data: projectionData.map(() => goal.targetAmount),
        borderColor: "#f43f5e",
        backgroundColor: "#f43f5e",
        borderDash: [5, 5],
        tension: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#9ca3af",
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${Math.round(
              context.raw
            ).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#9ca3af",
          callback: function (value: any) {
            return `$${(value / 1000).toFixed(0)}k`;
          },
        },
      },
    },
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700">
      <Tabs defaultValue="projections">
        <TabsList className="mb-4">
          <TabsTrigger value="projections">Growth Projections</TabsTrigger>
          <TabsTrigger value="contributions">Contribution Analysis</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="projections">
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Conservative</p>
              <p className="text-lg font-semibold text-slate-400">
                {(goal.projectedGrowth.scenarios.conservative * 100).toFixed(1)}
                %
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Moderate</p>
              <p className="text-lg font-semibold text-blue-400">
                {(goal.projectedGrowth.scenarios.moderate * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Aggressive</p>
              <p className="text-lg font-semibold text-green-400">
                {(goal.projectedGrowth.scenarios.aggressive * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Add other tab contents as needed */}
      </Tabs>
    </Card>
  );
};
