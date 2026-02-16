"use client";

import { useFeature } from "@growthbook/growthbook-react";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";
import { StockChart } from "@/components/stock-chart";
import { generatePriceData } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  const showAdvancedAnalytics = useFeature("advanced-features").on;

  if (!showAdvancedAnalytics) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Feature Not Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced analytics is currently disabled. Enable it in GrowthBook to access this feature.
        </p>
      </div>
    );
  }

  const marketData = generatePriceData("AAPL", 30);
  const sectorData = [
    { name: "Technology", value: 45, color: "#3b82f6" },
    { name: "Financial", value: 20, color: "#10b981" },
    { name: "Healthcare", value: 15, color: "#f59e0b" },
    { name: "Consumer", value: 12, color: "#ef4444" },
    { name: "Energy", value: 8, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Market Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced market insights and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Trend</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Bullish</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600 dark:text-green-400">+8.2%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Volatility</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Low</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            <PieChart className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">5 Sectors</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Diversification</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Good</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">24/7</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trading Volume</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">High</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Market Performance
          </h2>
          <StockChart data={marketData} symbol="MARKET" />
        </div>

        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sector Allocation
          </h2>
          <div className="space-y-4">
            {sectorData.map((sector) => (
              <div key={sector.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">{sector.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {sector.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${sector.value}%`,
                      backgroundColor: sector.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hey there this is the coderabbit poc">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Key Insights
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
              Market Opportunity
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Technology sector showing strong momentum with 12% growth this quarter.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-1">
              Risk Assessment
            </p>
            <p className="text-sm text-green-700 dark:text-green-400">
              Portfolio diversification is well-balanced across 5 major sectors.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-1">
              Market Alert
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Energy sector volatility increased by 5% - consider rebalancing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
