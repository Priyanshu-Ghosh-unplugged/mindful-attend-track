
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle, ArrowRight, Users, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    eventType: "",
    expectedParticipants: "",
    email: ""
  });

  const steps = [
    {
      step: 1,
      title: "Setup Your Organization",
      description: "Tell us about your organization and events",
      icon: Users
    },
    {
      step: 2,
      title: "Configure Tracking",
      description: "Choose your engagement tracking methods",
      icon: BarChart3
    },
    {
      step: 3,
      title: "Launch Your Event",
      description: "Start tracking engagement in real-time",
      icon: Calendar
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Getting started with:", formData);
    // This would typically redirect to dashboard or setup flow
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Get <span className="bg-gradient-brass bg-clip-text text-transparent">Started</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Set up your MindfulTrack account in minutes and start tracking meaningful engagement at your events
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Setup Form */}
            <Card className="p-8 bg-gradient-card border-accent/20 shadow-elegant">
              <h2 className="text-2xl font-semibold mb-6">Quick Setup</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="Your Organization"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Primary Event Type</Label>
                  <Input
                    id="eventType"
                    placeholder="Hackathon, Conference, Workshop..."
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedParticipants">Expected Participants</Label>
                  <Input
                    id="expectedParticipants"
                    placeholder="50-100, 100-500, 500+"
                    value={formData.expectedParticipants}
                    onChange={(e) => setFormData({...formData, expectedParticipants: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" variant="brass" className="w-full" size="lg">
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link to="/dashboard" className="text-brass hover:underline">
                    Go to Dashboard
                  </Link>
                </p>
              </div>
            </Card>

            {/* Steps Guide */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">How It Works</h2>
              
              {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brass" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Step {item.step}: {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}

              <Card className="p-6 bg-accent/20 border-brass/20">
                <h3 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-brass mr-2" />
                  What You'll Get
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time engagement dashboard</li>
                  <li>• QR code and NFC tracking setup</li>
                  <li>• AI-powered analytics</li>
                  <li>• 24/7 support during events</li>
                  <li>• Custom branding options</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
