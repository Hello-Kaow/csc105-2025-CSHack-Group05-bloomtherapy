import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Question {
  question: string;
  choices: string[];
}

interface QuizResult {
  title: string;
  subtitle: string;
  description: string;
  helps: string[];
  color: string;
  bg: string;
  accent: string;
}

const ResultPopup: React.FC<{
  result: QuizResult;
  onClose: () => void;
  onRetake: () => void;
}> = ({ result, onClose, onRetake }) => {
  const [showLeaveMessage, setShowLeaveMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-sm md:max-w-md lg:max-w-lg
          rounded-2xl shadow-2xl p-4 md:p-8 lg:p-7 flex flex-col
          gap-2.5 md:gap-5 lg:gap-4"
          style={{ backgroundColor: result.bg }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-5 md:right-5 lg:top-4 lg:right-4
            text-gray-400 hover:text-gray-600 transition-colors text-sm md:text-xl lg:text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="flex flex-col gap-0.5 md:gap-1.5 lg:gap-1">
            <span
              className="text-[8px] md:text-[11px] lg:text-[11px] font-bold tracking-widest uppercase font-sans"
              style={{ color: result.color }}
            >
              Your Result
            </span>
            <h2
              className="text-lg md:text-2xl lg:text-3xl font-bold leading-tight"
              style={{ color: result.color }}
            >
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

          <div
            className="rounded-xl p-3 md:p-5 lg:p-4 flex flex-col gap-2 md:gap-3 lg:gap-4"
            style={{ backgroundColor: result.accent }}
          >
            <span
              className="text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-widest uppercase font-sans"
              style={{ color: result.color }}
            >
              What helps you heal
            </span>
            <ul className="flex flex-col md:gap-2 lg:gap-3">
              {result.helps.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[10px] md:text-[11px] lg:text-[12px] font-sans text-gray-600"
                >
                  <span style={{ color: result.color }} className="mt-0.5 flex-shrink-0">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-0.5 md:pt-2 lg:pt-1">
            <button
              onClick={onRetake}
              className="text-[10px] lg:text-xs tracking-widest uppercase font-sans transition-all duration-150 px-3 py-1.5 rounded-lg border"
              style={{ color: result.color, borderColor: result.color }}
            >
              Retake
            </button>
            <button
              onClick={() => setShowLeaveMessage(true)}
              className="text-[10px] lg:text-xs tracking-widest uppercase font-sans transition-all duration-150 px-3 py-1.5 rounded-lg border"
              style={{ color: result.color, borderColor: result.color }}
            >
              Leave Message
            </button>
            <button
              onClick={onClose}
              className="text-[10px] md:text-[11px] lg:text-[12px] tracking-widest uppercase font-sans transition-all duration-150 px-4 py-1.5 rounded-lg text-white"
              style={{ backgroundColor: result.color }}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {showLeaveMessage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowLeaveMessage(false)}
        >
          <div
            className="relative w-full max-w-xs md:max-w-md rounded-2xl shadow-2xl p-5 md:p-7 flex flex-col gap-3 md:gap-4"
            style={{ backgroundColor: result.bg }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLeaveMessage(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors text-sm leading-none"
            >
              ✕
            </button>

            <div className="flex flex-col gap-0.5">
              <span
                className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase font-sans"
                style={{ color: result.color }}
              >
                Leave a Message
              </span>
              <p className="text-[11px] md:text-xs text-gray-500 font-sans">
                Share something anonymous for others who feel the same.
              </p>
            </div>

            <div className="w-full h-px" style={{ backgroundColor: result.accent }} />

            {submitted ? (
              <p className="text-sm text-center font-sans py-4" style={{ color: result.color }}>
                Thank you for sharing ✦
              </p>
            ) : (
              <>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Write something..."
                  rows={4}
                  className="w-full rounded-xl px-3 py-2.5 text-xs md:text-sm font-sans text-gray-600 resize-none outline-none border-2 border-transparent transition-all"
                  style={{ backgroundColor: result.accent }}
                  onFocus={(e) => (e.target.style.borderColor = result.color)}
                  onBlur={(e) => (e.target.style.borderColor = "transparent")}
                />
                <div className="flex justify-end">
                  <button
                    onClick={async () => {
                      if (!messageText.trim()) return;
                      try {
                        const base = import.meta.env.VITE_API_URL || "";
                        const res = await fetch(`${base}/api/messages`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ message: messageText.trim(), testName: "What Keeps You Human" }),
                        });
                        if (!res.ok) {
                          const text = await res.text();
                          throw new Error(text || "Failed to submit message");
                        }
                        setSubmitted(true);
                        setMessageText("");
                      } catch (err: any) {
                        // surface error to user
                        alert(err?.message ?? "Failed to submit message");
                      }
                    }}
                    className="text-[10px] md:text-xs tracking-widest uppercase font-sans px-4 py-1.5 rounded-lg text-white transition-all"
                    style={{ backgroundColor: result.color }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const WhatKeepsYouHuman: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    const url = `${base}/api/quiz/questions`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch quiz questions");
        return res.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  const progress = questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  const handleSelect = (idx: number) => setSelected(idx);

  const fetchResult = async (finalAnswers: number[]) => {
    try {
      const base = import.meta.env.VITE_API_URL || "";
      const url = `${base}/api/quiz/result`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(errBody || "Failed to fetch result");
      }

      const data: Partial<QuizResult> = await res.json();

      // Provide sensible defaults for styling fields the backend doesn't return
      const normalized: QuizResult = {
        title: data.title || "Your Result",
        subtitle: data.subtitle || "",
        description: data.description || "",
        helps: data.helps || [],
        color: data.color || "#4a7a4a",
        bg: data.bg || "#f0f4ef",
        accent: data.accent || "#d4e8d4",
      };

      setResult(normalized);
      setShowResult(true);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error fetching result");
    }
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      fetchResult(newAnswers);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#f5ebe8] items-center justify-center">
        <p className="text-[#7a9e7e] font-sans text-sm tracking-widest uppercase">Loading...</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="flex min-h-screen bg-[#f5ebe8]">
      <Navbar />

      {showResult && result && (
        <ResultPopup
          result={result}
          onClose={() => {
            setShowResult(false);
            setResult(null);
            navigate("/humanity-test");
          }}
          onRetake={handleRetake}
        />
      )}

      <main className="flex-1 flex flex-col px-6 pt-10 pb-8 lg:ml-52 lg:pl-10 items-center lg:items-start">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#7a9e7e] mb-2 w-full max-w-md lg:max-w-none">
          What Keeps You Human?
        </h1>
        <p className="text-xs lg:text-sm text-gray-400 max-w-sm leading-relaxed mb-6 font-sans w-full">
          A self-reflection personality test that helps users discover what emotionally keeps them
          going and gives meaning to their life.
        </p>

        <div className="flex gap-6 items-stretch flex-1 w-full max-w-md lg:max-w-none">
          <div className="hidden lg:block w-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
            <img src="/view test.svg" alt="mountain view" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 bg-[#e8f0e8] rounded-xl p-4 flex flex-col gap-3">
            <div>
              <div className="flex items-center mb-1.5">
                <span className="text-[10px] font-bold tracking-widest text-[#7a9e7e] uppercase font-sans">
                  Progress
                </span>
                <span className="text-[10px] text-gray-400 font-sans ml-auto">
                  {current + 1}/{questions.length}
                </span>
              </div>
              <div className="w-full h-1 bg-[#c8d8c8] rounded-full">
                <div
                  className="h-full bg-[#7a9e7e] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-lg lg:text-xl font-semibold text-[#7a9e7e] leading-snug">
              {q.question}
            </p>

            <div className="flex flex-col gap-3 flex-1">
              {q.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left
                              text-sm font-sans font-medium transition-all duration-150 w-full
                              ${
                                selected === idx
                                  ? "bg-[#b8d4b8] border-2 border-[#7a9e7e] text-[#3a5a3a]"
                                  : "bg-[#c8dcc8] border-2 border-transparent text-[#4a6b4a] hover:bg-[#bdd4bd]"
                              }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-sm border-2 border-[#7a9e7e] flex-shrink-0
                                transition-colors duration-150
                                ${selected === idx ? "bg-[#7a9e7e]" : "bg-transparent"}`}
                  />
                  {choice}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-[#c8d8c8]">
              <button
                onClick={handleNext}
                disabled={selected === null}
                className={`text-xs tracking-widest font-sans uppercase transition-all duration-150
                            px-3 py-1.5 rounded-lg border
                            ${
                              selected === null
                                ? "text-gray-300 cursor-default border-transparent"
                                : "text-[#7a9e7e] cursor-pointer border-transparent hover:border-[#7a9e7e] hover:bg-[#d4e8d4]"
                            }`}
              >
                {current + 1 === questions.length ? "SEE RESULT →" : "NEXT →"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhatKeepsYouHuman;