"use client";
import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center">
            <div className="max-w-xs w-full lg:max-w-md relative">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800/50 border-gray-700 focus:ring-primary pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-gray-900" />
            </Button>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Chukwuka Uba</p>
                  <p className="text-xs text-gray-400">chukwuka.base.eth</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
