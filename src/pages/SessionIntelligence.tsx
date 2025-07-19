
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, Clock, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

const SessionIntelligence = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch sessions and engagement logs
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: sessionData } = await supabase.from('sessions').select('*');
      const { data: logs } = await supabase.from('engagement_logs').select('session_id, activity_type, points, metadata');
      // Aggregate analytics per session
      const analytics: Record<string, any> = {};
      if (sessionData) {
        sessionData.forEach((session: any) => {
          analytics[session.id] = {
            attendance: 0,
            engagement: 0,
            feedbacks: [],
            title: session.title,
            start_time: session.start_time,
            end_time: session.end_time,
          };
        });
      }
      if (logs) {
        logs.forEach((log: any) => {
          if (!log.session_id || !analytics[log.session_id]) return;
          if (log.activity_type === 'checkin') analytics[log.session_id].attendance += 1;
          if (log.activity_type === 'feedback' && log.metadata?.rating) analytics[log.session_id].feedbacks.push(log.metadata.rating);
          analytics[log.session_id].engagement += log.points || 0;
        });
      }
      // Calculate average feedback
      Object.values(analytics).forEach((a: any) => {
        a.avgFeedback = a.feedbacks.length ? (a.feedbacks.reduce((s: number, r: number) => s + r, 0) / a.feedbacks.length).toFixed(1) : 'N/A';
      });
      setAnalytics(analytics);
      setSessions(sessionData || []);
      setLoading(false);
      // Simple recommendation: top 3 by engagement
      const recs = Object.values(analytics)
        .filter((a: any) => a.attendance > 0)
        .sort((a: any, b: any) => b.engagement - a.engagement)
        .slice(0, 3);
      setRecommendations(recs);
    }
    fetchData();
  }, []);

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

          {/* Session Analytics */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Session Analytics</h2>
            {loading ? <div className="text-brass">Loading analytics...</div> : (
              <div className="grid md:grid-cols-2 gap-8">
                {sessions.map((session: any) => {
                  const a = analytics[session.id] || {};
                  return (
                    <Card key={session.id} className="p-6 bg-accent/20 border-brass/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        <span className="text-xs text-muted-foreground">{new Date(session.start_time).toLocaleString()}</span>
                      </div>
                      <div className="mb-2 flex gap-4">
                        <div className="text-sm">Attendance: <span className="font-bold text-brass">{a.attendance}</span></div>
                        <div className="text-sm">Engagement: <span className="font-bold text-brass">{a.engagement}</span></div>
                        <div className="text-sm">Avg Feedback: <span className="font-bold text-brass">{a.avgFeedback}</span></div>
                      </div>
                      <Progress value={Math.min(100, a.engagement)} className="h-2 mb-2" />
                      <div className="text-xs text-muted-foreground">Session ID: {session.id}</div>
                    </Card>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Recommendations */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h2 className="text-2xl font-semibold mb-6">Recommended Sessions</h2>
            {recommendations.length === 0 ? <div className="text-muted-foreground">No recommendations yet.</div> : (
              <div className="grid md:grid-cols-3 gap-8">
                {recommendations.map((rec: any, idx: number) => (
                  <Card key={rec.title} className="p-6 bg-accent/20 border-brass/20 flex flex-col items-center">
                    <Lightbulb className="w-8 h-8 text-brass mb-2" />
                    <div className="font-semibold mb-1">{rec.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">{rec.start_time ? new Date(rec.start_time).toLocaleString() : ''}</div>
                    <div className="mb-2">Attendance: <span className="font-bold text-brass">{rec.attendance}</span></div>
                    <div className="mb-2">Engagement: <span className="font-bold text-brass">{rec.engagement}</span></div>
                    <div className="mb-2">Avg Feedback: <span className="font-bold text-brass">{rec.avgFeedback}</span></div>
                    <Button variant="brass" size="sm">View Details</Button>
                  </Card>
                ))}
              </div>
            )}
          </Card>

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
