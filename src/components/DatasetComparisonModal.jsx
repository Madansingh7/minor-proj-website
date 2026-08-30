import React, { useState } from 'react';
import { X, Copy, Columns, Check } from 'lucide-react';

export default function DatasetComparisonModal({ isOpen, onClose, rawText, optimizedText }) {
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedOpt, setCopiedOpt] = useState(false);

  if (!isOpen) return null;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawText);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const handleCopyOpt = () => {
    navigator.clipboard.writeText(optimizedText);
    setCopiedOpt(true);
    setTimeout(() => setCopiedOpt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="saas-card bg-white w-full max-w-6xl max-h-[90vh] flex flex-col p-6 overflow-hidden rounded-3xl shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Columns className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">
                DATASET CONTENT COMPARISON
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Side-by-side text view of raw dataset vs intelligently optimized dataset
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="neo-btn neo-btn-pink neo-btn-sm p-1.5"
          >
            <X className="w-5 h-5 text-[#111111]" />
          </button>
        </div>

        {/* Modal Body: Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          
          {/* Raw Dataset Column */}
          <div className="bg-blue-50/40 border border-blue-200 rounded-2xl p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                🔵 RAW DATASET (100% UNCLEANED)
              </span>
              <button
                onClick={handleCopyRaw}
                className="neo-btn neo-btn-white neo-btn-sm text-[11px] py-1"
              >
                {copiedRaw ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedRaw ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="flex-1 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-3 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {rawText || 'No raw dataset loaded.'}
            </div>
          </div>

          {/* Optimized Dataset Column */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                🟢 OPTIMIZED DATASET (REDUCED)
              </span>
              <button
                onClick={handleCopyOpt}
                className="neo-btn neo-btn-white neo-btn-sm text-[11px] py-1"
              >
                {copiedOpt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedOpt ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="flex-1 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl p-3 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {optimizedText || 'Optimization has not been executed yet.'}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="neo-btn neo-btn-primary font-bold text-sm"
          >
            Close View
          </button>
        </div>

      </div>
    </div>
  );
}
