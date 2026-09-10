import React from 'react';
import { X, Camera, ShieldAlert, CheckCircle2 } from 'lucide-react';
import type { ZoneId } from '../../types/farm';

interface CameraFeedModalProps {
  zoneId: ZoneId | null;
  onClose: () => void;
}

export const CameraFeedModal: React.FC<CameraFeedModalProps> = ({ zoneId, onClose }) => {
  if (!zoneId) return null;

  const isZone2 = zoneId === 'zone-2';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-stone-900 text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {isZone2 ? 'Edge Camera 02 — Zone 2 (South Sector)' : 'Edge Camera 01 — Zone 1 (North Sector)'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SIMULATED CAMERA FEED
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Resolution: 1080p • 30 FPS • Local H.264 stream via RTSP (No Cloud Required)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas / Viewport */}
        <div className="relative aspect-video bg-stone-950 flex items-center justify-center overflow-hidden">
          {/* Simulated Farm Imagery using SVG & Canvas-style Graphic */}
          <div className="absolute inset-0 w-full h-full bg-radial from-stone-800 to-stone-950">
            {/* Background wheat canopy art */}
            <svg className="w-full h-full opacity-80" viewBox="0 0 800 450" preserveAspectRatio="none">
              <defs>
                <linearGradient id="leafGradHealthy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
                <linearGradient id="leafGradBlight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="60%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
              </defs>

              {/* Sky background */}
              <rect width="800" height="450" fill={isZone2 ? '#242b26' : '#1f2e24'} />

              {/* Distant farm rows */}
              <path d="M0,220 Q400,200 800,220 L800,450 L0,450 Z" fill={isZone2 ? '#1c281e' : '#14301d'} />
              <path d="M0,260 Q400,240 800,260 L800,450 L0,450 Z" fill={isZone2 ? '#1e3321' : '#1b4325'} />

              {/* Wheat crop foreground stems */}
              {[40, 90, 140, 190, 240, 290, 340, 390, 440, 490, 540, 590, 640, 690, 740].map((x, i) => (
                <g key={i} transform={`translate(${x}, ${240 + (i % 3) * 10})`}>
                  {/* Stem */}
                  <line x1="0" y1="0" x2={((i % 2) - 0.5) * 20} y2="190" stroke={isZone2 ? '#71717a' : '#15803d'} strokeWidth="4" />
                  {/* Leaf */}
                  <path
                    d={`M0,30 C30,10 60,60 ${((i % 2) - 0.5) * 80},120 C40,90 20,60 0,30`}
                    fill={isZone2 && i === 5 ? 'url(#leafGradBlight)' : 'url(#leafGradHealthy)'}
                    opacity="0.9"
                  />
                  {/* Grain head */}
                  <ellipse cx="0" cy="0" rx="8" ry="24" fill={isZone2 ? '#a1a1aa' : '#86efac'} opacity="0.8" />
                </g>
              ))}

              {/* Zone 2 Leaf Blight specific lesions visual */}
              {isZone2 && (
                <g transform="translate(380, 180)">
                  {/* Detailed leaf with blight spots */}
                  <ellipse cx="60" cy="80" rx="45" ry="120" transform="rotate(25 60 80)" fill="#a16207" opacity="0.85" />
                  <circle cx="50" cy="50" r="14" fill="#713f12" />
                  <circle cx="70" cy="90" r="18" fill="#451a03" />
                  <circle cx="45" cy="115" r="10" fill="#78350f" />
                </g>
              )}
            </svg>
          </div>

          {/* Camera HUD Overlays */}
          <div className="absolute top-3 left-3 text-xs font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded backdrop-blur-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>SIMULATED FEED [EDGE YOLO]</span>
            <span className="text-stone-400">| 14.2ms INFERENCE</span>
          </div>

          <div className="absolute top-3 right-3 text-xs font-mono text-stone-300 bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
            {new Date().toLocaleTimeString()} • 1920x1080
          </div>

          {/* YOLO Bounding Box Overlay for Zone 2 */}
          {isZone2 ? (
            <div className="absolute top-[28%] left-[42%] w-[36%] h-[48%] border-2 border-amber-400 bg-amber-400/10 rounded-xs flex flex-col justify-between p-1.5 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500 text-stone-950 text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                  <span>Leaf Blight</span>
                  <span>94%</span>
                </span>
                <span className="text-[10px] font-mono text-amber-300 bg-black/70 px-1 rounded">
                  ID: #LB-204
                </span>
              </div>
              <div className="text-[10px] font-mono text-amber-200 bg-black/70 p-1 rounded backdrop-blur-xs">
                Class: Fungal Necrosis | Severity: Moderate
              </div>
            </div>
          ) : (
            <div className="absolute top-[35%] left-[30%] w-[38%] h-[42%] border border-emerald-500/70 bg-emerald-500/5 rounded-xs p-2 flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded-xs w-max">
                Healthy Canopy (94% Vigor)
              </div>
              <div className="text-[10px] font-mono text-emerald-300 bg-black/70 px-1.5 py-0.5 rounded w-max">
                No Pathogen Detected
              </div>
            </div>
          )}

          {/* Crosshair target in center */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-12 h-12 border border-stone-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {isZone2 ? (
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Attention: Fungal lesion detected. Treatment recommended.
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Optimal vegetative growth detected across Zone 1.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-400">Pipeline:</span>
            <span className="px-2 py-0.5 bg-stone-800 text-stone-200 rounded font-mono text-[11px]">
              OV2640 → ESP32 → LoRa → YOLOv8 INT8
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
