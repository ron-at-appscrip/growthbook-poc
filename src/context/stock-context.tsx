"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { getDashboardStocks, StockData } from "@/lib/mockStocks";


interface StockContextType {
  stocks: StockData[];
  loading: boolean;
  getStock: (symbol: string) => StockData | undefined;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const isFetching = useRef(false);

  useEffect(() => {
    // Fetch only once when component mounts
    if (hasFetched.current || isFetching.current) return;
    
    const fetchStocks = () => {
      if (hasFetched.current || isFetching.current) return;
      
      isFetching.current = true;
      setLoading(true);
      
      // Use mock data - NO API CALLS
      const stocks = getDashboardStocks();
      setStocks(stocks);
      hasFetched.current = true;
      setLoading(false);
      isFetching.current = false;
    };

    fetchStocks();
  }, []); // Empty dependency array - only run once

  const getStock = (symbol: string) => {
    return stocks.find(s => s.symbol === symbol.toUpperCase());
  };

  return (
    <StockContext.Provider value={{ stocks, loading, getStock }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStocks() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStocks must be used within StockProvider");
  }
  return context;
}
