"use client";

import { useState } from "react";
import { Portfolio } from "@/types/stock";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown, Plus, PieChart } from "lucide-react";
import { StockChart } from "@/components/stock-chart";
import { generatePriceData } from "@/data/mockData";
import { useFeature } from "@growthbook/growthbook-react";

export default function PortfolioPage() {
  const showAdvancedAnalytics = useFeature("portfolio-analytics").on;

  const [portfolio] = useState<Portfolio[]>([
    {
      symbol: "AAPL",
      shares: 10,
      averagePrice: 150.00,
      currentPrice: 178.45,
      totalValue: 1784.50,
      gainLoss: 284.50,
      gainLossPercent: 18.97,
    },
    {
      symbol: "MSFT",
      shares: 5,
      averagePrice: 350.00,
      currentPrice: 378.92,
      totalValue: 1894.60,
      gainLoss: 144.60,
      gainLossPercent: 8.26,
    },
    {
      symbol: "GOOGL",
      shares: 15,
      averagePrice: 130.00,
      currentPrice: 142.56,
      totalValue: 2138.40,
      gainLoss: 188.40,
      gainLossPercent: 9.66,
    },
  ]);

  const totalValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0);
  const totalGainLoss = portfolio.reduce((sum, item) => sum + item.gainLoss, 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your investments and performance
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total Portfolio Value
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalValue)}
          </p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total Gain/Loss
          </p>
          <div className="flex items-center space-x-2">
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
            <p
              className={`text-3xl font-bold ${
                totalGainLoss >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatCurrency(totalGainLoss)}
            </p>
          </div>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Total Return
          </p>
          <p
            className={`text-3xl font-bold ${
              totalGainLossPercent >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {formatPercent(totalGainLossPercent)}
          </p>
        </div>
      </div>

      {showAdvancedAnalytics && (
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Portfolio Allocation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((item) => {
              const percentage = (item.totalValue / totalValue) * 100;
              return (
                <div key={item.symbol}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.symbol}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Holdings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Symbol
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Shares
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Avg Price
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Current Price
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Total Value
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Gain/Loss
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Return %
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item) => (
                <tr
                  key={item.symbol}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4">
                    <a
                      href={`/stock/${item.symbol}`}
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.symbol}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {item.shares}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {formatCurrency(item.averagePrice)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {formatCurrency(item.currentPrice)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {formatCurrency(item.totalValue)}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      item.gainLoss >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatCurrency(item.gainLoss)}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      item.gainLossPercent >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatPercent(item.gainLossPercent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
