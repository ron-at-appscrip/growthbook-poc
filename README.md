# StockPlatform - Advanced Stock Trading Platform

A comprehensive, feature-rich stock trading platform built with Next.js, TypeScript, and integrated with GrowthBook for feature flagging and experimentation.

## Features

### Core Features
- **Dashboard**: Real-time market overview with top stocks and market statistics
- **All Stocks Page**: Professional data table with 25+ stocks, sorting, filtering, and pagination
- **Stock Details**: Comprehensive stock pages with charts, metrics, and analytics
- **Watchlist**: Create and manage personalized stock watchlists
- **Portfolio**: Track your investments with detailed performance metrics
- **Search**: Powerful search functionality to find stocks by symbol, name, or sector
- **News Feed**: Stay updated with the latest market news and insights
- **Settings**: Customize your experience with dark mode, notifications, and more
- **Real-Time API Integration**: Fetches live stock data from Alpha Vantage API

### GrowthBook Integration
This platform uses GrowthBook for feature flagging, allowing you to:
- Enable/disable features dynamically
- Run A/B tests
- Control feature rollouts
- Manage experiments

**Feature Flags Used:**
- `advanced-features`: Controls access to advanced analytics page
- `news-feed`: Toggles news feed visibility on dashboard
- `market-overview`: Controls market overview statistics
- `advanced-charts`: Enables advanced chart features
- `portfolio-analytics`: Shows portfolio allocation charts
- `multiple-watchlists`: Enables multiple watchlist support
- `stocks-table`: Controls professional data table view on dashboard

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd growthbook-poc
```

2. Install dependencies:
```bash
npm install
```

3. Set up Environment Variables (optional):
   - Copy `.env.example` to `.env.local`
   - **GrowthBook** (optional): Get your API host and client key from [GrowthBook.io](https://growthbook.io)
   - **Alpha Vantage** (optional): Get your free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
   - Add them to `.env.local`:
   ```
   NEXT_PUBLIC_GROWTHBOOK_API_HOST=https://cdn.growthbook.io
   NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY=your_client_key_here
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
   ```
   
   **Note**: If Alpha Vantage API key is not provided, the app will use realistic mock data for demonstration purposes.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── analytics/         # Advanced analytics page
│   ├── portfolio/         # Portfolio tracking page
│   ├── search/            # Stock search page
│   ├── settings/          # Settings page
│   ├── stock/[symbol]/    # Individual stock detail pages
│   ├── watchlist/         # Watchlist management page
│   ├── layout.tsx         # Root layout with GrowthBook provider
│   └── page.tsx           # Dashboard home page
├── components/            # Reusable React components
│   ├── navbar.tsx         # Navigation bar
│   ├── stock-card.tsx     # Stock card component
│   ├── stock-chart.tsx    # Stock price charts
│   ├── market-overview.tsx # Market statistics
│   └── news-card.tsx      # News article cards
├── data/                  # Mock data and utilities
│   └── mockData.ts        # Sample stock and news data
├── lib/                   # Utility functions
│   ├── utils.ts           # General utilities
│   └── growthbook.ts      # GrowthBook configuration
├── providers/             # React context providers
│   └── growthbook-provider.tsx # GrowthBook provider wrapper
└── types/                 # TypeScript type definitions
    └── stock.ts           # Stock-related types
```

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **GrowthBook**: Feature flagging and experimentation platform
- **TanStack Table**: Professional data tables with sorting, filtering, and pagination
- **Recharts**: Charting library for data visualization
- **Alpha Vantage API**: Real-time stock market data
- **Axios**: HTTP client for API requests
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities

## GrowthBook Setup

To fully utilize GrowthBook features:

1. Sign up at [GrowthBook.io](https://growthbook.io)
2. Create a new project
3. Get your API host and client key from the project settings
4. Add feature flags in GrowthBook dashboard:
   - `advanced-features`
   - `news-feed`
   - `market-overview`
   - `advanced-charts`
   - `portfolio-analytics`
   - `multiple-watchlists`
5. Configure the flags in your GrowthBook dashboard to control feature visibility

## Development

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Features Overview

### Dashboard
- Market overview statistics
- Professional data table with 25+ stocks (sortable, filterable, paginated)
- Top stocks grid view (alternative to table)
- Market news feed (feature flag controlled)
- Auto-refresh every 30 seconds

### Stock Details
- Real-time price information from API
- Interactive price charts
- Comprehensive key metrics (P/E, Beta, Market Cap, etc.)
- Company overview and description
- 52-week high/low tracking
- Advanced analytics (feature flag controlled)

### Watchlist
- Add/remove stocks
- Quick access to favorite stocks
- Search functionality

### Portfolio
- Track holdings
- Calculate gains/losses
- Portfolio allocation charts (feature flag controlled)
- Performance metrics

### All Stocks Page
- Professional data table with 25+ stocks
- Sortable columns (price, change, volume, market cap, etc.)
- Global search/filter functionality
- Pagination (10, 25, 50, 100 items per page)
- Real-time data updates
- Responsive design

### Search
- Search by symbol, name, or sector
- Real-time filtering
- Quick navigation to stock details

### Settings
- Dark mode toggle
- Notification preferences
- Language selection
- Privacy settings

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
# growthbook-poc
