"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { StockPriceData } from "@/types/stock";
import { formatCurrency } from "@/lib/utils";

interface StockChartProps {
  data: StockPriceData[];
  symbol: string;
  type?: "line" | "area";
}

export function StockChart({ data, symbol, type = "area" }: StockChartProps) {
  const chartData = data.map((item) => ({
    date: new Date(item.time).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: item.price,
    volume: item.volume,
  }));

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`color${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            fillOpacity={1}
            fill={`url(#color${symbol})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
