
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Nfc, Smartphone, Wifi, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

const AutoTracking = () => {
  const trackingMethods = [
    {
      icon: QrCode,
      title: "QR Code Tracking",
      description: "Participants scan QR codes at sessions, booths, and activities",
      features: ["Instant check-ins", "Session attendance", "Resource downloads", "No app required"],
      accuracy: "95%"
    },
    {
      icon: Nfc,
      title: "NFC Technology",
      description: "Near-field communication for seamless booth and activity tracking",
      features: ["Contactless interaction", "Booth visit tracking", "Instant data sync", "Hardware provided"],
      accuracy: "98%"
    },
    {
      icon: Smartphone,
      title: "Mobile App Tracking",
      description: "Comprehensive engagement tracking through our mobile application",
      features: ["Background tracking", "Push notifications", "Social features", "Offline capability"],
      accuracy: "92%"
    },
    {
      icon: Wifi,
      title: "WiFi Analytics",
      description: "Anonymous tracking through WiFi connection patterns",
      features: ["Location tracking", "Dwell time analysis", "Movement patterns", "Privacy compliant"],
      accuracy: "85%"
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
              <span className="bg-gradient-brass bg-clip-text text-transparent">Auto-Tracking</span> Technology
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamlessly capture participant engagement without manual intervention. 
              Our multi-modal tracking system ensures comprehensive data collection.
            </p>
          </div>

          {/* Tracking Methods Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {trackingMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{method.title}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {method.accuracy} Accuracy
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  
                  <div className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-brass" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* How It Works Section */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">How Auto-Tracking Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brass">1</span>
                </div>
                <h3 className="font-semibold mb-2">Setup</h3>
                <p className="text-muted-foreground text-sm">
                  We configure tracking points throughout your event venue automatically
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brass">2</span>
                </div>
                <h3 className="font-semibold mb-2">Capture</h3>
                <p className="text-muted-foreground text-sm">
                  Participants engage naturally while our system captures all interactions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brass">3</span>
                </div>
                <h3 className="font-semibold mb-2">Analyze</h3>
                <p className="text-muted-foreground text-sm">
                  Real-time analytics and insights appear instantly on your dashboard
                </p>
              </div>
            </div>
          </Card>

          {/* Demo Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                See Auto-Tracking in Action
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Watch how our technology captures engagement seamlessly at live events
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Try It Free</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AutoTracking;
