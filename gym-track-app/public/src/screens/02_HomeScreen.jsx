import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { USER_PROFILE, WEEKLY_ACTIVITY, HOME_STATS } from '../data/mockData';
import { Play, Trophy, Flame, Dumbbell, ChevronRight, Check } from 'lucide-react';

export default function HomeScreen() {
  const { navigateTo } = useWorkout();

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Profile Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Good evening,
          </div>
          <div style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            Alex 👋
          </div>
        </div>

        <button
          onClick={() => navigateTo('profile')}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(0, 229, 153, 0.4)',
            padding: 0
          }}
        >
          <img
            src={USER_PROFILE.avatarUrl}
            alt="Alex"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </button>
      </div>

      {/* TODAY'S WORKOUT Hero Card */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #131B26 0%, #1A2638 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '20px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        {/* Background Accent Graphic */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(0, 229, 153, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: '4px' }}>
          TODAY'S WORKOUT
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>
          Push Day
        </h2>

        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          6 exercises • ~60 min
        </div>

        <button
          onClick={() => navigateTo('active_workout')}
          className="btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '12px' }}
        >
          <Play size={16} fill="#070B11" />
          <span>Start Workout</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* THIS WEEK Streak Bar */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            This Week
          </span>
          <button
            onClick={() => navigateTo('history')}
            style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            <span>View Calendar</span>
            <ChevronRight size={12} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 10px',
          border: '1px solid var(--border-card)'
        }}>
          {WEEKLY_ACTIVITY.map((item) => (
            <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                {item.day}
              </span>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: item.completed
                    ? 'var(--primary)'
                    : 'rgba(255, 255, 255, 0.05)',
                  boxShadow: item.completed ? '0 0 10px var(--primary-glow)' : 'none',
                  color: item.completed ? '#0B0F17' : 'transparent'
                }}
              >
                {item.completed && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 STATS TILES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {/* Workouts */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0, 194, 255, 0.12)',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <Flame size={16} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {HOME_STATS.workoutsThisWeek}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Workouts
          </span>
        </div>

        {/* Volume */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--primary-subtle)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <Dumbbell size={16} />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            12,450
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Total Volume
          </span>
        </div>

        {/* PRs */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.12)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <Trophy size={16} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            {HOME_STATS.prsCount}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            PRs
          </span>
        </div>
      </div>

      {/* LATEST PR CARD */}
      <div
        onClick={() => navigateTo('progress')}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid var(--border-card)',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}>
            <Dumbbell size={20} />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
              LATEST PR
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
              {HOME_STATS.latestPR.exercise}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
              {HOME_STATS.latestPR.weight} kg × {HOME_STATS.latestPR.reps}
            </div>
          </div>
        </div>

        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.15)',
          color: 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Trophy size={16} />
        </div>
      </div>
    </div>
  );
}
