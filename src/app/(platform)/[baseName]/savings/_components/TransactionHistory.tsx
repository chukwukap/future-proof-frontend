import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@prisma/client";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center mb-2"
          >
            <span>{transaction.type}</span>
            <span>{parseFloat(transaction.amount).toFixed(2)}</span>
            <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
