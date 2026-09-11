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

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
}

const EXERCISE_CATALOG = [
  { id: 'bench_press', name: 'Barbell Bench Press', muscle_group: 'Chest', secondary_muscles: ['Triceps', 'Front Delts'], equipment: 'Barbell' },
  { id: 'incline_db_press', name: 'Incline Dumbbell Press', muscle_group: 'Chest', secondary_muscles: ['Upper Chest', 'Front Delts'], equipment: 'Dumbbell' },
  { id: 'cable_fly', name: 'Cable Chest Fly', muscle_group: 'Chest', secondary_muscles: ['Inner Chest'], equipment: 'Cable' },
  { id: 'dips', name: 'Chest Dips', muscle_group: 'Chest', secondary_muscles: ['Triceps'], equipment: 'Bodyweight' },
  
  { id: 'barbell_row', name: 'Barbell Bent-Over Row', muscle_group: 'Back', secondary_muscles: ['Lats', 'Rhomboids', 'Biceps'], equipment: 'Barbell' },
  { id: 'deadlift', name: 'Conventional Deadlift', muscle_group: 'Back', secondary_muscles: ['Hamstrings', 'Lower Back', 'Glutes'], equipment: 'Barbell' },
  { id: 'lat_pulldown', name: 'Lat Pulldown', muscle_group: 'Back', secondary_muscles: ['Biceps', 'Rear Delts'], equipment: 'Cable' },
  { id: 'pullups', name: 'Weighted Pull-Ups', muscle_group: 'Back', secondary_muscles: ['Lats', 'Biceps'], equipment: 'Bodyweight' },

  { id: 'squat', name: 'Barbell Back Squat', muscle_group: 'Legs', secondary_muscles: ['Quads', 'Glutes', 'Core'], equipment: 'Barbell' },
  { id: 'rdl', name: 'Romanian Deadlift (RDL)', muscle_group: 'Legs', secondary_muscles: ['Hamstrings', 'Glutes'], equipment: 'Barbell' },
  { id: 'leg_press', name: 'Incline Leg Press', muscle_group: 'Legs', secondary_muscles: ['Quads'], equipment: 'Machine' },
  { id: 'calf_raise', name: 'Standing Calf Raise', muscle_group: 'Legs', secondary_muscles: ['Calves'], equipment: 'Machine' },

  { id: 'overhead_press', name: 'Overhead Shoulder Press (OHP)', muscle_group: 'Shoulders', secondary_muscles: ['Front Delts', 'Triceps'], equipment: 'Barbell' },
  { id: 'lateral_raise', name: 'Dumbbell Lateral Raise', muscle_group: 'Shoulders', secondary_muscles: ['Side Delts'], equipment: 'Dumbbell' },
  { id: 'face_pull', name: 'Rope Face Pull', muscle_group: 'Shoulders', secondary_muscles: ['Rear Delts', 'Traps'], equipment: 'Cable' },

  { id: 'barbell_curl', name: 'Barbell Bicep Curl', muscle_group: 'Arms', secondary_muscles: ['Biceps', 'Forearms'], equipment: 'Barbell' },
  { id: 'tricep_pushdown', name: 'Cable Tricep Pushdown', muscle_group: 'Arms', secondary_muscles: ['Triceps'], equipment: 'Cable' },
  { id: 'hammer_curl', name: 'Dumbbell Hammer Curl', muscle_group: 'Arms', secondary_muscles: ['Brachialis', 'Forearms'], equipment: 'Dumbbell' },
  { id: 'skull_crusher', name: 'EZ-Bar Skull Crusher', muscle_group: 'Arms', secondary_muscles: ['Triceps'], equipment: 'Barbell' },
];

const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ visible, onClose }) => {
  const { addExerciseToWorkout } = useWorkout();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = EXERCISE_CATALOG.filter((ex) => {
    const matchesCategory = selectedCategory === 'All' || ex.muscle_group === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.muscle_group.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (ex: typeof EXERCISE_CATALOG[0]) => {
    addExerciseToWorkout(ex);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>EXERCISE LIBRARY</Text>
              <Text style={styles.subtitle}>Select an exercise to add to active workout</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchRow}>
            <Ionicons name="search" size={18} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercise or muscle..."
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Category Chips */}
          <View style={styles.categoryRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.catChip, active && styles.catChipActive]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={[styles.catChipText, active && styles.catChipTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Exercise List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {filteredExercises.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.exerciseItem}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <View style={styles.itemIcon}>
                  <Ionicons name="barbell-outline" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemBadges}>
                    <View style={styles.muscleBadge}>
                      <Text style={styles.muscleBadgeText}>{item.muscle_group}</Text>
                    </View>
                    <Text style={styles.equipmentText}>• {item.equipment}</Text>
                  </View>
                </View>
                <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            ))}

            {filteredExercises.length === 0 && (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No matching exercises found</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 13, 0.8)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    padding: 0,
  },
  categoryRow: {
    marginBottom: SPACING.md,
  },
  categoryScroll: {
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  catChipActive: {
    backgroundColor: COLORS.primarySubtle,
    borderColor: COLORS.borderHighlight,
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  catChipTextActive: {
    color: COLORS.primary,
  },
  list: {
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgElevated,
    padding: 12,
    borderRadius: RADIUS.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(0, 229, 153, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  itemBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  muscleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  muscleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  equipmentText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  emptyBox: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
});
