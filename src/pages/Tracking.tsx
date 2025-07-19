
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Radio, Globe, Download, BarChart3, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Tracking = () => {
  const trackingMethods = [
    {
      icon: QrCode,
      title: "QR Code Scanning",
      description: "Traditional QR code scanning for session check-ins and resource access"
    },
    {
      icon: Radio,
      title: "RFID/NFC Tags",
      description: "Contactless tracking with RFID wristbands and NFC-enabled devices"
    },
    {
      icon: Globe,
      title: "Browser Tracking",
      description: "Web-based engagement tracking for online sessions and resources"
    },
    {
      icon: Download,
      title: "Download Monitoring",
      description: "Track resource downloads and digital content engagement"
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
              <BarChart3 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Multi-Modal <span className="bg-gradient-brass bg-clip-text text-transparent">Tracking</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive engagement tracking across all touchpoints with multiple tracking technologies for complete event visibility.
            </p>
          </div>

          {/* Tracking Methods */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {trackingMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={method.title} className="p-8 bg-gradient-card border-accent/20 shadow-elegant hover:shadow-brass transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{method.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Unified Dashboard */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <div className="text-center mb-8">
              <Eye className="w-16 h-16 text-brass mx-auto mb-4" />
              <h2 className="text-2xl font-bold font-poppins mb-4">Unified Analytics Dashboard</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All tracking methods feed into a single, comprehensive dashboard that provides real-time insights 
                and historical analytics across every engagement touchpoint.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-brass mb-2">Real-time</div>
                <p className="text-sm text-muted-foreground">Live engagement monitoring</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-brass mb-2">Multi-source</div>
                <p className="text-sm text-muted-foreground">Unified data from all methods</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-brass mb-2">Actionable</div>
                <p className="text-sm text-muted-foreground">Instant insights and alerts</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Start Tracking Now</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tracking;
