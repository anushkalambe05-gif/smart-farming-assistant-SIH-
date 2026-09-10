import React from 'react';
import { 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Camera, 
  Scan, 
  MessageSquare, 
  Power, 
  Sparkles
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const ZonesView: React.FC = () => {
  const { 
    zones, 
    setCurrentView, 
    startIrrigation, 
    stopIrrigation, 
    runAiAnalysis, 
    setChatOpen, 
    sendFarmerMessage,
    runCameraScan
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];
  const isZ2Low = zone2.soilMoisture < 50;

  const handleAskAssistant = (zoneName: string) => {
    setChatOpen(true);
    sendFarmerMessage(`Tell me about ${zoneName} condition.`);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Field Telemetry
            </span>
            <span className="text-xs text-stone-500">1 Acre • 2 Monitoring Zones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Zone Monitoring & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Real-time in-situ sensor telemetry and Edge AI agronomic assessments by zone.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('my-farm')}
            className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-700 shadow-2xs transition-colors cursor-pointer"
          >
            🗺️ View Field Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= ZONE 1 (SECTION 9) ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 font-black text-lg flex items-center justify-center">
                Z1
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-stone-900">Zone 1 — 0.5 Acre</h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {zone1.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  <strong>Crop:</strong> Wheat PBW-550 • North Sector
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Optimal</span>
            </span>
          </div>

          {/* Sensor Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Soil Moisture</span>
              <span className="text-xl font-black text-emerald-700 block mt-1">{zone1.soilMoisture}%</span>
              <span className="text-[10px] text-stone-500">Target: 60-70%</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Soil Temp</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone1.soilTemperature}°C</span>
              <span className="text-[10px] text-stone-500">15cm Probe</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Air Temp</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone1.temperature}°C</span>
              <span className="text-[10px] text-stone-500">Ambient</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Humidity</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone1.humidity}%</span>
              <span className="text-[10px] text-stone-500">Relative</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Light</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone1.light}%</span>
              <span className="text-[10px] text-stone-500">Solar Lux</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Water Level</span>
              <span className="text-xl font-black text-stone-900 block mt-1">64%</span>
              <span className="text-[10px] text-stone-500">Storage Tank</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Crop Health</span>
              <span className="text-xl font-black text-emerald-700 block mt-1">{zone1.cropHealth}%</span>
              <span className="text-[10px] text-stone-500">Canopy Vigor</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Disease Risk</span>
              <span className="text-sm font-black text-emerald-700 block mt-1.5">Low</span>
              <span className="text-[10px] text-stone-500">No Blight</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Pest Risk</span>
              <span className="text-sm font-black text-amber-800 block mt-1.5">Medium</span>
              <span className="text-[10px] text-amber-700">Activity rising</span>
            </div>
          </div>

          {/* What should I do? (Section 9) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>What should I do?</span>
            </h4>
            <p className="text-xs sm:text-sm font-bold text-stone-700 leading-relaxed">
              “Continue monitoring. Pest activity is slightly increasing.”
            </p>
          </div>

          {/* Action Buttons: View Camera, Run AI Scan, Ask Farm Assistant */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => {
                setCurrentView('cameras');
                runCameraScan('cam-1');
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-purple-600" />
              <span>View Camera</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('ai-insights');
                runAiAnalysis();
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Scan className="w-3.5 h-3.5 text-emerald-700" />
              <span>Run AI Scan</span>
            </button>

            <button
              onClick={() => handleAskAssistant('Zone 1')}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ask Assistant</span>
            </button>
          </div>
        </div>

        {/* ================= ZONE 2 (SECTION 10) ================= */}
        <div className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-sm space-y-6 ${
          isZ2Low ? 'border-amber-300 ring-2 ring-amber-100' : 'border-stone-200'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl font-black text-lg flex items-center justify-center ${
                isZ2Low ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
              }`}>
                Z2
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-stone-900">Zone 2 — 0.5 Acre</h2>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isZ2Low ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    {zone2.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  <strong>Crop:</strong> Wheat PBW-550 • South Sector
                </p>
              </div>
            </div>

            <span className={`text-xs font-bold flex items-center gap-1 ${
              isZ2Low ? 'text-amber-700' : 'text-emerald-700'
            }`}>
              {isZ2Low ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{isZ2Low ? 'Attention' : 'Optimal'}</span>
            </span>
          </div>

          {/* Prominent Warning (Section 10) */}
          {isZ2Low && (
            <div className="p-3.5 rounded-2xl bg-amber-500 text-white font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-md shadow-amber-500/20 animate-pulse">
              <AlertTriangle className="w-5 h-5 shrink-0 text-white" />
              <span>Water stress detected — Root zone moisture below 45% threshold!</span>
            </div>
          )}

          {/* Sensor Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className={`p-3 rounded-2xl border ${
              isZ2Low ? 'bg-amber-50 border-amber-300' : 'bg-stone-50 border-stone-200'
            }`}>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Soil Moisture</span>
              <span className={`text-xl font-black block mt-1 ${
                isZ2Low ? 'text-amber-700' : 'text-emerald-700'
              }`}>
                {zone2.soilMoisture}%
              </span>
              <span className="text-[10px] text-stone-500">{isZ2Low ? 'Below 45% trigger' : 'Restored'}</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Soil Temp</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone2.soilTemperature}°C</span>
              <span className="text-[10px] text-stone-500">15cm Probe</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Air Temp</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone2.temperature}°C</span>
              <span className="text-[10px] text-stone-500">Ambient</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Humidity</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone2.humidity}%</span>
              <span className="text-[10px] text-stone-500">Relative</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Light</span>
              <span className="text-xl font-black text-stone-900 block mt-1">{zone2.light}%</span>
              <span className="text-[10px] text-stone-500">Solar Lux</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Water Level</span>
              <span className="text-xl font-black text-stone-900 block mt-1">64%</span>
              <span className="text-[10px] text-stone-500">Storage Tank</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Crop Health</span>
              <span className={`text-xl font-black block mt-1 ${
                isZ2Low ? 'text-amber-700' : 'text-emerald-700'
              }`}>
                {zone2.cropHealth}%
              </span>
              <span className="text-[10px] text-stone-500">{isZ2Low ? 'Vigor Stressed' : 'Recovered'}</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Disease Risk</span>
              <span className="text-sm font-black text-emerald-700 block mt-1.5">Low</span>
              <span className="text-[10px] text-stone-500">Negative</span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Water Stress</span>
              <span className={`text-sm font-black block mt-1.5 ${
                isZ2Low ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {isZ2Low ? 'High' : 'Low'}
              </span>
              <span className="text-[10px] text-stone-500">{isZ2Low ? 'Needs Drip' : 'Optimal'}</span>
            </div>
          </div>

          {/* AI Recommendation (Section 10) */}
          <div className={`p-4 rounded-2xl border ${
            isZ2Low ? 'bg-amber-50/80 border-amber-200' : 'bg-emerald-50/80 border-emerald-200'
          } space-y-1.5`}>
            <h4 className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
              isZ2Low ? 'text-amber-900' : 'text-emerald-900'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Recommendation</span>
            </h4>
            <p className="text-xs sm:text-sm font-bold text-stone-800 leading-relaxed">
              {isZ2Low
                ? '“Irrigation is recommended for Zone 2.”'
                : '“Soil moisture is at optimal 60%. Zone 2 water stress has been successfully resolved.”'
              }
            </p>
          </div>

          {/* Action Buttons: Start Irrigation, View Camera, Ask Farm Assistant */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {zone2.pumpStatus === 'ON' ? (
              <button
                onClick={stopIrrigation}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Stop Drip</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  startIrrigation('zone-2', 300);
                  setCurrentView('irrigation');
                }}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md ${
                  isZ2Low
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Start Irrigation</span>
              </button>
            )}

            <button
              onClick={() => {
                setCurrentView('cameras');
                runCameraScan('cam-2');
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-purple-600" />
              <span>View Camera</span>
            </button>

            <button
              onClick={() => handleAskAssistant('Zone 2')}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ask Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
