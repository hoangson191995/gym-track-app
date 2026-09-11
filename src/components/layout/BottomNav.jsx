import React from 'react';
import { Home, Dumbbell, TrendingUp, Calendar, User } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

export default function BottomNav() {
  const { activeTab, switchTab } = useWorkout();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab-item ${isActive ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{tab.label}</span>
            {isActive && <div className="nav-tab-indicator" />}
          </button>
        );
      })}
    </div>
  );
}
