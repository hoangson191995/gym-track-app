import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { WORKOUT_PROGRAMS } from '../data/mockData';
import { Plus, ChevronRight } from 'lucide-react';

export default function ProgramsScreen() {
  const { navigateTo } = useWorkout();
  const [tab, setTab] = useState('my');

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Title */}
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>
        Workout Programs
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
          { id: 'my', label: 'My Programs' },
          { id: 'templates', label: 'Templates' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '7px 0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              background: tab === t.id ? 'var(--bg-elevated)' : 'transparent',
              color: tab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
              border: tab === t.id ? '1px solid var(--border-subtle)' : 'none'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Programs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {WORKOUT_PROGRAMS.map((prog) => (
          <div
            key={prog.id}
            onClick={() => navigateTo('active_workout')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={prog.image}
                alt={prog.title}
                style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  {prog.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {prog.daysPerWeek} • {prog.duration}
                </div>
              </div>
            </div>

            <ChevronRight size={18} color="var(--text-muted)" />
          </div>
        ))}
      </div>

      {/* CREATE NEW PROGRAM BUTTON */}
      <button
        onClick={() => navigateTo('active_workout')}
        className="btn-primary"
        style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: '14px', marginTop: 'auto' }}
      >
        <Plus size={18} />
        <span>Create New Program</span>
      </button>
    </div>
  );
}
