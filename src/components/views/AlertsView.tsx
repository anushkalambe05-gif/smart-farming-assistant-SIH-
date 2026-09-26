import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Clock, 
  RotateCcw, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import type { AlertItem } from '../../types/farm';

export const AlertsView: React.FC = () => {
  const { alerts, markAlertAsRead, dismissAlert, restoreAlerts, setCurrentView, openZoneDetail } = useFarm();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'warnings'>('all');
  const [selectedAlertModal, setSelectedAlertModal] = useState<AlertItem | null>(null);

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedFilter === 'unread') return !alert.isRead;
    if (selectedFilter === 'warnings') return alert.severity === 'warning' || alert.severity === 'critical';
    return true;
  });

  const handleAlertAction = (alert: AlertItem) => {
    markAlertAsRead(alert.id);
    if (alert.actionView) {
      setCurrentView(alert.actionView);
    } else if (alert.zoneId) {
      openZoneDetail(alert.zoneId);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
              Edge Advisory Feed
            </span>
            <span className="text-xs text-stone-500">Autonomous Notifications</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 mt-1">
            Farm Alerts & Notifications
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Triggered automatically when in-situ soil moisture, temperature, or canopy image analysis thresholds are crossed.
          </p>
        </div>

        <button
          onClick={restoreAlerts}
          className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
          <span>Restore Default Alerts</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          All ({alerts.length})
        </button>

        <button
          onClick={() => setSelectedFilter('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedFilter === 'unread'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Unread ({alerts.filter((a) => !a.isRead).length})
        </button>

        <button
          onClick={() => setSelectedFilter('warnings')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedFilter === 'warnings'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Warnings & Critical
        </button>
      </div>

      {/* Alerts Feed */}
      {filteredAlerts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">No active alerts</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            All notifications have been addressed or dismissed. You can restore standard demo alerts anytime.
          </p>
          <button
            onClick={restoreAlerts}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-xs mt-2"
          >
            Restore Default Alerts
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !alert.isRead 
                  ? 'border-emerald-300 shadow-xs ring-1 ring-emerald-100' 
                  : 'border-stone-200 opacity-90'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="pt-0.5">
                  {!alert.isRead && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 block mt-1" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                      {alert.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-stone-100 text-stone-600">
                      {alert.zone}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    “{alert.description}”
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </span>
                    <span>•</span>
                    <span>Autonomous Edge Scan</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Mark Read, Details, Dismiss */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {alert.actionLabel && (
                  <button
                    onClick={() => handleAlertAction(alert)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {!alert.isRead && (
                  <button
                    onClick={() => markAlertAsRead(alert.id)}
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedAlertModal(alert)}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                >
                  Details
                </button>

                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alert Details Modal */}
      {selectedAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">{selectedAlertModal.title}</h3>
              <button 
                onClick={() => setSelectedAlertModal(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {selectedAlertModal.description}
            </p>

            <div className="p-3 rounded-2xl bg-stone-50 text-xs space-y-1 text-stone-600">
              <div><strong>Zone:</strong> {selectedAlertModal.zone}</div>
              <div><strong>Timestamp:</strong> {selectedAlertModal.timestamp}</div>
              <div><strong>Generated by:</strong> Raspberry Pi Decision Rulebook #4</div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedAlertModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
              >
                Close
              </button>
              {selectedAlertModal.actionLabel && (
                <button
                  onClick={() => {
                    handleAlertAction(selectedAlertModal);
                    setSelectedAlertModal(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                >
                  {selectedAlertModal.actionLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
