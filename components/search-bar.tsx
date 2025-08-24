"use client";

import { useState } from "react";
import { Search, Mic, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export function SearchBar({ searchQuery, onSearchQueryChange, onSearch }: SearchBarProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={onSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="pl-12 pr-4 h-12 text-lg"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button type="submit" size="lg">
              Search
            </Button>
            <Button type="button" variant="outline" size="lg">
              I'm Feeling Lucky
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
