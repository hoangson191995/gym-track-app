import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { EXERCISES, EXERCISE_CATEGORIES } from '../data/mockData';
import { Search, ChevronRight } from 'lucide-react';

export default function ExerciseLibraryScreen() {
  const { navigateTo, setSelectedExerciseId } = useWorkout();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesCategory = activeCategory === 'all' || ex.category === activeCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectExercise = (id) => {
    setSelectedExerciseId(id);
    navigateTo('exercise_detail');
  };

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Title */}
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800 }}>
        Exercise Library
      </h1>

      {/* Search Input */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 12px 11px 36px',
            fontSize: '13px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        scrollbarWidth: 'none'
      }}>
        {EXERCISE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: activeCategory === cat.id ? 'var(--primary)' : 'var(--bg-card)',
              color: activeCategory === cat.id ? '#0B0F17' : 'var(--text-secondary)',
              border: activeCategory === cat.id ? 'none' : '1px solid var(--border-card)',
              boxShadow: activeCategory === cat.id ? '0 2px 10px var(--primary-glow)' : 'none'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            onClick={() => handleSelectExercise(ex.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={ex.thumbnail}
                alt={ex.name}
                style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  {ex.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {ex.muscleGroup} • {ex.equipment}
                </div>
              </div>
            </div>

            <ChevronRight size={18} color="var(--text-muted)" />
          </div>
        ))}
      </div>
    </div>
  );
}
