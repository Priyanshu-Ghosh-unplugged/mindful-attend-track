
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Eye, Clock, TrendingUp, Target, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const VRMetrics = () => {
  const metrics = [
    {
      icon: Eye,
      title: "Gaze Tracking",
      description: "Monitor where participants look and for how long in VR environments"
    },
    {
      icon: Clock,
      title: "Session Duration",
      description: "Track time spent in different VR experiences and interactions"
    },
    {
      icon: Gamepad2,
      title: "Interaction Analytics",
      description: "Measure user interactions with virtual objects and interfaces"
    },
    {
      icon: Target,
      title: "Sponsor Integration",
      description: "Track engagement with sponsor content and virtual advertisements"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-brass rounded-xl flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              VR <span className="bg-gradient-brass bg-clip-text text-transparent">Metrics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced virtual reality engagement tracking with immersive analytics and sponsor integration capabilities.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.title} className="p-8 bg-gradient-card border-accent/20 shadow-elegant hover:shadow-brass transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{metric.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{metric.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* VR Analytics Features */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">Advanced VR Analytics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Heatmap Generation</h3>
                <p className="text-sm text-muted-foreground">Visual heatmaps of VR interaction hotspots</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Engagement Scoring</h3>
                <p className="text-sm text-muted-foreground">AI-powered engagement quality assessment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">ROI Tracking</h3>
                <p className="text-sm text-muted-foreground">Sponsor content effectiveness measurement</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Enable VR Tracking</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VRMetrics;
