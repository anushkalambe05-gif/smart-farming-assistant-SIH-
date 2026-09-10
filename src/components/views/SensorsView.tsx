import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Cloud, 
  Gauge, 
  CloudRain, 
  CheckCircle2, 
  Clock, 
  TrendingUp
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const SensorsView: React.FC = () => {
  const { sensorsList } = useFarm();

  const getSensorIcon = (name: string) => {
    if (name.includes('Moisture')) return <Droplets className="w-5 h-5 text-sky-600" />;
    if (name.includes('Soil Temperature')) return <Thermometer className="w-5 h-5 text-amber-600" />;
    if (name.includes('Air Temperature')) return <Sun className="w-5 h-5 text-orange-500" />;
    if (name.includes('Humidity')) return <Cloud className="w-5 h-5 text-blue-500" />;
    if (name.includes('Light')) return <Sun className="w-5 h-5 text-amber-500" />;
    if (name.includes('Water Level')) return <Gauge className="w-5 h-5 text-indigo-600" />;
    if (name.includes('Rain')) return <CloudRain className="w-5 h-5 text-sky-700" />;
    return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>LIVE SENSOR DATA</span>
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              Demo Data
            </span>
            <span className="text-xs text-stone-500">LoRa 868MHz Mesh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Sensor Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Real-time subsurface, canopy microclimate, and reservoir status transmitted by ESP32 field nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Last updated: <strong>Just now</strong></span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
        </div>
      </div>

      {/* 8 Sensor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensorsList.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-white rounded-3xl p-5 border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                  {getSensorIcon(sensor.name)}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Active
                </span>
              </div>

              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Field Metric
              </span>
              <h3 className="font-bold text-stone-900 text-base mt-0.5">
                {sensor.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-stone-900">{sensor.value}</span>
                <span className="text-xs font-bold text-stone-500">{sensor.unit}</span>
              </div>

              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                {sensor.description}
              </p>
            </div>

            {/* Sparkline Trend History Chart */}
            <div className="pt-3 mt-3 border-t border-stone-100">
              <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1 font-mono">
                <span>Recent History</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  Stable
                </span>
              </div>

              {/* SVG Sparkline Curve */}
              <div className="h-9 w-full bg-stone-50 rounded-lg p-1 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d={`M 0 ${30 - (sensor.history[0] % 30)} 
                        L 20 ${30 - (sensor.history[1] % 30)} 
                        L 40 ${30 - (sensor.history[2] % 30)} 
                        L 60 ${30 - (sensor.history[3] % 30)} 
                        L 80 ${30 - (sensor.history[4] % 30)} 
                        L 100 ${30 - (sensor.history[5] % 30)}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5">
                <span>Node 01/02</span>
                <span className="text-emerald-700 font-medium">Last updated: Just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
