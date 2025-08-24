import { ExternalLink, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  domain: string;
  timestamp?: string;
  favicon?: string;
  tags?: string[];
}

interface SearchResultItemProps {
  result: SearchResult;
}

export function SearchResultItem({ result }: SearchResultItemProps) {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* URL and Domain */}
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              {result.favicon && (
                <img 
                  src={result.favicon} 
                  alt="" 
                  className="w-4 h-4 mr-2 rounded"
                />
              )}
              <span className="text-green-600 dark:text-green-400">{result.domain}</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-medium text-primary hover:underline cursor-pointer mb-2 line-clamp-2">
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
              {result.description}
            </p>

            {/* Tags */}
            {result.tags && result.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {result.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Timestamp */}
            {result.timestamp && (
              <div className="text-xs text-muted-foreground">
                {result.timestamp}
              </div>
            )}
          </div>

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Save result</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Similar pages</DropdownMenuItem>
              <DropdownMenuItem>Cached</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
