import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Smartphone, 
  Zap, 
  Settings, 
  Users,
  ExternalLink,
  Download,
  Play
} from "lucide-react";

const Docs = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      docs: [
        { title: "Quick Setup Guide", time: "5 min", type: "guide" },
        { title: "First Event Tutorial", time: "15 min", type: "tutorial" },
        { title: "Understanding Engagement Scores", time: "8 min", type: "concept" }
      ]
    },
    {
      title: "API & Integration",
      icon: Code,
      docs: [
        { title: "REST API Reference", time: "API", type: "reference" },
        { title: "Webhook Configuration", time: "10 min", type: "guide" },
        { title: "Custom Tracking Implementation", time: "20 min", type: "tutorial" }
      ]
    },
    {
      title: "Mobile & Hardware",
      icon: Smartphone,
      docs: [
        { title: "RFID/NFC Setup", time: "12 min", type: "guide" },
        { title: "QR Code Generation", time: "5 min", type: "tutorial" },
        { title: "Mobile App Integration", time: "18 min", type: "tutorial" }
      ]
    },
    {
      title: "Advanced Features",
      icon: Zap,
      docs: [
        { title: "AI Mentor Configuration", time: "15 min", type: "guide" },
        { title: "VR Metrics Tracking", time: "25 min", type: "tutorial" },
        { title: "Fraud Detection Settings", time: "10 min", type: "guide" }
      ]
    }
  ];

  const quickLinks = [
    { title: "Download SDK", icon: Download, badge: "v2.1.0" },
    { title: "API Playground", icon: Play, badge: "Interactive" },
    { title: "Video Tutorials", icon: ExternalLink, badge: "New" },
    { title: "Support Portal", icon: Users, badge: "24/7" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Developer{" "}
              <span className="bg-gradient-brass bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to integrate and customize MindfulTrack for your events. 
              From basic setup to advanced AI features.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card 
                  key={link.title}
                  className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300 cursor-pointer group"
                  onClick={() => alert(`Opening ${link.title}...`)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-brass/20 transition-colors">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <h3 className="font-semibold font-poppins mb-2 text-sm">{link.title}</h3>
                    <Badge variant="secondary" className="text-xs">{link.badge}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Documentation Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.title} className="p-6 bg-gradient-card border-accent/20">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-brass/10 rounded-lg flex items-center justify-center mr-3">
                      <Icon className="w-5 h-5 text-brass" />
                    </div>
                    <h3 className="text-xl font-semibold font-poppins">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.docs.map((doc) => (
                      <div 
                        key={doc.title}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer group"
                        onClick={() => alert(`Opening: ${doc.title}`)}
                      >
                        <div>
                          <h4 className="font-medium group-hover:text-brass transition-colors">{doc.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                doc.type === 'tutorial' ? 'border-blue-500 text-blue-500' :
                                doc.type === 'guide' ? 'border-green-500 text-green-500' :
                                doc.type === 'reference' ? 'border-purple-500 text-purple-500' :
                                'border-brass text-brass'
                              }`}
                            >
                              {doc.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{doc.time}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-brass transition-colors" />
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Code Example */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h3 className="text-2xl font-bold font-poppins mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-brass" />
              Quick Start Example
            </h3>
            <div className="bg-background/80 rounded-lg p-6 mb-6 font-mono text-sm overflow-x-auto">
              <div className="text-green-400">// Initialize MindfulTrack</div>
              <div className="text-blue-400">import</div> <span className="text-white">MindfulTrack</span> <div className="text-blue-400">from</div> <span className="text-orange-400">'@mindfultrack/sdk'</span><br/>
              <br/>
              <div className="text-blue-400">const</div> <span className="text-white">tracker</span> = <div className="text-blue-400">new</div> <span className="text-white">MindfulTrack</span>(<span className="text-orange-400">'your-api-key'</span>)<br/>
              <br/>
              <div className="text-green-400">// Track user engagement</div><br/>
              <span className="text-white">tracker</span>.<span className="text-yellow-400">trackAttendance</span>(<span className="text-orange-400">'session-id'</span>, <span className="text-orange-400">'user-id'</span>)<br/>
              <span className="text-white">tracker</span>.<span className="text-yellow-400">trackParticipation</span>(<span className="text-orange-400">'poll-response'</span>, <span className="text-purple-400">{'{ answer: "A" }'}</span>)<br/>
              <span className="text-white">tracker</span>.<span className="text-yellow-400">trackResourceDownload</span>(<span className="text-orange-400">'resource-id'</span>)
            </div>
            <div className="flex gap-4">
              <Button variant="brass" onClick={() => alert('Copying to clipboard...')}>
                Copy Code
              </Button>
              <Button variant="outline" onClick={() => alert('Opening full tutorial...')}>
                View Full Tutorial
              </Button>
            </div>
          </Card>

          {/* Support */}
          <Card className="p-8 bg-gradient-card border-accent/20 text-center">
            <Settings className="w-12 h-12 text-brass mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-poppins mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our documentation is constantly updated. If you can't find what you're looking for, 
              our support team is ready to help you implement MindfulTrack successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="brass" onClick={() => alert('Opening support chat...')}>
                Contact Support
              </Button>
              <Button variant="outline" onClick={() => alert('Opening community forum...')}>
                Community Forum
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Docs;