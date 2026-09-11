import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';
import { useWorkout } from '../context/WorkoutContext';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser, workoutSeconds } = useWorkout();

  const formatSeconds = (total: number) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Banner */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>WELCOME BACK,</Text>
          <Text style={styles.userName}>{currentUser ? currentUser.name : 'ALEX NGUYEN'}</Text>
          <Text style={styles.quote}>"Today is Push Day. Consistency defines greatness."</Text>
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

          <Text style={styles.activeTitle}>Push Hypertrophy Day</Text>
          <Text style={styles.activeSubtitle}>Barbell Bench Press • Incline DB • Cable Fly</Text>

          <View style={styles.activeFooter}>
            <View style={styles.activeStat}>
              <Ionicons name="barbell-outline" size={16} color={COLORS.primary} />
              <Text style={styles.activeStatText}>4 Sets Active</Text>
            </View>
            <View style={styles.resumeBtn}>
              <Text style={styles.resumeBtnText}>Resume</Text>
              <Ionicons name="arrow-forward" size={14} color="#0B0F17" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Streak & Consistency */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <View style={styles.streakTitleRow}>
              <Ionicons name="flame" size={24} color={COLORS.accentGold} />
              <Text style={styles.streakTitle}>4-Day Streak!</Text>
            </View>
            <Text style={styles.streakGoal}>Goal: 5 days/wk</Text>
          </View>

          <View style={styles.daysRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
              const completed = i < 4;
              return (
                <View key={i} style={styles.dayCol}>
                  <View
                    style={[
                      styles.dayDot,
                      completed ? styles.dayDotActive : styles.dayDotInactive,
                    ]}
                  >
                    {completed && <Ionicons name="checkmark" size={12} color="#0B0F17" />}
                  </View>
                  <Text style={styles.dayLabel}>{day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Weekly Stats 3-Col Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="flash-outline" size={20} color={COLORS.primary} />
            <Text style={styles.statVal}>14,820</Text>
            <Text style={styles.statUnit}>Volume (kg)</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="layers-outline" size={20} color={COLORS.accentGold} />
            <Text style={styles.statVal}>48</Text>
            <Text style={styles.statUnit}>Total Sets</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={20} color="#38BDF8" />
            <Text style={styles.statVal}>3.2h</Text>
            <Text style={styles.statUnit}>Gym Time</Text>
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT WORKOUTS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentItem}>
          <View style={styles.recentIcon}>
            <Ionicons name="fitness-outline" size={22} color={COLORS.primary} />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Pull Power & Lats</Text>
            <Text style={styles.recentMeta}>Yesterday • 1h 05m • 6 exercises</Text>
          </View>
          <Text style={styles.recentVolume}>11,400 kg</Text>
        </View>

        <View style={styles.recentItem}>
          <View style={styles.recentIcon}>
            <Ionicons name="fitness-outline" size={22} color={COLORS.accentGold} />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Legs & Squat PR Day</Text>
            <Text style={styles.recentMeta}>2 days ago • 1h 18m • 5 exercises</Text>
          </View>
          <Text style={styles.recentVolume}>16,250 kg</Text>
        </View>
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
    fontSize: 20,
    fontWeight: '800',
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
    width: 28,
    height: 28,
    borderRadius: 14,
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
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 6,
  },
  statUnit: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1.2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
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
  recentVolume: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
