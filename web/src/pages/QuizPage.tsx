import { useState, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getCurrentWeekAndDay } from '../utils/dateUtils';
import { getDailyQuiz } from '../data/quizzes';
import { weekTitles } from '../data/plan';
import { lightTheme, darkTheme } from '../theme/theme';
import { QuizQuestion } from '../data/types';

export default function QuizPage() {
  const { darkMode, startDate, recordQuizAnswer } = useAppStore();
  const theme = darkMode ? darkTheme : lightTheme;
  const { week } = getCurrentWeekAndDay(startDate);
  const questions = useMemo(() => getDailyQuiz(week, 5), [week]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question: QuizQuestion | undefined = questions[currentIndex];

  const checkAnswer = () => {
    if (!question) return;
    let answer = '';
    if (question.type === 'fill_blank') {
      answer = fillAnswer.trim();
    } else {
      answer = selectedAnswer || '';
    }
    const isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    if (isCorrect) setScore((s) => s + 1);
    recordQuizAnswer(question.id, isCorrect);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setFillAnswer('');
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFillAnswer('');
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (questions.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <span style={{ fontSize: 15, color: theme.textSecondary }}>No quiz available for this week yet.</span>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Quiz Complete!</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: theme.primary }}>{score}/{questions.length}</div>
        <div style={{ fontSize: 16, color: theme.textSecondary, marginBottom: 24 }}>
          {score === questions.length ? 'Perfect score!' : score >= 3 ? 'Great job!' : 'Keep studying!'}
        </div>
        <button className="btn" style={{ backgroundColor: theme.primary, maxWidth: 300 }} onClick={restart}>
          Try Again
        </button>
      </div>
    );
  }

  const isCorrect = question && (
    question.type === 'fill_blank'
      ? fillAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
      : selectedAnswer?.toLowerCase() === question.correctAnswer.toLowerCase()
  );

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple_choice': return 'Multiple Choice';
      case 'true_false': return 'True / False';
      case 'fill_blank': return 'Fill in the Blank';
      case 'code_snippet': return 'Code Snippet';
      default: return type;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ backgroundColor: theme.card }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.primary }}>Week {week}: {weekTitles[week]}</div>
        <div style={{ fontSize: 12, marginTop: 2, color: theme.textSecondary }}>Question {currentIndex + 1} of {questions.length}</div>
      </div>

      {/* Question */}
      <div className="card" style={{ backgroundColor: theme.card }}>
        <span className="type-badge" style={{ backgroundColor: theme.primaryLight, color: theme.primary }}>
          {getTypeLabel(question.type)}
        </span>
        <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: theme.text, marginBottom: 14 }}>
          {question.question}
        </div>

        {question.codeSnippet && (
          <div className="code-block" style={{ backgroundColor: theme.bg, color: theme.text }}>
            {question.codeSnippet}
          </div>
        )}

        {/* Answer Options */}
        {question.type === 'fill_blank' ? (
          <input
            className="quiz-input"
            style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }}
            placeholder="Type your answer..."
            value={fillAnswer}
            onChange={(e) => setFillAnswer(e.target.value)}
            disabled={showResult}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && fillAnswer.trim() && !showResult) checkAnswer();
            }}
          />
        ) : question.type === 'true_false' ? (
          ['True', 'False'].map((opt) => (
            <button
              key={opt}
              className="quiz-option"
              style={{
                backgroundColor: theme.bg,
                color: theme.text,
                borderColor: showResult && opt === question.correctAnswer
                  ? theme.success
                  : showResult && selectedAnswer === opt && opt !== question.correctAnswer
                    ? theme.danger
                    : selectedAnswer === opt ? theme.primary : theme.border,
                ...(showResult && opt === question.correctAnswer ? { backgroundColor: theme.success + '20' } : {}),
                ...(showResult && selectedAnswer === opt && opt !== question.correctAnswer ? { backgroundColor: theme.danger + '20' } : {}),
              }}
              onClick={() => !showResult && setSelectedAnswer(opt)}
              disabled={showResult}
            >
              {opt}
            </button>
          ))
        ) : (
          question.options?.map((opt) => (
            <button
              key={opt}
              className="quiz-option"
              style={{
                backgroundColor: theme.bg,
                color: theme.text,
                borderColor: showResult && opt === question.correctAnswer
                  ? theme.success
                  : showResult && selectedAnswer === opt && opt !== question.correctAnswer
                    ? theme.danger
                    : selectedAnswer === opt ? theme.primary : theme.border,
                ...(showResult && opt === question.correctAnswer ? { backgroundColor: theme.success + '20' } : {}),
                ...(showResult && selectedAnswer === opt && opt !== question.correctAnswer ? { backgroundColor: theme.danger + '20' } : {}),
              }}
              onClick={() => !showResult && setSelectedAnswer(opt)}
              disabled={showResult}
            >
              {opt}
            </button>
          ))
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div className="result-card" style={{ backgroundColor: isCorrect ? theme.success + '20' : theme.danger + '20' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: isCorrect ? theme.success : theme.danger, marginBottom: 6 }}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          {!isCorrect && (
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 6 }}>
              Correct answer: {question.correctAnswer}
            </div>
          )}
          <div style={{ fontSize: 13, lineHeight: 1.4, color: theme.textSecondary }}>{question.explanation}</div>
        </div>
      )}

      {/* Action Button */}
      {!showResult ? (
        <button
          className="btn"
          style={{ backgroundColor: theme.primary }}
          onClick={checkAnswer}
          disabled={!selectedAnswer && !fillAnswer.trim()}
        >
          Check Answer
        </button>
      ) : (
        <button className="btn" style={{ backgroundColor: theme.primary }} onClick={nextQuestion}>
          {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
        </button>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}
