import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { lightTheme, darkTheme } from './theme/theme';
import HomePage from './pages/HomePage';
import ProgressPage from './pages/ProgressPage';
import QuizPage from './pages/QuizPage';
import SettingsPage from './pages/SettingsPage';

const tabs = [
  { path: '/', label: 'Today', icon: '📋', headerTitle: 'Java Quest' },
  { path: '/progress', label: 'Progress', icon: '📊', headerTitle: 'Progress' },
  { path: '/quiz', label: 'Quiz', icon: '🧠', headerTitle: 'Daily Quiz' },
  { path: '/settings', label: 'Settings', icon: '⚙️', headerTitle: 'Settings' },
];

function AppLayout() {
  const darkMode = useAppStore((s) => s.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div className="app-layout" style={{ backgroundColor: theme.bg }}>
      <Routes>
        {tabs.map((tab) => (
          <Route
            key={tab.path}
            path={tab.path}
            element={
              <>
                <div className="header-bar" style={{ backgroundColor: theme.card, color: theme.text, borderBottomColor: theme.border }}>
                  {tab.headerTitle}
                </div>
                <div className="app-content" style={{ backgroundColor: theme.bg }}>
                  {tab.path === '/' && <HomePage />}
                  {tab.path === '/progress' && <ProgressPage />}
                  {tab.path === '/quiz' && <QuizPage />}
                  {tab.path === '/settings' && <SettingsPage />}
                </div>
              </>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <nav className="tab-bar" style={{ backgroundColor: theme.card, borderTopColor: theme.border }}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}
            style={({ isActive }) => ({ color: isActive ? theme.primary : theme.textSecondary })}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
