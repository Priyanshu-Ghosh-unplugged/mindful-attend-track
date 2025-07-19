
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, TrendingUp, Clock, MapPin, Star } from "lucide-react";

const Demo = () => {
  const demoData = {
    event: {
      name: "Tech Innovation Summit 2024",
      date: "March 15-17, 2024",
      location: "San Francisco Convention Center",
      participants: 847,
      sessions: 24
    },
    participants: [
      { name: "Alex Chen", score: 95, status: "Active", sessions: 8 },
      { name: "Sarah Johnson", score: 87, status: "Active", sessions: 6 },
      { name: "Mike Rodriguez", score: 76, status: "Idle", sessions: 5 },
      { name: "Emma Wilson", score: 91, status: "Active", sessions: 7 },
      { name: "David Kim", score: 82, status: "Active", sessions: 4 }
    ],
    sessions: [
      { name: "AI & Machine Learning Keynote", participants: 432, engagement: 94 },
      { name: "Web3 Development Workshop", participants: 156, engagement: 87 },
      { name: "Startup Pitch Competition", participants: 298, engagement: 91 },
      { name: "Networking Break", participants: 623, engagement: 73 }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Live Demo</Badge>
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Experience <span className="bg-gradient-brass bg-clip-text text-transparent">MindfulTrack</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our platform tracks engagement in real-time with this interactive demo
            </p>
          </div>

          {/* Demo Event Header */}
          <Card className="p-6 mb-8 bg-gradient-card border-accent/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{demoData.event.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {demoData.event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {demoData.event.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brass">{demoData.event.participants}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brass">{demoData.event.sessions}</div>
                  <div className="text-sm text-muted-foreground">Sessions</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Real-time Participants */}
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-brass" />
                  Top Participants
                </h3>
                <Badge variant="outline" className="animate-pulse">Live</Badge>
              </div>
              
              <div className="space-y-4">
                {demoData.participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-brass rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-muted-foreground">{participant.sessions} sessions attended</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-brass">{participant.score}</div>
                      <Badge 
                        variant={participant.status === 'Active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {participant.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Session Engagement */}
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brass" />
                  Session Engagement
                </h3>
                <Badge variant="outline">Real-time</Badge>
              </div>
              
              <div className="space-y-4">
                {demoData.sessions.map((session, index) => (
                  <div key={index} className="p-3 rounded-lg bg-background/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{session.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {session.engagement}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="w-3 h-3" />
                      {session.participants} participants
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div 
                        className="bg-gradient-brass h-2 rounded-full transition-all duration-300"
                        style={{ width: `${session.engagement}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Demo Actions */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-card border-accent/20 inline-block">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-brass" />
                <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                This demo shows real-time engagement tracking. Create your own event to start tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo Call
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
