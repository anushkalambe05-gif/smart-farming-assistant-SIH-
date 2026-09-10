import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  historicalDataToday, 
  historicalData7Days, 
  historicalData30Days 
} from '../data/mockData';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  TrendingUp 
} from 'lucide-react';

type TimeRange = 'today' | '7days' | '30days';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const [selectedZone, setSelectedZone] = useState<'all' | 'zone-1' | 'zone-2'>('all');

  const getDataset = () => {
    switch (timeRange) {
      case 'today':
        return historicalDataToday;
      case '7days':
        return historicalData7Days;
      case '30days':
        return historicalData30Days;
    }
  };

  const data = getDataset();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header with Tabs */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Field Telemetry History
            </span>
            <span className="text-xs text-stone-500 font-medium">Recharts Analytics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Historical Agricultural Analytics
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Compare moisture retention, thermal stress, humidity trends, and irrigation volume.
          </p>
        </div>

        {/* Time Tabs & Zone Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time range switcher */}
          <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'today'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '7days'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '30days'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              30 Days
            </button>
          </div>

          {/* Zone filter */}
          <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setSelectedZone('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                selectedZone === 'all'
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Both Zones
            </button>
            <button
              onClick={() => setSelectedZone('zone-1')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                selectedZone === 'zone-1'
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Zone 1
            </button>
            <button
              onClick={() => setSelectedZone('zone-2')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                selectedZone === 'zone-2'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Zone 2
            </button>
          </div>
        </div>
      </div>

      {/* ================= CHART 1: SOIL MOISTURE COMPARISON ================= */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900">
                Soil Moisture Trend (%)
              </h3>
              <p className="text-xs text-stone-500">
                Zone 1 vs Zone 2 capacitive sensor telemetry (Threshold: 35%)
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-stone-400">Range: {timeRange}</span>
        </div>

        <div className="h-64 sm:h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[20, 60]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              {(selectedZone === 'all' || selectedZone === 'zone-1') && (
                <Line 
                  type="monotone" 
                  dataKey="zone1Moisture" 
                  name="Zone 1 Moisture (%)" 
                  stroke="#15803d" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, fill: '#15803d' }} 
                  activeDot={{ r: 6 }} 
                />
              )}
              {(selectedZone === 'all' || selectedZone === 'zone-2') && (
                <Line 
                  type="monotone" 
                  dataKey="zone2Moisture" 
                  name="Zone 2 Moisture (%)" 
                  stroke="#d97706" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 2"
                  dot={{ r: 3, fill: '#d97706' }} 
                  activeDot={{ r: 6 }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= CHARTS 2 & 3 GRID: TEMPERATURE & HUMIDITY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm text-stone-900">
                Ambient Temperature (°C)
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">DHT22 Probe</span>
          </div>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[18, 36]} tick={{ fontSize: 11, fill: '#64748b' }} unit="°C" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  name="Temperature (°C)" 
                  stroke="#d97706" 
                  fillOpacity={1} 
                  fill="url(#tempGrad)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-sm text-stone-900">
                Relative Canopy Humidity (%)
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">Micro-climate</span>
          </div>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="humidityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 90]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="humidity" 
                  name="Humidity (%)" 
                  stroke="#0284c7" 
                  fillOpacity={1} 
                  fill="url(#humidityGrad)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= CHARTS 4 & 5 GRID: CROP HEALTH & WATER USAGE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Health Trend */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-sm text-stone-900">
                Crop Health Index (%)
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">Edge YOLO Vigor</span>
          </div>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="cropHealth" 
                  name="Crop Health (%)" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Usage Liters */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-stone-900">
                Water Usage (Liters)
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">Drip Flowmeter</span>
          </div>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Bar 
                  dataKey="waterUsageLiters" 
                  name="Water (Liters)" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
