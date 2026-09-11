import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';
import { OneRMCalculatorModal } from '../components/OneRMCalculatorModal';
import { useWorkout } from '../context/WorkoutContext';

export const ProgressScreen: React.FC = () => {
  const { unit, testHaptics } = useWorkout();
  const [selectedLift, setSelectedLift] = useState<'bench' | 'squat' | 'deadlift' | 'ohp'>('bench');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const liftData = {
    bench: {
      name: 'Barbell Bench Press',
      current1RM: 101.3,
      delta: '+3.8%',
      prDate: 'Today',
      bars: [
        { label: 'W1', val: 92.5, height: 50 },
        { label: 'W2', val: 95.0, height: 62 },
        { label: 'W3', val: 95.0, height: 62 },
        { label: 'W4', val: 97.5, height: 75 },
        { label: 'Today', val: 101.3, height: 95, current: true },
      ],
    },
    squat: {
      name: 'Back Squat',
      current1RM: 145.0,
      delta: '+5.1%',
      prDate: '3 days ago',
      bars: [
        { label: 'W1', val: 130.0, height: 55 },
        { label: 'W2', val: 135.0, height: 65 },
        { label: 'W3', val: 135.0, height: 65 },
        { label: 'W4', val: 140.0, height: 78 },
        { label: 'Today', val: 145.0, height: 95, current: true },
      ],
    },
    deadlift: {
      name: 'Conventional Deadlift',
      current1RM: 185.0,
      delta: '+2.8%',
      prDate: '1 week ago',
      bars: [
        { label: 'W1', val: 170.0, height: 60 },
        { label: 'W2', val: 175.0, height: 70 },
        { label: 'W3', val: 175.0, height: 70 },
        { label: 'W4', val: 180.0, height: 82 },
        { label: 'Today', val: 185.0, height: 95, current: true },
      ],
    },
    ohp: {
      name: 'Overhead Press (OHP)',
      current1RM: 65.0,
      delta: '+4.0%',
      prDate: '5 days ago',
      bars: [
        { label: 'W1', val: 57.5, height: 55 },
        { label: 'W2', val: 60.0, height: 68 },
        { label: 'W3', val: 60.0, height: 68 },
        { label: 'W4', val: 62.5, height: 80 },
        { label: 'Today', val: 65.0, height: 95, current: true },
      ],
    },
  };

  const muscleData = [
    {
      id: 'chest',
      muscle: 'Chest & Push',
      percent: 32,
      volume: `14,200 ${unit}`,
      color: COLORS.primary,
      exercises: ['Barbell Bench Press', 'Incline Dumbbell Press', 'Cable Fly', 'Dips'],
    },
    {
      id: 'back',
      muscle: 'Back & Pull',
      percent: 28,
      volume: `12,400 ${unit}`,
      color: '#38BDF8',
      exercises: ['Deadlift', 'Barbell Row', 'Lat Pulldown', 'Pull-Ups'],
    },
    {
      id: 'legs',
      muscle: 'Legs & Core',
      percent: 26,
      volume: `11,500 ${unit}`,
      color: COLORS.accentGold,
      exercises: ['Back Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raises'],
    },
    {
      id: 'arms',
      muscle: 'Arms & Delts',
      percent: 14,
      volume: `6,200 ${unit}`,
      color: '#A855F7',
      exercises: ['Bicep Curls', 'Tricep Pushdown', 'Overhead Press', 'Lateral Raises'],
    },
  ];

  const current = liftData[selectedLift];

  return (
    <View style={styles.screen}>
      <Header subtitle="Strength & 1RM Progression" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Calculator Banner */}
        <TouchableOpacity
          style={styles.calcBanner}
          onPress={() => {
            setIsCalculatorVisible(true);
            testHaptics('light');
          }}
          activeOpacity={0.8}
        >
          <View style={styles.calcLeft}>
            <View style={styles.calcIconCircle}>
              <Ionicons name="calculator-outline" size={22} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.calcTitle}>1RM STRENGTH CALCULATOR</Text>
              <Text style={styles.calcSub}>Compute your max lift & percentage load</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Lift Selector Pills */}
        <View style={styles.selectorRow}>
          {(['bench', 'squat', 'deadlift', 'ohp'] as const).map((key) => {
            const active = selectedLift === key;
            const labels = { bench: 'Bench', squat: 'Squat', deadlift: 'Deadlift', ohp: 'OHP' };
            return (
              <TouchableOpacity
                key={key}
                style={[styles.selectorBtn, active && styles.selectorBtnActive]}
                onPress={() => {
                  setSelectedLift(key);
                  testHaptics('light');
                }}
              >
                <Text style={[styles.selectorText, active && styles.selectorTextActive]}>
                  {labels[key]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 1RM Highlight Card */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.exerciseName}>{current.name}</Text>
              <Text style={styles.prDateText}>Latest Record: {current.prDate}</Text>
            </View>
            <View style={styles.deltaBadge}>
              <Ionicons name="trending-up" size={14} color={COLORS.primary} />
              <Text style={styles.deltaText}>{current.delta}</Text>
            </View>
          </View>

          <View style={styles.valueRow}>
            <Text style={styles.big1RM}>{current.current1RM}</Text>
            <Text style={styles.unitText}>{unit.toUpperCase()}</Text>
            <Text style={styles.subtext}>Estimated 1RM (Epley)</Text>
          </View>

          {/* Timeframe Filter Buttons */}
          <View style={styles.timeframeRow}>
            {(['1W', '1M', '3M', '1Y'] as const).map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[styles.tfBtn, selectedTimeframe === tf && styles.tfBtnActive]}
                onPress={() => {
                  setSelectedTimeframe(tf);
                  testHaptics('light');
                }}
              >
                <Text style={[styles.tfText, selectedTimeframe === tf && styles.tfTextActive]}>
                  {tf}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Simulated Chart Bars */}
          <View style={styles.chartContainer}>
            <View style={styles.barChart}>
              {current.bars.map((item, idx) => (
                <View key={idx} style={styles.barCol}>
                  <Text style={styles.barValText}>{item.val}</Text>
                  <View
                    style={[
                      styles.barFill,
                      { height: item.height },
                      item.current ? styles.barFillCurrent : styles.barFillPast,
                    ]}
                  />
                  <Text style={[styles.barLabel, item.current && styles.barLabelCurrent]}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Muscle Split Volume (Clickable) */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>MUSCLE VOLUME DISTRIBUTION (TAP TO EXPAND)</Text>

          {muscleData.map((item) => {
            const isExpanded = selectedMuscle === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.muscleRow}
                onPress={() => {
                  setSelectedMuscle(isExpanded ? null : item.id);
                  testHaptics('light');
                }}
                activeOpacity={0.8}
              >
                <View style={styles.muscleMeta}>
                  <Text style={styles.muscleName}>{item.muscle}</Text>
                  <Text style={styles.muscleVol}>{item.volume} ({item.percent}%)</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${item.percent}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>

                {isExpanded && (
                  <View style={styles.muscleExercisesBox}>
                    <Text style={styles.muscleExTitle}>Top Contributing Exercises:</Text>
                    {item.exercises.map((ex, i) => (
                      <Text key={i} style={styles.muscleExItem}>• {ex}</Text>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 1RM Calculator Modal */}
      <OneRMCalculatorModal
        visible={isCalculatorVisible}
        onClose={() => setIsCalculatorVisible(false)}
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
  calcBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 153, 0.3)',
    marginBottom: SPACING.lg,
  },
  calcLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  calcIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  calcSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.lg,
  },
  selectorBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  selectorBtnActive: {
    backgroundColor: COLORS.primarySubtle,
    borderColor: COLORS.borderHighlight,
  },
  selectorText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  selectorTextActive: {
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  prDateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  deltaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primarySubtle,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  deltaText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: SPACING.md,
  },
  big1RM: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.primary,
  },
  unitText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMuted,
  },
  subtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  timeframeRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.sm,
    padding: 3,
    marginBottom: SPACING.md,
    gap: 4,
  },
  tfBtn: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  tfBtnActive: {
    backgroundColor: COLORS.primary,
  },
  tfText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  tfTextActive: {
    color: '#0B0F17',
    fontWeight: '800',
  },
  chartContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    paddingTop: SPACING.md,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 10,
  },
  barCol: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  barValText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  barFill: {
    width: 24,
    borderRadius: 6,
  },
  barFillPast: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  barFillCurrent: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  barLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  barLabelCurrent: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  muscleRow: {
    marginBottom: 14,
    backgroundColor: COLORS.bgElevated,
    padding: 10,
    borderRadius: RADIUS.md,
  },
  muscleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  muscleName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  muscleVol: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  muscleExercisesBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },
  muscleExTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  muscleExItem: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
});
