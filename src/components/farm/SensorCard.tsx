import React from 'react';
import { Droplets, Thermometer, CloudRain, Sun, Activity } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  iconType: 'moisture' | 'temperature' | 'humidity' | 'light' | 'rainfall';
  subtitle?: string;
  trend?: string;
  status?: 'optimal' | 'warning' | 'neutral';
  onClick?: () => void;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit = '',
  iconType,
  subtitle,
  trend,
  status = 'neutral',
  onClick,
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'moisture':
        return <Droplets className="w-5 h-5 text-emerald-600" />;
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-amber-600" />;
      case 'humidity':
        return <Activity className="w-5 h-5 text-sky-600" />;
      case 'light':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'rainfall':
        return <CloudRain className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getStatusBadge = () => {
    if (status === 'optimal') {
      return (
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Optimal
        </span>
      );
    }
    if (status === 'warning') {
      return (
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          Attention
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
        Active
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-emerald-300' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center">
            {getIcon()}
          </div>
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
            {title}
          </span>
        </div>
        {getStatusBadge()}
      </div>

      <div className="my-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            {value}
          </span>
          {unit && <span className="text-sm font-semibold text-stone-500">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-xs text-stone-500 mt-0.5 leading-snug">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span>Telemetry Trend</span>
          <span className="font-medium text-stone-700">{trend}</span>
        </div>
      )}
    </div>
  );
};
