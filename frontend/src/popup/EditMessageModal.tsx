interface EditMessageModalProps {
  editText: string
  onChange: (text: string) => void
  onSave: () => void
  onCancel: () => void
  maxLength?: number
}

export default function EditMessageModal({
  editText,
  onChange,
  onSave,
  onCancel,
  maxLength = 500,
}: EditMessageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-xs text-[#8aaa8a] mb-3 font-['DM_Sans',_sans-serif]">
          Edit your message ...
        </p>
        <textarea
          className="w-full border border-[#f0d0d0] rounded-xl p-3 font-['Lora',_serif] text-[14.5px] text-[#2d4a2d] leading-[1.75] resize-none outline-none focus:border-[#7aaa7a] min-h-[100px]"
          value={editText}
          maxLength={maxLength}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) onSave()
            if (e.key === 'Escape') onCancel()
          }}
          autoFocus
          aria-label="Edit message"
        />
        <div className="flex gap-3 justify-end mt-4">
  <button
    className="bg-transparent text-[#8aaa8a] border-none px-6 py-2 text-sm font-medium font-['DM_Sans',_sans-serif] cursor-pointer hover:opacity-70 transition-opacity"
    onClick={onCancel}
  >
    Cancel
  </button>
  <button
    className="bg-[#7aaa7a] text-white border-none rounded-[7px] px-7 py-2 font-['DM_Sans',_sans-serif] text-[13px] font-medium tracking-wide cursor-pointer transition-all duration-150 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
    onClick={onSave}
    disabled={!editText.trim()}
  >
    Save
  </button>
</div>
      </div>
    </div>
  )
}