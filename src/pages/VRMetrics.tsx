
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { 
  Headphones, 
  Eye, 
  Clock, 
  TrendingUp, 
  Target, 
  Gamepad2,
  Users,
  Activity,
  Zap,
  MapPin,
  Smartphone,
  Wifi,
  Play,
  Pause,
  Square,
  RefreshCw,
  EyeOff,
  Hand,
  Move,
  RotateCw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Settings,
  BarChart3,
  PieChart,
  ScatterChart,
  Globe,
  Monitor,
  Smartphone as Mobile,
  Tablet
} from "lucide-react";
import { Link } from "react-router-dom";

const VRMetrics = () => {
  const [isTracking, setIsTracking] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedVRExperience, setSelectedVRExperience] = useState("all");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const vrExperiences = [
    { id: "all", name: "All Experiences", users: 156, avgTime: 12.5 },
    { id: "product-demo", name: "Product Demo VR", users: 45, avgTime: 8.2 },
    { id: "virtual-tour", name: "Virtual Venue Tour", users: 67, avgTime: 15.3 },
    { id: "networking", name: "VR Networking Lounge", users: 34, avgTime: 22.1 },
    { id: "workshop", name: "Interactive Workshop", users: 23, avgTime: 18.7 },
    { id: "gaming", name: "VR Gaming Zone", users: 28, avgTime: 25.4 }
  ];

  const liveVRUsers = [
    {
      id: 1,
      user: "Sarah Chen",
      experience: "Product Demo VR",
      duration: "8m 32s",
      interactions: 47,
      gazePoints: 156,
      status: "active",
      avatar: "SC",
      lastAction: "Examining product details"
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      experience: "VR Networking Lounge",
      duration: "15m 18s",
      interactions: 23,
      gazePoints: 89,
      status: "active",
      avatar: "MR",
      lastAction: "Connecting with attendees"
    },
    {
      id: 3,
      user: "Lisa Wang",
      experience: "Virtual Venue Tour",
      duration: "12m 45s",
      interactions: 34,
      gazePoints: 123,
      status: "active",
      avatar: "LW",
      lastAction: "Exploring exhibition area"
    },
    {
      id: 4,
      user: "Alex Kim",
      experience: "VR Gaming Zone",
      duration: "22m 12s",
      interactions: 89,
      gazePoints: 234,
      status: "active",
      avatar: "AK",
      lastAction: "Playing interactive game"
    },
    {
      id: 5,
      user: "Emma Davis",
      experience: "Interactive Workshop",
      duration: "18m 33s",
      interactions: 56,
      gazePoints: 178,
      status: "active",
      avatar: "ED",
      lastAction: "Participating in group activity"
    }
  ];

  const gazeHeatmapData = [
    { area: "Product Display", attention: 85, timeSpent: 45 },
    { area: "Information Panel", attention: 72, timeSpent: 32 },
    { area: "Interactive Demo", attention: 91, timeSpent: 67 },
    { area: "Sponsor Banner", attention: 68, timeSpent: 28 },
    { area: "Navigation Menu", attention: 45, timeSpent: 15 },
    { area: "Social Features", attention: 78, timeSpent: 38 }
  ];

  const interactionMetrics = [
    { type: "Object Selection", count: 234, success: 89 },
    { type: "Gesture Recognition", count: 156, success: 92 },
    { type: "Voice Commands", count: 89, success: 78 },
    { type: "Movement Tracking", count: 445, success: 95 },
    { type: "UI Interactions", count: 567, success: 88 },
    { type: "Social Actions", count: 123, success: 85 }
  ];

  const deviceStats = [
    { device: "Meta Quest 3", count: 67, percentage: 43 },
    { device: "HTC Vive", count: 34, percentage: 22 },
    { device: "Valve Index", count: 23, percentage: 15 },
    { device: "Pico 4", count: 18, percentage: 12 },
    { device: "Other", count: 14, percentage: 8 }
  ];

  const performanceMetrics = [
    { metric: "Frame Rate", value: 89, target: 90, unit: "FPS" },
    { metric: "Latency", value: 12, target: 15, unit: "ms" },
    { metric: "Tracking Accuracy", value: 96, target: 95, unit: "%" },
    { metric: "User Comfort", value: 8.7, target: 8.5, unit: "/10" }
  ];

  const sponsorEngagement = [
    { sponsor: "TechCorp", impressions: 234, interactions: 89, dwellTime: 45 },
    { sponsor: "InnovateLab", impressions: 189, interactions: 67, dwellTime: 38 },
    { sponsor: "FutureTech", impressions: 156, interactions: 45, dwellTime: 32 },
    { sponsor: "VR Solutions", impressions: 123, interactions: 34, dwellTime: 28 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header with Live Status */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-4">
                VR <span className="bg-gradient-brass bg-clip-text text-transparent">Metrics</span> Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Immersive analytics and real-time VR engagement tracking
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Current Time</div>
                <div className="text-lg font-mono font-semibold">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {isTracking ? 'VR Tracking Active' : 'VR Tracking Paused'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTracking(!isTracking)}
                className="flex items-center gap-2"
              >
                {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isTracking ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <Headphones className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Active VR Users</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Gaze Points Tracked</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">18.7m</div>
                  <div className="text-sm text-muted-foreground">Avg. Session Time</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">892</div>
                  <div className="text-sm text-muted-foreground">Interactions</div>
                </div>
              </div>
            </Card>
          </div>

          {/* VR Experience Selector */}
          <Card className="p-4 bg-gradient-card border-accent/20 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">VR Experience Filter</h3>
              <div className="flex gap-2">
                {vrExperiences.map((exp) => (
                  <Button
                    key={exp.id}
                    variant={selectedVRExperience === exp.id ? "brass" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVRExperience(exp.id)}
                  >
                    {exp.name}
                    <Badge variant="secondary" className="ml-2">
                      {exp.users}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Live Users</TabsTrigger>
              <TabsTrigger value="gaze">Gaze Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* VR Experiences Overview */}
                <Card className="lg:col-span-2 p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">VR Experiences Overview</h3>
                  <div className="space-y-4">
                    {vrExperiences.slice(1).map((exp) => (
                      <div key={exp.id} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center">
                            <Headphones className="w-5 h-5 text-brass" />
                          </div>
                          <div>
                            <div className="font-medium">{exp.name}</div>
                            <div className="text-sm text-muted-foreground">{exp.avgTime}min avg session</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-brass">{exp.users}</div>
                          <div className="text-sm text-muted-foreground">active users</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Live VR Activity */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Live VR Activity</h3>
                  <div className="space-y-3">
                    {liveVRUsers.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{user.user}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.experience} • {user.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">{user.interactions} actions</div>
                          <Badge variant="outline" className="text-xs">{user.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Live Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="p-6 bg-gradient-card border-accent/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Real-time VR Users</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                </div>
                <div className="space-y-3">
                  {liveVRUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg border-l-4 border-brass">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-sm font-bold">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{user.user}</span>
                          <Badge variant="secondary" className="text-xs">
                            {user.experience}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {user.lastAction}
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Duration: {user.duration}</span>
                          <span>Interactions: {user.interactions}</span>
                          <span>Gaze Points: {user.gazePoints}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">{user.status}</Badge>
                        <div className="text-xs text-muted-foreground">Active now</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Gaze Analytics Tab */}
            <TabsContent value="gaze" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Gaze Heatmap */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Gaze Heatmap Analysis</h3>
                  <div className="space-y-4">
                    {gazeHeatmapData.map((area) => (
                      <div key={area.area} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{area.area}</span>
                          <span className="text-sm text-muted-foreground">
                            {area.timeSpent}s avg
                          </span>
                        </div>
                        <Progress value={area.attention} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attention level</span>
                          <span className="text-brass font-medium">{area.attention}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Interaction Analytics */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Interaction Analytics</h3>
                  <div className="space-y-4">
                    {interactionMetrics.map((interaction) => (
                      <div key={interaction.type} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{interaction.type}</span>
                          <span className="text-sm text-muted-foreground">
                            {interaction.count} attempts
                          </span>
                        </div>
                        <Progress value={interaction.success} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Success rate</span>
                          <span className="text-brass font-medium">{interaction.success}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Performance Metrics */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                        <div>
                          <div className="font-medium">{metric.metric}</div>
                          <div className="text-sm text-muted-foreground">Target: {metric.target} {metric.unit}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${metric.value >= metric.target ? 'text-green-600' : 'text-orange-600'}`}>
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">{metric.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Device Statistics */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">VR Device Usage</h3>
                  <div className="space-y-4">
                    {deviceStats.map((device) => (
                      <div key={device.device} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brass/10 rounded-lg flex items-center justify-center">
                            <Headphones className="w-4 h-4 text-brass" />
                          </div>
                          <span className="font-medium">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{device.count}</div>
                          <div className="text-sm text-muted-foreground">{device.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Sponsors Tab */}
            <TabsContent value="sponsors" className="space-y-6">
              <Card className="p-6 bg-gradient-card border-accent/20">
                <h3 className="text-xl font-semibold mb-4">Sponsor Engagement Analytics</h3>
                <div className="space-y-4">
                  {sponsorEngagement.map((sponsor) => (
                    <div key={sponsor.sponsor} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-brass" />
                        </div>
                        <div>
                          <div className="font-medium">{sponsor.sponsor}</div>
                          <div className="text-sm text-muted-foreground">{sponsor.impressions} impressions</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-brass">{sponsor.interactions}</div>
                        <div className="text-sm text-muted-foreground">
                          {sponsor.dwellTime}s avg dwell time
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Ready for Immersive Analytics?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Transform your events with advanced VR tracking and immersive engagement analytics
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/get-started">Start VR Tracking</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/demo">View VR Demo</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VRMetrics;
