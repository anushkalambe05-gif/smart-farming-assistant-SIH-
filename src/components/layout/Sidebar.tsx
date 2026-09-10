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
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import type { TabType } from '../../types/farm';
import { OfflineBadge } from '../common/OfflineBadge';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadAlertsCount, 
    setShowArchitectureModal 
  } = useFarm();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Farm Monitoring', icon: MapPin },
    { id: 'edge-ai', label: 'Edge AI', icon: Cpu, badge: '94%', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'irrigation', label: 'Irrigation', icon: Droplets, badge: 'Action', badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { 
      id: 'alerts', 
      label: 'Alerts', 
      icon: Bell, 
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-700 font-bold'
    },
    { id: 'advisory', label: 'AI Advisory', icon: Sparkles },
    { id: 'ask-ai', label: 'Ask AI', icon: MessageSquare, badge: 'New', badgeColor: 'bg-emerald-100 text-emerald-800 font-bold' },
  ];

  return (
    <aside className="hidden lg:flex w-64 xl:w-72 bg-white border-r border-stone-200/90 flex-col justify-between shrink-0 min-h-screen sticky top-0 shadow-xs z-30">
      {/* Top Header / Branding */}
      <div>
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-emerald-200">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <h1 className="font-bold text-base text-stone-900 leading-tight">
                SMART FARMING ASSISTANT
              </h1>
              <p className="text-[11px] font-semibold text-emerald-700 tracking-wide mt-0.5">
                “Edge AI for Smarter Farming”
              </p>
            </div>
          </div>

          <div className="mt-4 px-3 py-2 rounded-lg bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs text-stone-600">
            <span className="text-[11px] font-medium text-stone-500">SIH Round-1 Demo</span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
              1-Acre Farm
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Menu Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20 font-semibold'
                    : 'text-stone-700 hover:text-emerald-800 hover:bg-emerald-50/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-200" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-stone-100 space-y-3">
        {/* Architecture Comparison Button */}
        <button
          onClick={() => setShowArchitectureModal(true)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-200 text-xs text-stone-700 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold text-stone-800 group-hover:text-emerald-800">
              Prototype vs Future System
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
        </button>

        {/* ● Edge AI Online Badge (Section 5 requirement) */}
        <OfflineBadge 
          variant="full" 
          onClick={() => setActiveTab('edge-ai')}
        />

        {/* Required Bottom Info (Section 5): Farm: 1 Acre | Zones: 2 | Crop: Wheat */}
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center text-xs space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edge AI Online</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-stone-600 text-[11px] font-medium pt-0.5 border-t border-stone-200/50">
            <span>Farm: <strong className="text-stone-800">1 Acre</strong></span>
            <span>•</span>
            <span>Zones: <strong className="text-stone-800">2</strong></span>
            <span>•</span>
            <span>Crop: <strong className="text-stone-800">Wheat</strong></span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-stone-400">
            Smart Farming Assistant • SIH Round-1
          </p>
        </div>
      </div>
    </aside>
  );
};
