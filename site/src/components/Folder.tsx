import type { CSSProperties } from 'react'
import type { Project } from '../data'

type Fan = 'right' | 'up'

/*
  A fanout.sh style folder: back sheet, side tab, a designed poster on the front.

  With `fan`, three paper sheets sit inside the folder and slide out when the
  surrounding `.group` is hovered (or when `open` is true): a print of the real
  screenshot, a typed page of key points, and a page of the numbers.
*/
export function Folder({
  project,
  className = '',
  eager = false,
  fan,
  open,
}: {
  project: Project
  className?: string
  eager?: boolean
  fan?: Fan
  open?: boolean
}) {
  const style = {
    '--folder-paper': project.paper,
    '--folder-back': shade(project.paper, project.dark ? 0.22 : -0.14),
  } as CSSProperties
  return (
    <div className={`folder ${className}`} style={style} data-fan={fan} data-open={open || undefined}>
      <div className="folder__back" />
      <div className="folder__tab" />
      {fan && (
        <>
          <div className="folder__sheet folder__sheet--3" aria-hidden="true">
            <div className="sheet-numbers">
              {project.chip.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
          <div className="folder__sheet folder__sheet--2" aria-hidden="true">
            <div className="sheet-doc">
              <b>{project.title}</b>
              {project.points.map((pt) => (
                <span key={pt}>{pt}</span>
              ))}
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="folder__sheet folder__sheet--1" aria-hidden="true">
            <img src={`/previews/${project.slug}.webp`} alt="" loading="lazy" draggable={false} />
          </div>
        </>
      )}
      <div className="folder__face">
        <img src={`/covers/${project.slug}.webp`} alt="" loading={eager ? 'eager' : 'lazy'} draggable={false} />
      </div>
    </div>
  )
}

/* Lighten (amt > 0) or darken (amt < 0) a hex colour. */
// eslint-disable-next-line react-refresh/only-export-components
export function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(amt >= 0 ? c + (255 - c) * amt : c * (1 + amt)),
  )
  return `#${ch.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}
