"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createGoal, getUserGoals } from "@/actions/goalActions";
import { Goal, Token } from "@prisma/client";
import { getTokenIdByCurrency } from "@/actions/tokenActions";
import { useAuth } from "@/hooks/useAuth";

export type GoalWithToken = Goal & {
  token: Token;
};
interface GoalsPageClientProps {
  initialGoals: GoalWithToken[];
}

const GoalsPageClient: React.FC<GoalsPageClientProps> = ({ initialGoals }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<GoalWithToken[]>(initialGoals);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currency: "USDC",
    deadline: "",
  });

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    try {
      const userGoals = await getUserGoals(user.userId!);
      if (JSON.stringify(userGoals) !== JSON.stringify(goals)) {
        setGoals(userGoals);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to fetch goals");
    }
  }, [user, goals]);

  useEffect(() => {
    if (user) {
      fetchGoals();
    } else {
      // router.push("/");
    }
  }, [user, router, fetchGoals]);

  const handleCreateGoal = async () => {
    try {
      const tokenId = await getTokenIdByCurrency(newGoal.currency);
      await createGoal(
        user!.userId!,
        tokenId,
        newGoal.name,
        newGoal.targetAmount,
        newGoal.deadline ? new Date(newGoal.deadline) : undefined
      );
      toast.success("Goal created successfully");
      fetchGoals();
      setNewGoal({
        name: "",
        targetAmount: "",
        currency: "USDC",
        deadline: "",
      });
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal");
    }
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-card-foreground">
          Savings Goals
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-5 w-5 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Goal Name"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Target Amount"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetAmount: e.target.value })
                }
              />
              <Select
                value={newGoal.currency}
                onValueChange={(value) =>
                  setNewGoal({ ...newGoal, currency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="EURC">EURC</SelectItem>
                  <SelectItem value="cbBTC">cbBTC</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, deadline: e.target.value })
                }
              />
              <Button onClick={handleCreateGoal}>Create Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals?.map((goal) => (
          <div key={goal.id} className="bg-card rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {goal.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Deadline:{" "}
              {goal.deadline
                ? new Date(goal.deadline).toLocaleDateString()
                : "No deadline"}
            </p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>
                  {goal.currentAmount} {goal.token.symbol}
                </span>
                <span>
                  {goal.targetAmount} {goal.token.symbol}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${
                      (Number(goal?.currentAmount) /
                        Number(goal?.targetAmount)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-primary">
                {/* {((goal?.currentAmount / goal?.targetAmount) * 100).toFixed(1)}% */}
                100%
              </p>
              <Button variant="secondary" size="sm">
                Add Funds
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPageClient;
