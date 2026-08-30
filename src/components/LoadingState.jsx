import React from 'react';
import { Cpu, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoadingState({
  title = 'AI IS OPTIMIZING YOUR DATASET...',
  subtitle = 'Processing exact deduplication, semantic clustering & contradiction resolution',
  steps = [
    'Analyzing text structure & token length',
    'Detecting exact duplicate lines',
    'Identifying semantic redundancy pairs',
    'Resolving factual contradictions',
    'Generating optimized dataset'
  ],
  currentStepIndex = 2
}) {
  return (
    <div className="neo-card bg-[#A78BFA] border-4 border-[#111111] p-8 my-8 shadow-[8px_8px_0_#111111] text-center">
      
      {/* Animated Icon */}
      <div className="w-20 h-20 bg-[#FFD93D] border-4 border-[#111111] shadow-[4px_4px_0_#111111] rounded-2xl flex items-center justify-center mx-auto mb-6 neo-pulse">
        <Cpu className="w-10 h-10 text-[#111111] spin-slow" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#111111] mb-2">
        {title}
      </h3>
      <p className="text-sm font-extrabold text-[#111111]/90 max-w-lg mx-auto mb-8">
        {subtitle}
      </p>

      {/* Progress Stage Timeline */}
      <div className="max-w-md mx-auto space-y-3 text-left">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`neo-card p-3 border-2 border-[#111111] flex items-center gap-3 transition-all ${
                isDone
                  ? 'bg-[#6EE7B7] text-[#111111]'
                  : isCurrent
                  ? 'bg-[#FFD93D] shadow-[3px_3px_0_#111111] scale-[1.02]'
                  : 'bg-white opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-950 shrink-0" />
              ) : isCurrent ? (
                <RefreshCw className="w-5 h-5 text-[#111111] animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-[#111111] bg-gray-200 shrink-0" />
              )}
              <span className="font-extrabold text-xs font-heading">
                {step}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
