import { QuizQuestion } from '../types';
import { week01Questions } from './week01';
import { week02Questions } from './week02';
import { week03Questions } from './week03';
import { week04Questions, week05Questions, week06Questions, week07Questions, week08Questions, week09Questions, week10Questions, week11Questions, week12Questions } from './week04to12';
import { week13Questions, week14Questions, week15Questions, week16Questions, week17Questions, week18Questions, week19Questions, week20Questions, week21Questions, week22Questions, week23Questions, week24Questions } from './week13to24';

const allQuestions: Record<number, QuizQuestion[]> = {
  1: week01Questions, 2: week02Questions, 3: week03Questions, 4: week04Questions,
  5: week05Questions, 6: week06Questions, 7: week07Questions, 8: week08Questions,
  9: week09Questions, 10: week10Questions, 11: week11Questions, 12: week12Questions,
  13: week13Questions, 14: week14Questions, 15: week15Questions, 16: week16Questions,
  17: week17Questions, 18: week18Questions, 19: week19Questions, 20: week20Questions,
  21: week21Questions, 22: week22Questions, 23: week23Questions, 24: week24Questions,
};

export const getQuestionsForWeek = (week: number): QuizQuestion[] => allQuestions[week] || [];

export const getDailyQuiz = (week: number, count: number = 5): QuizQuestion[] => {
  const questions = getQuestionsForWeek(week);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getTotalQuestions = (): number =>
  Object.values(allQuestions).reduce((sum, qs) => sum + qs.length, 0);

export default allQuestions;
