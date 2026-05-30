import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TestEntryPopup from "../components/TestEntryPopup";

const view3 = "/view3.svg";

interface QuestionCard {
  image: string;
  label: string;
  route: string;
}

const questions: QuestionCard[] = [
  {
    image: view3,
    label: "What keeps you human?",
    route: "/humanitytest/what-keeps-you-human",
  },
];

const HumanityTest: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<QuestionCard | null>(null);
  const [questionsCount, setQuestionsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    const url = `${base}/api/quiz/questions`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch quiz questions");
        return res.json();
      })
      .then((data: any[]) => {
        setQuestionsCount(Array.isArray(data) ? data.length : null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Navbar />

      <main
        className="flex-1 min-h-screen flex flex-col items-center
                   px-8 pt-10 pb-8 box-border lg:ml-52 lg:pl-10 relative"
        style={{
          backgroundImage: "url('/view nature.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* overlay ปรับ /50 ได้ตามใจ */}
        <div className="absolute inset-0 bg-white/70" />

        {/* content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#7a9e7e] mb-2 tracking-tight">
            Humanity Test
          </h1>
          <p className="text-[11px] md:text-[15px] lg:text-[16px] text-gray-700 max-w-md leading-relaxed mb-9 font-sans">
            A psychological simulation designed to measure emotional resilience and core
            identity tethers in isolated environments.
          </p>

          <div className="grid grid-cols-2 gap-5 w-full max-w-xs justify-center
                          md:grid-cols-3 md:gap-12 md:max-w-2xl">
            {questions.map((q, i) => (
              <div
                key={i}
                onClick={() => setSelectedTest(q)}
                className={`flex flex-col items-center cursor-pointer
                           transition-transform duration-200 hover:-translate-y-1
                           ${i === 2 ? "col-span-2 max-w-[50%] mx-auto md:col-span-1 md:max-w-none md:mx-0" : ""}`}
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-[#d6c9c0] mb-3">
                  <img
                    src={q.image}
                    alt={q.label}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="text-xs text-gray-500 text-center leading-snug whitespace-pre-line font-sans px-1 md:text-sm">
                  <div>{q.label}</div>
                  <div className="text-[10px] text-gray-700 mt-1">
                    {loading ? "Loading…" : error ? `Error: ${error}` : `${questionsCount ?? "–"} questions`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {selectedTest && (
        <TestEntryPopup
          testName={selectedTest.label}
          route={selectedTest.route}
          onClose={() => setSelectedTest(null)}
        />
      )}
    </div>
  );
};

export default HumanityTest;