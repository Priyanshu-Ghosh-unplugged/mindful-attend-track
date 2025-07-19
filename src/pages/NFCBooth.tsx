
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Wifi, MapPin, Bell, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

const MOCK_PARTICIPANT_ID = "00000000-0000-0000-0000-000000000000";

const NFCBooth = () => {
  const features = [
    {
      icon: Smartphone,
      title: "NFC Tap Tracking",
      description: "Seamless engagement tracking with simple NFC tap interactions"
    },
    {
      icon: MapPin,
      title: "Proximity Detection",
      description: "Automatically detect when participants approach exhibition booths"
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Instant notifications when high-value prospects visit your booth"
    },
    {
      icon: Users,
      title: "Visitor Analytics",
      description: "Comprehensive analytics on booth visitor patterns and engagement"
    }
  ];

  // NFC scan state
  const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);
  const [nfcScanResult, setNfcScanResult] = useState<string | null>(null);
  const [nfcScanError, setNfcScanError] = useState<string | null>(null);
  const [nfcLoading, setNfcLoading] = useState(false);
  // Analytics state
  const [boothStats, setBoothStats] = useState<any[]>([]);
  const [recentVisits, setRecentVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // NFC feature detection
  useEffect(() => {
    setNfcSupported('NDEFReader' in window);
  }, []);

  // Fetch booth analytics
  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      const { data } = await supabase
        .from('engagement_logs')
        .select('metadata, created_at, participant_id')
        .eq('activity_type', 'nfc_booth_visit')
        .order('created_at', { ascending: false });
      // Aggregate booth stats
      const boothMap: Record<string, { booth: string; count: number }> = {};
      const visits: any[] = [];
      if (data) {
        data.forEach((log: any) => {
          const meta = log.metadata || {};
          const booth = meta.booth_name || meta.booth_id || meta.nfc_data || 'Unknown Booth';
          if (!boothMap[booth]) boothMap[booth] = { booth, count: 0 };
          boothMap[booth].count += 1;
          visits.push({ booth, time: log.created_at, participant: log.participant_id });
        });
      }
      setBoothStats(Object.values(boothMap).sort((a, b) => b.count - a.count));
      setRecentVisits(visits.slice(0, 10));
      setLoading(false);
    }
    fetchAnalytics();
  }, [nfcScanResult]);

  // NFC scan handler
  async function handleNfcScan() {
    setNfcScanError(null);
    setNfcScanResult(null);
    setNfcLoading(true);
    if (!('NDEFReader' in window)) {
      setNfcSupported(false);
      setNfcLoading(false);
      return;
    }
    try {
      // @ts-ignore
      const ndef = new window.NDEFReader();
      await ndef.scan();
      ndef.onreading = async (event: any) => {
        let nfcData = '';
        if (event.message && event.message.records.length > 0) {
          const record = event.message.records[0];
          if (record.recordType === 'text') {
            const textDecoder = new TextDecoder(record.encoding || 'utf-8');
            nfcData = textDecoder.decode(record.data);
          } else {
            nfcData = '[NFC record type: ' + record.recordType + ']';
          }
        } else {
          nfcData = '[Unknown NFC tag]';
        }
        setNfcScanResult(nfcData);
        setNfcLoading(false);
        // Log booth visit to Supabase
        const eventObj = {
          activity_type: 'nfc_booth_visit',
          participant_id: MOCK_PARTICIPANT_ID,
          session_id: null,
          metadata: { booth_name: nfcData, nfc_data: nfcData },
          points: 5,
        };
        const { error } = await supabase.from('engagement_logs').insert([eventObj]);
        if (error) {
          setNfcScanError(error.message);
        }
      };
      ndef.onerror = (err: any) => {
        setNfcScanError(err?.message || String(err));
        setNfcLoading(false);
      };
    } catch (err: any) {
      setNfcScanError(err?.message || String(err));
      setNfcLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-brass rounded-xl flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              NFC Booth <span className="bg-gradient-brass bg-clip-text text-transparent">Tracking</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your exhibition booths with NFC technology for seamless visitor tracking and enhanced engagement analytics.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => {
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

          {/* How It Works */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">NFC Booth Setup Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Deploy NFC Tags</h3>
                <p className="text-sm text-muted-foreground">Place NFC tags at strategic booth locations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Visitor Interaction</h3>
                <p className="text-sm text-muted-foreground">Participants tap their phones on NFC tags</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-brass" />
                </div>
                <h3 className="font-semibold mb-2">Instant Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time data capture and analytics</p>
              </div>
            </div>
          </Card>

          {/* NFC Scan Section */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass mb-16">
            <h2 className="text-2xl font-semibold mb-4">NFC Booth Visit</h2>
            {nfcSupported === false && (
              <div className="text-red-500 mb-2">Web NFC is not supported on this device/browser. Try Chrome for Android.</div>
            )}
            {nfcSupported && (
              <Button onClick={handleNfcScan} disabled={nfcLoading} variant="brass" className="mb-4">
                {nfcLoading ? 'Waiting for NFC tag...' : 'Start NFC Scan'}
              </Button>
            )}
            {nfcScanResult && <div className="text-green-600 mb-2">Booth Scanned: {nfcScanResult}</div>}
            {nfcScanError && <div className="text-red-500 mb-2">Error: {nfcScanError}</div>}
            <div className="text-muted-foreground text-xs">Tap your phone on an NFC tag at a booth to log your visit.</div>
          </Card>

          {/* Booth Analytics */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Booth Visit Analytics</h2>
            {loading ? <div className="text-brass">Loading analytics...</div> : (
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 bg-accent/20 border-brass/20">
                  <h3 className="font-semibold mb-4">Top Booths</h3>
                  {boothStats.length === 0 ? <div className="text-muted-foreground">No booth visits yet.</div> : (
                    <ol className="space-y-2">
                      {boothStats.slice(0, 5).map((b, idx) => (
                        <li key={b.booth} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-brass/20 flex items-center justify-center font-bold text-brass">{idx + 1}</span>
                          <span className="flex-1 font-medium">{b.booth}</span>
                          <span className="text-xs text-muted-foreground">{b.count} visits</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </Card>
                <Card className="p-6 bg-accent/20 border-brass/20">
                  <h3 className="font-semibold mb-4">Recent Visits</h3>
                  {recentVisits.length === 0 ? <div className="text-muted-foreground">No recent visits.</div> : (
                    <ul className="space-y-2">
                      {recentVisits.map((v, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-brass rounded-full"></span>
                          <span className="flex-1">{v.booth}</span>
                          <span className="text-xs text-muted-foreground">{new Date(v.time).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            )}
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button variant="brass" size="lg" asChild>
              <Link to="/get-started">Setup NFC Tracking</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NFCBooth;
