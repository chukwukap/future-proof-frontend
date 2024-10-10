"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-gray-300"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Centered Navigation (hidden on mobile) */}
        <nav className="hidden md:flex flex-grow justify-center items-center">
          <div className="flex items-center px-6 py-3 rounded-full border border-white border-opacity-20 bg-black bg-opacity-50">
            <div className="flex space-x-8">
              <NavLink href="/dashboard" active={pathname === "/dashboard"}>
                Dashboard
              </NavLink>
              <NavLink href="/goals" active={pathname === "/goals"}>
                Goals
              </NavLink>
              <NavLink
                href="/transactions"
                active={pathname === "/transactions"}
              >
                Transactions
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Sign In Button */}
        <div className="flex justify-end">
          <Link
            href="/signin"
            className="flex items-center px-6 py-3 bg-white rounded-lg text-black font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Sign in
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Mobile menu (shown when mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-90 backdrop-blur-sm">
          <nav className="flex flex-col space-y-4 p-4">
            <MobileNavLink href="/dashboard" active={pathname === "/dashboard"}>
              Dashboard
            </MobileNavLink>
            <MobileNavLink href="/goals" active={pathname === "/goals"}>
              Goals
            </MobileNavLink>
            <MobileNavLink
              href="/transactions"
              active={pathname === "/transactions"}
            >
              Transactions
            </MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, active, children }) => (
  <Link
    href={href}
    className={`text-sm font-medium ${
      active ? "text-white" : "text-gray-300 hover:text-white"
    } transition-colors duration-200`}
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ href, active, children }) => (
  <Link
    href={href}
    className={`text-sm font-medium ${
      active ? "text-white" : "text-gray-300 hover:text-white"
    } transition-colors duration-200 block py-2`}
  >
    {children}
  </Link>
);

export default MainHeader;
