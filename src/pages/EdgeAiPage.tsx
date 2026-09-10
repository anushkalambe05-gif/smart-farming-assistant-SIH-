import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Camera, 
  ShieldAlert, 
  ArrowRight, 
  Maximize2, 
  Microchip,
  WifiOff
} from 'lucide-react';
import { edgeAiDetection } from '../data/mockData';

export const EdgeAiPage: React.FC = () => {
  const { openCameraFeed, setActiveTab } = useFarm();
  const [selectedZoneTab, setSelectedZoneTab] = useState<'zone-2' | 'zone-1'>('zone-2');

  const isZone2 = selectedZoneTab === 'zone-2';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Edge Intelligence Unit
            </span>
            <span className="text-xs text-stone-500 font-medium">100% Offline Edge Inference</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Edge AI Vision & Disease Diagnostic Engine
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Real-time deep learning pipeline running on Raspberry Pi without external cloud dependency.
          </p>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Raspberry Pi: ONLINE
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 font-medium text-xs border border-stone-200 flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5 text-stone-500" />
            Internet: NOT REQUIRED
          </span>
        </div>
      </div>

      {/* ================= SECTION 9: EDGE AI PIPELINE (6 STAGES) ================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <Microchip className="w-4 h-4 text-emerald-700" />
            Edge AI Processing Pipeline
          </h3>
          <span className="text-xs text-stone-500 font-mono">End-to-End Latency: 14.2 ms</span>
        </div>

        {/* 6 Stage Pipeline Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-4">
          {/* Stage 1: CAMERA */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center flex flex-col items-center justify-between space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 block uppercase">CAMERA</span>
              <p className="text-[10px] text-stone-500 mt-0.5">OV2640 HD 1080p</p>
            </div>
            <span className="text-[9px] bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded font-mono">
              Raw Frames
            </span>
          </div>

          {/* Stage 2: IMAGE PROCESSING */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center flex flex-col items-center justify-between space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 block uppercase">IMAGE PROCESSING</span>
              <p className="text-[10px] text-stone-500 mt-0.5">OpenCV Filtering</p>
            </div>
            <span className="text-[9px] bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded font-mono">
              Crop & Normalize
            </span>
          </div>

          {/* Stage 3: YOLO DETECTION */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center flex flex-col items-center justify-between space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 block uppercase">YOLO DETECTION</span>
              <p className="text-[10px] text-stone-500 mt-0.5">YOLOv8 Nano (INT8)</p>
            </div>
            <span className="text-[9px] bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded font-mono">
              TensorFlow Lite
            </span>
          </div>

          {/* Stage 4: DISEASE / PEST DETECTION */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-center flex flex-col items-center justify-between space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <div>
              <span className="text-xs font-bold text-amber-950 block uppercase">DISEASE / PEST</span>
              <p className="text-[10px] text-amber-800 mt-0.5">Bounding Box Extraction</p>
            </div>
            <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">
              Leaf Blight (94%)
            </span>
          </div>

          {/* Stage 5: AI ANALYSIS */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center flex flex-col items-center justify-between space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              05
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 block uppercase">AI ANALYSIS</span>
              <p className="text-[10px] text-stone-500 mt-0.5">Agronomic Severity</p>
            </div>
            <span className="text-[9px] bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded font-mono">
              Moderate Risk
            </span>
          </div>

          {/* Stage 6: RECOMMENDATION */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center justify-between space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              06
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-950 block uppercase">RECOMMENDATION</span>
              <p className="text-[10px] text-emerald-800 mt-0.5">Decision Engine</p>
            </div>
            <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">
              Targeted Action
            </span>
          </div>
        </div>
      </div>

      {/* ================= HARDWARE & STACK SPECIFICATION ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[11px] text-stone-400 block">Host Platform</span>
          <span className="text-sm font-bold text-stone-800">Raspberry Pi</span>
          <span className="text-[10px] text-emerald-700 block font-semibold">ONLINE</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[11px] text-stone-400 block">Processing Mode</span>
          <span className="text-sm font-bold text-stone-800">LOCAL / EDGE</span>
          <span className="text-[10px] text-emerald-700 block font-semibold">Zero Cloud Latency</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[11px] text-stone-400 block">Internet State</span>
          <span className="text-sm font-bold text-stone-800">NOT REQUIRED</span>
          <span className="text-[10px] text-stone-500 block">Autonomous Loop</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[11px] text-stone-400 block">Vision Model</span>
          <span className="text-sm font-bold text-stone-800">YOLO</span>
          <span className="text-[10px] text-stone-500 block">YOLOv8 Nano</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[11px] text-stone-400 block">Image Processing</span>
          <span className="text-sm font-bold text-stone-800">OpenCV</span>
          <span className="text-[10px] text-stone-500 block">C++ / Python API</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-[11px] text-stone-400 block">Inference Engine</span>
          <span className="text-sm font-bold text-stone-800">TensorFlow Lite</span>
          <span className="text-[10px] text-emerald-700 block font-semibold">14.2ms Latency</span>
        </div>
      </div>

      {/* ================= ZONE SELECTOR TABS & CAMERA PREVIEW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Camera Feed (Section 9) */}
        <div className="lg:col-span-7 bg-stone-900 text-white rounded-2xl overflow-hidden border border-stone-800 shadow-md flex flex-col justify-between">
          <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold">
                {isZone2 ? 'Zone 2 Camera Feed (South Sector)' : 'Zone 1 Camera Feed (North Sector)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-stone-800 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setSelectedZoneTab('zone-2')}
                  className={`px-2 py-0.5 rounded ${isZone2 ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400'}`}
                >
                  Zone 2
                </button>
                <button
                  onClick={() => setSelectedZoneTab('zone-1')}
                  className={`px-2 py-0.5 rounded ${!isZone2 ? 'bg-emerald-600 text-white font-bold' : 'text-stone-400'}`}
                >
                  Zone 1
                </button>
              </div>

              <button
                onClick={() => openCameraFeed(selectedZoneTab)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                title="Fullscreen Modal"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video Preview Canvas with YOLO overlay */}
          <div className="relative aspect-video bg-stone-950 flex items-center justify-center overflow-hidden">
            {/* Background wheat canopy art */}
            <svg className="w-full h-full opacity-85" viewBox="0 0 800 450" preserveAspectRatio="none">
              <defs>
                <linearGradient id="edgeHealthyLeaf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
                <linearGradient id="edgeBlightLeaf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="60%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
              </defs>

              <rect width="800" height="450" fill={isZone2 ? '#242b26' : '#1f2e24'} />
              <path d="M0,220 Q400,200 800,220 L800,450 L0,450 Z" fill={isZone2 ? '#1c281e' : '#14301d'} />
              <path d="M0,260 Q400,240 800,260 L800,450 L0,450 Z" fill={isZone2 ? '#1e3321' : '#1b4325'} />

              {[40, 90, 140, 190, 240, 290, 340, 390, 440, 490, 540, 590, 640, 690, 740].map((x, i) => (
                <g key={i} transform={`translate(${x}, ${240 + (i % 3) * 10})`}>
                  <line x1="0" y1="0" x2={((i % 2) - 0.5) * 20} y2="190" stroke={isZone2 ? '#71717a' : '#15803d'} strokeWidth="4" />
                  <path
                    d={`M0,30 C30,10 60,60 ${((i % 2) - 0.5) * 80},120 C40,90 20,60 0,30`}
                    fill={isZone2 && i === 5 ? 'url(#edgeBlightLeaf)' : 'url(#edgeHealthyLeaf)'}
                    opacity="0.9"
                  />
                  <ellipse cx="0" cy="0" rx="8" ry="24" fill={isZone2 ? '#a1a1aa' : '#86efac'} opacity="0.8" />
                </g>
              ))}

              {isZone2 && (
                <g transform="translate(380, 180)">
                  <ellipse cx="60" cy="80" rx="45" ry="120" transform="rotate(25 60 80)" fill="#a16207" opacity="0.85" />
                  <circle cx="50" cy="50" r="14" fill="#713f12" />
                  <circle cx="70" cy="90" r="18" fill="#451a03" />
                  <circle cx="45" cy="115" r="10" fill="#78350f" />
                </g>
              )}
            </svg>

            {/* Crucial Required Label from Section 9 */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 border border-stone-700 text-xs font-mono font-bold text-emerald-400 backdrop-blur-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>SIMULATED CAMERA FEED</span>
            </div>

            <div className="absolute top-3 right-3 text-xs font-mono text-stone-300 bg-black/75 px-2 py-1 rounded backdrop-blur-xs">
              1080p • 30 FPS • YOLOv8
            </div>

            {/* YOLO Bounding Box */}
            {isZone2 ? (
              <div className="absolute top-[28%] left-[42%] w-[36%] h-[48%] border-2 border-amber-400 bg-amber-400/10 rounded-xs flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-500 text-stone-950 text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-xs">
                    Leaf Blight 94%
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 bg-black/70 px-1 rounded">
                    YOLO-INT8
                  </span>
                </div>
                <div className="text-[10px] font-mono text-amber-200 bg-black/70 p-1 rounded backdrop-blur-xs">
                  Target: Lower Leaf Foliage
                </div>
              </div>
            ) : (
              <div className="absolute top-[35%] left-[30%] w-[38%] h-[42%] border border-emerald-500/70 bg-emerald-500/5 rounded-xs p-2 flex flex-col justify-between">
                <div className="bg-emerald-600 text-white text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded-xs w-max">
                  Healthy Crop Canopy (94% Vigor)
                </div>
                <div className="text-[10px] font-mono text-emerald-300 bg-black/70 px-1.5 py-0.5 rounded w-max">
                  No Pathogen Detected
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-stone-950 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
            <span>Model: YOLOv8-Nano-Edge (Quantized INT8)</span>
            <span className="font-mono text-emerald-400">FPS: 30 • Inference: 14.2ms</span>
          </div>
        </div>

        {/* Right Column: Zone 2 Specific Diagnostic Card (Section 9 Requirement) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-stone-900 text-base">
                  Diagnostic Report — Zone 2
                </h4>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                Action Recommended
              </span>
            </div>

            {/* Exact Required Spec for Zone 2 */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Detection:</span>
                  <span className="font-bold text-rose-700 text-sm">{edgeAiDetection.disease}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Confidence:</span>
                  <span className="font-bold text-amber-800 text-sm">{edgeAiDetection.confidence}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 font-medium">Severity:</span>
                  <span className="font-bold text-amber-800 text-sm">{edgeAiDetection.severity}</span>
                </div>
              </div>

              {/* Exact AI Recommendation string from Section 9 */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800 block text-xs">
                  AI Recommendation:
                </span>
                <p className="text-stone-700 text-xs leading-relaxed italic bg-white p-2.5 rounded-lg border border-stone-200/80">
                  “{edgeAiDetection.recommendation}”
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-stone-800 block text-xs">Symptom Observations:</span>
                {edgeAiDetection.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-stone-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0"></span>
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              onClick={() => setActiveTab('irrigation')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span>Manage Irrigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('advisory')}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span>Full AI Advisory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
