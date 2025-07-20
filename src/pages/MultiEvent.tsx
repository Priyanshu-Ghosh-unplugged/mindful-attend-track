import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, Copy, Plus, Users, Activity, Cloud, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

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

const MultiEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({ name: "", description: "", start_time: "", end_time: "" });
  const [loading, setLoading] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [filter, setFilter] = useState('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("events")
        .select("id, name, description, start_date, end_date, location, status, organizer_id, created_at, updated_at")
        .order("created_at", { ascending: false });
      if (data) setEvents(data);
    }
    fetchEvents();
  }, []);

  // Fetch metrics for comparison
  useEffect(() => {
    async function fetchMetrics() {
      if (compare.length === 0) return;
      const out: any = {};
      for (const eid of compare) {
        const { count: attendance } = await supabase.from("participants").select("id", { count: "exact", head: true }).eq("event_id", eid);
        const { count: engagement } = await supabase.from("engagement_logs").select("id", { count: "exact", head: true }).eq("event_id", eid);
        const { count: sessions } = await supabase.from("sessions").select("id", { count: "exact", head: true }).eq("event_id", eid);
        out[eid] = { attendance, engagement, sessions };
      }
      setMetrics(out);
    }
    fetchMetrics();
  }, [compare]);

  // Fetch chart data for compared events
  useEffect(() => {
    async function fetchChartData() {
      if (compare.length === 0) return setChartData([]);
      // For demo: generate mock time series data for each event
      const days = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
      const data = days.map((day, idx) => {
        const row: any = { day };
        compare.forEach(eid => {
          // In real app, fetch actual time series from Supabase
          row[`attendance_${eid}`] = Math.floor(Math.random() * 100 + 50 - idx * 5);
          row[`engagement_${eid}`] = Math.floor(Math.random() * 200 + 100 - idx * 10);
        });
        return row;
      });
      setChartData(data);
    }
    fetchChartData();
  }, [compare]);

  async function handleCreate() {
    setLoading(true);
    const { data, error } = await supabase.from("events").insert([
      { 
        name: newEvent.name, 
        description: newEvent.description, 
        start_date: newEvent.start_time || null, 
        end_date: newEvent.end_time || null,
        location: 'TBD',
        status: 'upcoming'
      }
    ]).select("id, name, description, start_date, end_date, location, status, organizer_id, created_at, updated_at");
    setLoading(false);
    if (data && data[0]) setEvents((prev) => [data[0], ...prev]);
    setNewEvent({ name: "", description: "", start_time: "", end_time: "" });
  }

  async function handleClone(eid: string) {
    setLoading(true);
    const orig = events.find((e) => e.id === eid);
    if (!orig) return;
    const { data, error } = await supabase.from("events").insert([
      { 
        name: orig.name + " (Clone)", 
        description: orig.description, 
        start_date: orig.start_date, 
        end_date: orig.end_date,
        location: orig.location,
        status: orig.status
      }
    ]).select("id, name, description, start_date, end_date, location, status, organizer_id, created_at, updated_at");
    setLoading(false);
    if (data && data[0]) setEvents((prev) => [data[0], ...prev]);
  }

  async function handleEditSave() {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .update(editValues)
      .eq('id', editingEvent!.id)
      .select("id, name, description, start_date, end_date, location, status, organizer_id, created_at, updated_at");
    setLoading(false);
    if (data && data[0]) setEvents(prev => prev.map(e => e.id === editingEvent!.id ? data[0] : e));
    setEditingEvent(null);
  }
  
  async function handleDelete(eid: string) {
    setLoading(true);
    await supabase.from("events").delete().eq('id', eid);
    setLoading(false);
    setEvents(prev => prev.filter(e => e.id !== eid));
    setDeleteConfirm(null);
  }

  function handleExportCSV() {
    if (!compare.length) return;
    const headers = ['Event', 'Attendance', 'Engagement', 'Sessions'];
    const rows = compare.map(eid => [
      events.find(e => e.id === eid)?.name,
      metrics[eid]?.attendance ?? '-',
      metrics[eid]?.engagement ?? '-',
      metrics[eid]?.sessions ?? '-',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event_comparison.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Filtered events
  const filteredEvents = events.filter(e =>
    (!filter || e.name.toLowerCase().includes(filter.toLowerCase()) || (e.description || '').toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              <span className="bg-gradient-brass bg-clip-text text-transparent">Multi-Event</span> Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Manage, compare, and analyze multiple events with ease.
            </p>
          </div>

          {/* Create Event */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Input
                placeholder="Event Name"
                value={newEvent.name}
                onChange={e => setNewEvent(ev => ({ ...ev, name: e.target.value }))}
                className="flex-1"
              />
              <Input
                placeholder="Description"
                value={newEvent.description}
                onChange={e => setNewEvent(ev => ({ ...ev, description: e.target.value }))}
                className="flex-1"
              />
              <Input
                placeholder="Start Time (YYYY-MM-DDTHH:MM)"
                value={newEvent.start_time}
                onChange={e => setNewEvent(ev => ({ ...ev, start_time: e.target.value }))}
                className="flex-1"
                type="datetime-local"
              />
              <Input
                placeholder="End Time (YYYY-MM-DDTHH:MM)"
                value={newEvent.end_time}
                onChange={e => setNewEvent(ev => ({ ...ev, end_time: e.target.value }))}
                className="flex-1"
                type="datetime-local"
              />
              <Button onClick={handleCreate} disabled={loading || !newEvent.name} variant="brass">
                <Plus className="w-4 h-4 mr-2" /> Create Event
              </Button>
            </div>
          </Card>

          {/* Filter Input */}
          <Card className="p-4 mb-4 flex flex-col md:flex-row gap-4 items-center">
            <Input
              placeholder="Filter events by name or description..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="flex-1"
            />
          </Card>

          {/* Event List */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredEvents.map((event) => (
              <Card key={event.id} className={`p-6 border-2 ${selected === event.id ? "border-brass" : "border-accent/20"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleClone(event.id)} title="Clone Event">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant={selected === event.id ? "brass" : "outline"} onClick={() => setSelected(event.id)} title="Select Event">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant={compare.includes(event.id) ? "brass" : "outline"} onClick={() => setCompare(c => c.includes(event.id) ? c.filter(id => id !== event.id) : [...c, event.id])} title="Compare Event">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => { setEditingEvent(event); setEditValues(event); }} title="Edit Event">
                      <Cloud className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setDeleteConfirm(event.id)} title="Delete Event">
                      <Activity className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-muted-foreground">Created: {event.created_at?.slice(0,10)}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Edit Modal */}
          {editingEvent && (
            <Dialog open={!!editingEvent} onOpenChange={v => { if (!v) setEditingEvent(null); }}>
              <DialogContent>
                <DialogTitle>Edit Event</DialogTitle>
                <Input
                  placeholder="Event Name"
                  value={editValues.name}
                  onChange={e => setEditValues((ev: any) => ({ ...ev, name: e.target.value }))}
                  className="mb-2"
                />
                <Input
                  placeholder="Description"
                  value={editValues.description}
                  onChange={e => setEditValues((ev: any) => ({ ...ev, description: e.target.value }))}
                  className="mb-2"
                />
                <Input
                  placeholder="Start Time"
                  value={editValues.start_date}
                  onChange={e => setEditValues((ev: any) => ({ ...ev, start_date: e.target.value }))}
                  className="mb-2"
                  type="datetime-local"
                />
                <Input
                  placeholder="End Time"
                  value={editValues.end_date}
                  onChange={e => setEditValues((ev: any) => ({ ...ev, end_date: e.target.value }))}
                  className="mb-4"
                  type="datetime-local"
                />
                <div className="flex gap-4">
                  <Button onClick={handleEditSave} variant="brass">Save</Button>
                  <Button onClick={() => setEditingEvent(null)} variant="outline">Cancel</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Delete Confirm Modal */}
          {deleteConfirm && (
            <Dialog open={!!deleteConfirm} onOpenChange={v => { if (!v) setDeleteConfirm(null); }}>
              <DialogContent>
                <DialogTitle className="text-red-600">Delete Event?</DialogTitle>
                <p className="mb-4">Are you sure you want to delete this event? This action cannot be undone.</p>
                <div className="flex gap-4">
                  <Button onClick={() => handleDelete(deleteConfirm!)} variant="destructive">Delete</Button>
                  <Button onClick={() => setDeleteConfirm(null)} variant="outline">Cancel</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Comparison Dashboard */}
          {compare.length > 0 && (
            <Card className="p-8 mb-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold">Event Comparison</h2>
                <Button onClick={handleExportCSV} variant="outline" size="sm">Export CSV</Button>
              </div>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-brass">
                      <th className="px-4 py-2 text-left">Event</th>
                      <th className="px-4 py-2">Attendance</th>
                      <th className="px-4 py-2">Engagement</th>
                      <th className="px-4 py-2">Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compare.map(eid => (
                      <tr key={eid} className="border-b border-accent/20">
                        <td className="px-4 py-2 font-semibold">{events.find(e => e.id === eid)?.name}</td>
                        <td className="px-4 py-2 text-center">{metrics[eid]?.attendance ?? "-"}</td>
                        <td className="px-4 py-2 text-center">{metrics[eid]?.engagement ?? "-"}</td>
                        <td className="px-4 py-2 text-center">{metrics[eid]?.sessions ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Charts */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Attendance Over Time</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {compare.map(eid => (
                      <Line key={eid} type="monotone" dataKey={`attendance_${eid}`} name={events.find(e => e.id === eid)?.name} stroke="#bfa76a" strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Engagement Over Time</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {compare.map(eid => (
                      <Line key={eid} type="monotone" dataKey={`engagement_${eid}`} name={events.find(e => e.id === eid)?.name} stroke="#ff9900" strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MultiEvent;
