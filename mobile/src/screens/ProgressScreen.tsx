import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';

export const ProgressScreen: React.FC = () => {
  const [selectedLift, setSelectedLift] = useState<'bench' | 'squat' | 'deadlift'>('bench');

  const liftData = {
    bench: { name: 'Barbell Bench Press', current1RM: 101.3, delta: '+3.8%', prDate: 'Today', prev: 97.5 },
    squat: { name: 'Back Squat', current1RM: 145.0, delta: '+5.1%', prDate: '3 days ago', prev: 138.0 },
    deadlift: { name: 'Conventional Deadlift', current1RM: 185.0, delta: '+2.8%', prDate: '1 week ago', prev: 180.0 },
  };

  const current = liftData[selectedLift];

  return (
    <View style={styles.screen}>
      <Header subtitle="Analytics & 1RM Progression" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Lift Selector Pills */}
        <View style={styles.selectorRow}>
          {(['bench', 'squat', 'deadlift'] as const).map((key) => {
            const active = selectedLift === key;
            const labels = { bench: 'Bench', squat: 'Squat', deadlift: 'Deadlift' };
            return (
              <TouchableOpacity
                key={key}
                style={[styles.selectorBtn, active && styles.selectorBtnActive]}
                onPress={() => setSelectedLift(key)}
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
            <View>
              <Text style={styles.exerciseName}>{current.name}</Text>
              <Text style={styles.prDateText}>Latest PR: {current.prDate}</Text>
            </View>
            <View style={styles.deltaBadge}>
              <Ionicons name="trending-up" size={14} color={COLORS.primary} />
              <Text style={styles.deltaText}>{current.delta}</Text>
            </View>
          </View>

          <View style={styles.valueRow}>
            <Text style={styles.big1RM}>{current.current1RM}</Text>
            <Text style={styles.unitText}>KG</Text>
            <Text style={styles.subtext}>Estimated 1RM</Text>
          </View>

          {/* Simulated Chart Bars */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>LAST 5 SESSIONS (EPLEY CURVE)</Text>
            <View style={styles.barChart}>
              {[
                { label: 'W1', val: 92.5, height: 50 },
                { label: 'W2', val: 95.0, height: 62 },
                { label: 'W3', val: 95.0, height: 62 },
                { label: 'W4', val: 97.5, height: 75 },
                { label: 'Today', val: current.current1RM, height: 95, current: true },
              ].map((item, idx) => (
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

        {/* Muscle Split Volume */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>MUSCLE VOLUME DISTRIBUTION (THIS MONTH)</Text>

          {[
            { muscle: 'Chest & Push', percent: 32, volume: '14,200 kg', color: COLORS.primary },
            { muscle: 'Back & Pull', percent: 28, volume: '12,400 kg', color: '#38BDF8' },
            { muscle: 'Legs & Core', percent: 26, volume: '11,500 kg', color: COLORS.accentGold },
            { muscle: 'Arms & Delts', percent: 14, volume: '6,200 kg', color: '#A855F7' },
          ].map((item, idx) => (
            <View key={idx} style={styles.muscleRow}>
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
            </View>
          ))}
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
    marginBottom: SPACING.lg,
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
  chartContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
    paddingTop: SPACING.md,
  },
  chartTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 16,
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
    marginBottom: 12,
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
});
