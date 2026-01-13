// Mock stock data - NO API CALLS
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap: number;
  sector: string;
}

interface TimeSeriesData {
  time: string;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
}

// Generate realistic time series data for a stock
function generateTimeSeries(basePrice: number, baseVolume: number, days: number = 100): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Realistic price variation
    const variation = (Math.random() - 0.5) * 0.05; // ±2.5% variation
    const price = basePrice * (1 + variation);
    const open = price * (1 + (Math.random() - 0.5) * 0.01);
    const high = Math.max(open, price) * (1 + Math.random() * 0.02);
    const low = Math.min(open, price) * (1 - Math.random() * 0.02);
    const volume = Math.floor(baseVolume * (0.5 + Math.random()));
    
    data.push({
      time: date.toISOString().split("T")[0],
      price: Number(price.toFixed(2)),
      volume,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
    });
  }
  
  return data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

// IBM Time Series Data (based on provided data)
const IBM_TIME_SERIES: TimeSeriesData[] = [
  { time: "2026-01-12", price: 312.18, volume: 3895197, open: 302.62, high: 312.33, low: 299.96 },
  { time: "2026-01-09", price: 304.22, volume: 2718828, open: 302.61, high: 307.00, low: 302.00 },
  { time: "2026-01-08", price: 302.72, volume: 3343273, open: 295.00, high: 303.67, low: 295.00 },
  { time: "2026-01-07", price: 296.73, volume: 2833274, open: 302.50, high: 304.31, low: 296.35 },
  { time: "2026-01-06", price: 302.47, volume: 4147315, open: 295.00, high: 303.04, low: 294.42 },
  { time: "2026-01-05", price: 294.97, volume: 4189960, open: 295.77, high: 299.19, low: 294.25 },
  { time: "2026-01-02", price: 291.50, volume: 4662804, open: 297.56, high: 297.57, low: 289.00 },
  { time: "2025-12-31", price: 296.21, volume: 3430133, open: 301.76, high: 301.85, low: 295.87 },
  { time: "2025-12-30", price: 302.05, volume: 1883651, open: 306.15, high: 306.24, low: 302.00 },
  { time: "2025-12-29", price: 305.74, volume: 4664711, open: 304.65, high: 310.00, low: 303.75 },
];

// Generate time series for other stocks
const TSCO_TIME_SERIES = generateTimeSeries(285.67, 5000000, 100);
const GPV_TIME_SERIES = generateTimeSeries(125.34, 500000, 100);
const MBG_TIME_SERIES = generateTimeSeries(68.92, 2000000, 100);
const RELIANCE_TIME_SERIES = generateTimeSeries(2845.50, 1000000, 100);

export const MOCK_STOCKS: StockData[] = [
  {
    symbol: "IBM",
    name: "International Business Machines Corp",
    price: 312.18,
    change: 9.56,
    changePercent: 3.16,
    volume: 3895197,
    high: 312.33,
    low: 299.96,
    open: 302.62,
    previousClose: 302.62,
    marketCap: 170000000000,
    sector: "Technology",
  },
  {
    symbol: "TSCO.LON",
    name: "Tesco PLC",
    price: 285.67,
    change: -3.21,
    changePercent: -1.11,
    volume: 12345678,
    high: 289.50,
    low: 284.20,
    open: 288.10,
    previousClose: 288.88,
    marketCap: 22000000000,
    sector: "Consumer Defensive",
  },
  {
    symbol: "GPV.TRV",
    name: "GPV Group ASA",
    price: 125.34,
    change: 1.89,
    changePercent: 1.53,
    volume: 345678,
    high: 126.20,
    low: 123.80,
    open: 124.20,
    previousClose: 123.45,
    marketCap: 1500000000,
    sector: "Technology",
  },
  {
    symbol: "MBG.DEX",
    name: "Mercedes-Benz Group AG",
    price: 68.92,
    change: 0.45,
    changePercent: 0.66,
    volume: 4567890,
    high: 69.50,
    low: 68.20,
    open: 68.50,
    previousClose: 68.47,
    marketCap: 73000000000,
    sector: "Consumer Cyclical",
  },
  {
    symbol: "RELIANCE.BSE",
    name: "Reliance Industries Ltd",
    price: 2845.50,
    change: 25.67,
    changePercent: 0.91,
    volume: 2345678,
    high: 2860.20,
    low: 2820.10,
    open: 2830.00,
    previousClose: 2819.83,
    marketCap: 1920000000000,
    sector: "Energy",
  },
];

export function getDashboardStocks(): StockData[] {
  // Return mock data immediately - NO API CALLS
  return MOCK_STOCKS;
}

export function getStockQuote(symbol: string): StockData | null {
  return MOCK_STOCKS.find(s => s.symbol === symbol.toUpperCase()) || null;
}

export function getStockOverview(symbol: string) {
  const stock = MOCK_STOCKS.find(s => s.symbol === symbol.toUpperCase());
  if (!stock) return null;

  return {
    symbol: stock.symbol,
    name: stock.name,
    description: `${stock.name} is a leading company in the ${stock.sector} sector.`,
    sector: stock.sector,
    industry: stock.sector,
    marketCap: stock.marketCap,
    pe: 18.5,
    peg: 1.2,
    dividendYield: 2.5,
    eps: stock.price / 18.5,
    beta: 1.1,
    "52WeekHigh": stock.high * 1.15,
    "52WeekLow": stock.low * 0.85,
    priceToBook: 3.2,
    profitMargin: 12.5,
    revenueTTM: stock.marketCap * 0.8,
    employees: "50000",
    exchange: stock.symbol.includes("LON") ? "LSE" : stock.symbol.includes("DEX") ? "XETR" : stock.symbol.includes("BSE") ? "BSE" : "NYSE",
  };
}

export function getDailyTimeSeries(symbol: string): TimeSeriesData[] {
  const upperSymbol = symbol.toUpperCase();
  
  switch (upperSymbol) {
    case "IBM":
      return IBM_TIME_SERIES;
    case "TSCO.LON":
      return TSCO_TIME_SERIES;
    case "GPV.TRV":
      return GPV_TIME_SERIES;
    case "MBG.DEX":
      return MBG_TIME_SERIES;
    case "RELIANCE.BSE":
      return RELIANCE_TIME_SERIES;
    default:
      // Generate default time series for unknown symbols
      const stock = MOCK_STOCKS.find(s => s.symbol === upperSymbol);
      if (stock) {
        return generateTimeSeries(stock.price, stock.volume, 100);
      }
      return [];
  }
}
