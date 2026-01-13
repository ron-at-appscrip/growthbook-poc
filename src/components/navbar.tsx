"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Settings, TrendingUp, Briefcase, List, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFeature } from "@growthbook/growthbook-react";

export function Navbar() {
  const pathname = usePathname();
  const showAdvancedFeatures = useFeature("advanced-features").on;

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/stocks", label: "All Stocks", icon: TrendingUp },
    { href: "/watchlist", label: "Watchlist", icon: List },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    ...(showAdvancedFeatures ? [{ href: "/analytics", label: "Analytics", icon: TrendingUp }] : []),
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                StockPlatform
              </span>
            </Link>
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
              href="/settings"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
