import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import { categories, projects, type Category, type Project } from '../data'
import { Folder, shade } from './Folder'

const COPIES = 3 // sebneil's ring is dense; each project appears three times around it

/*
  The sebneil.com ring: panes stand radially around a tilted circle, so the ones
  facing you are edge-on and the ones at the sides show their face. It drifts on
  its own; scrolling through the section turns it a full revolution.
  Hover shows a full-colour preview window bottom right, click opens the project.
*/
export function Ring() {
  const section = useRef<HTMLElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [hover, setHover] = useState<Project | null>(null)
  const [size, setSize] = useState(() => dims())

  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })

  useEffect(() => {
    const onResize = () => setSize(dims())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // One rAF loop combines the slow drift with scroll position.
  const hovering = useRef(false)
  useEffect(() => {
    hovering.current = hover !== null
  }, [hover])
  useEffect(() => {
    let drift = 0
    let last = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const dt = Math.min(64, t - last)
      last = t
      if (!reduce && !hovering.current) drift += dt * 0.006 // ~6 degrees a second
      const angle = drift + scrollYProgress.get() * 300
      if (ring.current) ring.current.style.transform = `rotateX(-14deg) rotateY(${angle}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, scrollYProgress])

  const panes = useMemo(() => {
    const list: { p: Project; copy: number }[] = []
    for (let c = 0; c < COPIES; c++) for (const p of projects) list.push({ p, copy: c })
    return list
  }, [])
  const n = panes.length

  return (
    <section id="work" ref={section} aria-labelledby="work-h" className="relative">
      <div className="relative flex h-[480px] sm:h-[min(100svh,880px)] sm:min-h-[560px] flex-col overflow-hidden">
        <div className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="work-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
              Work
            </h2>
            <p className="mt-2 text-[14px] text-ink-soft">
              {projects.length} projects. Hover a folder to preview it, click to open.
            </p>
          </div>
          <Filters value={filter} onChange={setFilter} />
        </div>
        </div>

        <div className="ring-stage relative flex-1" onPointerLeave={() => setHover(null)}>
          <div ref={ring} className="ring" style={{ transform: 'rotateX(-14deg)' }}>
            {panes.map(({ p, copy }, i) => {
              const dim = filter !== 'all' && p.category !== filter
              const first = copy === 0
              return (
                <Link
                  key={`${p.slug}-${copy}`}
                  to={`/work/${p.slug}`}
                  className="ring__pane"
                  data-dim={dim}
                  tabIndex={first && !dim ? 0 : -1}
                  aria-hidden={!first}
                  aria-label={first ? `${p.title}: ${p.oneLiner}` : undefined}
                  style={
                    {
                      '--pane-w': `${size.pane}px`,
                      transform: `rotateY(${(i * 360) / n}deg) translateZ(${size.r}px) rotateY(90deg)`,
                    } as CSSProperties
                  }
                  onPointerEnter={(e) => e.pointerType === 'mouse' && !dim && setHover(p)}
                  onFocus={() => setHover(p)}
                  onBlur={() => setHover(null)}
                  onClick={(e) => {
                    if (dim) e.preventDefault()
                  }}
                >
                  <div className="pane-lift">
                    <Folder project={p} eager={first} />
                  </div>
                </Link>
              )
            })}
          </div>

          <AnimatePresence>
            {hover && (
              <motion.button
                key={hover.slug}
                type="button"
                onClick={() => navigate(`/work/${hover.slug}`)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute right-4 bottom-4 z-20 hidden w-[300px] overflow-hidden rounded-xl bg-card text-left shadow-[0_18px_48px_rgb(0_0_0/0.16)] ring-1 ring-black/5 md:block lg:right-8 lg:bottom-8"
                tabIndex={-1}
              >
                <PreviewDesk project={hover} />
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[17px] font-semibold tracking-tight">{hover.title}</span>
                    <span className="mono text-[11px] text-ink-faint">{hover.year}</span>
                  </div>
                  <p className="mt-1 text-[13.5px] leading-snug text-ink-soft">{hover.oneLiner}</p>
                  <p className="mono mt-3 text-[11px] text-ink">{hover.chip.join('  ·  ')}</p>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* The folder on a desk; a beat after it appears, its files slide out and spread. */
function PreviewDesk({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 90)
    return () => clearTimeout(id)
  }, [])
  return (
    <div
      className="relative flex h-[230px] items-end justify-center overflow-hidden pb-4"
      style={{ background: project.dark ? '#2a2a27' : shade(project.paper, 0.5) }}
    >
      <div className="w-[118px]">
        <Folder project={project} fan="up" open={open} eager />
      </div>
    </div>
  )
}

function dims() {
  if (typeof window === 'undefined') return { pane: 120, r: 420 }
  const w = window.innerWidth
  if (w < 640) return { pane: 72, r: Math.min(220, w * 0.46) }
  if (w < 1024) return { pane: 96, r: 330 }
  return { pane: 120, r: Math.min(470, w * 0.32) }
}

/* easyui-style dark segmented tabs with a sliding pill. */
function Filters({ value, onChange }: { value: Category | 'all'; onChange: (c: Category | 'all') => void }) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects"
      className="-mx-4 flex max-w-[100vw] overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
    >
      <div className="flex shrink-0 gap-0.5 rounded-full bg-ink p-1">
        {categories.map((c) => {
          const active = value === c.id
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(c.id)}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors ${
                active ? 'text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-ground"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
