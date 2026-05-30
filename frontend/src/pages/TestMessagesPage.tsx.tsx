import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


interface Message {
  id: string;
  message: string;
  testName: string;
  createdAt: string;
}

const TestMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

  const testName = "What Keeps You Human";

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    const url = `${base}/api/messages?testName=${encodeURIComponent(testName)}`;

    fetch(url)
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
  }, []);

  const submit = async () => {
    if (!text.trim()) return;
    const base = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${base}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), testName }),
      });
      if (!res.ok) throw new Error(await res.text());
      const created: Message = await res.json();
      setMessages((s) => [created, ...s]);
      setText("");
    } catch (err: any) {
      setError(err?.message ?? "Failed to submit");
    }
  };

  return (
  <div className="flex min-h-screen bg-white p-3 sm:p-1">
    <Navbar />
    <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 lg:ml-40">
      
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#4a7a4a]">Leave a Message</h1>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Share an anonymous message for others taking this test.
        </p>

        <div className="mb-6 w-full">
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-[#A2D0AA] rounded-xl p-4 text-white placeholder-white/70 focus:outline-none resize-none text-sm md:text-base"
            placeholder="Write something..."
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={submit}
              className="bg-[#4a7a4a] text-white px-5 py-2 rounded-lg text-sm md:text-base hover:bg-[#3a6a3a] transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-3 text-[#4a7a4a]">Messages</h2>
          {loading && <p className="text-gray-500 text-sm">Loading...</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {!loading && messages.length === 0 && (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          )}
          <ul className="space-y-3">
            {messages.map((m) => (
              <li key={m.id} className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-sm md:text-base text-gray-700">{m.message}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </main>
  </div>
);
};

export default TestMessages;
