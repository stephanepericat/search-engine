"use client";

import { useState } from "react";
import { Search, Mic, Camera, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingSearches = [
    "JavaScript frameworks",
    "React best practices",
    "TypeScript tutorial",
    "Web development trends",
    "AI and machine learning",
    "Next.js 14 features"
  ];

  const quickActions = [
    { icon: Camera, label: "Image Search", description: "Search by image" },
    { icon: Mic, label: "Voice Search", description: "Search with voice" },
    { icon: Settings, label: "Advanced Search", description: "Refine your search" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would implement the actual search functionality
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">SearchEngine</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Find Anything,
              <span className="text-primary"> Instantly</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your gateway to the world's information. Search billions of web pages, 
              images, videos, and more with lightning-fast results.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Search Tabs */}
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="maps">Maps</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto space-y-8">
          <h3 className="text-2xl font-semibold text-center">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <action.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{action.label}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Trending Searches */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl font-semibold text-center">Trending Searches</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {trendingSearches.map((search, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 px-4 py-2 text-sm"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-semibold mb-3">About</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">How Search works</a></li>
                  <li><a href="#" className="hover:text-foreground">Our story</a></li>
                  <li><a href="#" className="hover:text-foreground">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Privacy & Terms</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-foreground">Settings</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Help</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Search Help</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground">Feedback</a></li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; 2025 SearchEngine. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
