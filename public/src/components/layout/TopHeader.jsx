import React from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import { Smartphone, LayoutGrid, Dumbbell, Sparkles } from 'lucide-react';

export const SCREENS_LIST = [
  { id: 'onboarding', number: '01', title: 'Onboarding' },
  { id: 'home', number: '02', title: 'Home Dashboard' },
  { id: 'active_workout', number: '03', title: 'Active Workout' },
  { id: 'exercise_library', number: '04', title: 'Exercise Library' },
  { id: 'progress', number: '05', title: 'Progress & 1RM' },
  { id: 'history', number: '06', title: 'History & Calendar' },
  { id: 'programs', number: '07', title: 'Workout Programs' },
  { id: 'exercise_detail', number: '08', title: 'Exercise Detail' },
  { id: 'add_set', number: '09', title: 'Add Set Modal' },
  { id: 'calendar_detail', number: '10', title: 'Calendar Detail' },
  { id: 'goals', number: '11', title: 'Goals' },
  { id: 'profile', number: '12', title: 'Profile & Settings' },
];

export default function TopHeader() {
  const { currentScreen, navigateTo, viewMode, setViewMode } = useWorkout();

  return (
    <header className="top-nav-bar">
      <div className="brand-badge">
        <div className="brand-logo-icon">
          <Dumbbell size={18} strokeWidth={2.5} />
        </div>
        <div className="brand-title">
          Gym<span>Track</span>
        </div>
        <span className="version-pill">PROTOTYPE v1.0</span>
      </div>

      <div className="view-mode-toggle">
        <button
          className={`view-mode-btn ${viewMode === 'device' ? 'active' : ''}`}
          onClick={() => setViewMode('device')}
          title="Interactive Mobile Simulator"
        >
          <Smartphone size={14} />
          <span>Interactive Simulator</span>
        </button>
        <button
          className={`view-mode-btn ${viewMode === 'gallery' ? 'active' : ''}`}
          onClick={() => setViewMode('gallery')}
          title="Showcase All 12 Screens Grid"
        >
          <LayoutGrid size={14} />
          <span>12-Screen Showcase</span>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Quick Jump:
        </span>
        <select
          value={currentScreen}
          onChange={(e) => navigateTo(e.target.value)}
          style={{
            padding: '6px 10px',
            fontSize: '12px',
            borderRadius: '8px',
            borderColor: 'var(--border-subtle)',
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {SCREENS_LIST.map((s) => (
            <option key={s.id} value={s.id}>
              {s.number}. {s.title}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
