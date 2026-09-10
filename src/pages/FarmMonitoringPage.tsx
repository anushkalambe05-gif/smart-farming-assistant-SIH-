import React from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Camera, 
  Radio, 
  Cpu, 
  Sparkles, 
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import { FarmVisualMap } from '../components/farm/FarmVisualMap';

export const FarmMonitoringPage: React.FC = () => {
  const { 
    zones, 
    openCameraFeed, 
    openZoneDetail, 
    triggerLiveTick, 
    addToast 
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];

  const handlePingNodes = () => {
    triggerLiveTick();
    addToast('LoRa Mesh Synchronized', 'ESP32 Nodes pinged: Node 1 (-68dBm), Node 2 (-72dBm). Packets acknowledged.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Field Telemetry & Network
            </span>
            <span className="text-xs text-stone-500 font-medium">1 Acre divided into 2 Zones</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Farm Monitoring Station
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Real-time sensory coverage, camera nodes, LoRa packet links, and irrigation pipelines.
          </p>
        </div>

        <button
          onClick={handlePingNodes}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ping Sensor Nodes</span>
        </button>
      </div>

      {/* ================= SECTION 8: COMMUNICATION ANIMATION PIPELINE ================= */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-sm sm:text-base font-bold text-stone-100">
              Edge Communication Pipeline
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-mono">
            LoRa 868 MHz • Zero Internet Required
          </span>
        </div>

        {/* Simplified Communication Animation Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 text-center">
          {/* Step 1: Camera + Sensors */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 flex flex-col items-center justify-between space-y-2 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">1. Field Acquisition</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                OV2640 HD Camera + Soil Moisture Sensors + DHT22
              </p>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono">
              In-Field Nodes
            </span>
          </div>

          {/* Step 2: ESP32 */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 flex flex-col items-center justify-between space-y-2 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">2. Microcontroller</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                ESP32 Low-Power Node digitizes ADC signals & serial frames
              </p>
            </div>
            <span className="text-[10px] bg-sky-950 text-sky-400 px-2 py-0.5 rounded font-mono">
              Deep-Sleep Duty Cycle
            </span>
          </div>

          {/* Step 3: LoRa */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 flex flex-col items-center justify-between space-y-2 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">3. LoRa Communication</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Long-range sub-GHz transmission (2km+ across farm)
              </p>
            </div>
            <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-mono">
              868MHz Spread Spectrum
            </span>
          </div>

          {/* Step 4: Raspberry Pi */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/80 flex flex-col items-center justify-between space-y-2 relative group hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">4. Raspberry Pi Hub</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Runs local YOLOv8 inference, disease detection & pump logic
              </p>
            </div>
            <span className="text-[10px] bg-rose-950 text-rose-400 px-2 py-0.5 rounded font-mono">
              Central Farm Edge
            </span>
          </div>
        </div>
      </div>

      {/* ================= 1-ACRE TOPOGRAPHIC FIELD MAP ================= */}
      <FarmVisualMap />

      {/* ================= FIELD NODE HARDWARE STATUS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Node 1 Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Zone 1 Node (ESP32-N1)</h4>
                <p className="text-[11px] text-stone-500">North Sector • Antenna Height: 2.2m</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Signal: -68 dBm (Strong)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Moisture Probe</span>
              <span className="font-bold text-emerald-700 text-sm">{zone1.soilMoisture}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Air Temp</span>
              <span className="font-bold text-stone-800 text-sm">{zone1.temperature}°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Humidity</span>
              <span className="font-bold text-stone-800 text-sm">{zone1.humidity}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Battery</span>
              <span className="font-bold text-stone-800 text-sm">{zone1.batteryLevel}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <span className="text-stone-500 text-[11px]">Drip Pipeline: Idle (Optimal moisture)</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openCameraFeed('zone-1')}
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-stone-600" />
                <span>Inspect Feed</span>
              </button>
              <button
                onClick={() => openZoneDetail('zone-1')}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Node 2 Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Zone 2 Node (ESP32-N2)</h4>
                <p className="text-[11px] text-stone-500">South Sector • Antenna Height: 2.2m</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
              Signal: -72 dBm (Good)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-amber-800 text-[10px] block font-medium">Moisture Probe</span>
              <span className="font-bold text-amber-700 text-sm">{zone2.soilMoisture}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Air Temp</span>
              <span className="font-bold text-stone-800 text-sm">{zone2.temperature}°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Humidity</span>
              <span className="font-bold text-stone-800 text-sm">{zone2.humidity}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-stone-500 text-[10px] block">Battery</span>
              <span className="font-bold text-stone-800 text-sm">{zone2.batteryLevel}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <span className="text-amber-800 text-[11px] font-semibold">
              ⚠️ Leaf Blight detected (94%)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openCameraFeed('zone-2')}
                className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>Inspect Feed</span>
              </button>
              <button
                onClick={() => openZoneDetail('zone-2')}
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold flex items-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
