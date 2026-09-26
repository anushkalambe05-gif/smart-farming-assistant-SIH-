import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  Minimize2, 
  Scan, 
  Sparkles, 
  MessageSquare, 
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const CamerasView: React.FC = () => {
  const { 
    cameraFeeds, 
    setCurrentView, 
    openZoneDetail, 
    setChatOpen, 
    sendFarmerMessage,
    isScanningCamera,
    scanningCameraId,
    runCameraScan,
    zones
  } = useFarm();

  const [fullScreenCameraId, setFullScreenCameraId] = useState<string | null>(null);
  const isZ2Low = zones['zone-2'].soilMoisture < 50;

  const handleAskAssistant = (camTitle: string) => {
    setChatOpen(true);
    sendFarmerMessage(`Explain AI vision analysis for ${camTitle}.`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header (Section 13) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Canopy Vision
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              SIMULATED CAMERA FEED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Crop Vision
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Distributed canopy optical sensors providing localized leaf segmentation and foliar diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            2 Cameras Online (LoRa Sync)
          </span>
        </div>
      </div>

      {/* Two Cameras Grid (Section 13) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameraFeeds.map((camera) => {
          const isCam1 = camera.id === 'cam-1';
          const isScanningThis = isScanningCamera && scanningCameraId === camera.id;

          return (
            <div
              key={camera.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    <Camera className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-base">
                      {isCam1 ? 'Camera 1' : 'Camera 2'}
                    </h3>
                    <span className="text-xs text-stone-500 font-medium">
                      {isCam1 ? 'Zone 1 (North Sector)' : 'Zone 2 (South Sector)'}
                    </span>
                  </div>
                </div>

                {/* Badges: LIVE, Camera icon, SIMULATED CAMERA FEED */}
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-200 text-[10px] font-black tracking-wider animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    LIVE
                  </span>
                  <button
                    onClick={() => setFullScreenCameraId(camera.id)}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 cursor-pointer"
                    title="Fullscreen Mode"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Feed Display with Animated Scanning Overlay */}
              <div className="relative aspect-[16/10] bg-stone-900 rounded-2xl overflow-hidden shadow-inner group select-none">
                <img
                  src={camera.imageUrl}
                  alt={camera.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient & Overlay Tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* SIMULATED CAMERA FEED tag on image */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-sky-400" />
                  <span>SIMULATED CAMERA FEED</span>
                </div>

                {/* Scanning HUD Overlay when scanning */}
                {isScanningThis && (
                  <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-2xs flex flex-col items-center justify-center p-4">
                    <div className="w-32 h-32 border-2 border-emerald-400 rounded-2xl animate-spin border-dashed" style={{ animationDuration: '6s' }} />
                    <span className="mt-3 px-3 py-1 rounded-full bg-black/80 text-emerald-300 font-mono text-xs font-bold animate-pulse">
                      Scanning Foliage INT8...
                    </span>
                  </div>
                )}

                {/* Bounding box on Camera 2 if water-stressed */}
                {!isCam1 && isZ2Low && !isScanningThis && (
                  <div className="absolute top-1/4 right-1/4 w-32 h-24 border-2 border-dashed border-amber-400 bg-amber-400/10 rounded-lg pointer-events-none flex flex-col justify-between p-1.5 text-[9px] font-mono font-bold text-amber-300">
                    <span>CANOPY STRESS: 78%</span>
                    <span className="self-end">LEAF CURLING</span>
                  </div>
                )}

                {/* Bottom Video Metadata */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                  <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">FPS: 24 • 1080p</span>
                  <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">OV5640 SENSOR</span>
                </div>
              </div>

              {/* Button: Scan Crop */}
              <button
                onClick={() => runCameraScan(camera.id)}
                disabled={isScanningCamera}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Scan className={`w-4 h-4 ${isScanningThis ? 'animate-spin' : ''}`} />
                <span>{isScanningThis ? 'Scanning Crop...' : `Scan Crop (${isCam1 ? 'Camera 1' : 'Camera 2'})`}</span>
              </button>

              {/* ================= DIAGNOSTIC RESULTS (SECTION 13) ================= */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">
                      {isCam1 ? 'Camera 1 Result' : 'Camera 2 Result'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 uppercase tracking-wider">
                    SIMULATED DEMO AI
                  </span>
                </div>

                {isCam1 ? (
                  /* Camera 1 Result Values */
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Crop</span>
                      <span className="font-extrabold text-stone-900">Wheat</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Crop Health</span>
                      <span className="font-extrabold text-emerald-700">92%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Disease Risk</span>
                      <span className="font-extrabold text-emerald-700">8%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Pest Risk</span>
                      <span className="font-extrabold text-amber-700">12%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Water Stress</span>
                      <span className="font-extrabold text-emerald-700">Low</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Nutrient Stress</span>
                      <span className="font-extrabold text-emerald-700">Low</span>
                    </div>
                    <div className="col-span-2 sm:col-span-3 p-1.5 text-center text-[10px] text-stone-500 font-semibold bg-emerald-50 rounded-lg">
                      Confidence Score: <strong>94%</strong>
                    </div>
                  </div>
                ) : (
                  /* Camera 2 Result Values */
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Crop</span>
                      <span className="font-extrabold text-stone-900">Wheat</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Crop Health</span>
                      <span className={`font-extrabold ${isZ2Low ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {isZ2Low ? '78%' : '90%'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Disease Risk</span>
                      <span className="font-extrabold text-emerald-700">12%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Pest Risk</span>
                      <span className="font-extrabold text-amber-700">25%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Water Stress</span>
                      <span className={`font-extrabold ${isZ2Low ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {isZ2Low ? 'High' : 'Low'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold uppercase block">Nutrient Stress</span>
                      <span className="font-extrabold text-amber-700">Medium</span>
                    </div>
                    <div className="col-span-2 sm:col-span-3 p-1.5 text-center text-[10px] text-stone-500 font-semibold bg-amber-50 rounded-lg">
                      Confidence Score: <strong>91%</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: View Zone, Ask Farm Assistant (Section 13) */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setCurrentView('zones');
                    openZoneDetail(camera.zoneId);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>View Zone</span>
                </button>

                <button
                  onClick={() => handleAskAssistant(camera.title)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ask Farm Assistant</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Screen Modal */}
      {fullScreenCameraId && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 sm:p-6 justify-between select-none animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-white pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg">
                {cameraFeeds.find((c) => c.id === fullScreenCameraId)?.title} Fullscreen Stream
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                LIVE
              </span>
            </div>
            <button
              onClick={() => setFullScreenCameraId(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <img
              src={cameraFeeds.find((c) => c.id === fullScreenCameraId)?.imageUrl}
              alt="Fullscreen Camera Feed"
              className="max-h-full max-w-full object-contain rounded-2xl"
            />
          </div>

          <div className="pt-3 text-center text-xs text-stone-400 font-mono">
            Direct RTSP / LoRa low-bandwidth frame sync • Press Close or ESC
          </div>
        </div>
      )}
    </div>
  );
};
