"use client";

import { StocksTable } from "@/components/stocks-table";
import { useStocks } from "@/context/stock-context";

export default function StocksPage() {
  const { stocks, loading } = useStocks();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Stocks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive stock market data
        </p>
      </div>

      {loading && stocks.length === 0 ? (
        <div className="text-center py-12">
          <div className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Loading stock data...</p>
        </div>
      ) : (
        <StocksTable data={stocks} />
      )}
    </div>
  );
}
