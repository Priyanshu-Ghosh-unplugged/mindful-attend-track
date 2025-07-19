
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Shield, Settings, Users, Calendar, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const MultiEvent = () => {
  const features = [
    {
      icon: Copy,
      title: "Event Cloning",
      description: "Duplicate successful event configurations with one click for faster setup"
    },
    {
      icon: Settings,
      title: "Template Management",
      description: "Create and manage reusable event templates for different event types"
    },
    {
      icon: Shield,
      title: "GDPR Compliance",
      description: "Built-in privacy controls and data protection compliance toggles"
    },
    {
      icon: Users,
      title: "Multi-tenant Support",
      description: "Manage multiple organizations and events from a single dashboard"
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
              <Calendar className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Multi-Event <span className="bg-gradient-brass bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Efficiently manage multiple events with template systems, cloning capabilities, and comprehensive GDPR compliance tools.
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

          {/* GDPR Compliance */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-brass mx-auto mb-4" />
              <h2 className="text-2xl font-bold font-poppins mb-4">GDPR Compliance Built-in</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive privacy controls ensure your events meet all data protection requirements 
                with customizable consent management and data retention policies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-5 h-5 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Privacy Controls</h3>
                <p className="text-sm text-muted-foreground">Granular data collection settings</p>
              </div>
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Consent Management</h3>
                <p className="text-sm text-muted-foreground">Automated consent tracking</p>
              </div>
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-5 h-5 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Regional Compliance</h3>
                <p className="text-sm text-muted-foreground">Multi-region privacy standards</p>
              </div>
            </div>
          </Card>

          {/* Event Management Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center bg-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">1-Click</div>
              <p className="text-sm text-muted-foreground">Event duplication</p>
            </Card>
            <Card className="p-6 text-center bg-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">50+</div>
              <p className="text-sm text-muted-foreground">Pre-built templates</p>
            </Card>
            <Card className="p-6 text-center bg-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">100%</div>
              <p className="text-sm text-muted-foreground">GDPR compliant</p>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Start Managing Events</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultiEvent;
