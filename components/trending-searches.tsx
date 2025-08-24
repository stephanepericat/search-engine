"use client";

import { Badge } from "@/components/ui/badge";

const trendingSearches = [
  "JavaScript frameworks",
  "React best practices",
  "TypeScript tutorial",
  "Web development trends",
  "AI and machine learning",
  "Next.js 14 features"
];

interface TrendingSearchesProps {
  onSearchSelect: (search: string) => void;
}

export function TrendingSearches({ onSearchSelect }: TrendingSearchesProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h3 className="text-2xl font-semibold text-center">Trending Searches</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {trendingSearches.map((search, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 px-4 py-2 text-sm"
            onClick={() => onSearchSelect(search)}
          >
            {search}
          </Badge>
        ))}
      </div>
    </div>
  );
}
