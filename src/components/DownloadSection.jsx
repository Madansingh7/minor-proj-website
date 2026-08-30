import React from 'react';
import { Download, FileText, Code, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DownloadSection({ onOpenDownloadModal }) {
  return (
    <section className="py-16 bg-gradient-to-b from-[#FAF9F5] to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Visually Elegant SaaS Container */}
        <div className="saas-card bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-yellow-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Artifact Package</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
              EXPORT RESEARCH REPORTS & ASSETS
            </h2>

            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              Export raw dataset files, optimized dataset outputs, dual AI model answers, and complete evaluation report packages in `.txt` or `.json` formats.
            </p>
          </div>

          {/* Primary Action Button (Neo-Brutalist Button Style) */}
          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenDownloadModal}
              className="neo-btn neo-btn-primary neo-btn-lg text-lg font-black"
            >
              <Download className="w-6 h-6 text-[#111111]" />
              <span>DOWNLOAD COMPLETE REPORT & ASSETS</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
