import React from "react";
import type { Question } from "../types/quiz";

interface Props {
  question: Question;
  current: number;
  total: number;
  selected: number | null;
  setSelected: (n: number | null) => void;
  onNext: () => void;
  progress: number;
}

const QuizView: React.FC<Props> = ({ question, current, total, selected, setSelected, onNext, progress }) => {
  return (
    <div className="flex gap-6 items-stretch flex-1 w-full max-w-md md:max-w-3xl lg:max-w-none">
      <div className="hidden lg:block w-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
        <img src="/view test.svg" alt="mountain view" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 bg-[#e8f0e8] rounded-xl p-4 flex flex-col gap-3">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-[10px] lg:text-[12px] font-bold tracking-widest text-[#7a9e7e] uppercase font-sans">Progress</span>
            <span className="text-[10px] lg:text-[12px] text-gray-400 font-sans ml-auto">{current + 1}/{total}</span>
          </div>
          <div className="w-full h-1 bg-[#c8d8c8] rounded-full">
            <div className="h-full bg-[#7a9e7e] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="text-lg md:text-xl lg:text-3xl font-semibold text-[#7a9e7e]">{question.question}</p>

        <div className="flex flex-col gap-3 flex-1">
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex items-center gap-3 rounded-xl px-4 py-4 md:py-8 lg:py-10 text-left text-[12px] md:text-[17px] lg:text-[20px] font-sans font-medium transition-all duration-150 w-full ${
                selected === idx
                  ? "bg-[#b8d4b8] border-2 border-[#7a9e7e] text-[#3a5a3a]"
                  : "bg-[#c8dcc8] border-2 border-transparent text-[#4a6b4a] hover:bg-[#bdd4bd]"
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-sm border-2 border-[#7a9e7e] flex-shrink-0 transition-colors duration-150 ${selected === idx ? "bg-[#7a9e7e]" : "bg-transparent"}`} />
              {choice}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-[#c8d8c8]">
          <button
            onClick={onNext}
            disabled={selected === null}
            className={`text-xs lg:text-sm tracking-widest font-sans uppercase transition-all duration-150 px-3 py-1.5 rounded-lg border ${
              selected === null ? "text-gray-300 cursor-default border-transparent" : "text-[#7a9e7e] cursor-pointer border-transparent hover:border-[#7a9e7e] hover:bg-[#d4e8d4]"
            }`}
          >
            {current + 1 === total ? "SEE RESULT →" : "NEXT →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizView;
