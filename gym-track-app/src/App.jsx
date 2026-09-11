import React from 'react';
import { WorkoutProvider, useWorkout } from './context/WorkoutContext';
import TopHeader, { SCREENS_LIST } from './components/layout/TopHeader';
import DeviceSimulatorView from './views/DeviceSimulatorView';
import ShowcaseGalleryView from './views/ShowcaseGalleryView';

function AppContent() {
  const { viewMode, currentScreen, navigateTo } = useWorkout();

  return (
    <div className="desktop-workspace">
      {/* Top Controls & View Mode Toggle */}
      <TopHeader />

      {/* Screen Selector Strip */}
      <div className="screen-selector-strip">
        {SCREENS_LIST.map((s) => (
          <button
            key={s.id}
            className={`screen-chip ${currentScreen === s.id && viewMode === 'device' ? 'active' : ''}`}
            onClick={() => navigateTo(s.id)}
          >
            <span>{s.number}.</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Viewport */}
      {viewMode === 'device' ? (
        <DeviceSimulatorView />
      ) : (
        <ShowcaseGalleryView />
      )}
    </div>
  );
}

export default function App() {
  return (
    <WorkoutProvider>
      <AppContent />
    </WorkoutProvider>
  );
}
