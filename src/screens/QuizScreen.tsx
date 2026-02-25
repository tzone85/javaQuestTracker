import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { getCurrentWeekAndDay } from '../utils/dateUtils';
import { getDailyQuiz } from '../data/quizzes';
import { weekTitles } from '../data/plan';
import { lightTheme, darkTheme } from '../theme/theme';
import { QuizQuestion } from '../data/types';

export default function QuizScreen() {
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
    } else if (question.type === 'true_false') {
      answer = selectedAnswer || '';
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
      <View style={[styles.center, { backgroundColor: theme.bg }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No quiz available for this week yet.</Text>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={[styles.center, { backgroundColor: theme.bg }]}>
        <Text style={[styles.finishEmoji]}>🎉</Text>
        <Text style={[styles.finishTitle, { color: theme.text }]}>Quiz Complete!</Text>
        <Text style={[styles.finishScore, { color: theme.primary }]}>{score}/{questions.length}</Text>
        <Text style={[styles.finishLabel, { color: theme.textSecondary }]}>
          {score === questions.length ? 'Perfect score!' : score >= 3 ? 'Great job!' : 'Keep studying!'}
        </Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={restart}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCorrect = question && (
    question.type === 'fill_blank'
      ? fillAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
      : selectedAnswer?.toLowerCase() === question.correctAnswer.toLowerCase()
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Text style={[styles.weekLabel, { color: theme.primary }]}>Week {week}: {weekTitles[week]}</Text>
        <Text style={[styles.qCount, { color: theme.textSecondary }]}>Question {currentIndex + 1} of {questions.length}</Text>
      </View>

      {/* Question */}
      <View style={[styles.questionCard, { backgroundColor: theme.card }]}>
        <View style={[styles.typeBadge, { backgroundColor: theme.primaryLight }]}>
          <Text style={[styles.typeText, { color: theme.primary }]}>
            {question.type === 'multiple_choice' ? 'Multiple Choice' : question.type === 'true_false' ? 'True / False' : question.type === 'fill_blank' ? 'Fill in the Blank' : 'Code Snippet'}
          </Text>
        </View>
        <Text style={[styles.questionText, { color: theme.text }]}>{question.question}</Text>

        {question.codeSnippet && (
          <View style={[styles.codeBlock, { backgroundColor: theme.bg }]}>
            <Text style={[styles.codeText, { color: theme.text }]}>{question.codeSnippet}</Text>
          </View>
        )}

        {/* Answer Options */}
        {question.type === 'fill_blank' ? (
          <TextInput
            style={[styles.input, { backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }]}
            placeholder="Type your answer..."
            placeholderTextColor={theme.textSecondary}
            value={fillAnswer}
            onChangeText={setFillAnswer}
            editable={!showResult}
          />
        ) : question.type === 'true_false' ? (
          ['True', 'False'].map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                { backgroundColor: theme.bg, borderColor: selectedAnswer === opt ? theme.primary : theme.border },
                showResult && opt === question.correctAnswer && { borderColor: theme.success, backgroundColor: theme.success + '20' },
                showResult && selectedAnswer === opt && opt !== question.correctAnswer && { borderColor: theme.danger, backgroundColor: theme.danger + '20' },
              ]}
              onPress={() => !showResult && setSelectedAnswer(opt)}
              disabled={showResult}
            >
              <Text style={[styles.optionText, { color: theme.text }]}>{opt}</Text>
            </TouchableOpacity>
          ))
        ) : (
          question.options?.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                { backgroundColor: theme.bg, borderColor: selectedAnswer === opt ? theme.primary : theme.border },
                showResult && opt === question.correctAnswer && { borderColor: theme.success, backgroundColor: theme.success + '20' },
                showResult && selectedAnswer === opt && opt !== question.correctAnswer && { borderColor: theme.danger, backgroundColor: theme.danger + '20' },
              ]}
              onPress={() => !showResult && setSelectedAnswer(opt)}
              disabled={showResult}
            >
              <Text style={[styles.optionText, { color: theme.text }]}>{opt}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Result */}
      {showResult && (
        <View style={[styles.resultCard, { backgroundColor: isCorrect ? theme.success + '20' : theme.danger + '20' }]}>
          <Text style={[styles.resultTitle, { color: isCorrect ? theme.success : theme.danger }]}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </Text>
          {!isCorrect && (
            <Text style={[styles.correctLabel, { color: theme.text }]}>
              Correct answer: {question.correctAnswer}
            </Text>
          )}
          <Text style={[styles.explanation, { color: theme.textSecondary }]}>{question.explanation}</Text>
        </View>
      )}

      {/* Action Button */}
      {!showResult ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary, opacity: (selectedAnswer || fillAnswer.trim()) ? 1 : 0.5 }]}
          onPress={checkAnswer}
          disabled={!selectedAnswer && !fillAnswer.trim()}
        >
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={nextQuestion}>
          <Text style={styles.buttonText}>{currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}</Text>
        </TouchableOpacity>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { borderRadius: 12, padding: 14, marginBottom: 12 },
  weekLabel: { fontSize: 14, fontWeight: '600' },
  qCount: { fontSize: 12, marginTop: 2 },
  questionCard: { borderRadius: 12, padding: 16, marginBottom: 12 },
  typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 10 },
  typeText: { fontSize: 11, fontWeight: '600' },
  questionText: { fontSize: 16, fontWeight: '600', lineHeight: 22, marginBottom: 14 },
  codeBlock: { borderRadius: 8, padding: 12, marginBottom: 14 },
  codeText: { fontFamily: 'monospace', fontSize: 13, lineHeight: 18 },
  option: { borderRadius: 10, padding: 14, marginBottom: 8, borderWidth: 2 },
  optionText: { fontSize: 14 },
  input: { borderRadius: 10, padding: 14, borderWidth: 2, fontSize: 15, marginTop: 4 },
  resultCard: { borderRadius: 10, padding: 14, marginBottom: 12 },
  resultTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  correctLabel: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  explanation: { fontSize: 13, lineHeight: 18 },
  button: { borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  finishEmoji: { fontSize: 60, marginBottom: 12 },
  finishTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  finishScore: { fontSize: 48, fontWeight: '800' },
  finishLabel: { fontSize: 16, marginBottom: 24 },
  emptyText: { fontSize: 15 },
});
