import React, { useState } from "react";
import { Goal } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface GoalsListProps {
  goals: Goal[];
  onAddFunds: (goalId: string, amount: string) => Promise<void>;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals, onAddFunds }) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [amount, setAmount] = useState("");

  const handleAddFunds = async () => {
    if (selectedGoal && amount) {
      await onAddFunds(selectedGoal.id, amount);
      setSelectedGoal(null);
      setAmount("");
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Savings Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-card-secondary rounded-lg p-4">
            {/* ... (previous goal rendering code) ... */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-primary">
                {(
                  (parseFloat(goal.currentAmount) /
                    parseFloat(goal.targetAmount)) *
                  100
                ).toFixed(1)}
                % Complete
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedGoal(goal)}
                  >
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Funds to {goal.name}</DialogTitle>
                  </DialogHeader>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Button onClick={handleAddFunds}>Confirm</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsList;
