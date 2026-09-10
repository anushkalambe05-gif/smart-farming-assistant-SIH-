import React, { useState } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/Toast';
import { CameraFeedModal } from './components/farm/CameraFeedModal';
import { ZoneDetailModal } from './components/farm/ZoneDetailModal';
import { PrototypeNoticeModal } from './components/common/PrototypeNoticeModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { FarmMonitoringPage } from './pages/FarmMonitoringPage';
import { EdgeAiPage } from './pages/EdgeAiPage';
import { IrrigationPage } from './pages/IrrigationPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AlertsPage } from './pages/AlertsPage';
import { AiAdvisoryPage } from './pages/AiAdvisoryPage';
import { AskAiPage } from './pages/AskAiPage';

import { Layers } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    selectedCameraZone, 
    closeCameraFeed, 
    selectedZoneDetail, 
    closeZoneDetail,
    setShowArchitectureModal 
  } = useFarm();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'monitoring':
        return <FarmMonitoringPage />;
      case 'edge-ai':
        return <EdgeAiPage />;
      case 'irrigation':
        return <IrrigationPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'advisory':
        return <AiAdvisoryPage />;
      case 'ask-ai':
        return <AskAiPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] text-stone-900 flex flex-col antialiased">
      {/* ================= MANDATORY SIH PROTOTYPE NOTICE BANNER ================= */}
      <div className="bg-stone-900 text-white px-4 py-2 text-xs border-b border-stone-800 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-semibold text-amber-300">
              Prototype Simulation – Hardware Integration Planned
            </span>
            <span className="hidden md:inline text-stone-400">
              • Working software simulation with simulated sensor values & edge AI results for SIH Round-1
            </span>
          </div>

          <button
            onClick={() => setShowArchitectureModal(true)}
            className="text-[11px] text-stone-300 hover:text-white underline font-medium flex items-center gap-1"
          >
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>View Prototype vs Future Hardware</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar (8 Navigation Tabs) */}
        <Sidebar />

        {/* Mobile Navigation Drawer */}
        <MobileNav 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-6">
          {/* Header Bar */}
          <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

          {/* Tab Content Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {renderActiveTab()}
          </main>
        </div>
      </div>

      {/* Interactive Modals & Toast Alerts */}
      <ToastContainer />
      <CameraFeedModal 
        zoneId={selectedCameraZone} 
        onClose={closeCameraFeed} 
      />
      <ZoneDetailModal 
        zoneId={selectedZoneDetail} 
        onClose={closeZoneDetail} 
      />
      <PrototypeNoticeModal />
    </div>
  );
};

export function App() {
  return (
    <FarmProvider>
      <MainContent />
    </FarmProvider>
  );
}

export default App;
