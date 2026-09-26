import React from 'react';
import { 
  Droplets, 
  Power, 
  Sparkles,
  CheckCircle2,
  FastForward
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const IrrigationView: React.FC = () => {
  const { 
    zones, 
    irrigation, 
    startIrrigation, 
    stopIrrigation, 
    completeIrrigationCycle,
    toggleSmartIrrigation 
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];
  const isZ2Low = zone2.soilMoisture < 50;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100, 
    Math.round(((irrigation.totalDurationSeconds - irrigation.secondsRemaining) / irrigation.totalDurationSeconds) * 100)
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header (Section 15) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
              Automated Drip Actuation
            </span>
            <span className="text-xs text-stone-500">Submersible Pump + 12V Solenoid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Smart Irrigation
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Precision root zone hydration based on real-time soil moisture and environmental transpiration.
          </p>
        </div>

        {/* Smart Irrigation Switch & Demo Complete Button */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {/* Complete Cycle Now (Demo Fast-Forward for Judges) */}
          <button
            onClick={() => completeIrrigationCycle('zone-2')}
            className="px-3.5 py-2 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-xs border border-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Instantly simulates 5-minute cycle completion for demonstration"
          >
            <FastForward className="w-3.5 h-3.5 text-emerald-700" />
            <span>Complete Cycle Now (Demo)</span>
          </button>

          {/* Smart Irrigation Toggle */}
          <div className="p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex items-center gap-3">
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-stone-900">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Smart Auto-Drip</span>
                <span className={`px-2 py-0.2 text-[10px] font-black rounded-full ${
                  irrigation.smartModeActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                }`}>
                  {irrigation.smartModeActive ? 'ACTIVE' : 'MANUAL'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleSmartIrrigation}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                irrigation.smartModeActive ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform absolute top-0.5 ${
                irrigation.smartModeActive ? 'right-0.5' : 'left-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Irrigation Monitor Banner (When running) */}
      {irrigation.isRunning ? (
        <div className="bg-gradient-to-r from-blue-600 to-sky-700 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                <span>🟢 IRRIGATION RUNNING</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black">
                Active Zone: {irrigation.activeZoneId === 'zone-1' ? 'Zone 1 (North)' : 'Zone 2 (South)'}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 max-w-md">
                12V pump pressurized. Drip emitters delivering 450 L/h precision hydration directly to wheat root zone.
              </p>
            </div>

            {/* Live Metrics: Water Used, Duration, Stop, Fast-Forward */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center min-w-[105px]">
                <span className="text-[10px] uppercase font-bold text-blue-200 block">Water Used</span>
                <span className="text-2xl font-black text-white mt-0.5 block">
                  {irrigation.waterUsedLiters.toFixed(1)} L
                </span>
                <span className="text-[10px] text-blue-200">Dispensed</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center min-w-[105px]">
                <span className="text-[10px] uppercase font-bold text-blue-200 block">Duration</span>
                <span className="text-2xl font-black text-white mt-0.5 font-mono block">
                  {formatTimer(irrigation.secondsRemaining)}
                </span>
                <span className="text-[10px] text-blue-200">Countdown</span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => completeIrrigationCycle('zone-2')}
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Fast Complete</span>
                </button>

                <button
                  onClick={stopIrrigation}
                  className="px-4 py-2 rounded-xl bg-white text-rose-600 hover:bg-rose-50 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>Stop Pump</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Progress Bar */}
          <div className="mt-5 pt-4 border-t border-white/20">
            <div className="flex justify-between text-xs font-semibold text-blue-100 mb-1.5">
              <span>Progress: {progressPercent}%</span>
              <span>Current Soil Moisture: {zone2.soilMoisture}%</span>
            </div>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      ) : !isZ2Low ? (
        /* Post-irrigation banner */
        <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-full">
                IRRIGATION COMPLETED
              </span>
              <h3 className="text-base font-black text-emerald-950 mt-1">
                Zone 2 Hydration Restored (43% → 60%)
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                Root moisture target satisfied. Pump safely disengaged and alerts updated.
              </p>
            </div>
          </div>

          <button
            onClick={() => startIrrigation('zone-2', 300)}
            className="py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Trigger New Cycle
          </button>
        </div>
      ) : null}

      {/* Two Main Zone Irrigation Cards (Zone 1 & Zone 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= ZONE 1 (SECTION 15) ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center">
                  Z1
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Zone 1 (North Sector)</h3>
                  <span className="text-xs text-stone-500">0.5 Acre • Wheat PBW-550</span>
                </div>
              </div>

              {/* Status: OFF */}
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                zone1.pumpStatus === 'ON'
                  ? 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }`}>
                {zone1.pumpStatus === 'ON' ? 'RUNNING' : 'OFF'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3 text-xs">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Soil Moisture</span>
                <span className="text-xl font-black text-emerald-700 mt-1 block">{zone1.soilMoisture}%</span>
                <span className="text-[10px] text-stone-500">Optimal</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Threshold</span>
                <span className="text-xl font-black text-stone-900 mt-1 block">45%</span>
                <span className="text-[10px] text-stone-500">Trigger Point</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Valve</span>
                <span className="text-sm font-black text-stone-700 mt-2 block">Valve 01</span>
                <span className="text-[10px] text-stone-400">Drip Lateral</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed mt-2">
              Zone 1 root hydration is well above the 45% trigger threshold. Automated irrigation is currently standing by.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-stone-100">
            {zone1.pumpStatus === 'ON' ? (
              <button
                onClick={stopIrrigation}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Power className="w-4 h-4" />
                <span>Stop Zone 1</span>
              </button>
            ) : (
              <button
                onClick={() => startIrrigation('zone-1', 300)}
                className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>Start Zone 1</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= ZONE 2 (SECTION 15) ================= */}
        <div className={`bg-white rounded-3xl p-6 sm:p-7 border-2 shadow-sm flex flex-col justify-between ${
          isZ2Low ? 'border-amber-300 ring-2 ring-amber-100' : 'border-emerald-200'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl font-black flex items-center justify-center ${
                  isZ2Low ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                }`}>
                  Z2
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Zone 2 (South Sector)</h3>
                  <span className="text-xs text-stone-500">0.5 Acre • Wheat PBW-550</span>
                </div>
              </div>

              {/* Status: RECOMMENDED / RUNNING / OPTIMAL */}
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                zone2.pumpStatus === 'ON'
                  ? 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse'
                  : isZ2Low
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}>
                {zone2.pumpStatus === 'ON' ? 'IRRIGATION RUNNING' : isZ2Low ? 'RECOMMENDED' : 'OPTIMAL'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3 text-xs">
              <div className={`p-3 rounded-2xl border ${
                isZ2Low ? 'bg-amber-50/70 border-amber-200' : 'bg-stone-50 border-stone-200'
              }`}>
                <span className="text-amber-800 text-[10px] font-bold uppercase block">Soil Moisture</span>
                <span className={`text-xl font-black mt-1 block ${
                  isZ2Low ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {zone2.soilMoisture}%
                </span>
                <span className={`text-[10px] font-semibold ${isZ2Low ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {isZ2Low ? 'Low (Deficit)' : 'Optimal'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Threshold</span>
                <span className="text-xl font-black text-stone-900 mt-1 block">45%</span>
                <span className="text-[10px] text-stone-500">Trigger Min</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 text-[10px] font-bold uppercase block">Valve</span>
                <span className="text-sm font-black text-stone-700 mt-2 block">Valve 02</span>
                <span className="text-[10px] text-stone-400">Drip Lateral</span>
              </div>
            </div>

            <p className={`text-xs font-medium leading-relaxed mt-2 p-2.5 rounded-xl border ${
              isZ2Low ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}>
              {isZ2Low
                ? '⚠️ Soil moisture in Zone 2 is 43% (below 45% threshold). Edge AI recommends a 5-minute targeted drip cycle.'
                : '✅ Zone 2 root moisture has reached 60%. Drip hydration is optimal.'
              }
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-stone-100 flex items-center gap-2">
            {zone2.pumpStatus === 'ON' ? (
              <button
                onClick={stopIrrigation}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Power className="w-4 h-4" />
                <span>Stop Zone 2</span>
              </button>
            ) : (
              <button
                onClick={() => startIrrigation('zone-2', 300)}
                className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isZ2Low
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>{isZ2Low ? 'Start Irrigation' : 'Restart Zone 2 Drip'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
