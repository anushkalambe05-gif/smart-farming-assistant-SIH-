import React from 'react';
import { Cpu, WifiOff } from 'lucide-react';

interface OfflineBadgeProps {
  variant?: 'compact' | 'full' | 'detailed';
  className?: string;
  onClick?: () => void;
}

export const OfflineBadge: React.FC<OfflineBadgeProps> = ({ 
  variant = 'compact', 
  className = '', 
  onClick 
}) => {
  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium cursor-pointer hover:bg-emerald-100 transition-colors ${className}`}
        title="Edge AI Running Locally on Raspberry Pi"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
        <span className="-ml-2 w-2 h-2 rounded-full bg-emerald-600" />
        <span className="font-semibold">Edge AI Online</span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div 
        onClick={onClick}
        className={`p-3 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white shadow-md border border-emerald-700/50 cursor-pointer hover:border-emerald-500 transition-all ${className}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              Raspberry Pi 4B
            </span>
          </div>
          <span className="text-[10px] bg-emerald-800/80 px-1.5 py-0.5 rounded text-emerald-100 font-mono">
            14ms YOLO
          </span>
        </div>
        <div className="text-sm font-bold text-white flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-emerald-400" />
          Edge AI Online
        </div>
        <div className="text-xs text-emerald-300/80 mt-1 flex items-center justify-between">
          <span>Local Processing</span>
          <span className="text-[11px] text-emerald-200 font-medium">100% Offline Ready</span>
        </div>
      </div>
    );
  }

  // Detailed presentation card for Offline-first architecture
  return (
    <div className={`bg-white rounded-2xl p-5 border border-stone-200 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-800">Designed for Poor Connectivity</h4>
            <p className="text-xs text-stone-500">Autonomous Edge Decision Engine</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium border border-emerald-200">
          <WifiOff className="w-3 h-3 text-emerald-600" />
          Zero Cloud Dependency for Core AI
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Core AI
          </div>
          <div className="text-sm font-bold text-emerald-700">Works Offline</div>
          <div className="text-[11px] text-stone-500 mt-0.5">YOLO on RPi 4B</div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Sensor Processing
          </div>
          <div className="text-sm font-bold text-emerald-700">Works Offline</div>
          <div className="text-[11px] text-stone-500 mt-0.5">ESP32 + LoRa Mesh</div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Local Decisions
          </div>
          <div className="text-sm font-bold text-emerald-700">Works Offline</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Auto Irrigation Relay</div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Remote Monitoring
          </div>
          <div className="text-sm font-bold text-amber-700">Requires Internet</div>
          <div className="text-[11px] text-stone-500 mt-0.5">Cloud Sync & Telemetry</div>
        </div>
      </div>
    </div>
  );
};
