import React, { useState, useRef, useEffect } from 'react';
import type { Question } from '../types';
import { HomeIcon, CheckIcon, XIcon } from './icons';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onGoHome: () => void;
}

type Feedback = 'correct' | 'incorrect' | null;

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionNumber, totalQuestions, onAnswerSubmit, onNextQuestion, onGoHome }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // When a new question loads, reset state and focus the input field.
  useEffect(() => {
    setUserAnswer('');
    setIsAnswered(false);
    setFeedback(null);
    inputRef.current?.focus();
  }, [question]);

  // When an answer is submitted, focus the 'Next Question' button
  // so the user can press Enter again to proceed.
  useEffect(() => {
    if (isAnswered) {
      // Use a short timeout to ensure the button is rendered and visible before focusing.
      const timer = setTimeout(() => {
        nextButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAnswered]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAnswered || userAnswer.trim() === '') return;

    const answer = parseInt(userAnswer, 10);
    const isCorrect = answer === question.answer;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    onAnswerSubmit(isCorrect);
    setIsAnswered(true); 
  };
  
  return (
    <div className="flex flex-col items-center text-center relative">
      <button onClick={onGoHome} className="absolute top-0 left-0 text-slate-500 hover:text-sky-600 transition-colors p-2 flex items-center gap-1">
        <HomeIcon />
        <span>처음으로</span>
      </button>

      <div className="w-full text-right text-xl text-slate-500 mb-4">
        {questionNumber} / {totalQuestions}
      </div>

      <div className="flex items-center justify-center space-x-4 md:space-x-8 text-6xl md:text-8xl font-bold text-slate-700 my-8 font-pen select-none">
        <span>{question.num1}</span>
        <span className="text-sky-500">x</span>
        <span>{question.num2}</span>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isAnswered}
          className="w-full text-center text-5xl p-4 border-4 border-slate-300 rounded-2xl focus:border-sky-500 focus:ring-sky-500 transition-all duration-300 disabled:bg-slate-200 disabled:text-slate-500"
          placeholder="?"
        />
        {!isAnswered && (
          <button type="submit" className="w-full bg-sky-500 text-white text-2xl py-3 rounded-xl shadow-lg hover:bg-sky-600 transition-colors">
            정답 확인! (Enter)
          </button>
        )}
      </form>
      
      {feedback && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in gap-8 p-4">
          {feedback === 'correct' ? (
            <div className="text-green-500 text-center">
              <CheckIcon />
              <p className="text-6xl font-bold mt-4">딩동댕!</p>
            </div>
          ) : (
            <div className="text-red-500 text-center">
              <XIcon />
              <p className="text-6xl font-bold mt-4">땡!</p>
              <p className="text-3xl mt-2">정답은 {question.answer} 입니다</p>
            </div>
          )}
          <button
            ref={nextButtonRef}
            type="button"
            onClick={onNextQuestion}
            className="w-full max-w-sm bg-green-500 text-white text-2xl py-3 rounded-xl shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            다음 문제 (Enter)
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;