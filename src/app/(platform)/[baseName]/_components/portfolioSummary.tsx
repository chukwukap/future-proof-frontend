import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { BalanceWithToken } from "../overviewPageClient";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioSummaryProps {
  balances: BalanceWithToken[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ balances }) => {
  const data = balances.map((balance) => parseFloat(balance.amount));
  const labels = balances.map((balance) => balance.token.symbol);

  const chartData: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const totalValue = data.reduce((sum, value) => sum + value, 0);

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
      <div className="h-[300px] relative">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Total Value: ${totalValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PortfolioSummary;
