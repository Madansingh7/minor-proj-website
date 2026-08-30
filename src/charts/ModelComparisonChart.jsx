import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ModelComparisonChart({
  rawAccuracy = 98.6,
  optAccuracy = 98.6,
  rawRelevance = 97.4,
  optRelevance = 97.4,
  rawLatencyMs = 1420,
  optLatencyMs = 780
}) {
  const data = [
    { metric: 'Accuracy %', rawModel: rawAccuracy, optModel: optAccuracy },
    { metric: 'Relevance %', rawModel: rawRelevance, optModel: optRelevance },
    { metric: 'Latency (ms)', rawModel: rawLatencyMs, optModel: optLatencyMs }
  ];

  return (
    <div className="w-full h-64 font-mono text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="metric" stroke="#64748B" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#FFF' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="rawModel" name="Raw Model" fill="#64748B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="optModel" name="Optimized Model" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
