import React from 'react';
import { 
  Droplets, 
  ShieldAlert, 
  Bug, 
  Sun, 
  CloudRain, 
  WifiOff, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const SolutionsView: React.FC = () => {
  const { setCurrentView, startIrrigation, runCameraScan, zones } = useFarm();

  const isZ2Low = zones['zone-2'].soilMoisture < 50;

  const solutionsData = [
    {
      id: 'sol-water',
      title: 'Water Stress',
      icon: Droplets,
      color: 'sky',
      problem: 'Low soil moisture causing stomatal closure and vegetative stunting.',
      detection: 'Soil moisture sensor (capacitive probe at 15cm) + ambient environmental data.',
      solution: 'Closed-loop smart irrigation recommendation with calibrated water volume.',
      actionLabel: isZ2Low ? 'Start Irrigation (Zone 2)' : 'Review Irrigation Cycle',
      actionView: 'irrigation' as const,
      onAction: () => {
        setCurrentView('irrigation');
        if (isZ2Low) startIrrigation('zone-2', 300);
      },
    },
    {
      id: 'sol-disease',
      title: 'Crop Disease',
      icon: ShieldAlert,
      color: 'emerald',
      problem: 'Possible fungal blight or necrotic leaf lesions during humid canopy conditions.',
      detection: 'Canopy Camera + Edge AI INT8 quantized convolutional crop vision analysis.',
      solution: 'Early foliar warning and localized zone-monitoring recommendation.',
      actionLabel: 'Inspect Affected Crop Area',
      actionView: 'cameras' as const,
      onAction: () => {
        setCurrentView('cameras');
        runCameraScan('cam-2');
      },
    },
    {
      id: 'sol-pest',
      title: 'Pest Attack',
      icon: Bug,
      color: 'amber',
      problem: 'Increasing pest activity (aphid/stem borer) threatening grain filling.',
      detection: 'Camera-based high-res crop monitoring + foliar insect pattern matching.',
      solution: 'Early pest warning before economic threshold damage occurs.',
      actionLabel: 'Inspect Zone 1 & Target Intervention',
      actionView: 'cameras' as const,
      onAction: () => {
        setCurrentView('cameras');
        runCameraScan('cam-1');
      },
    },
    {
      id: 'sol-heat',
      title: 'Heat Stress',
      icon: Sun,
      color: 'orange',
      problem: 'High temperature (>32°C) combined with dry air inducing extreme transpiration.',
      detection: 'Air temperature + humidity + thermal sensor + crop canopy image analysis.',
      solution: 'Heat-stress advisory recommending adjusted evening drip cycle.',
      actionLabel: 'Monitor Moisture & Crop Advisory',
      actionView: 'environment' as const,
      onAction: () => {
        setCurrentView('environment');
      },
    },
    {
      id: 'sol-rain',
      title: 'Excess Rain / Flood Risk',
      icon: CloudRain,
      color: 'blue',
      problem: 'Heavy unseasonal monsoon rainfall causing root waterlogging and root rot.',
      detection: 'Optical tipping-bucket rain sensor + ultrasonic water level + barometric trend.',
      solution: 'Flood-risk alert automatically pausing irrigation and warning of runoff.',
      actionLabel: 'Inspect Drainage & Rainfall Data',
      actionView: 'environment' as const,
      onAction: () => {
        setCurrentView('environment');
      },
    },
    {
      id: 'sol-offline',
      title: 'Poor Connectivity',
      icon: WifiOff,
      color: 'stone',
      problem: 'No continuous cellular or broadband internet in remote rural agricultural acreage.',
      detection: 'LoRa 868MHz local RF mesh nodes transmitting directly to field gateway.',
      solution: '100% on-device Edge AI processing on Raspberry Pi 4.',
      actionLabel: 'Verify Offline Edge Diagnostics',
      actionView: 'settings' as const,
      onAction: () => {
        setCurrentView('settings');
      },
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Full Autonomous Cycle
            </span>
            <span className="text-xs text-stone-500">Problem → Detection → Solution → Action</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            AI Solutions Engine
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            How Smart Farming Assistant solves real problems faced by small and marginal farmers.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Practical Farmer Solutions</span>
        </div>
      </div>

      {/* Solutions Cards List */}
      <div className="space-y-4">
        {solutionsData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Card Title & Icon */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900">{item.title}</h3>
                    <span className="text-xs text-stone-400">Targeted Smallholder Intervention</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Edge AI Verified
                  </span>
                </div>
              </div>

              {/* 4-Step Pipeline: Problem -> Detection -> Solution -> Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* 1. Problem */}
                <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-rose-800 block">
                    1. Problem
                  </span>
                  <p className="font-semibold text-stone-800 leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* 2. Detection */}
                <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-sky-800 block">
                    2. Detection
                  </span>
                  <p className="font-semibold text-stone-800 leading-relaxed">
                    {item.detection}
                  </p>
                </div>

                {/* 3. Solution */}
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-amber-800 block">
                    3. Solution
                  </span>
                  <p className="font-semibold text-stone-800 leading-relaxed">
                    {item.solution}
                  </p>
                </div>

                {/* 4. Action */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex flex-col justify-between space-y-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 block">
                    4. Farmer Action
                  </span>
                  <button
                    onClick={item.onAction}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
