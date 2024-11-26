import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGoalDialog = ({ open, onOpenChange }: CreateGoalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Goal</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., House Down Payment"
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="real_estate">Real Estate</SelectItem>
                <SelectItem value="emergency">Emergency Fund</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="target">Target Amount</Label>
              <Input
                id="target"
                type="number"
                placeholder="0.00"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthly">Monthly Contribution</Label>
              <Input
                id="monthly"
                type="number"
                placeholder="0.00"
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="EURC">EURC</SelectItem>
                  <SelectItem value="cbBTC">cbBTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Target Date</Label>
              <Input
                id="deadline"
                type="date"
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Create Goal</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 