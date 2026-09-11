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
import { SetRow } from '../components/SetRow';
import { RestTimerBar } from '../components/RestTimerBar';
import { useWorkout } from '../context/WorkoutContext';

export const ActiveWorkoutScreen: React.FC = () => {
  const {
    workoutSeconds,
    sets,
    toggleSet,
    addSet,
    completeWorkout,
  } = useWorkout();

  const [weightInput, setWeightInput] = useState('80');
  const [repsInput, setRepsInput] = useState('8');
  const [showAddControls, setShowAddControls] = useState(false);

  const formatSeconds = (total: number) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddNewSet = () => {
    const w = parseFloat(weightInput) || 80;
    const r = parseInt(repsInput, 10) || 8;
    addSet(w, r, 8.5, 'N');
    setShowAddControls(false);
  };

  return (
    <View style={styles.screen}>
      <Header subtitle="Active Training Session" />

      {/* Top Workout Control Bar */}
      <View style={styles.sessionHeader}>
        <View>
          <Text style={styles.sessionTitle}>Push Day (A)</Text>
          <View style={styles.timerBadge}>
            <Ionicons name="stopwatch-outline" size={14} color={COLORS.primary} />
            <Text style={styles.timerText}>{formatSeconds(workoutSeconds)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.finishBtn}
          onPress={completeWorkout}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={16} color="#0B0F17" />
          <Text style={styles.finishBtnText}>Finish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Exercise Card 1: Barbell Bench Press */}
        <View style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <View>
              <Text style={styles.exerciseIndex}>EXERCISE 1 OF 5</Text>
              <Text style={styles.exerciseName}>Barbell Bench Press</Text>
            </View>
            <TouchableOpacity style={styles.infoIcon}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Muscle Badges */}
          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.badgePrimary]}>
              <Text style={styles.badgePrimaryText}>Chest</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Triceps</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Front Delts</Text>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { width: 44 }]}>SET</Text>
            <Text style={[styles.th, { flex: 1.2 }]}>PREVIOUS</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>KG</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>REPS</Text>
            <Text style={[styles.th, { width: 42, textAlign: 'center' }]}>✓</Text>
          </View>

          {/* Sets List */}
          {sets.map((item) => (
            <SetRow
              key={item.id}
              set={item}
              prevWeight={80}
              prevReps={8}
              onToggle={toggleSet}
            />
          ))}

          {/* Add Set Quick Input or Button */}
          {showAddControls ? (
            <View style={styles.addControlBox}>
              <Text style={styles.addControlLabel}>Next Set Details:</Text>
              <View style={styles.addInputRow}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Weight (kg)</Text>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={weightInput}
                    onChangeText={setWeightInput}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Reps</Text>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={repsInput}
                    onChangeText={setRepsInput}
                  />
                </View>
              </View>

              <View style={styles.addActionsRow}>
                <TouchableOpacity
                  style={styles.cancelAddBtn}
                  onPress={() => setShowAddControls(false)}
                >
                  <Text style={styles.cancelAddText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmAddBtn}
                  onPress={handleAddNewSet}
                >
                  <Text style={styles.confirmAddText}>Confirm Set</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addSetBtn}
              onPress={() => setShowAddControls(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={18} color={COLORS.primary} />
              <Text style={styles.addSetBtnText}>Add Set</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Exercise Card 2 Preview: Incline Dumbbell Press */}
        <View style={[styles.exerciseCard, styles.exerciseCardCollapsed]}>
          <View style={styles.exerciseHeader}>
            <View>
              <Text style={styles.exerciseIndex}>EXERCISE 2 OF 5</Text>
              <Text style={styles.exerciseName}>Incline Dumbbell Press</Text>
              <Text style={styles.nextUpPreview}>3 sets planned • 32kg target</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={COLORS.textMuted} />
          </View>
        </View>

        {/* Exercise Card 3 Preview: Cable Chest Fly */}
        <View style={[styles.exerciseCard, styles.exerciseCardCollapsed]}>
          <View style={styles.exerciseHeader}>
            <View>
              <Text style={styles.exerciseIndex}>EXERCISE 3 OF 5</Text>
              <Text style={styles.exerciseName}>Cable Chest Fly</Text>
              <Text style={styles.nextUpPreview}>3 sets planned • 18kg target</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={COLORS.textMuted} />
          </View>
        </View>
      </ScrollView>

      {/* Floating Rest Timer Component */}
      <RestTimerBar />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderCard,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    fontVariant: ['tabular-nums'],
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  finishBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B0F17',
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  exerciseCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  exerciseCardCollapsed: {
    opacity: 0.75,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  exerciseIndex: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  nextUpPreview: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  infoIcon: {
    padding: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: SPACING.md,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  badgePrimary: {
    backgroundColor: COLORS.primarySubtle,
  },
  badgePrimaryText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
    marginBottom: 4,
  },
  th: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(0, 229, 153, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 153, 0.25)',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addSetBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  addControlBox: {
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.borderHighlight,
  },
  addControlLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  addInputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
  },
  addActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancelAddBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  cancelAddText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  confirmAddBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
  },
  confirmAddText: {
    fontSize: 12,
    color: '#0B0F17',
    fontWeight: '800',
  },
});
