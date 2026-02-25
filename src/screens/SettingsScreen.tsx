import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { lightTheme, darkTheme } from '../theme/theme';
import { tasks } from '../data/plan';
import { getTotalQuestions } from '../data/quizzes';
import { scheduleDailyReminder, requestPermissions } from '../utils/notifications';

export default function SettingsScreen() {
  const store = useAppStore();
  const theme = store.darkMode ? darkTheme : lightTheme;
  const totalCompleted = Object.keys(store.completedTasks).length;
  const mastered = Object.values(store.quizAttempts).filter((a) => a.mastered).length;

  const toggleReminder = async () => {
    const granted = await requestPermissions();
    if (granted) {
      await scheduleDailyReminder(store.reminderHour, store.reminderMinute);
      Alert.alert('Reminder Set', `Daily reminder at ${store.reminderHour}:${String(store.reminderMinute).padStart(2, '0')}`);
    } else {
      Alert.alert('Permission Denied', 'Enable notifications in your device settings.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Stats */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Your Stats</Text>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>{totalCompleted}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Tasks Done</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.quiz }]}>{mastered}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Qs Mastered</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.streak }]}>{store.getStreak()}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Day Streak</Text>
          </View>
        </View>
        <Text style={[styles.statSub, { color: theme.textSecondary }]}>
          {tasks.length} total tasks · {getTotalQuestions()} quiz questions
        </Text>
      </View>

      {/* Appearance */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
      <View style={[styles.settingRow, { backgroundColor: theme.card }]}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
        <Switch
          value={store.darkMode}
          onValueChange={store.toggleDarkMode}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor="#fff"
        />
      </View>

      {/* Notifications */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifications</Text>
      <TouchableOpacity style={[styles.settingRow, { backgroundColor: theme.card }]} onPress={toggleReminder}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>Set Daily Reminder</Text>
        <Text style={[styles.settingValue, { color: theme.primary }]}>
          {store.reminderHour}:{String(store.reminderMinute).padStart(2, '0')} AM
        </Text>
      </TouchableOpacity>

      {/* Reset */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Data</Text>
      <TouchableOpacity
        style={[styles.settingRow, { backgroundColor: theme.card }]}
        onPress={() => {
          Alert.alert('Reset Progress', 'This will clear all your task completions and quiz scores. Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Reset',
              style: 'destructive',
              onPress: () => {
                useAppStore.setState({
                  completedTasks: {},
                  quizAttempts: {},
                  quizScoreHistory: [],
                  dailyCompletions: {},
                });
              },
            },
          ]);
        }}
      >
        <Text style={[styles.settingLabel, { color: theme.danger }]}>Reset All Progress</Text>
      </TouchableOpacity>

      <View style={[styles.footer]}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>Java Quest Tracker v1.0</Text>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>Built for the Equal Experts Java Quest</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 2 },
  statSub: { fontSize: 12, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 8 },
  settingRow: { borderRadius: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  settingLabel: { fontSize: 15 },
  settingValue: { fontSize: 14, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 30, marginBottom: 40 },
  footerText: { fontSize: 12, marginBottom: 2 },
});
