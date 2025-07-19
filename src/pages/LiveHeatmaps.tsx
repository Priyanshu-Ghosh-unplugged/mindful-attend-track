
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp, Eye, Navigation as NavigationIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HeatMapGrid from 'react-heatmap-grid';
import { Dialog } from '@/components/ui/dialog';
import { format } from 'date-fns';

const GRID_SIZE = 10; // 10x10 grid for coordinates
const COLOR_SCALE = [
  '#f5f5f5', // 0
  '#ffe5b4', // low
  '#ffd580', // med-low
  '#ffc04d', // med
  '#ff9900', // high
  '#ff6600', // very high
  '#ff3300', // max
];

function getColor(value, max) {
  if (!value || max === 0) return COLOR_SCALE[0];
  const idx = Math.min(COLOR_SCALE.length - 1, Math.floor((value / max) * (COLOR_SCALE.length - 1)));
  return COLOR_SCALE[idx];
}

const ACTIVITY_TYPES = [
  { label: 'All', value: '' },
  { label: 'Check-in', value: 'checkin' },
  { label: 'Download', value: 'download' },
  { label: 'NFC Scan', value: 'nfc_scan' },
  { label: 'QR Scan', value: 'qr_scan' },
  { label: 'Page Visit', value: 'page_visit' },
  { label: 'Resource', value: 'resource_download' },
  { label: 'Click', value: 'browser_click' },
];
const TIME_RANGES = [
  { label: 'Last Hour', value: 60 * 60 * 1000 },
  { label: 'Today', value: 24 * 60 * 60 * 1000 },
  { label: 'Last 7 Days', value: 7 * 24 * 60 * 60 * 1000 },
];

const LiveHeatmaps = () => {
  const heatmapFeatures = [
    {
      icon: MapPin,
      title: "Engagement Hotspots",
      description: "Visualize where participants are most active and engaged",
      benefits: ["Identify popular areas", "Optimize space usage", "Improve event flow"]
    },
    {
      icon: Users,
      title: "Crowd Flow Analysis",
      description: "Track participant movement patterns throughout your venue",
      benefits: ["Prevent overcrowding", "Optimize booth placement", "Improve navigation"]
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Live data visualization that updates every few seconds",
      benefits: ["Instant insights", "Quick decision making", "Dynamic adjustments"]
    },
    {
      icon: Eye,
      title: "3D Visualization",
      description: "Interactive 3D heatmaps for comprehensive spatial understanding",
      benefits: ["Multi-level venues", "Detailed analysis", "Immersive insights"]
    }
  ];

  const useCases = [
    {
      title: "Conference Optimization",
      description: "Identify which sessions and speakers generate the most engagement",
      icon: Users
    },
    {
      title: "Booth Performance",
      description: "Track visitor flow and dwell time at sponsor booths and exhibits",
      icon: MapPin
    },
    {
      title: "Space Planning",
      description: "Optimize venue layout for future events based on traffic patterns",
      icon: NavigationIcon
    },
    {
      title: "Time Analysis",
      description: "Understand peak engagement times throughout your event",
      icon: Clock
    }
  ];

  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [maxValue, setMaxValue] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activityType, setActivityType] = useState('');
  const [timeRange, setTimeRange] = useState(TIME_RANGES[0].value);
  const [cellDetails, setCellDetails] = useState<Record<string, any[]>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCell, setModalCell] = useState<{ x: number; y: number } | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchHeatmap() {
      setLoading(true);
      const since = new Date(Date.now() - timeRange).toISOString();
      let query = supabase
        .from('engagement_logs')
        .select('metadata, participant_id, activity_type, created_at')
        .gte('created_at', since);
      if (activityType) query = query.eq('activity_type', activityType);
      const { data, error } = await query;
      // Build a 10x10 grid
      const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
      const cellMap: Record<string, any[]> = {};
      if (data) {
        data.forEach((log) => {
          const meta = log.metadata;
          if (meta && typeof meta === 'object' && !Array.isArray(meta)) {
            const m = meta as Record<string, any>;
            let x = m.x ?? m.coord_x ?? m.booth_x ?? null;
            let y = m.y ?? m.coord_y ?? m.booth_y ?? null;
            if (typeof x === 'number' && typeof y === 'number') {
              x = Math.max(0, Math.min(GRID_SIZE - 1, Math.round(x)));
              y = Math.max(0, Math.min(GRID_SIZE - 1, Math.round(y)));
              grid[y][x] += 1;
              const key = `${x},${y}`;
              if (!cellMap[key]) cellMap[key] = [];
              cellMap[key].push({ ...log, x, y });
            }
          }
        });
      }
      setHeatmapData(grid);
      setMaxValue(Math.max(1, ...grid.flat()));
      setCellDetails(cellMap);
      setLastRefresh(new Date());
      setLoading(false);
    }
    fetchHeatmap();
    const interval = setInterval(fetchHeatmap, 30000);
    return () => clearInterval(interval);
  }, [activityType, timeRange]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              <span className="bg-gradient-brass bg-clip-text text-transparent">Live Heatmaps</span> & Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visualize participant engagement and movement patterns in real-time with 
              interactive heatmaps and spatial analytics.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
            <div>
              <label className="block text-sm font-medium mb-1">Activity Type</label>
              <select
                className="rounded-lg border px-3 py-2 bg-background"
                value={activityType}
                onChange={e => setActivityType(e.target.value)}
              >
                {ACTIVITY_TYPES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Range</label>
              <select
                className="rounded-lg border px-3 py-2 bg-background"
                value={timeRange}
                onChange={e => setTimeRange(Number(e.target.value))}
              >
                {TIME_RANGES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Last updated {format(lastRefresh, 'HH:mm:ss')}</span>
            </div>
          </div>

          {/* Real Heatmap Visualization */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Live Engagement Heatmap</h2>
            <div className="relative bg-accent/20 rounded-lg p-8 min-h-96 flex flex-col items-center justify-center">
              {loading ? (
                <div className="text-brass text-lg">Loading heatmap...</div>
              ) : (
                <div className="w-full max-w-2xl">
                  <HeatMapGrid
                    data={heatmapData}
                    xLabels={Array.from({ length: GRID_SIZE }, (_, i) => `${i + 1}`)}
                    yLabels={Array.from({ length: GRID_SIZE }, (_, i) => `${i + 1}`)}
                    cellStyle={(_x, _y, value) => ({
                      background: getColor(value, maxValue),
                      borderRadius: '8px',
                      transition: 'background 0.3s',
                      boxShadow: value ? '0 2px 8px rgba(255,153,0,0.08)' : 'none',
                      cursor: value ? 'pointer' : 'default',
                    })}
                    cellRender={(x, y, value) => value ? (
                      <div
                        className="font-bold text-xs text-brass group relative"
                        onClick={() => {
                          setModalCell({ x, y });
                          setModalOpen(true);
                        }}
                        style={{ transition: 'transform 0.2s', transform: 'scale(1)' }}
                      >
                        {value}
                        <span className="absolute left-1/2 -translate-x-1/2 top-8 z-10 hidden group-hover:block bg-background/90 text-xs text-foreground px-3 py-2 rounded shadow-lg border mt-1 min-w-[120px]">
                          <span className="block font-semibold">{value} events</span>
                          <span className="block">Cell [{x + 1}, {y + 1}]</span>
                        </span>
                      </div>
                    ) : null}
                    xLabelsStyle={() => ({ color: '#bfa76a', fontWeight: 600 })}
                    yLabelsStyle={() => ({ color: '#bfa76a', fontWeight: 600 })}
                    square
                  />
                </div>
              )}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-3">Engagement Intensity</h3>
                <div className="flex gap-2 items-center">
                  {COLOR_SCALE.map((color, idx) => (
                    <div key={color} className="w-6 h-4 rounded" style={{ background: color, border: '1px solid #eee' }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Drilldown Modal */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            {modalCell && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-background rounded-lg shadow-xl p-8 max-w-lg w-full relative">
                  <button className="absolute top-2 right-2 text-brass" onClick={() => setModalOpen(false)}>&times;</button>
                  <h3 className="text-xl font-semibold mb-4">Cell [{modalCell.x + 1}, {modalCell.y + 1}] Details</h3>
                  <div className="max-h-80 overflow-y-auto">
                    {(cellDetails[`${modalCell.x},${modalCell.y}`] || []).length === 0 ? (
                      <div className="text-muted-foreground">No events for this cell.</div>
                    ) : (
                      <ul className="space-y-2">
                        {cellDetails[`${modalCell.x},${modalCell.y}`].map((log, idx) => (
                          <li key={idx} className="p-3 rounded bg-accent/30 border-l-4 border-brass">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-brass">{log.activity_type}</span>
                              <span className="text-xs text-muted-foreground">{format(new Date(log.created_at), 'PPpp')}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Participant: {log.participant_id}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Dialog>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {heatmapFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-brass rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <Card key={index} className="p-6 bg-gradient-card border-accent/20 text-center hover:shadow-elegant transition-all duration-300">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Visualize Your Event's Engagement
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Get real-time spatial insights and optimize your event experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/demo">Interactive Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Start Mapping</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveHeatmaps;
