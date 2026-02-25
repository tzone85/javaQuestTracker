import { Badge } from './types';

export const badges: Badge[] = [
  { id: 'red_light', emoji: '🔴', title: 'Red Light', description: 'Wrote your first failing test intentionally', unlockCondition: { type: 'task_complete', value: 'w2d1t1' } },
  { id: 'green_light', emoji: '🟢', title: 'Green Light', description: 'Completed Week 2 — TDD fundamentals', unlockCondition: { type: 'week_complete', value: 2 } },
  { id: 'refactor_hero', emoji: '♻️', title: 'Refactor Hero', description: 'Completed Week 3 — Kata Immersion', unlockCondition: { type: 'week_complete', value: 3 } },
  { id: 'cart_conqueror', emoji: '🛒', title: 'Cart Conqueror', description: 'Completed Phase 1 Boss Battle', unlockCondition: { type: 'phase_complete', value: 1 } },
  { id: 'api_architect', emoji: '🏗️', title: 'API Architect', description: 'Completed Phase 2 Boss Battle', unlockCondition: { type: 'phase_complete', value: 2 } },
  { id: 'whale_whisperer', emoji: '🐳', title: 'Whale Whisperer', description: 'Containerised your app with Docker', unlockCondition: { type: 'week_complete', value: 11 } },
  { id: 'pair_magician', emoji: '🤝', title: 'Pair Magician', description: 'Completed kata sessions with a partner', unlockCondition: { type: 'week_complete', value: 16 } },
  { id: 'consultant_voice', emoji: '🎤', title: 'Consultant Voice', description: 'Answered all consultancy questions out loud', unlockCondition: { type: 'week_complete', value: 18 } },
  { id: 'equal_expert', emoji: '🏆', title: 'Equal Expert', description: 'Completed all 24 weeks!', unlockCondition: { type: 'all_complete', value: 24 } },
];
