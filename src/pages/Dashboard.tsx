import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Target, Clock, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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

interface Participant {
  id: string;
  user_id: string;
  event_id: string;
  engagement_score: number;
  attendance_score: number;
  participation_score: number;
  resource_score: number;
  status: string;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

interface Session {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  session_type: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    avgEngagement: 0,
    activeSessions: 0,
    resourcesDownloaded: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'participants' }, () => {
        fetchParticipants();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'engagement_logs' }, () => {
        fetchParticipants();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchEvents(),
        fetchParticipants(),
        fetchSessions(),
        fetchStats()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('id, name, description, start_date, end_date, location, status, organizer_id, created_at, updated_at')
      .eq('organizer_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    setEvents(data || []);
  };

  const fetchParticipants = async () => {
    const { data, error } = await supabase
      .from('participants')
      .select(`
        id, user_id, event_id, engagement_score, attendance_score, participation_score, resource_score, status, created_at, updated_at,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .order('engagement_score', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    setParticipants(data || []);
  };

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('start_time', { ascending: true })
      .limit(5);
    
    if (error) throw error;
    setSessions(data || []);
  };

  const fetchStats = async () => {
    try {
      // Get total participants
      const { count: participantCount } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true });

      // Get average engagement
      const { data: engagementData } = await supabase
        .from('participants')
        .select('engagement_score');
      
      const avgEngagement = engagementData?.length 
        ? Math.round(engagementData.reduce((sum, p) => sum + (p.engagement_score || 0), 0) / engagementData.length)
        : 0;

      // Get active sessions count
      const now = new Date().toISOString();
      const { count: activeSessionCount } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .lte('start_time', now)
        .gte('end_time', now);

      // Get resource downloads
      const { data: resourceData } = await supabase
        .from('engagement_logs')
        .select('points')
        .eq('activity_type', 'resource_download');
      
      const resourcesDownloaded = resourceData?.reduce((sum, log) => sum + (log.points || 0), 0) || 0;

      setStats({
        totalParticipants: participantCount || 0,
        avgEngagement,
        activeSessions: activeSessionCount || 0,
        resourcesDownloaded
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 px-4">
          <div className="container mx-auto max-w-7xl flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
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
                  <p className="text-3xl font-bold text-brass">{stats.totalParticipants}</p>
                </div>
                <Users className="w-8 h-8 text-brass" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-3xl font-bold text-brass">{stats.avgEngagement}</p>
                </div>
                <Target className="w-8 h-8 text-brass" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-3xl font-bold text-brass">{stats.activeSessions}</p>
                </div>
                <Activity className="w-8 h-8 text-brass" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resource Downloads</p>
                  <p className="text-3xl font-bold text-brass">{stats.resourcesDownloaded}</p>
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
              {participants.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No participants yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Participants will appear here once they join your events
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {participants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brass/20 rounded-full flex items-center justify-center text-brass font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">
                            {participant.profiles?.full_name || participant.profiles?.email || 'Anonymous User'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Score: {participant.engagement_score}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-brass">{participant.engagement_score}</p>
                        <div className="text-xs text-muted-foreground">
                          A: {participant.attendance_score} | P: {participant.participation_score} | R: {participant.resource_score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Sessions */}
            <Card className="p-6 bg-gradient-card border-accent/20">
              <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brass" />
                Recent Sessions
              </h3>
              {sessions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No sessions scheduled</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Create your first event to start adding sessions
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{session.title}</h4>
                        <span className="text-sm text-brass capitalize">{session.session_type}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(session.start_time).toLocaleDateString()} • {' '}
                        {new Date(session.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {' '}
                        {new Date(session.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="brass" size="lg" onClick={() => window.location.href = '/start-tracking'}>
              Create New Event
            </Button>
            <Button variant="outline" size="lg" onClick={fetchDashboardData}>
              Refresh Data
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
