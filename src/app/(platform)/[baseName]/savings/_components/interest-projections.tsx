"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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

export const InterestProjections = () => {
  const [projectionSettings, setProjectionSettings] = useState({
    initialAmount: 10000,
    monthlyContribution: 500,
    interestRate: 5,
    years: 10,
    compoundingFrequency: "monthly",
  });

  const calculateProjections = () => {
    const data = [];
    const { initialAmount, monthlyContribution, interestRate, years } =
      projectionSettings;
    let conservative = initialAmount;
    let moderate = initialAmount;
    let aggressive = initialAmount;

    for (let year = 0; year <= years; year++) {
      const yearlyContribution = monthlyContribution * 12;

      conservative =
        conservative * (1 + interestRate / 100) + yearlyContribution;
      moderate =
        moderate * (1 + (interestRate * 1.5) / 100) + yearlyContribution;
      aggressive =
        aggressive * (1 + (interestRate * 2) / 100) + yearlyContribution;

      data.push({
        year,
        conservative: Math.round(conservative),
        moderate: Math.round(moderate),
        aggressive: Math.round(aggressive),
      });
    }

    return data;
  };

  const projectionData = calculateProjections();
  const finalValues = projectionData[projectionData.length - 1];

  const chartData = {
    labels: projectionData.map((d) => `Year ${d.year}`),
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
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
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
    <div className="space-y-6">
      {/* Settings Card */}
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <h3 className="text-lg font-semibold mb-6">Projection Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Initial Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <Input
                  type="number"
                  value={projectionSettings.initialAmount}
                  onChange={(e) =>
                    setProjectionSettings({
                      ...projectionSettings,
                      initialAmount: Number(e.target.value),
                    })
                  }
                  className="pl-7 bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Monthly Contribution</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <Input
                  type="number"
                  value={projectionSettings.monthlyContribution}
                  onChange={(e) =>
                    setProjectionSettings({
                      ...projectionSettings,
                      monthlyContribution: Number(e.target.value),
                    })
                  }
                  className="pl-7 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <div className="space-y-4">
                <Slider
                  value={[projectionSettings.interestRate]}
                  onValueChange={(value) =>
                    setProjectionSettings({
                      ...projectionSettings,
                      interestRate: value[0],
                    })
                  }
                  max={15}
                  step={0.5}
                />
                <div className="text-center text-sm text-gray-400">
                  {projectionSettings.interestRate}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Projection Period (Years)</Label>
              <div className="space-y-4">
                <Slider
                  value={[projectionSettings.years]}
                  onValueChange={(value) =>
                    setProjectionSettings({
                      ...projectionSettings,
                      years: value[0],
                    })
                  }
                  min={1}
                  max={30}
                  step={1}
                />
                <div className="text-center text-sm text-gray-400">
                  {projectionSettings.years} years
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Projection Chart */}
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <h3 className="text-lg font-semibold mb-6">Growth Projections</h3>
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Final Values */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Conservative</p>
            <p className="text-lg font-semibold text-slate-400">
              ${finalValues.conservative.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Moderate</p>
            <p className="text-lg font-semibold text-blue-400">
              ${finalValues.moderate.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Aggressive</p>
            <p className="text-lg font-semibold text-green-400">
              ${finalValues.aggressive.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
