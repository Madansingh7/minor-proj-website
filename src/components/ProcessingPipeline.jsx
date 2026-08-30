import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CopyX, 
  Layers, 
  Filter, 
  CheckCircle, 
  Bot, 
  BarChart2, 
  Check, 
  Info 
} from 'lucide-react';

export default function ProcessingPipeline({ isProcessing, currentStageIndex = 0 }) {
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = [
    {
      id: 1,
      name: 'RAW DATA',
      shortName: 'Ingestion',
      icon: FileText,
      description: 'Raw dataset files (.txt) are ingested into memory for record parsing and line extraction.',
      details: 'Supports UTF-8 text formatting, automatic encoding normalization, and record boundary splitting.'
    },
    {
      id: 2,
      name: 'PARSING',
      shortName: 'Segmentation',
      icon: Search,
      description: 'Splits raw corpus into individual sentence units and extracts textual metadata.',
      details: 'Identifies paragraph breaks, sentence boundaries (.!?), and cleans whitespace artifacts.'
    },
    {
      id: 3,
      name: 'EXACT DUPLICATES',
      shortName: 'Hash Dedupe',
      icon: CopyX,
      description: 'Detects and removes 100% identical line and sentence occurrences using hash sets.',
      details: 'Performs instant hash-map lookups to prune verbatim repeated sentences.'
    },
    {
      id: 4,
      name: 'SEMANTIC SIMILARITY',
      shortName: 'Vector Cluster',
      icon: Layers,
      description: 'Evaluates word-set overlap and sentence embeddings to find paraphrased redundancy.',
      details: 'Computes Jaccard word-set similarity (threshold >= 0.60) to eliminate redundant context.'
    },
    {
      id: 5,
      name: 'REDUNDANCY REMOVAL',
      shortName: 'Filtering',
      icon: Filter,
      description: 'Prunes redundant sentence variations while preserving core domain factual assertions.',
      details: 'Ensures unique domain facts are retained in the final dataset index.'
    },
    {
      id: 6,
      name: 'OPTIMIZED DATA',
      shortName: 'Refinement',
      icon: CheckCircle,
      description: 'Assembles cleaned, high-density sentences into the final optimized dataset.',
      details: 'Generates structured output ready for downstream LLM prompt ingestion.'
    },
    {
      id: 7,
      name: 'MODEL EVALUATION',
      shortName: 'AI Testing',
      icon: Bot,
      description: 'Evaluates identical prompt responses across Raw Model vs. Optimized Model.',
      details: 'Measures accuracy, relevance, context token savings, and response latency.'
    },
    {
      id: 8,
      name: 'ANALYTICS',
      shortName: 'Metrics',
      icon: BarChart2,
      description: 'Synthesizes quantitative metrics, token savings %, and comparative visualizations.',
      details: 'Calculates net reduction, token savings, and accuracy preservation metrics.'
    }
  ];

  return (
    <section id="pipeline" className="py-14 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-700 uppercase bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Sequential Reduction Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 mt-2 tracking-tight">
            INTERACTIVE PROCESSING PIPELINE
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-2">
            Click any pipeline stage to inspect its specific data reduction algorithm and processing responsibility.
          </p>
        </div>

        {/* 8-Stage Interactive Pipeline Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = currentStageIndex > idx || (!isProcessing && currentStageIndex === 0);
            const isActive = isProcessing && currentStageIndex === idx;
            const isSelected = selectedStage?.id === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`relative p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between min-h-[120px] ${
                  isActive
                    ? 'bg-purple-900 text-white border-purple-600 ring-2 ring-purple-400 ring-offset-2 shadow-lg scale-105'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 hover:border-purple-300 text-slate-800 hover:bg-white'
                    : 'bg-slate-50/50 border-slate-200 text-slate-500 opacity-80'
                } ${isSelected ? 'ring-2 ring-slate-900' : ''}`}
              >
                {/* Step Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-purple-700 text-yellow-300' : 'bg-slate-200/70 text-slate-600'
                  }`}>
                    0{stage.id}
                  </span>

                  {isCompleted ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : isActive ? (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
                  ) : null}
                </div>

                {/* Icon & Title */}
                <div className="mt-2 space-y-1">
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-yellow-400' : isCompleted ? 'text-purple-600' : 'text-slate-400'
                  }`} />
                  <div className={`font-heading font-extrabold text-xs leading-tight ${
                    isActive ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stage.name}
                  </div>
                  <div className={`text-[10px] font-mono ${
                    isActive ? 'text-purple-200' : 'text-slate-500'
                  }`}>
                    {stage.shortName}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Drawer */}
        {selectedStage && (
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 shadow-xl animate-fadeIn flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-purple-950/80 border border-purple-700 text-yellow-400 rounded-xl shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                    Stage 0{selectedStage.id} Spec
                  </span>
                  <h4 className="font-heading font-black text-base text-white">
                    {selectedStage.name} ({selectedStage.shortName})
                  </h4>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                  {selectedStage.description}
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  Algorithm Detail: {selectedStage.details}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedStage(null)}
              className="text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 self-end md:self-auto"
            >
              Close Spec
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
