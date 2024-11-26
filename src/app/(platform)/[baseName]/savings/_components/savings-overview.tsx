"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SavingsOverview = () => {
  // Mock data for the chart
  const monthlySavings = [
    { month: "Jan", amount: 2500 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 2800 },
    { month: "Apr", amount: 3200 },
    { month: "May", amount: 2900 },
    { month: "Jun", amount: 3500 },
  ];

  const chartData = {
    labels: monthlySavings.map(item => item.month),
    datasets: [
      {
        label: "Monthly Savings",
        data: monthlySavings.map(item => item.amount),
        backgroundColor: "rgba(96, 165, 250, 0.8)",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
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
          callback: function(value: any) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
          <div className="h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Monthly Goal Progress</span>
              <span className="text-gray-400">$3,500 / $4,000</span>
            </div>
            <Progress value={87.5} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Yearly Goal Progress</span>
              <span className="text-gray-400">$25,000 / $40,000</span>
            </div>
            <Progress value={62.5} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
}; 