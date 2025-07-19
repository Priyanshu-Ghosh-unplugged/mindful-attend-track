
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import StartTracking from "./pages/StartTracking";
import Demo from "./pages/Demo";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";

// Feature Pages
import GetStarted from "./pages/GetStarted";
import AutoTracking from "./pages/AutoTracking";
import DynamicScoring from "./pages/DynamicScoring";
import LiveHeatmaps from "./pages/LiveHeatmaps";
import AIMentor from "./pages/AIMentor";
import Chats from "./pages/Chats";
import SessionIntelligence from "./pages/SessionIntelligence";
import NFCBooth from "./pages/NFCBooth";
import Tracking from "./pages/Tracking";
import VRMetrics from "./pages/VRMetrics";
import RealTimeSync from "./pages/RealTimeSync";
import MultiEvent from "./pages/MultiEvent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/start-tracking" element={<StartTracking />} />
          
          {/* Feature Pages */}
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/auto-tracking" element={<AutoTracking />} />
          <Route path="/dynamic-scoring" element={<DynamicScoring />} />
          <Route path="/live-heatmaps" element={<LiveHeatmaps />} />
          <Route path="/ai-mentor" element={<AIMentor />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/session-intelligence" element={<SessionIntelligence />} />
          <Route path="/nfc-booth" element={<NFCBooth />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/vr-metrics" element={<VRMetrics />} />
          <Route path="/real-time-sync" element={<RealTimeSync />} />
          <Route path="/multi-event" element={<MultiEvent />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
