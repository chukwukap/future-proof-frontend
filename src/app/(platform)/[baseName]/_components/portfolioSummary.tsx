"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4C51BF", "#ED64A6", "#48BB78", "#ECC94B", "#4299E1"];

const mockData = [
  { name: "USDC", value: 5000 },
  { name: "EURC", value: 3000 },
  { name: "cbBTC", value: 2000 },
];

const PortfolioSummary: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = {
    labels: mockData.map((item) => item.name),
    datasets: [
      {
        data: mockData.map((item) => item.value),
        backgroundColor: COLORS,
        borderColor: isDark ? "#1F2937" : "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  const totalValue = mockData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-card-foreground mb-6">
        Portfolio Summary
      </h3>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-48 h-48">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-card-foreground">
                ${totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {mockData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm font-medium text-card-foreground">
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-card-foreground">
                ${item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
