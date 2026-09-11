import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import MuscleMap from '../components/ui/MuscleMap';
import { ChevronLeft, Bookmark, Play, ChevronRight } from 'lucide-react';

export default function ExerciseDetailScreen() {
  const { navigateTo, selectedExercise } = useWorkout();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const ex = selectedExercise;

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => navigateTo('exercise_library')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 700 }}
        >
          <ChevronLeft size={20} />
          <span>{ex.name}</span>
        </button>

        <button
          onClick={() => setIsBookmarked(prev => !prev)}
          style={{ color: isBookmarked ? 'var(--primary)' : 'var(--text-secondary)' }}
        >
          <Bookmark size={20} fill={isBookmarked ? 'var(--primary)' : 'none'} />
        </button>
      </div>

      {/* Badges / Tags */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
          {ex.muscleGroup}
        </span>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
          {ex.equipment}
        </span>
        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
          {ex.difficulty}
        </span>
      </div>

      {/* Hero Image / Video Preview */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-card)'
      }}>
        <img
          src="/assets/bench-press.jpg"
          alt={ex.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(0, 229, 153, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 229, 153, 0.6)'
          }}>
            <Play size={20} fill="#070B11" color="#070B11" style={{ marginLeft: '2px' }} />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>
          Instructions
        </div>
        <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          {ex.instructions ? ex.instructions.map((step, idx) => (
            <li key={idx}>
              <span>{step}</span>
            </li>
          )) : (
            <>
              <li>Lie on the bench with your feet flat on the floor.</li>
              <li>Grab the bar with a slightly wider than shoulder width grip.</li>
              <li>Keep your back flat and tight.</li>
              <li>Lower the bar to your mid-chest.</li>
              <li>Press back up and repeat.</li>
            </>
          )}
        </ol>
      </div>

      {/* Muscle Group Anatomy Diagram */}
      <MuscleMap primary={ex.muscleGroup} secondary="Triceps" />

      {/* Video Guide Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/assets/bench-press.jpg"
            alt="video guide"
            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>How to Bench Press</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>1:24</div>
          </div>
        </div>

        <ChevronRight size={18} color="var(--text-muted)" />
      </div>
    </div>
  );
}
