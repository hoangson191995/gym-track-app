import React from 'react';

export default function MuscleMap({ primary = "Chest", secondary = "Triceps" }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-md)',
      padding: '14px',
      border: '1px solid var(--border-card)',
      margin: '12px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Muscle Groups
        </span>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{primary} (Primary)</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F97316' }} />
            <span style={{ color: 'var(--text-secondary)' }}>{secondary} (Secondary)</span>
          </span>
        </div>
      </div>

      {/* SVG Muscular Silhouette Dual View (Front & Back) */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '6px 0' }}>
        {/* Front View */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="84" height="120" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="18" r="10" fill="#243248" />
            {/* Neck */}
            <path d="M46 28 H54 V34 H46 Z" fill="#243248" />
            {/* Shoulders / Traps */}
            <path d="M32 36 C38 32, 62 32, 68 36 L78 44 L74 54 L66 42 L34 42 L26 54 L22 44 Z" fill="#243248" />
            {/* CHEST (Primary - Highlighted Red) */}
            <path d="M35 43 C42 42, 49 44, 50 48 C51 44, 58 42, 65 43 L63 58 C56 61, 51 59, 50 54 C49 59, 44 61, 37 58 Z" 
                  fill="#EF4444" 
                  filter="drop-shadow(0 0 5px rgba(239, 68, 68, 0.7))" />
            {/* Abs / Core */}
            <path d="M42 60 H58 L56 82 H44 Z" fill="#1C273A" />
            {/* Upper Arms */}
            <path d="M22 46 L30 52 L26 72 L18 66 Z" fill="#243248" />
            <path d="M78 46 L70 52 L74 72 L82 66 Z" fill="#243248" />
            {/* Forearms */}
            <path d="M18 68 L26 74 L22 96 L15 88 Z" fill="#1C273A" />
            <path d="M82 68 L74 74 L78 96 L85 88 Z" fill="#1C273A" />
            {/* Pelvis & Upper Legs */}
            <path d="M40 84 H60 L65 116 H54 L50 94 L46 116 H35 Z" fill="#243248" />
            {/* Calves */}
            <path d="M37 118 H46 L44 138 H38 Z" fill="#1C273A" />
            <path d="M63 118 H54 L56 138 H62 Z" fill="#1C273A" />
          </svg>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Front</span>
        </div>

        {/* Back View */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="84" height="120" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="18" r="10" fill="#243248" />
            {/* Trapezius */}
            <path d="M45 28 H55 L64 36 L50 54 L36 36 Z" fill="#1C273A" />
            {/* Lats */}
            <path d="M36 44 L50 55 L64 44 L60 68 H40 Z" fill="#243248" />
            {/* TRICEPS (Secondary - Highlighted Orange) */}
            <path d="M20 46 L28 52 L24 72 L17 66 Z" 
                  fill="#F97316" 
                  filter="drop-shadow(0 0 4px rgba(249, 115, 22, 0.7))" />
            <path d="M80 46 L72 52 L76 72 L83 66 Z" 
                  fill="#F97316" 
                  filter="drop-shadow(0 0 4px rgba(249, 115, 22, 0.7))" />
            {/* Forearms */}
            <path d="M17 68 L24 74 L21 96 L14 88 Z" fill="#1C273A" />
            <path d="M83 68 L76 74 L79 96 L86 88 Z" fill="#1C273A" />
            {/* Lower Back & Glutes */}
            <path d="M42 68 H58 L64 88 H36 Z" fill="#243248" />
            {/* Hamstrings */}
            <path d="M38 90 H48 L46 116 H36 Z" fill="#1C273A" />
            <path d="M62 90 H52 L54 116 H64 Z" fill="#1C273A" />
            {/* Calves */}
            <path d="M37 118 H45 L43 138 H37 Z" fill="#1C273A" />
            <path d="M63 118 H55 L57 138 H63 Z" fill="#1C273A" />
          </svg>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>Back</span>
        </div>
      </div>
    </div>
  );
}
