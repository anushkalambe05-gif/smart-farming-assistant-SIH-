import React from 'react';
import { 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const EnvironmentView: React.FC = () => {
  const { weather, zones, setCurrentView, startIrrigation } = useFarm();

  const isZ2Low = zones['zone-2'].soilMoisture < 50;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Microclimate Station
            </span>
            <span className="text-xs text-stone-500">Field In-Situ Atmospheric Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Environment Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Ambient microclimate, barometric trends, and crop exposure risk factors.
          </p>
        </div>

        <span className="text-xs font-bold text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-xl shadow-2xs">
          Weather Station: Solar Powered BME280 Probe
        </span>
      </div>

      {/* Environmental Advisory Banner (Section 20) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-amber-950 text-sm uppercase tracking-wider">
              Environmental Advisory
            </h4>
            <p className="text-xs sm:text-sm font-bold text-amber-900 mt-0.5">
              “Temperature is elevated. Maintain adequate soil moisture and monitor Zone 2.”
            </p>
          </div>
        </div>

        {isZ2Low && (
          <button
            onClick={() => {
              setCurrentView('irrigation');
              startIrrigation('zone-2', 300);
            }}
            className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Irrigate Zone 2</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Atmospheric Metrics Grid (Section 20) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Temperature */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-400">Temperature</span>
            <Thermometer className="w-4 h-4 text-orange-500" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">{weather.temp}°C</span>
          <span className="text-[11px] text-stone-500">28°C Field Average</span>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-400">Humidity</span>
            <Cloud className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">{weather.humidity}%</span>
          <span className="text-[11px] text-stone-500">Relative Humidity</span>
        </div>

        {/* Rain Probability */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-400">Rain Chance</span>
            <CloudRain className="w-4 h-4 text-sky-500" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">{weather.rainProbability}%</span>
          <span className="text-[11px] text-emerald-700 font-bold">Clear Skies</span>
        </div>

        {/* Rainfall */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-400">Rainfall</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">0 mm</span>
          <span className="text-[11px] text-stone-500">Last 24 Hours</span>
        </div>

        {/* Wind */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-400">Wind</span>
            <Wind className="w-4 h-4 text-teal-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">{weather.windSpeed}</span>
          <span className="text-[11px] text-stone-500">Gentle Breeze</span>
        </div>

        {/* Water Level */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-stone-400">Water Storage</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">64%</span>
          <span className="text-[11px] text-stone-500">3,200 L Tank Level</span>
        </div>
      </div>

      {/* Environmental Risk Cards (Section 20) */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider text-stone-500 mb-3">
          Environmental Stress Risk Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Drought Risk */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Drought Risk</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-emerald-700">Low</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] text-stone-500">Adequate water tank reserves.</p>
          </div>

          {/* Flood Risk */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Flood Risk</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-emerald-700">Low</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] text-stone-500">No heavy rainfall detected.</p>
          </div>

          {/* Heat Stress */}
          <div className="bg-white rounded-3xl p-4 border border-amber-200 bg-amber-50/20 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">Heat Stress</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-amber-800">Medium</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-[10px] text-stone-500">32°C afternoon sun peak.</p>
          </div>

          {/* Disease Weather Risk */}
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Disease Weather Risk</span>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-emerald-700">Low</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] text-stone-500">Dry leaf surface condition.</p>
          </div>

          {/* Water Stress */}
          <div className={`rounded-3xl p-4 border shadow-2xs space-y-1 ${
            isZ2Low ? 'bg-rose-50 border-rose-300' : 'bg-white border-stone-200'
          }`}>
            <span className={`text-[10px] uppercase font-bold block ${isZ2Low ? 'text-rose-800' : 'text-stone-400'}`}>
              Water Stress
            </span>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-black ${isZ2Low ? 'text-rose-700' : 'text-emerald-700'}`}>
                {isZ2Low ? 'High — Zone 2' : 'Optimal'}
              </span>
              {isZ2Low ? <AlertTriangle className="w-4 h-4 text-rose-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-[10px] text-stone-500">
              {isZ2Low ? 'Soil moisture at 43%.' : 'All zones hydrated.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
