"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { StockChart } from "@/components/stock-chart";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, BarChart3, DollarSign, PieChart, RefreshCw } from "lucide-react";
import { useFeature } from "@growthbook/growthbook-react";
import { usePriceChartFlag } from "@/flags";

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  latestTradingDay: string;
}

interface StockOverview {
  symbol: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  marketCap: number;
  pe: number;
  peg: number;
  dividendYield: number;
  eps: number;
  beta: number;
  "52WeekHigh": number;
  "52WeekLow": number;
  priceToBook: number;
  profitMargin: number;
  revenueTTM: number;
  employees: string;
  exchange: string;
}

export default function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = use(params);
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [overview, setOverview] = useState<StockOverview | null>(null);
  const [priceData, setPriceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const chartEnabled = usePriceChartFlag(); // Use the feature flag hook
  const showAdvancedCharts = useFeature("advanced-charts").on;
  
  useEffect(() => {
    // Use mock data - NO API CALLS
    const { getStockQuote, getStockOverview, getDailyTimeSeries } = require("@/lib/mockStocks");
    const upperSymbol = symbol.toUpperCase();
    
    setLoading(true);
    
    // Simulate async for consistency
    setTimeout(() => {
      const quote = getStockQuote(upperSymbol);
      const overview = getStockOverview(upperSymbol);
      const timeSeries = getDailyTimeSeries(upperSymbol);
      
      if (quote) {
        setQuote({
          symbol: quote.symbol,
          price: quote.price,
          change: quote.change,
          changePercent: quote.changePercent,
          volume: quote.volume,
          high: quote.high,
          low: quote.low,
          open: quote.open,
          previousClose: quote.previousClose,
          latestTradingDay: new Date().toISOString().split("T")[0],
        });
      }
      
      if (overview) {
        setOverview(overview);
      }
      
      setPriceData(timeSeries);
      setLoading(false);
    }, 100);
  }, [symbol]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading stock data...</p>
      </div>
    );
  }

  if (!quote || !overview) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Stock not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The stock symbol "{symbol}" could not be found.
        </p>
      </div>
    );
  }

  const isPositive = quote.change >= 0;

  const stats = [
    { label: "Open", value: formatCurrency(quote.open) },
    { label: "High", value: formatCurrency(quote.high) },
    { label: "Low", value: formatCurrency(quote.low) },
    { label: "Previous Close", value: formatCurrency(quote.previousClose) },
    { label: "Volume", value: formatNumber(quote.volume) },
    { label: "Market Cap", value: formatCurrency(overview.marketCap) },
    { label: "P/E Ratio", value: overview.pe.toFixed(2) },
    { label: "Dividend Yield", value: `${overview.dividendYield.toFixed(2)}%` },
    { label: "EPS", value: formatCurrency(overview.eps) },
    { label: "Beta", value: overview.beta.toFixed(2) },
    { label: "52W High", value: formatCurrency(overview["52WeekHigh"]) },
    { label: "52W Low", value: formatCurrency(overview["52WeekLow"]) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {quote.symbol}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {overview.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {overview.sector} • {overview.exchange}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatCurrency(quote.price)}
                </p>
                <div
                  className={`flex items-center space-x-2 ${
                    isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  <span className="text-xl font-semibold">
                    {formatCurrency(Math.abs(quote.change))} ({formatPercent(quote.changePercent)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {overview.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 max-w-3xl">
            {overview.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {chartEnabled && (
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Price Chart</span>
                </h2>
                {showAdvancedCharts && (
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      1D
                    </button>
                    <button className="px-3 py-1 text-sm rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                      1W
                    </button>
                    <button className="px-3 py-1 text-sm rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                      1M
                    </button>
                    <button className="px-3 py-1 text-sm rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                      1Y
                    </button>
                  </div>
                )}
              </div>
              <StockChart data={priceData} symbol={quote.symbol} />
            </div>
          </div>
        )}
        
        {!chartEnabled && (
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Price chart is currently disabled. Enable the "plan-graph" feature flag to view charts.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Key Metrics</span>
            </h3>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {showAdvancedCharts && (
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Analytics</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">52W High</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(overview["52WeekHigh"])}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${((quote.price / overview["52WeekHigh"]) * 100).toFixed(0)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">52W Low</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(overview["52WeekLow"])}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${((quote.price / overview["52WeekHigh"]) * 100).toFixed(0)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Price to Book</span>
                    <span className="font-medium text-gray-900 dark:text-white">{overview.priceToBook.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Profit Margin</span>
                    <span className="font-medium text-gray-900 dark:text-white">{overview.profitMargin.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Revenue (TTM)</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(overview.revenueTTM)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Employees</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatNumber(parseInt(overview.employees))}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
