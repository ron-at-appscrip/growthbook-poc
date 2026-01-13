"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, ArrowUpDown, Search } from "lucide-react";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils";
import Link from "next/link";

interface StockData {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  sector?: string;
}

const columnHelper = createColumnHelper<StockData>();

export function StocksTable({ data }: { data: StockData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("symbol", {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Symbol</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: (info) => (
          <Link
            href={`/stock/${info.getValue()}`}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Company Name",
        cell: (info) => (
          <span className="text-gray-700 dark:text-gray-300">
            {info.getValue() || "N/A"}
          </span>
        ),
      }),
      columnHelper.accessor("price", {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Price</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: (info) => (
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("change", {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Change</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: (info) => {
          const value = info.getValue();
          const isPositive = value >= 0;
          return (
            <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-medium">{formatCurrency(Math.abs(value))}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("changePercent", {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Change %</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: (info) => {
          const value = info.getValue();
          const isPositive = value >= 0;
          return (
            <span className={`font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {formatPercent(value)}
            </span>
          );
        },
      }),
      columnHelper.accessor("volume", {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Volume</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: (info) => (
          <span className="text-gray-700 dark:text-gray-300">
            {formatNumber(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("high", {
        header: "High",
        cell: (info) => (
          <span className="text-gray-700 dark:text-gray-300">
            {formatCurrency(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("low", {
        header: "Low",
        cell: (info) => (
          <span className="text-gray-700 dark:text-gray-300">
            {formatCurrency(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("open", {
        header: "Open",
        cell: (info) => (
          <span className="text-gray-700 dark:text-gray-300">
            {formatCurrency(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("previousClose", {
        header: "Prev Close",
        cell: (info) => (
          <span className="text-gray-700 dark:text-gray-300">
            {formatCurrency(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("marketCap", {
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span>Market Cap</span>
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: (info) => {
          const value = info.getValue();
          if (!value) return <span className="text-gray-400">N/A</span>;
          return (
            <span className="text-gray-700 dark:text-gray-300">
              {formatCurrency(value)}
            </span>
          );
        },
      }),
      columnHelper.accessor("sector", {
        header: "Sector",
        cell: (info) => (
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {info.getValue() || "N/A"}
          </span>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {table.getRowModel().rows.length} of {data.length} stocks
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Next
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Last
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Page</span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
