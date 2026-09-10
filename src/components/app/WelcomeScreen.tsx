import React, { useState } from 'react';
import { 
  Sprout, 
  Cpu, 
  WifiOff, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const WelcomeScreen: React.FC = () => {
  const { loginAsDemo, loginAsFarmer } = useFarm();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [farmerName, setFarmerName] = useState<string>('Ramesh Patel');
  const [farmPin, setFarmPin] = useState<string>('1234');

  const handleFarmerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsFarmer(farmerName || 'Ramesh Patel');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf8] via-emerald-50/30 to-[#f8faf8] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Ambient background blur elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Main Welcome Container */}
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl text-center space-y-6 relative">
        {/* Top Edge AI Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider mx-auto">
          <Cpu className="w-3.5 h-3.5 text-emerald-700" />
          <span>Edge AI • Offline First</span>
        </div>

        {/* Logo & Headline */}
        <div className="space-y-2.5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200 ring-4 ring-emerald-100/70">
            <Sprout className="w-10 h-10 text-emerald-100" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Smart Farming Assistant
          </h1>

          <p className="text-sm sm:text-base font-bold text-emerald-800">
            Edge AI for Smarter Farming
          </p>

          <p className="text-xs sm:text-sm text-stone-500 font-medium italic">
            “Your farm. Your data. Smarter decisions.”
          </p>
        </div>

        {/* Action Button: Enter Farm */}
        <div className="space-y-3 pt-2">
          <button
            onClick={loginAsDemo}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Enter Farm</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setShowLoginModal(true)}
            className="text-xs font-bold text-stone-500 hover:text-emerald-800 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch Farmer Profile (PIN: 1234)</span>
          </button>
        </div>

        {/* Sub-status badges */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-around text-xs text-stone-500 font-medium">
          <span className="flex items-center gap-1">
            <WifiOff className="w-3.5 h-3.5 text-stone-400" />
            <span>100% Offline Ready</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>LoRa Sensor Mesh</span>
          </span>
        </div>
      </div>

      {/* Farmer Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Farmer Login</h3>
                  <span className="text-[11px] text-stone-400">Local Gateway Authentication</span>
                </div>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFarmerLoginSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Farmer Name</label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900"
                  placeholder="e.g. Ramesh Patel"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Local Gateway PIN</label>
                <div className="relative">
                  <input
                    type="password"
                    value={farmPin}
                    onChange={(e) => setFarmPin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900 pr-8"
                    placeholder="1234"
                  />
                  <Lock className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">Pre-filled with default offline PIN: 1234</span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 font-bold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm"
                >
                  Login to Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
