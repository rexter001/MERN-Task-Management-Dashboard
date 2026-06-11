// src/components/StatsCard.jsx - Reusable metric card for the dashboard overview
// Accepts a label, value, icon, and color scheme

import React from 'react';

export default function StatsCard({ label, value, icon, colorClass, loading }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        {loading ? (
          <div className="h-7 w-12 bg-slate-100 rounded animate-pulse mt-0.5" />
        ) : (
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
}
