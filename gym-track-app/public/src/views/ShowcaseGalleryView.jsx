import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { ExternalLink } from 'lucide-react';

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

const GALLERY_SCREENS = [
  { id: 'onboarding', num: '01', title: 'Onboarding / Welcome', component: <OnboardingScreen /> },
  { id: 'home', num: '02', title: 'Home Dashboard', component: <HomeScreen /> },
  { id: 'active_workout', num: '03', title: 'Active Workout', component: <ActiveWorkoutScreen /> },
  { id: 'exercise_library', num: '04', title: 'Exercise Library', component: <ExerciseLibraryScreen /> },
  { id: 'progress', num: '05', title: 'Progress & 1RM Analytics', component: <ProgressScreen /> },
  { id: 'history', num: '06', title: 'History & Calendar Matrix', component: <HistoryScreen /> },
  { id: 'programs', num: '07', title: 'Workout Programs', component: <ProgramsScreen /> },
  { id: 'exercise_detail', num: '08', title: 'Exercise Detail & Anatomy', component: <ExerciseDetailScreen /> },
  { id: 'add_set', num: '09', title: 'Add Set Modal Sheet', component: <AddSetModal isStandAlone={true} /> },
  { id: 'calendar_detail', num: '10', title: 'Calendar Date Breakdown', component: <CalendarDetailScreen /> },
  { id: 'goals', num: '11', title: 'Goal System Tracking', component: <GoalsScreen /> },
  { id: 'profile', num: '12', title: 'Profile & Settings', component: <ProfileScreen /> },
];

export default function ShowcaseGalleryView() {
  const { navigateTo, setViewMode } = useWorkout();

  const handleOpenInSimulator = (screenId) => {
    navigateTo(screenId);
    setViewMode('device');
  };

  return (
    <div style={{ padding: '24px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800 }}>
          GymTrack Architecture & UI Screen Gallery
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          Trọn bộ 12 màn hình giao diện theo đúng sơ đồ thiết kế UI mockup và cấu trúc kỹ thuật
        </p>
      </div>

      <div className="showcase-grid">
        {GALLERY_SCREENS.map((screen) => (
          <div key={screen.id} className="showcase-card">
            <div className="showcase-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="showcase-number">{screen.num}</span>
                <span className="showcase-title">{screen.title}</span>
              </div>

              <button
                onClick={() => handleOpenInSimulator(screen.id)}
                title="Mở trong iPhone Simulator để tương tác"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: 'var(--primary-subtle)',
                  border: '1px solid rgba(0, 229, 153, 0.2)'
                }}
              >
                <span>Interactive</span>
                <ExternalLink size={12} />
              </button>
            </div>

            <div className="showcase-frame">
              {screen.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
