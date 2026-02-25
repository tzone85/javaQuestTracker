import { useAppStore } from '../store/useAppStore';
import { phases, tasks, getTasksForWeek } from '../data/plan';
import { badges } from '../data/badges';
import { lightTheme, darkTheme } from '../theme/theme';
import { getCurrentWeekAndDay, getLast30Days } from '../utils/dateUtils';

export default function ProgressPage() {
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
    <div>
      {/* Overall */}
      <div className="card" style={{ backgroundColor: theme.card, textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 4 }}>Overall Progress</div>
        <div style={{ fontSize: 40, fontWeight: 800, color: theme.primary }}>{Math.round(overallProgress * 100)}%</div>
        <div style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 12 }}>{totalCompleted} / {totalTasks} tasks</div>
        <div className="progress-bar-bg" style={{ backgroundColor: theme.border }}>
          <div className="progress-bar-fill" style={{ width: `${overallProgress * 100}%`, backgroundColor: theme.primary }} />
        </div>
      </div>

      {/* Phases */}
      <div className="section-title" style={{ color: theme.text }}>Phases</div>
      {phases.map((phase) => {
        const phaseTasks = phase.weeks.flatMap(getTasksForWeek);
        const phaseCompleted = phaseTasks.filter((t) => completedTasks[t.id]).length;
        const phaseProgress = phaseTasks.length > 0 ? phaseCompleted / phaseTasks.length : 0;
        const isCurrent = phase.weeks.includes(week);
        return (
          <div
            key={phase.id}
            className="phase-card"
            style={{
              backgroundColor: theme.card,
              borderLeftColor: isCurrent ? theme.primary : theme.border,
            }}
          >
            <div className="phase-header">
              <span className="phase-emoji">{phase.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{phase.title}</div>
                <div style={{ fontSize: 12, color: theme.textSecondary }}>{phase.subtitle}</div>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: theme.primary }}>
                {Math.round(phaseProgress * 100)}%
              </span>
            </div>
            <div className="progress-bar-bg" style={{ backgroundColor: theme.border, marginTop: 8, height: 6 }}>
              <div className="progress-bar-fill" style={{ width: `${phaseProgress * 100}%`, backgroundColor: theme.success, height: 6 }} />
            </div>
          </div>
        );
      })}

      {/* Badges */}
      <div className="section-title" style={{ color: theme.text }}>Badges</div>
      <div className="badge-grid">
        {badges.map((badge) => {
          const unlocked = isBadgeUnlocked(badge);
          return (
            <div
              key={badge.id}
              className="badge-item"
              style={{ backgroundColor: theme.card, opacity: unlocked ? 1 : 0.4 }}
            >
              <div className="badge-emoji">{badge.emoji}</div>
              <div className="badge-name" style={{ color: theme.text }}>{badge.title}</div>
              <div className="badge-desc" style={{ color: theme.textSecondary }}>{badge.description}</div>
            </div>
          );
        })}
      </div>

      {/* Calendar Heatmap */}
      <div className="section-title" style={{ color: theme.text }}>Last 30 Days</div>
      <div className="calendar-grid" style={{ backgroundColor: theme.card }}>
        {last30.map((date) => {
          const dayTasks = tasks.filter((t) => {
            const taskDate = completedTasks[t.id];
            return taskDate && taskDate.startsWith(date);
          });
          const hasActivity = dayTasks.length > 0;
          return (
            <div
              key={date}
              className="calendar-day"
              style={{ backgroundColor: hasActivity ? theme.success : theme.border }}
              title={date}
            />
          );
        })}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
