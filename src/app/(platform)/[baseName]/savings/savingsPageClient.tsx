"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { SavingsOverview } from "./_components/savings-overview";
import { SavingsHistory } from "./_components/savings-history";
import { AutoSaveSettings } from "./_components/auto-save-settings";
import { AddSavingsDialog } from "./_components/add-savings-dialog";
import { InterestProjections } from "./_components/interest-projections";
import { SavingsStats } from "./_components/savings-stats";
import { Goal } from "@/types";

interface SavingsPageClientProps {
  initialGoals: Goal[];
}

const SavingsPageClient = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingSavings, setIsAddingSavings] = useState(false);

  // Mock data for demonstration
  const savingsStats = {
    totalSaved: 45000,
    monthlyAverage: 2500,
    savingsRate: 32,
    yearlyGrowth: 15.5,
    nextMilestone: 50000,
    streakDays: 45,
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-white">Savings Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Track, optimize, and grow your savings
            </p>
          </div>
          <Button
            onClick={() => setIsAddingSavings(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Savings
          </Button>
        </div>

        {/* Quick Stats */}
        <SavingsStats stats={savingsStats} />
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="automation">Auto-Save</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="grid gap-6">
                <SavingsOverview />
                <Card className="p-6 bg-gray-800/50 border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Linked Goals Progress</h3>
                  {/* Goals progress component */}
                </Card>
              </div>
            )}

            {activeTab === "history" && <SavingsHistory />}
            
            {activeTab === "automation" && <AutoSaveSettings />}
            
            {activeTab === "projections" && <InterestProjections />}
          </div>
        </Tabs>
      </div>

      <AddSavingsDialog
        open={isAddingSavings}
        onOpenChange={setIsAddingSavings}
      />
    </div>
  );
};

export default SavingsPageClient;
