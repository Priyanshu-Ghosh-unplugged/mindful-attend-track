
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EngagementLog {
  id: string;
  participant_id: string;
  session_id?: string;
  activity_type: string;
  points: number;
  metadata?: any;
  created_at: string;
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
}

export const useEngagementTracking = (eventId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [recentLogs, setRecentLogs] = useState<EngagementLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to log engagement activity
  const logEngagement = async (
    participantId: string,
    activityType: string,
    points: number = 0,
    sessionId?: string,
    metadata?: any
  ) => {
    try {
      const { data, error } = await supabase
        .from('engagement_logs')
        .insert([
          {
            participant_id: participantId,
            session_id: sessionId,
            activity_type: activityType,
            points,
            metadata
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Activity Logged",
        description: `${activityType.replace('_', ' ')} recorded successfully`,
      });

      return data;
    } catch (error: any) {
      console.error('Error logging engagement:', error);
      toast({
        title: "Error",
        description: "Failed to log activity",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Function to join event as participant
  const joinEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('participants')
        .insert([
          {
            event_id: eventId,
            user_id: user.id,
            status: 'registered'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Joined Event",
        description: "You've successfully joined the event",
      });

      return data;
    } catch (error: any) {
      console.error('Error joining event:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to join event",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Function to check in to session
  const checkInToSession = async (participantId: string, sessionId: string) => {
    return logEngagement(participantId, 'checkin', 10, sessionId);
  };

  // Function to download resource
  const downloadResource = async (participantId: string, resourceId: string, sessionId?: string) => {
    return logEngagement(participantId, 'resource_download', 5, sessionId, { resource_id: resourceId });
  };

  // Function to submit feedback
  const submitFeedback = async (participantId: string, sessionId: string, rating: number, comment?: string) => {
    return logEngagement(participantId, 'feedback', 15, sessionId, { rating, comment });
  };

  // Fetch participants for an event
  const fetchParticipants = async (eventId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('event_id', eventId)
        .order('engagement_score', { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent engagement logs
  const fetchRecentLogs = async (limit: number = 10) => {
    try {
      const { data, error } = await supabase
        .from('engagement_logs')
        .select(`
          *,
          participants!inner (
            user_id,
            profiles:user_id (
              full_name,
              email
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setRecentLogs(data || []);
    } catch (error) {
      console.error('Error fetching recent logs:', error);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!eventId) return;

    const channel = supabase
      .channel(`engagement-${eventId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'participants', filter: `event_id=eq.${eventId}` },
        () => {
          fetchParticipants(eventId);
        }
      )
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'engagement_logs' },
        () => {
          fetchRecentLogs();
        }
      )
      .subscribe();

    // Initial fetch
    fetchParticipants(eventId);
    fetchRecentLogs();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  return {
    participants,
    recentLogs,
    loading,
    logEngagement,
    joinEvent,
    checkInToSession,
    downloadResource,
    submitFeedback,
    fetchParticipants,
    fetchRecentLogs
  };
};
