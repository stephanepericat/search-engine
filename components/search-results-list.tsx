import { SearchResultItem } from "./search-result-item";
import { Skeleton } from "@/components/ui/skeleton";

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  domain: string;
  timestamp?: string;
  favicon?: string;
  tags?: string[];
}

interface SearchResultsListProps {
  results: SearchResult[];
  isLoading?: boolean;
}

function SearchResultSkeleton() {
  return (
    <div className="mb-4 p-4 border rounded-lg">
      <div className="flex items-center mb-2">
        <Skeleton className="h-4 w-4 rounded mr-2" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <div className="flex gap-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export function SearchResultsList({ results, isLoading = false }: SearchResultsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <SearchResultSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-medium text-muted-foreground mb-2">
          No results found
        </div>
        <p className="text-sm text-muted-foreground">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  );
}
