import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Target, Clock, TrendingUp, Activity } from "lucide-react";

const Dashboard = () => {
  const engagementData = [
    { name: "Alice Chen", score: 94, trend: "+12", sessions: 8 },
    { name: "Bob Wilson", score: 87, trend: "+8", sessions: 6 },
    { name: "Carol Davis", score: 76, trend: "+5", sessions: 7 },
    { name: "David Kim", score: 82, trend: "+15", sessions: 5 }
  ];

  const sessionData = [
    { name: "AI Workshop", attendance: 45, engagement: 89 },
    { name: "React Masterclass", attendance: 38, engagement: 76 },
    { name: "UX Design Lab", attendance: 52, engagement: 94 },
    { name: "Data Science 101", attendance: 41, engagement: 81 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Engagement <span className="bg-gradient-brass bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time tracking and analytics for your event engagement
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Participants</p>
                  <p className="text-3xl font-bold text-brass">247</p>
                </div>
                <Users className="w-8 h-8 text-brass" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-3xl font-bold text-brass">84%</p>
                </div>
                <Target className="w-8 h-8 text-brass" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-3xl font-bold text-brass">12</p>
                </div>
                <Activity className="w-8 h-8 text-brass" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resources Downloaded</p>
                  <p className="text-3xl font-bold text-brass">1,234</p>
                </div>
                <TrendingUp className="w-8 h-8 text-brass" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Top Participants */}
            <Card className="p-6 bg-gradient-card border-accent/20">
              <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-brass" />
                Top Participants
              </h3>
              <div className="space-y-4">
                {engagementData.map((participant, index) => (
                  <div key={participant.name} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brass/20 rounded-full flex items-center justify-center text-brass font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.sessions} sessions attended</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-brass">{participant.score}%</p>
                      <p className="text-sm text-green-500">{participant.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Session Performance */}
            <Card className="p-6 bg-gradient-card border-accent/20">
              <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brass" />
                Session Performance
              </h3>
              <div className="space-y-4">
                {sessionData.map((session) => (
                  <div key={session.name} className="p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{session.name}</h4>
                      <span className="text-sm text-brass">{session.engagement}% engaged</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{session.attendance} attendees</span>
                      <div className="flex-1">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-brass h-2 rounded-full transition-all duration-300"
                            style={{ width: `${session.engagement}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="brass" size="lg">
              Export Analytics
            </Button>
            <Button variant="outline" size="lg">
              Configure Tracking
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;