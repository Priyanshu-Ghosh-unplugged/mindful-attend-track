
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, Users, Shield, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AIMentor = () => {
  const mentorFeatures = [
    {
      icon: Brain,
      title: "Intelligent Matching",
      description: "AI analyzes participant skills, interests, and goals to match them with the most relevant mentors",
      benefits: ["Skill-based pairing", "Interest alignment", "Goal compatibility", "Success prediction"]
    },
    {
      icon: MessageSquare,
      title: "Smart Conversations",
      description: "Natural language processing helps facilitate meaningful mentor-mentee interactions",
      benefits: ["Conversation starters", "Topic suggestions", "Follow-up reminders", "Progress tracking"]
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Advanced algorithms detect and prevent fake profiles and malicious behavior",
      benefits: ["Profile verification", "Behavior analysis", "Trust scoring", "Safe environment"]
    },
    {
      icon: Zap,
      title: "Real-time Guidance",
      description: "Instant recommendations and insights during live mentoring sessions",
      benefits: ["Live assistance", "Resource suggestions", "Next steps", "Action items"]
    }
  ];

  const chatExample = [
    { sender: "AI", message: "I've found 3 excellent mentors for your React development goals. Would you like to see their profiles?" },
    { sender: "User", message: "Yes, please show me!" },
    { sender: "AI", message: "Here's Sarah Chen - Senior React Developer at Google with 8 years experience. She's available for a 30-min session today at 3 PM. Should I schedule it?" },
    { sender: "User", message: "That sounds perfect!" },
    { sender: "AI", message: "Great! I've sent Sarah your profile and scheduled the session. I'll also prepare some conversation starters based on your current projects." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              <span className="bg-gradient-brass bg-clip-text text-transparent">AI Mentor</span> System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Intelligent mentor-mentee matching powered by AI, with fraud detection 
              and real-time conversation assistance for meaningful connections.
            </p>
          </div>

          {/* Chat Demo */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">AI Assistant in Action</h2>
            
            <div className="bg-accent/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                {chatExample.map((chat, index) => (
                  <div key={index} className={`flex ${chat.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      chat.sender === 'User' 
                        ? 'bg-brass text-primary-foreground' 
                        : 'bg-background border'
                    }`}>
                      <div className="text-xs font-medium mb-1 opacity-70">
                        {chat.sender === 'User' ? 'You' : 'AI Mentor'}
                      </div>
                      <div className="text-sm">{chat.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                  Live Conversation Assistant Active
                </Badge>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {mentorFeatures.map((feature, index) => {
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
                        <CheckCircle className="w-4 h-4 text-brass" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* How It Works */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">How AI Mentoring Works</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Profile Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  AI analyzes skills, interests, and goals from participant profiles
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Smart Matching</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced algorithms find the best mentor-mentee combinations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Facilitated Chat</h3>
                <p className="text-muted-foreground text-sm">
                  AI provides conversation starters and real-time assistance
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Trust & Safety</h3>
                <p className="text-muted-foreground text-sm">
                  Continuous monitoring ensures safe and productive interactions
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center bg-gradient-card border-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Successful Matches</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">2.3x</div>
              <div className="text-sm text-muted-foreground">Faster Connections</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">99.8%</div>
              <div className="text-sm text-muted-foreground">Fraud Prevention</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-card border-accent/20">
              <div className="text-3xl font-bold text-brass mb-2">4.8/5</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Enable AI-Powered Mentoring
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Transform your event networking with intelligent mentor matching
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/chats">Try AI Chat</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIMentor;
