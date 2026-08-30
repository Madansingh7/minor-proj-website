import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessingPipeline from './components/ProcessingPipeline';
import OptimizationWorkspace from './components/OptimizationWorkspace';
import AnalyticsDashboardSection from './components/AnalyticsDashboardSection';
import DatasetComparisonSection from './components/DatasetComparisonSection';
import ModelComparisonSection from './components/ModelComparisonSection';
import ResearchSection from './components/ResearchSection';
import QueryHistorySection from './components/QueryHistorySection';
import ResearchReportModal from './components/ResearchReportModal';
import DownloadSection from './components/DownloadSection';
import DownloadModal from './components/DownloadModal';
import DatasetComparisonModal from './components/DatasetComparisonModal';
import ErrorBanner from './components/ErrorBanner';

// Import Service Layer & Fast Dynamic Reduction Engine
import { optimizeDataset, getModelComparison, computeDynamicReduction } from './services/api';
import { getPromptHistory, savePromptHistoryItem, clearPromptHistory } from './utils/storage';
import { SAMPLE_DATASETS } from './data/sampleDatasets';

export default function App() {
  // Navigation Scroll-Spy State
  const [activeSection, setActiveSection] = useState('overview');

  // Datasets State
  const [rawText, setRawText] = useState('');
  const [rawFile, setRawFile] = useState(null);
  const [optimizedText, setOptimizedText] = useState('');
  const [optimizationStats, setOptimizationStats] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);

  // Prompt & Comparison State
  const [prompt, setPrompt] = useState('');
  const [rawAnswer, setRawAnswer] = useState('');
  const [optimizedAnswer, setOptimizedAnswer] = useState('');
  const [comparison, setComparison] = useState(null);

  // History State
  const [promptHistory, setPromptHistory] = useState([]);
  const [activeHistoryId, setActiveHistoryId] = useState(null);

  // Processing & Job Status State
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [error, setError] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Define 8 Pipeline Stages
  const stagesList = [
    { id: 1, name: 'Upload Dataset', description: 'Corpus file ingested', status: currentStageIndex > 0 ? 'completed' : currentStageIndex === 0 && isProcessing ? 'processing' : 'idle' },
    { id: 2, name: 'Dataset Analysis', description: 'Sentence parsing & segmentation', status: currentStageIndex > 1 ? 'completed' : currentStageIndex === 1 ? 'processing' : 'idle' },
    { id: 3, name: 'Exact Duplicate Detection', description: 'Hash mapping lookup', status: currentStageIndex > 2 ? 'completed' : currentStageIndex === 2 ? 'processing' : 'idle' },
    { id: 4, name: 'Semantic Similarity Analysis', description: 'Vector embeddings & Jaccard overlap', status: currentStageIndex > 3 ? 'completed' : currentStageIndex === 3 ? 'processing' : 'idle' },
    { id: 5, name: 'Redundancy Removal', description: 'Detail filtering & sentence selection', status: currentStageIndex > 4 ? 'completed' : currentStageIndex === 4 ? 'processing' : 'idle' },
    { id: 6, name: 'Optimized Dataset Creation', description: 'Refined dataset generated', status: currentStageIndex > 5 ? 'completed' : currentStageIndex === 5 ? 'processing' : 'idle' },
    { id: 7, name: 'Analytics Generation', description: 'Metrics synthesized', status: currentStageIndex > 6 ? 'completed' : currentStageIndex === 6 ? 'processing' : 'idle' },
    { id: 8, name: 'Ready', description: 'Optimization ready', status: currentStageIndex >= 7 ? 'completed' : 'idle' },
  ];

  // Load initial prompt history
  useEffect(() => {
    const saved = getPromptHistory();
    setPromptHistory(saved);
  }, []);

  // Pre-load default sample on startup and compute dynamic stats
  useEffect(() => {
    if (SAMPLE_DATASETS && SAMPLE_DATASETS.length > 0) {
      const defaultSample = SAMPLE_DATASETS[0];
      setSelectedSample(defaultSample);
      setRawText(defaultSample.text);
      
      const { stats, optimizedText: optText } = computeDynamicReduction(defaultSample.text);
      setOptimizedText(optText);
      setOptimizationStats(stats);
    }
  }, []);

  // IntersectionObserver Scroll-Spy setup for section navigation
  useEffect(() => {
    const sectionIds = ['overview', 'pipeline', 'upload', 'analytics', 'compare-models', 'research', 'history'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Sample selection
  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setRawText(sample.text);
    setRawFile(null);
    
    const { stats, optimizedText: optText } = computeDynamicReduction(sample.text);
    setOptimizedText(optText);
    setOptimizationStats(stats);
    
    setRawAnswer('');
    setOptimizedAnswer('');
    setComparison(null);
    setError('');
    handleNavigate('upload');
  };

  // Run Optimization Workflow with stage progress simulation
  const handleRunOptimization = async () => {
    if (!rawText || !rawText.trim()) {
      setError('Please upload a .TXT file or paste raw dataset text first.');
      return;
    }

    setError('');
    setIsProcessing(true);
    setCurrentStageIndex(0);
    setProgressPercentage(10);

    // Step progression animation
    const stageInterval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev >= 6) {
          clearInterval(stageInterval);
          return 7;
        }
        return prev + 1;
      });
      setProgressPercentage((prev) => Math.min(prev + 14, 95));
    }, 250);

    try {
      const result = await optimizeDataset(rawText);
      clearInterval(stageInterval);
      setCurrentStageIndex(7);
      setProgressPercentage(100);

      setOptimizedText(result.optimizedText);
      setOptimizationStats(result.stats);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setIsProcessing(false);
        handleNavigate('analytics');
      }, 500);
    } catch (err) {
      clearInterval(stageInterval);
      setIsProcessing(false);
      setError(err.message || 'An error occurred during dataset optimization.');
    }
  };

  // Run Model Comparison
  const handleRunComparison = async (promptQuery) => {
    const currentPrompt = promptQuery || prompt;

    if (!currentPrompt || !currentPrompt.trim()) {
      setError('Please enter a question to ask both AI models.');
      return;
    }
    if (!rawText || !optimizedText) {
      setError('Missing optimized dataset. Please click START OPTIMIZATION first.');
      return;
    }

    setError('');
    setComparisonLoading(true);

    try {
      const result = await getModelComparison(currentPrompt, rawText, optimizedText);
      setRawAnswer(result.rawModelResponse);
      setOptimizedAnswer(result.optimizedModelResponse);
      setComparison(result);

      const updatedHistory = savePromptHistoryItem({
        prompt: currentPrompt,
        rawAnswer: result.rawModelResponse,
        optimizedAnswer: result.optimizedModelResponse,
        comparison: result,
        rawText,
        optimizedText
      });
      setPromptHistory(updatedHistory);
      if (updatedHistory.length > 0) {
        setActiveHistoryId(updatedHistory[0].id);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during dual AI model inference.');
    } finally {
      setComparisonLoading(false);
    }
  };

  // Replay history query
  const handleSelectHistoryItem = (item) => {
    setActiveHistoryId(item.id);
    setPrompt(item.prompt);
    setRawAnswer(item.rawAnswer);
    setOptimizedAnswer(item.optimizedAnswer);
    setComparison(item.comparison);
    if (item.rawText) {
      setRawText(item.rawText);
      const { stats, optimizedText: optText } = computeDynamicReduction(item.rawText);
      setOptimizedText(optText);
      setOptimizationStats(stats);
    }
    handleNavigate('compare-models');
  };

  const handleClearHistory = () => {
    clearPromptHistory();
    setPromptHistory([]);
    setActiveHistoryId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col font-sans selection:bg-yellow-200">
      
      {/* 1. Minimalist Scroll-Spy Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main SaaS Layout Flow */}
      <main className="flex-1 space-y-4">
        
        {/* 2. HERO / OVERVIEW SECTION */}
        <Hero
          onUploadClick={() => handleNavigate('upload')}
          onAnalyticsClick={() => handleNavigate('analytics')}
          onPipelineClick={() => handleNavigate('pipeline')}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* 3. INTERACTIVE PROCESSING PIPELINE */}
        <ProcessingPipeline
          isProcessing={isProcessing}
          currentStageIndex={currentStageIndex}
        />

        {/* 4. OPTIMIZATION WORKSPACE & DATASET INPUT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {error && (
            <ErrorBanner
              message={error}
              onDismiss={() => setError('')}
              onRetry={handleRunOptimization}
            />
          )}

          <OptimizationWorkspace
            rawText={rawText}
            setRawText={(text) => {
              setRawText(text);
              if (text && text.trim()) {
                const { stats, optimizedText: optText } = computeDynamicReduction(text);
                setOptimizedText(optText);
                setOptimizationStats(stats);
              }
            }}
            rawFile={rawFile}
            setRawFile={setRawFile}
            onSelectSample={handleSelectSample}
            onRunOptimization={handleRunOptimization}
            isProcessing={isProcessing}
            processingStage={stagesList[currentStageIndex]}
            progressPercentage={progressPercentage}
            stagesList={stagesList}
            error={error}
            onError={(err) => setError(err)}
          />
        </div>

        {/* 5. DATASET ANALYTICS DASHBOARD (EXACTLY 4 PRIMARY CHARTS) */}
        <AnalyticsDashboardSection
          stats={optimizationStats}
          comparison={comparison}
          rawText={rawText}
          optimizedText={optimizedText}
        />

        {/* 6. RAW VS OPTIMIZED COMPARISON */}
        <DatasetComparisonSection
          rawText={rawText}
          optimizedText={optimizedText}
          stats={optimizationStats}
          onOpenModal={() => setIsModalOpen(true)}
        />

        {/* 7. DUAL AI MODEL COMPARISON */}
        <ModelComparisonSection
          prompt={prompt}
          setPrompt={setPrompt}
          rawAnswer={rawAnswer}
          optimizedAnswer={optimizedAnswer}
          comparison={comparison}
          onRunComparison={handleRunComparison}
          loading={comparisonLoading}
          isDisabled={!rawText || !optimizedText}
          suggestedPrompts={selectedSample ? selectedSample.suggestedPrompts : [
            'What is artificial intelligence and what tasks can AI systems perform?',
            'What are the primary causes of latency in LLM processing?',
            'Summarize the core technical findings without redundant details.'
          ]}
        />

        {/* 8. RESEARCH METHODOLOGY & FINDINGS */}
        <ResearchSection onOpenReportModal={() => setIsReportModalOpen(true)} />

        {/* 9. PROMPT QUERY HISTORY */}
        <QueryHistorySection
          historyItems={promptHistory}
          onSelectHistoryItem={handleSelectHistoryItem}
          onClearHistory={handleClearHistory}
          activeHistoryId={activeHistoryId}
        />

        {/* 10. DOWNLOAD CTA */}
        <DownloadSection onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="font-heading font-black text-lg text-yellow-400">
              AI DATASET OPTIMIZER
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Reduce the data. Preserve the intelligence.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Minor Project Platform • Built with React, Vite, Tailwind CSS & Recharts
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ResearchReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        rawText={rawText}
        optimizedText={optimizedText}
        stats={optimizationStats}
        prompt={prompt}
        rawAnswer={rawAnswer}
        optimizedAnswer={optimizedAnswer}
        comparison={comparison}
      />

      <DatasetComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawText={rawText}
        optimizedText={optimizedText}
      />

    </div>
  );
}
