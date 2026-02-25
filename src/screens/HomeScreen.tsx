import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { getCurrentWeekAndDay } from '../utils/dateUtils';
import { getTasksForDay, weekTitles, getPhaseForWeek } from '../data/plan';
import { getDailyQuote } from '../data/quotes';
import { lightTheme, darkTheme } from '../theme/theme';

export default function HomeScreen() {
  const { startDate, darkMode, completedTasks, toggleTask } = useAppStore();
  const theme = darkMode ? darkTheme : lightTheme;
  const { week, day } = getCurrentWeekAndDay(startDate);
  const tasks = getTasksForDay(week, Math.min(day, 6));
  const phase = getPhaseForWeek(week);
  const completedCount = tasks.filter((t) => completedTasks[t.id]).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;
  const streak = useAppStore.getState().getStreak();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Text style={[styles.phase, { color: theme.primary }]}>
          {phase?.emoji} Phase {phase?.id}: {phase?.title}
        </Text>
        <Text style={[styles.weekTitle, { color: theme.text }]}>
          Week {week}: {weekTitles[week]}
        </Text>
        <Text style={[styles.dayLabel, { color: theme.textSecondary }]}>Day {day}</Text>
      </View>

      {/* Streak */}
      {streak > 0 && (
        <View style={[styles.streakBanner, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.streakText, { color: theme.streak }]}>
            🔥 {streak} day streak!
          </Text>
        </View>
      )}

      {/* Quote */}
      <View style={[styles.quoteCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.quote, { color: theme.textSecondary }]}>{getDailyQuote()}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <Text style={[styles.progressLabel, { color: theme.text }]}>
          {completedCount}/{tasks.length} tasks completed
        </Text>
        <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress * 100}%`, backgroundColor: theme.success },
            ]}
          />
        </View>
      </View>

      {/* Tasks */}
      {tasks.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            {day === 7 ? '🛌 Rest day! Catch up or relax.' : 'No tasks for today.'}
          </Text>
        </View>
      ) : (
        tasks.map((task) => {
          const done = !!completedTasks[task.id];
          return (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskCard,
                { backgroundColor: theme.card, borderLeftColor: task.isBossBattle ? theme.boss : theme.primary },
              ]}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
            >
              <View style={styles.taskRow}>
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: done ? theme.success : theme.border },
                    done && { backgroundColor: theme.success },
                  ]}
                >
                  {done && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.taskContent}>
                  <Text
                    style={[
                      styles.taskTitle,
                      { color: done ? theme.textSecondary : theme.text },
                      done && styles.taskDone,
                    ]}
                  >
                    {task.isBossBattle ? '⚔️ ' : ''}{task.title}
                  </Text>
                  <Text style={[styles.taskDesc, { color: theme.textSecondary }]}>{task.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { borderRadius: 12, padding: 16, marginBottom: 12 },
  phase: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  weekTitle: { fontSize: 20, fontWeight: '700' },
  dayLabel: { fontSize: 14, marginTop: 2 },
  streakBanner: { borderRadius: 10, padding: 10, marginBottom: 12, alignItems: 'center' },
  streakText: { fontSize: 16, fontWeight: '700' },
  quoteCard: { borderRadius: 10, padding: 14, marginBottom: 12 },
  quote: { fontSize: 13, fontStyle: 'italic', lineHeight: 18 },
  progressSection: { marginBottom: 16 },
  progressLabel: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  progressBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  taskCard: { borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 4 },
  taskRow: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 },
  checkmark: { color: '#fff', fontWeight: '700', fontSize: 14 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  taskDesc: { fontSize: 13, lineHeight: 18 },
  taskDone: { textDecorationLine: 'line-through' },
  emptyCard: { borderRadius: 10, padding: 30, alignItems: 'center' },
  emptyText: { fontSize: 15 },
});
