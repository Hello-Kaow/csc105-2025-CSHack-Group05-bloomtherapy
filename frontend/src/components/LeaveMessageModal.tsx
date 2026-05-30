import React, { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  testName: string;
  color?: string;
  bg?: string;
  accent?: string;
}

const LeaveMessageModal: React.FC<Props> = ({ open, onClose, testName, color = "#4a7a4a", bg = "#f0f4ef", accent = "#d4e8d4" }) => {
  const [messageText, setMessageText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div className="relative w-full max-w-xs md:max-w-md rounded-2xl shadow-2xl p-5 md:p-7 flex flex-col gap-3 md:gap-4" style={{ backgroundColor: bg }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors text-sm leading-none">✕</button>

        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase font-sans" style={{ color }}>
            Leave a Message
          </span>
          <p className="text-[11px] md:text-xs text-gray-500 font-sans">Share something anonymous for others who feel the same.</p>
        </div>

        <div className="w-full h-px" style={{ backgroundColor: accent }} />

        {submitted ? (
          <p className="text-sm text-center font-sans py-4" style={{ color }}>
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
              style={{ backgroundColor: accent }}
              onFocus={(e) => (e.target.style.borderColor = color)}
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
                      body: JSON.stringify({ message: messageText.trim(), testName }),
                    });
                    if (!res.ok) {
                      const err = await res.text();
                      throw new Error(err || "Failed to submit message");
                    }
                    setSubmitted(true);
                    setMessageText("");
                  } catch (err: any) {
                    alert(err?.message ?? "Failed to submit message");
                  }
                }}
                className="text-[10px] md:text-xs tracking-widest uppercase font-sans px-4 py-1.5 rounded-lg text-white transition-all"
                style={{ backgroundColor: color }}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaveMessageModal;
