import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';
import { useWorkout } from '../context/WorkoutContext';

export const ProfileScreen: React.FC = () => {
  const {
    currentUser,
    isCloudConnected,
    quickLoginCloud,
    unit,
    toggleUnit,
    testHaptics,
    showToast,
  } = useWorkout();

  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [customName, setCustomName] = useState(currentUser ? currentUser.name : 'Alex Nguyen');
  const [fitnessGoal, setFitnessGoal] = useState('Powerbuilding & Hypertrophy (5 days/week)');

  const handleSaveProfile = () => {
    setIsEditModalVisible(false);
    testHaptics('success');
    showToast('Profile updated locally!');
  };

  return (
    <View style={styles.screen}>
      <Header subtitle="Settings & Cloud Account" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card (Clickable to Edit) */}
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => setIsEditModalVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>
              {customName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{customName}</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO ATHLETE</Text>
              </View>
            </View>
            <Text style={styles.userEmail}>{currentUser ? currentUser.email : 'alexnguyen@gmail.com'}</Text>
            <Text style={styles.goalPreview} numberOfLines={1}>🎯 {fitnessGoal}</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={14} color={COLORS.accentGold} />
              <Text style={styles.streakBadgeText}>
                {currentUser ? `${currentUser.current_streak} Day Streak` : '4 Day Streak'}
              </Text>
            </View>
          </View>
          <Ionicons name="pencil" size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Haptic Feedback Test Center */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>HAPTIC VIBRATION MOTOR TEST</Text>
          <Text style={styles.sectionDesc}>Tap below to test physical vibration on your phone:</Text>
          <View style={styles.hapticButtonsRow}>
            <TouchableOpacity
              style={styles.hapticBtn}
              onPress={() => testHaptics('light')}
              activeOpacity={0.7}
            >
              <Ionicons name="radio-button-on" size={16} color={COLORS.primary} />
              <Text style={styles.hapticBtnText}>Light</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hapticBtn}
              onPress={() => testHaptics('medium')}
              activeOpacity={0.7}
            >
              <Ionicons name="disc" size={16} color={COLORS.accentGold} />
              <Text style={styles.hapticBtnText}>Medium</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.hapticBtn}
              onPress={() => testHaptics('heavy')}
              activeOpacity={0.7}
            >
              <Ionicons name="hardware-chip" size={16} color="#38BDF8" />
              <Text style={styles.hapticBtnText}>Heavy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.hapticBtn, styles.hapticBtnSuccess]}
              onPress={() => testHaptics('success')}
              activeOpacity={0.7}
            >
              <Ionicons name="trophy" size={16} color="#0B0F17" />
              <Text style={[styles.hapticBtnText, { color: '#0B0F17' }]}>PR Vibe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cloud Connection Status Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>SUPABASE CLOUD INFRASTRUCTURE</Text>
          <View style={styles.cloudStatusRow}>
            <View style={styles.cloudLeft}>
              <View
                style={[
                  styles.statusDot,
                  isCloudConnected ? styles.statusDotOnline : styles.statusDotOffline,
                ]}
              />
              <View>
                <Text style={styles.cloudHostTitle}>
                  {isCloudConnected ? 'Connected to Supabase Pooler' : 'Cloud Disconnected'}
                </Text>
                <Text style={styles.cloudSub}>
                  Region: ap-southeast-1 (Singapore IPv4)
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.syncBtn}
              onPress={quickLoginCloud}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={16} color="#0B0F17" />
              <Text style={styles.syncBtnText}>Sync</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>APP PREFERENCES</Text>

          {/* Metric / Imperial Unit Toggle */}
          <TouchableOpacity
            style={styles.settingRow}
            onPress={toggleUnit}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="scale-outline" size={20} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.settingLabel}>Weight Measurement Units</Text>
                <Text style={styles.settingSub}>
                  Current: {unit === 'kg' ? 'Kilograms (kg)' : 'Pounds (lbs)'}
                </Text>
              </View>
            </View>
            <View style={styles.unitBadgeToggle}>
              <Text style={styles.unitBadgeToggleText}>{unit.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>

          {/* Haptics */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.settingLabel}>Haptic Feedback</Text>
                <Text style={styles.settingSub}>Vibrate on set completion and PRs</Text>
              </View>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={(val) => {
                setHapticsEnabled(val);
                testHaptics('light');
              }}
              trackColor={{ false: '#334155', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Audio Cues */}
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high-outline" size={20} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.settingLabel}>Rest Timer Sound Cue</Text>
                <Text style={styles.settingSub}>Audio notification on countdown finish</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={(val) => {
                setSoundEnabled(val);
                testHaptics('light');
              }}
              trackColor={{ false: '#334155', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Version Footer */}
        <View style={styles.versionFooter}>
          <Text style={styles.versionText}>GymTrack Mobile v1.2.0 • React Native & Expo</Text>
          <Text style={styles.versionSub}>Cross-platform Native Engine with Live Cloud Sync</Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>EDIT PROFILE</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>DISPLAY NAME</Text>
              <TextInput
                style={styles.modalInput}
                value={customName}
                onChangeText={setCustomName}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textMuted}
              />

              <Text style={styles.inputLabel}>PRIMARY FITNESS GOAL</Text>
              <TextInput
                style={styles.modalInput}
                value={fitnessGoal}
                onChangeText={setFitnessGoal}
                placeholder="E.g. Strength & Muscle Hypertrophy"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>

            <TouchableOpacity
              style={styles.saveProfileBtn}
              onPress={handleSaveProfile}
              activeOpacity={0.8}
            >
              <Text style={styles.saveProfileBtnText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  proBadge: {
    backgroundColor: COLORS.primarySubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderHighlight,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.primary,
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  goalPreview: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  streakBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentGold,
  },
  sectionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  hapticButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hapticBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: COLORS.bgElevated,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  hapticBtnSuccess: {
    backgroundColor: COLORS.primary,
  },
  hapticBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  cloudStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cloudLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusDotOnline: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  statusDotOffline: {
    backgroundColor: COLORS.accentGold,
  },
  cloudHostTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  cloudSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
  },
  syncBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B0F17',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  settingSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  unitBadgeToggle: {
    backgroundColor: COLORS.primarySubtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  unitBadgeToggleText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primary,
  },
  versionFooter: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  versionSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.2)',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 13, 0.85)',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  modalBody: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 6,
    marginTop: 10,
    letterSpacing: 0.8,
  },
  modalInput: {
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: COLORS.borderCard,
  },
  saveProfileBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  saveProfileBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0B0F17',
    letterSpacing: 0.8,
  },
});
