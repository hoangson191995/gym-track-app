import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Header } from '../components/Header';
import { useWorkout } from '../context/WorkoutContext';

export const ProfileScreen: React.FC = () => {
  const { currentUser, isCloudConnected, quickLoginCloud } = useWorkout();

  const [useMetric, setUseMetric] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <View style={styles.screen}>
      <Header subtitle="Settings & Cloud Account" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>AN</Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{currentUser ? currentUser.name : 'Alex Nguyen'}</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            </View>
            <Text style={styles.userEmail}>{currentUser ? currentUser.email : 'alexnguyen@gmail.com'}</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={14} color={COLORS.accentGold} />
              <Text style={styles.streakBadgeText}>
                {currentUser ? `${currentUser.current_streak} Day Streak` : '4 Day Streak'}
              </Text>
            </View>
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

          {/* Metric / Imperial */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="scale-outline" size={20} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.settingLabel}>Weight Units</Text>
                <Text style={styles.settingSub}>{useMetric ? 'Kilograms (kg)' : 'Pounds (lbs)'}</Text>
              </View>
            </View>
            <Switch
              value={useMetric}
              onValueChange={setUseMetric}
              trackColor={{ false: '#334155', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Haptics */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.settingLabel}>Haptic Feedback</Text>
                <Text style={styles.settingSub}>Vibrate on completed sets & PRs</Text>
              </View>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={setHapticsEnabled}
              trackColor={{ false: '#334155', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Audio Cues */}
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high-outline" size={20} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.settingLabel}>Rest Timer Cues</Text>
                <Text style={styles.settingSub}>Beep when rest countdown hits 0</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#334155', true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* App Version Info */}
        <View style={styles.versionFooter}>
          <Text style={styles.versionText}>GymTrack Mobile v1.0.0 (React Native + Expo)</Text>
          <Text style={styles.versionSub}>Cross-platform iOS & Android • Cloud Powered</Text>
        </View>
      </ScrollView>
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
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
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
    marginBottom: SPACING.md,
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
});
