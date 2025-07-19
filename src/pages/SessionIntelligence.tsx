
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, Clock, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const SessionIntelligence = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Machine learning algorithms analyze engagement patterns to suggest optimal sessions"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast attendance and engagement levels based on historical data"
    },
    {
      icon: Users,
      title: "Personalized Matching",
      description: "Match participants with sessions based on their interests and past behavior"
    },
    {
      icon: Clock,
      title: "Optimal Timing",
      description: "Identify the best time slots for maximum attendance and engagement"
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
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Session <span className="bg-gradient-brass bg-clip-text text-transparent">Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI-powered session recommendations that maximize engagement and optimize event experiences through intelligent data analysis.
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
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">How Session Intelligence Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">Gather engagement data from all touchpoints</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Process patterns with machine learning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">Deliver personalized session suggestions</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Start Using AI Intelligence</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionIntelligence;
