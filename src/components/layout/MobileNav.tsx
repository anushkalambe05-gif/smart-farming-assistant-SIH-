import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { 
  LayoutDashboard, 
  MapPin, 
  Cpu, 
  Droplets, 
  BarChart3, 
  Bell, 
  Sparkles, 
  MessageSquare,
  X, 
  Layers 
} from 'lucide-react';
import type { TabType } from '../../types/farm';
import { OfflineBadge } from '../common/OfflineBadge';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadAlertsCount, 
    setShowArchitectureModal 
  } = useFarm();

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    onClose();
  };

  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitoring' as TabType, label: 'Farm Monitoring', icon: MapPin },
    { id: 'edge-ai' as TabType, label: 'Edge AI', icon: Cpu, badge: '94%' },
    { id: 'irrigation' as TabType, label: 'Irrigation', icon: Droplets, badge: 'Action' },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { 
      id: 'alerts' as TabType, 
      label: 'Alerts', 
      icon: Bell, 
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined 
    },
    { id: 'advisory' as TabType, label: 'AI Advisory', icon: Sparkles },
    { id: 'ask-ai' as TabType, label: 'Ask AI', icon: MessageSquare, badge: 'New' },
  ];

  return (
    <>
      {/* Mobile Drawer (Slide-out) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={onClose} 
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col justify-between p-5 z-10 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                    🌱
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-stone-900 leading-tight">
                      SMART FARMING ASSISTANT
                    </h2>
                    <p className="text-[10px] text-emerald-700 font-semibold">
                      Edge AI for Smarter Farming
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu items */}
              <nav className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-700 text-white font-semibold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom section */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <button
                onClick={() => {
                  setShowArchitectureModal(true);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-semibold text-xs border border-emerald-200"
              >
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>Prototype vs Future System</span>
              </button>

              <OfflineBadge variant="full" />

              <div className="p-2 rounded-lg bg-stone-50 text-center text-[11px] text-stone-600 border border-stone-200">
                Farm: 1 Acre • Zones: 2 • Crop: Wheat
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Quick Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1 flex items-center justify-around shadow-lg">
        {[
          { id: 'dashboard' as TabType, label: 'Overview', icon: LayoutDashboard },
          { id: 'monitoring' as TabType, label: 'Farm', icon: MapPin },
          { id: 'edge-ai' as TabType, label: 'Edge AI', icon: Cpu },
          { id: 'irrigation' as TabType, label: 'Irrigate', icon: Droplets },
          { id: 'ask-ai' as TabType, label: 'Ask AI', icon: MessageSquare, badge: 'AI' },
          { 
            id: 'alerts' as TabType, 
            label: 'Alerts', 
            icon: Bell, 
            badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined 
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-emerald-700 font-bold' : 'text-stone-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-rose-600"></span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
