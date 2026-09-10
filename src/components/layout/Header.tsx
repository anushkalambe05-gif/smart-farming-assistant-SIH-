import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { 
  Bell, 
  RefreshCw, 
  Menu, 
  Layers
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    unreadAlertsCount, 
    setActiveTab, 
    selectedZoneId, 
    setSelectedZoneId, 
    isSimulatingLive,
    toggleSimulateLive,
    triggerLiveTick,
    setShowArchitectureModal,
    addToast
  } = useFarm();

  const handleManualRefresh = () => {
    triggerLiveTick();
    addToast('Telemetry Synchronized', 'Simulated sensor packet received from LoRa gateway.', 'info');
  };

  return (
    <header className="bg-white border-b border-stone-200/90 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-20 shadow-2xs">
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button & Farm Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-emerald-800 hover:bg-stone-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm sm:text-base">
                Greenfield Farm
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                1 Acre • Wheat
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Sensors: ESP32 + LoRa • Edge: Raspberry Pi • YOLOv8
            </p>
          </div>

          <div className="sm:hidden font-bold text-stone-800 text-sm flex items-center gap-1.5">
            <span>🌱</span>
            <span>Smart Farming</span>
          </div>
        </div>

        {/* Right Side: Zone Switcher, Live Telemetry Toggle, Alert Bell */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Zone Switcher */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/70 text-xs">
            <button
              onClick={() => setSelectedZoneId('zone-1')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedZoneId === 'zone-1'
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Zone 1</span>
            </button>
            <button
              onClick={() => setSelectedZoneId('zone-2')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                selectedZoneId === 'zone-2'
                  ? 'bg-white text-amber-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Zone 2</span>
            </button>
          </div>

          {/* Simulated Live Data Badge & Ticker */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
            <button
              onClick={toggleSimulateLive}
              className="flex items-center gap-1.5 hover:text-emerald-700"
              title={isSimulatingLive ? 'Click to pause simulated live updates' : 'Click to resume live updates'}
            >
              <span className="relative flex h-2 w-2">
                {isSimulatingLive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulatingLive ? 'bg-emerald-500' : 'bg-stone-400'}`}></span>
              </span>
              <span className="font-semibold text-[11px]">
                {isSimulatingLive ? 'Live Edge Stream' : 'Stream Paused'}
              </span>
            </button>
            <button
              onClick={handleManualRefresh}
              className="p-1 rounded text-stone-400 hover:text-emerald-700 hover:bg-stone-200/50 transition-colors ml-1"
              title="Manually trigger sensor sync"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Prototype Scope Info Button */}
          <button
            onClick={() => setShowArchitectureModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
            title="View SIH Prototype vs Future Hardware architecture"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>Architecture</span>
          </button>

          {/* Alerts Bell */}
          <button
            onClick={() => setActiveTab('alerts')}
            className="relative p-2 rounded-xl text-stone-600 hover:text-emerald-800 hover:bg-stone-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
