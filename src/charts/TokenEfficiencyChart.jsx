import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function TokenEfficiencyChart({ rawTokens = 11250, optimizedTokens = 6210 }) {
  const data = [
    { name: 'Raw Prompt Context', tokens: rawTokens, fill: '#8B5CF6' },
    { name: 'Optimized AI Context', tokens: optimizedTokens, fill: '#F59E0B' }
  ];

  return (
    <div className="w-full h-64 font-mono text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#FFF' }}
            formatter={(value) => [`${value.toLocaleString()} Tokens`, 'Volume']}
          />
          <Bar dataKey="tokens" radius={[8, 8, 0, 0]} barSize={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
