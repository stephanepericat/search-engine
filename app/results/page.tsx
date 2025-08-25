"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchHeader } from "@/components/search-header";
import { SearchFilters } from "@/components/search-filters";
import { SearchResultsList } from "@/components/search-results-list";
import { SearchPagination } from "@/components/search-pagination";
import { SearchSidebar } from "@/components/search-sidebar";
import { SearchResult } from "@/components/search-results-list";
import { getSearchResults } from "./actions";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [sidebarData, setSidebarData] = useState<{
    featuredSnippet?: {
      title: string;
      content: string;
      source: string;
      url: string;
    };
    relatedSearches?: Array<{
      query: string;
      count: string;
    }>;
    news?: Array<{
      title: string;
      source: string;
      time: string;
      url: string;
    }>;
    trending?: string[];
  }>({});
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Get search query from URL params
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(decodeURIComponent(query));
      performSearch(decodeURIComponent(query), 1);
    }
  }, [searchParams]);

  // Perform search using server action
  const performSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const searchResults = await getSearchResults(query, page);
      setResults(searchResults.results);
      setSidebarData(searchResults.sidebarData);
      setTotalResults(searchResults.totalResults);
      setSearchTime(searchResults.searchTime);
      setCurrentPage(page);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to load search results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery, 1);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // For now, just refresh the current results with the same query
    performSearch(searchQuery, currentPage);
  };

  const handlePageChange = (page: number) => {
    performSearch(searchQuery, page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resultsCount = totalResults > 0
    ? `About ${totalResults.toLocaleString()} results (${searchTime.toFixed(3)} seconds)`
    : searchQuery ? "No results found" : "";

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
        resultsCount={resultsCount}
      />

      <SearchFilters 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Results */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-4 p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="text-red-800 font-medium">Error</div>
                <div className="text-red-600">{error}</div>
                <button
                  onClick={() => performSearch(searchQuery, currentPage)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            <SearchResultsList
              results={results}
              isLoading={isLoading}
            />
            
            {!isLoading && results.length > 0 && (
              <SearchPagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalResults / 10)} // Calculate based on total results
                onPageChange={handlePageChange}
              />
            )}

            {!isLoading && results.length === 0 && searchQuery && !error && (
              <div className="text-center py-12">
                <div className="text-lg font-medium text-muted-foreground mb-2">
                  No results found for &quot;{searchQuery}&quot;
                </div>
                <p className="text-sm text-muted-foreground">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {!isLoading && Object.keys(sidebarData).length > 0 && (
              <SearchSidebar {...sidebarData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
