import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, MapPin, Star, Clock } from "lucide-react";

interface RelatedSearch {
  query: string;
  count: string;
}

interface FeaturedSnippet {
  title: string;
  content: string;
  source: string;
  url: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  url: string;
}

interface SearchSidebarProps {
  relatedSearches?: RelatedSearch[];
  featuredSnippet?: FeaturedSnippet;
  news?: NewsItem[];
  trending?: string[];
}

export function SearchSidebar({ 
  relatedSearches = [], 
  featuredSnippet,
  news = [],
  trending = []
}: SearchSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Featured Snippet */}
      {featuredSnippet && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Featured Snippet</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{featuredSnippet.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-4">
                {featuredSnippet.content}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-600 dark:text-green-400">
                  {featuredSnippet.source}
                </span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Searches */}
      {relatedSearches.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Related Searches</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {relatedSearches.map((search, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-primary hover:underline cursor-pointer">
                    {search.query}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {search.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* News */}
      {news.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Latest News
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {news.map((item, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-primary hover:underline cursor-pointer line-clamp-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{item.source}</span>
                    <span className="mx-1">•</span>
                    <span>{item.time}</span>
                  </div>
                  {index < news.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {trending.map((term, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-secondary/80"
                >
                  {term}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
