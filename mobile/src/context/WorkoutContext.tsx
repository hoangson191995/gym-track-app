import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { mobileApi, User, WorkoutSet } from '../api/apiClient';

interface WorkoutContextType {
  currentUser: User | null;
  isCloudConnected: boolean;
  workoutSeconds: number;
  isWorkoutTimerRunning: boolean;
  restSecondsLeft: number;
  isRestTimerRunning: boolean;
  isRestTimerVisible: boolean;
  sets: WorkoutSet[];
  latestPR: any | null;
  isPRModalVisible: boolean;
  toastMessage: string | null;
  quickLoginCloud: () => Promise<void>;
  toggleSet: (id: string) => Promise<void>;
  addSet: (weight: number, reps: number, rpe?: number, setType?: 'N' | 'W' | 'D' | 'F' | 'S') => void;
  addRest: (seconds: number) => void;
  skipRest: () => void;
  completeWorkout: () => Promise<void>;
  closePRModal: () => void;
}

const INITIAL_SETS: WorkoutSet[] = [
  { id: '1', setNumber: 1, weight: 80, reps: 8, rpe: 8, setType: 'N', completed: true },
  { id: '2', setNumber: 2, weight: 80, reps: 8, rpe: 8, setType: 'N', completed: true },
  { id: '3', setNumber: 3, weight: 80, reps: 7, rpe: 9, setType: 'N', completed: false },
  { id: '4', setNumber: 4, weight: 75, reps: 8, rpe: 9.5, setType: 'D', completed: false },
];

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [workoutSeconds, setWorkoutSeconds] = useState(42 * 60 + 31);
  const [isWorkoutTimerRunning, setIsWorkoutTimerRunning] = useState(true);

  const [restSecondsLeft, setRestSecondsLeft] = useState(90);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [isRestTimerVisible, setIsRestTimerVisible] = useState(false);

  const [sets, setSets] = useState<WorkoutSet[]>(INITIAL_SETS);
  const [latestPR, setLatestPR] = useState<any | null>(null);
  const [isPRModalVisible, setIsPRModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeSession, setActiveSession] = useState<{ workoutId?: string; workoutExerciseId?: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    // Check Cloud on startup
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
        } catch {
          // Token empty
        }
      }
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
            try {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestTimerRunning, isRestTimerVisible, restSecondsLeft]);

  const quickLoginCloud = async () => {
    try {
      showToast('Connecting to Supabase...');
      const res = await mobileApi.login('alexnguyen@gmail.com', 'password123');
      if (res && res.user) {
        setCurrentUser(res.user);
        setIsCloudConnected(true);
        try {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {}
        showToast(`⚡ Connected to Supabase: ${res.user.name}`);
      }
    } catch (err: any) {
      showToast(`Login Error: ${err.message}`);
    }
  };

  const ensureSession = async () => {
    if (activeSession?.workoutExerciseId) return activeSession;
    try {
      const w = await mobileApi.startWorkout('Push Day (Mobile)');
      const ex = await mobileApi.addExerciseToWorkout(w.workout.id, 'bench_press', 1);
      const sess = { workoutId: w.workout.id, workoutExerciseId: ex.workoutExercise.id };
      setActiveSession(sess);
      return sess;
    } catch {
      return null;
    }
  };

  const toggleSet = async (id: string) => {
    let justCompleted = false;
    let targetSet: WorkoutSet | undefined;

    setSets((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextVal = !s.completed;
          if (nextVal) {
            justCompleted = true;
            targetSet = { ...s, completed: true };
          }
          return { ...s, completed: nextVal };
        }
        return s;
      })
    );

    if (justCompleted && targetSet) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}

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
                exercise: 'Bench Press',
                weight: targetSet.weight,
                reps: targetSet.reps,
                calculated1RM: res.calculated1RM,
              });
              setIsPRModalVisible(true);
              try {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              } catch {}
            } else {
              showToast(`☁️ Synced to Supabase (${targetSet.weight}kg × ${targetSet.reps})`);
            }
          }
        } catch {}
      }
    }
  };

  const addSet = (weight: number, reps: number, rpe = 8, setType: 'N' | 'W' | 'D' | 'F' | 'S' = 'N') => {
    const newSet: WorkoutSet = {
      id: `s_${Date.now()}`,
      setNumber: sets.length + 1,
      weight,
      reps,
      rpe,
      setType,
      completed: false,
    };
    setSets([...sets, newSet]);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  };

  const addRest = (sec: number) => {
    setRestSecondsLeft((prev) => prev + sec);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  };

  const skipRest = () => {
    setIsRestTimerVisible(false);
    setIsRestTimerRunning(false);
  };

  const completeWorkout = async () => {
    if (isCloudConnected && activeSession?.workoutId) {
      try {
        await mobileApi.completeWorkout(activeSession.workoutId, workoutSeconds, 'Completed from React Native Mobile');
        showToast('🎉 Workout saved & streak updated on Supabase!');
        setActiveSession(null);
      } catch {}
    }
    setIsPRModalVisible(true);
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  };

  const closePRModal = () => setIsPRModalVisible(false);

  return (
    <WorkoutContext.Provider
      value={{
        currentUser,
        isCloudConnected,
        workoutSeconds,
        isWorkoutTimerRunning,
        restSecondsLeft,
        isRestTimerRunning,
        isRestTimerVisible,
        sets,
        latestPR,
        isPRModalVisible,
        toastMessage,
        quickLoginCloud,
        toggleSet,
        addSet,
        addRest,
        skipRest,
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
