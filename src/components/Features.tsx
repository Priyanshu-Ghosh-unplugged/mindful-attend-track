import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  BarChart3, 
  Brain, 
  Zap, 
  Users, 
  Globe,
  QrCode,
  Wifi,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: QrCode,
      title: "Auto-Tracking",
      description: "RFID/NFC + QR codes + Browser tracking + Download monitoring for seamless engagement capture",
      category: "Core Engine"
    },
    {
      icon: BarChart3,
      title: "Dynamic Scoring",
      description: "Attendance (35%) + Participation (40%) + Resources (25%) = Real-time engagement metrics",
      category: "Core Engine"
    },
    {
      icon: Globe,
      title: "Live Heatmaps",
      description: "3D score globes and participant timelines with interactive visualization dashboards",
      category: "Dashboard"
    },
    {
      icon: Brain,
      title: "AI Mentor Chat",
      description: "Skill-based mentor matching with intelligent conversation and fraud detection",
      category: "Premium AI"
    },
    {
      icon: Smartphone,
      title: "NFC Booth Tracking",
      description: "Physical proximity alerts and booth engagement monitoring for hybrid events",
      category: "Hybrid Tools"
    },
    {
      icon: Target,
      title: "VR Metrics",
      description: "Virtual reality engagement tracking with sponsor advertisement analytics integration",
      category: "Hybrid Tools"
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Google Cloud Pub/Sub infrastructure with React Native mobile app synchronization",
      category: "Infrastructure"
    },
    {
      icon: Users,
      title: "Multi-Event",
      description: "GDPR compliance toggles with multi-event cloning and template management",
      category: "Infrastructure"
    },
    {
      icon: Wifi,
      title: "Session Intelligence",
      description: "AI-powered session recommendations based on engagement patterns and preferences",
      category: "Premium AI"
    }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
            Complete{" "}
            <span className="bg-gradient-brass bg-clip-text text-transparent">
              Engagement
            </span>{" "}
            Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From basic QR tracking to advanced AI mentoring, our platform scales 
            with your event needs and provides actionable insights for meaningful engagement.
          </p>
        </div>

        {/* Features by Category */}
        {categories.map((category, categoryIndex) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-semibold font-poppins mb-8 text-center">
              <span className="text-brass">{category}</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features
                .filter(feature => feature.category === category)
                .map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card 
                      key={feature.title}
                      className="p-6 shadow-elegant bg-gradient-card border-accent/20 hover:shadow-brass transition-all duration-300 hover:scale-105 group cursor-pointer"
                      style={{ 
                        animationDelay: `${categoryIndex * 100 + index * 100}ms` 
                      }}
                      onClick={() => alert(`${feature.title}: ${feature.description}`)}
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center group-hover:bg-brass/20 transition-colors">
                          <Icon className="w-6 h-6 text-brass" />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold font-poppins mb-2 group-hover:text-brass transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-poppins">
                Ready to Transform Your Events?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start with basic QR tracking and scale up to AI-powered mentoring. 
                Our modular platform grows with your event engagement needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" className="transform hover:scale-105 transition-all duration-300" asChild>
                  <Link to="/pricing">Start Free Trial</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-brass text-brass hover:bg-brass/10 transition-all duration-300"
                  onClick={() => alert('Demo scheduled! We\'ll contact you within 24 hours.')}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;