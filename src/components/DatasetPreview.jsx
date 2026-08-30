import React, { useState } from 'react';
import { Eye, FileText, Download, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { analyzeDatasetText, getPreviewLines } from '../utils/fileReader';
import { downloadTextFile } from '../utils/reportGenerator';

export default function DatasetPreview({
  text,
  filename = 'raw_dataset.txt',
  title = 'RAW DATASET PREVIEW',
  colorTheme = 'blue'
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const stats = analyzeDatasetText(text);
  const { previewText, hasMore, totalLines } = getPreviewLines(text, isExpanded ? 500 : 80);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadTextFile(filename, text);
  };

  const isBlue = colorTheme === 'blue';
  const bgCardClass = isBlue ? 'bg-blue-50/50 border-blue-200' : 'bg-emerald-50/50 border-emerald-200';

  if (!text) return null;

  return (
    <div className={`saas-card ${bgCardClass} p-5 my-4`}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
              isBlue ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {isBlue ? 'RAW DATASET' : 'OPTIMIZED DATASET'}
            </span>
            <span className="text-xs font-medium text-slate-500 font-mono">
              File: {filename}
            </span>
          </div>
          <h3 className="text-lg font-heading font-extrabold text-slate-900">
            {title}
          </h3>
        </div>

        {/* Quick Actions (Neo-Brutalist Buttons) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="neo-btn neo-btn-white neo-btn-sm text-xs font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Data'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="neo-btn neo-btn-yellow neo-btn-sm text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
        <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Characters</span>
          <span className="text-sm font-black font-mono text-slate-900">{stats.charCount.toLocaleString()}</span>
        </div>
        <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Words</span>
          <span className="text-sm font-black font-mono text-slate-900">{stats.wordCount.toLocaleString()}</span>
        </div>
        <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Sentences</span>
          <span className="text-sm font-black font-mono text-slate-900">{stats.sentenceCount.toLocaleString()}</span>
        </div>
        <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs">
          <span className="block text-[10px] font-bold uppercase text-slate-400">Est. Tokens</span>
          <span className="text-sm font-black font-mono text-slate-900">{stats.estimatedTokens.toLocaleString()}</span>
        </div>
      </div>

      {/* Code Text Viewer */}
      <div className="relative">
        <div className="text-viewer font-mono text-xs max-h-72 overflow-y-auto leading-relaxed border border-slate-200 rounded-xl p-4 bg-slate-900 text-slate-100">
          {previewText}
        </div>

        {hasMore && (
          <div className="mt-3 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="neo-btn neo-btn-white neo-btn-sm text-xs font-bold"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{isExpanded ? 'Collapse Preview' : `View More (${totalLines} Total Lines)`}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
