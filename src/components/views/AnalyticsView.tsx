import React, { useState } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Sprout
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const AnalyticsView: React.FC = () => {
  const { zones, farmSummary } = useFarm();
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d'>('24h');

  const z2Moisture = zones['zone-2'].soilMoisture;

  // Realistic sample points based on timeFilter
  const analyticsData = {
    '24h': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
      z1Moisture: [65, 65, 64, 63, 64, 64, 64],
      z2Moisture: [48, 47, 45, 43, 43, 42, z2Moisture],
      temperature: [21, 20, 24, 30, 32, 28, 28],
      waterUsed: [0, 0, 8, 14, 22, 28, farmSummary.waterUsageLiters],
      cropHealth: [91, 91, 92, 92, 91, 92, 92],
    },
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      z1Moisture: [68, 67, 65, 64, 66, 65, 64],
      z2Moisture: [58, 55, 52, 48, 45, 43, z2Moisture],
      temperature: [26, 27, 28, 29, 28, 29, 28],
      waterUsed: [38, 42, 35, 30, 28, 34, farmSummary.waterUsageLiters],
      cropHealth: [94, 93, 93, 91, 90, 89, 92],
    },
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      z1Moisture: [70, 68, 66, 64],
      z2Moisture: [62, 58, 50, z2Moisture],
      temperature: [25, 26, 28, 28],
      waterUsed: [210, 195, 180, 165],
      cropHealth: [95, 94, 92, 92],
    },
  }[timeFilter];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Agronomic Intelligence
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              DEMO DATA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Farm Analytics
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Historical trends in soil water potential, microclimate swings, and water efficiency.
          </p>
        </div>

        {/* Time Filters: 24 Hours, 7 Days, 30 Days (Section 22) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-stone-200 rounded-2xl shadow-2xs">
          <button
            onClick={() => setTimeFilter('24h')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              timeFilter === '24h'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setTimeFilter('7d')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              timeFilter === '7d'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeFilter('30d')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              timeFilter === '30d'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Soil Moisture Comparison (Z1 vs Z2) */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-600" />
              <h3 className="font-extrabold text-stone-900 text-base">
                Soil Moisture Trend (%)
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Zone 1
              </span>
              <span className="flex items-center gap-1.5 font-bold text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Zone 2
              </span>
            </div>
          </div>

          {/* SVG Line / Bar Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 px-2 border-b border-stone-100">
            {analyticsData.labels.map((lbl, idx) => {
              const valZ1 = analyticsData.z1Moisture[idx];
              const valZ2 = analyticsData.z2Moisture[idx];
              return (
                <div key={`m-${idx}`} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* Zone 1 Bar */}
                    <div
                      style={{ height: `${(valZ1 / 100) * 100}%` }}
                      className="w-3 sm:w-4 rounded-t-md bg-emerald-500 transition-all hover:bg-emerald-600"
                      title={`Zone 1: ${valZ1}%`}
                    />
                    {/* Zone 2 Bar */}
                    <div
                      style={{ height: `${(valZ2 / 100) * 100}%` }}
                      className={`w-3 sm:w-4 rounded-t-md transition-all hover:opacity-90 ${
                        valZ2 < 50 ? 'bg-amber-500' : 'bg-emerald-400'
                      }`}
                      title={`Zone 2: ${valZ2}%`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 truncate max-w-[42px]">
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-stone-400 text-center">
            Ideal Root Range: 60% — 75% • Below 45% triggers AI Irrigation recommendation.
          </p>
        </div>

        {/* Chart 2: Ambient Temperature & Heat Exposure */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <h3 className="font-extrabold text-stone-900 text-base">
                Temperature Swings (°C)
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-500">
              Peak: 32°C • Low: 20°C
            </span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 px-2 border-b border-stone-100">
            {analyticsData.labels.map((lbl, idx) => {
              const temp = analyticsData.temperature[idx];
              const pct = ((temp - 15) / 25) * 100;
              return (
                <div key={`t-${idx}`} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center h-44">
                    <div
                      style={{ height: `${Math.max(15, pct)}%` }}
                      className={`w-4 sm:w-6 rounded-t-md transition-all ${
                        temp >= 30 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-amber-400 hover:bg-amber-500'
                      }`}
                      title={`${temp}°C`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 truncate max-w-[42px]">
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-stone-400 text-center">
            Heat Stress Warning Threshold: &gt;31°C
          </p>
        </div>

        {/* Chart 3: Water Consumption & Closed-Loop Savings */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <h3 className="font-extrabold text-stone-900 text-base">
                Water Usage (Liters)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              ~38% Conserved vs Flood
            </span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 px-2 border-b border-stone-100">
            {analyticsData.labels.map((lbl, idx) => {
              const water = analyticsData.waterUsed[idx];
              const maxW = Math.max(...analyticsData.waterUsed, 50);
              const pct = (water / maxW) * 100;
              return (
                <div key={`w-${idx}`} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center h-44">
                    <div
                      style={{ height: `${Math.max(8, pct)}%` }}
                      className="w-4 sm:w-6 rounded-t-md bg-blue-500 hover:bg-blue-600 transition-all"
                      title={`${water} Liters`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 truncate max-w-[42px]">
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-stone-400 text-center">
            Precise pulse drip dispensing replaces broad flooding.
          </p>
        </div>

        {/* Chart 4: Crop Health & Canopy Vigor Index */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-stone-900 text-base">
                Crop Health Index (%)
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-500">
              Mean: 92%
            </span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 px-2 border-b border-stone-100">
            {analyticsData.labels.map((lbl, idx) => {
              const h = analyticsData.cropHealth[idx];
              return (
                <div key={`h-${idx}`} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center h-44">
                    <div
                      style={{ height: `${(h / 100) * 100}%` }}
                      className="w-4 sm:w-6 rounded-t-md bg-emerald-600 hover:bg-emerald-700 transition-all"
                      title={`Health: ${h}%`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 truncate max-w-[42px]">
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-stone-400 text-center">
            Derived from chlorophyll reflectance via Edge AI vision inspection.
          </p>
        </div>
      </div>
    </div>
  );
};
