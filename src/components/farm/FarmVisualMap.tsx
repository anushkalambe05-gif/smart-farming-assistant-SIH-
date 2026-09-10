import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { 
  Camera, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import type { ZoneId } from '../../types/farm';

interface FarmVisualMapProps {
  interactive?: boolean;
}

export const FarmVisualMap: React.FC<FarmVisualMapProps> = ({
  interactive = true,
}) => {
  const { 
    zones, 
    selectedZoneId, 
    setSelectedZoneId, 
    setActiveTab, 
    openCameraFeed,
    openZoneDetail
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];

  const handleSelectZone = (id: ZoneId) => {
    if (!interactive) return;
    setSelectedZoneId(id);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              Field Schematic View
            </span>
            <span className="text-xs text-stone-500 font-medium">1-Acre Farm • 2 Zones (Wheat)</span>
          </div>
          <h3 className="text-lg font-bold text-stone-900 mt-1">
            Topographic Zone Status & Sensor Network
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 bg-stone-50 p-2 rounded-xl border border-stone-200/70">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Crop Rows</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-700" />
            <span>ESP32 Sensor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Camera className="w-3 h-3 text-stone-700" />
            <span>Edge Camera</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-500"></span>
            <span>Drip Line</span>
          </div>
        </div>
      </div>

      {/* Main Farm Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* ================= ZONE 1 ================= */}
        <div
          onClick={() => handleSelectZone('zone-1')}
          className={`relative rounded-2xl p-5 transition-all duration-300 border-2 overflow-hidden cursor-pointer ${
            selectedZoneId === 'zone-1'
              ? 'border-emerald-600 ring-4 ring-emerald-50 shadow-md bg-emerald-50/20'
              : 'border-emerald-200/80 hover:border-emerald-400 bg-white hover:shadow-sm'
          }`}
        >
          {/* Top Zone Badge */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-base text-stone-900">ZONE 1</span>
              <span className="text-xs text-stone-500">(North Sector • 0.5 Acre)</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              🟢 Healthy
            </span>
          </div>

          {/* Farm Visual Representation Box */}
          <div className="relative h-44 rounded-xl bg-gradient-to-b from-emerald-100/50 via-emerald-50/40 to-stone-100/80 border border-emerald-200/70 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Visual Crop Rows */}
            <div className="space-y-2 py-1">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="flex items-center justify-between gap-1 opacity-70">
                  <span className="text-[9px] font-mono text-emerald-800/60 w-4">R{row}</span>
                  <div className="flex-1 h-2 rounded bg-emerald-300/80 flex items-center justify-around overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Irrigation Pipeline */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-400/60 border-t border-b border-blue-500/40 flex items-center justify-around pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </div>

            {/* Interactive Node Pins */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              {/* Camera Node Pin */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openCameraFeed('zone-1');
                }}
                className="group flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-stone-200 shadow-xs hover:border-emerald-400 hover:bg-white transition-all"
                title="Inspect Zone 1 Camera Feed"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                <Camera className="w-3.5 h-3.5 text-stone-700 group-hover:text-emerald-700" />
                <span className="text-[11px] font-semibold text-stone-700">Cam 01</span>
                <span className="text-[9px] text-emerald-700 font-mono">1080p</span>
              </button>

              {/* LoRa Sensor Node Pin */}
              <div 
                className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-stone-200 shadow-xs"
                title="ESP32 Node 1 • LoRa 868MHz"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="text-[11px] font-semibold text-stone-700">ESP32-N1</span>
                <span className="text-[9px] text-stone-500">-68dBm</span>
              </div>
            </div>
          </div>

          {/* Zone Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 block text-[11px]">Soil Moisture</span>
              <span className="text-base font-bold text-emerald-700">{zone1.soilMoisture}%</span>
              <span className="text-[10px] text-stone-400 block">Optimal (35-55%)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 block text-[11px]">Crop Health</span>
              <span className="text-base font-bold text-emerald-700">{zone1.cropHealth}%</span>
              <span className="text-[10px] text-stone-400 block">None detected</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-stone-500 block text-[11px]">Camera Node</span>
                <span className="text-xs font-bold text-stone-800 uppercase">Online</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-stone-500 block text-[11px]">Sensor Node</span>
                <span className="text-xs font-bold text-stone-800 uppercase">Online</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-400 text-[11px]">Pump: OFF</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openZoneDetail('zone-1');
              }}
              className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Info className="w-3 h-3" /> View Zone 1 Details
            </button>
          </div>
        </div>

        {/* ================= ZONE 2 ================= */}
        <div
          onClick={() => handleSelectZone('zone-2')}
          className={`relative rounded-2xl p-5 transition-all duration-300 border-2 overflow-hidden cursor-pointer ${
            selectedZoneId === 'zone-2'
              ? 'border-amber-500 ring-4 ring-amber-50 shadow-md bg-amber-50/20'
              : 'border-amber-200/80 hover:border-amber-400 bg-white hover:shadow-sm'
          }`}
        >
          {/* Top Zone Badge */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="font-bold text-base text-stone-900">ZONE 2</span>
              <span className="text-xs text-stone-500">(South Sector • 0.5 Acre)</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              🟠 Attention Required
            </span>
          </div>

          {/* Farm Visual Representation Box */}
          <div className="relative h-44 rounded-xl bg-gradient-to-b from-amber-100/40 via-amber-50/30 to-stone-100/80 border border-amber-200/70 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Visual Crop Rows */}
            <div className="space-y-2 py-1">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="flex items-center justify-between gap-1 opacity-70">
                  <span className="text-[9px] font-mono text-amber-900/60 w-4">R{row}</span>
                  <div className="flex-1 h-2 rounded bg-amber-200/70 flex items-center justify-around overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Irrigation Pipeline */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-300 border-t border-b border-stone-400 flex items-center justify-around pointer-events-none">
              {zone2.pumpStatus === 'ON' ? (
                <div className="w-full h-full bg-blue-500 animate-pulse"></div>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
                </>
              )}
            </div>

            {/* Interactive Node Pins */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              {/* Camera Node Pin */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openCameraFeed('zone-2');
                }}
                className="group flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-lg border border-amber-300 shadow-xs hover:border-amber-500 hover:bg-white transition-all"
                title="Inspect Zone 2 Camera Feed (Leaf Blight Detected)"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                <Camera className="w-3.5 h-3.5 text-amber-800" />
                <span className="text-[11px] font-semibold text-stone-800">Cam 02</span>
                <span className="text-[9px] bg-rose-100 text-rose-700 font-bold px-1 rounded">Leaf Blight 94%</span>
              </button>

              {/* LoRa Sensor Node Pin */}
              <div 
                className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-stone-200 shadow-xs"
                title="ESP32 Node 2 • LoRa 868MHz"
              >
                <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span className="text-[11px] font-semibold text-stone-700">ESP32-N2</span>
                <span className="text-[9px] text-stone-500">-72dBm</span>
              </div>
            </div>
          </div>

          {/* Zone Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <span className="text-amber-800 block text-[11px] font-medium">Soil Moisture</span>
              <span className="text-base font-bold text-amber-700">{zone2.soilMoisture}%</span>
              <span className="text-[10px] text-amber-700 block">Below threshold (35%)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <span className="text-amber-800 block text-[11px] font-medium">Crop Health</span>
              <span className="text-base font-bold text-amber-800">{zone2.cropHealth}%</span>
              <span className="text-[10px] text-amber-700 block">Leaf Blight (94%)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-stone-500 block text-[11px]">Camera Node</span>
                <span className="text-xs font-bold text-stone-800 uppercase">Online</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
              <div>
                <span className="text-stone-500 block text-[11px]">Sensor Node</span>
                <span className="text-xs font-bold text-stone-800 uppercase">Online</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-400 text-[11px]">Pump: {zone2.pumpStatus}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openZoneDetail('zone-2');
              }}
              className="text-amber-800 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Info className="w-3 h-3" /> View Zone 2 Details
            </button>
          </div>
        </div>
      </div>

      {/* ================= 🤖 AI INSIGHT BANNER ================= */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                🤖 AI Insight
              </span>
              <span className="text-[11px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-mono font-medium">
                Edge Inference
              </span>
            </div>
            <p className="text-sm font-semibold text-stone-800 mt-1">
              "Low soil moisture detected in Zone 2. Irrigation is recommended."
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              Moisture is at {zone2.soilMoisture}% (threshold: 35%). Early irrigation prevents root water stress in PBW-550 wheat.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('irrigation')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-800 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>View Recommendation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
