import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Layers,
  Camera, 
  Activity, 
  Bot, 
  Droplets, 
  AlertTriangle,
  Sparkles,
  CloudSun,
  Bell, 
  TrendingUp,
  Settings, 
  Sprout, 
  WifiOff, 
  LogOut,
  PlusCircle
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import type { AppView } from '../../types/farm';

export const AppSidebar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    unreadAlertsCount, 
    logout, 
    farmSummary, 
    setScaleModalOpen 
  } = useFarm();

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-farm', label: 'Farm Map', icon: Map },
    { id: 'zones', label: 'Zones (Z1 & Z2)', icon: Layers },
    { id: 'cameras', label: 'Crop Vision', icon: Camera },
    { id: 'sensors', label: 'Sensors', icon: Activity },
    { id: 'ai-insights', label: 'AI Insights', icon: Bot },
    { id: 'irrigation', label: 'Smart Irrigation', icon: Droplets },
    { id: 'problems', label: 'Problems Detected', icon: AlertTriangle },
    { id: 'solutions', label: 'AI Solutions', icon: Sparkles },
    { id: 'environment', label: 'Environment', icon: CloudSun },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount },
    { id: 'analytics', label: 'Farm Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 shrink-0 hidden lg:flex flex-col justify-between p-4 h-screen sticky top-0 overflow-y-auto">
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <span className="font-extrabold text-stone-900 text-base tracking-tight block">
              Smart Farming
            </span>
            <span className="text-[11px] font-bold text-emerald-700 block -mt-0.5">
              Assistant • Edge AI
            </span>
          </div>
        </div>

        {/* Edge Connectivity Chip */}
        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
          <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Edge AI Active</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-mono">14ms</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 flex items-center gap-1">
            <WifiOff className="w-3 h-3" />
            <span>Offline Local Gateway</span>
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && item.badge > 0 ? (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Scalability Demo Button & User Profile */}
      <div className="pt-3 border-t border-stone-100 space-y-2 mt-4">
        {/* Scale Farm Trigger (Section 26) */}
        <button
          onClick={() => setScaleModalOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 font-bold text-xs border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Scale Farm (+ Demo)</span>
        </button>

        <div className="flex items-center justify-between px-2 pt-1">
          <div>
            <span className="text-xs font-bold text-stone-900 block">Ramesh Patel</span>
            <span className="text-[10px] text-stone-400">{farmSummary.area} • 2 Zones</span>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Switch User / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
