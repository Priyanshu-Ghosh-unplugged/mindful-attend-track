
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, TrendingUp, Clock, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useEngagementTracking } from "@/hooks/useEngagementTracking";

interface Event {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: string;
  organizer_id: string;
  created_at: string;
  updated_at: string;
}

const Demo = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { participants, recentLogs, loading } = useEngagementTracking(selectedEvent?.id);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setEvents(data);
        setSelectedEvent(data[0]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fallback demo data if no real events exist
  const demoData = {
    event: selectedEvent || {
      id: 'demo',
      name: "Tech Innovation Summit 2024",
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: "San Francisco Convention Center",
      description: "Annual technology conference",
      status: "active",
      organizer_id: "demo",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    participants: participants.length > 0 ? participants : [
      { id: '1', user_id: '1', engagement_score: 95, status: 'active', event_id: 'demo', attendance_score: 8, participation_score: 6, resource_score: 5, created_at: '', updated_at: '' },
      { id: '2', user_id: '2', engagement_score: 87, status: 'active', event_id: 'demo', attendance_score: 6, participation_score: 4, resource_score: 3, created_at: '', updated_at: '' },
      { id: '3', user_id: '3', engagement_score: 76, status: 'registered', event_id: 'demo', attendance_score: 5, participation_score: 2, resource_score: 2, created_at: '', updated_at: '' },
    ],
    sessions: [
      { name: "AI & Machine Learning Keynote", participants: 432, engagement: 94 },
      { name: "Web3 Development Workshop", participants: 156, engagement: 87 },
      { name: "Startup Pitch Competition", participants: 298, engagement: 91 },
      { name: "Networking Break", participants: 623, engagement: 73 }
    ]
  };

  if (loading && selectedEvent) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 px-4">
          <div className="container mx-auto max-w-7xl flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading demo data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {selectedEvent ? "Live Demo" : "Demo Preview"}
            </Badge>
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Experience <span className="bg-gradient-brass bg-clip-text text-transparent">MindfulTrack</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {selectedEvent 
                ? "See real-time engagement tracking with live data from your events"
                : "See how our platform tracks engagement in real-time with this interactive demo"
              }
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
                    {new Date(demoData.event.start_date).toLocaleDateString()} - {new Date(demoData.event.end_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {demoData.event.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brass">{demoData.participants.length}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brass">{demoData.sessions.length}</div>
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
                  {selectedEvent ? "Live Participants" : "Top Participants"}
                </h3>
                <Badge variant="outline" className={selectedEvent ? "animate-pulse" : ""}>
                  {selectedEvent ? "Live" : "Demo"}
                </Badge>
              </div>
              
              <div className="space-y-4">
                {demoData.participants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-brass rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">Participant {index + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          A: {participant.attendance_score} | P: {participant.participation_score} | R: {participant.resource_score}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-brass">{participant.engagement_score}</div>
                      <Badge 
                        variant={participant.status === 'active' ? 'default' : 'secondary'}
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
                {selectedEvent 
                  ? "This demo shows your real event data. Create more events to expand your tracking."
                  : "This demo shows real-time engagement tracking. Create your own event to start tracking."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" onClick={() => window.location.href = '/start-tracking'}>
                  {selectedEvent ? "Create Another Event" : "Start Free Trial"}
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/dashboard'}>
                  View Dashboard
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
