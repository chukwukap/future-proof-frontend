"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const SettingsPageClient = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-card-foreground mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Change Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
                placeholder="New password"
              />
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition duration-300">
              Update Account
            </button>
          </div>
        </div>
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition duration-300"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">
                Two-Factor Authentication
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPageClient;
