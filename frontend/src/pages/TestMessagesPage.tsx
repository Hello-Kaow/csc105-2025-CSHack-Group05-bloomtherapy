import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

interface Message {
  id: string;
  message: string;
  testName: string;
  createdAt: string;
}

const TestMessages: React.FC = () => {
  const location = useLocation();
  const testName = location.pathname.includes("what-scares-you")
    ? "What Scares You More Than the End of the World"
    : location.pathname.includes("how-are-you")
    ? "How Are You Really?"
    : "What Keeps You Human";

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    fetch(`${base}/api/messages?testName=${encodeURIComponent(testName)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data: Message[]) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, [testName]);

  const submit = async () => {
    if (!text.trim()) return;
    const base = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${base}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), testName }),
      });
      if (!res.ok) throw new Error("Failed to post message");
      const newMsg: Message = await res.json();
      setMessages((prev) => [newMsg, ...prev]);
      setText("");
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-8 sm:px-10 md:px-12 lg:px-16 pt-10 pb-8 lg:ml-52">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#7a9e7e] mb-6">
            {testName}
          </h1>

          <div className="mb-6 flex gap-2">
            <input
              className="flex-1 border border-[#c8dfc8] rounded-lg px-4 py-2 md:py-3 text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#7a9e7e]"
              placeholder="Share your thoughts..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button
              onClick={submit}
              className="bg-[#7a9e7e] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base lg:text-lg hover:bg-[#5a8a5a] transition"
            >
              Send
            </button>
          </div>

          {loading && (
            <p className="text-[#7a9e7e] text-sm md:text-base tracking-widest uppercase">Loading...</p>
          )}
          {error && (
            <p className="text-red-500 text-sm md:text-base">{error}</p>
          )}
          {!loading && !error && messages.length === 0 && (
            <p className="text-gray-400 text-sm md:text-base">No messages yet. Be the first to share!</p>
          )}
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-[#e8f0e8] rounded-xl px-4 py-3 md:px-6 md:py-4 lg:px-7 lg:py-5 shadow-sm"
              >
                <p className="text-[#4a4a4a] text-sm md:text-base lg:text-lg leading-relaxed">{msg.message}</p>
                <p className="text-[#aaa] text-xs md:text-sm mt-2">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestMessages;
