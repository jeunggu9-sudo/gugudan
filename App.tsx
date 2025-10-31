
import React, { useState, useCallback, useRef } from 'react';
import type { GameState, QuizConfig, Question } from './types';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

const TOTAL_QUESTIONS = 5;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    correctSoundRef.current = document.getElementById('correct-sound') as HTMLAudioElement;
    incorrectSoundRef.current = document.getElementById('incorrect-sound') as HTMLAudioElement;
  }, []);

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  const generateQuestions = useCallback((config: QuizConfig) => {
    const newQuestions: Question[] = [];
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
    
    switch (config.mode) {
      case 'random':
        while (newQuestions.length < TOTAL_QUESTIONS) {
          const num1 = numbers[Math.floor(Math.random() * numbers.length)];
          const num2 = numbers[Math.floor(Math.random() * numbers.length)];
          // Avoid duplicates
          if (!newQuestions.some(q => q.num1 === num1 && q.num2 === num2)) {
            newQuestions.push({ num1, num2, answer: num1 * num2 });
          }
        }
        break;
      case 'dan': {
        const dan = config.key!;
        const shuffledMultipliers = shuffleArray(numbers);
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
          const multiplier = shuffledMultipliers[i];
          newQuestions.push({ num1: dan, num2: multiplier, answer: dan * multiplier });
        }
        break;
      }
      case 'multiplier': {
        const multiplier = config.key!;
        const shuffledDans = shuffleArray(numbers);
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
          const dan = shuffledDans[i];
          newQuestions.push({ num1: dan, num2: multiplier, answer: dan * multiplier });
        }
        break;
      }
    }
    return newQuestions;
  }, [shuffleArray]);

  const startQuiz = useCallback((config: QuizConfig) => {
    setQuizConfig(config);
    setQuestions(generateQuestions(config));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('quiz');
  }, [generateQuestions]);
  
  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      correctSoundRef.current?.play();
    } else {
      incorrectSoundRef.current?.play();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const restartQuiz = useCallback(() => {
    if (quizConfig) {
      startQuiz(quizConfig);
    }
  }, [quizConfig, startQuiz]);

  const goToHome = () => {
    setGameState('home');
    setQuizConfig(null);
  };
  
  const renderContent = () => {
    switch (gameState) {
      case 'quiz':
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={nextQuestion}
            onGoHome={goToHome}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            onRestart={restartQuiz}
            onGoHome={goToHome}
          />
        );
      case 'home':
      default:
        return <HomeScreen onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="bg-amber-100 min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-4 border-amber-300">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
