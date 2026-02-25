export type Phase = {
  id: number;
  title: string;
  subtitle: string;
  weeks: number[];
  emoji: string;
};

export type WeekTask = {
  id: string; // e.g. "w1d1t1"
  week: number;
  day: number; // 1-6 within the week (day 7 = rest)
  title: string;
  description: string;
  isBossBattle?: boolean;
};

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'code_snippet';

export type QuizQuestion = {
  id: string;
  week: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  codeSnippet?: string;
};

export type Badge = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  unlockCondition: {
    type: 'week_complete' | 'phase_complete' | 'task_complete' | 'all_complete';
    value: number | string;
  };
};

export type TaskCompletion = {
  taskId: string;
  completedAt: string; // ISO date
};

export type QuizAttempt = {
  questionId: string;
  correct: boolean;
  attemptedAt: string;
  consecutiveCorrect: number;
  nextReviewAt: string; // ISO date for spaced repetition
  mastered: boolean;
};

export type DayStatus = 'complete' | 'partial' | 'missed' | 'future' | 'rest';
