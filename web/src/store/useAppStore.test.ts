import { act } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { useAppStore as UseAppStoreType } from './useAppStore';

let useAppStore: typeof UseAppStoreType;

beforeEach(async () => {
  // Reset module registry and re-import to get a fresh store instance each test
  vi.resetModules();
  const mod = await import('./useAppStore');
  useAppStore = mod.useAppStore as typeof UseAppStoreType;

  // Reset localStorage between tests (robust for jsdom variations)
  if (typeof window.localStorage.clear === 'function') {
    window.localStorage.clear();
  } else {
    const keys = Object.keys(window.localStorage as any);
    for (const k of keys) {
      window.localStorage.removeItem(k);
    }
  }
});

describe('useAppStore', () => {
  it('toggles task completion', () => {
    const store = useAppStore;
    const id = 'w1d1t1';

    act(() => store.getState().toggleTask(id));
    expect(store.getState().isTaskCompleted(id)).toBe(true);

    act(() => store.getState().toggleTask(id));
    expect(store.getState().isTaskCompleted(id)).toBe(false);
  });

  it('records quiz answers and computes mastery/next review', () => {
    const store = useAppStore;
    const q = 'w1q1';

    act(() => store.getState().recordQuizAnswer(q, true));
    act(() => store.getState().recordQuizAnswer(q, true));
    act(() => store.getState().recordQuizAnswer(q, true));

    const attempt = store.getState().quizAttempts[q];
    expect(attempt).toBeTruthy();
    expect(attempt.consecutiveCorrect).toBe(3);
    expect(attempt.mastered).toBe(true);
  });

  it('getStreak counts recent completed days', () => {
    const store = useAppStore;
    const today = new Date();

    // Mark today and yesterday as complete
    const d1 = new Date(today);
    const d2 = new Date(today);
    d1.setDate(today.getDate());
    d2.setDate(today.getDate() - 1);

    const k1 = d1.toISOString().split('T')[0];
    const k2 = d2.toISOString().split('T')[0];

    act(() => store.getState().markDayComplete(k1));
    act(() => store.getState().markDayComplete(k2));

    expect(store.getState().getStreak()).toBeGreaterThanOrEqual(2);
  });
});
