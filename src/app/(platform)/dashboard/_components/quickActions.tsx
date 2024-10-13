import React from "react";
import Link from "next/link";
import {
  PlusIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const QuickActions: React.FC = () => {
  const actions = [
    { name: "Add Funds", icon: PlusIcon, href: "/dashboard/deposit" },
    { name: "Transfer", icon: ArrowPathIcon, href: "/dashboard/transfer" },
    {
      name: "View Analytics",
      icon: ChartBarIcon,
      href: "/dashboard/analytics",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <action.icon className="h-6 w-6 text-gray-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">
                {action.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
