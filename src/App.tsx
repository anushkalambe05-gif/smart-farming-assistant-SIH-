import React, { useState } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { WelcomeScreen } from './components/app/WelcomeScreen';
import { AppSidebar } from './components/app/AppSidebar';
import { AppHeader } from './components/app/AppHeader';
import { AppMobileNav } from './components/app/AppMobileNav';
import { ToastContainer } from './components/common/Toast';
import { MinimalHowItWorks } from './components/common/MinimalHowItWorks';
import { ZoneDetailModal } from './components/views/ZoneDetailModal';
import { FarmAssistantChatbot } from './components/app/FarmAssistantChatbot';
import { ScalabilityModal } from './components/app/ScalabilityModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { MyFarmView } from './components/views/MyFarmView';
import { ZonesView } from './components/views/ZonesView';
import { CamerasView } from './components/views/CamerasView';
import { SensorsView } from './components/views/SensorsView';
import { AiInsightsView } from './components/views/AiInsightsView';
import { IrrigationView } from './components/views/IrrigationView';
import { ProblemsView } from './components/views/ProblemsView';
import { SolutionsView } from './components/views/SolutionsView';
import { EnvironmentView } from './components/views/EnvironmentView';
import { AlertsView } from './components/views/AlertsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';

const MainAppContent: React.FC = () => {
  const { isLoggedIn, currentView } = useFarm();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // If farmer is not logged in, display Welcome Screen (Section 5)
  if (!isLoggedIn) {
    return (
      <>
        <WelcomeScreen />
        <ToastContainer />
      </>
    );
  }

  // Active view renderer for all 13 farm views
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'my-farm':
        return <MyFarmView />;
      case 'zones':
        return <ZonesView />;
      case 'cameras':
        return <CamerasView />;
      case 'sensors':
        return <SensorsView />;
      case 'ai-insights':
        return <AiInsightsView />;
      case 'irrigation':
        return <IrrigationView />;
      case 'problems':
        return <ProblemsView />;
      case 'solutions':
        return <SolutionsView />;
      case 'environment':
        return <EnvironmentView />;
      case 'alerts':
        return <AlertsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] text-stone-900 flex antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Desktop Sidebar Navigation */}
      <AppSidebar />

      {/* Mobile Drawer & Bottom Quick Bar */}
      <AppMobileNav 
        drawerOpen={mobileDrawerOpen} 
        onCloseDrawer={() => setMobileDrawerOpen(false)} 
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <AppHeader onOpenMobileMenu={() => setMobileDrawerOpen(true)} />

        {/* View Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderCurrentView()}

          {/* Minimal Bottom How-It-Works Strip (Section 31) */}
          <MinimalHowItWorks />
        </main>
      </div>

      {/* Modals & Real-time Global Elements */}
      <ZoneDetailModal />
      <ScalabilityModal />
      <FarmAssistantChatbot />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <FarmProvider>
      <MainAppContent />
    </FarmProvider>
  );
}

export default App;
