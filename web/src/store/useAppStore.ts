import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QuizAttempt } from '../data/types';
import { getNextReviewDate, isMastered } from '../utils/spacedRepetition';
import { getToday } from '../utils/dateUtils';

interface AppState {
  // Settings
  startDate: string;
  darkMode: boolean;
  setStartDate: (date: string) => void;
  toggleDarkMode: () => void;

  // Task completions
  completedTasks: Record<string, string>;
  toggleTask: (taskId: string) => void;
  isTaskCompleted: (taskId: string) => boolean;

  // Streaks
  dailyCompletions: Record<string, boolean>;
  markDayComplete: (date: string) => void;
  getStreak: () => number;

  // Quiz
  quizAttempts: Record<string, QuizAttempt>;
  recordQuizAnswer: (questionId: string, correct: boolean) => void;
  getQuizScore: (week: number) => { correct: number; total: number };
  quizScoreHistory: Array<{ date: string; score: number; total: number }>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Settings
      startDate: getToday(),
      darkMode: false,
      setStartDate: (date) => set({ startDate: date }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      // Task completions
      completedTasks: {},
      toggleTask: (taskId) =>
        set((state) => {
          const newCompleted = { ...state.completedTasks };
          if (newCompleted[taskId]) {
            delete newCompleted[taskId];
          } else {
            newCompleted[taskId] = new Date().toISOString();
          }
          return { completedTasks: newCompleted };
        }),
      isTaskCompleted: (taskId) => !!get().completedTasks[taskId],

      // Streaks
      dailyCompletions: {},
      markDayComplete: (date) =>
        set((state) => ({
          dailyCompletions: { ...state.dailyCompletions, [date]: true },
        })),
      getStreak: () => {
        const { dailyCompletions } = get();
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().split('T')[0];
          if (dailyCompletions[key]) {
            streak++;
          } else if (i > 0) {
            break;
          }
        }
        return streak;
      },

      // Quiz
      quizAttempts: {},
      quizScoreHistory: [],
      recordQuizAnswer: (questionId, correct) =>
        set((state) => {
          const prev = state.quizAttempts[questionId];
          const consecutiveCorrect = correct ? (prev?.consecutiveCorrect || 0) + 1 : 0;
          const attempt: QuizAttempt = {
            questionId,
            correct,
            attemptedAt: new Date().toISOString(),
            consecutiveCorrect,
            nextReviewAt: correct ? getNextReviewDate(consecutiveCorrect) : getToday(),
            mastered: isMastered(consecutiveCorrect),
          };
          return {
            quizAttempts: { ...state.quizAttempts, [questionId]: attempt },
          };
        }),
      getQuizScore: (week) => {
        const { quizAttempts } = get();
        const weekAttempts = Object.values(quizAttempts).filter(
          (a) => a.questionId.startsWith(`w${week}q`)
        );
        const correct = weekAttempts.filter((a) => a.correct).length;
        return { correct, total: weekAttempts.length };
      },
    }),
    {
      name: 'java-quest-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
