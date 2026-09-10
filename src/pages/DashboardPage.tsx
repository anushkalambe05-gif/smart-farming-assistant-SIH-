import React from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  Sun, 
  CloudRain, 
  Cpu, 
  WifiOff, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Radio,
  Camera,
  Layers
} from 'lucide-react';
import { FarmVisualMap } from '../components/farm/FarmVisualMap';

export const DashboardPage: React.FC = () => {
  const { 
    zones, 
    farmSummary, 
    setActiveTab, 
    openZoneDetail, 
    setShowArchitectureModal,
    askQuickQuestion 
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];

  const handleAskAiShortcut = () => {
    setActiveTab('ask-ai');
    askQuickQuestion('What should I do for Zone 2?');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ================= TOP FARM OVERVIEW STATS ================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Farm Overview
              </span>
              <span className="text-xs text-stone-500 font-medium">SIH Round-1 Working Prototype</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Greenfield 1-Acre Smart Farm
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Edge AI Autonomous Crop Health & Precision Irrigation System
            </p>
          </div>

          {/* Quick status chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
              <Cpu className="w-4 h-4 text-emerald-700" />
              <span>Edge AI: <strong className="text-emerald-700 font-bold uppercase">ONLINE</strong></span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 flex items-center gap-2 text-xs text-stone-700 font-medium">
              <WifiOff className="w-4 h-4 text-stone-600" />
              <span>Internet: <strong className="text-stone-800">OPTIONAL / NOT REQUIRED FOR CORE AI</strong></span>
            </div>
          </div>
        </div>

        {/* 4 Primary Farm Badges (Farm Size, Zones, Crop, Overall Health) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
            <span className="text-stone-500 text-xs block font-medium">Farm Size</span>
            <div className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">{farmSummary.area}</div>
            <span className="text-[11px] text-stone-400">Divided into 2 equal zones</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
            <span className="text-stone-500 text-xs block font-medium">Zones</span>
            <div className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">{farmSummary.zonesCount} Zones</div>
            <span className="text-[11px] text-stone-400">North & South Sectors</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
            <span className="text-stone-500 text-xs block font-medium">Active Crop</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-800 mt-0.5">{farmSummary.crop}</div>
            <span className="text-[11px] text-stone-400">Cultivar: PBW-550 (Late Stage)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-emerald-800 text-xs block font-medium">Overall Crop Health</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5">{farmSummary.overallCropHealth}%</div>
            <span className="text-[11px] text-emerald-700 font-medium">Z1: 94% • Z2: 81%</span>
          </div>
        </div>
      </div>

      {/* ================= SECTION 17: AI SUGGESTION CARD ================= */}
      <div className="bg-gradient-to-br from-amber-50 via-amber-50/60 to-orange-50/40 rounded-2xl p-5 sm:p-6 border-2 border-amber-300 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-200">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                  AI Suggestion
                </span>
                <span className="text-xs text-amber-800 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  ⚠️ Zone 2 needs attention
                </span>
              </div>

              {/* Exact user prompt requirement metrics */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700 pt-0.5 font-medium">
                <span className="inline-flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-amber-700" />
                  Soil moisture: <strong className="text-stone-900">{zone2.soilMoisture}%</strong>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-600" />
                  Leaf Blight: <strong className="text-stone-900">94% confidence</strong>
                </span>
              </div>

              <div className="text-xs sm:text-sm text-stone-800 font-medium pt-1">
                <span className="text-stone-500">Recommended action: </span>
                <strong className="text-emerald-950 bg-white/80 px-2 py-0.5 rounded border border-amber-200/60">
                  “Start irrigation and inspect affected leaves.”
                </strong>
              </div>
            </div>
          </div>

          {/* Action Buttons: View AI Advisory & Ask AI */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
            <button
              onClick={() => setActiveTab('advisory')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs sm:text-sm border border-stone-200 shadow-2xs hover:border-amber-400 transition-all flex items-center justify-center gap-2"
            >
              <span>View AI Advisory</span>
              <ArrowRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
              onClick={handleAskAiShortcut}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= SENSOR CARDS (Zone 1 vs Zone 2) ================= */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
            <span>Live Environmental Telemetry</span>
            <span className="text-[11px] font-normal text-stone-500 capitalize">(LoRa ESP32 Nodes)</span>
          </h3>
          <span className="text-xs text-stone-500 font-mono">Synced: Just now</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Soil Moisture */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-emerald-600" />
                Soil Moisture
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-mono">Dual Node</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 1:</span>
                <span className="font-bold text-emerald-700">{zone1.soilMoisture}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 2:</span>
                <span className={`font-bold ${zone2.soilMoisture < 35 ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {zone2.soilMoisture}%
                </span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-amber-700 font-medium">
              Zone 2 below 35% threshold
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-600" />
                Temperature
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-mono">DHT22</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 1:</span>
                <span className="font-bold text-stone-800">{zone1.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 2:</span>
                <span className="font-bold text-stone-800">{zone2.temperature}°C</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
              Optimal growth range
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-600" />
                Humidity
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-mono">Relative</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 1:</span>
                <span className="font-bold text-stone-800">{zone1.humidity}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 2:</span>
                <span className="font-bold text-stone-800">{zone2.humidity}%</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
              Canopy transpiration stable
            </div>
          </div>

          {/* Light */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                Light
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-mono">BH1750</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 1:</span>
                <span className="font-bold text-stone-800">{zone1.light}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">Zone 2:</span>
                <span className="font-bold text-stone-800">{zone2.light}%</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
              High solar irradiance
            </div>
          </div>

          {/* Rain */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-indigo-500" />
                Rainfall
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-mono">Tipping</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="text-sm font-bold text-stone-800">
                No Rain Detected
              </div>
              <span className="text-[11px] text-stone-400 block">Next 48h dry</span>
            </div>
            <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
              Irrigation needed for Z2
            </div>
          </div>
        </div>
      </div>

      {/* ================= FARM OVERVIEW VISUALIZATION ================= */}
      <FarmVisualMap />

      {/* ================= SECTION 7: CLICKABLE ZONE CARDS ================= */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
            Detailed Zone Intelligence Cards (Click to Inspect)
          </h3>
          <span className="text-xs text-stone-500">Click any card for full hardware & agronomic details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ZONE 1 CARD */}
          <div
            onClick={() => openZoneDetail('zone-1')}
            className="bg-white rounded-2xl p-5 border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                  Z1
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                    ZONE 1 (North Sector)
                  </h4>
                  <span className="text-xs text-stone-500">0.5 Acre • Wheat (PBW-550)</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Healthy
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 text-xs">
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Soil Moisture</span>
                <span className="font-bold text-emerald-700 text-sm">{zone1.soilMoisture}%</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Temperature</span>
                <span className="font-bold text-stone-800 text-sm">{zone1.temperature}°C</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Humidity</span>
                <span className="font-bold text-stone-800 text-sm">{zone1.humidity}%</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Light</span>
                <span className="font-bold text-stone-800 text-sm">{zone1.light}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3 text-stone-600">
                <span>Crop Health: <strong className="text-emerald-700">{zone1.cropHealth}%</strong></span>
                <span>Disease: <strong className="text-stone-700">{zone1.disease}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <Camera className="w-3 h-3" /> Camera: Online
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <Radio className="w-3 h-3" /> Node: Online
                </span>
                <span>•</span>
                <span>Pump: <strong>{zone1.pumpStatus}</strong></span>
              </div>
            </div>
          </div>

          {/* ZONE 2 CARD */}
          <div
            onClick={() => openZoneDetail('zone-2')}
            className="bg-white rounded-2xl p-5 border-2 border-amber-300 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center">
                  Z2
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base group-hover:text-amber-800 transition-colors">
                    ZONE 2 (South Sector)
                  </h4>
                  <span className="text-xs text-stone-500">0.5 Acre • Wheat (PBW-550)</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Attention Required
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 text-xs">
              <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/60">
                <span className="text-amber-800 text-[11px] block font-medium">Soil Moisture</span>
                <span className="font-bold text-amber-700 text-sm">{zone2.soilMoisture}%</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Temperature</span>
                <span className="font-bold text-stone-800 text-sm">{zone2.temperature}°C</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Humidity</span>
                <span className="font-bold text-stone-800 text-sm">{zone2.humidity}%</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50">
                <span className="text-stone-500 text-[11px] block">Light</span>
                <span className="font-bold text-stone-800 text-sm">{zone2.light}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3 text-stone-600">
                <span>Crop Health: <strong className="text-amber-800">{zone2.cropHealth}%</strong></span>
                <span>Disease: <strong className="text-rose-700 font-bold">{zone2.disease} (94%)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <Camera className="w-3 h-3" /> Camera: Online
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <Radio className="w-3 h-3" /> Node: Online
                </span>
                <span>•</span>
                <span className={zone2.pumpStatus === 'ON' ? 'text-blue-600 font-bold' : ''}>
                  Pump: <strong>{zone2.pumpStatus}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 18 & 19: OFFLINE-FIRST & ARCHITECTURE FOOTER CARD ================= */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 border border-stone-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base">
                Core AI Works Offline on Raspberry Pi
              </h4>
              <p className="text-xs text-stone-400">
                Camera analysis, sensor processing, disease detection, local decision making, and recommendations run locally.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowArchitectureModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 self-start lg:self-auto"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Prototype vs Future System Architecture</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
            <span className="text-emerald-400 font-bold block mb-1">Local Edge Pipeline</span>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              ESP32 transmits sensor packets via LoRa 868MHz to a central Raspberry Pi. YOLOv8 INT8 quantization provides 14ms inference.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
            <span className="text-emerald-400 font-bold block mb-1">Optional Internet</span>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Cloud connection is optional; used solely for remote notifications, backups, and off-farm mobile dashboard synchronization.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
            <span className="text-emerald-400 font-bold block mb-1">Autonomous Relay Pump</span>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Decision engine triggers solenoid valves based on root moisture thresholds without relying on cloud server round-trips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
