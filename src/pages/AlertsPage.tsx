import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  Check, 
  Trash2, 
  ArrowRight
} from 'lucide-react';
import type { AlertSeverity, TabType } from '../types/farm';

export const AlertsPage: React.FC = () => {
  const { 
    alerts, 
    markAlertAsRead, 
    markAllAlertsAsRead, 
    dismissAlert, 
    setActiveTab, 
    unreadAlertsCount 
  } = useFarm();

  const [filter, setFilter] = useState<'all' | AlertSeverity>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter((a) => a.severity === filter);

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Critical
          </span>
        );
      case 'warning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-700" /> Warning
          </span>
        );
      case 'advisory':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1">
            <Info className="w-3 h-3 text-sky-600" /> Advisory
          </span>
        );
      case 'normal':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-full">
              Notification Center
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {unreadAlertsCount} Unread Alert{unreadAlertsCount === 1 ? '' : 's'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Farm Alerts & Anomaly Logs
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Categorized alerts generated autonomously by the edge decision engine and vision pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadAlertsCount > 0 && (
            <button
              onClick={markAllAlertsAsRead}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Check className="w-4 h-4" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            filter === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          All Categories ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('critical')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            filter === 'critical'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Critical ({alerts.filter((a) => a.severity === 'critical').length})
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            filter === 'warning'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Warning ({alerts.filter((a) => a.severity === 'warning').length})
        </button>
        <button
          onClick={() => setFilter('advisory')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            filter === 'advisory'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Advisory ({alerts.filter((a) => a.severity === 'advisory').length})
        </button>
        <button
          onClick={() => setFilter('normal')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            filter === 'normal'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Normal ({alerts.filter((a) => a.severity === 'normal').length})
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-stone-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-stone-800 text-base">No Alerts in this Category</h4>
            <p className="text-xs text-stone-500">All parameters are currently operating within expected thresholds.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                alert.isRead
                  ? 'border-stone-200 opacity-80'
                  : alert.severity === 'warning'
                  ? 'border-amber-300 bg-amber-50/20'
                  : alert.severity === 'critical'
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="pt-0.5">
                  {getSeverityBadge(alert.severity)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold ${alert.isRead ? 'text-stone-700' : 'text-stone-900'}`}>
                      {alert.title}
                    </h4>
                    {!alert.isRead && (
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-2xl">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-400">
                    <span className="font-semibold text-stone-600">{alert.zone}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                {alert.actionLabel && alert.actionTab && (
                  <button
                    onClick={() => setActiveTab(alert.actionTab as TabType)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {!alert.isRead && (
                  <button
                    onClick={() => markAlertAsRead(alert.id)}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-2 rounded-xl bg-stone-50 hover:bg-rose-50 hover:text-rose-600 text-stone-400 transition-colors"
                  title="Dismiss alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
