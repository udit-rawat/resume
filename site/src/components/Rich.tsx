import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/* Turns "text [[shown::receipt]] text" into text with clickable claims. */
export function Rich({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = []
  const re = /\[\[(.+?)::(.+?)\]\]/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(<Claim key={k++} shown={m[1]} receipt={m[2]} />)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <span className={className}>{parts}</span>
}

/* Receipt text may contain [label](url) links. */
function ReceiptText({ text }: { text: string }) {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <a key={k++} href={m[2]} target="_blank" rel="noopener" className="underline underline-offset-2">
        {m[1]}
      </a>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

function Claim({ shown, receipt }: { shown: string; receipt: string }) {
  const [open, setOpen] = useState(false)
  const [shift, setShift] = useState(0)
  const wrap = useRef<HTMLSpanElement>(null)
  const note = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Keep the note inside the viewport on narrow screens.
  useLayoutEffect(() => {
    if (!open || !note.current) return
    setShift(0)
    const r = note.current.getBoundingClientRect()
    const over = r.right - (window.innerWidth - 16)
    if (over > 0) setShift(-over)
    else if (r.left < 16) setShift(16 - r.left)
  }, [open])

  return (
    <span ref={wrap} className="relative inline">
      <span
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="claim"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((o) => !o)
          }
        }}
      >
        {shown}
        <sup aria-hidden="true">↗</sup>
      </span>
      {open && (
        <span
          ref={note}
          role="note"
          style={{ transform: `translateX(${shift}px)` }}
          className="absolute left-0 top-full z-30 mt-2 block w-[min(300px,80vw)] rounded-lg bg-ink px-3.5 py-3 text-left text-[13px] font-normal leading-[1.5] text-ground shadow-[0_12px_32px_rgb(0_0_0/0.18)]"
        >
          <span className="mono mb-1 block text-[11px] text-ink-faint">How this was measured</span>
          <ReceiptText text={receipt} />
        </span>
      )}
    </span>
  )
}
