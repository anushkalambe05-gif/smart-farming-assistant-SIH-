import React from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Droplets, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge
} from 'lucide-react';

export const IrrigationPage: React.FC = () => {
  const { 
    zones, 
    startIrrigation, 
    stopIrrigation, 
    setActiveTab 
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
              Irrigation Command Unit
            </span>
            {/* Required banner from Section 10 */}
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
              DEMO SIMULATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Precision Drip Irrigation Control
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Automated solenoid valves managed by local edge logic with manual farmer override.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <Droplets className="w-4 h-4 text-blue-600" />
          <span>Pressure: 1.8 Bar • Flow: 450 L/h</span>
        </div>
      </div>

      {/* ================= SECTION 10: DUAL ZONE IRRIGATION CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= ZONE 1 ================= */}
        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Top header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                  Z1
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">ZONE 1 (North Sector)</h3>
                  <p className="text-xs text-stone-500">Wheat (PBW-550) • 0.5 Acre</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Status: Optimal
              </span>
            </div>

            {/* Metrics display */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Current Moisture</span>
                <span className="text-2xl font-bold text-emerald-700">{zone1.soilMoisture}%</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Threshold: 35-55%</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Pump Status</span>
                <span className={`text-2xl font-bold ${zone1.pumpStatus === 'ON' ? 'text-blue-600 animate-pulse' : 'text-stone-800'}`}>
                  {zone1.pumpStatus === 'ON' ? 'ON (Irrigating)' : 'OFF'}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Relay Port: RLY-01</span>
              </div>
            </div>

            {/* Recommendation from Section 10 */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900 block mb-0.5">Recommendation:</span>
              <p className="text-emerald-800 font-medium">
                “No irrigation required.”
              </p>
              <p className="text-[11px] text-stone-500 mt-1">
                Root soil hydration is well balanced. Continue regular telemetry monitoring.
              </p>
            </div>
          </div>

          {/* Interactive Start/Stop Pump Buttons */}
          <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
            <button
              onClick={() => startIrrigation('zone-1')}
              disabled={zone1.pumpStatus === 'ON'}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                zone1.pumpStatus === 'ON'
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START PUMP</span>
            </button>

            <button
              onClick={() => stopIrrigation('zone-1')}
              disabled={zone1.pumpStatus === 'OFF'}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                zone1.pumpStatus === 'OFF'
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>STOP PUMP</span>
            </button>
          </div>
        </div>

        {/* ================= ZONE 2 (ATTENTION REQUIRED) ================= */}
        <div className="bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Subtle water animation strip when irrigating */}
          {zone2.pumpStatus === 'ON' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500 animate-pulse"></div>
          )}

          <div className="space-y-4">
            {/* Top header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center">
                  Z2
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">ZONE 2 (South Sector)</h3>
                  <p className="text-xs text-stone-500">Wheat (PBW-550) • 0.5 Acre</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold border ${
                zone2.pumpStatus === 'ON'
                  ? 'bg-blue-100 text-blue-900 border-blue-300 animate-pulse'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {zone2.pumpStatus === 'ON' ? (
                  <>
                    <Droplets className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
                    Status: Irrigating
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    Status: Low
                  </>
                )}
              </span>
            </div>

            {/* Metrics display */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-amber-800 text-[11px] block font-medium">Current Moisture</span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl font-bold ${
                    zone2.soilMoisture < 35 ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {zone2.soilMoisture}%
                  </span>
                  {zone2.pumpStatus === 'ON' && (
                    <span className="text-[10px] text-blue-600 font-bold animate-pulse">↑ Climbing</span>
                  )}
                </div>
                <span className="text-[10px] text-amber-700 block mt-0.5">Threshold: &lt;35% is critical</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Pump State</span>
                <span className={`text-2xl font-bold ${
                  zone2.pumpStatus === 'ON' ? 'text-blue-600 animate-pulse' : 'text-stone-800'
                }`}>
                  {zone2.pumpStatus === 'ON' ? 'ON' : 'OFF'}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Relay Port: RLY-02</span>
              </div>
            </div>

            {/* Recommendation from Section 10 */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
              <span className="font-bold text-amber-950 block mb-0.5">Recommendation:</span>
              <p className="text-amber-900 font-bold">
                “Irrigation Required”
              </p>
              <p className="text-[11px] text-stone-600 mt-1">
                Moisture is currently at {zone2.soilMoisture}%. Recommended dosage: 450 Liters via drip pipeline to relieve canopy hydration stress.
              </p>
            </div>
          </div>

          {/* Interactive Start/Stop Pump Buttons */}
          <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
            <button
              onClick={() => startIrrigation('zone-2')}
              disabled={zone2.pumpStatus === 'ON'}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                zone2.pumpStatus === 'ON'
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START PUMP</span>
            </button>

            <button
              onClick={() => stopIrrigation('zone-2')}
              disabled={zone2.pumpStatus === 'OFF'}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                zone2.pumpStatus === 'OFF'
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>STOP PUMP</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= DYNAMIC SIMULATION EXPLANATION CARD ================= */}
      <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-700">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-stone-900 block text-xs">
              Live Software Simulation Dynamics (Section 24)
            </span>
            <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
              When you click <strong>START PUMP</strong> for Zone 2, the simulated background ticker gradually increases Zone 2 moisture: 
              <span className="font-mono text-emerald-800 font-bold ml-1">28% → 32% → 37% → 42%</span>. 
              Clicking <strong>STOP PUMP</strong> freezes the moisture level at standby.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('ask-ai')}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Ask AI: “Should I irrigate Zone 2?”</span>
        </button>
      </div>
    </div>
  );
};
