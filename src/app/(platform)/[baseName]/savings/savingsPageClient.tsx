"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  TrendingUpIcon,
  CalendarIcon,
} from "lucide-react";
import {
  getUserGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "@/actions/goalActions";
import { getTokenIdByCurrency } from "@/actions/tokenActions";
import { GoalWithToken } from "../goals/goalsPageClient";
import { useAuth } from "@/hooks/useAuth";
import { Progress } from "@/components/ui/progress";

interface SavingsPageClientProps {
  initialGoals: GoalWithToken[];
}

const SavingsPageClient: React.FC<SavingsPageClientProps> = ({
  initialGoals,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<GoalWithToken[]>(initialGoals);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<GoalWithToken | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currency: "USDC",
    deadline: "",
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [filterCurrency, setFilterCurrency] = useState("All");

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userGoals = await getUserGoals(user.userId!);
      if (JSON.stringify(userGoals) !== JSON.stringify(goals)) {
        setGoals(userGoals);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to fetch goals");
    } finally {
      setIsLoading(false);
    }
  }, [user, goals]);

  useEffect(() => {
    if (user) {
      fetchGoals();
    } else {
      // router.push("/");
    }
  }, [user, router, fetchGoals]);

  const handleCreateOrUpdateGoal = async () => {
    try {
      const tokenId = await getTokenIdByCurrency(newGoal.currency);
      if (editingGoal) {
        await updateGoal(editingGoal.id, {
          name: newGoal.name,
          targetAmount: newGoal.targetAmount,
          deadline: newGoal.deadline ? new Date(newGoal.deadline) : null,
        });
        toast.success("Goal updated successfully");
      } else {
        await createGoal(
          user!.userId!,
          tokenId,
          newGoal.name,
          newGoal.targetAmount,
          newGoal.deadline ? new Date(newGoal.deadline) : undefined
        );
        toast.success("Goal created successfully");
      }
      fetchGoals();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating/updating goal:", error);
      toast.error(`Failed to ${editingGoal ? "update" : "create"} goal`);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      toast.success("Goal deleted successfully");
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Failed to delete goal");
    }
  };

  const resetForm = () => {
    setNewGoal({
      name: "",
      targetAmount: "",
      currency: "USDC",
      deadline: "",
    });
    setEditingGoal(null);
  };

  const openEditDialog = (goal: GoalWithToken) => {
    setEditingGoal(goal);
    setNewGoal({
      name: goal.name,
      targetAmount: goal.targetAmount,
      currency: goal.token.symbol,
      deadline: goal.deadline
        ? new Date(goal.deadline).toISOString().split("T")[0]
        : "",
    });
    setIsDialogOpen(true);
  };

  const sortedAndFilteredGoals = goals
    .filter(
      (goal) => filterCurrency === "All" || goal.token.symbol === filterCurrency
    )
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "progress") {
        const progressA =
          (parseFloat(a.currentAmount) / parseFloat(a.targetAmount)) * 100;
        const progressB =
          (parseFloat(b.currentAmount) / parseFloat(b.targetAmount)) * 100;
        return progressB - progressA;
      }
      return 0;
    });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-4xl font-bold text-card-foreground">
          Savings Goals
        </h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Goal
        </Button>
      </motion.div>

      <div className="flex justify-between items-center">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Created</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCurrency} onValueChange={setFilterCurrency}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Currencies</SelectItem>
            <SelectItem value="USDC">USDC</SelectItem>
            <SelectItem value="EURC">EURC</SelectItem>
            <SelectItem value="cbBTC">cbBTC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedAndFilteredGoals.map((goal) => (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {goal.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {goal.deadline
                    ? new Date(goal.deadline).toLocaleDateString()
                    : "No deadline"}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>
                      {parseFloat(goal.currentAmount).toFixed(2)}{" "}
                      {goal.token.symbol}
                    </span>
                    <span>
                      {parseFloat(goal.targetAmount).toFixed(2)}{" "}
                      {goal.token.symbol}
                    </span>
                  </div>
                  <Progress
                    value={
                      (parseFloat(goal.currentAmount) /
                        parseFloat(goal.targetAmount)) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <TrendingUpIcon className="h-4 w-4 mr-2 text-primary" />
                    <p className="text-sm font-medium text-primary">
                      {(
                        (parseFloat(goal.currentAmount) /
                          parseFloat(goal.targetAmount)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(goal)}
                      className="mr-2"
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGoal ? "Edit Goal" : "Create New Goal"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Goal Name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
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
              disabled={!!editingGoal}
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
            <Button onClick={handleCreateOrUpdateGoal} className="w-full">
              {editingGoal ? "Update Goal" : "Create Goal"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavingsPageClient;
