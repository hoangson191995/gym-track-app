import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { WorkoutSet } from '../api/apiClient';

interface SetRowProps {
  set: WorkoutSet;
  prevWeight?: number;
  prevReps?: number;
  onToggle: (id: string) => void;
}

export const SetRow: React.FC<SetRowProps> = ({
  set,
  prevWeight = 80,
  prevReps = 8,
  onToggle,
}) => {
  const getBadgeColor = (type: WorkoutSet['setType']) => {
    switch (type) {
      case 'W':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: COLORS.accentGold };
      case 'D':
        return { bg: 'rgba(168, 85, 247, 0.15)', text: '#A855F7' };
      case 'F':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: COLORS.danger };
      default:
        return { bg: 'rgba(255, 255, 255, 0.08)', text: COLORS.textSecondary };
    }
  };

  const badge = getBadgeColor(set.setType);

  return (
    <View style={[styles.container, set.completed && styles.containerCompleted]}>
      {/* Set Number & Type */}
      <View style={styles.indexCol}>
        <Text style={styles.indexText}>{set.setNumber}</Text>
        <View style={[styles.typeBadge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.typeBadgeText, { color: badge.text }]}>
            {set.setType}
          </Text>
        </View>
      </View>

      {/* Previous Performance */}
      <View style={styles.prevCol}>
        <Text style={styles.prevText}>
          {prevWeight}kg × {prevReps}
        </Text>
      </View>

      {/* Weight */}
      <View style={styles.metricCol}>
        <Text style={styles.metricVal}>{set.weight}</Text>
        <Text style={styles.metricUnit}>kg</Text>
      </View>

      {/* Reps */}
      <View style={styles.metricCol}>
        <Text style={styles.metricVal}>{set.reps}</Text>
        <Text style={styles.metricUnit}>reps</Text>
      </View>

      {/* Complete Checkbox */}
      <TouchableOpacity
        style={[
          styles.checkBtn,
          set.completed ? styles.checkBtnCompleted : styles.checkBtnPending,
        ]}
        onPress={() => onToggle(set.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={set.completed ? 'checkmark-done' : 'checkmark'}
          size={18}
          color={set.completed ? '#0B0F17' : COLORS.textMuted}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgElevated,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  containerCompleted: {
    backgroundColor: 'rgba(0, 229, 153, 0.05)',
    borderColor: 'rgba(0, 229, 153, 0.2)',
  },
  indexCol: {
    width: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  indexText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  typeBadge: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  typeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  prevCol: {
    flex: 1.2,
    justifyContent: 'center',
  },
  prevText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  metricCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    justifyContent: 'center',
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  metricUnit: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  checkBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  checkBtnPending: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  checkBtnCompleted: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
});
