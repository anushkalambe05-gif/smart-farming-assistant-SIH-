import React from 'react';
import { 
  Droplets, 
  Bug, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  Camera, 
  CloudSun
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const ProblemsView: React.FC = () => {
  const { 
    zones, 
    setCurrentView, 
    startIrrigation, 
    runCameraScan 
  } = useFarm();

  const z2Moisture = zones['zone-2'].soilMoisture;
  const isZ2Low = z2Moisture < 50;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
              Automated Anomaly Detection
            </span>
            <span className="text-xs text-stone-500">Continuous Edge AI Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Problems Detected
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Real-time crop stressors identified by multispectral cameras and in-situ soil nodes.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('solutions')}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>View AI Solutions Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Water Stress — Zone 2 */}
        <div className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col justify-between space-y-5 transition-all ${
          isZ2Low ? 'border-rose-300 ring-2 ring-rose-100' : 'border-emerald-200 bg-emerald-50/20'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${isZ2Low ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                <Droplets className="w-6 h-6" />
              </div>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                isZ2Low ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {isZ2Low ? 'High Severity' : 'Resolved'}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-stone-900">
                Water Stress — Zone 2
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Capacitive soil telemetry alert
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Soil Moisture:</span>
                <span className={`font-black text-sm ${isZ2Low ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {z2Moisture}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Moisture Deficit:</span>
                <span className="font-bold text-stone-700">{isZ2Low ? '-17% vs Target' : 'Optimal'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">AI Recommendation</span>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
                {isZ2Low 
                  ? '“Irrigate Zone 2 to restore root zone moisture and prevent permanent wilting.”'
                  : '“Soil moisture is restored to optimal 60%. Drip cycle completed.”'
                }
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('irrigation');
              if (isZ2Low) startIrrigation('zone-2', 300);
            }}
            className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isZ2Low
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {isZ2Low ? (
              <>
                <Droplets className="w-4 h-4" />
                <span>Take Action (Start Drip)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Review Irrigation Log</span>
              </>
            )}
          </button>
        </div>

        {/* Card 2: Pest Activity — Zone 1 */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                <Bug className="w-6 h-6" />
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                Moderate Risk
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-stone-900">
                Pest Activity — Zone 1
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Canopy camera visual inference
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Status:</span>
                <span className="font-black text-amber-800">Increasing</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Pest Indicator:</span>
                <span className="font-bold text-stone-700">Aphid cluster probability (12%)</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">AI Recommendation</span>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
                “Inspect Camera 1 and monitor affected plants for early biological intervention.”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('cameras');
              runCameraScan('cam-1');
            }}
            className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>View Camera 1</span>
          </button>
        </div>

        {/* Card 3: Heat Stress */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-700">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 uppercase tracking-wider">
                Environmental
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-stone-900">
                Heat Stress
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Weather & ambient air probe
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Temperature:</span>
                <span className="font-black text-stone-900">32°C Peak</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-semibold">Transpiration Index:</span>
                <span className="font-bold text-amber-700">Elevated</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">AI Recommendation</span>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
                “Monitor crop stress and maintain adequate soil moisture to minimize solar transpiration loss.”
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('environment')}
            className="w-full py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CloudSun className="w-4 h-4" />
            <span>View Advisory & Weather</span>
          </button>
        </div>
      </div>
    </div>
  );
};
