import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  MapPin, 
  Radio, 
  Camera, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const ScalabilityModal: React.FC = () => {
  const { scaleModalOpen, setScaleModalOpen, scaledAssets, addScaledAsset } = useFarm();
  const [activeTab, setActiveTab] = useState<'zone' | 'sensor' | 'camera'>('zone');
  const [assetName, setAssetName] = useState('');
  const [assetLocation, setAssetLocation] = useState('');

  if (!scaleModalOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultName = activeTab === 'zone' 
      ? (assetName || `Zone ${scaledAssets.filter(a => a.type === 'zone').length + 3} (Mustard)`) 
      : activeTab === 'sensor' 
      ? (assetName || `LoRa Sensor Node ${scaledAssets.filter(a => a.type === 'sensor').length + 3}`) 
      : (assetName || `Canopy Cam 0${scaledAssets.filter(a => a.type === 'camera').length + 3}`);

    const defaultLoc = assetLocation || (activeTab === 'zone' ? 'Parcel Section B (0.5 Acre)' : 'Zone 3 South Grid');

    addScaledAsset(activeTab, defaultName, defaultLoc);
    setAssetName('');
    setAssetLocation('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-stone-900">Scale Farm Architecture</h3>
              <p className="text-xs text-stone-500">Modular expansion: Add zones, sensors, or cameras</p>
            </div>
          </div>
          <button
            onClick={() => setScaleModalOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection: Zone, Sensor, Camera */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-stone-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('zone')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'zone'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add Zone</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sensor')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'sensor'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-sky-600" />
            <span>Add Sensor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('camera')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'camera'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-purple-600" />
            <span>Add Camera</span>
          </button>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleAdd} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {activeTab === 'zone' ? 'Zone Name / Crop' : activeTab === 'sensor' ? 'Sensor Node Identifier' : 'Camera Label'}
            </label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder={activeTab === 'zone' ? 'e.g. Zone 3 (Mustard / Gram)' : activeTab === 'sensor' ? 'e.g. ESP32 LoRa Node 03' : 'e.g. Canopy Camera 03'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Field Location / Sector</label>
            <input
              type="text"
              value={assetLocation}
              onChange={(e) => setAssetLocation(e.target.value)}
              placeholder="e.g. North-East Acre boundary"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register & Connect to Edge AI Gateway</span>
          </button>
        </form>

        {/* Current Scaled Hardware Mesh */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Connected Mesh Hardware ({scaledAssets.length})
          </h4>

          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {scaledAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">{asset.name}</span>
                    <span className="text-[11px] text-stone-500">{asset.location}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {asset.addedAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
