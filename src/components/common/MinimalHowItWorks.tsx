import React from 'react';

export const MinimalHowItWorks: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-20 lg:pb-8 border-t border-stone-200/80 text-center select-none">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
          How It Works
        </h3>

        <div className="font-extrabold text-xs sm:text-sm text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 py-2 px-4 rounded-2xl inline-block shadow-2xs">
          Sensors + Cameras → ESP32 + LoRa → Raspberry Pi Edge AI → Smart Recommendation → Farmer Action
        </div>

        <p className="text-xs text-stone-500 max-w-xl mx-auto leading-relaxed">
          Farm data is collected locally, analyzed by Edge AI, and converted into timely actions for the farmer.
        </p>
      </div>
    </footer>
  );
};
