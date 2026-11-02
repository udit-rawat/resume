import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { jobs, papers } from '../data'
import { Rich } from './Rich'

/*
  mikes.cv's flight plan, recast as a training run: one continuous line with a
  checkpoint per role, drawn in as you scroll. Nested rows are the work done there.
*/
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="exp-h" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <h2 id="exp-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
          Experience
        </h2>
        <p className="mt-2 max-w-[52ch] text-[15px] text-ink-soft">
          Logged like a training run: one line, a checkpoint per role, newest first. Underlined numbers say how they were measured.
        </p>

        <div ref={ref} className="relative mt-14 ml-[64px] sm:ml-[92px]">
          <div className="run-line">
            <motion.div className="run-line__fill h-full" style={{ scaleY: fill }} />
          </div>

          <ol className="space-y-16">
            {jobs.map((j) => (
              <li key={j.org} className="relative pl-7 sm:pl-10">
                <span className="mono absolute top-[3px] -left-[64px] w-[52px] text-right text-[11.5px] text-ink-faint sm:-left-[92px] sm:w-[76px]">
                  {j.year}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-[5px] -left-[5px] size-[11px] rounded-full border-[1.5px] border-signal bg-ground"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {j.logos && (
                    <span className="flex">
                      {j.logos.map((src, k) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className={`size-7 rounded-full bg-white object-contain ring-2 ring-ground ${k ? '-ml-2' : ''}`}
                          loading="lazy"
                        />
                      ))}
                    </span>
                  )}
                  <h3 className="text-[19px] font-semibold tracking-tight">{j.org}</h3>
                  <span className="mono text-[11.5px] text-ink-faint">{j.when}</span>
                </div>
                <p className="mt-1 text-[15px] font-medium">{j.role}</p>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-ink-soft">
                  <Rich text={j.summary} />
                </p>

                {j.items && (
                  <ul className="mt-5 space-y-3 border-l border-dashed border-rule pl-5">
                    {j.items.map((it) => (
                      <li key={it.title} className="relative max-w-[62ch]">
                        <span aria-hidden="true" className="absolute top-[9px] -left-[23px] size-[5px] rounded-full bg-signal" />
                        <span className="text-[15px] font-semibold">{it.title}. </span>
                        <span className="text-[15px] leading-[1.6] text-ink-soft">
                          <Rich text={it.text} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          <p className="relative mt-16 pl-7 text-[15px] text-ink-soft sm:pl-10">
            <span aria-hidden="true" className="absolute top-[7px] -left-[3px] size-[7px] rounded-full bg-signal" />
            Checkpoint saved, November 2026. Training continues.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-[180px_1fr]">
          <h3 className="text-[19px] font-semibold tracking-tight">Papers</h3>
          <ul className="divide-y divide-rule border-y border-rule">
            {papers.map((p) => (
              <li key={p.title} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3 text-[15px]">
                <span className="font-medium">{p.title}</span>
                <span className="mono text-[12px] text-ink-soft">{p.where}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
