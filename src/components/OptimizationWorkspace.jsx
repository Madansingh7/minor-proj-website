import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Zap, 
  Check, 
  RotateCcw, 
  Database, 
  Layers, 
  AlertCircle,
  FileCheck,
  BarChart2
} from 'lucide-react';
import { SAMPLE_DATASETS } from '../data/sampleDatasets';
import { analyzeDatasetText } from '../utils/fileReader';

export default function OptimizationWorkspace({
  rawText,
  setRawText,
  rawFile,
  setRawFile,
  onSelectSample,
  onRunOptimization,
  isProcessing,
  processingStage,
  progressPercentage,
  stagesList,
  error,
  onError
}) {
  const [inputTab, setInputTab] = useState('upload'); // 'upload' | 'paste' | 'samples'
  const [dragActive, setDragActive] = useState(false);

  // Compute live dataset text metadata
  const textAnalysis = analyzeDatasetText(rawText);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    if (!file.name.endsWith('.txt') && file.type !== 'text/plain') {
      if (onError) onError('Invalid file format. Please upload a standard .TXT dataset file.');
      return;
    }
    setRawFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      setRawText(evt.target.result || '');
    };
    reader.readAsText(file);
  };

  return (
    <section id="upload" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-700 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Stage 1 — Workspace Setup
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight">
            START OPTIMIZATION WORKSPACE
          </h2>
          <p className="text-sm font-medium text-slate-600">
            Upload your `.txt` dataset, paste raw context text, or pick a research sample to trigger intelligent data reduction.
          </p>
        </div>

        {/* Input Option Selector Tabs */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto bg-slate-200/60 p-1 rounded-xl border border-slate-300/40">
          <button
            onClick={() => setInputTab('upload')}
            className={`flex-1 py-2 text-xs font-heading font-extrabold rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputTab === 'upload' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>

          <button
            onClick={() => setInputTab('paste')}
            className={`flex-1 py-2 text-xs font-heading font-extrabold rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputTab === 'paste' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste Text</span>
          </button>

          <button
            onClick={() => setInputTab('samples')}
            className={`flex-1 py-2 text-xs font-heading font-extrabold rounded-lg transition-all flex items-center justify-center gap-2 ${
              inputTab === 'samples' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-purple-600" />
            <span>Sample Data</span>
          </button>
        </div>

        {/* Tab 1: Upload File Drag & Drop */}
        {inputTab === 'upload' && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`saas-card p-8 text-center transition-all border-2 border-dashed ${
              dragActive ? 'border-purple-500 bg-purple-50/50' : 'border-slate-300 bg-white hover:border-slate-400'
            }`}
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-sm">
                <Upload className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  {rawFile ? rawFile.name : 'Drag & drop your .TXT dataset here'}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Supports standard text corpora up to 50MB. Asynchronously processed on backend.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <label className="neo-btn neo-btn-white neo-btn-sm text-xs font-bold cursor-pointer">
                  <span>SELECT FILE</span>
                  <input
                    type="file"
                    accept=".txt,text/plain"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Paste Raw Text */}
        {inputTab === 'paste' && (
          <div className="saas-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-600">
                RAW DATASET EDITOR / PASTE REGION
              </span>
              <span className="text-xs font-mono text-slate-400">
                {textAnalysis.lineCount} lines • {textAnalysis.formattedSize}
              </span>
            </div>

            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw text sentences or paragraphs here to test deduplication and semantic reduction..."
              className="w-full p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
            />
          </div>
        )}

        {/* Tab 3: Sample Datasets */}
        {inputTab === 'samples' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_DATASETS.map((sample) => (
              <div
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className="saas-card hover:border-purple-300 cursor-pointer p-5 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 uppercase">
                      Research Sample
                    </span>
                    <Database className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-slate-900 mt-2">
                    {sample.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {sample.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-600">
                  <span>~{sample.text.split('\n').filter(Boolean).length} Sentences</span>
                  <span className="text-purple-600 font-extrabold group-hover:underline">Load Sample →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Active Dataset Metadata Badges */}
        {rawText && rawText.trim() && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-fadeIn">
            
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-slate-900">
                    ACTIVE DATASET INGESTED
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {rawFile ? rawFile.name : 'pasted_dataset.txt'}
                  </p>
                </div>
              </div>

              {/* Metadata Badges Grid */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
                  Size: <b>{textAnalysis.formattedSize}</b>
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
                  Chars: <b>{textAnalysis.charCount.toLocaleString()}</b>
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
                  Words: <b>{textAnalysis.wordCount.toLocaleString()}</b>
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
                  Sentences: <b>{textAnalysis.sentenceCount.toLocaleString()}</b>
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg border border-purple-200 font-bold">
                  Tokens: ~<b>{textAnalysis.estimatedTokens.toLocaleString()}</b>
                </span>
              </div>
            </div>

            {/* Main Primary Trigger Button (Preserved Neo-Brutalist Style) */}
            <div className="text-center py-2">
              <button
                onClick={onRunOptimization}
                disabled={isProcessing}
                className="neo-btn neo-btn-purple neo-btn-lg text-lg font-black px-10 py-4 shadow-[8px_8px_0_#111111]"
              >
                <Zap className="w-6 h-6 text-[#111111]" />
                <span>{isProcessing ? 'OPTIMIZING DATASET...' : 'START OPTIMIZATION'}</span>
                <Sparkles className="w-5 h-5 text-[#111111]" />
              </button>
            </div>

          </div>
        )}

        {/* Live Processing Stage UI (Specification 4 Progress Display) */}
        {isProcessing && (
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-5 animate-fadeIn border border-slate-800">
            
            {/* Stage Progress Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-yellow-400 tracking-wider uppercase">
                  ACTIVE PROCESSING WORKFLOW
                </span>
                <h3 className="font-heading font-black text-xl text-white mt-0.5">
                  {processingStage ? processingStage.name : 'ANALYZING DATASET...'}
                </h3>
              </div>

              {/* Progress Percentage Badge */}
              <div className="text-right">
                <span className="text-3xl font-black font-heading text-yellow-400">
                  {progressPercentage || 62}%
                </span>
                <span className="block text-[11px] font-mono text-slate-400">
                  Stage {(processingStage?.id || 3)} / 8
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage || 62}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Status: {processingStage?.description || 'Executing sentence reduction...'}</span>
                <span>Asynchronous Polling Engine</span>
              </div>
            </div>

            {/* Stages Checklist */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-xs font-mono">
              {stagesList.map((stg) => (
                <div
                  key={stg.id}
                  className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                    stg.status === 'completed'
                      ? 'bg-slate-850 border-emerald-500/40 text-emerald-300'
                      : stg.status === 'processing'
                      ? 'bg-purple-950/80 border-purple-500 text-yellow-300 ring-1 ring-purple-500'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-500'
                  }`}
                >
                  {stg.status === 'completed' ? (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : stg.status === 'processing' ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span className="truncate">{stg.name}</span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
