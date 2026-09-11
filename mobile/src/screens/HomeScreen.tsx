import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';
import { WorkoutDetailModal, PastWorkoutDetail } from '../components/WorkoutDetailModal';
import { useWorkout, WorkoutTemplate } from '../context/WorkoutContext';

const WORKOUT_TEMPLATES: Record<string, WorkoutTemplate> = {
  push: {
    name: 'Push Hypertrophy Day',
    exercises: [
      {
        name: 'Barbell Bench Press',
        exerciseId: 'bench_press',
        targetMuscles: ['Chest', 'Triceps'],
        defaultSets: [
          { weight: 80, reps: 8, setType: 'N' },
          { weight: 80, reps: 8, setType: 'N' },
          { weight: 80, reps: 7, setType: 'N' },
          { weight: 75, reps: 8, setType: 'D' },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        exerciseId: 'incline_db_press',
        targetMuscles: ['Upper Chest', 'Front Delts'],
        defaultSets: [
          { weight: 30, reps: 10, setType: 'N' },
          { weight: 30, reps: 10, setType: 'N' },
          { weight: 28, reps: 12, setType: 'N' },
        ],
      },
      {
        name: 'Cable Chest Fly',
        exerciseId: 'cable_chest_fly',
        targetMuscles: ['Inner Chest'],
        defaultSets: [
          { weight: 15, reps: 12, setType: 'N' },
          { weight: 15, reps: 12, setType: 'N' },
          { weight: 12, reps: 15, setType: 'F' },
        ],
      },
    ],
  },
  pull: {
    name: 'Pull Power & Lats',
    exercises: [
      {
        name: 'Conventional Deadlift',
        exerciseId: 'deadlift',
        targetMuscles: ['Back', 'Hamstrings', 'Glutes'],
        defaultSets: [
          { weight: 140, reps: 5, setType: 'N' },
          { weight: 150, reps: 5, setType: 'N' },
          { weight: 160, reps: 3, setType: 'N' },
        ],
      },
      {
        name: 'Barbell Bent-Over Row',
        exerciseId: 'barbell_row',
        targetMuscles: ['Lats', 'Rhomboids', 'Biceps'],
        defaultSets: [
          { weight: 75, reps: 8, setType: 'N' },
          { weight: 75, reps: 8, setType: 'N' },
          { weight: 70, reps: 10, setType: 'N' },
        ],
      },
      {
        name: 'Lat Pulldown',
        exerciseId: 'lat_pulldown',
        targetMuscles: ['Lats', 'Biceps'],
        defaultSets: [
          { weight: 65, reps: 10, setType: 'N' },
          { weight: 65, reps: 10, setType: 'N' },
          { weight: 60, reps: 12, setType: 'D' },
        ],
      },
    ],
  },
  legs: {
    name: 'Legs & Squats Hypertrophy',
    exercises: [
      {
        name: 'Barbell Back Squat',
        exerciseId: 'squat',
        targetMuscles: ['Quads', 'Glutes'],
        defaultSets: [
          { weight: 110, reps: 6, setType: 'N' },
          { weight: 120, reps: 6, setType: 'N' },
          { weight: 120, reps: 6, setType: 'N' },
          { weight: 100, reps: 10, setType: 'D' },
        ],
      },
      {
        name: 'Romanian Deadlift (RDL)',
        exerciseId: 'rdl',
        targetMuscles: ['Hamstrings', 'Glutes'],
        defaultSets: [
          { weight: 90, reps: 8, setType: 'N' },
          { weight: 90, reps: 8, setType: 'N' },
          { weight: 90, reps: 8, setType: 'N' },
        ],
      },
      {
        name: 'Incline Leg Press',
        exerciseId: 'leg_press',
        targetMuscles: ['Quads'],
        defaultSets: [
          { weight: 200, reps: 12, setType: 'N' },
          { weight: 220, reps: 10, setType: 'N' },
          { weight: 240, reps: 8, setType: 'F' },
        ],
      },
    ],
  },
};

const PAST_WORKOUTS_MOCK: PastWorkoutDetail[] = [
  {
    id: 'w_pull_1',
    name: 'Pull Power & Heavy Rows',
    date: 'Yesterday, 6:15 PM',
    duration: '1h 05m',
    volume: '11,400 kg',
    prs: ['Barbell Row 90kg'],
    exercises: [
      {
        name: 'Conventional Deadlift',
        sets: [
          { setNumber: 1, weight: 140, reps: 5, completed: true },
          { setNumber: 2, weight: 150, reps: 5, completed: true },
          { setNumber: 3, weight: 160, reps: 3, completed: true },
        ],
      },
      {
        name: 'Barbell Bent-Over Row',
        sets: [
          { setNumber: 1, weight: 80, reps: 8, completed: true },
          { setNumber: 2, weight: 90, reps: 6, completed: true },
        ],
      },
    ],
  },
  {
    id: 'w_legs_1',
    name: 'Leg Day & Squat PR Day',
    date: '2 days ago, 7:00 AM',
    duration: '1h 18m',
    volume: '16,250 kg',
    prs: ['Back Squat 145kg'],
    exercises: [
      {
        name: 'Barbell Back Squat',
        sets: [
          { setNumber: 1, weight: 120, reps: 6, completed: true },
          { setNumber: 2, weight: 135, reps: 5, completed: true },
          { setNumber: 3, weight: 145, reps: 3, completed: true },
        ],
      },
      {
        name: 'Romanian Deadlift',
        sets: [
          { setNumber: 1, weight: 90, reps: 8, completed: true },
          { setNumber: 2, weight: 90, reps: 8, completed: true },
        ],
      },
    ],
  },
];

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    currentUser,
    workoutName,
    workoutSeconds,
    activeExercises,
    startNewWorkoutSession,
    testHaptics,
    showToast,
  } = useWorkout();

  const [streakDays, setStreakDays] = useState([true, true, true, true, false, false, false]);
  const [selectedPastWorkout, setSelectedPastWorkout] = useState<PastWorkoutDetail | null>(null);

  const formatSeconds = (total: number) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTemplate = (key: 'push' | 'pull' | 'legs') => {
    const template = WORKOUT_TEMPLATES[key];
    startNewWorkoutSession(template.name, template);
    navigation.navigate('Workout');
  };

  const handleStartCustom = () => {
    startNewWorkoutSession('Custom Training Session');
    navigation.navigate('Workout');
  };

  const toggleStreakDay = (index: number) => {
    setStreakDays((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
    testHaptics('light');
    showToast('Streak day updated!');
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>WELCOME BACK,</Text>
          <Text style={styles.userName}>{currentUser ? currentUser.name : 'ALEX NGUYEN'}</Text>
          <Text style={styles.quote}>"Consistency beats motivation every single day."</Text>
        </View>

        {/* Active Workout CTA Card */}
        <TouchableOpacity
          style={styles.activeCard}
          onPress={() => navigation.navigate('Workout')}
          activeOpacity={0.85}
        >
          <View style={styles.activeCardTop}>
            <View style={styles.livePulse}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveText}>WORKOUT IN PROGRESS</Text>
            </View>
            <Text style={styles.liveTimer}>{formatSeconds(workoutSeconds)}</Text>
          </View>

          <Text style={styles.activeTitle}>{workoutName}</Text>
          <Text style={styles.activeSubtitle}>
            {activeExercises.map((e) => e.name).slice(0, 3).join(' • ')}
          </Text>

          <View style={styles.activeFooter}>
            <View style={styles.activeStat}>
              <Ionicons name="barbell-outline" size={16} color={COLORS.primary} />
              <Text style={styles.activeStatText}>{activeExercises.length} Exercises Loaded</Text>
            </View>
            <View style={styles.resumeBtn}>
              <Text style={styles.resumeBtnText}>Resume</Text>
              <Ionicons name="arrow-forward" size={14} color="#0B0F17" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Launch Workout Templates */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK START WORKOUT</Text>
        </View>
        <View style={styles.templateGrid}>
          <TouchableOpacity
            style={styles.templateBtn}
            onPress={() => handleStartTemplate('push')}
            activeOpacity={0.7}
          >
            <Ionicons name="flame" size={20} color={COLORS.primary} />
            <Text style={styles.templateBtnTitle}>Push Day</Text>
            <Text style={styles.templateBtnSub}>Chest & Triceps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.templateBtn}
            onPress={() => handleStartTemplate('pull')}
            activeOpacity={0.7}
          >
            <Ionicons name="flash" size={20} color="#38BDF8" />
            <Text style={styles.templateBtnTitle}>Pull Day</Text>
            <Text style={styles.templateBtnSub}>Back & Biceps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.templateBtn}
            onPress={() => handleStartTemplate('legs')}
            activeOpacity={0.7}
          >
            <Ionicons name="barbell" size={20} color={COLORS.accentGold} />
            <Text style={styles.templateBtnTitle}>Leg Day</Text>
            <Text style={styles.templateBtnSub}>Squat & Hamstrings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.templateBtn, styles.templateBtnCustom]}
            onPress={handleStartCustom}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color={COLORS.primary} />
            <Text style={styles.templateBtnTitle}>Empty Session</Text>
            <Text style={styles.templateBtnSub}>Custom Lifts</Text>
          </TouchableOpacity>
        </View>

        {/* Streak & Consistency Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <View style={styles.streakTitleRow}>
              <Ionicons name="flame" size={24} color={COLORS.accentGold} />
              <Text style={styles.streakTitle}>
                {streakDays.filter(Boolean).length}-Day Streak!
              </Text>
            </View>
            <Text style={styles.streakGoal}>Goal: 5 days/wk</Text>
          </View>

          <View style={styles.daysRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const completed = streakDays[i];
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.dayCol}
                  onPress={() => toggleStreakDay(i)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.dayDot,
                      completed ? styles.dayDotActive : styles.dayDotInactive,
                    ]}
                  >
                    {completed && <Ionicons name="checkmark" size={14} color="#0B0F17" />}
                  </View>
                  <Text style={styles.dayLabel}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Workouts List (Clickable) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT WORKOUTS (TAP TO VIEW)</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {PAST_WORKOUTS_MOCK.map((w) => (
          <TouchableOpacity
            key={w.id}
            style={styles.recentItem}
            onPress={() => setSelectedPastWorkout(w)}
            activeOpacity={0.7}
          >
            <View style={styles.recentIcon}>
              <Ionicons name="fitness-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.recentInfo}>
              <Text style={styles.recentName}>{w.name}</Text>
              <Text style={styles.recentMeta}>{w.date} • {w.duration}</Text>
            </View>
            <View style={styles.recentRight}>
              <Text style={styles.recentVolume}>{w.volume}</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.textMuted} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workout Detail Modal */}
      <WorkoutDetailModal
        workout={selectedPastWorkout}
        visible={selectedPastWorkout !== null}
        onClose={() => setSelectedPastWorkout(null)}
        onRepeat={() => {
          if (selectedPastWorkout) {
            startNewWorkoutSession(selectedPastWorkout.name);
            setSelectedPastWorkout(null);
            navigation.navigate('Workout');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  welcomeSection: {
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    marginVertical: 2,
  },
  quote: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  activeCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: COLORS.borderHighlight,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  activeCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  livePulse: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.8,
  },
  liveTimer: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  activeTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  activeSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  activeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderCard,
    paddingTop: 10,
  },
  activeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeStatText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  resumeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B0F17',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  templateBtn: {
    width: '48%',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  templateBtnCustom: {
    borderColor: 'rgba(0, 229, 153, 0.3)',
    borderStyle: 'dashed',
  },
  templateBtnTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  templateBtnSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  streakCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  streakTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  streakGoal: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayCol: {
    alignItems: 'center',
    gap: 6,
  },
  dayDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotActive: {
    backgroundColor: COLORS.primary,
  },
  dayDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  recentIcon: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  recentMeta: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  recentRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  recentVolume: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
