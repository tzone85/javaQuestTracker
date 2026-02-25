export const getCurrentWeekAndDay = (startDate: string): { week: number; day: number } => {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { week: 1, day: 1 };
  const week = Math.floor(diffDays / 7) + 1;
  const day = (diffDays % 7) + 1; // 1-7
  return { week: Math.min(week, 24), day: Math.min(day, 7) };
};

export const formatDate = (date: Date): string => date.toISOString().split('T')[0];

export const getToday = (): string => formatDate(new Date());

export const getDaysBetween = (d1: string, d2: string): number => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
};

export const addDays = (date: string, days: number): string => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

export const getLast30Days = (): string[] => {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
};
