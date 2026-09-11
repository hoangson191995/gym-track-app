import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { WorkoutSet } from '../api/apiClient';
import { useWorkout } from '../context/WorkoutContext';

interface SetRowProps {
  exerciseId: string;
  set: WorkoutSet;
  prevWeight?: number;
  prevReps?: number;
}

const SET_TYPES: WorkoutSet['setType'][] = ['N', 'W', 'D', 'F', 'S'];

export const SetRow: React.FC<SetRowProps> = ({
  exerciseId,
  set,
  prevWeight = 80,
  prevReps = 8,
}) => {
  const { toggleSet, updateSet, deleteSet, unit, testHaptics } = useWorkout();

  const getBadgeColor = (type: WorkoutSet['setType']) => {
    switch (type) {
      case 'W':
        return { bg: 'rgba(245, 158, 11, 0.18)', text: COLORS.accentGold, label: 'WARM' };
      case 'D':
        return { bg: 'rgba(168, 85, 247, 0.18)', text: '#A855F7', label: 'DROP' };
      case 'F':
        return { bg: 'rgba(239, 68, 68, 0.18)', text: COLORS.danger, label: 'FAIL' };
      case 'S':
        return { bg: 'rgba(56, 189, 248, 0.18)', text: '#38BDF8', label: 'SUPER' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.08)', text: COLORS.textSecondary, label: 'NORM' };
    }
  };

  const badge = getBadgeColor(set.setType);

  const cycleSetType = () => {
    const currentIndex = SET_TYPES.indexOf(set.setType);
    const nextType = SET_TYPES[(currentIndex + 1) % SET_TYPES.length];
    updateSet(exerciseId, set.id, { setType: nextType });
    testHaptics('light');
  };

  const handleWeightChange = (text: string) => {
    const val = parseFloat(text);
    updateSet(exerciseId, set.id, { weight: isNaN(val) ? 0 : val });
  };

  const handleRepsChange = (text: string) => {
    const val = parseInt(text, 10);
    updateSet(exerciseId, set.id, { reps: isNaN(val) ? 0 : val });
  };

  return (
    <View style={[styles.container, set.completed && styles.containerCompleted]}>
      {/* Set Number & Clickable Type Badge */}
      <View style={styles.indexCol}>
        <Text style={styles.indexText}>{set.setNumber}</Text>
        <TouchableOpacity
          style={[styles.typeBadge, { backgroundColor: badge.bg }]}
          onPress={cycleSetType}
          activeOpacity={0.7}
        >
          <Text style={[styles.typeBadgeText, { color: badge.text }]}>
            {set.setType}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Previous Performance */}
      <View style={styles.prevCol}>
        <Text style={styles.prevText}>
          {prevWeight}{unit} × {prevReps}
        </Text>
      </View>

      {/* Editable Weight Input */}
      <View style={styles.metricCol}>
        <TextInput
          style={[styles.inputBox, set.completed && styles.inputCompleted]}
          keyboardType="numeric"
          value={set.weight ? set.weight.toString() : ''}
          placeholder="0"
          placeholderTextColor={COLORS.textMuted}
          onChangeText={handleWeightChange}
          selectTextOnFocus
        />
        <Text style={styles.metricUnit}>{unit}</Text>
      </View>

      {/* Editable Reps Input */}
      <View style={styles.metricCol}>
        <TextInput
          style={[styles.inputBox, set.completed && styles.inputCompleted]}
          keyboardType="numeric"
          value={set.reps ? set.reps.toString() : ''}
          placeholder="0"
          placeholderTextColor={COLORS.textMuted}
          onChangeText={handleRepsChange}
          selectTextOnFocus
        />
        <Text style={styles.metricUnit}>reps</Text>
      </View>

      {/* Completion Checkmark Button */}
      <TouchableOpacity
        style={[
          styles.checkBtn,
          set.completed ? styles.checkBtnCompleted : styles.checkBtnPending,
        ]}
        onPress={() => toggleSet(exerciseId, set.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={set.completed ? 'checkmark-done' : 'checkmark'}
          size={18}
          color={set.completed ? '#0B0F17' : COLORS.textMuted}
        />
      </TouchableOpacity>

      {/* Delete button (small trash icon) */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteSet(exerciseId, set.id)}
        activeOpacity={0.6}
      >
        <Ionicons name="close" size={14} color={COLORS.textMuted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgElevated,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  containerCompleted: {
    backgroundColor: 'rgba(0, 229, 153, 0.06)',
    borderColor: 'rgba(0, 229, 153, 0.25)',
  },
  indexCol: {
    width: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  indexText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  typeBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  prevCol: {
    flex: 1.1,
    justifyContent: 'center',
  },
  prevText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  metricCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  inputBox: {
    width: 42,
    height: 32,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    padding: 0,
  },
  inputCompleted: {
    borderColor: 'rgba(0, 229, 153, 0.3)',
    color: COLORS.primary,
  },
  metricUnit: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  checkBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  checkBtnPending: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  checkBtnCompleted: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 2,
  },
});
