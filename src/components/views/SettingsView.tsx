import React from 'react';
import { 
  Sliders, 
  Cpu, 
  Bell, 
  Sprout
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings } = useFarm();

  const handleToggle = (key: 'offlineMode' | 'smsAlerts' | 'audioBuzzer') => {
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      {/* Top Header */}
      <div className="pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Farm Configuration
          </span>
          <span className="text-xs text-stone-500">Local Gateway Preferences</span>
        </div>
        <h1 className="text-2xl font-black text-stone-900 mt-1">
          Farm Settings & Edge Parameters
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Configure physical farm parameters, automated irrigation thresholds, and edge AI sensitivity.
        </p>
      </div>

      {/* Farm Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-700" />
          <span>Farm Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-stone-600 font-bold mb-1">Farm Name</label>
            <input
              type="text"
              value={settings.farmName}
              onChange={(e) => updateSettings({ farmName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">Farm Size</label>
            <input
              type="text"
              value={settings.farmSize}
              onChange={(e) => updateSettings({ farmSize: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">Primary Crop Cultivar</label>
            <input
              type="text"
              value={settings.cropType}
              onChange={(e) => updateSettings({ cropType: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">Zone Configuration</label>
            <input
              type="text"
              value={settings.zoneConfiguration}
              onChange={(e) => updateSettings({ zoneConfiguration: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Irrigation Thresholds */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span>Irrigation Trigger Threshold</span>
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-stone-700">
            <span>Minimum Soil Moisture Trigger:</span>
            <span className="text-base font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
              {settings.irrigationThreshold}%
            </span>
          </div>

          <input
            type="range"
            min="30"
            max="60"
            step="1"
            value={settings.irrigationThreshold}
            onChange={(e) => updateSettings({ irrigationThreshold: parseInt(e.target.value) })}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>30% (Severe Drought)</span>
            <span>45% (Optimal Wheat Standard)</span>
            <span>60% (High Moisture)</span>
          </div>
          <p className="text-[11px] text-stone-500">
            When in-situ capacitive probe reads below {settings.irrigationThreshold}%, the local Raspberry Pi automatically marks the zone as RECOMMENDED for drip valve actuation.
          </p>
        </div>
      </div>

      {/* Edge AI & Camera Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-700" />
          <span>Edge AI Inference Settings</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-stone-600 font-bold mb-1">Disease Detection Sensitivity</label>
            <select
              value={settings.aiSensitivity}
              onChange={(e) => updateSettings({ aiSensitivity: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white cursor-pointer"
            >
              <option value="Standard">Standard (Confidence Threshold 75%)</option>
              <option value="High">High (Confidence Threshold 60% — Early Spotting)</option>
              <option value="Low">Low (Confidence Threshold 85% — Confirmed Only)</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-600 font-bold mb-1">Canopy Camera Scan Frequency</label>
            <select
              value={settings.scanFrequency}
              onChange={(e) => updateSettings({ scanFrequency: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white cursor-pointer"
            >
              <option value="Every 30 Mins">Every 30 Mins (Daylight Only)</option>
              <option value="Hourly">Hourly</option>
              <option value="Twice Daily">Twice Daily (Morning & Late Afternoon)</option>
            </select>
          </div>
        </div>
      </div>

      {/* System Toggles */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-600" />
          <span>System & Notification Toggles</span>
        </h2>

        <div className="space-y-3 divide-y divide-stone-100">
          {/* Offline Mode */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-bold text-stone-900 block">Offline-First Local Operation</span>
              <span className="text-[11px] text-stone-500 block">Keep all inference and sensor storage strictly local on Raspberry Pi</span>
            </div>
            <button
              onClick={() => handleToggle('offlineMode')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.offlineMode ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform absolute top-1 ${
                settings.offlineMode ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          {/* SMS Alerts */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-bold text-stone-900 block">Farmer SMS & GSM Alerts</span>
              <span className="text-[11px] text-stone-500 block">Send brief SMS notification for urgent water deficit & pest alerts</span>
            </div>
            <button
              onClick={() => handleToggle('smsAlerts')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.smsAlerts ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform absolute top-1 ${
                settings.smsAlerts ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Audio Buzzer */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-bold text-stone-900 block">On-Farm Gateway Audio Buzzer</span>
              <span className="text-[11px] text-stone-500 block">Audible chime on hardware box when critical threshold is crossed</span>
            </div>
            <button
              onClick={() => handleToggle('audioBuzzer')}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.audioBuzzer ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform absolute top-1 ${
                settings.audioBuzzer ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
