import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { BalanceWithToken } from "../overviewPageClient";

interface PortfolioSummaryProps {
  balances: BalanceWithToken[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ balances }) => {
  const data = balances.map((balance) => ({
    name: balance.token.symbol,
    value: parseFloat(balance.amount),
  }));

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Total Value: ${totalValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PortfolioSummary;
