import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Goal, GoalWithToken } from "@/types";


interface GoalRecommendationsProps {
  goal: Goal
}

export const GoalRecommendations = ({ goal }: GoalRecommendationsProps) => {
  const getRecommendations = () => {
    const recommendations = [];
    const monthlyProgress = goal.monthlyTarget;
    const timeLeft = new Date(goal.deadline).getTime() - new Date().getTime();
    const monthsLeft = timeLeft / (1000 * 60 * 60 * 24 * 30);

    if (monthlyProgress < goal.monthlyTarget) {
      recommendations.push({
        type: "warning",
        title: "Increase Monthly Contributions",
        description: "You're currently below your target monthly savings rate.",
        action: "Adjust Budget",
        icon: ExclamationTriangleIcon,
      });
    }

    if (monthsLeft < 6 && goal.currentAmount < goal.targetAmount * 0.75) {
      recommendations.push({
        type: "alert",
        title: "Goal at Risk",
        description: "Consider extending your deadline or increasing contributions.",
        action: "Review Goal",
        icon: ExclamationTriangleIcon,
      });
    }

    // Add more smart recommendations based on goal progress and patterns

    return recommendations;
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <LightBulbIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Smart Recommendations</h3>
      </div>

      <div className="space-y-4">
        {getRecommendations().map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50"
          >
            <div
              className={`p-2 rounded-lg ${
                recommendation.type === "warning"
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              <recommendation.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">{recommendation.title}</h4>
              <p className="text-sm text-gray-400 mb-3">
                {recommendation.description}
              </p>
              <Button variant="outline" size="sm">
                {recommendation.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}; 