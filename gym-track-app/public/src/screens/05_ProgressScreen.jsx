import React, { useState } from 'react';
import { PROGRESS_DATA } from '../data/mockData';
import { TrendingUp, Award, Activity, Layers } from 'lucide-react';

export default function ProgressScreen() {
  const [tab, setTab] = useState('strength');
  const data = PROGRESS_DATA;

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Screen Title */}
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>
        Progress
      </h1>

      {/* Segmented Control */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'var(--bg-card)',
        padding: '3px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-card)'
      }}>
        {[
          { id: 'strength', label: 'Strength' },
          { id: 'volume', label: 'Volume' },
          { id: 'body', label: 'Body' },
          { id: 'pr', label: 'PR' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '6px 0',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              background: tab === t.id ? 'var(--bg-elevated)' : 'transparent',
              color: tab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: tab === t.id ? 'var(--shadow-sm)' : 'none',
              border: tab === t.id ? '1px solid var(--border-subtle)' : 'none'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Exercise Growth Header */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80"
              alt="Bench"
              style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
              {data.exercise}
            </span>
          </div>

          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--primary)',
            background: 'var(--primary-subtle)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(0, 229, 153, 0.25)'
          }}>
            +{data.growthPercent}% <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{data.period}</span>
          </span>
        </div>

        {/* SVG Interactive Line Chart */}
        <div style={{ position: 'relative', width: '100%', height: '140px' }}>
          <svg width="100%" height="100%" viewBox="0 0 300 130" fill="none">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="0" y1="110" x2="300" y2="110" stroke="rgba(255,255,255,0.05)" />

            {/* Gradient Fill under Line */}
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E599" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00E599" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path
              d="M 15 105 Q 60 95, 80 88 T 135 78 T 190 60 T 245 42 T 285 24 L 285 110 L 15 110 Z"
              fill="url(#chartGlow)"
            />

            {/* Neon Chart Stroke Line */}
            <path
              d="M 15 105 Q 60 95, 80 88 T 135 78 T 190 60 T 245 42 T 285 24"
              stroke="#00E599"
              strokeWidth="3"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px rgba(0, 229, 153, 0.6))"
            />

            {/* Data Points */}
            <circle cx="15" cy="105" r="3" fill="#00E599" />
            <circle cx="80" cy="88" r="3" fill="#00E599" />
            <circle cx="135" cy="78" r="3" fill="#00E599" />
            <circle cx="190" cy="60" r="3" fill="#00E599" />
            <circle cx="245" cy="42" r="3" fill="#00E599" />
            <circle cx="285" cy="24" r="5" fill="#FFFFFF" stroke="#00E599" strokeWidth="3" />
          </svg>

          {/* Month Labels */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            padding: '0 8px'
          }}>
            {data.historyPoints.map((p) => (
              <span key={p.month}>{p.month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 4 STATS 2x2 GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current</div>
          <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
            {data.current}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Best Set</div>
          <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
            {data.bestSet}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Est. 1RM</div>
          <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginTop: '2px' }}>
            {data.est1RM}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Volume</div>
          <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
            {data.totalVolume}
          </div>
        </div>
      </div>

      {/* MUSCLE GROUP VOLUME */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        border: '1px solid var(--border-card)'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
          Muscle Group Volume
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.muscleVolume.map((item) => (
            <div key={item.group} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', width: '64px' }}>
                {item.group}
              </span>
              <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '99px' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', width: '60px', textAlign: 'right' }}>
                {item.volume}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
