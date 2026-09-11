import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { ChevronLeft, MoreHorizontal, Info, Plus, Check, Play, Pause, RotateCcw } from 'lucide-react';

export default function ActiveWorkoutScreen() {
  const {
    navigateTo,
    workout,
    workoutSeconds,
    isWorkoutTimerRunning,
    setIsWorkoutTimerRunning,
    toggleSetComplete,
    setShowAddSetModal,
    completeWorkout,
    restSecondsLeft,
    isRestTimerRunning,
    isRestTimerVisible,
    togglePauseRestTimer,
    addRestSeconds,
  } = useWorkout();

  // Format mm:ss
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentExercise = workout.currentExercise;

  return (
    <div style={{ padding: '12px 18px 20px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigateTo('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
        >
          <ChevronLeft size={20} />
          <span>Push Day</span>
        </button>

        <button style={{ color: 'var(--text-secondary)' }}>
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* CIRCULAR WORKOUT TIMER HERO */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
        <div
          onClick={() => setIsWorkoutTimerRunning(prev => !prev)}
          title="Click to pause/resume workout timer"
          style={{
            width: '160px',
            height: '76px',
            borderRadius: '100px 100px 0 0',
            border: '3px solid var(--primary)',
            borderBottom: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '16px',
            boxShadow: '0 -6px 20px rgba(0, 229, 153, 0.25)',
            background: 'radial-gradient(ellipse at bottom, rgba(0, 229, 153, 0.12) 0%, transparent 80%)',
            cursor: 'pointer'
          }}
        >
          <span style={{
            fontSize: '28px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '1px',
            color: '#FFFFFF'
          }}>
            {formatTime(workoutSeconds)}
          </span>
          <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px' }}>
            {isWorkoutTimerRunning ? 'WORKOUT TIME' : 'PAUSED'}
          </span>
        </div>
      </div>

      {/* EXERCISE CARD (Bench Press) */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-card)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80"
              alt="Bench Press"
              style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                {currentExercise.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Last: {currentExercise.lastTime}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('exercise_detail')}
            style={{ color: 'var(--text-muted)' }}
            title="View Exercise Details"
          >
            <Info size={18} />
          </button>
        </div>

        {/* SET TABLE HEADER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '32px 1fr 1fr 44px 38px',
          gap: '6px',
          padding: '6px 4px',
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--text-muted)',
          letterSpacing: '0.5px',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <div>SET</div>
          <div>WEIGHT</div>
          <div>REPS</div>
          <div>RPE</div>
          <div>✓</div>
        </div>

        {/* SET ROWS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
          {currentExercise.sets.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 1fr 1fr 44px 38px',
                gap: '6px',
                alignItems: 'center',
                padding: '8px 4px',
                borderRadius: '8px',
                background: s.completed ? 'rgba(0, 229, 153, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                textAlign: 'center',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{s.setNumber}</div>
              <div style={{ fontWeight: 600 }}>{s.weight} <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>kg</span></div>
              <div style={{ fontWeight: 600 }}>{s.reps}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{s.rpe || 8}</div>
              <button
                onClick={() => toggleSetComplete(s.id)}
                style={{
                  width: '28px',
                  height: '28px',
                  margin: '0 auto',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: s.completed ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
                  color: s.completed ? '#0B0F17' : 'transparent',
                  boxShadow: s.completed ? '0 0 8px var(--primary-glow)' : 'none',
                  border: s.completed ? 'none' : '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <Check size={16} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>

        {/* + ADD SET BUTTON */}
        <button
          onClick={() => setShowAddSetModal(true)}
          style={{
            width: '100%',
            marginTop: '12px',
            padding: '10px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Plus size={16} />
          <span>Add Set</span>
        </button>
      </div>

      {/* FLOATING REST TIMER */}
      {isRestTimerVisible && (
        <div style={{
          background: 'rgba(19, 27, 38, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 229, 153, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 229, 153, 0.15)'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Rest</div>
            <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
              {formatTime(restSecondsLeft)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={togglePauseRestTimer}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              {isRestTimerRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={() => addRestSeconds(30)}
              style={{
                padding: '7px 12px',
                borderRadius: '8px',
                background: 'rgba(0, 229, 153, 0.15)',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                border: '1px solid rgba(0, 229, 153, 0.3)'
              }}
            >
              +30s
            </button>
          </div>
        </div>
      )}

      {/* COMPLETE SET / WORKOUT CTA */}
      <button
        onClick={completeWorkout}
        className="btn-primary"
        style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '14px', marginTop: 'auto' }}
      >
        <span>Complete Workout</span>
      </button>
    </div>
  );
}
