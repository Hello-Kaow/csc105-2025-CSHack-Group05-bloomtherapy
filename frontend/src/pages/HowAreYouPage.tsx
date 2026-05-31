import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResultPopup from "../components/ResultPopup";
import QuizView from "../components/QuizView";
import type { Question, QuizResult } from "../types/quiz";

const HowAreYou: React.FC = () => {
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
    const url = `${base}/api/how-are-you/questions`;
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

  const fetchResult = async (finalAnswers: number[]) => {
    try {
      const base = import.meta.env.VITE_API_URL || "";
      const url = `${base}/api/how-are-you/result`;
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

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#f5ebe8] items-center justify-center">
        <p className="text-red-600 font-sans text-sm tracking-widest uppercase">{error}</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />
      {showResult && result && (
        <ResultPopup
          result={result}
          onClose={() => {
            setShowResult(false);
            setResult(null);
            navigate("/humanitytest");
          }}
          onRetake={handleRetake}
        />
      )}
      <main className="flex-1 flex flex-col px-6 md:px-20 pt-10 pb-8 lg:ml-52 lg:pl-10 items-center lg:items-start">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#7a9e7e] mb-1 md:mb-2 w-full max-w-md md:max-w-2xl lg:max-w-none">
          How Are You, Really?
        </h1>
        <p className="text-[13px] md:text-[16px] lg:text-[18px] text-[#5a8a5a] leading-relaxed mb-6 font-sans w-full">
          An honest check-in that helps you understand your current emotional state.
        </p>
        <QuizView question={q} current={current} total={questions.length} selected={selected} setSelected={setSelected} onNext={handleNext} progress={progress} />
      </main>
    </div>
  );
};

export default HowAreYou;
