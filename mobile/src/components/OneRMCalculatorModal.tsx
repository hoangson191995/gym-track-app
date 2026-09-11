import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { useWorkout } from '../context/WorkoutContext';

interface OneRMCalculatorModalProps {
  visible: boolean;
  onClose: () => void;
}

export const OneRMCalculatorModal: React.FC<OneRMCalculatorModalProps> = ({
  visible,
  onClose,
}) => {
  const { unit, testHaptics } = useWorkout();
  const [weightInput, setWeightInput] = useState('100');
  const [repsInput, setRepsInput] = useState('5');

  const weight = parseFloat(weightInput) || 0;
  const reps = parseInt(repsInput, 10) || 1;

  // Epley formula: w * (1 + r / 30)
  const oneRM = reps === 1 ? weight : Math.round(weight * (1 + reps / 30) * 10) / 10;

  const percentages = [
    { pct: 100, repsText: '1 rep max', val: Math.round(oneRM * 1.0) },
    { pct: 95, repsText: '~2 reps', val: Math.round(oneRM * 0.95) },
    { pct: 90, repsText: '~4 reps', val: Math.round(oneRM * 0.90) },
    { pct: 85, repsText: '~6 reps', val: Math.round(oneRM * 0.85) },
    { pct: 80, repsText: '~8 reps', val: Math.round(oneRM * 0.80) },
    { pct: 75, repsText: '~10 reps', val: Math.round(oneRM * 0.75) },
    { pct: 70, repsText: '~12 reps', val: Math.round(oneRM * 0.70) },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>1RM STRENGTH CALCULATOR</Text>
              <Text style={styles.subtitle}>Epley Formula Benchmark</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Inputs Row */}
          <View style={styles.inputRow}>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>LIFTED WEIGHT ({unit})</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={weightInput}
                onChangeText={(t) => {
                  setWeightInput(t);
                  testHaptics('light');
                }}
                selectTextOnFocus
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>REPS PERFORMED</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                value={repsInput}
                onChangeText={(t) => {
                  setRepsInput(t);
                  testHaptics('light');
                }}
                selectTextOnFocus
              />
            </View>
          </View>

          {/* Result Card */}
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>ESTIMATED 1 REP MAX</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultValue}>{oneRM}</Text>
              <Text style={styles.resultUnit}>{unit}</Text>
            </View>
          </View>

          {/* Percentage Breakdown */}
          <Text style={styles.tableTitle}>TRAINING LOAD DISTRIBUTION</Text>
          <ScrollView style={styles.tableScroll} showsVerticalScrollIndicator={false}>
            {percentages.map((p) => (
              <View key={p.pct} style={styles.percentRow}>
                <View style={styles.percentPill}>
                  <Text style={styles.percentPillText}>{p.pct}%</Text>
                </View>
                <Text style={styles.repsText}>{p.repsText}</Text>
                <Text style={styles.weightText}>{p.val} {unit}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.doneBtnText}>CLOSE CALCULATOR</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: SPACING.md,
  },
  inputBox: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  textInput: {
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  resultCard: {
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderHighlight,
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  resultValue: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  resultUnit: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMuted,
  },
  tableTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tableScroll: {
    maxHeight: 200,
    marginBottom: SPACING.md,
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  percentPill: {
    width: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 3,
    borderRadius: 4,
    alignItems: 'center',
  },
  percentPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  repsText: {
    fontSize: 12,
    color: COLORS.textMuted,
    flex: 1,
    marginLeft: 12,
  },
  weightText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginBottom: 10,
  },
  doneBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B0F17',
    letterSpacing: 0.5,
  },
});
