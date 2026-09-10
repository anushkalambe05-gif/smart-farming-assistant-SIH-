import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useFarm();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = Info;
        let colorClasses = 'border-blue-200 bg-blue-50/95 text-blue-900 shadow-blue-100';
        let iconColor = 'text-blue-600';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          colorClasses = 'border-emerald-200 bg-emerald-50/95 text-emerald-950 shadow-emerald-100';
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClasses = 'border-amber-200 bg-amber-50/95 text-amber-950 shadow-amber-100';
          iconColor = 'text-amber-600';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = 'border-rose-200 bg-rose-50/95 text-rose-950 shadow-rose-100';
          iconColor = 'text-rose-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${colorClasses}`}
          >
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm leading-tight">{toast.title}</div>
              <div className="text-xs mt-1 text-stone-600 leading-normal">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 -mr-1 -mt-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-black/5 transition-colors"
              title="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
