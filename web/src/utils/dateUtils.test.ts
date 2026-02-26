import { getCurrentWeekAndDay, formatDate, getToday, getDaysBetween, addDays, getLast30Days } from './dateUtils';

describe('dateUtils', () => {
  it('formatDate returns YYYY-MM-DD', () => {
    const d = new Date('2024-01-15T12:34:56Z');
    expect(formatDate(d)).toBe('2024-01-15');
  });

  it('addDays advances date correctly', () => {
    expect(addDays('2024-01-15', 5)).toBe('2024-01-20');
  });

  it('getDaysBetween computes whole day deltas', () => {
    expect(getDaysBetween('2024-01-01', '2024-01-10')).toBe(9);
  });

  it('getLast30Days returns 30 dates ending today', () => {
    const days = getLast30Days();
    expect(days).toHaveLength(30);
    expect(days[days.length - 1]).toBe(getToday());
  });

  it('getCurrentWeekAndDay clamps to 24 weeks and 7 days', () => {
    const start = '2000-01-01';
    const { week, day } = getCurrentWeekAndDay(start);
    expect(week).toBeLessThanOrEqual(24);
    expect(day).toBeLessThanOrEqual(7);
  });
});