import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { useWorkout } from '../context/WorkoutContext';

export const WorkoutFinishModal: React.FC = () => {
  const {
    isFinishModalVisible,
    closeFinishModal,
    completeWorkout,
    workoutName,
    workoutSeconds,
    activeExercises,
    unit,
    workoutNotes,
    setWorkoutNotes,
  } = useWorkout();

  if (!isFinishModalVisible) return null;

  const mins = Math.floor(workoutSeconds / 60);
  const secs = workoutSeconds % 60;
  const timeFormatted = `${mins}m ${secs}s`;

  let totalVolume = 0;
  let totalSets = 0;
  let completedSets = 0;

  activeExercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      totalSets += 1;
      if (s.completed) {
        completedSets += 1;
        totalVolume += s.weight * s.reps;
      }
    });
  });

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isFinishModalVisible}
      onRequestClose={closeFinishModal}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Top trophy header */}
          <View style={styles.trophyCircle}>
            <Ionicons name="trophy-outline" size={36} color={COLORS.primary} />
          </View>

          <Text style={styles.congratsText}>WORKOUT SUMMARY</Text>
          <Text style={styles.sessionTitle}>{workoutName}</Text>

          {/* 3 Metric Badges */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Ionicons name="time-outline" size={18} color="#38BDF8" />
              <Text style={styles.metricValue}>{timeFormatted}</Text>
              <Text style={styles.metricLabel}>Duration</Text>
            </View>

            <View style={styles.metricBox}>
              <Ionicons name="flash-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metricValue}>{totalVolume.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Volume ({unit})</Text>
            </View>

            <View style={styles.metricBox}>
              <Ionicons name="layers-outline" size={18} color={COLORS.accentGold} />
              <Text style={styles.metricValue}>{completedSets}/{totalSets}</Text>
              <Text style={styles.metricLabel}>Completed</Text>
            </View>
          </View>

          {/* Notes input */}
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>SESSION NOTES:</Text>
            <TextInput
              style={styles.notesInput}
              value={workoutNotes}
              onChangeText={setWorkoutNotes}
              placeholder="How did today's session feel? Any soreness or cues?"
              placeholderTextColor={COLORS.textMuted}
              multiline
            />
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={completeWorkout}
            activeOpacity={0.8}
          >
            <Ionicons name="cloud-upload" size={18} color="#0B0F17" />
            <Text style={styles.saveBtnText}>SAVE TO SUPABASE CLOUD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resumeBtn}
            onPress={closeFinishModal}
            activeOpacity={0.7}
          >
            <Text style={styles.resumeBtnText}>Keep Training</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 13, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.borderHighlight,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  trophyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: SPACING.md,
  },
  congratsText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginVertical: 4,
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: SPACING.lg,
    width: '100%',
  },
  metricBox: {
    flex: 1,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  notesContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  notesLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
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
  saveBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    marginBottom: 10,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B0F17',
    letterSpacing: 0.5,
  },
  resumeBtn: {
    paddingVertical: 8,
  },
  resumeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
});
