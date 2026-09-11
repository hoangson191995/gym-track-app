import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { useWorkout } from '../context/WorkoutContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showCloudStatus?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'GYMTRACK',
  subtitle,
  showCloudStatus = true,
}) => {
  const { currentUser, isCloudConnected, quickLoginCloud } = useWorkout();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.logoGym}>GYM</Text>
          <Text style={styles.logoTrack}>TRACK</Text>
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO</Text>
          </View>
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {showCloudStatus && (
        <TouchableOpacity
          style={[
            styles.cloudPill,
            currentUser ? styles.cloudPillConnected : styles.cloudPillDisconnected,
          ]}
          onPress={quickLoginCloud}
          activeOpacity={0.7}
        >
          <Ionicons
            name={currentUser ? 'cloud-done' : 'cloud-offline-outline'}
            size={14}
            color={currentUser ? COLORS.primary : COLORS.accentGold}
          />
          <Text
            style={[
              styles.cloudPillText,
              { color: currentUser ? COLORS.primary : COLORS.accentGold },
            ]}
            numberOfLines={1}
          >
            {currentUser ? 'Supabase Live' : 'Connect Cloud'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.bgApp,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderCard,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoGym: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 1.5,
  },
  logoTrack: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  proBadge: {
    backgroundColor: COLORS.primarySubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: COLORS.borderHighlight,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cloudPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 6,
    borderWidth: 1,
  },
  cloudPillConnected: {
    backgroundColor: 'rgba(0, 229, 153, 0.12)',
    borderColor: 'rgba(0, 229, 153, 0.3)',
  },
  cloudPillDisconnected: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  cloudPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
