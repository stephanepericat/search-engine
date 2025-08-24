import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Settings } from "lucide-react";

interface SearchFiltersProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export function SearchFilters({ activeTab = "all", onTabChange }: SearchFiltersProps) {
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                Images
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="news" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                News
              </TabsTrigger>
              <TabsTrigger 
                value="maps" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                Maps
              </TabsTrigger>
              <TabsTrigger 
                value="shopping" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                Shopping
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Tools
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
