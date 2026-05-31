import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  testName: string;
  route: string;
  onClose: () => void;
}

const TestEntryPopup: React.FC<Props> = ({ testName, route, onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs md:max-w-md lg:max-w-lg
        rounded-2xl shadow-2xl 
        p-5 md:p-7 lg:p-8 
        flex flex-col gap-3 md:gap-4 lg:gap-5"
        style={{ backgroundColor: "#f0f4ef" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4
          text-gray-400 hover:text-gray-600 transition-colors 
          text-sm md:text-base lg:text-lg leading-none"
        >
          ✕
        </button>

        {/* Title */}
        <div className="flex flex-col gap-0.5 md:gap-1">
          <span className="text-[8px] md:text-[10px] lg:text-[11px] font-bold tracking-widest uppercase font-sans text-[#4a7a4a]">
            You selected
          </span>
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-[#4a7a4a] leading-snug">
            {testName}
          </h2>
        </div>

        <div className="w-full h-px bg-[#d4e4d4]" />

        {/* Buttons */}
        <div className="flex flex-col gap-2 md:gap-3">
          <button
            onClick={() => { onClose(); navigate(route) }}
            className="w-full py-2.5 md:py-3 rounded-xl 
            text-xs md:text-sm font-sans font-medium tracking-widest uppercase 
            text-white transition-all duration-150"
            style={{ backgroundColor: "#4a7a4a" }}
          >
            Take Test
          </button>
          <button
            onClick={() => { onClose(); navigate(`${route}/messages`); }}
            className="w-full py-2.5 md:py-3 rounded-xl 
            text-xs md:text-sm font-sans font-medium tracking-widest uppercase 
            border-2 transition-all duration-150"
            style={{ color: "#4a7a4a", borderColor: "#4a7a4a" }}
          >
            Read Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestEntryPopup;