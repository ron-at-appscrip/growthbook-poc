"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Stock } from "@/types/stock";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";

interface StockCardProps {
  stock: Stock;
  compact?: boolean;
}

export function StockCard({ stock, compact = false }: StockCardProps) {
  const isPositive = stock.change >= 0;

  return (
    <Link
      href={`/stock/${stock.symbol}`}
      className={cn(
        "block p-4 rounded-lg border border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-gray-900 hover:shadow-lg transition-all",
        "hover:border-blue-300 dark:hover:border-blue-700"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {stock.symbol}
            </h3>
            {!compact && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {stock.name}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(stock.price)}
          </p>
        </div>
        <div
          className={cn(
            "flex items-center space-x-1 px-3 py-1 rounded-full",
            isPositive
              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {formatPercent(stock.changePercent)}
          </span>
        </div>
      </div>
      {!compact && (
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Vol: {stock.volume.toLocaleString()}</span>
          <span>{stock.sector}</span>
        </div>
      )}
    </Link>
  );
}
