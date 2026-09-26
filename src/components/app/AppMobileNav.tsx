import { 
  LayoutDashboard, 
  Map, 
  Camera, 
  Droplets, 
  Bell, 
  X, 
  Activity, 
  Bot, 
  Settings, 
  LogOut, 
  Sprout 
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import type { AppView } from '../../types/farm';

interface AppMobileNavProps {
  drawerOpen: boolean;
  onCloseDrawer: () => void;
}

export const AppMobileNav: React.FC<AppMobileNavProps> = ({ drawerOpen, onCloseDrawer }) => {
  const { currentView, setCurrentView, unreadAlertsCount, logout } = useFarm();

  const handleSelectView = (view: AppView) => {
    setCurrentView(view);
    onCloseDrawer();
  };

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-farm', label: 'Farm Map', icon: Map },
    { id: 'zones', label: 'Zones (Z1 & Z2)', icon: LayoutDashboard },
    { id: 'cameras', label: 'Crop Vision', icon: Camera },
    { id: 'sensors', label: 'Sensors', icon: Activity },
    { id: 'ai-insights', label: 'AI Insights', icon: Bot },
    { id: 'irrigation', label: 'Smart Irrigation', icon: Droplets },
    { id: 'problems', label: 'Problems Detected', icon: Activity },
    { id: 'solutions', label: 'AI Solutions', icon: Sprout },
    { id: 'environment', label: 'Environment', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount },
    { id: 'analytics', label: 'Farm Analytics', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Fixed Bottom Quick Navigation Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold ${
            currentView === 'dashboard' ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentView('my-farm')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold ${
            currentView === 'my-farm' ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Farm</span>
        </button>

        <button
          onClick={() => setCurrentView('cameras')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold ${
            currentView === 'cameras' ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Cameras</span>
        </button>

        <button
          onClick={() => setCurrentView('irrigation')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold ${
            currentView === 'irrigation' ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>Irrigation</span>
        </button>

        <button
          onClick={() => setCurrentView('alerts')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold relative ${
            currentView === 'alerts' ? 'text-emerald-700' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Alerts</span>
          {unreadAlertsCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {unreadAlertsCount}
            </span>
          )}
        </button>
      </div>

      {/* Slide-over Mobile Drawer for All Links */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseDrawer}
          />

          <div className="relative w-72 bg-white border-r border-stone-200 p-5 flex flex-col justify-between h-full z-10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-sm block">Smart Farming</span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">Assistant</span>
                  </div>
                </div>

                <button 
                  onClick={onCloseDrawer}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-bold">Edge AI • 1-Acre Farm</span>
                <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded-full font-bold">Offline</span>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive 
                          ? 'bg-emerald-700 text-white shadow-xs' 
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && item.badge > 0 ? (
                        <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <button
                onClick={() => { logout(); onCloseDrawer(); }}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch / Exit Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
