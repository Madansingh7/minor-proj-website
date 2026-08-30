import React from 'react';
import { AlertTriangle, X, Terminal, RefreshCw } from 'lucide-react';

export default function ErrorBanner({ message, onDismiss, onRetry, isBackendUnavailable = false }) {
  if (!message) return null;

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

  return (
    <div className="saas-card bg-rose-50 border border-rose-200 p-5 my-4 shadow-sm animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl border border-rose-200 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 font-heading">
              {isBackendUnavailable ? 'Backend API Connection Notice' : 'Attention Required'}
            </h4>
            <p className="text-xs font-medium text-slate-700 mt-0.5 leading-relaxed">
              {message}
            </p>

            {isBackendUnavailable && (
              <div className="mt-2 p-2 bg-white border border-rose-200 rounded-lg text-[11px] font-mono text-slate-800">
                Configured Endpoint: <code>{baseUrl}</code> (Set in .env file)
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {onRetry && (
            <button
              onClick={onRetry}
              className="neo-btn neo-btn-white neo-btn-sm text-xs font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="neo-btn neo-btn-white neo-btn-sm p-1.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
