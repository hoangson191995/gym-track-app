import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { CALENDAR_DAYS, RECENT_WORKOUTS } from '../data/mockData';
import { ChevronLeft, ChevronRight, Clock, Dumbbell } from 'lucide-react';

export default function CalendarDetailScreen() {
  const { navigateTo, selectedCalendarDay, setSelectedCalendarDay } = useWorkout();

  const currentWorkout = RECENT_WORKOUTS[0]; // Push Day Sep 10

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigateTo('history')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 700 }}
        >
          <ChevronLeft size={20} />
          <span>Calendar</span>
        </button>
      </div>

      {/* Month Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button style={{ color: 'var(--text-muted)' }}><ChevronLeft size={16} /></button>
        <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          September 2025
        </span>
        <button style={{ color: 'var(--text-muted)' }}><ChevronRight size={16} /></button>
      </div>

      {/* Compact Calendar Days Grid */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '12px 10px',
        border: '1px solid var(--border-card)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontSize: '9px',
          color: 'var(--text-muted)',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          textAlign: 'center'
        }}>
          {CALENDAR_DAYS.slice(0, 28).map((item) => (
            <div
              key={item.day}
              onClick={() => setSelectedCalendarDay(item.day)}
              style={{
                aspectRatio: '1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: item.hasWorkout ? 700 : 400,
                cursor: 'pointer',
                background: item.day === selectedCalendarDay
                  ? '#FFFFFF'
                  : item.hasWorkout ? 'var(--primary)' : 'transparent',
                color: item.day === selectedCalendarDay
                  ? '#0B0F17'
                  : item.hasWorkout ? '#070B11' : 'var(--text-muted)',
                boxShadow: item.hasWorkout ? '0 0 6px var(--primary-glow)' : 'none',
                border: item.day === selectedCalendarDay ? '2px solid var(--primary)' : 'none'
              }}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED DATE HEADER */}
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
        Sep {selectedCalendarDay}, 2025
      </div>

      {/* WORKOUT SUMMARY CARD */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {/* Workout Name & Meta */}
        <div>
          <div style={{ fontSize: '17px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {currentWorkout.name}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {currentWorkout.duration} • {currentWorkout.volume}
          </div>
        </div>

        {/* Exercises List and Set Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentWorkout.exercises.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px',
                border: '1px solid rgba(255, 255, 255, 0.04)'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                {item.setsText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
