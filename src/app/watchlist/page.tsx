"use client";

import { useState } from "react";
import { StockCard } from "@/components/stock-card";
import { mockStocks } from "@/data/mockData";
import { Plus, X } from "lucide-react";
import { useFeature } from "@growthbook/growthbook-react";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<string[]>(["AAPL", "MSFT", "GOOGL", "TSLA"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const showMultipleWatchlists = useFeature("multiple-watchlists").on;

  const watchlistStocks = mockStocks.filter((stock) =>
    watchlist.includes(stock.symbol)
  );

  const availableStocks = mockStocks.filter(
    (stock) =>
      !watchlist.includes(stock.symbol) &&
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
    setShowAddModal(false);
    setSearchTerm("");
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter((s) => s !== symbol));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Watchlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your favorite stocks
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Stock</span>
        </button>
      </div>

      {watchlistStocks.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your watchlist is empty
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Stock
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistStocks.map((stock) => (
            <div key={stock.symbol} className="relative">
              <StockCard stock={stock} />
              <button
                onClick={() => removeFromWatchlist(stock.symbol)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Stock to Watchlist
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSearchTerm("");
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
            />
            <div className="max-h-64 overflow-y-auto space-y-2">
              {availableStocks.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No stocks found
                </p>
              ) : (
                availableStocks.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => addToWatchlist(stock.symbol)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {stock.symbol}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stock.name}
                        </p>
                      </div>
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
