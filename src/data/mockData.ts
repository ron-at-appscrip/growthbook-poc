import { Stock, NewsItem, StockPriceData } from "@/types/stock";

export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.45,
    change: 2.35,
    changePercent: 1.33,
    volume: 45234567,
    marketCap: 2800000000000,
    high: 179.20,
    low: 176.10,
    open: 176.50,
    previousClose: 176.10,
    pe: 28.5,
    dividend: 0.96,
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.92,
    change: -3.21,
    changePercent: -0.84,
    volume: 23456789,
    marketCap: 2800000000000,
    high: 382.50,
    low: 377.20,
    open: 380.10,
    previousClose: 382.13,
    pe: 32.1,
    dividend: 3.00,
    sector: "Technology",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.56,
    change: 1.89,
    changePercent: 1.34,
    volume: 34567890,
    marketCap: 1800000000000,
    high: 143.20,
    low: 140.80,
    open: 141.20,
    previousClose: 140.67,
    pe: 24.8,
    dividend: 0.00,
    sector: "Technology",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 151.23,
    change: 0.45,
    changePercent: 0.30,
    volume: 45678901,
    marketCap: 1600000000000,
    high: 152.10,
    low: 150.50,
    open: 151.00,
    previousClose: 150.78,
    pe: 48.2,
    dividend: 0.00,
    sector: "Consumer Cyclical",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.67,
    change: -5.23,
    changePercent: -2.06,
    volume: 67890123,
    marketCap: 790000000000,
    high: 254.20,
    low: 247.10,
    open: 252.30,
    previousClose: 253.90,
    pe: 65.3,
    dividend: 0.00,
    sector: "Consumer Cyclical",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 485.34,
    change: 8.92,
    changePercent: 1.87,
    volume: 12345678,
    marketCap: 1200000000000,
    high: 487.50,
    low: 478.20,
    open: 480.10,
    previousClose: 476.42,
    pe: 26.4,
    dividend: 2.00,
    sector: "Technology",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.23,
    change: 15.67,
    changePercent: 1.82,
    volume: 34567890,
    marketCap: 2200000000000,
    high: 880.50,
    low: 865.20,
    open: 870.10,
    previousClose: 859.56,
    pe: 68.2,
    dividend: 0.16,
    sector: "Technology",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 198.45,
    change: 1.23,
    changePercent: 0.62,
    volume: 12345678,
    marketCap: 570000000000,
    high: 199.20,
    low: 197.10,
    open: 197.80,
    previousClose: 197.22,
    pe: 12.5,
    dividend: 4.20,
    sector: "Financial Services",
  },
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Tech Stocks Rally on Strong Earnings Reports",
    summary: "Major technology companies report better-than-expected earnings, driving market optimism.",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    url: "#",
    imageUrl: "https://via.placeholder.com/400x200",
  },
  {
    id: "2",
    title: "Federal Reserve Holds Interest Rates Steady",
    summary: "The Fed maintains current interest rates, citing stable economic indicators.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    url: "#",
    imageUrl: "https://via.placeholder.com/400x200",
  },
  {
    id: "3",
    title: "AI Sector Sees Record Investment",
    summary: "Venture capital flows into AI companies reach all-time highs this quarter.",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    url: "#",
    imageUrl: "https://via.placeholder.com/400x200",
  },
  {
    id: "4",
    title: "Energy Stocks Surge on Oil Price Increase",
    summary: "Rising oil prices boost energy sector stocks across the board.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    url: "#",
    imageUrl: "https://via.placeholder.com/400x200",
  },
];

export function generatePriceData(symbol: string, days: number = 30): StockPriceData[] {
  const basePrice = mockStocks.find(s => s.symbol === symbol)?.price || 100;
  const data: StockPriceData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.1;
    const price = basePrice * (1 + variation);
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    
    data.push({
      time: date.toISOString().split("T")[0],
      price: Number(price.toFixed(2)),
      volume,
    });
  }
  
  return data;
}
