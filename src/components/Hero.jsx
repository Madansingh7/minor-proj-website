import React from 'react';
import { Zap, Play, ArrowRight, Layers, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export default function Hero({ onUploadClick, onAnalyticsClick, onPipelineClick, onOpenReportModal }) {
  return (
    <section id="overview" className="relative pt-12 pb-16 overflow-hidden">
      
      {/* Background Micro Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-100/40 via-indigo-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-100/80 border border-yellow-300/80 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-slate-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Reduce the data. Preserve the intelligence.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-slate-950 leading-[1.1]">
              AI Dataset <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Optimizer</span>
            </h1>

            {/* Supporting Explanation */}
            <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl leading-relaxed">
              An intelligent dataset optimization engine that detects exact and semantic redundancy, reduces unnecessary context, and evaluates whether downstream AI responses remain accurate.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* Primary Action Button (Neo-Brutalist Button Style Preserved) */}
              <button
                onClick={onUploadClick}
                className="neo-btn neo-btn-purple neo-btn-lg text-base font-black px-7 py-3.5 shadow-[6px_6px_0_#111111]"
              >
                <Zap className="w-5 h-5 text-[#111111]" />
                <span>START OPTIMIZATION</span>
                <ArrowRight className="w-4 h-4 text-[#111111]" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onPipelineClick || onAnalyticsClick}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300/80 bg-white font-heading font-extrabold text-sm text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Play className="w-4 h-4 text-purple-600" />
                <span>VIEW PIPELINE</span>
              </button>

              {/* Research Report CTA */}
              {onOpenReportModal && (
                <button
                  onClick={onOpenReportModal}
                  className="neo-btn neo-btn-white neo-btn-sm text-xs font-bold px-4 py-3"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>EXPERIMENT REPORT</span>
                </button>
              )}

            </div>

            {/* Micro Feature Bullets */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Exact Deduplication</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Semantic Clustering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Token Savings</span>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Data-Processing Concept Flow Visual */}
          <div className="lg:col-span-5">
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Optimization Visual Pipeline
                  </span>
                </div>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2 py-0.5 rounded">
                  Live Engine
                </span>
              </div>

              {/* Stage Flow Nodes */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Node 1: Large Dataset */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</span>
                    <div>
                      <div className="font-bold text-slate-200">Raw Corpus Ingestion</div>
                      <div className="text-[10px] text-slate-400">10,500 sentence records</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">100% Size</span>
                </div>

                {/* Flow Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="w-0.5 h-3 bg-purple-500/60 animate-pulse" />
                </div>

                {/* Node 2: Semantic Analysis */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/80 border border-purple-500/40 shadow-inner">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</span>
                    <div>
                      <div className="font-bold text-purple-300">Exact & Semantic Analysis</div>
                      <div className="text-[10px] text-purple-400/80">Hash dedupe & vector distance</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">Active Filter</span>
                </div>

                {/* Flow Arrow */}
                <div className="flex justify-center -my-1">
                  <div className="w-0.5 h-3 bg-purple-500/60 animate-pulse" />
                </div>

                {/* Node 3: Optimized Context */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</span>
                    <div>
                      <div className="font-bold text-emerald-300">Optimized AI Context</div>
                      <div className="text-[10px] text-emerald-400/80">5,468 high-density records</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded">
                    47.9% Reduced
                  </span>
                </div>

              </div>

              {/* Bottom Result Callout */}
              <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-800">
                <span className="text-yellow-400 font-bold">44.8% Prompt Token Savings</span> • Preserving Downstream Intelligence
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
