import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveMessageModal from "./LeaveMessageModal";
import type { QuizResult } from "../types/quiz";

const ResultPopup: React.FC<{
  result: QuizResult;
  onClose: () => void;
  onRetake: () => void;
}> = ({ result, onClose, onRetake }) => {
  const [showLeaveMessage, setShowLeaveMessage] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-2xl p-4 md:p-8 lg:p-7 flex flex-col gap-2.5 md:gap-5 lg:gap-4"
          style={{ backgroundColor: result.bg }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-5 md:right-5 lg:top-4 lg:right-4 text-gray-400 hover:text-gray-600 transition-colors text-sm md:text-xl lg:text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="flex flex-col gap-0.5 md:gap-1.5 lg:gap-1">
            <span className="text-[8px] md:text-[11px] lg:text-[11px] font-bold tracking-widest uppercase font-sans" style={{ color: result.color }}>
              Your Result
            </span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold leading-tight" style={{ color: result.color }}>
              {result.title}
            </h2>
            <p className="text-[11px] md:text-[12px] lg:text-[13px] text-gray-500 font-sans italic">
              {result.subtitle}
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: result.accent }} />

          <p className="text-[10px] md:text-[12px] lg:text-[13px] text-gray-600 font-sans leading-relaxed">
            {result.description}
          </p>

          <div className="rounded-xl p-3 md:p-5 lg:p-4 flex flex-col gap-2 md:gap-3 lg:gap-4" style={{ backgroundColor: result.accent }}>
            <span className="text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-widest uppercase font-sans" style={{ color: result.color }}>
              What helps you heal
            </span>
            <ul className="flex flex-col md:gap-2 lg:gap-3">
              {result.helps.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] md:text-[11px] lg:text-[12px] font-sans text-gray-600">
                  <span style={{ color: result.color }} className="mt-0.5 flex-shrink-0">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-0.5 md:pt-2 lg:pt-1">
            <button onClick={onRetake} className="text-[10px] lg:text-xs tracking-widest uppercase font-sans transition-all duration-150 px-3 py-1.5 rounded-lg border" style={{ color: result.color, borderColor: result.color }}>
              Retake
            </button>
            <button onClick={() => setShowLeaveMessage(true)} className="text-[10px] lg:text-xs tracking-widest uppercase font-sans transition-all duration-150 px-3 py-1.5 rounded-lg border" style={{ color: result.color, borderColor: result.color }}>
              Leave Message
            </button>
            <button onClick={() => { onClose(); navigate("/humanity-test"); }} className="text-[10px] md:text-[11px] lg:text-[12px] tracking-widest uppercase font-sans transition-all duration-150 px-4 py-1.5 rounded-lg text-white" style={{ backgroundColor: result.color }}>
              Done
            </button>
          </div>
        </div>
      </div>

      <LeaveMessageModal open={showLeaveMessage} onClose={() => setShowLeaveMessage(false)} testName="What Keeps You Human" color={result.color} bg={result.bg} accent={result.accent} />
    </>
  );
};

export default ResultPopup;
