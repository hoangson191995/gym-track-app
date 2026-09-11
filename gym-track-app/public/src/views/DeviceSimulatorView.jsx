import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import BottomNav from '../components/layout/BottomNav';
import { Wifi, Battery, Signal, Trophy, X } from 'lucide-react';

// Import all 12 screens
import OnboardingScreen from '../screens/01_OnboardingScreen';
import HomeScreen from '../screens/02_HomeScreen';
import ActiveWorkoutScreen from '../screens/03_ActiveWorkoutScreen';
import ExerciseLibraryScreen from '../screens/04_ExerciseLibraryScreen';
import ProgressScreen from '../screens/05_ProgressScreen';
import HistoryScreen from '../screens/06_HistoryScreen';
import ProgramsScreen from '../screens/07_ProgramsScreen';
import ExerciseDetailScreen from '../screens/08_ExerciseDetailScreen';
import AddSetModal from '../screens/09_AddSetModal';
import CalendarDetailScreen from '../screens/10_CalendarDetailScreen';
import GoalsScreen from '../screens/11_GoalsScreen';
import ProfileScreen from '../screens/12_ProfileScreen';

export default function DeviceSimulatorView() {
  const {
    currentScreen,
    showAddSetModal,
    setShowAddSetModal,
    showPRModal,
    setShowPRModal,
    navigateTo
  } = useWorkout();

  // Screens that have bottom navigation
  const screensWithBottomNav = [
    'home',
    'exercise_library',
    'progress',
    'history',
    'programs',
    'profile',
    'goals'
  ];
  const hasNav = screensWithBottomNav.includes(currentScreen);

  // Render current active screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'active_workout':
        return <ActiveWorkoutScreen />;
      case 'exercise_library':
        return <ExerciseLibraryScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'programs':
        return <ProgramsScreen />;
      case 'exercise_detail':
        return <ExerciseDetailScreen />;
      case 'add_set':
        return <AddSetModal isStandAlone={true} />;
      case 'calendar_detail':
        return <CalendarDetailScreen />;
      case 'goals':
        return <GoalsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="device-container">
      <div className="iphone-16-pro">
        {/* Dynamic Island */}
        <div className="dynamic-island">
          <div className="island-camera" />
          <div className="island-sensor" />
        </div>

        {/* Status Bar */}
        <div className="phone-status-bar">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>9:41</span>
          <div className="status-icons">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* Scrollable Viewport */}
        <div className={`phone-screen-content ${hasNav ? 'has-nav' : ''}`}>
          {renderScreen()}
        </div>

        {/* Modal Overlay: Add Set Modal Bottom Sheet */}
        {showAddSetModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              background: 'var(--bg-app)',
              borderRadius: '28px 28px 0 0',
              maxHeight: '85%',
              overflowY: 'auto',
              borderTop: '1px solid var(--border-highlight)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.8)'
            }}>
              <AddSetModal isStandAlone={false} />
            </div>
          </div>
        )}

        {/* Modal Overlay: PR Celebration Modal */}
        {showPRModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            <div style={{
              background: 'linear-gradient(145deg, #162234 0%, #0D1420 100%)',
              borderRadius: '24px',
              border: '2px solid var(--primary)',
              padding: '24px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 0 50px rgba(0, 229, 153, 0.35)',
              position: 'relative'
            }}>
              <button
                onClick={() => setShowPRModal(false)}
                style={{ position: 'absolute', top: '14px', right: '14px', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>

              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.2)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
              }}>
                <Trophy size={32} />
              </div>

              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px' }}>
                WORKOUT COMPLETED!
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, margin: '6px 0 12px 0' }}>
                New PR Recorded 🔥
              </h2>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Bench Press: <strong style={{ color: '#FFFFFF' }}>80 kg × 8</strong><br />
                Total Volume: <strong style={{ color: 'var(--primary)' }}>8,240 kg</strong> in 42 mins.
              </p>

              <button
                onClick={() => {
                  setShowPRModal(false);
                  navigateTo('progress');
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', borderRadius: '12px' }}
              >
                View Progress Chart
              </button>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        {hasNav && <BottomNav />}

        {/* Home Bar Indicator */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}
