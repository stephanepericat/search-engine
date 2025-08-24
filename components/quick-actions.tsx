import { Mic, Camera, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const quickActions = [
  { icon: Camera, label: "Image Search", description: "Search by image" },
  { icon: Mic, label: "Voice Search", description: "Search with voice" },
  { icon: Settings, label: "Advanced Search", description: "Refine your search" }
];

export function QuickActions() {
  return (
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
  );
}
