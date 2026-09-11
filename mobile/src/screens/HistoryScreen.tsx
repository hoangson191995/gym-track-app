import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';
import { WorkoutDetailModal, PastWorkoutDetail } from '../components/WorkoutDetailModal';
import { useWorkout } from '../context/WorkoutContext';

const ALL_PAST_WORKOUTS: PastWorkoutDetail[] = [
  {
    id: 'w_1',
    date: 'Today, 7:30 PM',
    name: 'Push Day (Hypertrophy)',
    duration: '42m',
    volume: '14,820 kg',
    prs: ['Bench Press 101.3kg'],
    exercises: [
      {
        name: 'Barbell Bench Press',
        sets: [
          { setNumber: 1, weight: 80, reps: 8, completed: true },
          { setNumber: 2, weight: 80, reps: 8, completed: true },
          { setNumber: 3, weight: 80, reps: 7, completed: true },
          { setNumber: 4, weight: 75, reps: 8, completed: true },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        sets: [
          { setNumber: 1, weight: 30, reps: 10, completed: true },
          { setNumber: 2, weight: 30, reps: 10, completed: true },
        ],
      },
    ],
  },
  {
    id: 'w_2',
    date: 'Yesterday, 6:15 PM',
    name: 'Pull Power & Heavy Rows',
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
    id: 'w_3',
    date: 'Wed, Sep 9',
    name: 'Leg Day & Squats',
    duration: '1h 18m',
    volume: '16,250 kg',
    prs: ['Squat 145kg'],
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
  {
    id: 'w_4',
    date: 'Mon, Sep 7',
    name: 'Upper Body Conditioning',
    duration: '54m',
    volume: '9,800 kg',
    prs: [],
    exercises: [
      {
        name: 'Overhead Press',
        sets: [
          { setNumber: 1, weight: 55, reps: 8, completed: true },
          { setNumber: 2, weight: 60, reps: 6, completed: true },
        ],
      },
      {
        name: 'Dips',
        sets: [
          { setNumber: 1, weight: 0, reps: 15, completed: true },
          { setNumber: 2, weight: 10, reps: 10, completed: true },
        ],
      },
    ],
  },
];

export const HistoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { startNewWorkoutSession, testHaptics } = useWorkout();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<number>(11);
  const [selectedWorkout, setSelectedWorkout] = useState<PastWorkoutDetail | null>(null);

  const daysOfWeek = [
    { day: 'Mon', num: 7, active: true },
    { day: 'Tue', num: 8, active: false },
    { day: 'Wed', num: 9, active: true },
    { day: 'Thu', num: 10, active: true },
    { day: 'Fri', num: 11, active: true, today: true },
    { day: 'Sat', num: 12, active: false },
    { day: 'Sun', num: 13, active: false },
  ];

  const filteredWorkouts = ALL_PAST_WORKOUTS.filter((w) => {
    return w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           w.exercises.some((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <View style={styles.screen}>
      <Header subtitle="Workout Logs & Archive" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Input */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search past sessions or exercises..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Interactive Calendar Summary */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>SEPTEMBER 2026</Text>
            <Text style={styles.monthStats}>18 Workouts Logged</Text>
          </View>

          {/* 7 Days of current week (Clickable) */}
          <View style={styles.daysRow}>
            {daysOfWeek.map((item) => {
              const isSelected = selectedDay === item.num;

              return (
                <TouchableOpacity
                  key={item.num}
                  style={[
                    styles.dayBox,
                    isSelected && styles.dayBoxSelected,
                    item.today && !isSelected && styles.dayBoxToday,
                  ]}
                  onPress={() => {
                    setSelectedDay(item.num);
                    testHaptics('light');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dayBoxLabel, isSelected && styles.dayBoxLabelSelected]}>
                    {item.day}
                  </Text>
                  <Text style={[styles.dayBoxNum, isSelected && styles.dayBoxNumSelected]}>
                    {item.num}
                  </Text>
                  <View
                    style={[
                      styles.activityDot,
                      item.active && styles.activityDotActive,
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Workouts History List */}
        <Text style={styles.sectionHeader}>PAST SESSIONS ({filteredWorkouts.length})</Text>

        {filteredWorkouts.map((w) => (
          <TouchableOpacity
            key={w.id}
            style={styles.workoutCard}
            onPress={() => {
              setSelectedWorkout(w);
              testHaptics('light');
            }}
            activeOpacity={0.75}
          >
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.workoutDate}>{w.date}</Text>
                <Text style={styles.workoutTitle}>{w.name}</Text>
              </View>
              <View style={styles.volumePill}>
                <Text style={styles.volumePillText}>{w.volume}</Text>
              </View>
            </View>

            {/* PR Badges if any */}
            {w.prs.length > 0 && (
              <View style={styles.prsRow}>
                {w.prs.map((pr, i) => (
                  <View key={i} style={styles.prBadge}>
                    <Ionicons name="trophy" size={12} color={COLORS.accentGold} />
                    <Text style={styles.prBadgeText}>{pr}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Exercises List */}
            <View style={styles.exerciseList}>
              <Text style={styles.exerciseListText} numberOfLines={1}>
                {w.exercises.map((e) => e.name).join(' • ')}
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
                <Text style={styles.metaText}>{w.duration}</Text>
              </View>
              <View style={styles.detailBtn}>
                <Text style={styles.detailBtnText}>View Full Sets</Text>
                <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredWorkouts.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No workouts found matching "{searchQuery}"</Text>
          </View>
        )}
      </ScrollView>

      {/* Workout Detail Modal */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        visible={selectedWorkout !== null}
        onClose={() => setSelectedWorkout(null)}
        onRepeat={() => {
          if (selectedWorkout) {
            startNewWorkoutSession(selectedWorkout.name);
            setSelectedWorkout(null);
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 13,
    padding: 0,
  },
  calendarCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  monthTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  monthStats: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: RADIUS.sm,
    flex: 1,
  },
  dayBoxSelected: {
    backgroundColor: COLORS.primary,
  },
  dayBoxToday: {
    backgroundColor: 'rgba(0, 229, 153, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 153, 0.35)',
  },
  dayBoxLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  dayBoxLabelSelected: {
    color: '#0B0F17',
    fontWeight: '800',
  },
  dayBoxNum: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  dayBoxNumSelected: {
    color: '#0B0F17',
    fontWeight: '900',
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  activityDotActive: {
    backgroundColor: COLORS.primary,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  workoutCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workoutDate: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  volumePill: {
    backgroundColor: COLORS.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  volumePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  prsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  prBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  prBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accentGold,
  },
  exerciseList: {
    marginBottom: 10,
  },
  exerciseListText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    paddingTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  detailBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  emptyCard: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
});
