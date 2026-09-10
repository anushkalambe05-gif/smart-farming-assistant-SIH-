import React from 'react';
import { 
  Sparkles, 
  Droplets, 
  Scan, 
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const AiInsightsView: React.FC = () => {
  const { 
    runAiAnalysis, 
    isScanningAi, 
    aiScanStep, 
    lastAiScanResult, 
    setCurrentView,
    startIrrigation,
    openZoneDetail,
    zones 
  } = useFarm();

  const isZ2Low = zones['zone-2'].soilMoisture < 50;

  const getScanStepLabel = () => {
    switch (aiScanStep) {
      case 'sensors':
        return 'Collecting sensor data...';
      case 'images':
        return 'Analyzing crop images...';
      case 'environment':
        return 'Checking environmental conditions...';
      case 'recommendation':
        return 'Generating recommendation...';
      default:
        return 'Analyzing farm telemetry...';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header (Section 12) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Edge Intelligence
            </span>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              SIMULATED DEMO AI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Edge AI Analysis
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Local INT8 neural inference combining in-situ sensors and canopy cameras on Raspberry Pi 4.
          </p>
        </div>

        <div className="text-xs font-bold text-stone-500 bg-white border border-stone-200 px-3 py-1.5 rounded-xl shadow-2xs">
          Last Scan: {lastAiScanResult || 'Today, 10:45 AM'}
        </div>
      </div>

      {/* Main Monitoring Banner (Section 12) */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Animated Scanning Overlay */}
        {isScanningAi && (
          <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-20 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-4" />
            <span className="text-lg font-black tracking-wide text-white animate-pulse">
              {getScanStepLabel()}
            </span>
            <div className="w-64 bg-emerald-900/80 h-2 rounded-full mt-3 overflow-hidden border border-emerald-700">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ 
                  width: aiScanStep === 'sensors' ? '25%' : aiScanStep === 'images' ? '50%' : aiScanStep === 'environment' ? '75%' : '95%' 
                }} 
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Edge AI is monitoring your farm
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              Continuous local sensor fusion evaluates leaf turgidity, canopy stress, and microclimates without requiring cloud connectivity.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-emerald-200 font-mono">
              <span>Model: MobileNetV3-AgriEdge INT8</span>
              <span>•</span>
              <span>Latency: 14.8ms</span>
            </div>
          </div>

          <button
            onClick={runAiAnalysis}
            disabled={isScanningAi}
            className="px-6 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Scan className={`w-4 h-4 text-emerald-700 ${isScanningAi ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
            <span>Run Full Farm Scan</span>
          </button>
        </div>
      </div>

      {/* 6 AI Diagnostic Cards (Section 12) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* 1. Crop Health */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Crop Health</span>
          <span className="text-xl font-black text-emerald-700 block">92%</span>
          <span className="text-xs font-bold text-stone-600 block">Healthy Foliage</span>
          <span className="text-[10px] text-stone-400">Canopy Vigor</span>
        </div>

        {/* 2. Disease Risk */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Disease Risk</span>
          <span className="text-xl font-black text-emerald-700 block">Low</span>
          <span className="text-xs font-bold text-stone-600 block">8% Pathogen Prob</span>
          <span className="text-[10px] text-stone-400">No fungal blight</span>
        </div>

        {/* 3. Pest Risk */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Pest Risk</span>
          <span className="text-xl font-black text-amber-700 block">Medium</span>
          <span className="text-xs font-bold text-stone-600 block">18% Indicator</span>
          <span className="text-[10px] text-stone-400">Zone 1 activity</span>
        </div>

        {/* 4. Water Stress */}
        <div className={`rounded-3xl p-4 border shadow-2xs space-y-1 ${
          isZ2Low ? 'bg-amber-50/70 border-amber-300' : 'bg-white border-stone-200'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${isZ2Low ? 'text-amber-800' : 'text-stone-400'}`}>
            Water Stress
          </span>
          <span className={`text-xl font-black block ${isZ2Low ? 'text-amber-800' : 'text-emerald-700'}`}>
            {isZ2Low ? 'High (Z2)' : 'Low'}
          </span>
          <span className="text-xs font-bold text-stone-700 block">
            {isZ2Low ? 'Moisture 43%' : 'Hydrated'}
          </span>
          <span className="text-[10px] text-stone-400">Root zone status</span>
        </div>

        {/* 5. Heat Stress */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Heat Stress</span>
          <span className="text-xl font-black text-stone-900 block">Medium</span>
          <span className="text-xs font-bold text-stone-600 block">32°C Peak</span>
          <span className="text-[10px] text-stone-400">Transpiration normal</span>
        </div>

        {/* 6. Overall Risk */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Overall Risk</span>
          <span className={`text-xl font-black block ${isZ2Low ? 'text-amber-700' : 'text-emerald-700'}`}>
            {isZ2Low ? 'Moderate' : 'Low'}
          </span>
          <span className="text-xs font-bold text-stone-600 block">Actionable</span>
          <span className="text-[10px] text-stone-400">Automated safety net</span>
        </div>
      </div>

      {/* ================= AI RESULT BOX (SECTION 12) ================= */}
      <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-sm space-y-4 ${
        isZ2Low ? 'bg-amber-50/80 border-amber-300' : 'bg-emerald-50/80 border-emerald-300'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-5 h-5 ${isZ2Low ? 'text-amber-800' : 'text-emerald-800'}`} />
            <h3 className={`text-base font-black uppercase tracking-wider ${
              isZ2Low ? 'text-amber-950' : 'text-emerald-950'
            }`}>
              AI Result
            </h3>
          </div>
          <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-white/80 border border-stone-200 text-stone-700 uppercase">
            SIMULATED DEMO AI
          </span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Detection:</span>
            <p className="text-base sm:text-lg font-black text-stone-900 mt-0.5">
              {isZ2Low 
                ? 'Zone 2 requires irrigation.' 
                : 'Zone 2 irrigation completed successfully. Farm moisture is optimal.'}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Reason:</span>
            <p className="font-semibold text-stone-700 mt-0.5">
              {isZ2Low 
                ? 'Soil moisture has fallen to 43% and water-stress indicators are elevated in the South Sector.'
                : 'Soil moisture is restored to 60% and canopy chlorophyll vigor index is stabilized.'}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Recommended action:</span>
            <p className="font-bold text-stone-900 mt-0.5">
              {isZ2Low 
                ? 'Start irrigation for Zone 2.' 
                : 'No immediate intervention needed. Continue regular sensor monitoring.'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Start Irrigation & Open Zone 2 (Section 12) */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setCurrentView('irrigation');
              if (isZ2Low) startIrrigation('zone-2', 300);
            }}
            className={`py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              isZ2Low
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>{isZ2Low ? 'Start Irrigation' : 'View Irrigation Status'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('zones');
              openZoneDetail('zone-2');
            }}
            className="py-3 px-5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Open Zone 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
