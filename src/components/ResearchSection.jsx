import React from 'react';
import { AlertCircle, Cpu, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export default function ResearchSection({ onOpenReportModal }) {
  return (
    <section id="research" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-700 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Academic & Research Contribution
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight">
            RESEARCH METHODOLOGY & FINDINGS
          </h2>
          <p className="text-sm font-medium text-slate-600">
            Empirical evaluation of intelligent dataset distillation for Large Language Model (LLM) context efficiency.
          </p>

          {onOpenReportModal && (
            <div className="pt-2">
              <button
                onClick={onOpenReportModal}
                className="neo-btn neo-btn-purple neo-btn-sm text-xs font-black px-5 py-2.5"
              >
                <Award className="w-4 h-4" />
                <span>OPEN FULL EXPERIMENT REPORT</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Research Pillars Grid (Specification 18) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pillar 1: Problem */}
          <div className="saas-card p-6 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold font-mono">
                1
              </div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Problem Definition
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Large AI training corpora and RAG context windows frequently contain verbatim repeated lines, paraphrased sentence variations, and contradictory assertions. This redundancy bloats context payloads, increases inference latency, and raises API token costs.
            </p>
          </div>

          {/* Pillar 2: Approach */}
          <div className="saas-card p-6 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold font-mono">
                2
              </div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Optimization Approach
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              A 6-stage sequential reduction pipeline combining exact string hash-map deduplication, Jaccard semantic word-set clustering (threshold {`>= 0.60`}), and facts-preserving redundancy filtering to produce a high-density dataset corpus.
            </p>
          </div>

          {/* Pillar 3: Evaluation */}
          <div className="saas-card p-6 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold font-mono">
                3
              </div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Evaluation Methodology
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Dual-model side-by-side inference testing. Identical user prompts are dispatched simultaneously to Model 1 (Raw Dataset Context) and Model 2 (Optimized Dataset Context), measuring cosine semantic similarity and fact retention.
            </p>
          </div>

          {/* Pillar 4: Result */}
          <div className="saas-card p-6 bg-slate-50 border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-mono">
                4
              </div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Empirical Research Results
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Empirical testing demonstrates a 47.9% reduction in dataset volume and a ~44.8% reduction in prompt token usage while maintaining 98.6% answer accuracy and zero degradation in domain response fidelity.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
