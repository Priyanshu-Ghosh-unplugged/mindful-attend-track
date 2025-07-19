
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  BarChart3, 
  MapPin, 
  Bot, 
  MessageSquare, 
  Brain,
  Nfc,
  Target,
  Headphones,
  Zap,
  Globe,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Activity,
      title: "Auto-tracking",
      description: "Automatically track participant engagement without manual intervention",
      benefits: ["Real-time data collection", "Zero setup required", "Seamless integration"],
      category: "Core"
    },
    {
      icon: Target,
      title: "Dynamic Scoring",
      description: "AI-powered engagement scoring that adapts to different event types",
      benefits: ["Personalized metrics", "Adaptive algorithms", "Fair comparison"],
      category: "AI"
    },
    {
      icon: MapPin,
      title: "Live Heatmaps",
      description: "Visualize engagement hotspots and participant movement patterns",
      benefits: ["Visual insights", "Spatial analytics", "Crowd flow optimization"],
      category: "Analytics"
    },
    {
      icon: Bot,
      title: "AI Mentor",
      description: "Intelligent recommendations to improve engagement during events",
      benefits: ["Smart suggestions", "Real-time optimization", "Learning algorithms"],
      category: "AI"
    },
    {
      icon: MessageSquare,
      title: "Live Chats",
      description: "Real-time communication platform for participants and organizers",
      benefits: ["Instant messaging", "Group discussions", "Moderation tools"],
      category: "Communication"
    },
    {
      icon: Brain,
      title: "Session Intelligence",
      description: "Deep insights into session performance and participant behavior",
      benefits: ["Behavioral analysis", "Performance metrics", "Predictive insights"],
      category: "Analytics"
    },
    {
      icon: Nfc,
      title: "NFC Booth Tracking",
      description: "Track booth visits and interactions using NFC technology",
      benefits: ["Contact-free tracking", "Instant data capture", "Hardware integration"],
      category: "Hardware"
    },
    {
      icon: Activity,
      title: "Live Tracking",
      description: "Monitor all activities and interactions in real-time",
      benefits: ["Live monitoring", "Instant alerts", "Real-time dashboards"],
      category: "Core"
    },
    {
      icon: Headphones,
      title: "VR Metrics",
      description: "Advanced tracking for virtual and augmented reality experiences",
      benefits: ["Immersive analytics", "VR/AR support", "3D engagement tracking"],
      category: "Advanced"
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Instantaneous data synchronization across all devices and platforms",
      benefits: ["Zero latency", "Cross-platform sync", "Offline capability"],
      category: "Core"
    },
    {
      icon: Globe,
      title: "Multi-event Support",
      description: "Manage multiple events simultaneously with unified tracking",
      benefits: ["Centralized management", "Scalable architecture", "Event comparison"],
      category: "Enterprise"
    }
  ];

  const categories = ["All", "Core", "AI", "Analytics", "Communication", "Hardware", "Advanced", "Enterprise"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Powerful <span className="bg-gradient-brass bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track, analyze, and optimize participant engagement
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "brass" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-brass" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {feature.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-brass" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-accent/20 inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to Experience These Features?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start your free trial and see how MindfulTrack can transform your events
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
