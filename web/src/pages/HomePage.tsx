import { useAppStore } from '../store/useAppStore';
import { getCurrentWeekAndDay } from '../utils/dateUtils';
import { getTasksForDay, weekTitles, getPhaseForWeek } from '../data/plan';
import { getDailyQuote } from '../data/quotes';
import { lightTheme, darkTheme } from '../theme/theme';

export default function HomePage() {
  const { startDate, darkMode, completedTasks, toggleTask } = useAppStore();
  const theme = darkMode ? darkTheme : lightTheme;
  const { week, day } = getCurrentWeekAndDay(startDate);
  const tasks = getTasksForDay(week, Math.min(day, 6));
  const phase = getPhaseForWeek(week);
  const completedCount = tasks.filter((t) => completedTasks[t.id]).length;
  const progress = tasks.length > 0 ? completedCount / tasks.length : 0;
  const streak = useAppStore.getState().getStreak();

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ backgroundColor: theme.card }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: theme.primary, marginBottom: 4 }}>
          {phase?.emoji} Phase {phase?.id}: {phase?.title}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>
          Week {week}: {weekTitles[week]}
        </div>
        <div style={{ fontSize: 14, marginTop: 2, color: theme.textSecondary }}>Day {day}</div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="card" style={{ backgroundColor: theme.primaryLight, textAlign: 'center', padding: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: theme.streak }}>
            🔥 {streak} day streak!
          </span>
        </div>
      )}

      {/* Quote */}
      <div className="card" style={{ backgroundColor: theme.card }}>
        <div style={{ fontSize: 13, fontStyle: 'italic', lineHeight: 1.4, color: theme.textSecondary }}>
          {getDailyQuote()}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 6 }}>
          {completedCount}/{tasks.length} tasks completed
        </div>
        <div className="progress-bar-bg" style={{ backgroundColor: theme.border }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${progress * 100}%`, backgroundColor: theme.success }}
          />
        </div>
      </div>

      {/* Tasks */}
      {tasks.length === 0 ? (
        <div className="card" style={{ backgroundColor: theme.card, textAlign: 'center', padding: 30 }}>
          <span style={{ fontSize: 15, color: theme.textSecondary }}>
            {day === 7 ? '🛌 Rest day! Catch up or relax.' : 'No tasks for today.'}
          </span>
        </div>
      ) : (
        tasks.map((task) => {
          const done = !!completedTasks[task.id];
          return (
            <div
              key={task.id}
              className="task-card"
              style={{
                backgroundColor: theme.card,
                borderLeftColor: task.isBossBattle ? theme.boss : theme.primary,
              }}
              onClick={() => toggleTask(task.id)}
            >
              <div className="task-row">
                <div
                  className="checkbox"
                  style={{
                    borderColor: done ? theme.success : theme.border,
                    backgroundColor: done ? theme.success : 'transparent',
                  }}
                >
                  {done && '✓'}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    className={`task-title${done ? ' done' : ''}`}
                    style={{ color: done ? theme.textSecondary : theme.text }}
                  >
                    {task.isBossBattle ? '⚔️ ' : ''}{task.title}
                  </div>
                  <div className="task-desc" style={{ color: theme.textSecondary }}>
                    {task.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}
