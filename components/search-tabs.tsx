import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SearchTabs() {
  return (
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
  );
}
