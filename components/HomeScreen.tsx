
import React, { useState } from 'react';
import type { QuizConfig } from '../types';

interface HomeScreenProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz }) => {
  const [selectedDan, setSelectedDan] = useState<number>(2);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(2);

  const numbers = [2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="text-center flex flex-col items-center gap-8 animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-bold text-amber-700 font-pen">신나는 구구단 퀴즈!</h1>
      <p className="text-xl text-slate-600">어떤 방법으로 구구단을 외워볼까요?</p>

      <div className="w-full space-y-6">
        <button
          onClick={() => onStartQuiz({ mode: 'random' })}
          className="w-full bg-sky-500 text-white text-2xl py-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          🎲 무작위 문제 풀이
        </button>
        
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 shadow-inner space-y-4">
          <h2 className="text-2xl font-bold text-orange-800">🎯 선택해서 외우기</h2>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex-1 w-full space-y-2">
              <label htmlFor="dan-select" className="text-lg text-slate-700">앞숫자 (단) 선택:</label>
              <select 
                id="dan-select"
                value={selectedDan}
                onChange={(e) => setSelectedDan(Number(e.target.value))}
                className="w-full p-3 text-lg border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                {numbers.map(n => <option key={n} value={n}>{n}단</option>)}
              </select>
            </div>
            <button
              onClick={() => onStartQuiz({ mode: 'dan', key: selectedDan })}
              className="w-full md:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors text-lg"
            >
              {selectedDan}단 시작!
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex-1 w-full space-y-2">
              <label htmlFor="multiplier-select" className="text-lg text-slate-700">뒷숫자 선택:</label>
              <select 
                id="multiplier-select"
                value={selectedMultiplier}
                onChange={(e) => setSelectedMultiplier(Number(e.target.value))}
                className="w-full p-3 text-lg border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                {numbers.map(n => <option key={n} value={n}>{n} 곱하기</option>)}
              </select>
            </div>
            <button
              onClick={() => onStartQuiz({ mode: 'multiplier', key: selectedMultiplier })}
              className="w-full md:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors text-lg"
            >
              x{selectedMultiplier} 시작!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
