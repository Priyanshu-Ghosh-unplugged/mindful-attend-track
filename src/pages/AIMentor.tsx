
import Navigation from "@/components/Navigation";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, MessageSquare, Users, Shield, Zap, CheckCircle, UserCircle2 } from 'lucide-react';

const AIMentor = () => {
  // Profile state
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [allMentors, setAllMentors] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [chat, setChat] = useState<{ sender: string; message: string; flagged?: boolean }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [fraudFlag, setFraudFlag] = useState(false);

  // Fetch current user profile (mock: first profile)
  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profiles').select('*').limit(1);
      if (data && data[0]) {
        const p = data[0] as any;
        setProfile(p);
        setSkills(p.skills || []);
        setInterests(p.interests || []);
      }
    }
    fetchProfile();
  }, []);

  // Fetch all mentors (mock: all profiles with skills)
  useEffect(() => {
    async function fetchMentors() {
      const { data } = await supabase.from('profiles').select('*');
      if (data) setAllMentors(data);
    }
    fetchMentors();
  }, []);

  // Simple mentor matching by skill/interest overlap
  useEffect(() => {
    if (!skills.length && !interests.length) return;
    const matches = allMentors
      .filter((m) => m.id !== profile?.id)
      .map((mentor) => {
        const mentorSkills = mentor.skills || [];
        const mentorInterests = mentor.interests || [];
        const skillOverlap = skills.filter((s) => mentorSkills.includes(s));
        const interestOverlap = interests.filter((i) => mentorInterests.includes(i));
        return {
          ...mentor,
          score: skillOverlap.length * 2 + interestOverlap.length,
          skillOverlap,
          interestOverlap,
        };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setMatches(matches);
  }, [skills, interests, allMentors, profile]);

  // Profile editor handlers
  function handleSkillInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      setSkills((prev) => Array.from(new Set([...prev, e.currentTarget.value.trim()])));
      e.currentTarget.value = '';
    }
  }
  function handleInterestInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      setInterests((prev) => Array.from(new Set([...prev, e.currentTarget.value.trim()])));
      e.currentTarget.value = '';
    }
  }
  async function saveProfile() {
    if (!profile) return;
    await supabase.from('profiles').update({ skills, interests } as any).eq('id', profile.id);
    setEditing(false);
  }

  // Chat send handler (Gemini API integration placeholder)
  async function sendChat() {
    if (!chatInput.trim()) return;
    // Simple fraud detection: flag if message contains 'hack', 'scam', or is too fast
    const flagged = /hack|scam|fraud/i.test(chatInput);
    setChat((prev) => [...prev, { sender: 'User', message: chatInput, flagged }]);
    setFraudFlag(flagged);
    setChatInput('');
    // Gemini API call would go here
    setTimeout(() => {
      setChat((prev) => [...prev, { sender: 'AI', message: flagged ? 'Your message was flagged for review.' : 'Thank you for your message! (AI response placeholder)' }]);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Editor */}
          <Card className="p-8 mb-8 bg-gradient-card border-accent/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <UserCircle2 className="w-6 h-6 text-brass" /> Your Profile
            </h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <div className="font-semibold mb-1">Skills</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                  {editing && <Input placeholder="Add skill..." onKeyDown={handleSkillInput} className="w-32" />}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Interests</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {interests.map((i) => <Badge key={i} variant="secondary">{i}</Badge>)}
                  {editing && <Input placeholder="Add interest..." onKeyDown={handleInterestInput} className="w-32" />}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {editing ? (
                <Button variant="brass" size="sm" onClick={saveProfile}>Save</Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit</Button>
              )}
            </div>
          </Card>

          {/* Mentor Matches */}
          <Card className="p-8 mb-8 bg-gradient-card border-accent/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-brass" /> Mentor Matches
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {matches.length === 0 && <div className="text-muted-foreground col-span-3">No matches found. Add more skills/interests!</div>}
              {matches.map((mentor) => (
                <Card key={mentor.id} className="p-4 bg-accent/20 border-brass/20 hover:shadow-elegant transition-all duration-300 flex flex-col items-center">
                  <UserCircle2 className="w-10 h-10 text-brass mb-2" />
                  <div className="font-semibold mb-1">{mentor.full_name || mentor.email}</div>
                  <div className="text-xs text-muted-foreground mb-2">{mentor.email}</div>
                  <div className="mb-2">
                    <span className="font-semibold text-brass">Skills:</span> {mentor.skillOverlap.join(', ')}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-brass">Interests:</span> {mentor.interestOverlap.join(', ')}
                  </div>
                  <Button variant="brass" size="sm" onClick={() => setSelectedMentor(mentor)}>Chat</Button>
                </Card>
              ))}
            </div>
          </Card>

          {/* Chat UI */}
          {selectedMentor && (
            <Card className="p-8 mb-8 bg-gradient-card border-accent/20">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-brass" /> Chat with {selectedMentor.full_name || selectedMentor.email}
              </h2>
              <div className="max-h-96 overflow-y-auto mb-4 space-y-2">
                {chat.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'User'
                        ? 'bg-brass text-primary-foreground'
                        : 'bg-background border'
                    }`}>
                      <div className="text-xs font-medium mb-1 opacity-70">
                        {msg.sender === 'User' ? 'You' : 'AI Mentor'}
                        {msg.flagged && <span className="ml-2 text-red-500">[Flagged]</span>}
                      </div>
                      <div className="text-sm">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              {fraudFlag && <div className="text-red-500 mb-2">Your last message was flagged for review.</div>}
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendChat(); }}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button variant="brass" onClick={sendChat}>Send</Button>
                <Button variant="outline" onClick={() => setSelectedMentor(null)}>End Chat</Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIMentor;
