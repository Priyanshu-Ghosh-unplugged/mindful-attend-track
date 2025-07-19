
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Cloud, Smartphone, Wifi, RefreshCw, Database } from "lucide-react";
import { Link } from "react-router-dom";

const RealTimeSync = () => {
  const features = [
    {
      icon: Cloud,
      title: "Google Cloud Pub/Sub",
      description: "Enterprise-grade messaging infrastructure for real-time data synchronization"
    },
    {
      icon: Smartphone,
      title: "Mobile App Sync",
      description: "React Native mobile app with instant data synchronization capabilities"
    },
    {
      icon: RefreshCw,
      title: "Live Updates",
      description: "Real-time dashboard updates without page refreshes or manual syncing"
    },
    {
      icon: Database,
      title: "Conflict Resolution",
      description: "Automatic handling of data conflicts across multiple devices and platforms"
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
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Real-time <span className="bg-gradient-brass bg-clip-text text-transparent">Sync</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Lightning-fast data synchronization across all devices and platforms with Google Cloud infrastructure.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-8 bg-gradient-card border-accent/20 shadow-elegant hover:shadow-brass transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Architecture Overview */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">Sync Architecture</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Data Capture</h3>
                <p className="text-xs text-muted-foreground">Multi-source data collection</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Cloud Processing</h3>
                <p className="text-xs text-muted-foreground">Google Pub/Sub messaging</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Sync</h3>
                <p className="text-xs text-muted-foreground">Instant synchronization</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Device Updates</h3>
                <p className="text-xs text-muted-foreground">Cross-platform delivery</p>
              </div>
            </div>
          </Card>

          {/* Performance Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center bg-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">&lt;100ms</div>
              <p className="text-sm text-muted-foreground">Average sync latency</p>
            </Card>
            <Card className="p-6 text-center bg-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime guarantee</p>
            </Card>
            <Card className="p-6 text-center bg-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">Concurrent connections</p>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Enable Real-time Sync</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeSync;
