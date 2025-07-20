
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Users, MapPin, Clock, Play } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const StartTracking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventData.name || !eventData.startDate || !eventData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (new Date(eventData.startDate) >= new Date(eventData.endDate)) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            name: eventData.name,
            description: eventData.description,
            start_date: eventData.startDate,
            end_date: eventData.endDate,
            location: eventData.location,
            organizer_id: user.id,
            status: 'upcoming'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Event Created!",
        description: `${eventData.name} has been created successfully`,
      });

      // Reset form
      setEventData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        location: ""
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create event",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-brass rounded-full mb-6">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Start <span className="bg-gradient-brass bg-clip-text text-transparent">Tracking</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your first event and begin tracking participant engagement in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Event Creation Form */}
            <Card className="p-8 bg-gradient-card border-accent/20 shadow-elegant">
              <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    placeholder="e.g., Tech Conference 2024"
                    value={eventData.name}
                    onChange={(e) => setEventData({...eventData, name: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    value={eventData.description}
                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={eventData.startDate}
                      onChange={(e) => setEventData({...eventData, startDate: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={eventData.endDate}
                      onChange={(e) => setEventData({...eventData, endDate: e.target.value})}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Event venue or online platform"
                    value={eventData.location}
                    onChange={(e) => setEventData({...eventData, location: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="brass" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Event..." : "Create Event & Start Tracking"}
                </Button>
              </form>
            </Card>

            {/* Features Preview */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-card border-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-brass" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Participants</h3>
                    <p className="text-sm text-muted-foreground">Track who's engaged</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitor participant check-ins, interactions, and engagement levels as they happen.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card border-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-brass" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Session Management</h3>
                    <p className="text-sm text-muted-foreground">Organize your agenda</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create sessions, workshops, and activities with detailed tracking capabilities.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card border-accent/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-brass" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Analytics</h3>
                    <p className="text-sm text-muted-foreground">Instant insights</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get real-time analytics and engagement scores to optimize your event experience.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartTracking;
