import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DuplicateAnalysisChart({
  exactDuplicates = 4132,
  semanticDuplicates = 824,
  uniqueRemaining = 5468
}) {
  const data = [
    { name: 'Exact Duplicates', value: exactDuplicates, color: '#EF4444' },
    { name: 'Semantic Duplicates', value: semanticDuplicates, color: '#A855F7' },
    { name: 'Unique Retained', value: uniqueRemaining, color: '#10B981' }
  ];

  return (
    <div className="w-full h-64 font-mono text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#FFF' }}
            formatter={(value) => [`${value.toLocaleString()} Records`, 'Volume']}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
