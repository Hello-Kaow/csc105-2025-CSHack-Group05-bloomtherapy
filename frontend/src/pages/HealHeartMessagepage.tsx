import { useState, useEffect, useCallback, useRef } from 'react'
import type { HealMessage } from '../../types/heal-heart'
import Navbar from '../components/Navbar'
import EditMessageModal from '../popup/EditMessageModal'

// ─── Helper ───────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface HealHeartMessageProps {
  token: string
  currentUserId: string
  /** ชื่อ user จริง — ถ้าไม่ได้ login ส่งมาเป็น undefined จะใช้ "Anonymous" แทน */
  username?: string
}

const API = 'http://localhost:3000/api/heal-messages'
const MAX = 500

// ─── Component ────────────────────────────────────────────────────────────────
export default function HealHeartMessage({ token, currentUserId, username }: HealHeartMessageProps) {
  const [messages, setMessages]   = useState<HealMessage[]>([])
  const [loading, setLoading]     = useState(true)
  const [text, setText]           = useState('')
  const [charCount, setCharCount] = useState(0)
  const [posting, setPosting]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  // modal state
  const [editTarget, setEditTarget] = useState<HealMessage | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Stable headers — memo-ised by token value only
  const authHeaders = useRef<HeadersInit>({})
  useEffect(() => {
    authHeaders.current = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }, [token])

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(API, { headers: authHeaders.current })
      if (!res.ok) throw new Error()
      setMessages(await res.json())
    } catch {
      setError('Could not load messages. Please refresh.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  // ─── Post ───────────────────────────────────────────────────────────────────
  async function handlePost() {
    const trimmed = text.trim()
    if (!trimmed || posting) return
    setPosting(true)
    setError(null)

    const temp: HealMessage = {
      id: `temp-${Date.now()}`,
      text: trimmed,
      userId: currentUserId,
      username: displayName,
      edited: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setMessages(prev => [temp, ...prev])
    setText('')
    setCharCount(0)

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: authHeaders.current,
        body: JSON.stringify({ text: trimmed, username: displayName }),
      })
      if (!res.ok) throw new Error()
      const msg: HealMessage = await res.json()
      setMessages(prev => prev.map(m => m.id === temp.id ? msg : m))
    } catch {
      setMessages(prev => prev.filter(m => m.id !== temp.id))
      setText(trimmed)
      setCharCount(trimmed.length)
      setError('Failed to post. Please try again.')
    } finally {
      setPosting(false)
    }
  }

  // ─── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    const snapshot = messages
    setMessages(prev => prev.filter(m => m.id !== id))
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE', headers: authHeaders.current })
      if (!res.ok) throw new Error()
    } catch {
      setMessages(snapshot)
      setError('Failed to delete. Please try again.')
    }
  }

  // ─── Edit save (called from modal) ──────────────────────────────────────────
  async function handleEditSave(newText: string) {
    if (!editTarget || !newText.trim()) return
    const { id } = editTarget
    const snapshot = messages

    setMessages(prev => prev.map(m => m.id === id ? { ...m, text: newText.trim(), edited: true } : m))
    setEditTarget(null)

    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: authHeaders.current,
        body: JSON.stringify({ text: newText.trim() }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setMessages(snapshot)
      setError('Failed to update. Please try again.')
    }
  }

  // ─── Derived ────────────────────────────────────────────────────────────────
  const displayName = username?.trim() || 'Anonymous'
  const myCount     = messages.filter(m => m.userId === currentUserId).length
  const remaining   = MAX - charCount

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      {/* Edit Modal */}
      {editTarget && (
        <div className="fixed inset-0 bg-black/25 z-50 flex items-center justify-center px-4">
          <EditMessageModal
            editText={editTarget.text}
            onChange={(val: string) =>
              setEditTarget(prev => prev ? { ...prev, text: val } : null)
            }
            onSave={() => handleEditSave(editTarget.text)}
            onCancel={() => setEditTarget(null)}
          />
        </div>
      )}

      <div className="max-w-[980px] mx-auto px-4 py-8 sm:py-10 sm:px-8 lg:px-6 pb-16 font-['DM_Sans',sans-serif] text-[#2d4a2d]">

        {/* ── Header ── */}
        <header className="text-center mb-8">
          <h1 className="font-['Lora',serif] text-[clamp(22px,5vw,32px)] font-semibold text-[#7aaa7a] m-0 mb-2.5 tracking-tight">
            Heal Heart Message Posts
          </h1>
          <p className="text-[#8aaa8a] text-sm leading-relaxed m-0">
            A place to leave a light for someone else, or find one for yourself.
            <br />
            <em className="font-['Lora',serif]">Anonymous, fleeting, but warm.</em>
          </p>
          {!loading && (
            <div className="flex justify-center items-center gap-5 mt-4">
              <div className="text-center">
                <span className="block text-[22px] font-medium text-[#2d4a2d]">{messages.length}</span>
                <span className="block text-[10px] text-[#8aaa8a] tracking-[0.08em] uppercase mt-0.5">messages</span>
              </div>
              <div className="w-px h-8 bg-[#c0d8c0]" />
              <div className="text-center">
                <span className="block text-[22px] font-medium text-[#2d4a2d]">{myCount}</span>
                <span className="block text-[10px] text-[#8aaa8a] tracking-[0.08em] uppercase mt-0.5">yours</span>
              </div>
            </div>
          )}
        </header>

        {/* ── Error banner ── */}
        {error && (
          <div
            className="flex justify-between items-center bg-[#fdecea] text-[#b91c1c] px-4 py-2.5 rounded-lg text-[13px] mb-4 cursor-pointer"
            role="alert"
            onClick={() => setError(null)}
          >
            {error}
            <span className="text-base opacity-60">×</span>
          </div>
        )}

        {/* ── Post box ── */}
        <div className="bg-[#f6fbf6] border border-[#c0d8c0] rounded-xl p-5 mb-8">
          <textarea
            ref={textareaRef}
            className="w-full border-none outline-none resize-none bg-transparent font-['DM_Sans',sans-serif] text-[15px] text-[#2d4a2d] leading-relaxed placeholder:text-[#aac8aa]"
            rows={3}
            value={text}
            maxLength={MAX}
            onChange={e => { setText(e.target.value); setCharCount(e.target.value.length) }}
            onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handlePost() }}
            placeholder="Type your message ..."
            aria-label="Message text"
          />
          <div className="border-t border-[#c0d8c0] mt-3 pt-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8aaa8a]">
                Posting as <strong className="text-[#7aaa7a] font-medium">{displayName}</strong>
              </span>
              <span className={`text-[11px] ${remaining < 50 ? 'text-[#c97070]' : 'text-[#aac8aa]'}`}>
                · {remaining}
              </span>
            </div>
            <button
              className="bg-[#7aaa7a] text-white border-none rounded-[7px] px-7 py-2 font-['DM_Sans',sans-serif] text-[13px] font-medium tracking-wide cursor-pointer transition-all duration-150 hover:opacity-85 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={handlePost}
              disabled={!text.trim() || posting}
            >
              {posting ? 'Posting…' : 'POST'}
            </button>
          </div>
        </div>

        {/* ── Messages grid ── */}
        {loading ? (
          <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-[100px] rounded-[10px] animate-pulse bg-[#d8ecd8]" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 px-4 font-['Lora',serif] italic text-[#aac8aa] text-base">
            Be the first to leave a light.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3.5" role="list">
            {messages.map(m => {
              const isOwner = m.userId === currentUserId
              return (
                <article
                  key={m.id}
                  className="bg-[#ddeedd] rounded-[10px] py-4 px-4 flex flex-col break-inside-avoid mb-3.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(100,160,100,0.12)]"
                  role="listitem"
                >
                  <p className="font-['Lora',serif] text-[14.5px] text-[#2d4a2d] leading-[1.75] m-0 mb-3 break-words whitespace-pre-wrap">
                    "{m.text}"
                  </p>
                  <div className="flex justify-between items-center flex-wrap gap-1.5 mt-auto">
                    <div className="text-xs text-[#8aaa8a]">
                      {m.username || 'Anonymous'}   
                      {m.edited && <span className="text-[10px] italic"> · edited</span>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <time className="text-[11px] text-[#aac8aa] whitespace-nowrap" dateTime={m.createdAt}>
                        {timeAgo(m.createdAt)}
                      </time>
                      {isOwner && (
                        <div className="flex gap-2">
                          <button
                            className="bg-transparent border-none cursor-pointer font-['DM_Sans',sans-serif] text-xs p-0 text-[#7aaa7a] hover:opacity-60 transition-opacity"
                            onClick={() => setEditTarget(m)}
                            aria-label="Edit message"
                          >
                            edit
                          </button>
                          <button
                            className="bg-transparent border-none cursor-pointer font-['DM_Sans',sans-serif] text-xs p-0 text-[#c97070] hover:opacity-60 transition-opacity"
                            onClick={() => handleDelete(m.id)}
                            aria-label="Delete message"
                          >
                            delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}