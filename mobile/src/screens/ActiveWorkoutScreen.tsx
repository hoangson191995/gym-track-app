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
import { AddExerciseModal } from '../components/AddExerciseModal';
import { WorkoutFinishModal } from '../components/WorkoutFinishModal';
import { useWorkout } from '../context/WorkoutContext';

export const ActiveWorkoutScreen: React.FC = () => {
  const {
    workoutName,
    workoutSeconds,
    isWorkoutTimerRunning,
    toggleTimerPause,
    activeExercises,
    toggleExerciseExpanded,
    addSet,
    removeExerciseFromWorkout,
    openFinishModal,
    workoutNotes,
    setWorkoutNotes,
    unit,
  } = useWorkout();

  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);

  const formatSeconds = (total: number) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.screen}>
      <Header subtitle="Active Session" />

      {/* Top Workout Control Bar */}
      <View style={styles.sessionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sessionTitle} numberOfLines={1}>{workoutName}</Text>
          <TouchableOpacity
            style={styles.timerBadge}
            onPress={toggleTimerPause}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isWorkoutTimerRunning ? 'pause-circle-outline' : 'play-circle-outline'}
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.timerText}>{formatSeconds(workoutSeconds)}</Text>
            <Text style={styles.timerStatus}>({isWorkoutTimerRunning ? 'Running' : 'Paused'})</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.finishBtn}
          onPress={openFinishModal}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={16} color="#0B0F17" />
          <Text style={styles.finishBtnText}>Finish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dynamic List of Active Exercises */}
        {activeExercises.map((exercise, exIndex) => {
          const completedCount = exercise.sets.filter((s) => s.completed).length;

          return (
            <View key={exercise.id} style={styles.exerciseCard}>
              {/* Exercise Header - Tap to Expand/Collapse */}
              <View style={styles.exerciseHeader}>
                <TouchableOpacity
                  style={styles.headerTitleArea}
                  onPress={() => toggleExerciseExpanded(exercise.id)}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={styles.exerciseIndex}>EXERCISE {exIndex + 1} OF {activeExercises.length}</Text>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    {!exercise.isExpanded && (
                      <Text style={styles.collapsedSubtitle}>
                        {completedCount}/{exercise.sets.length} sets completed • Tap to expand
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.headerRightActions}>
                  <TouchableOpacity
                    style={styles.deleteExBtn}
                    onPress={() => removeExerciseFromWorkout(exercise.id)}
                  >
                    <Ionicons name="trash-outline" size={16} color={COLORS.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleExerciseExpanded(exercise.id)}
                    style={styles.expandIconBtn}
                  >
                    <Ionicons
                      name={exercise.isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expanded Body */}
              {exercise.isExpanded && (
                <>
                  {/* Muscle Badges */}
                  <View style={styles.badgeRow}>
                    {exercise.targetMuscles.map((muscle, mIdx) => (
                      <View
                        key={mIdx}
                        style={[styles.badge, mIdx === 0 && styles.badgePrimary]}
                      >
                        <Text style={[styles.badgeText, mIdx === 0 && styles.badgePrimaryText]}>
                          {muscle}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Table Header */}
                  <View style={styles.tableHeader}>
                    <Text style={[styles.th, { width: 48 }]}>SET</Text>
                    <Text style={[styles.th, { flex: 1.1 }]}>PREVIOUS</Text>
                    <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>{unit.toUpperCase()}</Text>
                    <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>REPS</Text>
                    <Text style={[styles.th, { width: 34, textAlign: 'center' }]}>✓</Text>
                    <Text style={[styles.th, { width: 22 }]}></Text>
                  </View>

                  {/* Sets List */}
                  {exercise.sets.map((item) => (
                    <SetRow
                      key={item.id}
                      exerciseId={exercise.id}
                      set={item}
                      prevWeight={item.weight}
                      prevReps={item.reps}
                    />
                  ))}

                  {/* Quick Add Set Button */}
                  <TouchableOpacity
                    style={styles.addSetBtn}
                    onPress={() => addSet(exercise.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={16} color={COLORS.primary} />
                    <Text style={styles.addSetBtnText}>Add Set</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
        })}

        {/* Add New Exercise Card / Button */}
        <TouchableOpacity
          style={styles.addExerciseMainBtn}
          onPress={() => setIsAddExerciseModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={22} color={COLORS.primary} />
          <Text style={styles.addExerciseMainBtnText}>+ ADD EXERCISE TO SESSION</Text>
        </TouchableOpacity>

        {/* Workout Notes Section */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Ionicons name="create-outline" size={16} color={COLORS.primary} />
            <Text style={styles.notesTitle}>SESSION LOG & NOTES</Text>
          </View>
          <TextInput
            style={styles.notesInput}
            value={workoutNotes}
            onChangeText={setWorkoutNotes}
            placeholder="Add notes about form, cues, feeling, or equipment settings..."
            placeholderTextColor={COLORS.textMuted}
            multiline
          />
        </View>
      </ScrollView>

      {/* Floating Rest Timer Component */}
      <RestTimerBar />

      {/* Add Exercise Modal */}
      <AddExerciseModal
        visible={isAddExerciseModalVisible}
        onClose={() => setIsAddExerciseModalVisible(false)}
      />

      {/* Finish Workout Summary Modal */}
      <WorkoutFinishModal />
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
    gap: 5,
    marginTop: 3,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    fontVariant: ['tabular-nums'],
  },
  timerStatus: {
    fontSize: 11,
    color: COLORS.textMuted,
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
    paddingBottom: 140,
  },
  exerciseCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleArea: {
    flex: 1,
  },
  exerciseIndex: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  collapsedSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteExBtn: {
    padding: 6,
  },
  expandIconBtn: {
    padding: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: SPACING.sm,
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
    paddingHorizontal: 10,
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
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    backgroundColor: 'rgba(0, 229, 153, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 153, 0.25)',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addSetBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  addExerciseMainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    marginBottom: SPACING.lg,
  },
  addExerciseMainBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 0.8,
  },
  notesCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  notesInput: {
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: 10,
    color: COLORS.textPrimary,
    fontSize: 13,
    minHeight: 60,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
});
