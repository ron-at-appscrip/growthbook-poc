"use client";

import { useState } from "react";
import { StockCard } from "@/components/stock-card";
import { mockStocks } from "@/data/mockData";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Search Stocks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find stocks by symbol, name, or sector
        </p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by symbol, name, or sector..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {searchTerm && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Found {filteredStocks.length} result{filteredStocks.length !== 1 ? "s" : ""}
          </p>
          {filteredStocks.length === 0 ? (
            <div className="text-center py-12 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
              <p className="text-gray-600 dark:text-gray-400">
                No stocks found matching "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          )}
        </div>
      )}

      {!searchTerm && (
        <div className="text-center py-12 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
          <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Enter a search term to find stocks
          </p>
        </div>
      )}
    </div>
  );
}
