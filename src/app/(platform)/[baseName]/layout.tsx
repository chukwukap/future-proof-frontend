import React from "react";
import { Metadata } from "next";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Futureproof Dashboard",
  description: "Manage your savings and investments with Futureproof",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="backdrop-blur-xl bg-gray-900/50 rounded-3xl border border-gray-800/50 p-8 shadow-2xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
