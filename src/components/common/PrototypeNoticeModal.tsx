import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { 
  X, 
  Cpu, 
  Smartphone, 
  ArrowRight, 
  Layers,
  ShieldCheck,
  WifiOff
} from 'lucide-react';

export const PrototypeNoticeModal: React.FC = () => {
  const { showArchitectureModal, setShowArchitectureModal } = useFarm();

  if (!showArchitectureModal) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setShowArchitectureModal(false)}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                System Architecture & Hardware Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Smart India Hackathon (SIH) Round-1 Prototype vs Future Physical Hardware Implementation
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowArchitectureModal(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Transparency Disclosure */}
        <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-emerald-900">Mandatory SIH Round-1 Disclosure: </span>
            This browser application is a realistic <strong>working software simulation</strong> using client-side mock sensor telemetry and simulated AI results. Physical microcontrollers and cameras are NOT physically connected yet. Hardware integration is planned for Round-2.
          </div>
        </div>

        {/* ================= SECTION 18: OFFLINE-FIRST CONCEPT ================= */}
        <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5" />
              CORE AI WORKS OFFLINE
            </span>
            <span className="text-xs text-stone-500 font-mono">Zero Cloud Dependency for Core Logic</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-1">
            <div className="p-2.5 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-stone-800 block">Camera Analysis</span>
              <span className="text-[10px] text-emerald-700">Runs locally on RPi</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-stone-800 block">Sensor Processing</span>
              <span className="text-[10px] text-emerald-700">ESP32 ADC digitization</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-stone-800 block">Disease Detection</span>
              <span className="text-[10px] text-emerald-700">YOLOv8 Quantized</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-stone-800 block">Local Decisions</span>
              <span className="text-[10px] text-emerald-700">Solenoid Relay Triggers</span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-stone-200 col-span-2 sm:col-span-1">
              <span className="font-bold text-stone-800 block">Recommendations</span>
              <span className="text-[10px] text-emerald-700">Instant Advisory</span>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            <strong>Internet is optional:</strong> High-speed internet is only needed for remote synchronization, cloud data backup, off-farm notifications, and mobile dashboard updates when the farmer travels away from the 1-acre field.
          </p>
        </div>

        {/* ================= SECTION 19: CURRENT PROTOTYPE VS FUTURE SYSTEM ================= */}
        <div className="space-y-4">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
            Architecture Pipeline Comparison
          </h3>

          {/* Current Round-1 Flow */}
          <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              CURRENT ROUND-1 PROTOTYPE (Static Browser Execution)
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-700 font-semibold pt-1">
              <span className="px-2.5 py-1 bg-stone-100 rounded-md">Simulated Sensor Data</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-stone-100 rounded-md">Web Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-stone-100 rounded-md">Simulated AI Detection</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-stone-100 rounded-md">AI Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-md">Farmer Ask AI</span>
            </div>
          </div>

          {/* Future Real Flow */}
          <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/20 space-y-2">
            <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              FUTURE REAL IMPLEMENTATION (Hardware Integration Planned)
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-700 font-semibold pt-1">
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md">Sensors + Cameras</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md">ESP32</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md">LoRa (868MHz)</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md">Raspberry Pi</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md">YOLO Edge AI</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded-md">Local Decision Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-md">Farmer Dashboard / Mobile App</span>
            </div>
          </div>
        </div>

        {/* ================= SECTION 20: FUTURE HARDWARE ================= */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-stone-700" />
            <span>Future Hardware Architecture (Bill of Materials)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { name: 'Raspberry Pi 4B / 5', desc: 'Central Edge AI Compute Hub' },
              { name: 'ESP32 Microcontrollers', desc: 'Zone 1 & 2 Node Controllers' },
              { name: 'LoRa Modules (SX1276)', desc: '868MHz Long-Range Mesh' },
              { name: 'OV2640 HD Cameras', desc: 'Canopy Disease Imaging' },
              { name: 'Soil Moisture Sensors', desc: 'Capacitive Corrosion-Resistant Probes' },
              { name: 'Temperature Sensor', desc: 'DHT22 / SHT31 High Precision' },
              { name: 'Humidity Sensor', desc: 'Canopy Relative Humidity Probe' },
              { name: 'Light Sensor (BH1750)', desc: 'Solar Irradiance (Lux)' },
              { name: 'Rain Sensor', desc: 'Tipping Bucket Rain Gauge' },
              { name: '12V Water Pump', desc: 'Drip Irrigation Pressurization' },
              { name: 'Relay Modules', desc: 'Optocoupled Solenoid Triggers' },
              { name: 'Audio Buzzer', desc: 'Local Audible Alarm' },
              { name: 'Solar Panels (50W)', desc: 'Autonomous Farm Node Power' },
              { name: '12V LiFePO4 Battery', desc: 'Weatherproof Deep-Cycle Pack' },
              { name: 'MPPT Charge Controller', desc: 'Solar Battery Management' },
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block text-[11px]">{item.name}</span>
                <span className="text-[10px] text-stone-500">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 21: FUTURE MOBILE APP & BACKEND ================= */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Future Cloud & Mobile Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-emerald-800 block">Mobile App</span>
              <span className="text-stone-700 font-semibold">React Native (iOS & Android)</span>
              <p className="text-[11px] text-stone-500 mt-1">
                Provides remote push alerts, remote pump controls, telemetry charts, and mobile Ask AI.
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-emerald-800 block">Backend Server</span>
              <span className="text-stone-700 font-semibold">FastAPI (Python)</span>
              <p className="text-[11px] text-stone-500 mt-1">
                Handles telemetry aggregation, async event dispatch, and cloud-to-edge synchronization.
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <span className="font-bold text-emerald-800 block">Database</span>
              <span className="text-stone-700 font-semibold">Supabase PostgreSQL</span>
              <p className="text-[11px] text-stone-500 mt-1">
                Time-series sensor telemetry, disease detection history, and farmer account records.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
          <button
            onClick={() => setShowArchitectureModal(false)}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-800 transition-colors shadow-sm"
          >
            Close & Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
