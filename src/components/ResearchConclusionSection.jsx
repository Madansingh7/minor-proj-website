import React from 'react';
import { CheckCircle2, ShieldCheck, Award, FileCheck2, Cpu } from 'lucide-react';

export default function ResearchConclusionSection() {
  const findings = [
    'Main systemic conclusions remained 100% consistent between raw and optimized context',
    'Critical domain knowledge, key figures, and essential technical facts preserved',
    'Redundant phrasing, repeated assertions, and syntactic fluff eliminated',
    'Optimized context generated more direct, clear, and focused AI model answers',
    'LLM prompt token consumption reduced by up to ~35%, reducing context latency'
  ];

  return (
    <section id="conclusion" className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Academic Card */}
        <div className="saas-card bg-gradient-to-b from-[#FAF9F5] to-white p-8 border border-slate-200 shadow-md">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-slate-900 text-yellow-400 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                Academic Evaluation & Viva Synthesis
              </span>
              <h2 className="text-2xl font-black font-heading text-slate-900 tracking-tight">
                RESEARCH CONCLUSION
              </h2>
            </div>
          </div>

          <blockquote className="my-6 p-5 bg-slate-900 text-white rounded-2xl font-heading font-extrabold text-lg sm:text-xl leading-relaxed shadow-sm">
            "Intelligent dataset reduction effectively eliminates redundant prompt-token cost while maintaining downstream AI model answer accuracy."
          </blockquote>

          <div className="space-y-4 my-6">
            <h4 className="text-xs font-bold font-heading uppercase text-slate-500 tracking-wider">
              Empirical Validation Summary:
            </h4>

            <div className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-800 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
            <span>Primary Author / Presenter: Madan</span>
            <span>Refinement Pipeline Core v3.0</span>
          </div>

        </div>

      </div>
    </section>
  );
}
