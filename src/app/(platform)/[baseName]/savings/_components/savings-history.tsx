"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  {
    id: "1",
    type: "deposit",
    amount: 1500,
    date: "2024-02-20",
    category: "Manual Savings",
    status: "completed",
    description: "Monthly savings deposit",
  },
  {
    id: "2",
    type: "auto-save",
    amount: 500,
    date: "2024-02-15",
    category: "Auto-Save",
    status: "completed",
    description: "Automated weekly savings",
  },
  // Add more mock transactions...
];

export const SavingsHistory = () => {
  const [timeframe, setTimeframe] = useState("all");
  const [category, setCategory] = useState("all");

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowUpIcon className="h-4 w-4 text-green-400" />;
      case "withdrawal":
        return <ArrowDownIcon className="h-4 w-4 text-red-400" />;
      case "auto-save":
        return <ArrowPathIcon className="h-4 w-4 text-blue-400" />;
      default:
        return <BanknotesIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <div className="flex gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="manual">Manual Savings</SelectItem>
                <SelectItem value="auto">Auto-Save</SelectItem>
                <SelectItem value="interest">Interest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800/50">
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-gray-700 hover:bg-gray-800/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <span
                      className={
                        transaction.type === "withdrawal"
                          ? "text-red-400"
                          : "text-green-400"
                      }
                    >
                      ${transaction.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {transaction.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
