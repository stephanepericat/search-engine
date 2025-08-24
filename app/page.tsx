"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SearchBar } from "@/components/search-bar";
import { SearchTabs } from "@/components/search-tabs";
import { QuickActions } from "@/components/quick-actions";
import { TrendingSearches } from "@/components/trending-searches";
import { Footer } from "@/components/footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would implement the actual search functionality
    }
  };

  const handleSearchSelect = (search: string) => {
    setSearchQuery(search);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <HeroSection />

          {/* Search Bar */}
          <SearchBar 
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
          />

          {/* Search Tabs */}
          <SearchTabs />
        </div>

        <Separator className="my-12" />

        {/* Quick Actions */}
        <QuickActions />

        <Separator className="my-12" />

        {/* Trending Searches */}
        <TrendingSearches onSearchSelect={handleSearchSelect} />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
