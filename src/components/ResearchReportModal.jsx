import React from 'react';
import { FileText, Download, X, CheckCircle2, Zap, BarChart2, Sparkles, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ResearchReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const tokenData = [
    { name: 'Raw Context', tokens: 169, fill: '#8B5CF6' },
    { name: 'Optimized Context', tokens: 93, fill: '#10B981' }
  ];

  const latencyData = [
    { name: 'Raw Latency', latency: 899, fill: '#64748B' },
    { name: 'Optimized Latency', latency: 424, fill: '#10B981' }
  ];

  const handleDownload = () => {
    const reportText = `AI MODEL COMPARISON REPORT: CONTEXT EFFICIENCY & LATENCY BENCHMARK
Project: AI Dataset Optimizer ("Reduce the data. Preserve the intelligence.")

1. EXPERIMENT OVERVIEW
Query: "What is artificial intelligence and what tasks can AI systems perform?"

2. MODEL 1 — RAW DATASET INTELLIGENCE
Context Window: 169 Tokens
Latency: 899 ms
Response: "Artificial intelligence is the simulation of human intelligence by machines. AI systems are designed to perform tasks that normally require human intelligence. Artificial intelligence enables computers to perform tasks that usually require human intelligence. Machine learning is a subset of artificial intelligence that allows systems to learn from data."

3. MODEL 2 — OPTIMIZED DATASET INTELLIGENCE
Context Window: 93 Tokens
Latency: 424 ms
Response: "Artificial intelligence is the simulation of human intelligence by machines. AI systems are designed to perform tasks that normally require human intelligence. Artificial intelligence enables computers to perform tasks that usually require human intelligence."

4. CALCULATED RESULTS
- Context Tokens: 169 -> 93 (44.97% Reduction)
- Latency: 899 ms -> 424 ms (52.84% Reduction)
- Core Answer: Preserved (Semantically Consistent)

5. RESEARCH CONCLUSION
"The experiment demonstrates that intelligent dataset optimization can substantially reduce redundant context while preserving the core information required for downstream AI responses. In this test, context usage decreased by 44.97%, while measured latency decreased by 52.84%. The results support the potential of dataset reduction as a method for improving context efficiency while maintaining semantic consistency."`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Model_Comparison_Report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-yellow-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-slate-950">
                AI MODEL COMPARISON REPORT
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Context Efficiency & Latency Empirical Benchmark
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="neo-btn neo-btn-purple neo-btn-sm text-xs font-bold px-4 py-2"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD REPORT</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Report Content */}
        <div className="p-6 md:p-8 space-y-8 text-slate-800">
          
          {/* Prominent KPI Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-center space-y-1">
              <span className="text-3xl font-black font-heading text-purple-700 block">44.97%</span>
              <span className="text-xs font-mono font-bold text-slate-700">Context Reduction</span>
              <span className="text-[10px] font-mono text-slate-500 block">169 → 93 Tokens</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <span className="text-3xl font-black font-heading text-emerald-600 block">52.84%</span>
              <span className="text-xs font-mono font-bold text-slate-700">Measured Latency Reduction</span>
              <span className="text-[10px] font-mono text-slate-500 block">899 ms → 424 ms</span>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
              <span className="text-3xl font-black font-heading text-blue-700 block">93</span>
              <span className="text-xs font-mono font-bold text-slate-700">Optimized Context Tokens</span>
              <span className="text-[10px] font-mono text-slate-500 block">High-Density Context</span>
            </div>
          </div>

          {/* User Query Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
            <span className="text-xs font-mono text-yellow-400 font-bold uppercase block">
              USER PROMPT QUERY
            </span>
            <p className="text-sm font-sans font-bold text-slate-100">
              "What is artificial intelligence and what tasks can AI systems perform?"
            </p>
          </div>

          {/* Comparison Table */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-base text-slate-950 uppercase tracking-tight">
              1. Benchmark Comparison Table
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Raw Dataset</th>
                    <th className="py-3 px-4">Optimized Dataset</th>
                    <th className="py-3 px-4">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Context Tokens</td>
                    <td className="py-3 px-4 text-slate-600">169</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">93</td>
                    <td className="py-3 px-4 text-purple-700 font-bold">44.97% reduction</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Latency</td>
                    <td className="py-3 px-4 text-slate-600">899 ms</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">424 ms</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">52.84% reduction</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Core Answer</td>
                    <td className="py-3 px-4 text-slate-600">Preserved</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">Preserved</td>
                    <td className="py-3 px-4 text-blue-700 font-bold">Semantically consistent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Analytics Section */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-base text-slate-950 uppercase tracking-tight">
              2. Visual Analytics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bar Chart 1: Tokens */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 block">
                  Raw vs. Optimized Context Tokens
                </span>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tokenData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                      <XAxis dataKey="name" fontSize={11} />
                      <YAxis fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="tokens" barSize={40} radius={[6, 6, 0, 0]}>
                        {tokenData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart 2: Latency */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-700 block">
                  Raw vs. Optimized Latency (ms)
                </span>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latencyData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                      <XAxis dataKey="name" fontSize={11} />
                      <YAxis fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="latency" barSize={40} radius={[6, 6, 0, 0]}>
                        {latencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>

          {/* Research Conclusion Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 to-slate-900 text-white space-y-3 border border-purple-700">
            <span className="text-xs font-mono text-yellow-300 font-bold uppercase block">
              FINAL RESEARCH CONCLUSION
            </span>
            <p className="text-sm font-sans font-medium text-slate-100 leading-relaxed">
              "The experiment demonstrates that intelligent dataset optimization can substantially reduce redundant context while preserving the core information required for downstream AI responses. In this test, context usage decreased by 44.97%, while measured latency decreased by 52.84%. The results support the potential of dataset reduction as a method for improving context efficiency while maintaining semantic consistency."
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
