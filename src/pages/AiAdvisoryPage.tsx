import React from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  ArrowRight, 
  MessageSquare
} from 'lucide-react';

export const AiAdvisoryPage: React.FC = () => {
  const { zones, setActiveTab, askQuickQuestion } = useFarm();
  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];

  const handleAskAiAboutTopic = (prompt: string) => {
    setActiveTab('ask-ai');
    askQuickQuestion(prompt);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Agronomy Intelligence
            </span>
            <span className="text-xs text-stone-500 font-medium">Farmer-Friendly Guidance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            AI Advisory & Agronomic Recommendations
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Synthesized insights generated from sensor packets and YOLO edge vision for wheat cultivation.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ask-ai')}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask AI Custom Question</span>
        </button>
      </div>

      {/* ================= 4 PRIMARY SECTIONS (SECTION 13 REQUIREMENT) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 1: CROP HEALTH */}
        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  🌱
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    CROP HEALTH
                  </span>
                  <h3 className="font-bold text-stone-900 text-base">Vegetative Vigor & Chlorophyll</h3>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Vigor: {zone1.cropHealth}%
              </span>
            </div>

            {/* Exact Required string from Section 13 */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-stone-800 text-sm leading-relaxed">
              “Zone 1 is currently healthy with {zone1.cropHealth}% crop health. Continue regular monitoring.”
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Canopy coloration across North Sector (Zone 1) shows balanced chlorophyll distribution with no signs of nutrient deficiency or moisture starvation.
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => handleAskAiAboutTopic('Is my crop healthy?')}
              className="text-emerald-700 text-xs font-semibold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI about Crop Health</span>
            </button>

            <button
              onClick={() => setActiveTab('monitoring')}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Inspect Zone 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION 2: WATER MANAGEMENT */}
        <div className="bg-white rounded-2xl p-6 border-2 border-amber-300 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  💧
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    WATER MANAGEMENT
                  </span>
                  <h3 className="font-bold text-stone-900 text-base">Soil Hydration & Drip Scheduling</h3>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                Moisture: {zone2.soilMoisture}%
              </span>
            </div>

            {/* Exact Required string from Section 13 */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-stone-800 text-sm leading-relaxed">
              “Zone 2 has {zone2.soilMoisture}% soil moisture. Irrigation is recommended.”
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Capacitive sensor probe at 15cm depth in Zone 2 indicates root hydration stress. Recommended irrigation cycle is 450 Liters via low-pressure drip line.
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => handleAskAiAboutTopic('Should I irrigate Zone 2?')}
              className="text-amber-800 text-xs font-semibold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI about Irrigation</span>
            </button>

            <button
              onClick={() => setActiveTab('irrigation')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Go to Irrigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION 3: DISEASE MANAGEMENT */}
        <div className="bg-white rounded-2xl p-6 border-2 border-rose-300 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                  🦠
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                    DISEASE MANAGEMENT
                  </span>
                  <h3 className="font-bold text-stone-900 text-base">Pathogen Identification</h3>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold border border-rose-300">
                Leaf Blight 94%
              </span>
            </div>

            {/* Exact Required string from Section 13 */}
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-stone-800 text-sm leading-relaxed">
              “Leaf Blight has been detected in Zone 2 with 94% confidence. Inspect affected plants and take appropriate disease-management action.”
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              YOLOv8 vision pipeline identified brownish-grey necrotic lesions on lower leaves. Avoid excessive overhead spraying to prevent spore transmission across sub-zone rows.
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => handleAskAiAboutTopic('Why are my leaves yellow?')}
              className="text-rose-800 text-xs font-semibold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI about Leaf Symptoms</span>
            </button>

            <button
              onClick={() => setActiveTab('edge-ai')}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Review YOLO Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION 4: WEATHER ADVISORY */}
        <div className="bg-white rounded-2xl p-6 border-2 border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                  ☀️
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    WEATHER ADVISORY
                  </span>
                  <h3 className="font-bold text-stone-900 text-base">Forecast & Atmospheric Stress</h3>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold border border-stone-200">
                No Rain Detected
              </span>
            </div>

            {/* Exact Required string from Section 13 */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm leading-relaxed">
              “No immediate rainfall alert. Continue monitoring temperature and humidity.”
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Current ambient temperature is 28°C with 66% relative humidity. High solar irradiance allows efficient morning drip irrigation with minimal evaporation loss.
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => handleAskAiAboutTopic('What is the weather forecast?')}
              className="text-stone-700 text-xs font-semibold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask AI about Weather</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>View Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
