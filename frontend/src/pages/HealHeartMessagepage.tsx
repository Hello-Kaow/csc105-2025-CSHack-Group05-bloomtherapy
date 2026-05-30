import { useState, useEffect, useCallback, useRef } from 'react'
import type { HealMessage } from '../../types/heal-heart'
import Navbar from '../components/Navbar'
import EditMessageModal from '../popup/EditMessageModal'
// ─── Username generation (anonymous display) ─────────────────────────────────
const ADJECTIVES = ['Quiet','Gentle','Brave','Tender','Calm','Soft','Kind','Still','Warm','Lucky','Steady','Humble','Silent','Bold','Lone']
const NOUNS = ['Survivor','Soul','Ember','Dawn','Echo','Star','Leaf','Flame','Reed','Shore','Drift','Bloom','Ash','Wind','Rain']

function hashCode(s: any): number {
  // 🛡️ ป้องกันชั้นที่ 1: ถ้า s ไม่มีค่า (undefined/null) ให้หยุดทำแล้วคืนค่า 0 ไปเลย แอปจะไม่พัง
  if (!s) return 0; 
  
  // 🛡️ ป้องกันชั้นที่ 2: บังคับแปลงเป็น String ชัวร์ๆ
  const str = String(s); 
  
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function generateUsername(userId: any): string {
  // 🛡️ ป้องกันชั้นที่ 3: ถ้าไม่มี ID ส่งมา ให้ใช้คำว่า "anonymous" แทน
  const safeId = userId ? String(userId) : "anonymous";
  const h = hashCode(safeId);
  return `${ADJECTIVES[h % ADJECTIVES.length]} ${NOUNS[(h >> 4) % NOUNS.length]}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface HealHeartMessageProps {
  token: string
  currentUserId: string
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HealHeartMessage({ token, currentUserId }: HealHeartMessageProps) {
  const [messages, setMessages] = useState<HealMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [posting, setPosting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const MAX = 500
  const [showEditModal, setShowEditModal] = useState(false)
  const authHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/heal-messages')
      if (!res.ok) throw new Error()
      const data: HealMessage[] = await res.json()
      setMessages(data)
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
      edited: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setMessages(prev => [temp, ...prev])
    setText('')
    setCharCount(0)

    try {
      const res = await fetch('/api/heal-messages', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ text: trimmed }),
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
      const res = await fetch(`/api/heal-messages/${id}`, { method: 'DELETE', headers: authHeaders })
      if (!res.ok) throw new Error()
    } catch {
      setMessages(snapshot)
      setError('Failed to delete. Please try again.')
    }
  }

  // ─── Edit save ──────────────────────────────────────────────────────────────
  async function handleEditSave(id: string) {
    const trimmed = editText.trim()
    if (!trimmed) return
    const snapshot = messages
    setMessages(prev => prev.map(m => m.id === id ? { ...m, text: trimmed, edited: true } : m))
    setEditingId(null)
    try {
      const res = await fetch(`/api/heal-messages/${id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ text: trimmed }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setMessages(snapshot)
      setError('Failed to update. Please try again.')
    }
  }

  // ─── Derived ────────────────────────────────────────────────────────────────
  const myUsername = generateUsername(currentUserId || 'anonymous-user')
  const myCount = messages.filter(m => m.userId === currentUserId).length
  const remaining = MAX - charCount

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <div className="max-w-[980px] mx-auto px-4 py-8 sm:py-10 sm:px-8 lg:px-6 pb-16 font-['DM_Sans',_sans-serif] text-[#2d4a2d]">
        
        {/* ── Header ── */}
        <header className="text-center mb-8">
          <h1 className="font-['Lora',_serif] text-[clamp(22px,5vw,32px)] font-semibold text-[#7aaa7a] m-0 mb-2.5 tracking-tight">
            Heal Heart Message Posts
          </h1>
          <p className="text-[#8aaa8a] text-sm leading-relaxed m-0">
            A place to leave a light for someone else, or find one for yourself.
            <br />
            <em className="font-['Lora',_serif]">Anonymous, fleeting, but warm.</em>
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
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs text-[#8aaa8a]">
              Posting as <strong className="text-[#7aaa7a] font-medium">{myUsername}</strong>
            </span>
            <span className={`text-[11px] ${remaining < 50 ? 'text-[#c97070]' : 'text-[#aac8aa]'}`}>
              {remaining}
            </span>
          </div>
          <textarea
            ref={textareaRef}
            className="w-full border-none outline-none resize-none bg-transparent font-['DM_Sans',_sans-serif] text-[15px] text-[#2d4a2d] leading-relaxed placeholder:text-[#aac8aa]"
            rows={3}
            value={text}
            maxLength={MAX}
            onChange={e => { setText(e.target.value); setCharCount(e.target.value.length) }}
            onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handlePost() }}
            placeholder="Type your message ..."
            aria-label="Message text"
          />
          <div className="border-t border-[#c0d8c0] mt-3 pt-3 flex justify-end items-center">
    <button
        className="bg-[#7aaa7a] text-white border-none rounded-[7px] px-7 py-2 font-['DM_Sans',_sans-serif] text-[13px] font-medium tracking-wide cursor-pointer transition-all duration-150 hover:not(:disabled):opacity-85 active:not(:disabled):scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={handlePost}
        disabled={!text.trim() || posting}
        aria-label="Post message"
    >
        {posting ? 'Posting…' : 'POST'}
    </button>
</div>
        </div>

        {/* ── Messages grid ── */}
        {loading ? (
          <div className="py-4">
            <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div 
                  key={i} 
                  className="h-[120px] rounded-[10px] animate-pulse bg-[#d8ecd8]" 
                />
              ))}
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 px-4 font-['Lora',_serif] italic text-[#aac8aa] text-base">
            <em>Be the first to leave a light.</em>
          </div>
        ) : (
          <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {messages.map(m => {
              const isOwner = m.userId === currentUserId
              return (
                <article 
                  key={m.id} 
                  className="bg-[#ddeedd] rounded-[10px] py-[1.1rem] px-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(100,160,100,0.12)]" 
                  role="listitem"
                >
                  {editingId === m.id ? (
                    /* ── Edit mode ── */
                    <div className="flex flex-col gap-2">
                      <textarea
                        className="w-full border border-[#c0d8c0] rounded-[7px] p-2.5 font-['DM_Sans',_sans-serif] text-sm text-[#2d4a2d] resize-none outline-none bg-white leading-relaxed focus:border-[#7aaa7a]"
                        rows={4}
                        value={editText}
                        maxLength={MAX}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleEditSave(m.id)
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                        autoFocus
                        aria-label="Edit message"
                      />
                      <div className="flex gap-2 justify-end">
                        <button 
                          className="bg-transparent border-none text-[#8aaa8a] text-xs cursor-pointer font-['DM_Sans',_sans-serif] py-1.5 transition-opacity duration-150 hover:opacity-60" 
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-[#7aaa7a] text-white border-none rounded-md px-4 py-1.5 text-xs cursor-pointer font-['DM_Sans',_sans-serif] transition-opacity duration-150 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() => handleEditSave(m.id)}
                          disabled={!editText.trim()}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View mode ── */
                    <>
                      <p className="font-['Lora',_serif] text-[14.5px] text-[#2d4a2d] leading-[1.75] m-0 mb-3">
                        "{m.text}"
                      </p>
                      <div className="flex justify-between items-end flex-wrap gap-1.5">
                        <div className="text-xs text-[#8aaa8a] leading-[1.4]">
                          {generateUsername(m.userId)}
                          {m.edited && <span className="text-[10px] italic"> · edited</span>}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <time className="text-[11px] text-[#aac8aa] whitespace-nowrap" dateTime={m.createdAt}>
                            {timeAgo(m.createdAt)}
                          </time>
                          {isOwner && (
                            <div className="flex gap-2">
                              <button
                                className="bg-transparent border-none cursor-pointer font-['DM_Sans',_sans-serif] text-xs p-0 transition-opacity duration-150 hover:opacity-60 text-[#7aaa7a]"
                                onClick={() => { setEditingId(m.id); setEditText(m.text); setShowEditModal(true) }}
                                aria-label="Edit message"
                              >
                                edit
                              </button>
                              <button
                                className="bg-transparent border-none cursor-pointer font-['DM_Sans',_sans-serif] text-xs p-0 transition-opacity duration-150 hover:opacity-60 text-[#c97070]"
                                onClick={() => handleDelete(m.id)}
                                aria-label="Delete message"
                              >
                                delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
      {showEditModal && editingId && (
  <EditMessageModal
    editText={editText}
    onChange={setEditText}
    onSave={() => { handleEditSave(editingId); setShowEditModal(false) }}
    onCancel={() => setShowEditModal(false)}
  />
)}
    </>
  )
}