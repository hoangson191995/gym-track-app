import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';

export const HistoryScreen: React.FC = () => {
  const pastWorkouts = [
    {
      id: 'w_1',
      date: 'Today, 7:30 PM',
      name: 'Push Day (Hypertrophy)',
      duration: '42m',
      volume: '14,820 kg',
      prs: ['Bench Press 101.3kg'],
      exercises: ['Barbell Bench Press', 'Incline DB Press', 'Cable Fly'],
    },
    {
      id: 'w_2',
      date: 'Yesterday, 6:15 PM',
      name: 'Pull Power & Heavy Rows',
      duration: '1h 05m',
      volume: '11,400 kg',
      prs: ['Barbell Row 90kg'],
      exercises: ['Deadlift', 'Barbell Row', 'Lat Pulldown', 'Bicep Curls'],
    },
    {
      id: 'w_3',
      date: 'Wed, Sep 9',
      name: 'Leg Day & Squats',
      duration: '1h 18m',
      volume: '16,250 kg',
      prs: ['Squat 145kg'],
      exercises: ['Back Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raises'],
    },
    {
      id: 'w_4',
      date: 'Mon, Sep 7',
      name: 'Upper Body Conditioning',
      duration: '54m',
      volume: '9,800 kg',
      prs: [],
      exercises: ['Overhead Press', 'Dips', 'Lateral Raises', 'Facepulls'],
    },
  ];

  return (
    <View style={styles.screen}>
      <Header subtitle="Workout Logs & Archive" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Calendar Summary */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>SEPTEMBER 2026</Text>
            <Text style={styles.monthStats}>18 Workouts</Text>
          </View>

          {/* 7 Days of current week */}
          <View style={styles.daysRow}>
            {[
              { day: 'Mon', num: '7', active: true },
              { day: 'Tue', num: '8', active: false },
              { day: 'Wed', num: '9', active: true },
              { day: 'Thu', num: '10', active: true },
              { day: 'Fri', num: '11', active: true, today: true },
              { day: 'Sat', num: '12', active: false },
              { day: 'Sun', num: '13', active: false },
            ].map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.dayBox,
                  item.today && styles.dayBoxToday,
                ]}
              >
                <Text style={[styles.dayBoxLabel, item.today && styles.dayBoxLabelToday]}>
                  {item.day}
                </Text>
                <Text style={[styles.dayBoxNum, item.today && styles.dayBoxNumToday]}>
                  {item.num}
                </Text>
                <View
                  style={[
                    styles.activityDot,
                    item.active && styles.activityDotActive,
                  ]}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Workouts History List */}
        <Text style={styles.sectionHeader}>PAST SESSIONS</Text>

        {pastWorkouts.map((w) => (
          <View key={w.id} style={styles.workoutCard}>
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
                {w.exercises.join(' • ')}
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={COLORS.textMuted} />
                <Text style={styles.metaText}>{w.duration}</Text>
              </View>
              <TouchableOpacity style={styles.detailBtn}>
                <Text style={styles.detailBtnText}>View Details</Text>
                <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  dayBoxToday: {
    backgroundColor: 'rgba(0, 229, 153, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 153, 0.3)',
  },
  dayBoxLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  dayBoxLabelToday: {
    color: COLORS.primary,
  },
  dayBoxNum: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  dayBoxNumToday: {
    color: COLORS.primary,
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
});
