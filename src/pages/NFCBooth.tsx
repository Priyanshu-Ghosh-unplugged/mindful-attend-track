
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Wifi, MapPin, Bell, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const NFCBooth = () => {
  const features = [
    {
      icon: Smartphone,
      title: "NFC Tap Tracking",
      description: "Seamless engagement tracking with simple NFC tap interactions"
    },
    {
      icon: MapPin,
      title: "Proximity Detection",
      description: "Automatically detect when participants approach exhibition booths"
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Instant notifications when high-value prospects visit your booth"
    },
    {
      icon: Users,
      title: "Visitor Analytics",
      description: "Comprehensive analytics on booth visitor patterns and engagement"
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
              <Smartphone className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              NFC Booth <span className="bg-gradient-brass bg-clip-text text-transparent">Tracking</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your exhibition booths with NFC technology for seamless visitor tracking and enhanced engagement analytics.
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

          {/* How It Works */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">NFC Booth Setup Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Deploy NFC Tags</h3>
                <p className="text-sm text-muted-foreground">Place NFC tags at strategic booth locations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Visitor Interaction</h3>
                <p className="text-sm text-muted-foreground">Participants tap their phones on NFC tags</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Instant Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time data capture and analytics</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Setup NFC Tracking</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NFCBooth;
