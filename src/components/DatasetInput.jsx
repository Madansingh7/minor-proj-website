import React, { useState } from 'react';
import FileUploader from './FileUploader';
import { SAMPLE_DATASETS } from '../data/sampleDatasets';
import { FileText, Upload, Sparkles, AlertCircle } from 'lucide-react';

export default function DatasetInput({
  rawText,
  setRawText,
  rawFile,
  setRawFile,
  onSelectSample,
  onError
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste' | 'samples'

  const handleFileLoaded = ({ text, file }) => {
    setRawText(text);
    setRawFile(file);
  };

  return (
    <div id="upload" className="saas-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm my-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Workspace Input
          </span>
          <h2 className="text-2xl font-black font-heading text-slate-900 mt-1 tracking-tight">
            1. PROVIDE RAW TEXT DATASET
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Upload a .txt file, paste raw dataset text, or choose from pre-configured sample datasets.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'paste' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paste Text
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'samples' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sample Datasets
          </button>
        </div>
      </div>

      {/* Tab 1: File Uploader */}
      {activeTab === 'upload' && (
        <FileUploader
          onFileLoaded={handleFileLoaded}
          onError={onError}
          loadedFile={rawFile}
        />
      )}

      {/* Tab 2: Textarea Editor */}
      {activeTab === 'paste' && (
        <div className="space-y-3">
          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              setRawFile(null);
            }}
            placeholder="Paste your raw text dataset here (sentences separated by newlines)..."
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all leading-relaxed"
            rows={8}
          />
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>{rawText.length.toLocaleString()} Characters</span>
            <span>~{Math.ceil(rawText.length / 4).toLocaleString()} Est. Tokens</span>
          </div>
        </div>
      )}

      {/* Tab 3: Sample Datasets */}
      {activeTab === 'samples' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_DATASETS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="saas-card p-4 border border-slate-200/80 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                  {sample.category}
                </span>
                <h4 className="font-heading font-extrabold text-sm text-slate-900 mb-1">
                  {sample.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 font-medium mb-3">
                  {sample.description}
                </p>
              </div>

              {/* Action Button */}
              <button className="neo-btn neo-btn-white neo-btn-sm text-xs w-full">
                <span>LOAD THIS SAMPLE</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
