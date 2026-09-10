import React from 'react';
import { 
  Camera, 
  Radio, 
  Droplets, 
  Cpu
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const MyFarmView: React.FC = () => {
  const { openZoneDetail, setCurrentView, zones } = useFarm();
  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];
  const isZ2Low = zone2.soilMoisture < 50;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Field Map Interface
            </span>
            <span className="text-xs text-stone-500">1-Acre Parcel</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 mt-1">
            My Farm (Interactive Field View)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Click on Zone 1 or Zone 2 to view comprehensive telemetry and trigger actions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('cameras')}
            className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4 text-slate-800" />
            <span>View Camera Feeds</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Farm Field Canvas */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-sm relative">
        <div className="flex items-center justify-between pb-3 mb-4 text-xs">
          <span className="font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>1-Acre Field Map (208 ft × 208 ft)</span>
          </span>
          <span className="text-stone-400 font-mono text-[11px]">LoRa Wireless Mesh Active</span>
        </div>

        {/* SVG Interactive Farm Map Layout */}
        <div className="relative w-full aspect-[16/10] bg-[#eef7f0] rounded-2xl border border-emerald-200/80 overflow-hidden shadow-inner select-none">
          <svg className="w-full h-full" viewBox="0 0 800 500" fill="none">
            <defs>
              <linearGradient id="z1Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0fdf4" />
                <stop offset="100%" stopColor="#dcfce7" />
              </linearGradient>
              <linearGradient id="z2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fefce8" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
            </defs>

            {/* Farm Outer Perimeter */}
            <rect x="25" y="25" width="750" height="450" rx="16" fill="#fcfdfc" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />

            {/* Zone 1 (North Sector - 0.5 Acre) */}
            <g 
              className="cursor-pointer transition-all hover:opacity-95"
              onClick={() => openZoneDetail('zone-1')}
            >
              <rect x="40" y="40" width="345" height="420" rx="12" fill="url(#z1Bg)" stroke="#86efac" strokeWidth="2.5" />
              
              {/* Crop Rows Z1 */}
              {[90, 130, 170, 210, 250, 290, 330, 370, 410].map((y) => (
                <line key={`crop-z1-${y}`} x1="55" y1={y} x2="370" y2={y} stroke="#15803d" strokeWidth="2" strokeDasharray="8 6" opacity="0.45" />
              ))}

              {/* Drip Irrigation Lateral Pipe */}
              <line x1="60" y1="80" x2="365" y2="80" stroke="#0284c7" strokeWidth="2" />
              <circle cx="100" cy="80" r="3" fill="#0284c7" />
              <circle cx="210" cy="80" r="3" fill="#0284c7" />
              <circle cx="320" cy="80" r="3" fill="#0284c7" />

              {/* Zone 1 Header Badge */}
              <rect x="55" y="55" width="160" height="28" rx="8" fill="#ffffff" stroke="#bbf7d0" strokeWidth="1.5" />
              <text x="68" y="74" fill="#166534" fontSize="12" fontWeight="bold">ZONE 1 (Healthy)</text>
              <text x="55" y="105" fill="#15803d" fontSize="10" fontWeight="bold">Wheat PBW-550 • {zone1.soilMoisture}% Moisture</text>
            </g>

            {/* Zone 2 (South Sector - 0.5 Acre) */}
            <g 
              className="cursor-pointer transition-all hover:opacity-95"
              onClick={() => openZoneDetail('zone-2')}
            >
              <rect x="415" y="40" width="345" height="420" rx="12" fill="url(#z2Bg)" stroke="#fde047" strokeWidth="2.5" />
              
              {/* Crop Rows Z2 */}
              {[90, 130, 170, 210, 250, 290, 330, 370, 410].map((y) => (
                <line key={`crop-z2-${y}`} x1="430" y1={y} x2="745" y2={y} stroke="#ca8a04" strokeWidth="2" strokeDasharray="8 6" opacity="0.45" />
              ))}

              {/* Drip Irrigation Lateral Pipe */}
              <line x1="435" y1="80" x2="740" y2="80" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="475" cy="80" r="3" fill="#0284c7" />
              <circle cx="585" cy="80" r="3" fill="#0284c7" />
              <circle cx="695" cy="80" r="3" fill="#0284c7" />

              {/* Zone 2 Header Badge */}
              <rect x="430" y="55" width="185" height="28" rx="8" fill="#ffffff" stroke="#fef08a" strokeWidth="1.5" />
              <text x="442" y="74" fill="#854d0e" fontSize="12" fontWeight="bold">
                {isZ2Low ? 'ZONE 2 (Needs Attention)' : 'ZONE 2 (Healthy)'}
              </text>
              <text x="430" y="105" fill="#a16207" fontSize="10" fontWeight="bold">
                Wheat PBW-550 • {zone2.soilMoisture}% Moisture
              </text>
            </g>

            {/* Middle Field Dividing Ditch / Lateral Line */}
            <line x1="400" y1="30" x2="400" y2="470" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 6" />

            {/* 💧 Water Source / Storage Tank (3,200 L) */}
            <g transform="translate(400, 48)">
              <rect x="-35" y="-18" width="70" height="36" rx="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="-3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">WATER SOURCE</text>
              <text x="0" y="9" fill="#e0f2fe" fontSize="9" fontWeight="black" textAnchor="middle">3,200 L TANK</text>
            </g>

            {/* Wireless LoRa Communication Animated Wave Lines */}
            <line x1="180" y1="260" x2="380" y2="250" stroke="#059669" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />
            <line x1="620" y1="280" x2="420" y2="250" stroke="#d97706" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />

            {/* Central Raspberry Pi / Edge AI Unit */}
            <g transform="translate(400, 250)">
              <circle cx="0" cy="0" r="45" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" className="animate-spin" style={{ animationDuration: '24s' }} />
              <rect x="-24" y="-24" width="48" height="48" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="0" y="5" fill="#10b981" fontSize="9" fontWeight="black" textAnchor="middle">EDGE AI</text>
            </g>

            {/* 📷 Camera 1 (Zone 1) */}
            <g transform="translate(100, 160)" className="cursor-pointer" onClick={() => setCurrentView('cameras')}>
              <rect x="-16" y="-16" width="32" height="32" rx="8" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="5" fill="#38bdf8" />
              <text x="0" y="28" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">📷 Camera 1</text>
            </g>

            {/* 📷 Camera 2 (Zone 2) */}
            <g transform="translate(680, 160)" className="cursor-pointer" onClick={() => setCurrentView('cameras')}>
              <rect x="-16" y="-16" width="32" height="32" rx="8" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              <text x="0" y="28" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">📷 Camera 2</text>
            </g>

            {/* 📡 Sensor Node 1 (Zone 1) */}
            <g transform="translate(180, 260)">
              <circle cx="0" cy="0" r="14" fill="#10b981" opacity="0.2" className="animate-ping" />
              <rect x="-16" y="-16" width="32" height="32" rx="8" fill="#047857" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NODE 1</text>
              <text x="0" y="26" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">📡 Node 1</text>
            </g>

            {/* 📡 Sensor Node 2 (Zone 2) */}
            <g transform="translate(620, 280)">
              <circle cx="0" cy="0" r="14" fill="#f59e0b" opacity="0.2" className="animate-ping" />
              <rect x="-16" y="-16" width="32" height="32" rx="8" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">NODE 2</text>
              <text x="0" y="26" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">📡 Node 2</text>
            </g>

            {/* 💧 Irrigation Points */}
            <g transform="translate(240, 80)">
              <circle cx="0" cy="0" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="20" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">💧 Valve 1</text>
            </g>
            <g transform="translate(560, 80)">
              <circle cx="0" cy="0" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="20" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">💧 Valve 2</text>
            </g>
          </svg>

          {/* Interactive Helper Banner */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200 shadow-md flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700">
              💡 Tip: Click on <strong>Zone 1</strong> or <strong>Zone 2</strong> to inspect real-time moisture, temperature, and AI recommendations.
            </span>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => openZoneDetail('zone-1')}
                className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]"
              >
                Inspect Zone 1
              </button>
              <button
                onClick={() => openZoneDetail('zone-2')}
                className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[11px]"
              >
                Inspect Zone 2
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mt-2 text-xs">
          <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Camera className="w-4 h-4 text-slate-900" />
            <span className="font-bold text-stone-700">Camera 1 & 2</span>
          </div>
          <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-stone-700">Sensor Node 1 & 2</span>
          </div>
          <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-600" />
            <span className="font-bold text-stone-700">Irrigation Valves</span>
          </div>
          <div className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-stone-700">Raspberry Pi Edge AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
