import {
  INITIAL_SETS,
  WORKOUT_PROGRAMS,
  EXERCISES,
  GOALS_DATA,
  USER_PROFILE
} from './data.js';

import {
  icon,
  renderOnboarding,
  renderHome,
  renderActiveWorkout,
  renderExerciseLibrary,
  renderProgress,
  renderHistory,
  renderPrograms,
  renderExerciseDetail,
  renderAddSetModal,
  renderCalendarDetail,
  renderGoals,
  renderProfile,
  renderProgramBuilderModal,
  renderCustomExerciseModal,
  renderGoalModal,
  renderDataManagementModal
} from './screens.js';

import { playCountdownBeep, playRestCompleteChime } from './audio.js';
import { api } from './apiClient.js';

export const SCREENS_META = [
  { id: 'onboarding', num: '01', title: 'Onboarding / Welcome' },
  { id: 'home', num: '02', title: 'Home Dashboard' },
  { id: 'active_workout', num: '03', title: 'Active Workout' },
  { id: 'exercise_library', num: '04', title: 'Exercise Library' },
  { id: 'progress', num: '05', title: 'Progress & 1RM Analytics' },
  { id: 'history', num: '06', title: 'History & Calendar Matrix' },
  { id: 'programs', num: '07', title: 'Workout Programs' },
  { id: 'exercise_detail', num: '08', title: 'Exercise Detail & Anatomy' },
  { id: 'add_set', num: '09', title: 'Add Set Modal Sheet' },
  { id: 'calendar_detail', num: '10', title: 'Calendar Date Breakdown' },
  { id: 'goals', num: '11', title: 'Goal System Tracking' },
  { id: 'profile', num: '12', title: 'Profile & Settings' },
];

const LS_KEYS = {
  SETS: 'gymtrack_sets_v1',
  PROGRAMS: 'gymtrack_programs_v1',
  EXERCISES: 'gymtrack_exercises_v1',
  GOALS: 'gymtrack_goals_v1',
  SOUND: 'gymtrack_sound_v1',
};

class GymTrackApp {
  constructor() {
    this.store = {
      currentScreen: 'home',
      activeTab: 'home',
      viewMode: 'device',

      // Sound
      isSoundEnabled: this.loadLS(LS_KEYS.SOUND, true),

      // Workout State & Sets (Persisted)
      workoutSeconds: 42 * 60 + 31,
      isWorkoutTimerRunning: true,
      workoutSets: this.loadLS(LS_KEYS.SETS, [...INITIAL_SETS]),

      // Rest Timer State
      restSecondsLeft: 92,
      isRestTimerRunning: true,
      isRestTimerVisible: true,

      // Modals
      isAddSetModalOpen: false,
      isProgramModalOpen: false,
      isExerciseModalOpen: false,
      isGoalModalOpen: false,
      isPRModalOpen: false,
      isDataModalOpen: false,

      // Timeframe & Toast
      progressTimeframe: '3m',
      toastMessage: null,

      // Collections (Persisted)
      programs: this.loadLS(LS_KEYS.PROGRAMS, [...WORKOUT_PROGRAMS]),
      exercises: this.loadLS(LS_KEYS.EXERCISES, [...EXERCISES]),
      goals: this.loadLS(LS_KEYS.GOALS, [...GOALS_DATA]),

      // Add Set Form
      newSetForm: {
        weight: 80,
        reps: 8,
        setType: 'N',
        rpe: 8,
        restSeconds: 120,
        notes: ''
      },

      // Details
      selectedExerciseId: 'bench_press',
      selectedCalendarDay: 10,
      searchQuery: '',
      libraryCategory: 'all',
      progressTab: 'strength',

      // Cloud Backend State (Supabase PostgreSQL)
      isCloudConnected: false,
      currentUser: null,
      activeWorkoutSessionId: null,
      activeWorkoutExerciseId: null,

      // Format time helper
      formatTime: (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    };

    this.initTimers();
    this.exposeGlobalApi();
    this.initCloud();
    this.render();
  }

  loadLS(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  }

  saveLS(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      // ignore
    }
  }

  async initCloud() {
    try {
      const isHealthy = await api.checkHealth();
      this.store.isCloudConnected = isHealthy;
      if (isHealthy && api.token) {
        try {
          const res = await api.getMe();
          if (res && res.user) {
            this.store.currentUser = res.user;
          }
        } catch {
          api.setToken('');
        }
      }
      this.render();
    } catch {
      this.store.isCloudConnected = false;
    }
  }

  initTimers() {
    // Workout timer tick
    setInterval(() => {
      if (this.store.isWorkoutTimerRunning) {
        this.store.workoutSeconds += 1;
        this.updateTimersInDom();
      }
    }, 1000);

    // Rest timer tick
    setInterval(() => {
      if (this.store.isRestTimerRunning && this.store.isRestTimerVisible && this.store.restSecondsLeft > 0) {
        this.store.restSecondsLeft -= 1;

        // Audio Beep Cues
        if (this.store.isSoundEnabled) {
          if (this.store.restSecondsLeft >= 1 && this.store.restSecondsLeft <= 3) {
            playCountdownBeep();
          } else if (this.store.restSecondsLeft === 0) {
            playRestCompleteChime();
          }
        }

        this.updateTimersInDom();
      }
    }, 1000);
  }

  updateTimersInDom() {
    if (this.store.currentScreen === 'active_workout') {
      const workoutTimerEl = document.querySelector('#active-workout-timer-text');
      if (workoutTimerEl) {
        workoutTimerEl.textContent = this.store.formatTime(this.store.workoutSeconds);
      }
      const restTimerEl = document.querySelector('#active-rest-timer-text');
      if (restTimerEl) {
        restTimerEl.textContent = this.store.formatTime(this.store.restSecondsLeft);
      }
    }
  }

  exposeGlobalApi() {
    window.GymTrack = {
      navigateTo: (screenId) => {
        this.store.currentScreen = screenId;
        if (screenId === 'home') this.store.activeTab = 'home';
        else if (screenId === 'programs' || screenId === 'active_workout') this.store.activeTab = 'workout';
        else if (screenId === 'progress') this.store.activeTab = 'progress';
        else if (screenId === 'history' || screenId === 'calendar_detail') this.store.activeTab = 'history';
        else if (screenId === 'profile' || screenId === 'goals') this.store.activeTab = 'profile';
        this.render();
      },

      switchTab: (tabId) => {
        this.store.activeTab = tabId;
        if (tabId === 'home') this.store.currentScreen = 'home';
        else if (tabId === 'workout') this.store.currentScreen = 'programs';
        else if (tabId === 'progress') this.store.currentScreen = 'progress';
        else if (tabId === 'history') this.store.currentScreen = 'history';
        else if (tabId === 'profile') this.store.currentScreen = 'profile';
        this.render();
      },

      setViewMode: (mode) => {
        this.store.viewMode = mode;
        this.render();
      },

      toggleSound: () => {
        this.store.isSoundEnabled = !this.store.isSoundEnabled;
        this.saveLS(LS_KEYS.SOUND, this.store.isSoundEnabled);
        if (this.store.isSoundEnabled) {
          playCountdownBeep();
        }
        this.render();
      },

      quickLoginCloud: async () => {
        try {
          this.store.toastMessage = 'Connecting to Supabase...';
          this.render();
          const res = await api.login('alexnguyen@gmail.com', 'password123');
          if (res.user) {
            this.store.currentUser = res.user;
            this.store.isCloudConnected = true;
            this.showToast(`⚡ Logged in as ${res.user.name} (Supabase Cloud)!`);
            
            // Sync programs and exercises from PostgreSQL
            try {
              const [exData, progData] = await Promise.all([
                api.getExercises(),
                api.getPrograms()
              ]);
              if (exData && exData.exercises && exData.exercises.length > 0) {
                console.log('✅ Synchronized', exData.exercises.length, 'exercises from Supabase');
              }
              if (progData && progData.programs && progData.programs.length > 0) {
                console.log('✅ Synchronized', progData.programs.length, 'programs from Supabase');
              }
            } catch (syncErr) {
              console.warn('Sync notice:', syncErr);
            }
          }
          this.render();
        } catch (err) {
          alert(`Supabase Cloud Login Error: ${err.message}`);
        }
      },

      logoutCloud: () => {
        api.setToken('');
        this.store.currentUser = null;
        this.showToast('Logged out of Supabase Cloud.');
        this.render();
      },

      ensureBackendWorkoutSession: async () => {
        if (this.store.activeWorkoutSessionId && this.store.activeWorkoutExerciseId) {
          return {
            workoutId: this.store.activeWorkoutSessionId,
            workoutExerciseId: this.store.activeWorkoutExerciseId
          };
        }
        try {
          const w = await api.startWorkout('Push Day - Chest Focus');
          this.store.activeWorkoutSessionId = w.workout.id;
          const ex = await api.addExerciseToWorkout(w.workout.id, 'bench_press', 1);
          this.store.activeWorkoutExerciseId = ex.workoutExercise.id;
          return {
            workoutId: this.store.activeWorkoutSessionId,
            workoutExerciseId: this.store.activeWorkoutExerciseId
          };
        } catch (err) {
          console.warn('Could not start backend session:', err);
          return null;
        }
      },

      toggleSet: async (setId) => {
        let completedSet = null;
        this.store.workoutSets = this.store.workoutSets.map(s => {
          if (s.id === setId) {
            const nextCompleted = !s.completed;
            if (nextCompleted) {
              this.store.restSecondsLeft = 90;
              this.store.isRestTimerRunning = true;
              this.store.isRestTimerVisible = true;
              completedSet = { ...s, completed: true };
            }
            return { ...s, completed: nextCompleted };
          }
          return s;
        });
        this.saveLS(LS_KEYS.SETS, this.store.workoutSets);
        this.render();

        // Cloud Set Logging & Realtime PR Detection
        if (completedSet && this.store.isCloudConnected && this.store.currentUser) {
          try {
            const sess = await window.GymTrack.ensureBackendWorkoutSession();
            if (sess && sess.workoutExerciseId) {
              const res = await api.logSet(sess.workoutExerciseId, {
                set_number: completedSet.setNumber,
                set_type: completedSet.setType || 'N',
                weight: completedSet.weight,
                reps: completedSet.reps,
                rpe: completedSet.rpe || 8,
                completed: true
              });

              if (res && res.isPR) {
                this.store.latestPR = {
                  exercise: 'Bench Press',
                  weight: completedSet.weight,
                  reps: completedSet.reps,
                  calculated1RM: res.calculated1RM,
                  set: res.set
                };
                this.store.isPRModalOpen = true;
                if (this.store.isSoundEnabled) {
                  playRestCompleteChime();
                }
                this.render();
              } else {
                this.showToast(`☁️ Set synced to Supabase (${completedSet.weight}kg × ${completedSet.reps})`);
              }
            }
          } catch (e) {
            console.warn('Cloud set log warning:', e);
          }
        }
      },

      openAddSetModal: () => {
        this.store.isAddSetModalOpen = true;
        this.render();
      },

      closeAddSetModal: () => {
        this.store.isAddSetModalOpen = false;
        this.render();
      },

      changeFormWeight: (delta) => {
        this.store.newSetForm.weight = Math.max(0, this.store.newSetForm.weight + delta);
        this.render();
      },

      changeFormReps: (delta) => {
        this.store.newSetForm.reps = Math.max(1, this.store.newSetForm.reps + delta);
        this.render();
      },

      changeFormRest: (delta) => {
        this.store.newSetForm.restSeconds = Math.max(15, this.store.newSetForm.restSeconds + delta);
        this.render();
      },

      setFormType: (type) => {
        this.store.newSetForm.setType = type;
        this.render();
      },

      setFormRPE: (rpe) => {
        this.store.newSetForm.rpe = rpe;
        this.render();
      },

      saveNewSet: () => {
        const nextNum = this.store.workoutSets.length + 1;
        const newSet = {
          id: `s_${Date.now()}`,
          setNumber: nextNum,
          weight: this.store.newSetForm.weight,
          reps: this.store.newSetForm.reps,
          rpe: this.store.newSetForm.rpe,
          setType: this.store.newSetForm.setType,
          completed: false
        };
        this.store.workoutSets.push(newSet);
        this.saveLS(LS_KEYS.SETS, this.store.workoutSets);

        this.store.restSecondsLeft = this.store.newSetForm.restSeconds;
        this.store.isRestTimerRunning = true;
        this.store.isRestTimerVisible = true;
        this.store.isAddSetModalOpen = false;

        if (this.store.currentScreen === 'add_set') {
          this.store.currentScreen = 'active_workout';
        }
        this.render();
      },

      toggleWorkoutTimer: () => {
        this.store.isWorkoutTimerRunning = !this.store.isWorkoutTimerRunning;
        this.render();
      },

      toggleRestTimer: () => {
        this.store.isRestTimerRunning = !this.store.isRestTimerRunning;
        this.render();
      },

      addRest: (sec) => {
        this.store.restSecondsLeft += sec;
        this.render();
      },

      completeWorkout: async () => {
        if (this.store.isSoundEnabled) {
          playRestCompleteChime();
        }
        if (this.store.isCloudConnected && this.store.activeWorkoutSessionId) {
          try {
            await api.completeWorkout(this.store.activeWorkoutSessionId, this.store.workoutSeconds, 'Completed from Web Simulator');
            this.showToast('🎉 Workout saved & streak updated on Supabase!');
            this.store.activeWorkoutSessionId = null;
            this.store.activeWorkoutExerciseId = null;
          } catch (e) {
            console.warn('Backend complete workout error:', e);
          }
        }
        this.store.isPRModalOpen = true;
        this.render();
      },

      closePRModal: () => {
        this.store.isPRModalOpen = false;
        this.render();
      },

      // Program Builder Handlers
      openProgramModal: () => {
        this.store.isProgramModalOpen = true;
        this.render();
      },

      closeProgramModal: () => {
        this.store.isProgramModalOpen = false;
        this.render();
      },

      saveCustomProgram: () => {
        const title = document.getElementById('new-program-title')?.value || 'Custom Split';
        const days = document.getElementById('new-program-days')?.value || '4 days / week';
        const duration = document.getElementById('new-program-duration')?.value || '8 weeks';

        const newProg = {
          id: `prog_${Date.now()}`,
          title: title,
          daysPerWeek: days,
          duration: duration,
          image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
        };

        this.store.programs.unshift(newProg);
        this.saveLS(LS_KEYS.PROGRAMS, this.store.programs);
        this.store.isProgramModalOpen = false;
        this.render();
      },

      // Exercise Creator Handlers
      openExerciseModal: () => {
        this.store.isExerciseModalOpen = true;
        this.render();
      },

      closeExerciseModal: () => {
        this.store.isExerciseModalOpen = false;
        this.render();
      },

      saveCustomExercise: () => {
        const name = document.getElementById('new-ex-name')?.value || 'Custom Lift';
        const category = document.getElementById('new-ex-category')?.value || 'chest';
        const equipment = document.getElementById('new-ex-equipment')?.value || 'Dumbbell';

        const newEx = {
          id: `ex_${Date.now()}`,
          name: name,
          category: category,
          muscleGroup: category.charAt(0).toUpperCase() + category.slice(1),
          secondaryMuscles: ['Core'],
          equipment: equipment,
          difficulty: 'Intermediate',
          thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80',
          lastTime: 'New',
          bestSet: 'New',
          est1RM: '-'
        };

        this.store.exercises.unshift(newEx);
        this.saveLS(LS_KEYS.EXERCISES, this.store.exercises);
        this.store.isExerciseModalOpen = false;
        this.render();
      },

      // Goal Creator Handlers
      openGoalModal: () => {
        this.store.isGoalModalOpen = true;
        this.render();
      },

      closeGoalModal: () => {
        this.store.isGoalModalOpen = false;
        this.render();
      },

      saveCustomGoal: () => {
        const title = document.getElementById('new-goal-title')?.value || 'Strength Goal';
        const target = document.getElementById('new-goal-target')?.value || 'Reach 100 kg';

        const newGoal = {
          id: `goal_${Date.now()}`,
          title: title,
          subtitle: target,
          current: '0',
          target: target,
          percent: 25,
          color: '#00E599',
          category: 'strength'
        };

        this.store.goals.unshift(newGoal);
        this.saveLS(LS_KEYS.GOALS, this.store.goals);
        this.store.isGoalModalOpen = false;
        this.render();
      },

      // Set Type Cycle (Normal -> Warmup -> Drop Set -> Failure -> Superset)
      cycleSetType: (setId) => {
        const setObj = this.store.workoutSets.find(s => s.id === setId);
        if (setObj) {
          const types = ['N', 'W', 'D', 'F', 'S'];
          const currIdx = types.indexOf(setObj.setType || 'N');
          const nextIdx = (currIdx + 1) % types.length;
          setObj.setType = types[nextIdx];
          this.saveLS(LS_KEYS.SETS, this.store.workoutSets);
          this.render();
        }
      },

      // Progress Timeframe Filter
      setTimeframe: (tf) => {
        this.store.progressTimeframe = tf;
        this.render();
      },

      // Data Modal
      openDataModal: () => {
        this.store.isDataModalOpen = true;
        this.render();
      },

      closeDataModal: () => {
        this.store.isDataModalOpen = false;
        this.render();
      },

      showToast: (msg) => {
        this.store.toastMessage = msg;
        this.render();
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.store.toastMessage = null;
          this.render();
        }, 3200);
      },

      // Export as Full JSON Backup
      exportDataJSON: () => {
        const backup = {
          app: "GymTrack",
          version: "1.2",
          exportedAt: new Date().toISOString(),
          user: USER_PROFILE,
          workoutSets: this.store.workoutSets,
          programs: this.store.programs,
          exercises: this.store.exercises,
          goals: this.store.goals
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().slice(0, 10);
        a.setAttribute("href", dataStr);
        a.setAttribute("download", `gymtrack-backup-${dateStr}.json`);
        document.body.appendChild(a);
        a.click();
        a.remove();
        this.showToast('✅ Full JSON Backup downloaded!');
      },

      // Export as CSV Spreadsheet
      exportDataCSV: () => {
        const headers = ['Date', 'Exercise', 'Set_Number', 'Set_Type', 'Weight_kg', 'Reps', 'RPE', 'Completed', 'Volume_kg'];
        const rows = this.store.workoutSets.map(s => {
          const vol = s.completed ? (s.weight * s.reps) : 0;
          return [
            '2025-09-12',
            'Bench Press',
            s.setNumber,
            s.setType || 'N',
            s.weight,
            s.reps,
            s.rpe,
            s.completed ? 'YES' : 'NO',
            vol
          ].join(',');
        });
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent([headers.join(','), ...rows].join('\n'));
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().slice(0, 10);
        a.setAttribute("href", csvContent);
        a.setAttribute("download", `gymtrack-workouts-${dateStr}.csv`);
        document.body.appendChild(a);
        a.click();
        a.remove();
        this.showToast('✅ Workouts CSV spreadsheet downloaded!');
      },

      // Import and restore from JSON file
      importDataJSON: (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data.workoutSets && Array.isArray(data.workoutSets)) {
              this.store.workoutSets = data.workoutSets;
              this.saveLS(LS_KEYS.SETS, data.workoutSets);
            }
            if (data.programs && Array.isArray(data.programs)) {
              this.store.programs = data.programs;
              this.saveLS(LS_KEYS.PROGRAMS, data.programs);
            }
            if (data.exercises && Array.isArray(data.exercises)) {
              this.store.exercises = data.exercises;
              this.saveLS(LS_KEYS.EXERCISES, data.exercises);
            }
            if (data.goals && Array.isArray(data.goals)) {
              this.store.goals = data.goals;
              this.saveLS(LS_KEYS.GOALS, data.goals);
            }
            this.store.isDataModalOpen = false;
            this.render();
            this.showToast('🎉 Backup restored successfully!');
          } catch (err) {
            alert('File backup không hợp lệ hoặc sai định dạng JSON.');
          }
        };
        reader.readAsText(file);
      },

      // Reset to Clean Demo Data
      resetToDemoData: () => {
        localStorage.clear();
        this.store.workoutSets = [...INITIAL_SETS];
        this.store.programs = [...WORKOUT_PROGRAMS];
        this.store.exercises = [...EXERCISES];
        this.store.goals = [...GOALS_DATA];
        this.store.isSoundEnabled = true;
        this.store.isDataModalOpen = false;
        this.render();
        this.showToast('🔄 Reset to default data completed!');
      },

      setSearchQuery: (q) => {
        this.store.searchQuery = q;
        this.render();
      },

      setCategory: (cat) => {
        this.store.libraryCategory = cat;
        this.render();
      },

      selectExercise: (id) => {
        this.store.selectedExerciseId = id;
        this.store.currentScreen = 'exercise_detail';
        this.render();
      },

      selectCalendarDay: (day) => {
        this.store.selectedCalendarDay = day;
        this.store.currentScreen = 'calendar_detail';
        this.render();
      },

      setProgressTab: (tab) => {
        this.store.progressTab = tab;
        this.render();
      }
    };
  }

  renderScreenContent(screenId) {
    switch (screenId) {
      case 'onboarding': return renderOnboarding(this.store);
      case 'home': return renderHome(this.store);
      case 'active_workout': return renderActiveWorkout(this.store);
      case 'exercise_library': return renderExerciseLibrary(this.store);
      case 'progress': return renderProgress(this.store);
      case 'history': return renderHistory(this.store);
      case 'programs': return renderPrograms(this.store);
      case 'exercise_detail': return renderExerciseDetail(this.store);
      case 'add_set': return renderAddSetModal(this.store, true);
      case 'calendar_detail': return renderCalendarDetail(this.store);
      case 'goals': return renderGoals(this.store);
      case 'profile': return renderProfile(this.store);
      default: return renderHome(this.store);
    }
  }

  renderBottomNav() {
    const tabs = [
      { id: 'home', label: 'Home', iconName: 'home' },
      { id: 'workout', label: 'Workout', iconName: 'dumbbell' },
      { id: 'progress', label: 'Progress', iconName: 'trendingUp' },
      { id: 'history', label: 'History', iconName: 'calendar' },
      { id: 'profile', label: 'Profile', iconName: 'user' },
    ];

    return `
      <div class="mobile-bottom-nav">
        ${tabs.map(t => {
          const isActive = this.store.activeTab === t.id;
          return `
            <button
              class="nav-tab-item ${isActive ? 'active' : ''}"
              onclick="window.GymTrack.switchTab('${t.id}')"
            >
              ${icon(t.iconName, 19, isActive ? 'var(--primary)' : 'var(--text-muted)')}
              <span>${t.label}</span>
              ${isActive ? `<div class="nav-tab-indicator"></div>` : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  render() {
    const root = document.getElementById('root');
    if (!root) return;

    const screensWithBottomNav = [
      'home', 'exercise_library', 'progress', 'history', 'programs', 'profile', 'goals'
    ];
    const hasNav = screensWithBottomNav.includes(this.store.currentScreen);

    root.innerHTML = `
      <div class="desktop-workspace">
        <header class="top-nav-bar">
          <div class="brand-badge">
            <div class="brand-logo-icon">
              ${icon('dumbbell', 18, '#0B0F17')}
            </div>
            <div class="brand-title">
              Gym<span>Track</span>
            </div>
            <span class="version-pill">PROTOTYPE v1.1 • PERSISTENT</span>
          </div>

          <div class="view-mode-toggle">
            <button
              class="view-mode-btn ${this.store.viewMode === 'device' ? 'active' : ''}"
              onclick="window.GymTrack.setViewMode('device')"
            >
              <span>📱 Interactive Simulator</span>
            </button>
            <button
              class="view-mode-btn ${this.store.viewMode === 'gallery' ? 'active' : ''}"
              onclick="window.GymTrack.setViewMode('gallery')"
            >
              <span>🖼️ 12-Screen Showcase</span>
            </button>
          </div>

          <!-- Cloud Status & Quick Auth -->
          <div style="display: flex; align-items: center; gap: 10px;">
            ${this.store.currentUser ? `
              <div style="display: flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 99px; background: rgba(0, 229, 153, 0.12); border: 1px solid rgba(0, 229, 153, 0.35); font-size: 11px;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 6px var(--primary);"></span>
                <span style="color: var(--primary); font-weight: 700;">Supabase: ${this.store.currentUser.name}</span>
                <button onclick="window.GymTrack.logoutCloud()" title="Logout from Cloud" style="color: var(--text-muted); font-size: 11px; margin-left: 4px; cursor: pointer;">✕</button>
              </div>
            ` : `
              <button onclick="window.GymTrack.quickLoginCloud()" style="display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 99px; background: rgba(0, 229, 153, 0.12); border: 1px solid rgba(0, 229, 153, 0.35); color: var(--primary); font-size: 11px; font-weight: 700; cursor: pointer;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: ${this.store.isCloudConnected ? 'var(--primary)' : '#EF4444'};"></span>
                <span>${this.store.isCloudConnected ? '⚡ Connect Alex (Supabase)' : 'Cloud Offline'}</span>
              </button>
            `}

            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; color: var(--text-muted);">Quick Jump:</span>
              <select
                onchange="window.GymTrack.navigateTo(this.value)"
                style="padding: 6px 10px; font-size: 12px; border-radius: 8px; background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border-subtle); cursor: pointer;"
              >
                ${SCREENS_META.map(s => `
                  <option value="${s.id}" ${this.store.currentScreen === s.id ? 'selected' : ''}>
                    ${s.num}. ${s.title}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>
        </header>

        <div class="screen-selector-strip">
          ${SCREENS_META.map(s => `
            <button
              class="screen-chip ${this.store.currentScreen === s.id && this.store.viewMode === 'device' ? 'active' : ''}"
              onclick="window.GymTrack.navigateTo('${s.id}')"
            >
              <span style="opacity: 0.7;">${s.num}.</span>
              <span>${s.title.split('/')[0]}</span>
            </button>
          `).join('')}
        </div>

        ${this.store.viewMode === 'device' ? `
          <div class="device-container">
            <div class="iphone-16-pro">
              <div class="dynamic-island">
                <div class="island-camera"></div>
                <div class="island-sensor"></div>
              </div>

              <div class="phone-status-bar">
                <span style="font-family: var(--font-mono); font-size: 13px;">9:41</span>
                <div class="status-icons">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              <div class="phone-screen-content ${hasNav ? 'has-nav' : ''}">
                ${this.renderScreenContent(this.store.currentScreen)}
              </div>

              ${hasNav ? this.renderBottomNav() : ''}
              <div class="phone-home-indicator"></div>

              <!-- MODAL: ADD SET -->
              ${this.store.isAddSetModalOpen ? `
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 1000; display: flex; flex-direction: column; justify-content: flex-end; animation: fadeIn 0.2s ease-out;">
                  <div style="background: var(--bg-app); border-radius: 28px 28px 0 0; max-height: 85%; overflow-y: auto; border-top: 1px solid var(--border-highlight); box-shadow: 0 -10px 40px rgba(0,0,0,0.8);">
                    ${renderAddSetModal(this.store, false)}
                  </div>
                </div>
              ` : ''}

              <!-- MODAL: PROGRAM BUILDER -->
              ${this.store.isProgramModalOpen ? `
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 1000; display: flex; flex-direction: column; justify-content: flex-end; animation: fadeIn 0.2s ease-out;">
                  <div style="background: var(--bg-app); border-radius: 28px 28px 0 0; max-height: 85%; overflow-y: auto; border-top: 1px solid var(--border-highlight); box-shadow: 0 -10px 40px rgba(0,0,0,0.8);">
                    ${renderProgramBuilderModal(this.store)}
                  </div>
                </div>
              ` : ''}

              <!-- MODAL: CUSTOM EXERCISE -->
              ${this.store.isExerciseModalOpen ? `
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 1000; display: flex; flex-direction: column; justify-content: flex-end; animation: fadeIn 0.2s ease-out;">
                  <div style="background: var(--bg-app); border-radius: 28px 28px 0 0; max-height: 85%; overflow-y: auto; border-top: 1px solid var(--border-highlight); box-shadow: 0 -10px 40px rgba(0,0,0,0.8);">
                    ${renderCustomExerciseModal(this.store)}
                  </div>
                </div>
              ` : ''}

              <!-- MODAL: ADD GOAL -->
              ${this.store.isGoalModalOpen ? `
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 1000; display: flex; flex-direction: column; justify-content: flex-end; animation: fadeIn 0.2s ease-out;">
                  <div style="background: var(--bg-app); border-radius: 28px 28px 0 0; max-height: 85%; overflow-y: auto; border-top: 1px solid var(--border-highlight); box-shadow: 0 -10px 40px rgba(0,0,0,0.8);">
                    ${renderGoalModal(this.store)}
                  </div>
                </div>
              ` : ''}

              <!-- MODAL: PR CELEBRATION -->
              ${this.store.isPRModalOpen ? `
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); z-index: 1001; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.25s ease-out;">
                  <div style="background: linear-gradient(145deg, #162234 0%, #0D1420 100%); border-radius: 24px; border: 2px solid var(--primary); padding: 24px; width: 100%; text-align: center; box-shadow: 0 0 50px rgba(0, 229, 153, 0.35); position: relative;">
                    <button onclick="window.GymTrack.closePRModal()" style="position: absolute; top: 14px; right: 14px; color: var(--text-muted); font-size: 16px; cursor: pointer;">✕</button>
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); color: var(--accent-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px auto; box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);">
                      ${icon('trophy', 32, 'var(--accent-gold)')}
                    </div>
                    <div style="font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 1px;">
                      ${this.store.latestPR ? 'SUPABASE CLOUD PR DETECTED!' : 'WORKOUT COMPLETED!'}
                    </div>
                    <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin: 6px 0 10px 0;">New PR Recorded 🔥</h2>
                    <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
                      ${this.store.latestPR ? `
                        <strong style="color: #FFFFFF;">${this.store.latestPR.exercise}: ${this.store.latestPR.weight} kg × ${this.store.latestPR.reps} reps</strong><br />
                        <span style="color: var(--primary); font-weight: 700;">Estimated 1RM: ${this.store.latestPR.calculated1RM} kg</span> (Epley Formula)<br />
                        <span style="font-size: 11px; color: var(--text-muted);">Synced to Supabase PostgreSQL</span>
                      ` : `
                        Bench Press: <strong style="color: #FFFFFF;">80 kg × 8</strong><br />
                        Total Volume: <strong style="color: var(--primary);">8,240 kg</strong> in 42 mins.
                      `}
                    </p>
                    <button onclick="window.GymTrack.closePRModal(); window.GymTrack.navigateTo('progress');" class="btn-primary" style="width: 100%; padding: 12px; border-radius: 12px;">
                      View Progress Chart
                    </button>
                  </div>
                </div>
              ` : ''}

              <!-- MODAL: DATA MANAGEMENT & BACKUP -->
              ${this.store.isDataModalOpen ? `
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 1000; display: flex; flex-direction: column; justify-content: flex-end; animation: fadeIn 0.2s ease-out;">
                  <div style="background: var(--bg-app); border-radius: 28px 28px 0 0; max-height: 85%; overflow-y: auto; border-top: 1px solid var(--border-highlight); box-shadow: 0 -10px 40px rgba(0,0,0,0.8);">
                    ${renderDataManagementModal(this.store)}
                  </div>
                </div>
              ` : ''}

              <!-- TOAST NOTIFICATION BANNER -->
              ${this.store.toastMessage ? `
                <div class="toast-banner">
                  <span>${this.store.toastMessage}</span>
                </div>
              ` : ''}
            </div>
          </div>
        ` : `
          <div style="padding: 24px 32px;">
            <div style="text-align: center; margin-bottom: 28px;">
              <h2 style="font-family: var(--font-heading); font-size: 26px; font-weight: 800;">
                GymTrack 12-Screen Design System Showcase
              </h2>
              <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">
                Trọn bộ 12 màn hình giao diện chuẩn theo mockup UI và tài liệu kiến trúc kỹ thuật
              </p>
            </div>

            <div class="showcase-grid">
              ${SCREENS_META.map(screen => `
                <div class="showcase-card">
                  <div class="showcase-card-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="showcase-number">${screen.num}</span>
                      <span class="showcase-title">${screen.title}</span>
                    </div>
                    <button
                      onclick="window.GymTrack.navigateTo('${screen.id}'); window.GymTrack.setViewMode('device');"
                      style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--primary); font-weight: 600; padding: 4px 8px; border-radius: 6px; background: var(--primary-subtle); border: 1px solid rgba(0, 229, 153, 0.2);"
                    >
                      <span>Interactive</span>
                      ${icon('chevronRight', 12, 'var(--primary)')}
                    </button>
                  </div>
                  <div class="showcase-frame">
                    ${this.renderScreenContent(screen.id)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GymTrackApp();
});
