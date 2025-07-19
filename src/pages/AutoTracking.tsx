
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Nfc, Smartphone, Wifi, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { logEngagementEvent } from "@/integrations/supabase/logEngagementEvent";
import { useState, useEffect } from "react";
// Use 'any' for QrReader due to type issues with react-qr-reader and React 18
import { QrReader } from 'react-qr-reader';

const MOCK_PARTICIPANT_ID = "00000000-0000-0000-0000-000000000000";
const MOCK_SESSION_ID = "11111111-1111-1111-1111-111111111111";
const MOCK_EVENT_ID = "22222222-2222-2222-2222-222222222222";

const AutoTracking = () => {
  const trackingMethods = [
    {
      icon: QrCode,
      title: "QR Code Tracking",
      description: "Participants scan QR codes at sessions, booths, and activities",
      features: ["Instant check-ins", "Session attendance", "Resource downloads", "No app required"],
      accuracy: "95%"
    },
    {
      icon: Nfc,
      title: "NFC Technology",
      description: "Near-field communication for seamless booth and activity tracking",
      features: ["Contactless interaction", "Booth visit tracking", "Instant data sync", "Hardware provided"],
      accuracy: "98%"
    },
    {
      icon: Smartphone,
      title: "Mobile App Tracking",
      description: "Comprehensive engagement tracking through our mobile application",
      features: ["Background tracking", "Push notifications", "Social features", "Offline capability"],
      accuracy: "92%"
    },
    {
      icon: Wifi,
      title: "WiFi Analytics",
      description: "Anonymous tracking through WiFi connection patterns",
      features: ["Location tracking", "Dwell time analysis", "Movement patterns", "Privacy compliant"],
      accuracy: "85%"
    }
  ];

  const [eventLog, setEventLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrScanResult, setQrScanResult] = useState<string | null>(null);
  const [qrScanError, setQrScanError] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);

  // NFC tracking state
  const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);
  const [nfcScanResult, setNfcScanResult] = useState<string | null>(null);
  const [nfcScanError, setNfcScanError] = useState<string | null>(null);
  const [nfcLoading, setNfcLoading] = useState(false);

  // Event selection state
  const [selectedEventId, setSelectedEventId] = useState<string>(MOCK_EVENT_ID);

  // NFC feature detection
  useState(() => {
    setNfcSupported('NDEFReader' in window);
  });

  // Log page visit on mount
  useEffect(() => {
    const logPageVisit = async () => {
      const event = {
        activity_type: "page_visit",
        participant_id: MOCK_PARTICIPANT_ID,
        session_id: MOCK_SESSION_ID,
        event_id: selectedEventId,
        metadata: { url: window.location.href },
        points: 1,
      };
      const { error } = await logEngagementEvent(event);
      if (!error) {
        setEventLog((prev) => [
          { ...event, created_at: new Date().toISOString() },
          ...prev.slice(0, 4),
        ]);
      }
    };
    logPageVisit();
    // eslint-disable-next-line
  }, []);

  async function handleSimulate(type: string) {
    setLoading(true);
    setError(null);
    const event = {
      activity_type: type,
      participant_id: MOCK_PARTICIPANT_ID,
      session_id: MOCK_SESSION_ID,
      event_id: selectedEventId,
      metadata: { simulated: true, source: "demo" },
      points: 10,
    };
    const { error } = await logEngagementEvent(event);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setEventLog((prev) => [
        { ...event, created_at: new Date().toISOString() },
        ...prev.slice(0, 4),
      ]);
    }
  }

  async function handleQrScan(data: string | null) {
    if (data && data !== qrScanResult) {
      setQrScanResult(data);
      setQrLoading(true);
      setQrScanError(null);
      const event = {
        activity_type: 'qr_scan',
        participant_id: MOCK_PARTICIPANT_ID,
        session_id: MOCK_SESSION_ID,
        event_id: selectedEventId,
        metadata: { scanned: data },
        points: 10,
      };
      const { error } = await logEngagementEvent(event);
      setQrLoading(false);
      if (error) {
        setQrScanError(error.message);
      } else {
        setEventLog((prev) => [
          { ...event, created_at: new Date().toISOString() },
          ...prev.slice(0, 4),
        ]);
      }
    }
  }

  function handleQrError(err: any) {
    setQrScanError(err?.message || String(err));
  }

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
        // Log to Supabase
        const eventObj = {
          activity_type: 'nfc_scan',
          participant_id: MOCK_PARTICIPANT_ID,
          session_id: MOCK_SESSION_ID,
          event_id: selectedEventId,
          metadata: { scanned: nfcData },
          points: 10,
        };
        const { error } = await logEngagementEvent(eventObj);
        if (error) {
          setNfcScanError(error.message);
        } else {
          setEventLog((prev) => [
            { ...eventObj, created_at: new Date().toISOString() },
            ...prev.slice(0, 4),
          ]);
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

  // Simulate resource download
  async function handleResourceDownload() {
    const event = {
      activity_type: "resource_download",
      participant_id: MOCK_PARTICIPANT_ID,
      session_id: MOCK_SESSION_ID,
      event_id: selectedEventId,
      metadata: { resource: "demo.pdf" },
      points: 5,
    };
    const { error } = await logEngagementEvent(event);
    if (!error) {
      setEventLog((prev) => [
        { ...event, created_at: new Date().toISOString() },
        ...prev.slice(0, 4),
      ]);
    }
  }

  // Simulate generic click
  async function handleGenericClick() {
    const event = {
      activity_type: "browser_click",
      participant_id: MOCK_PARTICIPANT_ID,
      session_id: MOCK_SESSION_ID,
      event_id: selectedEventId,
      metadata: { element: "Demo Button" },
      points: 2,
    };
    const { error } = await logEngagementEvent(event);
    if (!error) {
      setEventLog((prev) => [
        { ...event, created_at: new Date().toISOString() },
        ...prev.slice(0, 4),
      ]);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold font-poppins mb-4">
              <span className="bg-gradient-brass bg-clip-text text-transparent">Auto-Tracking</span> Technology
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamlessly capture participant engagement without manual intervention. 
              Our multi-modal tracking system ensures comprehensive data collection.
            </p>
          </div>

          {/* Tracking Methods Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {trackingMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6 bg-gradient-card border-accent/20 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brass/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brass" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{method.title}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {method.accuracy} Accuracy
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  
                  <div className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-brass" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* How It Works Section */}
          <Card className="p-8 bg-gradient-card border-accent/20 mb-16">
            <h2 className="text-2xl font-semibold mb-6">How Auto-Tracking Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brass">1</span>
                </div>
                <h3 className="font-semibold mb-2">Setup</h3>
                <p className="text-muted-foreground text-sm">
                  We configure tracking points throughout your event venue automatically
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brass">2</span>
                </div>
                <h3 className="font-semibold mb-2">Capture</h3>
                <p className="text-muted-foreground text-sm">
                  Participants engage naturally while our system captures all interactions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brass">3</span>
                </div>
                <h3 className="font-semibold mb-2">Analyze</h3>
                <p className="text-muted-foreground text-sm">
                  Real-time analytics and insights appear instantly on your dashboard
                </p>
              </div>
            </div>
          </Card>

          {/* Demo Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass inline-block">
              <h3 className="text-2xl font-semibold mb-4">
                See Auto-Tracking in Action
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Watch how our technology captures engagement seamlessly at live events
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="brass" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/get-started">Try It Free</Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* --- QR Code Scanner --- */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass my-12">
            <h3 className="text-2xl font-semibold mb-4">QR Code Tracking</h3>
            <div className="mb-4">
              {QrReader ? (
                <div style={{ width: '100%' }}>
                  <QrReader
                    scanDelay={300}
                    constraints={{ facingMode: 'environment' }}
                    onResult={(result, error) => {
                      if (result?.getText()) handleQrScan(result.getText());
                      if (error) handleQrError(error);
                    }}
                  />
                </div>
              ) : (
                <div>QR scanner not available.</div>
              )}
            </div>
            {qrLoading && <div className="text-brass mb-2">Logging scan...</div>}
            {qrScanResult && <div className="text-green-600 mb-2">Scanned: {qrScanResult}</div>}
            {qrScanError && <div className="text-red-500 mb-2">Error: {qrScanError}</div>}
            <div className="text-muted-foreground text-xs">Point your camera at a QR code to log an engagement event.</div>
          </Card>

          {/* --- NFC Tracking --- */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass my-12">
            <h3 className="text-2xl font-semibold mb-4">NFC Tracking</h3>
            {nfcSupported === false && (
              <div className="text-red-500 mb-2">Web NFC is not supported on this device/browser. Try Chrome for Android.</div>
            )}
            {nfcSupported && (
              <Button onClick={handleNfcScan} disabled={nfcLoading} variant="outline" className="mb-4">
                {nfcLoading ? 'Waiting for NFC tag...' : 'Start NFC Scan'}
              </Button>
            )}
            {nfcScanResult && <div className="text-green-600 mb-2">NFC Tag: {nfcScanResult}</div>}
            {nfcScanError && <div className="text-red-500 mb-2">Error: {nfcScanError}</div>}
            <div className="text-muted-foreground text-xs">Tap your phone on an NFC tag to log an engagement event.</div>
          </Card>

          {/* --- Browser/Resource Tracking --- */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass my-12">
            <h3 className="text-2xl font-semibold mb-4">Browser/Resource Tracking</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button onClick={handleResourceDownload} variant="secondary">
                Simulate Resource Download
              </Button>
              <Button onClick={handleGenericClick} variant="outline">
                Simulate Click Event
              </Button>
            </div>
            <div className="text-muted-foreground text-xs">Page visits are logged automatically. Use the buttons to simulate resource downloads and clicks.</div>
          </Card>

          {/* --- DEMO: Simulate Engagement Events --- */}
          <Card className="p-8 bg-gradient-card border-brass/20 shadow-brass my-12">
            <h3 className="text-2xl font-semibold mb-4">Simulate Engagement Events</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button onClick={() => handleSimulate("qr_scan")} disabled={loading} variant="brass">
                Simulate QR Scan
              </Button>
              <Button onClick={() => handleSimulate("nfc_tap")} disabled={loading} variant="outline">
                Simulate NFC Tap
              </Button>
              <Button onClick={() => handleSimulate("browser_event")} disabled={loading} variant="secondary">
                Simulate Browser Event
              </Button>
            </div>
            {error && <div className="text-red-500 mb-2">Error: {error}</div>}
            <div>
              <h4 className="font-semibold mb-2">Recent Simulated Events</h4>
              <ul className="space-y-1 text-sm">
                {eventLog.length === 0 && <li className="text-muted-foreground">No events yet.</li>}
                {eventLog.map((e, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <span className="font-mono text-xs">{e.created_at?.slice(11,19)}</span>
                    <span className="font-semibold">{e.activity_type}</span>
                    <span className="text-muted-foreground">({e.points} pts)</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AutoTracking;
