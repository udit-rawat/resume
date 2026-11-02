import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data'
import { Folder, shade } from './Folder'

/*
  The scannable version of the ring: fanout.sh style cards. Shipped websites and
  products come first as wide cards, since that is what a client is looking for.
*/
export function ProjectIndex() {
  const featured = projects.filter((p) => p.category === 'client')
  const rest = projects.filter((p) => p.category !== 'client')
  return (
    <section aria-label="All projects" className="px-4 pt-4 pb-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <ul className="grid gap-3 md:grid-cols-2 xl:gap-4">
          {featured.map((p) => (
            <li key={p.slug}>
              <Card p={p} wide />
            </li>
          ))}
        </ul>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:mt-4 xl:gap-4">
          {rest.map((p) => (
            <li key={p.slug}>
              <Card p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Card({ p, wide = false }: { p: Project; wide?: boolean }) {
  const bg = p.dark ? '#33332f' : shade(p.paper, 0.42)
  const style = { background: bg, color: p.dark ? '#ecebe6' : 'var(--color-ink)' } as CSSProperties
  return (
    <Link
      to={`/work/${p.slug}`}
      style={style}
      className={`group relative flex h-full rounded-[14px] p-5 hover:z-10 focus-visible:z-10 sm:p-6 ${
        wide ? 'flex-col gap-6 sm:flex-row sm:items-stretch' : 'flex-col'
      }`}
    >
      <div
        className={`shrink-0 ${wide ? 'w-[44%] max-w-[190px] sm:mt-16 sm:w-[36%]' : 'w-[50%] max-w-[180px]'}`}
      >
        <Folder project={p} fan={wide ? 'up' : 'right'} />
      </div>
      <div className="flex flex-1 flex-col">
        <div className={`flex items-baseline justify-between gap-3 ${wide ? 'sm:mt-1' : 'mt-6'}`}>
          <h3 className={`leading-tight font-semibold tracking-[-0.02em] ${wide ? 'text-[26px]' : 'text-[21px]'}`}>{p.title}</h3>
          <span className="mono text-[11px] opacity-60">{p.year}</span>
        </div>
        {wide && <p className="mt-2 text-[15px] leading-snug opacity-80">{p.oneLiner}</p>}
        <ul className="mt-3 space-y-1.5 text-[14px] leading-snug">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2 opacity-80">
              <span aria-hidden="true" className="opacity-60">
                +
              </span>
              {pt}
            </li>
          ))}
        </ul>
        <p
          className="mono mt-5 w-max max-w-full rounded-full px-2.5 py-1 text-[11px]"
          style={{ background: p.dark ? 'rgb(255 255 255 / 0.1)' : 'rgb(255 255 255 / 0.55)' }}
        >
          {p.chip.join('  ·  ')}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6 text-[14px] font-medium">
          <span>Open</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
