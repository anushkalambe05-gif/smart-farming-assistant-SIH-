import React from 'react';
import { 
  Sprout, 
  Droplets, 
  Thermometer, 
  WifiOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Bot,
  Camera,
  ShieldCheck,
  Bug,
  Activity,
  CloudSun,
  Scan
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const DashboardView: React.FC = () => {
  const { 
    farmSummary, 
    setCurrentView, 
    openZoneDetail, 
    zones, 
    activities, 
    runAiAnalysis, 
    startIrrigation,
    runCameraScan
  } = useFarm();

  const zone1 = zones['zone-1'];
  const zone2 = zones['zone-2'];
  const isZ2Low = zone2.soilMoisture < 50;

  // Farm Health Score Breakdown (Section 23)
  const healthBreakdown = [
    { label: 'Crop Health', score: 92, status: 'Optimal' },
    { label: 'Soil Condition', score: 85, status: 'Good' },
    { label: 'Water Status', score: isZ2Low ? 78 : 95, status: isZ2Low ? 'Deficit (Z2)' : 'Optimal' },
    { label: 'Pest Risk', score: 82, status: 'Monitoring' },
    { label: 'Disease Risk', score: 94, status: 'Low Risk' },
    { label: 'Environmental Risk', score: 86, status: 'Normal' },
  ];

  const overallHealth = isZ2Low ? 87 : 93;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Greeting & Header (Section 6) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              My Farm
            </span>
            <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
              1 Acre • 2 Zones • Wheat
            </span>
            <span className="text-xs font-extrabold text-emerald-900 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <WifiOff className="w-3 h-3 text-emerald-700" />
              <span>OFFLINE MODE / EDGE AI ACTIVE</span>
            </span>
            <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Bot className="w-3 h-3 text-sky-600" />
              <span>AI MONITORING</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Good Morning, Farmer 👋
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Your local Raspberry Pi 4 Edge AI is actively monitoring sensor nodes and cameras across your 1-acre wheat farm.
          </p>
        </div>

        {/* Overall Farm Health Score Widget (Section 23) */}
        <div className="flex items-center gap-4 bg-stone-50 p-3.5 sm:p-4 rounded-2xl border border-stone-200 self-start md:self-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex flex-col items-center justify-center font-black shadow-md">
            <span className="text-xl leading-none">{overallHealth}%</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-200 mt-0.5">Score</span>
          </div>
          <div>
            <span className="text-xs font-bold text-stone-700 block">Overall Farm Health</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isZ2Low ? 'Attention on Zone 2' : 'All Zones Optimal'}</span>
            </span>
            <span className="text-[10px] text-stone-400">Wheat PBW-550 Canopy</span>
          </div>
        </div>
      </div>

      {/* ================= 6 EXACT CARDS REQUIRED (SECTION 6) ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* 1. Farm Health */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Farm Health</span>
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{overallHealth}%</div>
          <span className="text-xs font-bold text-emerald-700 mt-1 block">Optimal</span>
          <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all duration-700" style={{ width: `${overallHealth}%` }} />
          </div>
        </div>

        {/* 2. Soil Moisture */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>Soil Moisture</span>
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">{farmSummary.soilMoisture}%</div>
          <span className="text-xs font-bold text-emerald-700 mt-1 block">Z1: 64% • Z2: {zone2.soilMoisture}%</span>
          <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full transition-all duration-700" style={{ width: `${farmSummary.soilMoisture}%` }} />
          </div>
        </div>

        {/* 3. Temperature */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-600" />
              <span>Temperature</span>
            </span>
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1">28°C</div>
          <span className="text-xs font-bold text-emerald-700 mt-1 block">Field Ambient</span>
          <span className="text-[10px] text-stone-400 mt-2 block">Normal range</span>
        </div>

        {/* 4. Water Usage */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              <span>Water Usage</span>
            </span>
          </div>
          <div className="text-2xl font-black text-blue-700 mt-1">{farmSummary.waterUsageLiters} L</div>
          <span className="text-xs font-bold text-stone-500 mt-1 block">Drip Conserved</span>
          <span className="text-[10px] text-stone-400 mt-2 block">Tank: 3,200 L</span>
        </div>

        {/* 5. Pest Risk */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <Bug className="w-3.5 h-3.5 text-amber-600" />
              <span>Pest Risk</span>
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">Low</div>
          <span className="text-xs font-bold text-stone-600 mt-1 block">Z1 Activity Mild</span>
          <span className="text-[10px] text-stone-400 mt-2 block">No defoliation</span>
        </div>

        {/* 6. Disease Risk */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Disease Risk</span>
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">Low</div>
          <span className="text-xs font-bold text-emerald-700 mt-1 block">Leaves Clear</span>
          <span className="text-[10px] text-stone-400 mt-2 block">No blight/rust</span>
        </div>
      </div>

      {/* ================= TODAY'S ACTIONS (SECTION 7) ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900">Today's Actions</h2>
            <p className="text-xs text-stone-500">Actionable tasks prioritized by Edge AI for maximum crop yield</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            5 Priorities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Action 1: Irrigate Zone 2 */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
            isZ2Low ? 'bg-amber-50/70 border-amber-300' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-800">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>1. Irrigate Zone 2</span>
              </div>
              <p className="text-xs font-semibold text-stone-700">
                Reason: <strong>Soil moisture is {zone2.soilMoisture}%.</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('irrigation');
                if (isZ2Low) startIrrigation('zone-2', 300);
              }}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isZ2Low
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <span>{isZ2Low ? 'Start Irrigation' : 'Review Irrigation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2: Scan Camera 2 */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-purple-900">
                <Camera className="w-4 h-4 text-purple-600" />
                <span>2. Scan Camera 2</span>
              </div>
              <p className="text-xs font-semibold text-stone-700">
                Reason: <strong>Zone 2 requires crop-health monitoring.</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('cameras');
                runCameraScan('cam-2');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Camera</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3: Monitor Zone 1 */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-emerald-900">
                <Sprout className="w-4 h-4 text-emerald-700" />
                <span>3. Monitor Zone 1</span>
              </div>
              <p className="text-xs font-semibold text-stone-700">
                Reason: <strong>Pest activity is increasing.</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('zones');
                openZoneDetail('zone-1');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Check Zone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 4: Check Weather Risk */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-blue-900">
                <CloudSun className="w-4 h-4 text-blue-600" />
                <span>4. Check Weather Risk</span>
              </div>
              <p className="text-xs font-semibold text-stone-700">
                Reason: <strong>32°C midday heat swing forecasted.</strong>
              </p>
            </div>
            <button
              onClick={() => setCurrentView('environment')}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Environment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 5: Monitor Crop Stress */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-stone-900">
                <Scan className="w-4 h-4 text-stone-700" />
                <span>5. Crop Stress</span>
              </div>
              <p className="text-xs font-semibold text-stone-700">
                Reason: <strong>Calibrate multi-spectral canopy index.</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('ai-insights');
                runAiAnalysis();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Run AI Scan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= FARM HEALTH SCORE BREAKDOWN (SECTION 23) ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-black text-stone-900">
              Farm Health Score Breakdown ({overallHealth}%)
            </h3>
            <p className="text-xs text-stone-500">Multivariate index aggregated by Edge AI</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            6 Indices Evaluated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {healthBreakdown.map((item, idx) => (
            <div key={`h-idx-${idx}`} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">{item.label}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-stone-900">{item.score}%</span>
                <span className={`text-[10px] font-bold ${
                  item.score < 80 ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full ${item.score < 80 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Zones Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zone 1 Card */}
        <div 
          onClick={() => {
            setCurrentView('zones');
            openZoneDetail('zone-1');
          }}
          className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 hover:border-emerald-500 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center">
                Z1
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                  Zone 1 (North Sector)
                </h3>
                <span className="text-xs text-stone-500">0.5 Acre • Wheat PBW-550</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Healthy</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">Soil Moisture</span>
              <span className="text-lg font-black text-emerald-700 mt-0.5 block">{zone1.soilMoisture}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">Temperature</span>
              <span className="text-lg font-black text-stone-900 mt-0.5 block">{zone1.temperature}°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">Irrigation</span>
              <span className="text-sm font-black text-stone-700 mt-1 block">OFF</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <span>Crop Health: <strong className="text-emerald-700 font-bold">92%</strong></span>
            <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Inspect Zone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Zone 2 Card */}
        <div 
          onClick={() => {
            setCurrentView('zones');
            openZoneDetail('zone-2');
          }}
          className={`bg-white rounded-3xl p-5 sm:p-6 border-2 shadow-2xs hover:shadow-sm transition-all cursor-pointer group ${
            isZ2Low ? 'border-amber-300 hover:border-amber-500' : 'border-emerald-200 hover:border-emerald-500'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl font-black flex items-center justify-center ${
                isZ2Low ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
              }`}>
                Z2
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base group-hover:text-amber-800 transition-colors">
                  Zone 2 (South Sector)
                </h3>
                <span className="text-xs text-stone-500">0.5 Acre • Wheat PBW-550</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 border ${
              isZ2Low 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}>
              {isZ2Low ? <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{isZ2Low ? 'Needs Attention' : 'Healthy'}</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 text-xs">
            <div className={`p-2.5 rounded-xl border ${
              isZ2Low ? 'bg-amber-50/70 border-amber-200' : 'bg-stone-50 border-stone-100'
            }`}>
              <span className="text-amber-800 text-[10px] uppercase font-bold block">Soil Moisture</span>
              <span className={`text-lg font-black mt-0.5 block ${
                isZ2Low ? 'text-amber-700' : 'text-emerald-700'
              }`}>
                {zone2.soilMoisture}%
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">Temperature</span>
              <span className="text-lg font-black text-stone-900 mt-0.5 block">{zone2.temperature}°C</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${
              isZ2Low ? 'bg-amber-50/70 border-amber-200' : 'bg-stone-50 border-stone-100'
            }`}>
              <span className="text-amber-800 text-[10px] uppercase font-bold block">Irrigation</span>
              <span className={`text-sm font-black mt-1 block ${
                isZ2Low ? 'text-amber-900' : 'text-emerald-700'
              }`}>
                {zone2.pumpStatus === 'ON' ? 'RUNNING' : isZ2Low ? 'RECOMMENDED' : 'OFF'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <span>Crop Health: <strong className={`font-bold ${isZ2Low ? 'text-amber-800' : 'text-emerald-700'}`}>
              {zone2.cropHealth}%
            </strong></span>
            <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Inspect Zone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-500" />
            <h3 className="text-base font-bold text-stone-900">Recent Farm Activity</h3>
          </div>
          <span className="text-[11px] font-mono text-stone-400">LoRa Telemetry Stream</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activities.slice(0, 4).map((act) => (
            <div key={act.id} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-stone-200/70 font-mono text-stone-700 font-bold text-[10px] inline-block">
                {act.time}
              </span>
              <p className="text-stone-800 font-medium leading-snug">
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
