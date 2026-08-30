import React from 'react';
import { ArrowRight, ArrowDown, FileText, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { analyzeDatasetText } from '../utils/fileReader';

export default function DatasetComparisonSection({ rawText, optimizedText, stats, onOpenModal }) {
  const rawAnalysis = analyzeDatasetText(rawText);
  const optAnalysis = analyzeDatasetText(optimizedText);

  const origRecords = stats?.originalRecords || rawAnalysis.sentenceCount || 10500;
  const optRecords = stats?.optimizedRecords || optAnalysis.sentenceCount || 5468;
  const reductionPct = stats?.reductionPercentage || (origRecords ? (((origRecords - optRecords) / origRecords) * 100) : 47.9);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-700 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Side-by-Side Corpus Audit
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight">
            RAW VS. OPTIMIZED DATASET COMPARISON
          </h2>
          <p className="text-sm font-medium text-slate-600">
            Direct comparison of structural volume, sentence records, token counts, and file sizes before and after reduction.
          </p>
        </div>

        {/* Reduction Indicator Banner (Specification 14) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl text-center flex flex-col sm:flex-row items-center justify-around gap-6 border border-slate-800">
          
          <div className="text-center">
            <span className="text-xs font-mono text-slate-400 block uppercase">Raw Corpus</span>
            <span className="text-3xl font-black font-heading text-slate-200 mt-1 block">
              {origRecords.toLocaleString()} <span className="text-xs text-slate-400 font-mono">records</span>
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-yellow-400 border border-purple-500/40 flex items-center justify-center font-bold">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
            <span className="text-xs font-mono font-bold text-yellow-400 mt-1">
              {reductionPct.toFixed(1)}% NET REDUCTION
            </span>
          </div>

          <div className="text-center">
            <span className="text-xs font-mono text-slate-400 block uppercase">Optimized Corpus</span>
            <span className="text-3xl font-black font-heading text-emerald-400 mt-1 block">
              {optRecords.toLocaleString()} <span className="text-xs text-slate-400 font-mono">records</span>
            </span>
          </div>

        </div>

        {/* Side-by-Side Metadata Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT: RAW DATASET */}
          <div className="saas-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  RAW DATASET
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Uncleaned Input
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Sentence Records</span>
                <b className="text-slate-900">{origRecords.toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Total Characters</span>
                <b className="text-slate-900">{rawAnalysis.charCount.toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Total Words</span>
                <b className="text-slate-900">{rawAnalysis.wordCount.toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Estimated Prompt Tokens</span>
                <b className="text-blue-600">~{(stats?.originalTokens || rawAnalysis.estimatedTokens).toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Corpus Byte Size</span>
                <b className="text-slate-900">{rawAnalysis.formattedSize}</b>
              </div>
            </div>
          </div>

          {/* RIGHT: OPTIMIZED DATASET */}
          <div className="saas-card p-6 bg-white space-y-4 border-emerald-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  OPTIMIZED DATASET
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Deduplicated Corpus
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Sentence Records</span>
                <b className="text-emerald-700">{optRecords.toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Total Characters</span>
                <b className="text-slate-900">{optAnalysis.charCount.toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Total Words</span>
                <b className="text-slate-900">{optAnalysis.wordCount.toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>Estimated Prompt Tokens</span>
                <b className="text-emerald-600 font-bold">~{(stats?.optimizedTokens || optAnalysis.estimatedTokens).toLocaleString()}</b>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Corpus Byte Size</span>
                <b className="text-slate-900">{optAnalysis.formattedSize}</b>
              </div>
            </div>
          </div>

        </div>

        {/* Modal View Button */}
        {onOpenModal && (
          <div className="text-center">
            <button
              onClick={onOpenModal}
              className="neo-btn neo-btn-white neo-btn-sm text-xs font-bold px-5 py-2.5"
            >
              <Eye className="w-4 h-4" />
              <span>INSPECT SPLIT DATASET DIFF MODAL</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
