
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp, Eye, Navigation as NavigationIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const LiveHeatmaps = () => {
  const heatmapFeatures = [
    {
      icon: MapPin,
      title: "Engagement Hotspots",
      description: "Visualize where participants are most active and engaged",
      benefits: ["Identify popular areas", "Optimize space usage", "Improve event flow"]
    },
    {
      icon: Users,
      title: "Crowd Flow Analysis",
      description: "Track participant movement patterns throughout your venue",
      benefits: ["Prevent overcrowding", "Optimize booth placement", "Improve navigation"]
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Live data visualization that updates every few seconds",
      benefits: ["Instant insights", "Quick decision making", "Dynamic adjustments"]
    },
    {
      icon: Eye,
      title: "3D Visualization",
      description: "Interactive 3D heatmaps for comprehensive spatial understanding",
      benefits: ["Multi-level venues", "Detailed analysis", "Immersive insights"]
    }
  ];

  const useCases = [
    {
      title: "Conference Optimization",
      description: "Identify which sessions and speakers generate the most engagement",
      icon: Users
    },
    {
      title: "Booth Performance",
      description: "Track visitor flow and dwell time at sponsor booths and exhibits",
      icon: MapPin
    },
    {
      title: "Space Planning",
      description: "Optimize venue layout for future events based on traffic patterns",
      icon: NavigationIcon
    },
    {
      title: "Time Analysis",
      description: "Understand peak engagement times throughout your event",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              <span className="bg-gradient-brass bg-clip-text text-transparent">Live Heatmaps</span> & Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visualize participant engagement and movement patterns in real-time with 
              interactive heatmaps and spatial analytics.
            </p>
          </div>

          {/* Demo Heatmap */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Live Heatmap Preview</h2>
            
            <div className="relative bg-accent/20 rounded-lg p-8 min-h-96">
              <div className="absolute inset-4 bg-gradient-to-br from-brass/20 via-transparent to-brass/10 rounded-lg">
                {/* Simulated heatmap visualization */}
                <div className="relative h-full">
                  {/* Hot zones */}
                  <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-red-500/30 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-500/40 rounded-full blur-sm animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-yellow-500/30 rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
                  
                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Engagement Level</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>High (80-100%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span>Medium (50-79%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span>Low (20-49%)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Live indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-brass">127</div>
                <div className="text-sm text-muted-foreground">Active Participants</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-brass">3.2m</div>
                <div className="text-sm text-muted-foreground">Avg. Dwell Time</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-brass">85%</div>
                <div className="text-sm text-muted-foreground">Space Utilization</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-brass">12</div>
                <div className="text-sm text-muted-foreground">Hot Zones</div>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {heatmapFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-brass rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <Card key={index} className="p-6 bg-gradient-card border-accent/20 text-center hover:shadow-elegant transition-all duration-300">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Visualize Your Event's Engagement
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Get real-time spatial insights and optimize your event experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/demo">Interactive Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Start Mapping</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveHeatmaps;
