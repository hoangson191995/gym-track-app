import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WorkoutProvider, useWorkout } from './src/context/WorkoutContext';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { PRModal } from './src/components/PRModal';
import { COLORS, RADIUS, SPACING } from './src/theme/theme';

const ToastOverlay: React.FC = () => {
  const { toastMessage } = useWorkout();
  if (!toastMessage) return null;

  return (
    <View style={styles.toastContainer} pointerEvents="none">
      <View style={styles.toastBubble}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </View>
    </View>
  );
};

const AppContent: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <BottomTabNavigator />
      </NavigationContainer>
      <PRModal />
      <ToastOverlay />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <WorkoutProvider>
        <AppContent />
      </WorkoutProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgApp,
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  toastBubble: {
    backgroundColor: '#1E293B',
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  toastText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
});
