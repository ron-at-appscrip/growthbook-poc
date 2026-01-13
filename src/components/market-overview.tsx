"use client";

import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface MarketOverviewProps {
  totalMarketCap: number;
  marketChange: number;
  volume: number;
  activeStocks: number;
}

export function MarketOverview({
  totalMarketCap,
  marketChange,
  volume,
  activeStocks,
}: MarketOverviewProps) {
  const isPositive = marketChange >= 0;

  const stats = [
    {
      label: "Total Market Cap",
      value: formatCurrency(totalMarketCap),
      icon: DollarSign,
      change: null,
    },
    {
      label: "Market Change",
      value: formatPercent(marketChange),
      icon: isPositive ? TrendingUp : TrendingDown,
      change: marketChange,
    },
    {
      label: "Total Volume",
      value: volume.toLocaleString(),
      icon: Activity,
      change: null,
    },
    {
      label: "Active Stocks",
      value: activeStocks.toString(),
      icon: TrendingUp,
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isStatPositive = stat.change !== null && stat.change >= 0;
        
        return (
          <div
            key={stat.label}
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <Icon
                className={`h-5 w-5 ${
                  stat.change !== null
                    ? isStatPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                    : "text-gray-400"
                }`}
              />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
