import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PipelineFunnelChart({ rawSentences = 10500, exactDupes = 4132, semanticDupes = 824, optimizedSentences = 5468 }) {
  const afterExact = Math.max(optimizedSentences, rawSentences - exactDupes);
  const afterSemantic = optimizedSentences;

  const data = [
    { stage: '1. Raw Dataset', count: rawSentences, fill: '#3B82F6' },
    { stage: '2. Exact Dupes Removal', count: afterExact, fill: '#F59E0B' },
    { stage: '3. Semantic Refinement', count: afterSemantic, fill: '#10B981' },
    { stage: '4. Final Optimized', count: optimizedSentences, fill: '#059669' }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="stage" tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderRadius: '12px', 
              color: '#fff', 
              border: 'none',
              fontSize: '12px'
            }}
            formatter={(val) => [val.toLocaleString() + ' sentences', 'Remaining Dataset Size']}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
