import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Target, Zap, QrCode, Wifi } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [engagementScore] = useState(87);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold font-poppins leading-tight">
                <span className="bg-gradient-brass bg-clip-text text-transparent">
                  Mindful
                </span>{" "}
                <br />
                Event Engagement
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Track authentic participation at hackathons and conferences. 
                Transform attendance into meaningful engagement scores through 
                AI-powered analytics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                Start Tracking
                <Zap className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                View Demo
                <BarChart3 className="w-5 h-5" />
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 text-sm">
                <QrCode className="w-4 h-4 text-brass" />
                QR/NFC Tracking
              </div>
              <div className="flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 text-sm">
                <Users className="w-4 h-4 text-brass" />
                Live Analytics
              </div>
              <div className="flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 text-sm">
                <Wifi className="w-4 h-4 text-brass" />
                Real-time Scoring
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="p-6 shadow-elegant bg-gradient-card border-accent/20">
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-poppins">Engagement Dashboard</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* Score Circle */}
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="hsl(var(--accent))"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="hsl(var(--brass))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${engagementScore * 3.14} 314`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brass">{engagementScore}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-accent/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Attendance</div>
                    <div className="text-lg font-semibold text-brass">35%</div>
                  </div>
                  <div className="text-center p-3 bg-accent/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Participation</div>
                    <div className="text-lg font-semibold text-brass">40%</div>
                  </div>
                  <div className="text-center p-3 bg-accent/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Resources</div>
                    <div className="text-lg font-semibold text-brass">25%</div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-accent/20 rounded">
                      <Target className="w-4 h-4 text-brass" />
                      <span className="text-sm">Session check-in: AI Workshop</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-accent/20 rounded">
                      <Users className="w-4 h-4 text-brass" />
                      <span className="text-sm">Poll participation +5 points</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-accent/20 rounded">
                      <BarChart3 className="w-4 h-4 text-brass" />
                      <span className="text-sm">Resource downloaded</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-brass/20 rounded-full animate-glow-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-mandala-gold/30 rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;