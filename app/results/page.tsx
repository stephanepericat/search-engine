"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchHeader } from "@/components/search-header";
import { SearchFilters } from "@/components/search-filters";
import { SearchResultsList } from "@/components/search-results-list";
import { SearchPagination } from "@/components/search-pagination";
import { SearchSidebar } from "@/components/search-sidebar";

// Mock data - in a real app, this would come from an API
const mockResults = [
  {
    id: "1",
    title: "React Documentation - Getting Started with React",
    url: "https://react.dev/learn",
    description: "React is a JavaScript library for building user interfaces. Learn how to get started with React, create components, manage state, and build interactive web applications.",
    domain: "react.dev",
    timestamp: "2 days ago",
    favicon: "/api/favicon?domain=react.dev",
    tags: ["JavaScript", "Frontend", "Library"]
  },
  {
    id: "2",
    title: "JavaScript Frameworks Comparison 2025",
    url: "https://example.com/js-frameworks",
    description: "A comprehensive comparison of the most popular JavaScript frameworks in 2025, including React, Vue.js, Angular, and Svelte. Learn about their strengths, weaknesses, and use cases.",
    domain: "example.com",
    timestamp: "1 week ago",
    tags: ["JavaScript", "Frameworks", "Comparison"]
  },
  {
    id: "3",
    title: "TypeScript Tutorial: Complete Guide for Beginners",
    url: "https://typescriptlang.org/docs/",
    description: "Learn TypeScript from scratch with this comprehensive tutorial. Covers types, interfaces, classes, generics, and advanced features with practical examples.",
    domain: "typescriptlang.org",
    timestamp: "3 days ago",
    favicon: "/api/favicon?domain=typescriptlang.org",
    tags: ["TypeScript", "Tutorial", "Programming"]
  },
  {
    id: "4",
    title: "Next.js 14 Features and Performance Improvements",
    url: "https://nextjs.org/blog/next-14",
    description: "Discover the latest features in Next.js 14, including improved performance, new APIs, and enhanced developer experience. Learn how to upgrade your applications.",
    domain: "nextjs.org",
    timestamp: "5 days ago",
    favicon: "/api/favicon?domain=nextjs.org",
    tags: ["Next.js", "React", "Framework"]
  },
  {
    id: "5",
    title: "Web Development Best Practices 2025",
    url: "https://web.dev/best-practices",
    description: "Essential web development best practices for building modern, accessible, and performant websites. Covers SEO, accessibility, performance optimization, and security.",
    domain: "web.dev",
    timestamp: "1 day ago",
    tags: ["Best Practices", "Web Development", "Performance"]
  }
];

const mockSidebarData = {
  featuredSnippet: {
    title: "What are JavaScript Frameworks?",
    content: "JavaScript frameworks are collections of pre-written JavaScript code that provide a structure for building web applications. They offer reusable components, tools, and conventions that speed up development and maintain code quality.",
    source: "developer.mozilla.org",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks"
  },
  relatedSearches: [
    { query: "react vs vue", count: "2.1M" },
    { query: "javascript best practices", count: "1.8M" },
    { query: "frontend frameworks 2025", count: "890K" },
    { query: "typescript vs javascript", count: "1.2M" }
  ],
  news: [
    {
      title: "React 19 Beta Released with New Features",
      source: "React Blog",
      time: "2 hours ago",
      url: "https://react.dev/blog/2024/12/05/react-19"
    },
    {
      title: "JavaScript Performance Tips for 2025",
      source: "Web.dev",
      time: "1 day ago",
      url: "https://web.dev/performance"
    },
    {
      title: "TypeScript 5.4 Introduces New Syntax",
      source: "TypeScript Blog",
      time: "3 days ago",
      url: "https://devblogs.microsoft.com/typescript"
    }
  ],
  trending: ["AI development", "WebAssembly", "Progressive Web Apps", "Micro frontends", "JAMstack"]
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(mockResults);

  // Get search query from URL params
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    }
  }, [searchParams]);

  // Simulate search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setResults(mockResults);
        setIsLoading(false);
        setCurrentPage(1);
      }, 1000);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsLoading(true);
    // Simulate filtering results by tab
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    // Simulate loading new page
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 500);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resultsCount = `About ${(results.length * 1000).toLocaleString()} results (0.${Math.floor(Math.random() * 9) + 1} seconds)`;

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
            <SearchResultsList 
              results={results}
              isLoading={isLoading}
            />
            
            {!isLoading && results.length > 0 && (
              <SearchPagination
                currentPage={currentPage}
                totalPages={10} // Mock total pages
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SearchSidebar {...mockSidebarData} />
          </div>
        </div>
      </div>
    </div>
  );
}
