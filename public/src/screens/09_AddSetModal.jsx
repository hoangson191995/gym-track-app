import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { ChevronLeft, Plus, Minus } from 'lucide-react';

export default function AddSetModal({ isStandAlone = false }) {
  const { navigateTo, addSet, setShowAddSetModal, workout } = useWorkout();

  const [weight, setWeight] = useState(80);
  const [reps, setReps] = useState(8);
  const [setType, setSetType] = useState('working');
  const [rpe, setRpe] = useState(8);
  const [restSeconds, setRestSeconds] = useState(120);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    addSet({
      weight,
      reps,
      setType,
      rpe,
      restSeconds,
      notes
    });
    if (isStandAlone) {
      navigateTo('active_workout');
    }
  };

  const handleBack = () => {
    if (isStandAlone) {
      navigateTo('active_workout');
    } else {
      setShowAddSetModal(false);
    }
  };

  const exerciseName = workout?.currentExercise?.name || "Bench Press";
  const lastTime = workout?.currentExercise?.lastTime || "75kg × 8";

  return (
    <div style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: 'var(--bg-app)',
      height: '100%'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={handleBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 700 }}
        >
          <ChevronLeft size={20} />
          <span>Add Set</span>
        </button>
      </div>

      {/* Exercise Info Card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80"
          alt="exercise"
          style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
        />
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            {exerciseName}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Last: {lastTime}
          </div>
        </div>
      </div>

      {/* WEIGHT & REPS STEPPERS (2 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {/* Weight Stepper */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
            Weight (kg)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setWeight(w => Math.max(0, w - 2.5))}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Minus size={14} />
            </button>

            <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
              {weight}
            </span>

            <button
              onClick={() => setWeight(w => w + 2.5)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Reps Stepper */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
            Reps
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setReps(r => Math.max(1, r - 1))}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Minus size={14} />
            </button>

            <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
              {reps}
            </span>

            <button
              onClick={() => setReps(r => r + 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* SET TYPE SELECTOR */}
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
          Set Type
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
          {[
            { id: 'working', label: 'Working' },
            { id: 'warmup', label: 'Warmup' },
            { id: 'drop', label: 'Drop' },
            { id: 'failure', label: 'Failure' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSetType(type.id)}
              style={{
                padding: '8px 0',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 600,
                background: setType === type.id ? 'var(--primary)' : 'var(--bg-card)',
                color: setType === type.id ? '#0B0F17' : 'var(--text-secondary)',
                border: setType === type.id ? 'none' : '1px solid var(--border-card)',
                boxShadow: setType === type.id ? '0 0 10px var(--primary-glow)' : 'none'
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* RPE SELECTOR */}
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
          RPE (Rate of Perceived Exertion)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
          {[6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => setRpe(num)}
              style={{
                padding: '9px 0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: rpe === num ? 'var(--primary)' : 'var(--bg-card)',
                color: rpe === num ? '#0B0F17' : 'var(--text-secondary)',
                border: rpe === num ? 'none' : '1px solid var(--border-card)',
                boxShadow: rpe === num ? '0 0 10px var(--primary-glow)' : 'none'
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* REST TIME STEPPER */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        border: '1px solid var(--border-card)'
      }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
          Rest Time (seconds)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setRestSeconds(s => Math.max(15, s - 15))}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <Minus size={14} />
          </button>

          <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            {restSeconds}s
          </span>

          <button
            onClick={() => setRestSeconds(s => s + 15)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* NOTES (OPTIONAL) */}
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
          Notes (optional)
        </div>
        <input
          type="text"
          placeholder="e.g. Felt good today, better form"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '12.5px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* SAVE SET CTA */}
      <button
        onClick={handleSave}
        className="btn-primary"
        style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: '14px', marginTop: 'auto' }}
      >
        <span>Save Set</span>
      </button>
    </div>
  );
}
