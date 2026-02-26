import { getNextReviewDate, isDueForReview, isMastered } from './spacedRepetition';
import { addDays, getToday } from './dateUtils';

describe('spacedRepetition', () => {
  it('getNextReviewDate uses increasing intervals', () => {
    const today = getToday();
    expect(getNextReviewDate(0)).toBe(addDays(today, 1));
    expect(getNextReviewDate(1)).toBe(addDays(today, 3));
    expect(getNextReviewDate(2)).toBe(addDays(today, 7));
    expect(getNextReviewDate(10)).toBe(addDays(today, 14));
  });

  it('isDueForReview works with YYYY-MM-DD strings', () => {
    const today = getToday();
    expect(isDueForReview(addDays(today, -1))).toBe(true);
    expect(isDueForReview(today)).toBe(true);
    expect(isDueForReview(addDays(today, 1))).toBe(false);
  });

  it('isMastered after 3 consecutive correct', () => {
    expect(isMastered(0)).toBe(false);
    expect(isMastered(2)).toBe(false);
    expect(isMastered(3)).toBe(true);
    expect(isMastered(10)).toBe(true);
  });
});