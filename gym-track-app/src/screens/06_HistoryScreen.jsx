import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { CALENDAR_DAYS, RECENT_WORKOUTS, USER_PROFILE } from '../data/mockData';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Flame, Trophy } from 'lucide-react';

export default function HistoryScreen() {
  const { navigateTo, setSelectedCalendarDay } = useWorkout();
  const [historyTab, setHistoryTab] = useState('calendar');

  const handleSelectDay = (day) => {
    setSelectedCalendarDay(day);
    navigateTo('calendar_detail');
  };

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Title */}
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>
        History
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
        {['calendar', 'workouts'].map((t) => (
          <button
            key={t}
            onClick={() => setHistoryTab(t)}
            style={{
              padding: '6px 0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'capitalize',
              background: historyTab === t ? 'var(--bg-elevated)' : 'transparent',
              color: historyTab === t ? 'var(--text-primary)' : 'var(--text-muted)',
              border: historyTab === t ? '1px solid var(--border-subtle)' : 'none'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* MONTH SELECTOR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button style={{ color: 'var(--text-muted)' }}><ChevronLeft size={18} /></button>
        <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          September 2025
        </span>
        <button style={{ color: 'var(--text-muted)' }}><ChevronRight size={18} /></button>
      </div>

      {/* CALENDAR MATRIX */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px',
        border: '1px solid var(--border-card)'
      }}>
        {/* Day of Week Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontSize: '10px',
          color: 'var(--text-muted)',
          fontWeight: 700,
          marginBottom: '10px'
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          textAlign: 'center'
        }}>
          {CALENDAR_DAYS.map((item) => (
            <div
              key={item.day}
              onClick={() => handleSelectDay(item.day)}
              style={{
                aspectRatio: '1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: item.hasWorkout ? 700 : 400,
                cursor: 'pointer',
                background: item.hasWorkout ? 'var(--primary)' : 'transparent',
                color: item.hasWorkout ? '#070B11' : 'var(--text-muted)',
                boxShadow: item.hasWorkout ? '0 0 8px var(--primary-glow)' : 'none',
                border: item.isSelected ? '2px solid #FFFFFF' : 'none'
              }}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      {/* 3 MONTHLY STAT TILES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '10px 8px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>This Month</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {USER_PROFILE.totalWorkoutsMonth}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Workouts</div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '10px 8px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Current Streak</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
            {USER_PROFILE.currentStreak}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Days</div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '10px 8px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-card)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Longest Streak</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '2px' }}>
            {USER_PROFILE.longestStreak}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Days</div>
        </div>
      </div>

      {/* RECENT WORKOUTS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            Recent Workouts
          </span>
          <button style={{ fontSize: '11px', color: 'var(--text-muted)' }}>See all</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {RECENT_WORKOUTS.map((w) => (
            <div
              key={w.id}
              onClick={() => navigateTo('calendar_detail')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-card)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(0, 229, 153, 0.12)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{w.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {w.date} • {w.duration} • {w.volume}
                  </div>
                </div>
              </div>

              <ChevronRight size={16} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
