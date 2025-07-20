
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Users, Shield, Zap, Settings, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
  avatar: string;
  timestamp: number;
  isBot?: boolean;
  isCurrentUser?: boolean;
}

const Chats = () => {
  const [message, setMessage] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [currentUser] = useState("You");

  const channels = [
    { id: "general", name: "General Discussion", members: 127, unread: 3 },
    { id: "workshops", name: "Workshop Q&A", members: 89, unread: 0 },
    { id: "networking", name: "Networking Lounge", members: 156, unread: 7 },
    { id: "sponsors", name: "Sponsor Booth Chat", members: 45, unread: 2 }
  ];

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1,
      user: "Sarah Chen", 
      message: "Has anyone tried the new React workshop? Really impressed with the content!", 
      time: "2:34 PM", 
      avatar: "SC",
      timestamp: Date.now() - 300000
    },
    { 
      id: 2,
      user: "Mike Rodriguez", 
      message: "The AI session was mind-blowing! 🤯 Anyone want to discuss implementation ideas?", 
      time: "2:36 PM", 
      avatar: "MR",
      timestamp: Date.now() - 240000
    },
    { 
      id: 3,
      user: "AI Moderator", 
      message: "I can help connect people interested in AI implementation. Would you like me to create a group?", 
      time: "2:37 PM", 
      avatar: "AI", 
      isBot: true,
      timestamp: Date.now() - 180000
    },
    { 
      id: 4,
      user: "Lisa Wang", 
      message: "Count me in! I'm working on similar projects", 
      time: "2:38 PM", 
      avatar: "LW",
      timestamp: Date.now() - 120000
    }
  ]);

  const onlineUsers = [
    { name: "Sarah Chen", avatar: "SC", status: "online", lastSeen: "now" },
    { name: "Mike Rodriguez", avatar: "MR", status: "online", lastSeen: "now" },
    { name: "Lisa Wang", avatar: "LW", status: "online", lastSeen: "now" },
    { name: "Alex Kim", avatar: "AK", status: "online", lastSeen: "now" },
    { name: "Emma Davis", avatar: "ED", status: "online", lastSeen: "now" },
    { name: "David Wilson", avatar: "DW", status: "online", lastSeen: "now" }
  ];



  // Simulate typing indicators
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        if (!typingUsers.includes(randomUser.name)) {
          setTypingUsers(prev => [...prev, randomUser.name]);
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(user => user !== randomUser.name));
          }, 3000);
        }
      }
    }, 5000);

    return () => clearInterval(typingInterval);
  }, [typingUsers, onlineUsers]);

  // Simulate AI responses
  useEffect(() => {
    const aiResponseInterval = setInterval(() => {
      if (Math.random() > 0.8 && messages.length > 0) {
        const aiResponses = [
          "I can help you with that! Would you like me to create a dedicated channel for this topic?",
          "Great question! I've noticed several participants with similar interests. Should I introduce you?",
          "Based on the discussion, I think you might find the upcoming workshop on this topic helpful.",
          "I can see there's a lot of interest in this area. Let me organize a focused discussion group.",
          "That's an excellent point! I've added this to our event insights for future reference."
        ];
        
        const newMessage = {
          id: Date.now(),
          user: "AI Moderator",
          message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: "AI",
          isBot: true,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    }, 15000);

    return () => clearInterval(aiResponseInterval);
  }, [messages.length]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        user: currentUser,
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "YU",
        isCurrentUser: true,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      setIsTyping(false);
      
      // Simulate other users responding
      setTimeout(() => {
        const responses = [
          "That's a great point!",
          "I agree with you on that.",
          "Thanks for sharing!",
          "Interesting perspective!",
          "I'd love to discuss this further.",
          "This is exactly what I was thinking!",
          "Great insight! 👍",
          "I'm learning so much from this discussion!"
        ];
        
        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
          id: Date.now() + 1,
          user: randomUser.name,
          message: response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: randomUser.avatar,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000 + Math.random() * 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatFeatures = [
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Instant messaging with participants, speakers, and organizers throughout the event"
    },
    {
      icon: Users,
      title: "Channel Organization",
      description: "Organized chat channels for different topics, sessions, and networking opportunities"
    },
    {
      icon: Shield,
      title: "Moderation Tools",
      description: "AI-powered content moderation and spam prevention for safe discussions"
    },
    {
      icon: Zap,
      title: "Smart Suggestions",
      description: "AI suggests relevant connections and conversation topics based on interests"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              Live <span className="bg-gradient-brass bg-clip-text text-transparent">Chats</span> & Communication
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time communication platform with AI moderation, smart suggestions, 
              and organized channels for meaningful event interactions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Chat Interface Demo */}
            <Card className="lg:col-span-2 bg-gradient-card border-accent/20 overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-brass" />
                    <h2 className="text-xl font-semibold">#{activeChannel}</h2>
                    <Badge variant="secondary">
                      {channels.find(c => c.id === activeChannel)?.members} members
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 h-96 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.isCurrentUser ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      msg.isBot ? 'bg-brass text-primary-foreground' : 
                      msg.isCurrentUser ? 'bg-blue-500 text-white' : 
                      'bg-accent text-accent-foreground'
                    }`}>
                      {msg.avatar}
                    </div>
                    <div className={`flex-1 ${msg.isCurrentUser ? 'text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {msg.isBot && <Badge variant="secondary" className="text-xs">AI</Badge>}
                      </div>
                      <div className={`text-sm p-3 rounded-lg ${
                        msg.isCurrentUser ? 'bg-brass text-primary-foreground ml-8' : 
                        msg.isBot ? 'bg-brass/10 border border-brass/20' :
                        'bg-accent'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicators */}
                {typingUsers.length > 0 && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold">
                      {typingUsers[0].split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{typingUsers[0]}</span>
                        <span className="text-xs text-muted-foreground">typing...</span>
                      </div>
                      <div className="text-sm p-3 rounded-lg bg-accent">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-border/50">
                <div className="flex gap-3">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (!isTyping) {
                        setIsTyping(true);
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button 
                    variant="brass" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {isTyping && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    You are typing...
                  </div>
                )}
              </div>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Channels */}
              <Card className="p-6 bg-gradient-card border-accent/20">
                <h3 className="font-semibold mb-4">Chat Channels</h3>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeChannel === channel.id ? 'bg-brass/20 text-brass' : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">#{channel.name}</span>
                        {channel.unread > 0 && (
                          <Badge variant="secondary" className="bg-brass text-primary-foreground">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {channel.members} members
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Online Users */}
              <Card className="p-6 bg-gradient-card border-accent/20">
                <h3 className="font-semibold mb-4">Online Now ({onlineUsers.length})</h3>
                <div className="space-y-3">
                  {onlineUsers.map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {typingUsers.includes(user.name) ? 'typing...' : user.lastSeen}
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-16">
            {chatFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 bg-gradient-card border-accent/20 text-center hover:shadow-elegant transition-all duration-300">
                  <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brass" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                Enable Live Communication
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Connect participants with real-time chat and AI-powered networking
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg" asChild>
                  <Link to="/ai-mentor">Try AI Features</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Setup Chat</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chats;
