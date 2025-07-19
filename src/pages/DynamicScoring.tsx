
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Brain, TrendingUp, Users, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";

const DynamicScoring = () => {
  const scoringComponents = [
    {
      name: "Attendance",
      weight: 35,
      description: "Session check-ins and event participation",
      color: "bg-blue-500",
      examples: ["Session attendance", "Workshop participation", "Keynote presence"]
    },
    {
      name: "Participation",
      weight: 40,
      description: "Active engagement and interaction",
      color: "bg-brass",
      examples: ["Q&A participation", "Poll responses", "Discussion contributions"]
    },
    {
      name: "Resources",
      weight: 25,
      description: "Learning material engagement",
      color: "bg-green-500",
      examples: ["Document downloads", "Link clicks", "Resource sharing"]
    }
  ];

  const adaptiveFeatures = [
    {
      icon: Target,
      title: "Event Type Adaptation",
      description: "Scoring algorithms automatically adjust based on hackathons, conferences, or workshops"
    },
    {
      icon: Brain,
      title: "AI Learning",
      description: "Machine learning improves scoring accuracy based on historical engagement patterns"
    },
    {
      icon: TrendingUp,
      title: "Real-time Adjustment",
      description: "Scores update instantly as participants engage with different activities"
    },
    {
      icon: Users,
      title: "Peer Comparison",
      description: "Fair scoring that accounts for event size and participant demographics"
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
              <span className="bg-gradient-brass bg-clip-text text-transparent">Dynamic Scoring</span> System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered engagement scoring that adapts to different event types and participant behaviors 
              for meaningful, fair comparisons.
            </p>
          </div>

          {/* Scoring Formula */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">How Engagement is Calculated</h2>
            
            <div className="space-y-6">
              {scoringComponents.map((component, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{component.name}</h3>
                    <span className="text-2xl font-bold text-brass">{component.weight}%</span>
                  </div>
                  
                  <Progress value={component.weight} className="h-3" />
                  
                  <p className="text-muted-foreground">{component.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {component.examples.map((example, idx) => (
                      <span key={idx} className="px-3 py-1 bg-accent/50 rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-brass/10 rounded-lg">
              <h3 className="font-semibold mb-2">Final Score Formula</h3>
              <p className="text-lg font-mono">
                Engagement Score = (Attendance × 0.35) + (Participation × 0.40) + (Resources × 0.25)
              </p>
            </div>
          </Card>

          {/* Adaptive Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Adaptive Intelligence</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {adaptiveFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brass" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Example Dashboard */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Live Scoring Dashboard</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-accent/20 rounded-lg">
                <div className="text-3xl font-bold text-brass mb-2">87</div>
                <div className="text-sm text-muted-foreground mb-4">Current Score</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Attendance:</span>
                    <span className="text-brass">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Participation:</span>
                    <span className="text-brass">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resources:</span>
                    <span className="text-brass">78%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-accent/20 rounded-lg">
                <Calendar className="w-8 h-8 text-brass mx-auto mb-2" />
                <div className="text-lg font-semibold mb-2">Sessions Attended</div>
                <div className="text-2xl font-bold">8/12</div>
                <div className="text-sm text-muted-foreground">Last: AI Workshop</div>
              </div>
              
              <div className="text-center p-6 bg-accent/20 rounded-lg">
                <Download className="w-8 h-8 text-brass mx-auto mb-2" />
                <div className="text-lg font-semibold mb-2">Resources Used</div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Downloads & Links</div>
              </div>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Experience Dynamic Scoring
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                See how our AI-powered scoring creates meaningful engagement insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/demo">View Live Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Start Free Trial</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DynamicScoring;
