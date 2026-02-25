import { useAppStore } from '../store/useAppStore';
import { lightTheme, darkTheme } from '../theme/theme';
import { tasks } from '../data/plan';
import { getTotalQuestions } from '../data/quizzes';

export default function SettingsPage() {
  const store = useAppStore();
  const theme = store.darkMode ? darkTheme : lightTheme;
  const totalCompleted = Object.keys(store.completedTasks).length;
  const mastered = Object.values(store.quizAttempts).filter((a) => a.mastered).length;

  const handleReset = () => {
    if (window.confirm('Reset all progress? This will clear all your task completions and quiz scores.')) {
      useAppStore.setState({
        completedTasks: {},
        quizAttempts: {},
        quizScoreHistory: [],
        dailyCompletions: {},
      });
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="card" style={{ backgroundColor: theme.card }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Your Stats</div>
        <div className="stat-row">
          <div className="stat">
            <div className="stat-number" style={{ color: theme.primary }}>{totalCompleted}</div>
            <div className="stat-label" style={{ color: theme.textSecondary }}>Tasks Done</div>
          </div>
          <div className="stat">
            <div className="stat-number" style={{ color: theme.quiz }}>{mastered}</div>
            <div className="stat-label" style={{ color: theme.textSecondary }}>Qs Mastered</div>
          </div>
          <div className="stat">
            <div className="stat-number" style={{ color: theme.streak }}>{store.getStreak()}</div>
            <div className="stat-label" style={{ color: theme.textSecondary }}>Day Streak</div>
          </div>
        </div>
        <div style={{ fontSize: 12, textAlign: 'center', color: theme.textSecondary }}>
          {tasks.length} total tasks · {getTotalQuestions()} quiz questions
        </div>
      </div>

      {/* Appearance */}
      <div className="section-title" style={{ color: theme.text }}>Appearance</div>
      <div className="setting-row" style={{ backgroundColor: theme.card }} onClick={store.toggleDarkMode}>
        <span style={{ fontSize: 15, fontWeight: 500, color: theme.text }}>Dark Mode</span>
        <button
          className={`toggle${store.darkMode ? ' active' : ''}`}
          style={{ backgroundColor: store.darkMode ? theme.primary : theme.border }}
          onClick={(e) => { e.stopPropagation(); store.toggleDarkMode(); }}
        >
          <div className="toggle-knob" />
        </button>
      </div>

      {/* Start Date */}
      <div className="section-title" style={{ color: theme.text }}>Journey</div>
      <div className="setting-row" style={{ backgroundColor: theme.card }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: theme.text }}>Start Date</div>
          <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>When did you begin the quest?</div>
        </div>
        <input
          type="date"
          value={store.startDate}
          onChange={(e) => store.setStartDate(e.target.value)}
          style={{
            backgroundColor: theme.primaryLight,
            color: theme.primary,
            border: 'none',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Reset */}
      <div className="section-title" style={{ color: theme.text }}>Data</div>
      <div
        className="setting-row"
        style={{ backgroundColor: theme.card, cursor: 'pointer' }}
        onClick={handleReset}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: theme.danger }}>Reset All Progress</span>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 40 }}>
        <div style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 2 }}>Java Quest Tracker v1.0</div>
        <div style={{ fontSize: 12, color: theme.textSecondary }}>Built for the Equal Experts Java Quest</div>
      </div>
    </div>
  );
}
