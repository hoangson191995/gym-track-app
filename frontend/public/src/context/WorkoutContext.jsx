import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ACTIVE_WORKOUT, EXERCISES, CALENDAR_DAYS } from '../data/mockData';
import confetti from 'canvas-confetti';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  // Navigation & View Mode
  const [currentScreen, setCurrentScreen] = useState('home'); // default interactive screen
  const [viewMode, setViewMode] = useState('device'); // 'device' or 'gallery'
  const [activeTab, setActiveTab] = useState('home'); // bottom nav active tab

  // Selected details
  const [selectedExerciseId, setSelectedExerciseId] = useState('bench_press');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(10);
  const [showAddSetModal, setShowAddSetModal] = useState(false);
  const [showPRModal, setShowPRModal] = useState(false);

  // Active Workout State
  const [workout, setWorkout] = useState(INITIAL_ACTIVE_WORKOUT);
  const [workoutSeconds, setWorkoutSeconds] = useState(42 * 60 + 31); // 42:31
  const [isWorkoutTimerRunning, setIsWorkoutTimerRunning] = useState(true);

  // Rest Timer State
  const [restSecondsLeft, setRestSecondsLeft] = useState(92); // 01:32
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(true);
  const [isRestTimerVisible, setIsRestTimerVisible] = useState(true);

  // Workout Timer Tick
  useEffect(() => {
    let interval;
    if (isWorkoutTimerRunning) {
      interval = setInterval(() => {
        setWorkoutSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutTimerRunning]);

  // Rest Timer Tick
  useEffect(() => {
    let interval;
    if (isRestTimerRunning && isRestTimerVisible && restSecondsLeft > 0) {
      interval = setInterval(() => {
        setRestSecondsLeft(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestTimerRunning, isRestTimerVisible, restSecondsLeft]);

  // Toggle set completion
  const toggleSetComplete = (setId) => {
    setWorkout(prev => {
      const updatedSets = prev.currentExercise.sets.map(s => {
        if (s.id === setId) {
          const nextCompleted = !s.completed;
          // If marked completed, trigger rest timer
          if (nextCompleted) {
            setRestSecondsLeft(90);
            setIsRestTimerRunning(true);
            setIsRestTimerVisible(true);
          }
          return { ...s, completed: nextCompleted };
        }
        return s;
      });
      return {
        ...prev,
        currentExercise: {
          ...prev.currentExercise,
          sets: updatedSets
        }
      };
    });
  };

  // Add new set
  const addSet = (newSetData) => {
    setWorkout(prev => {
      const existingSets = prev.currentExercise.sets;
      const nextNumber = existingSets.length + 1;
      const newSet = {
        id: `s_${Date.now()}`,
        setNumber: nextNumber,
        weight: Number(newSetData.weight) || 80,
        reps: Number(newSetData.reps) || 8,
        rpe: Number(newSetData.rpe) || 8,
        setType: newSetData.setType || 'working',
        completed: false,
        notes: newSetData.notes || ''
      };
      return {
        ...prev,
        currentExercise: {
          ...prev.currentExercise,
          sets: [...existingSets, newSet]
        }
      };
    });

    // Start rest timer
    const rest = Number(newSetData.restSeconds) || 90;
    setRestSecondsLeft(rest);
    setIsRestTimerRunning(true);
    setIsRestTimerVisible(true);
    setShowAddSetModal(false);
  };

  // Finish workout or Complete Set
  const completeWorkout = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore in SSR/test
    }
    setShowPRModal(true);
  };

  // Rest Timer Controls
  const togglePauseRestTimer = () => {
    setIsRestTimerRunning(prev => !prev);
  };

  const addRestSeconds = (sec = 30) => {
    setRestSecondsLeft(prev => prev + sec);
  };

  const closeRestTimer = () => {
    setIsRestTimerVisible(false);
  };

  // Switch to Screen helper with matching tab sync
  const navigateTo = (screenId) => {
    setCurrentScreen(screenId);
    if (screenId === 'home') setActiveTab('home');
    else if (screenId === 'programs' || screenId === 'active_workout') setActiveTab('workout');
    else if (screenId === 'progress') setActiveTab('progress');
    else if (screenId === 'history' || screenId === 'calendar_detail') setActiveTab('history');
    else if (screenId === 'profile' || screenId === 'goals') setActiveTab('profile');
  };

  // Switch bottom nav tab
  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentScreen('home');
    else if (tab === 'workout') setCurrentScreen('programs');
    else if (tab === 'progress') setCurrentScreen('progress');
    else if (tab === 'history') setCurrentScreen('history');
    else if (tab === 'profile') setCurrentScreen('profile');
  };

  const selectedExercise = EXERCISES.find(e => e.id === selectedExerciseId) || EXERCISES[0];

  return (
    <WorkoutContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        viewMode,
        setViewMode,
        activeTab,
        switchTab,
        navigateTo,

        // Workout state
        workout,
        workoutSeconds,
        isWorkoutTimerRunning,
        setIsWorkoutTimerRunning,
        toggleSetComplete,
        addSet,
        completeWorkout,

        // Rest timer state
        restSecondsLeft,
        isRestTimerRunning,
        isRestTimerVisible,
        togglePauseRestTimer,
        addRestSeconds,
        closeRestTimer,

        // Modals & Details
        showAddSetModal,
        setShowAddSetModal,
        showPRModal,
        setShowPRModal,
        selectedExerciseId,
        setSelectedExerciseId,
        selectedExercise,
        selectedCalendarDay,
        setSelectedCalendarDay,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider');
  return ctx;
}
