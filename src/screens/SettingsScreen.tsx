import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAppStore } from '../store/useAppStore';
import { lightTheme, darkTheme } from '../theme/theme';
import { tasks } from '../data/plan';
import { getTotalQuestions } from '../data/quizzes';
import { scheduleDailyReminder, requestPermissions, cancelAllReminders } from '../utils/notifications';

const formatTime = (hour: number, minute: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
};

export default function SettingsScreen() {
  const store = useAppStore();
  const theme = store.darkMode ? darkTheme : lightTheme;
  const totalCompleted = Object.keys(store.completedTasks).length;
  const mastered = Object.values(store.quizAttempts).filter((a) => a.mastered).length;

  const [showTimePicker, setShowTimePicker] = useState(false);

  const scheduleOrCancel = useCallback(async (enabled: boolean, hour: number, minute: number) => {
    if (enabled) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          'Notifications Disabled',
          'Please enable notifications for Java Quest Tracker in your device settings.',
        );
        store.setNotificationsEnabled(false);
        return false;
      }
      await scheduleDailyReminder(hour, minute);
      return true;
    } else {
      await cancelAllReminders();
      return true;
    }
  }, [store]);

  const handleToggleNotifications = async (value: boolean) => {
    const success = await scheduleOrCancel(value, store.reminderHour, store.reminderMinute);
    if (success) {
      store.setNotificationsEnabled(value);
      if (value) {
        Alert.alert(
          '⏰ Reminder Set',
          `You\'ll be reminded daily at ${formatTime(store.reminderHour, store.reminderMinute)}.`,
        );
      }
    }
  };

  const handleTimeChange = async (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedDate) {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
      store.setReminderTime(hour, minute);
      if (store.notificationsEnabled) {
        await scheduleDailyReminder(hour, minute);
        Alert.alert('⏰ Time Updated', `Reminder changed to ${formatTime(hour, minute)}.`);
      }
    }
  };

  const pickerDate = new Date();
  pickerDate.setHours(store.reminderHour, store.reminderMinute, 0, 0);

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

      {/* Study Alarm */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Study Alarm</Text>

      {/* Enable / Disable toggle */}
      <View style={[styles.settingRow, { backgroundColor: theme.card }]}>
        <View style={styles.settingLabelGroup}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Daily Reminder</Text>
          <Text style={[styles.settingHint, { color: theme.textSecondary }]}>
            {store.notificationsEnabled ? 'You will be nudged to study' : 'Turn on to get daily nudges'}
          </Text>
        </View>
        <Switch
          value={store.notificationsEnabled}
          onValueChange={handleToggleNotifications}
          trackColor={{ false: theme.border, true: theme.success }}
          thumbColor="#fff"
        />
      </View>

      {/* Time picker row */}
      <TouchableOpacity
        style={[
          styles.settingRow,
          { backgroundColor: theme.card, opacity: store.notificationsEnabled ? 1 : 0.5 },
        ]}
        onPress={() => {
          if (store.notificationsEnabled) {
            setShowTimePicker(true);
          } else {
            Alert.alert('Enable Reminder', 'Turn on the daily reminder toggle first.');
          }
        }}
        activeOpacity={0.7}
      >
        <View style={styles.settingLabelGroup}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>Reminder Time</Text>
          <Text style={[styles.settingHint, { color: theme.textSecondary }]}>Tap to change</Text>
        </View>
        <View style={[styles.timeBadge, { backgroundColor: store.notificationsEnabled ? theme.primaryLight : theme.border }]}>
          <Text style={[styles.timeText, { color: store.notificationsEnabled ? theme.primary : theme.textSecondary }]}>
            {formatTime(store.reminderHour, store.reminderMinute)}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Quick-pick presets */}
      {store.notificationsEnabled && (
        <View style={styles.presetsRow}>
          {[
            { label: '🌅 6:00 AM', hour: 6, minute: 0 },
            { label: '☀️ 8:00 AM', hour: 8, minute: 0 },
            { label: '🌙 8:00 PM', hour: 20, minute: 0 },
          ].map((preset) => {
            const isActive = store.reminderHour === preset.hour && store.reminderMinute === preset.minute;
            return (
              <TouchableOpacity
                key={preset.label}
                style={[
                  styles.presetChip,
                  {
                    backgroundColor: isActive ? theme.primary : theme.card,
                    borderColor: isActive ? theme.primary : theme.border,
                  },
                ]}
                onPress={async () => {
                  store.setReminderTime(preset.hour, preset.minute);
                  await scheduleDailyReminder(preset.hour, preset.minute);
                  Alert.alert('⏰ Time Updated', `Reminder set to ${formatTime(preset.hour, preset.minute)}.`);
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.presetText, { color: isActive ? '#fff' : theme.text }]}>
                  {preset.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Native time picker */}
      {showTimePicker && (
        <View style={[styles.pickerContainer, { backgroundColor: theme.card }]}>
          <DateTimePicker
            value={pickerDate}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
            themeVariant={store.darkMode ? 'dark' : 'light'}
          />
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.primary }]}
              onPress={() => setShowTimePicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

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
              onPress: async () => {
                await cancelAllReminders();
                useAppStore.setState({
                  completedTasks: {},
                  quizAttempts: {},
                  quizScoreHistory: [],
                  dailyCompletions: {},
                  notificationsEnabled: false,
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
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 16 },
  settingRow: {
    borderRadius: 10, padding: 16, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,
  },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  settingLabelGroup: { flex: 1, marginRight: 12 },
  settingHint: { fontSize: 12, marginTop: 2 },
  timeBadge: { borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  timeText: { fontSize: 16, fontWeight: '700' },
  presetsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  presetChip: {
    flex: 1, marginHorizontal: 3, borderRadius: 8, paddingVertical: 10,
    alignItems: 'center', borderWidth: 1,
  },
  presetText: { fontSize: 12, fontWeight: '600' },
  pickerContainer: { borderRadius: 12, padding: 12, marginBottom: 8 },
  doneButton: {
    borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 8,
  },
  doneButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  footer: { alignItems: 'center', marginTop: 30, marginBottom: 40 },
  footerText: { fontSize: 12, marginBottom: 2 },
});
