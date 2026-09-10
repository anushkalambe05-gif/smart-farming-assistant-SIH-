import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { 
  X, 
  Droplets, 
  Thermometer, 
  Activity, 
  Sun, 
  Camera, 
  Play, 
  Square, 
  MessageSquare 
} from 'lucide-react';
import type { ZoneId } from '../../types/farm';

interface ZoneDetailModalProps {
  zoneId: ZoneId | null;
  onClose: () => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({ zoneId, onClose }) => {
  const { 
    zones, 
    startIrrigation, 
    stopIrrigation, 
    openCameraFeed, 
    setActiveTab, 
    askQuickQuestion 
  } = useFarm();

  if (!zoneId) return null;
  const zone = zones[zoneId];
  if (!zone) return null;

  const isZone2 = zoneId === 'zone-2';

  const handleAskAiAboutZone = () => {
    onClose();
    setActiveTab('ask-ai');
    askQuickQuestion(isZone2 ? 'What should I do for Zone 2?' : 'What is the condition of Zone 1?');
  };

  const handleViewCamera = () => {
    onClose();
    openCameraFeed(zoneId);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isZone2 ? 'bg-amber-50/60 border-amber-200' : 'bg-emerald-50/60 border-emerald-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
              isZone2 ? 'bg-amber-500 text-stone-950' : 'bg-emerald-600 text-white'
            }`}>
              {isZone2 ? 'Z2' : 'Z1'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-900">{zone.name}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  zone.status === 'healthy'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {zone.status === 'healthy' ? '🟢 Healthy' : '🟠 Attention Required'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Crop: {zone.cropType} • Area: 0.5 Acre • Hardware: ESP32 + LoRa + OV2640 Cam
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Metrics Grid */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>Soil Moisture</span>
              </div>
              <div className={`text-2xl font-bold ${
                zone.soilMoisture < 35 ? 'text-amber-600' : 'text-emerald-700'
              }`}>
                {zone.soilMoisture}%
              </div>
              <span className="text-[10px] text-stone-400">
                {zone.soilMoisture < 35 ? 'Below Optimal (<35%)' : 'Optimal (35-55%)'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                <span>Temperature</span>
              </div>
              <div className="text-2xl font-bold text-stone-800">
                {zone.temperature}°C
              </div>
              <span className="text-[10px] text-stone-400">Ambient Air</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                <Activity className="w-3.5 h-3.5 text-sky-600" />
                <span>Humidity</span>
              </div>
              <div className="text-2xl font-bold text-stone-800">
                {zone.humidity}%
              </div>
              <span className="text-[10px] text-stone-400">Relative Canopy</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Sunlight</span>
              </div>
              <div className="text-2xl font-bold text-stone-800">
                {zone.light}%
              </div>
              <span className="text-[10px] text-stone-400">Solar Irradiance</span>
            </div>
          </div>

          {/* Detailed Status Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2 text-xs">
              <div className="font-bold text-stone-800 border-b border-stone-200/60 pb-1.5 flex items-center justify-between">
                <span>Crop Health & Pathogen Status</span>
                <span className="font-mono text-emerald-700 font-bold">{zone.cropHealth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Disease Detected:</span>
                <span className="font-bold text-stone-800">{zone.disease}</span>
              </div>
              {zone.diseaseConfidence && (
                <div className="flex justify-between">
                  <span className="text-stone-500">AI Confidence:</span>
                  <span className="font-bold text-amber-700">{zone.diseaseConfidence}%</span>
                </div>
              )}
              {zone.diseaseSeverity && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Severity:</span>
                  <span className="font-bold text-amber-700">{zone.diseaseSeverity}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500">Rainfall:</span>
                <span className="font-medium text-stone-700">{zone.rainfall}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2 text-xs">
              <div className="font-bold text-stone-800 border-b border-stone-200/60 pb-1.5 flex items-center justify-between">
                <span>Hardware & Node Telemetry</span>
                <span className="font-mono text-emerald-700 font-bold">{zone.loRaSignalDbm} dBm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Camera Node:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {zone.cameraStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Sensor Node:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {zone.sensorStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Water Pump:</span>
                <span className={`font-bold ${zone.pumpStatus === 'ON' ? 'text-blue-600 animate-pulse' : 'text-stone-700'}`}>
                  {zone.pumpStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Node Battery:</span>
                <span className="font-medium text-stone-700">{zone.batteryLevel}% (Solar Charged)</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
            <div className="flex items-center gap-2">
              {zone.pumpStatus === 'OFF' ? (
                <button
                  onClick={() => startIrrigation(zoneId)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Pump</span>
                </button>
              ) : (
                <button
                  onClick={() => stopIrrigation(zoneId)}
                  className="px-3.5 py-2 rounded-xl bg-stone-700 text-white font-medium text-xs hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Pump</span>
                </button>
              )}

              <button
                onClick={handleViewCamera}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs transition-colors flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5 text-stone-600" />
                <span>Simulated Camera</span>
              </button>
            </div>

            <button
              onClick={handleAskAiAboutZone}
              className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI About {zone.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
