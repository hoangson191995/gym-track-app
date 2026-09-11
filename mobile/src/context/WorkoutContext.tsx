import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mobileApi, User, WorkoutSet } from '../api/apiClient';

export interface ExerciseItem {
  id: string;
  exerciseId: string;
  name: string;
  targetMuscles: string[];
  isExpanded: boolean;
  sets: WorkoutSet[];
}

export interface WorkoutTemplate {
  name: string;
  exercises: { name: string; exerciseId: string; targetMuscles: string[]; defaultSets: { weight: number; reps: number; setType: WorkoutSet['setType'] }[] }[];
}

interface WorkoutContextType {
  currentUser: User | null;
  isCloudConnected: boolean;
  workoutName: string;
  setWorkoutName: (name: string) => void;
  workoutSeconds: number;
  isWorkoutTimerRunning: boolean;
  toggleTimerPause: () => void;
  restSecondsLeft: number;
  isRestTimerRunning: boolean;
  isRestTimerVisible: boolean;
  activeExercises: ExerciseItem[];
  latestPR: any | null;
  isPRModalVisible: boolean;
  isFinishModalVisible: boolean;
  toastMessage: string | null;
  unit: 'kg' | 'lbs';
  workoutNotes: string;
  setWorkoutNotes: (notes: string) => void;
  toggleUnit: () => void;
  testHaptics: (type: 'light' | 'medium' | 'heavy' | 'success') => void;
  showToast: (msg: string) => void;
  quickLoginCloud: () => Promise<void>;
  toggleSet: (exerciseId: string, setId: string) => Promise<void>;
  updateSet: (exerciseId: string, setId: string, updates: Partial<WorkoutSet>) => void;
  addSet: (exerciseId: string, weight?: number, reps?: number, setType?: WorkoutSet['setType']) => void;
  deleteSet: (exerciseId: string, setId: string) => void;
  toggleExerciseExpanded: (exerciseId: string) => void;
  addExerciseToWorkout: (exercise: { id: string; name: string; muscle_group?: string; secondary_muscles?: string[] }) => void;
  removeExerciseFromWorkout: (exerciseId: string) => void;
  startNewWorkoutSession: (name: string, template?: WorkoutTemplate) => void;
  addRest: (seconds: number) => void;
  skipRest: () => void;
  openFinishModal: () => void;
  closeFinishModal: () => void;
  completeWorkout: () => Promise<void>;
  closePRModal: () => void;
}

const DEFAULT_EXERCISES: ExerciseItem[] = [
  {
    id: 'ex_1',
    exerciseId: 'bench_press',
    name: 'Barbell Bench Press',
    targetMuscles: ['Chest', 'Triceps', 'Front Delts'],
    isExpanded: true,
    sets: [
      { id: 's1_1', setNumber: 1, weight: 80, reps: 8, rpe: 8, setType: 'N', completed: true },
      { id: 's1_2', setNumber: 2, weight: 80, reps: 8, rpe: 8, setType: 'N', completed: true },
      { id: 's1_3', setNumber: 3, weight: 80, reps: 7, rpe: 9, setType: 'N', completed: false },
      { id: 's1_4', setNumber: 4, weight: 75, reps: 8, rpe: 9.5, setType: 'D', completed: false },
    ],
  },
  {
    id: 'ex_2',
    exerciseId: 'incline_db_press',
    name: 'Incline Dumbbell Press',
    targetMuscles: ['Upper Chest', 'Front Delts'],
    isExpanded: true,
    sets: [
      { id: 's2_1', setNumber: 1, weight: 30, reps: 10, rpe: 8, setType: 'N', completed: false },
      { id: 's2_2', setNumber: 2, weight: 30, reps: 10, rpe: 8.5, setType: 'N', completed: false },
      { id: 's2_3', setNumber: 3, weight: 28, reps: 12, rpe: 9, setType: 'N', completed: false },
    ],
  },
  {
    id: 'ex_3',
    exerciseId: 'cable_chest_fly',
    name: 'Cable Chest Fly',
    targetMuscles: ['Chest Isolation'],
    isExpanded: false,
    sets: [
      { id: 's3_1', setNumber: 1, weight: 15, reps: 12, rpe: 8, setType: 'N', completed: false },
      { id: 's3_2', setNumber: 2, weight: 15, reps: 12, rpe: 8.5, setType: 'N', completed: false },
      { id: 's3_3', setNumber: 3, weight: 12, reps: 15, rpe: 10, setType: 'F', completed: false },
    ],
  },
];

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [workoutName, setWorkoutName] = useState('Push Day (Hypertrophy)');
  const [workoutNotes, setWorkoutNotes] = useState('Focus on explosive concentric and controlled eccentric.');
  const [workoutSeconds, setWorkoutSeconds] = useState(42 * 60 + 31);
  const [isWorkoutTimerRunning, setIsWorkoutTimerRunning] = useState(true);

  const [restSecondsLeft, setRestSecondsLeft] = useState(90);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [isRestTimerVisible, setIsRestTimerVisible] = useState(false);

  const [activeExercises, setActiveExercises] = useState<ExerciseItem[]>(DEFAULT_EXERCISES);
  const [latestPR, setLatestPR] = useState<any | null>(null);
  const [isPRModalVisible, setIsPRModalVisible] = useState(false);
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const [activeSession, setActiveSession] = useState<{ workoutId?: string; workoutExerciseId?: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const testHaptics = (type: 'light' | 'medium' | 'heavy' | 'success') => {
    try {
      if (type === 'light') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      else if (type === 'medium') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      else if (type === 'heavy') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      else if (type === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  };

  const toggleUnit = async () => {
    const next = unit === 'kg' ? 'lbs' : 'kg';
    setUnit(next);
    testHaptics('light');
    showToast(`Units switched to ${next.toUpperCase()}`);
    try {
      await AsyncStorage.setItem('gymtrack_unit', next);
    } catch {}
  };

  useEffect(() => {
    (async () => {
      await mobileApi.init();
      const healthy = await mobileApi.checkHealth();
      setIsCloudConnected(healthy);
      if (healthy) {
        try {
          const res = await mobileApi.getMe();
          if (res && res.user) {
            setCurrentUser(res.user);
          }
        } catch {}
      }
      try {
        const savedUnit = await AsyncStorage.getItem('gymtrack_unit');
        if (savedUnit === 'kg' || savedUnit === 'lbs') {
          setUnit(savedUnit);
        }
      } catch {}
    })();
  }, []);

  // Workout Timer Interval
  useEffect(() => {
    let interval: any;
    if (isWorkoutTimerRunning) {
      interval = setInterval(() => {
        setWorkoutSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutTimerRunning]);

  // Rest Timer Interval
  useEffect(() => {
    let interval: any;
    if (isRestTimerRunning && isRestTimerVisible && restSecondsLeft > 0) {
      interval = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 1) {
            testHaptics('success');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestTimerRunning, isRestTimerVisible, restSecondsLeft]);

  const toggleTimerPause = () => {
    setIsWorkoutTimerRunning((prev) => !prev);
    testHaptics('light');
    showToast(isWorkoutTimerRunning ? 'Workout timer paused' : 'Workout timer resumed');
  };

  const quickLoginCloud = async () => {
    try {
      showToast('Connecting to Supabase Cloud...');
      const res = await mobileApi.login('alexnguyen@gmail.com', 'password123');
      if (res && res.user) {
        setCurrentUser(res.user);
        setIsCloudConnected(true);
        testHaptics('success');
        showToast(`Connected to Supabase: ${res.user.name}`);
      }
    } catch (err: any) {
      showToast(`Login Error: ${err.message}`);
    }
  };

  const ensureSession = async () => {
    if (activeSession?.workoutExerciseId) return activeSession;
    try {
      const w = await mobileApi.startWorkout(workoutName);
      const ex = await mobileApi.addExerciseToWorkout(w.workout.id, 'bench_press', 1);
      const sess = { workoutId: w.workout.id, workoutExerciseId: ex.workoutExercise.id };
      setActiveSession(sess);
      return sess;
    } catch {
      return null;
    }
  };

  const toggleSet = async (exerciseId: string, setId: string) => {
    let justCompleted = false;
    let targetSet: WorkoutSet | undefined;
    let exerciseName = 'Exercise';

    setActiveExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          exerciseName = ex.name;
          const updatedSets = ex.sets.map((s) => {
            if (s.id === setId) {
              const nextVal = !s.completed;
              if (nextVal) {
                justCompleted = true;
                targetSet = { ...s, completed: true };
              }
              return { ...s, completed: nextVal };
            }
            return s;
          });
          return { ...ex, sets: updatedSets };
        }
        return ex;
      })
    );

    if (justCompleted && targetSet) {
      testHaptics('medium');

      // Start Rest Timer
      setRestSecondsLeft(90);
      setIsRestTimerRunning(true);
      setIsRestTimerVisible(true);

      // Cloud Sync
      if (isCloudConnected && currentUser) {
        try {
          const sess = await ensureSession();
          if (sess?.workoutExerciseId) {
            const res = await mobileApi.logSet(sess.workoutExerciseId, {
              set_number: targetSet.setNumber,
              set_type: targetSet.setType,
              weight: targetSet.weight,
              reps: targetSet.reps,
              rpe: targetSet.rpe,
              completed: true,
            });

            if (res && res.isPR) {
              setLatestPR({
                exercise: exerciseName,
                weight: targetSet.weight,
                reps: targetSet.reps,
                calculated1RM: res.calculated1RM,
              });
              setIsPRModalVisible(true);
              testHaptics('success');
            } else {
              showToast(`Synced to Supabase (${targetSet.weight}${unit} x ${targetSet.reps})`);
            }
          }
        } catch {}
      }
    }
  };

  const updateSet = (exerciseId: string, setId: string, updates: Partial<WorkoutSet>) => {
    setActiveExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((s) => (s.id === setId ? { ...s, ...updates } : s)),
          };
        }
        return ex;
      })
    );
  };

  const addSet = (exerciseId: string, weight?: number, reps?: number, setType: WorkoutSet['setType'] = 'N') => {
    setActiveExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          const lastSet = ex.sets[ex.sets.length - 1];
          const newWeight = weight !== undefined ? weight : (lastSet ? lastSet.weight : 50);
          const newReps = reps !== undefined ? reps : (lastSet ? lastSet.reps : 10);
          const newSet: WorkoutSet = {
            id: `s_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            setNumber: ex.sets.length + 1,
            weight: newWeight,
            reps: newReps,
            rpe: 8,
            setType,
            completed: false,
          };
          return { ...ex, sets: [...ex.sets, newSet] };
        }
        return ex;
      })
    );
    testHaptics('light');
  };

  const deleteSet = (exerciseId: string, setId: string) => {
    setActiveExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          const filtered = ex.sets.filter((s) => s.id !== setId);
          const renumbered = filtered.map((s, idx) => ({ ...s, setNumber: idx + 1 }));
          return { ...ex, sets: renumbered };
        }
        return ex;
      })
    );
    testHaptics('light');
    showToast('Set removed');
  };

  const toggleExerciseExpanded = (exerciseId: string) => {
    setActiveExercises((prev) =>
      prev.map((ex) => (ex.id === exerciseId ? { ...ex, isExpanded: !ex.isExpanded } : ex))
    );
    testHaptics('light');
  };

  const addExerciseToWorkout = (exercise: { id: string; name: string; muscle_group?: string; secondary_muscles?: string[] }) => {
    const newEx: ExerciseItem = {
      id: `ex_${Date.now()}`,
      exerciseId: exercise.id,
      name: exercise.name,
      targetMuscles: exercise.muscle_group ? [exercise.muscle_group, ...(exercise.secondary_muscles || [])] : ['General'],
      isExpanded: true,
      sets: [
        { id: `s_${Date.now()}_1`, setNumber: 1, weight: 60, reps: 10, rpe: 8, setType: 'N', completed: false },
        { id: `s_${Date.now()}_2`, setNumber: 2, weight: 60, reps: 10, rpe: 8, setType: 'N', completed: false },
        { id: `s_${Date.now()}_3`, setNumber: 3, weight: 60, reps: 10, rpe: 8.5, setType: 'N', completed: false },
      ],
    };
    setActiveExercises((prev) => [...prev, newEx]);
    testHaptics('medium');
    showToast(`Added ${exercise.name} to workout!`);
  };

  const removeExerciseFromWorkout = (exerciseId: string) => {
    setActiveExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
    testHaptics('light');
    showToast('Exercise removed from session');
  };

  const startNewWorkoutSession = (name: string, template?: WorkoutTemplate) => {
    setWorkoutName(name);
    setWorkoutSeconds(0);
    setIsWorkoutTimerRunning(true);
    setActiveSession(null);

    if (template && template.exercises.length > 0) {
      const created: ExerciseItem[] = template.exercises.map((item, idx) => ({
        id: `ex_${Date.now()}_${idx}`,
        exerciseId: item.exerciseId,
        name: item.name,
        targetMuscles: item.targetMuscles,
        isExpanded: true,
        sets: item.defaultSets.map((ds, sIdx) => ({
          id: `s_${Date.now()}_${idx}_${sIdx}`,
          setNumber: sIdx + 1,
          weight: ds.weight,
          reps: ds.reps,
          rpe: 8,
          setType: ds.setType,
          completed: false,
        })),
      }));
      setActiveExercises(created);
    } else {
      setActiveExercises([
        {
          id: `ex_${Date.now()}`,
          exerciseId: 'custom_lift',
          name: 'First Exercise',
          targetMuscles: ['Full Body'],
          isExpanded: true,
          sets: [
            { id: `s_${Date.now()}_1`, setNumber: 1, weight: 50, reps: 10, rpe: 8, setType: 'N', completed: false },
            { id: `s_${Date.now()}_2`, setNumber: 2, weight: 50, reps: 10, rpe: 8, setType: 'N', completed: false },
          ],
        },
      ]);
    }
    testHaptics('success');
    showToast(`Started: ${name}`);
  };

  const addRest = (sec: number) => {
    setRestSecondsLeft((prev) => prev + sec);
    testHaptics('light');
  };

  const skipRest = () => {
    setIsRestTimerVisible(false);
    setIsRestTimerRunning(false);
  };

  const openFinishModal = () => {
    setIsFinishModalVisible(true);
    testHaptics('medium');
  };

  const closeFinishModal = () => setIsFinishModalVisible(false);

  const completeWorkout = async () => {
    setIsFinishModalVisible(false);
    if (isCloudConnected && activeSession?.workoutId) {
      try {
        await mobileApi.completeWorkout(activeSession.workoutId, workoutSeconds, workoutNotes);
        showToast('Workout saved & streak updated on Supabase Cloud!');
        setActiveSession(null);
      } catch {}
    }
    setIsPRModalVisible(true);
    testHaptics('success');
  };

  const closePRModal = () => setIsPRModalVisible(false);

  return (
    <WorkoutContext.Provider
      value={{
        currentUser,
        isCloudConnected,
        workoutName,
        setWorkoutName,
        workoutSeconds,
        isWorkoutTimerRunning,
        toggleTimerPause,
        restSecondsLeft,
        isRestTimerRunning,
        isRestTimerVisible,
        activeExercises,
        latestPR,
        isPRModalVisible,
        isFinishModalVisible,
        toastMessage,
        unit,
        workoutNotes,
        setWorkoutNotes,
        toggleUnit,
        testHaptics,
        showToast,
        quickLoginCloud,
        toggleSet,
        updateSet,
        addSet,
        deleteSet,
        toggleExerciseExpanded,
        addExerciseToWorkout,
        removeExerciseFromWorkout,
        startNewWorkoutSession,
        addRest,
        skipRest,
        openFinishModal,
        closeFinishModal,
        completeWorkout,
        closePRModal,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout must be used within WorkoutProvider');
  return context;
};
