
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { 
  QrCode, 
  Radio, 
  Globe, 
  Download, 
  BarChart3, 
  Eye, 
  Users, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Activity,
  Smartphone,
  Wifi,
  Zap,
  Target,
  Calendar,
  Filter,
  RefreshCw,
  Play,
  Pause,
  Square
} from "lucide-react";
import { Link } from "react-router-dom";

const Tracking = () => {
  const [isTracking, setIsTracking] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trackingMethods = [
    {
      icon: QrCode,
      title: "QR Code Scanning",
      description: "Traditional QR code scanning for session check-ins and resource access",
      status: "active",
      count: 234,
      trend: "+12%"
    },
    {
      icon: Radio,
      title: "RFID/NFC Tags",
      description: "Contactless tracking with RFID wristbands and NFC-enabled devices",
      status: "active",
      count: 189,
      trend: "+8%"
    },
    {
      icon: Globe,
      title: "Browser Tracking",
      description: "Web-based engagement tracking for online sessions and resources",
      status: "active",
      count: 456,
      trend: "+15%"
    },
    {
      icon: Download,
      title: "Download Monitoring",
      description: "Track resource downloads and digital content engagement",
      status: "active",
      count: 123,
      trend: "+5%"
    }
  ];

  const liveEvents = [
    {
      id: 1,
      type: "check-in",
      user: "Sarah Chen",
      location: "Main Hall",
      time: "2 seconds ago",
      method: "QR Code",
      avatar: "SC"
    },
    {
      id: 2,
      type: "session-join",
      user: "Mike Rodriguez",
      location: "Workshop Room A",
      time: "5 seconds ago",
      method: "NFC",
      avatar: "MR"
    },
    {
      id: 3,
      type: "resource-download",
      user: "Lisa Wang",
      location: "Virtual",
      time: "12 seconds ago",
      method: "Browser",
      avatar: "LW"
    },
    {
      id: 4,
      type: "poll-response",
      user: "Alex Kim",
      location: "Main Hall",
      time: "18 seconds ago",
      method: "Mobile App",
      avatar: "AK"
    },
    {
      id: 5,
      type: "networking-connect",
      user: "Emma Davis",
      location: "Networking Lounge",
      time: "25 seconds ago",
      method: "QR Code",
      avatar: "ED"
    }
  ];

  const sessionData = [
    { name: "Keynote Speech", attendees: 89, capacity: 100, engagement: 92 },
    { name: "AI Workshop", attendees: 45, capacity: 50, engagement: 88 },
    { name: "Networking Session", attendees: 67, capacity: 80, engagement: 95 },
    { name: "Panel Discussion", attendees: 34, capacity: 40, engagement: 85 },
    { name: "Tech Demo", attendees: 23, capacity: 30, engagement: 90 }
  ];

  const locationHeatmap = [
    { location: "Main Hall", activity: 85, capacity: 100 },
    { location: "Workshop Room A", activity: 72, capacity: 50 },
    { location: "Workshop Room B", activity: 68, capacity: 50 },
    { location: "Networking Lounge", activity: 91, capacity: 80 },
    { location: "Exhibition Area", activity: 78, capacity: 120 },
    { location: "Cafeteria", activity: 45, capacity: 60 }
  ];

  const deviceStats = [
    { device: "Mobile Phones", count: 234, percentage: 45 },
    { device: "Laptops", count: 189, percentage: 36 },
    { device: "Tablets", count: 67, percentage: 13 },
    { device: "Smart Watches", count: 23, percentage: 4 },
    { device: "Other", count: 12, percentage: 2 }
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
                Live <span className="bg-gradient-brass bg-clip-text text-transparent">Tracking</span> Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time event monitoring and analytics
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
                  {isTracking ? 'Tracking Active' : 'Tracking Paused'}
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
                <Users className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Total Participants</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">892</div>
                  <div className="text-sm text-muted-foreground">Active Now</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">6.2h</div>
                  <div className="text-sm text-muted-foreground">Avg. Session Time</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-card border-accent/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-brass" />
                <div>
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-sm text-muted-foreground">Engagement Rate</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="live">Live Events</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Tracking Methods */}
                <Card className="lg:col-span-2 p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Tracking Methods Status</h3>
                  <div className="space-y-4">
                    {trackingMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div key={method.title} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-brass" />
                            </div>
                            <div>
                              <div className="font-medium">{method.title}</div>
                              <div className="text-sm text-muted-foreground">{method.count} events today</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                              {method.status}
                            </Badge>
                            <div className="text-sm text-green-600 font-medium">{method.trend}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Live Activity Feed */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Live Activity</h3>
                  <div className="space-y-3">
                    {liveEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold">
                          {event.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{event.user}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.type.replace('-', ' ')} • {event.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                          <Badge variant="outline" className="text-xs">{event.method}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Live Events Tab */}
            <TabsContent value="live" className="space-y-6">
              <Card className="p-6 bg-gradient-card border-accent/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Real-time Event Stream</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                </div>
                <div className="space-y-3">
                  {liveEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg border-l-4 border-brass">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-sm font-bold">
                        {event.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{event.user}</span>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {event.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {event.location} • {event.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{event.method}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Session Attendance */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Session Attendance</h3>
                  <div className="space-y-4">
                    {sessionData.map((session) => (
                      <div key={session.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{session.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {session.attendees}/{session.capacity}
                          </span>
                        </div>
                        <Progress value={(session.attendees / session.capacity) * 100} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Capacity</span>
                          <span className="text-brass font-medium">{session.engagement}% engagement</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Location Heatmap */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Location Activity</h3>
                  <div className="space-y-4">
                    {locationHeatmap.map((location) => (
                      <div key={location.location} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{location.location}</span>
                          <span className="text-sm text-muted-foreground">
                            {location.activity}/{location.capacity}
                          </span>
                        </div>
                        <Progress value={(location.activity / location.capacity) * 100} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current occupancy</span>
                          <span className="text-brass font-medium">
                            {Math.round((location.activity / location.capacity) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Device Statistics */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Device Usage</h3>
                  <div className="space-y-4">
                    {deviceStats.map((device) => (
                      <div key={device.device} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-brass/10 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-brass" />
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

                {/* Engagement Trends */}
                <Card className="p-6 bg-gradient-card border-accent/20">
                  <h3 className="text-xl font-semibold mb-4">Engagement Trends</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                      <div>
                        <div className="font-medium">Peak Activity</div>
                        <div className="text-sm text-muted-foreground">2:30 PM - 3:45 PM</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brass">1,156</div>
                        <div className="text-sm text-muted-foreground">events/hour</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                      <div>
                        <div className="font-medium">Average Session</div>
                        <div className="text-sm text-muted-foreground">Per participant</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brass">6.2h</div>
                        <div className="text-sm text-muted-foreground">duration</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                      <div>
                        <div className="font-medium">Network Connections</div>
                        <div className="text-sm text-muted-foreground">Made today</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brass">342</div>
                        <div className="text-sm text-muted-foreground">connections</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to Start Tracking?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Set up comprehensive tracking for your next event with our multi-modal approach
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/get-started">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/demo">View Demo</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tracking;
