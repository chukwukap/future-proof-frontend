import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";

interface GoalDetailsSheetProps {
  goal: any; // Replace with proper type
  onClose: () => void;
}

export const GoalDetailsSheet = ({ goal, onClose }: GoalDetailsSheetProps) => {
  if (!goal) return null;

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const daysUntilDeadline = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  return (
    <Sheet open={!!goal} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-[600px] bg-gray-900 border-gray-800">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-semibold text-white">
            {goal.name}
          </SheetTitle>
          <p className="text-gray-400">{goal.category}</p>
        </SheetHeader>

        {/* Progress Overview */}
        <div className="space-y-6">
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>${goal.currentAmount.toLocaleString()}</span>
                <span>${goal.targetAmount.toLocaleString()}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {progress.toFixed(1)}% Complete
                </span>
                <span className="text-sm text-gray-400">
                  ${remainingAmount.toLocaleString()} remaining
                </span>
              </div>
            </div>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gray-800/50 border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BanknotesIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Monthly Target</p>
                  <p className="text-lg font-semibold">
                    ${goal.monthlyTarget.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-800/50 border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ClockIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Days Remaining</p>
                  <p className="text-lg font-semibold">{daysUntilDeadline}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6 bg-gray-800/50 border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  type: "contribution",
                  amount: 500,
                  date: "2024-02-15",
                },
                {
                  type: "milestone",
                  message: "Reached 70% of goal",
                  date: "2024-02-10",
                },
                // Add more activity items as needed
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {activity.type === "contribution" ? (
                      <BanknotesIcon className="h-5 w-5 text-green-400" />
                    ) : (
                      <CheckCircleIcon className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <p className="text-sm">
                        {activity.type === "contribution"
                          ? `Added $${activity.amount}`
                          : activity.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="outline">
              Edit Goal
            </Button>
            <Button className="flex-1">Add Funds</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 