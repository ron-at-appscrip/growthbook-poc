import axios from "axios";

// Alpha Vantage API - Direct integration
// const ALPHA_VANTAGE_API_KEY = "LMXBWG9W22KX450C";
const ALPHA_VANTAGE_API_KEY = 'G7SQ6K2BGVUVV6A6'
const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

// Popular stock symbols
export const POPULAR_STOCKS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "JPM",
  "V", "JNJ", "WMT", "PG", "MA", "UNH", "HD", "DIS", "BAC", "NFLX",
  "PYPL", "INTC", "CMCSA", "PFE", "CSCO", "XOM", "ABBV", "AVGO", "COST"
];

interface AlphaVantageQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

interface AlphaVantageOverview {
  Symbol: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FullTimeEmployees: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
}

export async function getStockQuote(symbol: string) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    if (response.data["Note"]) {
      throw new Error("API call frequency limit reached. Please wait a moment.");
    }

    const quote = response.data["Global Quote"] as AlphaVantageQuote;
    if (!quote || !quote["01. symbol"]) {
      throw new Error(`No data found for symbol ${symbol}`);
    }

    return {
      symbol: quote["01. symbol"],
      price: parseFloat(quote["05. price"]),
      change: parseFloat(quote["09. change"]),
      changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
      volume: parseInt(quote["06. volume"]),
      high: parseFloat(quote["03. high"]),
      low: parseFloat(quote["04. low"]),
      open: parseFloat(quote["02. open"]),
      previousClose: parseFloat(quote["08. previous close"]),
      latestTradingDay: quote["07. latest trading day"],
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    throw error;
  }
}

export async function getStockOverview(symbol: string) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: "OVERVIEW",
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    if (!response.data.Symbol) {
      throw new Error(`No overview data found for symbol ${symbol}`);
    }

    const overview = response.data as AlphaVantageOverview;
    return {
      symbol: overview.Symbol,
      name: overview.Name,
      description: overview.Description || "",
      sector: overview.Sector || "N/A",
      industry: overview.Industry || "N/A",
      marketCap: parseFloat(overview.MarketCapitalization) || 0,
      pe: parseFloat(overview.PERatio) || 0,
      peg: parseFloat(overview.PEGRatio) || 0,
      dividendYield: parseFloat(overview.DividendYield) || 0,
      eps: parseFloat(overview.EPS) || 0,
      beta: parseFloat(overview.Beta) || 0,
      "52WeekHigh": parseFloat(overview["52WeekHigh"]) || 0,
      "52WeekLow": parseFloat(overview["52WeekLow"]) || 0,
      priceToBook: parseFloat(overview.PriceToBookRatio) || 0,
      profitMargin: parseFloat(overview.ProfitMargin) || 0,
      revenueTTM: parseFloat(overview.RevenueTTM) || 0,
      employees: overview.FullTimeEmployees || "0",
      exchange: overview.Exchange || "N/A",
    };
  } catch (error) {
    console.error(`Error fetching overview for ${symbol}:`, error);
    throw error;
  }
}

export async function getMultipleStockQuotes(symbols: string[]) {
  // Alpha Vantage free tier allows 5 API calls per minute
  // We'll fetch in batches with delays to respect rate limits
  const quotes: any[] = [];
  const batchSize = 5;
  
  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    
    // Fetch batch with delay between batches to respect rate limits
    if (i > 0) {
      // Wait 12 seconds between batches (5 calls per minute = 12 seconds per call)
      await new Promise(resolve => setTimeout(resolve, 12000));
    }
    
    const batchQuotes = await Promise.allSettled(
      batch.map((symbol) => getStockQuote(symbol))
    );
    
    batchQuotes.forEach((result, index) => {
      if (result.status === "fulfilled") {
        quotes.push(result.value);
      } else {
        console.error(`Failed to fetch ${batch[index]}:`, result.reason);
        // Include a basic error entry
        quotes.push({
          symbol: batch[index],
          price: 0,
          change: 0,
          changePercent: 0,
          volume: 0,
          high: 0,
          low: 0,
          open: 0,
          previousClose: 0,
          latestTradingDay: new Date().toISOString().split("T")[0],
        });
      }
    });
  }
  
  return quotes;
}

// Get daily time series for charts
export async function getDailyTimeSeries(symbol: string, outputsize: "compact" | "full" = "compact") {
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: symbol,
        outputsize: outputsize,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    if (response.data["Error Message"]) {
      throw new Error(response.data["Error Message"]);
    }

    if (response.data["Note"]) {
      throw new Error("API call frequency limit reached. Please wait a moment.");
    }

    const timeSeries = response.data["Time Series (Daily)"];
    if (!timeSeries) {
      throw new Error(`No time series data found for symbol ${symbol}`);
    }

    // Convert to array format for charts
    const data = Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => ({
        time: date,
        price: parseFloat(values["4. close"]),
        volume: parseInt(values["5. volume"]),
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    return data;
  } catch (error) {
    console.error(`Error fetching time series for ${symbol}:`, error);
    throw error;
  }
}
