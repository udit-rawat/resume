import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, projects } from '../data'
import { Folder, shade } from '../components/Folder'
import { Rich } from '../components/Rich'

/* sebneil.com's project page: short pitch left, a fact sheet right, then the images. */
export function ProjectPage() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]

  useEffect(() => {
    document.title = p ? `${p.title}, Udit Rawat` : 'Not found, Udit Rawat'
  }, [p])

  if (!p) {
    return (
      <main className="mx-auto max-w-[1120px] px-4 pt-40 pb-40 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">There is no project at this address.</h1>
        <Link to="/#work" className="mt-6 inline-block underline underline-offset-4">
          Back to all work
        </Link>
      </main>
    )
  }

  const next = projects[(i + 1) % projects.length]
  const cat = categories.find((c) => c.id === p.category)?.label

  return (
    <main className="px-4 pt-28 pb-10 sm:px-8 sm:pt-36">
      <article className="mx-auto max-w-[1120px]">
        <Link to="/#work" className="text-[14px] text-ink-soft hover:text-ink">
          ← All work
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <h1 className="text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em]">{p.title}</h1>
            <p className="mt-5 max-w-[34ch] text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.35] font-medium tracking-[-0.01em]">
              {p.oneLiner}
            </p>
            <div className="mt-8 max-w-[64ch] space-y-5 text-[16.5px] leading-[1.65] text-ink-soft">
              {p.body.map((para, k) => (
                <p key={k}>
                  <Rich text={para} />
                </p>
              ))}
            </div>
            {p.fallsShort && (
              <div className="mt-8 max-w-[64ch] rounded-[12px] px-5 py-4" style={{ background: shade(p.paper, p.dark ? 0.8 : 0.5) }}>
                <p className="text-[15.5px] leading-[1.6]">
                  <span className="font-semibold" style={{ color: p.dark ? '#141414' : p.ink }}>
                    Where it falls short.{' '}
                  </span>
                  {p.fallsShort}
                </p>
              </div>
            )}
          </div>

          <aside>
            <dl className="grid grid-cols-[96px_1fr] gap-y-2.5 border-t border-rule pt-4 text-[14px]">
              <dt className="mono text-[12px] text-ink-faint">Year</dt>
              <dd>{p.year}</dd>
              <dt className="mono text-[12px] text-ink-faint">Category</dt>
              <dd>{cat}</dd>
              <dt className="mono text-[12px] text-ink-faint">Role</dt>
              <dd>{p.role}</dd>
              <dt className="mono text-[12px] text-ink-faint">Stack</dt>
              <dd>{p.stack}</dd>
              <dt className="mono text-[12px] text-ink-faint">Numbers</dt>
              <dd className="mono text-[12.5px]">{p.chip.join(', ')}</dd>
              <dt className="mono text-[12px] text-ink-faint">Links</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </dl>
          </aside>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex items-center justify-center rounded-[14px] p-10" style={{ background: p.dark ? '#33332f' : shade(p.paper, 0.42) }}>
            <div className="w-[70%] max-w-[300px]">
              <Folder project={p} eager />
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] bg-card ring-1 ring-black/5">
            <img
              src={`/previews/${p.slug}.webp`}
              alt={`${p.title}: the real image the folder cover is printed from`}
              className="h-full max-h-[620px] w-full object-cover object-top"
            />
          </div>
        </div>
        {p.figure && (
          <figure className="mt-3">
            <div className="rounded-[14px] bg-card p-3 ring-1 ring-black/5 sm:p-5">
              <img src={p.figure.src} alt={p.figure.alt} className="mx-auto block h-auto max-w-full" loading="lazy" />
            </div>
            <figcaption className="mt-3 text-[13px] text-ink-soft">{p.figure.caption}</figcaption>
          </figure>
        )}

        <Link
          to={`/work/${next.slug}`}
          className="group mt-24 flex items-center justify-between gap-6 border-t border-rule pt-6"
        >
          <div>
            <span className="mono text-[12px] text-ink-faint">Next project</span>
            <p className="mt-1 text-[clamp(1.8rem,4vw,3rem)] leading-none font-semibold tracking-[-0.03em] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
              {next.title}
            </p>
          </div>
          <div className="w-[72px] shrink-0 transition-transform duration-500 group-hover:-rotate-3 sm:w-[96px]">
            <Folder project={next} />
          </div>
        </Link>
      </article>
    </main>
  )
}
