import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { useWorkout } from '../context/WorkoutContext';

export const PRModal: React.FC = () => {
  const { isPRModalVisible, latestPR, closePRModal } = useWorkout();

  if (!isPRModalVisible) return null;

  const exerciseName = latestPR?.exercise || 'Barbell Bench Press';
  const calculated1RM = latestPR?.calculated1RM || 101.3;
  const weight = latestPR?.weight || 80;
  const reps = latestPR?.reps || 8;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isPRModalVisible}
      onRequestClose={closePRModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Trophy Badge */}
          <View style={styles.trophyWrapper}>
            <View style={styles.trophyCircle}>
              <Ionicons name="trophy" size={44} color={COLORS.accentGold} />
            </View>
          </View>

          <Text style={styles.congratsBadge}>NEW PERSONAL RECORD!</Text>
          <Text style={styles.exerciseName}>{exerciseName}</Text>

          {/* 1RM Box */}
          <View style={styles.rmCard}>
            <Text style={styles.rmLabel}>ESTIMATED 1RM (EPLEY)</Text>
            <View style={styles.rmValueRow}>
              <Text style={styles.rmValue}>{calculated1RM}</Text>
              <Text style={styles.rmUnit}>kg</Text>
            </View>
            <Text style={styles.rmBreakdown}>
              Achieved via {weight}kg × {reps} reps
            </Text>
          </View>

          <Text style={styles.quote}>
            "Consistency beats intensity. You just raised your benchmark!"
          </Text>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={closePRModal}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>KEEP CRUSHING</Text>
            <Ionicons name="flame" size={18} color="#0B0F17" />
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
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    shadowColor: COLORS.accentGold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
  },
  trophyWrapper: {
    marginBottom: SPACING.md,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  congratsBadge: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.accentGold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  rmCard: {
    width: '100%',
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  rmLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  rmValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rmValue: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primary,
  },
  rmUnit: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  rmBreakdown: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  quote: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  actionBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0B0F17',
    letterSpacing: 1,
  },
});
