"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowPathIcon,
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

export const AutoSaveSettings = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    amount: "500",
    frequency: "monthly",
    dayOfMonth: "1",
    goalAllocation: "emergency",
    smartSaving: true,
    minimumBalance: "1000",
    roundUp: true,
    roundUpMultiplier: "1",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Handle saving settings
    setIsEditing(false);
    toast.success("Auto-save settings updated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Main Auto-Save Settings */}
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ArrowPathIcon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Automatic Savings</h3>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, enabled: checked })
            }
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Amount to Save</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <Input
                  type="number"
                  value={settings.amount}
                  onChange={(e) =>
                    setSettings({ ...settings, amount: e.target.value })
                  }
                  className="pl-7 bg-gray-800 border-gray-700"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={settings.frequency}
                onValueChange={(value) =>
                  setSettings({ ...settings, frequency: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Day of {settings.frequency}</Label>
              <Select
                value={settings.dayOfMonth}
                onValueChange={(value) =>
                  setSettings({ ...settings, dayOfMonth: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {[...Array(28)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Allocate to Goal</Label>
              <Select
                value={settings.goalAllocation}
                onValueChange={(value) =>
                  setSettings({ ...settings, goalAllocation: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="emergency">Emergency Fund</SelectItem>
                  <SelectItem value="house">House Down Payment</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Minimum Balance</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <Input
                  type="number"
                  value={settings.minimumBalance}
                  onChange={(e) =>
                    setSettings({ ...settings, minimumBalance: e.target.value })
                  }
                  className="pl-7 bg-gray-800 border-gray-700"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Settings</Button>
          )}
        </div>
      </Card>

      {/* Smart Saving Features */}
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <h3 className="text-lg font-semibold mb-6">Smart Saving Features</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Smart Saving Analysis</h4>
              <p className="text-sm text-gray-400">
                Automatically adjust savings based on spending patterns
              </p>
            </div>
            <Switch
              checked={settings.smartSaving}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, smartSaving: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Round-Up Savings</h4>
              <p className="text-sm text-gray-400">
                Round up transactions to the nearest dollar and save the difference
              </p>
            </div>
            <Switch
              checked={settings.roundUp}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, roundUp: checked })
              }
            />
          </div>

          {settings.roundUp && (
            <div className="space-y-2">
              <Label>Round-Up Multiplier</Label>
              <Select
                value={settings.roundUpMultiplier}
                onValueChange={(value) =>
                  setSettings({ ...settings, roundUpMultiplier: value })
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select multiplier" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="1">1x (Standard)</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="3">3x</SelectItem>
                  <SelectItem value="5">5x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>

      {/* Next Auto-Save Preview */}
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Next Auto-Save</h3>
            <p className="text-sm text-gray-400 mt-1">
              March 1, 2024 • ${settings.amount}
            </p>
          </div>
          <Button variant="outline" size="sm">
            Skip Next
          </Button>
        </div>
      </Card>
    </div>
  );
}; 