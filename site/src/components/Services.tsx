import { Link } from 'react-router-dom'
import { contact, services, steps } from '../data'

/* For clients: what I take on, the proof, and how a project runs. */
export function Services() {
  return (
    <section id="services" aria-labelledby="svc-h" className="bg-ink px-4 py-24 text-ground sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <h2 id="svc-h" className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-semibold tracking-[-0.03em]">
          Work with me
        </h2>
        <p className="mt-3 max-w-[54ch] text-[16px] leading-[1.55] text-white/65">
          I take on two kinds of freelance project. You work with me directly, from the first call to the handover.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="flex flex-col rounded-[14px] bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
              <h3 className="text-[26px] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.55] text-white/80">{s.lede}</p>
              <ul className="mt-6 space-y-2 text-[15px] text-white/70">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-white/40">
                      +
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                {s.proofHref.startsWith('/') ? (
                  <Link to={s.proofHref} className="text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {s.proof}
                  </Link>
                ) : (
                  <a href={s.proofHref} className="text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {s.proof}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-20 text-[19px] font-semibold tracking-tight">How a project runs</h3>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-white/15 pt-4">
              <span className="mono text-[12px] text-white/45">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-[16px] font-semibold">{s.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-white/60">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex flex-col items-start gap-5 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
            Tell me what you want to build.
          </p>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <a
              href={contact.projectMail}
              className="rounded-full bg-ground px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              Email me about a project
            </a>
            <span className="mono text-[12px] text-white/50">{contact.email}, usually a reply within a day</span>
          </div>
        </div>
      </div>
    </section>
  )
}
