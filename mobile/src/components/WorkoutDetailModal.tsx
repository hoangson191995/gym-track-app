import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { useWorkout } from '../context/WorkoutContext';

export interface PastWorkoutDetail {
  id: string;
  name: string;
  date: string;
  duration: string;
  volume: string;
  prs: string[];
  exercises: { name: string; sets: { setNumber: number; weight: number; reps: number; completed: boolean }[] }[];
}

interface WorkoutDetailModalProps {
  workout: PastWorkoutDetail | null;
  visible: boolean;
  onClose: () => void;
  onRepeat?: () => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  workout,
  visible,
  onClose,
  onRepeat,
}) => {
  const { unit } = useWorkout();

  if (!workout) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dateText}>{workout.date}</Text>
              <Text style={styles.workoutTitle}>{workout.name}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Quick stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="time-outline" size={16} color="#38BDF8" />
              <Text style={styles.statVal}>{workout.duration}</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="flash-outline" size={16} color={COLORS.primary} />
              <Text style={styles.statVal}>{workout.volume}</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="barbell-outline" size={16} color={COLORS.accentGold} />
              <Text style={styles.statVal}>{workout.exercises.length} Exercises</Text>
            </View>
          </View>

          {/* PR Banner if any */}
          {workout.prs.length > 0 && (
            <View style={styles.prBanner}>
              <Ionicons name="trophy" size={16} color={COLORS.accentGold} />
              <Text style={styles.prBannerText}>
                PR Hit: {workout.prs.join(', ')}
              </Text>
            </View>
          )}

          {/* Exercises list */}
          <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
            {workout.exercises.map((ex, idx) => (
              <View key={idx} style={styles.exerciseCard}>
                <Text style={styles.exName}>{idx + 1}. {ex.name}</Text>
                <View style={styles.setsTable}>
                  {ex.sets.map((s) => (
                    <View key={s.setNumber} style={styles.setRow}>
                      <Text style={styles.setNum}>Set {s.setNumber}</Text>
                      <Text style={styles.setMetric}>{s.weight} {unit} × {s.reps} reps</Text>
                      <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Repeat Workout Action */}
          {onRepeat && (
            <TouchableOpacity
              style={styles.repeatBtn}
              onPress={onRepeat}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={18} color="#0B0F17" />
              <Text style={styles.repeatBtnText}>REPEAT THIS WORKOUT</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 13, 0.85)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.md,
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.bgElevated,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  statVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  prBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    padding: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: SPACING.md,
  },
  prBannerText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accentGold,
  },
  scrollList: {
    maxHeight: 320,
    marginBottom: SPACING.md,
  },
  exerciseCard: {
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  exName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  setsTable: {
    gap: 6,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  setNum: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  setMetric: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  repeatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    marginBottom: 10,
  },
  repeatBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B0F17',
    letterSpacing: 0.5,
  },
});
