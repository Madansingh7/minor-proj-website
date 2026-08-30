import React, { useState } from 'react';
import { Download, X, FileText, Code, Check, Sparkles } from 'lucide-react';
import { downloadTextFile, downloadJsonFile, generateFullReportText } from '../utils/reportGenerator';

export default function DownloadModal({
  isOpen,
  onClose,
  rawText,
  optimizedText,
  stats,
  prompt,
  rawAnswer,
  optimizedAnswer,
  comparison
}) {
  const [downloadSuccess, setDownloadSuccess] = useState('');

  if (!isOpen) return null;

  const triggerFeedback = (label) => {
    setDownloadSuccess(label);
    setTimeout(() => setDownloadSuccess(''), 2500);
  };

  const handleDownloadRaw = () => {
    downloadTextFile('raw_dataset.txt', rawText || '');
    triggerFeedback('Downloaded Raw Dataset');
  };

  const handleDownloadOptimized = () => {
    downloadTextFile('optimized_dataset.txt', optimizedText || '');
    triggerFeedback('Downloaded Optimized Dataset');
  };

  const handleDownloadRawAnswer = () => {
    downloadTextFile('raw_model_answer.txt', rawAnswer || '');
    triggerFeedback('Downloaded Raw Model Answer');
  };

  const handleDownloadOptAnswer = () => {
    downloadTextFile('optimized_model_answer.txt', optimizedAnswer || '');
    triggerFeedback('Downloaded Optimized Model Answer');
  };

  const handleDownloadFullReportTxt = () => {
    const reportStr = generateFullReportText({
      rawText,
      optimizedText,
      stats,
      prompt,
      rawAnswer,
      optimizedAnswer,
      comparison
    });
    downloadTextFile('ai_optimization_report.txt', reportStr);
    triggerFeedback('Downloaded Complete TXT Report');
  };

  const handleDownloadFullReportJson = () => {
    const jsonReport = {
      title: "AI Dataset Optimization & Intelligent Data Reduction Report",
      generatedAt: new Date().toISOString(),
      statistics: stats,
      prompt,
      rawAnswer,
      optimizedAnswer,
      comparison,
      rawDatasetSnippet: (rawText || '').slice(0, 1000),
      optimizedDatasetSnippet: (optimizedText || '').slice(0, 1000)
    };
    downloadJsonFile('ai_optimization_report.json', jsonReport);
    triggerFeedback('Downloaded Complete JSON Report');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="saas-card bg-white w-full max-w-2xl flex flex-col p-6 rounded-3xl shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-100 text-slate-900 rounded-xl border border-yellow-200">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">
                DOWNLOAD EXPERIMENT ASSETS & REPORTS
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Export datasets, model answers, and complete evaluation reports
              </p>
            </div>
          </div>

          <button onClick={onClose} className="neo-btn neo-btn-pink neo-btn-sm p-1.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Download Grid Options */}
        <div className="space-y-4 my-2">
          
          {/* Complete Report Download */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h4 className="font-heading font-extrabold text-sm text-white">
                COMPLETE RESEARCH EVALUATION REPORT
              </h4>
            </div>
            <p className="text-xs text-slate-300 font-medium mb-4">
              Includes full original data, optimized data, reduction statistics, prompt, dual model answers, and similarity evaluation.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadFullReportTxt}
                className="neo-btn neo-btn-primary neo-btn-sm text-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>DOWNLOAD REPORT (.TXT)</span>
              </button>
              <button
                onClick={handleDownloadFullReportJson}
                className="neo-btn neo-btn-white neo-btn-sm text-xs"
              >
                <Code className="w-3.5 h-3.5" />
                <span>DOWNLOAD REPORT (.JSON)</span>
              </button>
            </div>
          </div>

          {/* Individual Assets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50/50 border border-blue-200 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="block font-heading font-extrabold text-xs text-slate-900">Raw Dataset</span>
                <span className="text-[10px] text-slate-500 font-mono">raw_dataset.txt</span>
              </div>
              <button
                onClick={handleDownloadRaw}
                disabled={!rawText}
                className="neo-btn neo-btn-blue neo-btn-sm text-xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="block font-heading font-extrabold text-xs text-slate-900">Optimized Dataset</span>
                <span className="text-[10px] text-slate-500 font-mono">optimized_dataset.txt</span>
              </div>
              <button
                onClick={handleDownloadOptimized}
                disabled={!optimizedText}
                className="neo-btn neo-btn-green neo-btn-sm text-xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-blue-50/50 border border-blue-200 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="block font-heading font-extrabold text-xs text-slate-900">Raw Model Answer</span>
                <span className="text-[10px] text-slate-500 font-mono">raw_model_answer.txt</span>
              </div>
              <button
                onClick={handleDownloadRawAnswer}
                disabled={!rawAnswer}
                className="neo-btn neo-btn-white neo-btn-sm text-xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="block font-heading font-extrabold text-xs text-slate-900">Optimized Answer</span>
                <span className="text-[10px] text-slate-500 font-mono">optimized_answer.txt</span>
              </div>
              <button
                onClick={handleDownloadOptAnswer}
                disabled={!optimizedAnswer}
                className="neo-btn neo-btn-white neo-btn-sm text-xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-4 mt-2 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="neo-btn neo-btn-black text-xs font-bold">
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
