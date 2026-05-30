import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  message: string;
  testName: string;
  createdAt: string;
}

const TestMessages: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="flex min-h-screen bg-[#f5ebe8]">
      <Navbar />
      <main className="flex-1 p-6 lg:ml-52 lg:pl-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#7a9e7e]">Leave a Message</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#4a7a4a] border px-3 py-1 rounded"
          >
            Back
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">Share an anonymous message for others taking this test.</p>

        <div className="mb-4">
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded p-3"
            placeholder="Write something..."
          />
          <div className="flex justify-end mt-2">
            <button onClick={submit} className="bg-[#4a7a4a] text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
          <ul className="space-y-3">
            {messages.map((m) => (
              <li key={m.id} className="p-3 rounded bg-white shadow-sm">
                <p className="text-sm text-gray-700">{m.message}</p>
                <div className="text-xs text-gray-400 mt-2">{new Date(m.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TestMessages;
