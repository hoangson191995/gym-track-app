import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Dumbbell, ArrowRight } from 'lucide-react';

export default function OnboardingScreen() {
  const { navigateTo } = useWorkout();

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      minHeight: '740px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '32px 24px 44px 24px',
      background: 'url(/assets/hero-bg.jpg) center center / cover no-repeat',
      color: '#FFFFFF'
    }}>
      {/* Dark Cinematic Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(11, 15, 23, 0.25) 0%, rgba(11, 15, 23, 0.6) 40%, rgba(11, 15, 23, 0.96) 80%, #0B0F17 100%)',
        zIndex: 1
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Brand Logo Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #00E599 0%, #00BF7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(0, 229, 153, 0.45)',
          marginBottom: '16px'
        }}>
          <Dumbbell size={36} color="#0B0F17" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '34px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          marginBottom: '8px'
        }}>
          Gym<span style={{ color: 'var(--primary)' }}>Track</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: '1.45',
          maxWidth: '260px',
          marginBottom: '36px'
        }}>
          Track your workouts.<br />
          <span style={{ color: '#E2E8F0', fontWeight: 600 }}>Build a stronger you.</span>
        </p>

        {/* CTA Buttons */}
        <button
          onClick={() => navigateTo('home')}
          className="btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: '15px', borderRadius: '16px', marginBottom: '14px' }}
        >
          <span>Get Started</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigateTo('home')}
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: '8px'
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
