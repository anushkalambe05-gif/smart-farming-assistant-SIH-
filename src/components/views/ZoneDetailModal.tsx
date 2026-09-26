import React from 'react';
import { 
  X, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Power, 
  Sparkles
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const ZoneDetailModal: React.FC = () => {
  const { selectedZoneDetail, closeZoneDetail, zones, startIrrigation, stopIrrigation, setCurrentView } = useFarm();

  if (!selectedZoneDetail) return null;
  const zone = zones[selectedZoneDetail];
  if (!zone) return null;

  const isZone2 = selectedZoneDetail === 'zone-2';

  const handleStartIrrigation = () => {
    startIrrigation(selectedZoneDetail, 300);
    closeZoneDetail();
    setCurrentView('irrigation');
  };

  const handleStopIrrigation = () => {
    stopIrrigation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-stone-200 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeZoneDetail}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-stone-100">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
            isZone2 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
          }`}>
            {isZone2 ? 'Z2' : 'Z1'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {zone.name}
              </h2>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isZone2 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}>
                {zone.statusLabel}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              <strong>Crop:</strong> {zone.cropType} • <strong>Area:</strong> {zone.area} • LoRa Node Online
            </p>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Soil Moisture */}
          <div className={`p-3.5 rounded-2xl border ${
            isZone2 ? 'bg-amber-50/70 border-amber-200' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Soil Moisture</span>
            <span className={`text-2xl font-black block mt-1 ${
              isZone2 ? 'text-amber-700' : 'text-emerald-700'
            }`}>
              {zone.soilMoisture}%
            </span>
            <span className="text-[10px] font-semibold text-stone-500 mt-0.5 block">
              {isZone2 ? 'Below Threshold' : 'Optimal'}
            </span>
          </div>

          {/* Temperature */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Temperature</span>
            <span className="text-2xl font-black text-stone-900 block mt-1">{zone.temperature}°C</span>
            <span className="text-[10px] text-stone-400 mt-0.5 block">Ambient</span>
          </div>

          {/* Humidity */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Humidity</span>
            <span className="text-2xl font-black text-stone-900 block mt-1">{zone.humidity}%</span>
            <span className="text-[10px] text-stone-400 mt-0.5 block">Relative</span>
          </div>

          {/* Soil Temperature */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Soil Temp</span>
            <span className="text-2xl font-black text-stone-900 block mt-1">{zone.soilTemperature}°C</span>
            <span className="text-[10px] text-stone-400 mt-0.5 block">15cm Probe</span>
          </div>

          {/* Water Status */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Water Status</span>
            <span className={`text-lg font-black block mt-1 ${
              zone.waterStatus === 'Low' ? 'text-rose-600' : 'text-emerald-700'
            }`}>
              {zone.waterStatus}
            </span>
          </div>

          {/* Crop Health */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Crop Health</span>
            <span className={`text-2xl font-black block mt-1 ${
              zone.cropHealth < 80 ? 'text-amber-700' : 'text-emerald-700'
            }`}>
              {zone.cropHealth}%
            </span>
          </div>

          {/* AI Status */}
          <div className="col-span-2 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">AI Status</span>
            <span className={`text-sm font-black block mt-1 flex items-center gap-1.5 ${
              isZone2 ? 'text-amber-800' : 'text-emerald-800'
            }`}>
              {isZone2 ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              <span>{isZone2 ? 'Attention Required' : 'Optimal'}</span>
            </span>
            <span className="text-[10px] text-stone-400">Confidence: 92%</span>
          </div>
        </div>

        {/* AI Recommendation Box (Section 5) */}
        <div className={`p-4 rounded-2xl border-2 ${
          isZone2 ? 'bg-amber-50/80 border-amber-300' : 'bg-emerald-50/70 border-emerald-300'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className={`w-4 h-4 ${isZone2 ? 'text-amber-700' : 'text-emerald-700'}`} />
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isZone2 ? 'text-amber-900' : 'text-emerald-900'
            }`}>
              AI Recommendation
            </h4>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed">
            {isZone2 
              ? '“Soil moisture is below the preferred level. Irrigation is recommended for Zone 2.”'
              : '“Soil moisture and canopy vigor are at target values. No irrigation is needed at this time.”'
            }
          </p>
        </div>

        {/* Action Button: Start Irrigation */}
        <div className="pt-2 flex items-center gap-3">
          {zone.pumpStatus === 'ON' ? (
            <button
              onClick={handleStopIrrigation}
              className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Power className="w-4 h-4" />
              <span>Stop Irrigation</span>
            </button>
          ) : (
            <button
              onClick={handleStartIrrigation}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Droplets className="w-4 h-4" />
              <span>Start Irrigation</span>
            </button>
          )}

          <button
            onClick={closeZoneDetail}
            className="py-3 px-5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
