import React from 'react';
import { 
  Bell, 
  WifiOff, 
  Menu, 
  User, 
  Sprout, 
  Droplets
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

interface AppHeaderProps {
  onOpenMobileMenu?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenMobileMenu }) => {
  const { unreadAlertsCount, setCurrentView, irrigation } = useFarm();

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left: Mobile menu toggle + Farm title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex lg:hidden items-center justify-center font-bold">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-stone-900 text-sm sm:text-base leading-tight">
              Greenfield 1-Acre Smart Farm
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span>Wheat (PBW-550)</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">2 Zones Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Quick statuses, Alert bell & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Irrigation Banner if Running */}
        {irrigation.isRunning && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold animate-pulse">
            <Droplets className="w-3.5 h-3.5 text-blue-600" />
            <span>Pump Running ({Math.floor(irrigation.secondsRemaining / 60)}:{(irrigation.secondsRemaining % 60).toString().padStart(2, '0')})</span>
          </div>
        )}

        {/* Connectivity Chip */}
        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold">
          <WifiOff className="w-3.5 h-3.5 text-stone-500" />
          <span>Offline Mode</span>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => setCurrentView('alerts')}
          className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
          title="View Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Farmer Profile Pill */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-stone-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            <User className="w-4 h-4 text-emerald-100" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-stone-900 block leading-tight">Farmer Ramesh</span>
            <span className="text-[10px] text-emerald-700 font-medium block">Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
};
