"use client";

import { Search, Mic, Camera, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  resultsCount?: string;
}

export function SearchHeader({ 
  searchQuery, 
  onSearchQueryChange, 
  onSearch, 
  resultsCount 
}: SearchHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">SearchEngine</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <form onSubmit={onSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className="pl-10 pr-20 h-10"
                placeholder="Search..."
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6">
                  <Mic className="w-3 h-3" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6">
                  <Camera className="w-3 h-3" />
                </Button>
                <Button type="submit" variant="ghost" size="icon" className="h-6 w-6">
                  <Search className="w-3 h-3" />
                </Button>
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>

        {/* Results Count */}
        {resultsCount && (
          <div className="mt-2 text-sm text-muted-foreground">
            {resultsCount}
          </div>
        )}
      </div>
    </header>
  );
}
