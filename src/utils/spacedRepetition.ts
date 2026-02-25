import { addDays, getToday } from './dateUtils';

const INTERVALS = [1, 3, 7, 14]; // days between reviews

export const getNextReviewDate = (consecutiveCorrect: number): string => {
  const interval = INTERVALS[Math.min(consecutiveCorrect, INTERVALS.length - 1)];
  return addDays(getToday(), interval);
};

export const isDueForReview = (nextReviewAt: string): boolean => {
  return getToday() >= nextReviewAt;
};

export const isMastered = (consecutiveCorrect: number): boolean => {
  return consecutiveCorrect >= 3;
};
