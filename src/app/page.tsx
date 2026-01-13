"use client";

import { StockCard } from "@/components/stock-card";
import { MarketOverview } from "@/components/market-overview";
import { NewsCard } from "@/components/news-card";
import { StocksTable } from "@/components/stocks-table";
import { mockNews } from "@/data/mockData";
import { useFeature } from "@growthbook/growthbook-react";
import { useStocks } from "@/context/stock-context";

export default function Home() {
  const { stocks, loading } = useStocks();
  const showNews = useFeature("news-feed").on;
  const showMarketOverview = useFeature("market-overview").on;
  const showTable = useFeature("stocks-table").on ?? true;

  const totalMarketCap = stocks.reduce(
    (sum, stock) => sum + (stock.marketCap || 0),
    0
  );
  const avgChange =
    stocks.length > 0
      ? stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length
      : 0;
  const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Market Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time stock market data and insights
        </p>
      </div>

      {loading && stocks.length === 0 ? (
        <div className="text-center py-12">
          <div className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Loading market data...</p>
        </div>
      ) : (
        <>
          {showMarketOverview && (
            <MarketOverview
              totalMarketCap={totalMarketCap}
              marketChange={avgChange}
              volume={totalVolume}
              activeStocks={stocks.length}
            />
          )}

          {showTable ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                All Stocks
              </h2>
              <StocksTable data={stocks} />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Top Stocks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stocks.slice(0, 8).map((stock) => (
                  <StockCard
                    key={stock.symbol}
                    stock={{
                      symbol: stock.symbol,
                      name: stock.name || stock.symbol,
                      price: stock.price,
                      change: stock.change,
                      changePercent: stock.changePercent,
                      volume: stock.volume,
                      marketCap: stock.marketCap || 0,
                      high: stock.high,
                      low: stock.low,
                      open: stock.open,
                      previousClose: stock.previousClose,
                      pe: 0,
                      dividend: 0,
                      sector: stock.sector || "N/A",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {showNews && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Market News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
