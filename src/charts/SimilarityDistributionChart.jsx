import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SimilarityDistributionChart() {
  const data = [
    { range: '0.80 - 0.84', frequency: 3 },
    { range: '0.85 - 0.89', frequency: 12 },
    { range: '0.90 - 0.94', frequency: 45 },
    { range: '0.95 - 0.98', frequency: 32 },
    { range: '0.99 - 1.00', frequency: 8 },
  ];

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderRadius: '12px', 
              color: '#fff', 
              border: 'none',
              fontSize: '12px'
            }}
            formatter={(val) => [val + ' evaluations', 'Frequency']}
          />
          <Area type="monotone" dataKey="frequency" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#simGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
