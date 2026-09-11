import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { GOALS_DATA } from '../data/mockData';
import { Check, Target, Flame, Layers, Plus } from 'lucide-react';

export default function GoalsScreen() {
  const { navigateTo } = useWorkout();
  const [goalTab, setGoalTab] = useState('active');

  const getIcon = (cat) => {
    switch (cat) {
      case 'strength': return <Check size={14} strokeWidth={3} />;
      case 'weight': return <Target size={14} />;
      case 'consistency': return <Flame size={14} />;
      default: return <Layers size={14} />;
    }
  };

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Title */}
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>
        Goals
      </h1>

      {/* Segmented Control */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        background: 'var(--bg-card)',
        padding: '3px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-card)'
      }}>
        {[
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setGoalTab(t.id)}
            style={{
              padding: '7px 0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              background: goalTab === t.id ? 'var(--bg-elevated)' : 'transparent',
              color: goalTab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
              border: goalTab === t.id ? '1px solid var(--border-subtle)' : 'none'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {GOALS_DATA.map((g) => (
          <div
            key={g.id}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              border: '1px solid var(--border-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: `${g.color}25`,
                  color: g.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getIcon(g.category)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    {g.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {g.subtitle}
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {g.percent}%
              </span>
            </div>

            {/* Progress Bar & Value */}
            <div>
              <div style={{
                height: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '99px',
                overflow: 'hidden',
                marginBottom: '6px'
              }}>
                <div style={{ width: `${g.percent}%`, height: '100%', background: g.color, borderRadius: '99px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>{g.current} / {g.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* + ADD NEW GOAL */}
      <button
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: 'auto'
        }}
      >
        <Plus size={16} />
        <span>Add New Goal</span>
      </button>
    </div>
  );
}
