import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { phases, tasks, getTasksForWeek } from '../data/plan';
import { badges } from '../data/badges';
import { lightTheme, darkTheme } from '../theme/theme';
import { getCurrentWeekAndDay, getLast30Days } from '../utils/dateUtils';

export default function ProgressScreen() {
  const { darkMode, startDate, completedTasks } = useAppStore();
  const theme = darkMode ? darkTheme : lightTheme;
  const { week } = getCurrentWeekAndDay(startDate);
  const totalTasks = tasks.length;
  const totalCompleted = Object.keys(completedTasks).length;
  const overallProgress = totalTasks > 0 ? totalCompleted / totalTasks : 0;
  const last30 = getLast30Days();

  const isWeekComplete = (w: number): boolean => {
    const weekTasks = getTasksForWeek(w);
    return weekTasks.length > 0 && weekTasks.every((t) => completedTasks[t.id]);
  };

  const isPhaseComplete = (phaseId: number): boolean => {
    const phase = phases.find((p) => p.id === phaseId);
    return phase ? phase.weeks.every(isWeekComplete) : false;
  };

  const isBadgeUnlocked = (badge: typeof badges[0]): boolean => {
    const { type, value } = badge.unlockCondition;
    if (type === 'task_complete') return !!completedTasks[value as string];
    if (type === 'week_complete') return isWeekComplete(value as number);
    if (type === 'phase_complete') return isPhaseComplete(value as number);
    if (type === 'all_complete') return Array.from({ length: 24 }, (_, i) => i + 1).every(isWeekComplete);
    return false;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Overall */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Overall Progress</Text>
        <Text style={[styles.bigNumber, { color: theme.primary }]}>{Math.round(overallProgress * 100)}%</Text>
        <Text style={[styles.subLabel, { color: theme.textSecondary }]}>{totalCompleted} / {totalTasks} tasks</Text>
        <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
          <View style={[styles.progressBarFill, { width: `${overallProgress * 100}%`, backgroundColor: theme.primary }]} />
        </View>
      </View>

      {/* Phase Progress */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Phases</Text>
      {phases.map((phase) => {
        const phaseTasks = phase.weeks.flatMap(getTasksForWeek);
        const phaseCompleted = phaseTasks.filter((t) => completedTasks[t.id]).length;
        const phaseProgress = phaseTasks.length > 0 ? phaseCompleted / phaseTasks.length : 0;
        const isCurrent = phase.weeks.includes(week);
        return (
          <View key={phase.id} style={[styles.phaseCard, { backgroundColor: theme.card, borderLeftColor: isCurrent ? theme.primary : theme.border }]}>
            <View style={styles.phaseHeader}>
              <Text style={[styles.phaseEmoji]}>{phase.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.phaseTitle, { color: theme.text }]}>{phase.title}</Text>
                <Text style={[styles.phaseWeeks, { color: theme.textSecondary }]}>{phase.subtitle}</Text>
              </View>
              <Text style={[styles.phasePercent, { color: theme.primary }]}>{Math.round(phaseProgress * 100)}%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: theme.border, marginTop: 8 }]}>
              <View style={[styles.progressBarFill, { width: `${phaseProgress * 100}%`, backgroundColor: theme.success }]} />
            </View>
          </View>
        );
      })}

      {/* Badges */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Badges</Text>
      <View style={styles.badgeGrid}>
        {badges.map((badge) => {
          const unlocked = isBadgeUnlocked(badge);
          return (
            <View key={badge.id} style={[styles.badgeItem, { backgroundColor: theme.card, opacity: unlocked ? 1 : 0.4 }]}>
              <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
              <Text style={[styles.badgeName, { color: theme.text }]}>{badge.title}</Text>
              <Text style={[styles.badgeDesc, { color: theme.textSecondary }]}>{badge.description}</Text>
            </View>
          );
        })}
      </View>

      {/* Calendar Heatmap */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Last 30 Days</Text>
      <View style={[styles.calendarGrid, { backgroundColor: theme.card }]}>
        {last30.map((date) => {
          const dayTasks = tasks.filter((t) => {
            const taskDate = completedTasks[t.id];
            return taskDate && taskDate.startsWith(date);
          });
          const hasActivity = dayTasks.length > 0;
          return (
            <View
              key={date}
              style={[styles.calendarDay, { backgroundColor: hasActivity ? theme.success : theme.border }]}
            />
          );
        })}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center' },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  bigNumber: { fontSize: 40, fontWeight: '800' },
  subLabel: { fontSize: 13, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, marginTop: 8 },
  phaseCard: { borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 4 },
  phaseHeader: { flexDirection: 'row', alignItems: 'center' },
  phaseEmoji: { fontSize: 24, marginRight: 12 },
  phaseTitle: { fontSize: 15, fontWeight: '600' },
  phaseWeeks: { fontSize: 12 },
  phasePercent: { fontSize: 16, fontWeight: '700' },
  progressBarBg: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badgeItem: { width: '31%', borderRadius: 10, padding: 10, alignItems: 'center', marginBottom: 8 },
  badgeEmoji: { fontSize: 28, marginBottom: 4 },
  badgeName: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  badgeDesc: { fontSize: 9, textAlign: 'center', marginTop: 2 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, padding: 12, borderRadius: 10 },
  calendarDay: { width: 28, height: 28, borderRadius: 4 },
});
