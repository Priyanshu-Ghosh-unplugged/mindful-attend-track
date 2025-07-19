
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Cloud, Smartphone, Wifi, RefreshCw, Database, User, Activity, Clock, Users, MessageSquare, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const MAX_EVENTS = 30;
const TABS = [
  { key: "engagement", label: "Engagement", icon: Activity },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "participants", label: "Participants", icon: Users },
  { key: "sessions", label: "Sessions", icon: Cloud },
];

const RealTimeSync = () => {
  const [tab, setTab] = useState("engagement");
  // Engagement logs
  const [events, setEvents] = useState<any[]>([]);
  const [eventStats, setEventStats] = useState({
    total: 0,
    participants: 0,
    sessions: 0,
    mostActiveSession: null as null | string,
    lastUpdate: new Date(),
  });
  // Messages
  const [messages, setMessages] = useState<any[]>([]);
  const [messageStats, setMessageStats] = useState({
    total: 0,
    senders: 0,
    flagged: 0,
    lastUpdate: new Date(),
  });
  // Participants
  const [participants, setParticipants] = useState<any[]>([]);
  const [participantStats, setParticipantStats] = useState({
    total: 0,
    active: 0,
    lastUpdate: new Date(),
  });
  // Sessions
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionStats, setSessionStats] = useState({
    total: 0,
    ongoing: 0,
    lastUpdate: new Date(),
  });

  // Engagement logs realtime
  useEffect(() => {
    let ignore = false;
    async function fetchInitial() {
      const { data } = await supabase
        .from("engagement_logs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(MAX_EVENTS);
      if (!ignore && data) {
        setEvents(data);
        updateEventStats(data);
      }
    }
    fetchInitial();
    const sub = supabase
      .channel("realtime-logs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "engagement_logs" },
        (payload) => {
          setEvents((prev) => {
            let next = prev.slice();
            if (payload.eventType === "INSERT") {
              next = [payload.new, ...next].slice(0, MAX_EVENTS);
            } else if (payload.eventType === "UPDATE") {
              next = next.map((e) => (e.id === payload.new.id ? payload.new : e));
            } else if (payload.eventType === "DELETE") {
              next = next.filter((e) => e.id !== payload.old.id);
            }
            updateEventStats(next);
            return next;
          });
        }
      )
      .subscribe();
    return () => {
      ignore = true;
      sub.unsubscribe();
    };
  }, []);

  function updateEventStats(data: any[]) {
    const participants = new Set(data.map((e) => e.participant_id).filter(Boolean));
    const sessions = new Set(data.map((e) => e.session_id).filter(Boolean));
    const sessionCounts: Record<string, number> = {};
    data.forEach((e) => {
      if (e.session_id) sessionCounts[e.session_id] = (sessionCounts[e.session_id] || 0) + 1;
    });
    let mostActiveSession = null;
    let max = 0;
    Object.entries(sessionCounts).forEach(([sid, count]) => {
      if (count > max) {
        mostActiveSession = sid;
        max = count;
      }
    });
    setEventStats({
      total: data.length,
      participants: participants.size,
      sessions: sessions.size,
      mostActiveSession,
      lastUpdate: new Date(),
    });
  }

  // Messages realtime
  useEffect(() => {
    let ignore = false;
    async function fetchInitial() {
      const { data } = await supabase
        .from<any, any>("messages")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(MAX_EVENTS);
      if (!ignore && data) {
        setMessages(data);
        updateMessageStats(data);
      }
    }
    fetchInitial();
    const sub = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => {
            let next = prev.slice();
            if (payload.eventType === "INSERT") {
              next = [payload.new, ...next].slice(0, MAX_EVENTS);
            } else if (payload.eventType === "UPDATE") {
              next = next.map((e) => (e.id === payload.new.id ? payload.new : e));
            } else if (payload.eventType === "DELETE") {
              next = next.filter((e) => e.id !== payload.old.id);
            }
            updateMessageStats(next);
            return next;
          });
        }
      )
      .subscribe();
    return () => {
      ignore = true;
      sub.unsubscribe();
    };
  }, []);

  function updateMessageStats(data: any[]) {
    const senders = new Set(data.map((m) => m.sender_id).filter(Boolean));
    const flagged = data.filter((m) => m.flagged).length;
    setMessageStats({
      total: data.length,
      senders: senders.size,
      flagged,
      lastUpdate: new Date(),
    });
  }

  // Participants realtime
  useEffect(() => {
    let ignore = false;
    async function fetchInitial() {
      const { data } = await supabase
        .from("participants")
        .select("*", { count: "exact" })
        .order("updated_at", { ascending: false })
        .limit(MAX_EVENTS);
      if (!ignore && data) {
        setParticipants(data);
        updateParticipantStats(data);
      }
    }
    fetchInitial();
    const sub = supabase
      .channel("realtime-participants")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "participants" },
        (payload) => {
          setParticipants((prev) => {
            let next = prev.slice();
            if (payload.eventType === "INSERT") {
              next = [payload.new, ...next].slice(0, MAX_EVENTS);
            } else if (payload.eventType === "UPDATE") {
              next = next.map((e) => (e.id === payload.new.id ? payload.new : e));
            } else if (payload.eventType === "DELETE") {
              next = next.filter((e) => e.id !== payload.old.id);
            }
            updateParticipantStats(next);
            return next;
          });
        }
      )
      .subscribe();
    return () => {
      ignore = true;
      sub.unsubscribe();
    };
  }, []);

  function updateParticipantStats(data: any[]) {
    const active = data.filter((p) => (p.engagement_score ?? 0) > 0).length;
    setParticipantStats({
      total: data.length,
      active,
      lastUpdate: new Date(),
    });
  }

  // Sessions realtime
  useEffect(() => {
    let ignore = false;
    async function fetchInitial() {
      const { data } = await supabase
        .from("sessions")
        .select("*", { count: "exact" })
        .order("start_time", { ascending: false })
        .limit(MAX_EVENTS);
      if (!ignore && data) {
        setSessions(data);
        updateSessionStats(data);
      }
    }
    fetchInitial();
    const sub = supabase
      .channel("realtime-sessions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sessions" },
        (payload) => {
          setSessions((prev) => {
            let next = prev.slice();
            if (payload.eventType === "INSERT") {
              next = [payload.new, ...next].slice(0, MAX_EVENTS);
            } else if (payload.eventType === "UPDATE") {
              next = next.map((e) => (e.id === payload.new.id ? payload.new : e));
            } else if (payload.eventType === "DELETE") {
              next = next.filter((e) => e.id !== payload.old.id);
            }
            updateSessionStats(next);
            return next;
          });
        }
      )
      .subscribe();
    return () => {
      ignore = true;
      sub.unsubscribe();
    };
  }, []);

  function updateSessionStats(data: any[]) {
    const now = new Date();
    const ongoing = data.filter((s) => new Date(s.start_time) <= now && new Date(s.end_time) >= now).length;
    setSessionStats({
      total: data.length,
      ongoing,
      lastUpdate: new Date(),
    });
  }

  // Tab content renderers
  function renderTabContent() {
    if (tab === "engagement") {
      return (
        <>
          {/* Live Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{eventStats.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">Recent Events</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{eventStats.participants}</span>
              </div>
              <div className="text-sm text-muted-foreground">Active Participants</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cloud className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{eventStats.sessions}</span>
              </div>
              <div className="text-sm text-muted-foreground">Sessions</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <RefreshCw className="w-6 h-6 text-brass animate-spin-slow" />
                <span className="text-2xl font-bold">{eventStats.mostActiveSession || "-"}</span>
              </div>
              <div className="text-sm text-muted-foreground">Most Active Session</div>
            </Card>
          </div>
          {/* Live Feed */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-brass">Live</span>
              <span className="text-xs text-muted-foreground ml-2">Last updated {eventStats.lastUpdate.toLocaleTimeString()}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
            <ul className="divide-y divide-accent/30">
              {events.length === 0 && <li className="text-muted-foreground py-4">No events yet.</li>}
              {events.map((e, i) => (
                <li key={e.id || i} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-mono text-xs text-muted-foreground w-24">{e.created_at?.slice(0,19).replace('T',' ')}</span>
                  <span className="font-semibold text-brass w-32">{e.activity_type}</span>
                  <span className="text-xs text-muted-foreground w-32">{e.participant_id?.slice(0,8) || "-"}</span>
                  <span className="text-xs text-muted-foreground w-32">{e.session_id?.slice(0,8) || "-"}</span>
                  <span className="text-xs text-muted-foreground flex-1 truncate">{JSON.stringify(e.metadata)}</span>
                  <span className="text-xs text-muted-foreground w-12 text-right">{e.points ?? 0} pts</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      );
    }
    if (tab === "messages") {
      return (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageSquare className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{messageStats.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">Messages</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{messageStats.senders}</span>
              </div>
              <div className="text-sm text-muted-foreground">Senders</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{messageStats.flagged}</span>
              </div>
              <div className="text-sm text-muted-foreground">Flagged</div>
            </Card>
          </div>
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-brass">Live</span>
              <span className="text-xs text-muted-foreground ml-2">Last updated {messageStats.lastUpdate.toLocaleTimeString()}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Message Feed</h2>
            <ul className="divide-y divide-accent/30">
              {messages.length === 0 && <li className="text-muted-foreground py-4">No messages yet.</li>}
              {messages.map((m, i) => (
                <li key={m.id || i} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-mono text-xs text-muted-foreground w-24">{m.created_at?.slice(0,19).replace('T',' ')}</span>
                  <span className="font-semibold text-brass w-32">{m.sender_id?.slice(0,8) || "-"}</span>
                  <span className="text-xs text-muted-foreground flex-1 truncate">{m.content}</span>
                  <span className="text-xs text-muted-foreground w-12 text-right">{m.flagged ? "🚩" : ""}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      );
    }
    if (tab === "participants") {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{participantStats.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{participantStats.active}</span>
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </Card>
          </div>
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-brass">Live</span>
              <span className="text-xs text-muted-foreground ml-2">Last updated {participantStats.lastUpdate.toLocaleTimeString()}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Participants Feed</h2>
            <ul className="divide-y divide-accent/30">
              {participants.length === 0 && <li className="text-muted-foreground py-4">No participants yet.</li>}
              {participants.map((p, i) => (
                <li key={p.id || i} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-mono text-xs text-muted-foreground w-24">{p.updated_at?.slice(0,19).replace('T',' ')}</span>
                  <span className="font-semibold text-brass w-32">{p.user_id?.slice(0,8) || "-"}</span>
                  <span className="text-xs text-muted-foreground flex-1 truncate">{p.engagement_score ?? 0} pts</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      );
    }
    if (tab === "sessions") {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cloud className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{sessionStats.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">Sessions</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-brass/20 shadow-brass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="w-6 h-6 text-brass" />
                <span className="text-2xl font-bold">{sessionStats.ongoing}</span>
              </div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </Card>
          </div>
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-brass">Live</span>
              <span className="text-xs text-muted-foreground ml-2">Last updated {sessionStats.lastUpdate.toLocaleTimeString()}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Sessions Feed</h2>
            <ul className="divide-y divide-accent/30">
              {sessions.length === 0 && <li className="text-muted-foreground py-4">No sessions yet.</li>}
              {sessions.map((s, i) => (
                <li key={s.id || i} className="py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-mono text-xs text-muted-foreground w-24">{s.start_time?.slice(0,19).replace('T',' ')}</span>
                  <span className="font-semibold text-brass w-32">{s.title}</span>
                  <span className="text-xs text-muted-foreground flex-1 truncate">{s.session_type || "-"}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-brass rounded-xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Real-time <span className="bg-gradient-brass bg-clip-text text-transparent">Sync</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Instantly synchronize all devices and dashboards with live data from every corner of your event.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 justify-center">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 border ${tab === t.key ? "bg-brass text-background border-brass shadow-lg" : "bg-background border-accent/30 text-brass hover:bg-accent/10"}`}
                  onClick={() => setTab(t.key)}
                >
                  <Icon className="w-5 h-5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Features Grid (moved below live dashboard) */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: Cloud,
                title: "Google Cloud Pub/Sub",
                description: "Enterprise-grade messaging infrastructure for real-time data synchronization"
              },
              {
                icon: Smartphone,
                title: "Mobile App Sync",
                description: "React Native mobile app with instant data synchronization capabilities"
              },
              {
                icon: RefreshCw,
                title: "Live Updates",
                description: "Real-time dashboard updates without page refreshes or manual syncing"
              },
              {
                icon: Database,
                title: "Conflict Resolution",
                description: "Automatic handling of data conflicts across multiple devices and platforms"
              }
            ].map((feature, index) => {
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
        </div>
      </main>
    </div>
  );
};

export default RealTimeSync;
