
import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart, onGoHome }) => {
  const getResultMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "참 잘했어요! 완벽해요! 💯";
    if (percentage >= 80) return "정말 잘했어요! 👍";
    if (percentage >= 60) return "조금만 더 힘내요! 😊";
    return "다시 한번 도전해볼까요? 💪";
  };

  return (
    <div className="text-center flex flex-col items-center gap-6 animate-fade-in">
      <h2 className="text-4xl font-bold text-amber-800">퀴즈 결과</h2>
      <p className="text-2xl text-slate-600">{getResultMessage()}</p>
      
      <div className="my-4 p-8 bg-sky-100 border-2 border-sky-300 rounded-full flex flex-col items-center justify-center w-48 h-48 shadow-lg">
        <p className="text-xl text-sky-800">총 점수</p>
        <p className="text-6xl font-bold text-sky-600 font-pen">{score} / {totalQuestions}</p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={onRestart}
          className="w-full bg-green-500 text-white text-2xl py-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          계속하기
        </button>
        <button
          onClick={onGoHome}
          className="w-full bg-gray-500 text-white text-2xl py-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          처음으로
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
