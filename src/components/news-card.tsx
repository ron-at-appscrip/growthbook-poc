"use client";

import { NewsItem } from "@/types/stock";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all hover:border-blue-300 dark:hover:border-blue-700"
    >
      <div className="flex space-x-4">
        {news.imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
              {news.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {news.summary}
          </p>
          <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
            <span>{news.source}</span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(news.publishedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
